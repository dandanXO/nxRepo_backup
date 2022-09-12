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
   
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            contactsListData:[],
            smsLogData:[],
            activeKey: '1',
        };
    }

    componentDidMount(){
        this.lookContactsList();
        this.loadSMSLogData();
    }

    lookContactsList = () => {
        this.setState({
            visible: true,
        });
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

    handleChange = (key) => {
        this.setState({
            activeKey: key
        });
    }

    render() {
        const { intl } = this.props;
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
     
        iphoneRecord: [],
        // consumption: [],

    }
}
export default withRouter(injectIntl(OperatorInfo));
