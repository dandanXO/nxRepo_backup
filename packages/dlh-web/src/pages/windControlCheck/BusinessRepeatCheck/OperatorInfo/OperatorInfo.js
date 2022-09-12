import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button ,Icon,Tooltip,Modal, Tabs} from 'antd';
import { covertUrlParams } from 'utils';
import styles from './OperatorInfo.less';
import { CommonTable } from 'components';
import {axios} from "utils";
import {injectIntl, FormattedMessage} from "react-intl";
import moment from 'moment';
const TabPane = Tabs.TabPane;

const contactsColumns = [
    { title: <FormattedMessage id="page.search.list.name" />, dataIndex: 'contactsName',key: 'contactsName' },
    {
        title: <FormattedMessage id="windowPage.mobile" />,
        dataIndex: 'contactsPhone',
        key: 'contactsPhone',
        render(text) {
            return text || '';
        }
    }
];

const smsColumns = [
    { title :  <FormattedMessage id="page.table.phone"/>, dataIndex: 'phone', key: 'phone', width: '20%'},
    { title :  <FormattedMessage id="page.table.content"/>, dataIndex: 'content', key: 'content', width: '60%'},
    { title :  <FormattedMessage id="page.table.time"/>, dataIndex: 'time', key: 'time', width: '20%', render: time => moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')},
]

class OperatorInfo extends Component {
    // recordColumns = [
    //     { title: '手机号码', dataIndex: 'iphoneNumber', key: 'iphoneNumber' },
    //     { title: '联系人', dataIndex: 'contactPerson', key: 'contactPerson' },
    //     { title: '号码归属地', dataIndex: 'affiliation', key: 'affiliation' },
    //     { title: '近3月通话次数', dataIndex: 'threeCallNumber', key: 'threeCallNumber' },
    //     { title: '近3月通话时长', dataIndex: 'threeCallTime', key: 'threeCallTime' },
    //     { title: '近6月通话次数', dataIndex: 'sixCallNumber', key: 'sixCallNumber' },
    //     { title: '近6月通话时长', dataIndex: 'sixCallTime', key: 'sixCallTime' },
    //     { title: '近6月主叫通话次数', dataIndex: 'sixAccordCallNumber', key: 'sixAccordCallNumber' },
    //     { title: '近6月被叫通话次数', dataIndex: 'sixPassivityCallNumber', key: 'sixPassivityCallNumber' }
    // ]
    // consumptionColumns = [
    //     { title: '月份', dataIndex: 'month', key: 'month' },
    //     { title: '月消费金额', dataIndex: 'consumptionMoney', key: 'consumptionMoney' },
    //     { title: '月充值金额', dataIndex: 'rechargeMoney', key: 'rechargeMoney' },
    //     { title: '月充值次数', dataIndex: 'rechargeNumber', key: 'rechargeNumber' }
    // ]
    recordColumns = [
        {title: <FormattedMessage id="windowPage.contact.person" />,dataIndex: 'contact_name', key: 'contact_name'},
        {title: <FormattedMessage id="windowPage.mobile" />,dataIndex: 'contact_number', key: 'contact_number'},
        {
            title: <FormattedMessage id="wnodowPage.pass.one.month.call" />,
            dataIndex: 'call_count_1month',
            key: 'call_count_1month',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                return a['call_count_1month'] - b['call_count_1month'];
            }
        },
        {
            title: <FormattedMessage id="windowPage.pass.three.month.call" />,
            dataIndex: 'call_count_3month',
            key: 'call_count_3month',
            sorter: (a, b) => Number(a['call_count_3month']) - Number(b['call_count_3month'])
        },
        {
            title: <FormattedMessage id="windowPage.pass.six.month.call" />,
            dataIndex: 'call_count_6month',
            key: 'call_count_6month',
            sorter: (a, b) => Number(a['call_count_6month']) - Number(b['call_count_6month'])
        },
    ]
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            contactsListData:[],
            smsLogData:[],
            activeKey: '1',
        };
    }

    lookContactsList = () => {
        /*this.setState({
            visible: true,
        }); */
        const { info} = this.props;
        const userId =info['userId'];
        try {
            const _this = this;
            axios({
                url: '/hs/admin/userDetails/findUserContacts',
                method: 'post',
                data: {userId:userId,pageSize:3000}
            }).then((res) => {
                if(res && res.code == '200') {
                    const data = res.data;
                    _this.setState({
                        contactsListData: data.records
                    });
                }
            });
        } catch (e) {
    
        }
    }

    loadSMSLogData = () => {
        const { info: {userId}} = this.props;
        axios.post('/hs/admin/userDetails/findUserSMSLogs', {userId:userId})
        .then((res) => {
            if(res && res.code == '200') {
                const data = res.data;
                this.setState({
                    smsLogData: data
                });
            }
        });
    }

    handleOk = (e) => {
        this.setState({visible: false,});
    }

    handleChange = (key) => {
        this.setState({
            activeKey: key
        });
    }

    
    handleCancel = (e) => {
        this.setState({ visible: false,});
    }

    prevHandleClick = () => {
        const {  history, location: { pathname } } = this.props;
        history.push(`${pathname}?option=baseInfo`);
    }
    nextHandleClick =() => {
        const { history, location: { pathname } } = this.props;
        history.push(`${pathname}?option=checkResult`);
    }

    componentDidMount(){
        if (this.state.contactsListData.length == 0){
            this.lookContactsList();
        }
        this.loadSMSLogData();
    }

    render() {
        const { message, intl } = this.props;
        const {contactsListData} = this.state;
        return (
            <div>
                <Tabs activeKey={this.state.activeKey} onChange={this.handleChange}>
                    <TabPane tab={intl.formatMessage({ id: "windowPage.contact.list" })} key="1">
                        <CommonTable pageSize={500} columns={contactsColumns} dataSource={contactsListData} />
                    </TabPane>
                    <TabPane tab={intl.formatMessage({ id: "windowPage.sms.log" })} key="2">
                        <CommonTable columns={smsColumns} dataSource={this.state.smsLogData}/>
                    </TabPane>
                </Tabs>

                <div className={`${styles.cardWrapper} ${styles.bottomBtn}`}>
                    <Button type={'primary'} onClick={this.prevHandleClick}><FormattedMessage id="windowPage.previous.step"/></Button>
                    <Button type={'primary'} onClick={this.nextHandleClick}><FormattedMessage id="windowPage.next.step"/></Button>
                </div>
            </div>
        );
    }
}
OperatorInfo.propTypes = {
    message: PropTypes.object,
    intl: PropTypes.object.isRequired,
}
OperatorInfo.defaultProps = {
    message: {
        // name: '王XX',
        // iphone: '12345678936',
        // registerTime: '2015-5-12 12:20:12',
        // accountOption: 'ok',
        // businessType: '不知道',
        // affiliationAddress: '浙江省杭州市',
        // address: '浙江省杭州市',
        //
        // blackList: '000',
        // applicationPlatform: '220',
        // creditScore: '100',

        iphoneRecord: [],
        // consumption: [],

    }
}
export default withRouter(injectIntl(OperatorInfo));
