import React, { Component } from 'react';
import { Avatar, Dropdown, Icon, Layout, Menu, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { axios, hasGoogleAuth } from 'utils';
import styles from './LayoutHeader.less';
import Cookies from 'js-cookie';
import { FormattedMessage, injectIntl } from "react-intl";
import LanguageSwitch from '../../locales/component/LanguageSwitch';
import { connect } from 'react-redux';
import { globalSettingAction } from './index';
import { bindActionCreators } from 'redux';

const {Header} = Layout;

const openBalanceNotification = (balance) => {
  notification.open({
    message: '余额不足',
    description:
      "Currently risk control balance is:" + balance + ",lower than [2000].Please charge immediately,so as not to affect the system operations！",
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

const openNotificationForCollectors = (announcements) => {
  notification.open({
    message: 'Announcement',
    description:
      announcements.join('\n'),
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

class LayoutHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminInfo: {
        phoneNo: 'admin'
      },
      balance: null,
      appName: null,
            globalTableSize: JSON.parse(localStorage.getItem('tableSize'))
        };
        this.alertTimer = null;
    }

    componentDidMount() {

        const { setTableSize } = this.props;
        setTableSize(this.state.globalTableSize);

        const _this = this;
        const {history} = _this.props;
        axios({
            url: '/hs/admin/auth/getInfo',
            method: 'post'
        }).then((res) => {

            if (res && res.code == '200') {
                let {data} = res;
                const isGoogleAuth = hasGoogleAuth();
                if (!isGoogleAuth && data.googleAuthFlag == 1) {
                    // alert("asdsa");
                    history.push('/googleauth');

                }

                _this.setState({
                    adminInfo: data,
                    appName: res.appName
                });
                // sessionStorage.setItem("adminUserRoleId", data['roleId']);
                document.title = res.appName;
                if (data['roleId'] === 1) {
                    const freshBalance = (callBack) => {
                        axios({
                            url: '/hs/admin/riskFee/getBalance',
                            method: 'post'
                        }).then((res) => {
                            if (res && res.code == '200') {
                                let {data} = res;
                                sessionStorage.setItem("riskFee", data.balance);
                                callBack(data.balance);
                            }
                        });
                    };

                    const toFreshBalance = () => {
                        freshBalance((balance) => {
                            _this.setState({
                                balance: balance
                            });
                            clearInterval(_this.alertTimer);
                            if (balance < 0) {
                                alert(`Currently risk control balance is: ${balance} ,lower than [0].Please charge immediately,so as not to affect the system operations！`)
                                return;
                            }
                            if (balance < 2000) {// 风控费低于2000，弹窗提示
                              openBalanceNotification(balance);
                              _this.alertTimer = setInterval(() => {
                                openBalanceNotification(balance);
                              }, 60000);
                            }

                        });
                    }
                  toFreshBalance();
                  setInterval(() => {
                    toFreshBalance();
                  }, 10 * 60 * 1000);
                } else if (res['announcementsForCollectors'] && (data['roleId'] === 14 || data['roleId'] === 15 || data['roleId'] === 21)) {
                  // openNotificationForCollectors(res['announcementsForCollectors']);
                  alert(res['announcementsForCollectors'].join('\n'));
                }
            }
        });

    }


    handleClick = () => {
        const {history} = this.props;
        sessionStorage.setItem("adminUser", null);
        Cookies.remove('isLogin');
        Cookies.remove("isGoogleAuth");
        history.push('/login');
    }

    handleSwitchTableSize = (size) => {
        const { setTableSize } = this.props;
        localStorage.setItem(`tableSize`, JSON.stringify(size));
        setTableSize(size);
        this.setState({
            globalTableSize:size
        })
    }

    menu = () => {
        return <Menu>
            <Menu.Item>
                <div className={styles.itemInfo}>
                    <Icon type={'user'}/>
                    <span><FormattedMessage id="personal.center"/></span>
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className={styles.itemInfo}>
                    <Icon type={'setting'}/>
                    <span><FormattedMessage id="setting"/></span>
                </div>
            </Menu.Item>
            {/* <Menu.Item>
                <div className={styles.itemInfo}>
                    <Icon type={'table'} />
                    <Switch className={styles.switchStyle}
                        size='small'
                        onChange={this.handleSwitchTableSize}
                        checkedChildren={<FormattedMessage id="settingTableLarge" />}
                        unCheckedChildren={<FormattedMessage id="settingTableSmall" />}
                        checked={this.state.globalTableSize}
                    />
                </div>
            </Menu.Item> */}
            <Menu.Item>
                <div onClick={this.handleClick} className={styles.itemInfo}>
                    <Icon type={'logout'}/>
                    <span><FormattedMessage id="logout"/></span>
                </div>
            </Menu.Item>
        </Menu>
    };

    render() {
        let balanceInfo;
        if (!!this.state.balance) {
        }
        return (
            <Header className={styles.headerWrapper}>
                <div className={styles.logo}>
                    <Icon type="pay-circle" theme="outlined" style={{'font-size': '20px'}}/>
                    <span className={styles.title}>{this.state.appName}</span>
                    <span className={styles.subTitle}><FormattedMessage id="page.login.admin" defaultMessage="后台管理系统"/></span>
                    <span className={styles.versionText}>{' v - bc149129'}</span>
                </div>
                {balanceInfo}
                <Dropdown overlay={this.menu}>
                    <div className={styles.btnWrapper}>
                        <Avatar size={'small'} className={styles.avatar} icon="user"/>
                        <span className={styles.userInfo}>{!!this.state.adminInfo ? this.state.adminInfo.phoneNo : ''}</span>
                    </div>
                </Dropdown>
                <LanguageSwitch/>
            </Header>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTableSize: globalSettingAction.globalSetTableSize
    }, dispatch);
};

export default withRouter(connect(null, mapDispatchToProps)(injectIntl(LayoutHeader)));
