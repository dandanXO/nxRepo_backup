import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Button ,Icon,Tooltip,Modal,Table,Popconfirm} from 'antd';
import { covertUrlParams } from 'utils';
import styles from './UnionDebtsInfo.less';
import { CommonTable } from 'components';
import {axios} from "utils";
import moment from 'moment';

const contactsColumns = [
    { title: '姓名', dataIndex: 'contactsName',key: 'contactsName' },
    {
        title: '手机号',
        dataIndex: 'contactsPhone',
        key: 'contactsPhone',
        render(text) {
            return text || '';
        }
    }
];

class UnionDebtsInfo extends Component {

    recordColumns = [
        {title: '联系人',dataIndex: 'realName', key: 'realName', width: 100},
        {title: '手机号码',dataIndex: 'mobile', key: 'mobile', width: 120},
        {title: '所有平台订单总数',dataIndex: 'totalOrderCount', key: 'totalOrderCount', width: 60},
        {title: '所有平台借款成功订单总数',dataIndex: 'totalSuccessCount', key: 'totalSuccessCount', width: 60},
        {title: '借款平台数',dataIndex: 'totalPlatformCount', key: 'totalPlatformCount', width: 60},
        {title: '借款成功平台数',dataIndex: 'totalSuccessPlatformCount', key: 'totalSuccessPlatformCount', width: 60},
        {title: '逾期平台数',dataIndex: 'totalOverduePlatformCount', key: 'totalOverduePlatformCount', width: 60},
        {title: '还款成功平台数',dataIndex: 'totalSuccessRepayPlatformCount', key: 'totalSuccessRepayPlatformCount', width: 60},
        {title: '还款成功订单数',dataIndex: 'totalSuccessRepayCount', key: 'totalSuccessRepayCount', width: 60},
        {title: '今⽇还款次数',dataIndex: 'todayRepayCount', key: 'todayRepayCount', width: 60},
        {title: '进⾏中订单数:待审核+还款中',dataIndex: 'underWayCount', key: 'underWayCount', width: 60},
        {title: '当前待审核订单数',dataIndex: 'waitCheckCount', key: 'waitCheckCount', width: 60},
        {title: '当前已拒绝订单数',dataIndex: 'denyCount', key: 'denyCount', width: 60},
        {title: '逾期订单数',dataIndex: 'overdueYetCount', key: 'overdueYetCount', width: 60},
        {title: '近⼀个⽉逾期且未还清订单数',dataIndex: 'overdueNearlyMonthCount', key: 'overdueNearlyMonthCount', width: 60},
        {title: '当前逾期⾦额总和',dataIndex: 'overdueYetMoney', key: 'overdueYetMoney', width: 60},
        {title: '历史逾期:已还清但有过逾期订单总数',dataIndex: 'historyOverdueCount', key: 'historyOverdueCount', width: 60},
        {title: '今⽇申请订单数',dataIndex: 'applyTodayCount', key: 'applyTodayCount', width: 60},
        {title: '近两⽇申请订单数',dataIndex: 'applyNearlyTwoDayCount', key: 'applyNearlyTwoDayCount', width: 60},
        {title: '近三⽇申请订单数',dataIndex: 'applyNearlyThreeDayCount', key: 'applyNearlyThreeDayCount', width: 60},
        {title: '近七⽇申请订单数',dataIndex: 'applyNearlySevenDayCount', key: 'applyNearlySevenDayCount', width: 60},
        {title: '近三⼗天申请订单数',dataIndex: 'applyNearlyThirtyDayCount', key: 'applyNearlyThirtyDayCount', width: 60},
        {title: '今⽇到期的订单数',dataIndex: 'dueTodayCount', key: 'dueTodayCount', width: 60},
        {title: '后七天到期的订单数',dataIndex: 'dueNearlySevenDayCount', key: 'dueNearlySevenDayCount', width: 60},
        {title: '近两⽇还款订单数',dataIndex: 'repayNearlyTwoDayCount', key: 'repayNearlyTwoDayCount', width: 60},
        {title: '近七天还款订单数',dataIndex: 'repayNearlySevenDayCount', key: 'repayNearlySevenDayCount', width: 60},
        {title: '最后更新时间',dataIndex: 'lastUpdateTime', key: 'lastUpdateTime', width: 150},
    
    ]


    internalRecordColumns = [
        {title: '联系人',dataIndex: 'realName', key: 'realName', width: 100},
        {title: '手机号码',dataIndex: 'mobile', key: 'mobile', width: 120},
        {title: '所有平台订单总数',dataIndex: 'totalOrderCount', key: 'totalOrderCount', width: 60},
        {title: '所有平台借款成功订单总数',dataIndex: 'totalSuccessCount', key: 'totalSuccessCount', width: 60},
        {title: '借款平台数',dataIndex: 'totalPlatformCount', key: 'totalPlatformCount', width: 60},
        {title: '借款成功平台数',dataIndex: 'totalSuccessPlatformCount', key: 'totalSuccessPlatformCount', width: 60},
        {title: '逾期平台数',dataIndex: 'totalOverduePlatformCount', key: 'totalOverduePlatformCount', width: 60},
        {title: '还款成功平台数',dataIndex: 'totalSuccessRepayPlatformCount', key: 'totalSuccessRepayPlatformCount', width: 60},
        {title: '还款成功订单数',dataIndex: 'totalSuccessRepayCount', key: 'totalSuccessRepayCount', width: 60},
        {title: '今⽇还款次数',dataIndex: 'todayRepayCount', key: 'todayRepayCount', width: 60},
        {title: '进⾏中订单数:待审核+还款中',dataIndex: 'underWayCount', key: 'underWayCount', width: 60},
        {title: '当前待审核订单数',dataIndex: 'waitCheckCount', key: 'waitCheckCount', width: 60},
        {title: '当前已拒绝订单数',dataIndex: 'denyCount', key: 'denyCount', width: 60},
        {title: '逾期订单数',dataIndex: 'overdueYetCount', key: 'overdueYetCount', width: 60},
        {title: '近⼀个⽉逾期且未还清订单数',dataIndex: 'overdueNearlyMonthCount', key: 'overdueNearlyMonthCount', width: 60},
        {title: '当前逾期⾦额总和',dataIndex: 'overdueYetMoney', key: 'overdueYetMoney', width: 60},
        {title: '历史逾期:已还清但有过逾期订单总数',dataIndex: 'historyOverdueCount', key: 'historyOverdueCount', width: 60},
        {title: '今⽇申请订单数',dataIndex: 'applyTodayCount', key: 'applyTodayCount', width: 60},
        {title: '近两⽇申请订单数',dataIndex: 'applyNearlyTwoDayCount', key: 'applyNearlyTwoDayCount', width: 60},
        {title: '近三⽇申请订单数',dataIndex: 'applyNearlyThreeDayCount', key: 'applyNearlyThreeDayCount', width: 60},
        {title: '近七⽇申请订单数',dataIndex: 'applyNearlySevenDayCount', key: 'applyNearlySevenDayCount', width: 60},
        {title: '近三⼗天申请订单数',dataIndex: 'applyNearlyThirtyDayCount', key: 'applyNearlyThirtyDayCount', width: 60},
        {title: '今⽇到期的订单数',dataIndex: 'dueTodayCount', key: 'dueTodayCount', width: 60},
        {title: '后七天到期的订单数',dataIndex: 'dueNearlySevenDayCount', key: 'dueNearlySevenDayCount', width: 60},
        {title: '近两⽇还款订单数',dataIndex: 'repayNearlyTwoDayCount', key: 'repayNearlyTwoDayCount', width: 60},
        {title: '近七天还款订单数',dataIndex: 'repayNearlySevenDayCount', key: 'repayNearlySevenDayCount', width: 60},
        {title: '最后更新时间',dataIndex: 'lastUpdateTime', key: 'lastUpdateTime', width: 150},
    
    ]


    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            debtsRecord:[]
        };
    }


    reloadUnionDebtsInfo = () => {
   
        const { info} = this.props;
        const orderNo =info['orderNumber'];
        console.log(info)
        try {
            const _this = this;
            axios({
                url: '/hs/admin/orderReview/reloadUnionDebtsInfo',
                method: 'post',
                data: {orderNo:orderNo}
            }).then((res) => {
                if(res && res.code == '200') {
                    const data = res.data;
                    _this.setState({
                        debtsRecord: data
                    });
                }
            });
        } catch (e) {
    
        }
    }
   
    handleOk = (e) => {
        this.setState({visible: false,});
    }
    
    handleCancel = (e) => {
        this.setState({ visible: false,});
    }

    prevHandleClick = () => {
        const {  history, location: { pathname } } = this.props;
        history.push(`${pathname}?option=operatorInfo`);
    }
    nextHandleClick =() => {
        const { history, location: { pathname } } = this.props;
        history.push(`${pathname}?option=checkResult`);
    }

    handleReload = (obj) => {
        const { info} = this.props;
        const orderNo =info['orderNumber'];
        this.props.handleReload(info)
    }


    componentDidMount(){
      
         this.setState({debtsRecord: this.props.debtsRecord })
       
     }

    render() {
        const { debtsRecord , info , loading } = this.props;
        // console.log(info)
        const lastUpdateTime = debtsRecord.lastUpdateTime==""?"":moment(Number(debtsRecord.lastUpdateTime)*1000).format('YYYY-MM-DD HH:mm:ss');
        return (
            <div>
              
              <div className={styles.cardWrapper}>
                    <Table
                        title={
                            () => 
                                <div>
                                    <span className={styles.title2}>共债信息最后获取时间 : <b>{lastUpdateTime}</b></span>
                                    <Popconfirm title={'确认要重新获取吗？'} onConfirm={this.handleReload}><Button className={styles.title2} type={'primary'}><Icon type={'reload'}/>重新获取</Button></Popconfirm>
                                    <span className={styles.title2}>|</span>
                                    <span className={styles.title2}>风控模型分 : <b>{debtsRecord.modelScore}</b></span>
                                    <span className={styles.title2}>渠道 : <b>{info.channelName}</b></span>
                                </div>
                            }
                        columns={this.recordColumns}
                        // pagination={null}
                        pageSize={500}
                        dataSource={debtsRecord.debtsInfo}
                        pagination={false} bordered scroll={{ x: '100%' }}
                        loading={loading} 
                    />
                    <br/>
                    <br/>
                
                {debtsRecord.showInternalDebtsInfoFlag==1 && <Table
                        title={
                            () => 
                                <div>
                                    <span className={styles.title2}><b>内部共债信息</b></span>
                                
                                </div>
                            }
                        columns={this.internalRecordColumns}
                        // pagination={null}
                        pageSize={500}
                        dataSource={debtsRecord.internalDebtsInfo}
                        pagination={false} bordered scroll={{ x: '100%' }}
                        loading={loading} 
                    />
                        }
                </div>

                <div className={`${styles.cardWrapper} ${styles.bottomBtn}`}>
                    <Button type={'primary'} onClick={this.prevHandleClick}>上一步</Button>
                    <Button type={'primary'} onClick={this.nextHandleClick}>下一步</Button>
                </div>
            </div>
        );
    }
}
UnionDebtsInfo.propTypes = {
    debtsRecord: PropTypes.object,
    handleReload: PropTypes.func,
    loading:PropTypes.bool
}
UnionDebtsInfo.defaultProps = {
    debtsRecord: {

        overdues: [],
        // consumption: [],

    }, 
    handleReload() {

    },
    loading:false

}
export default withRouter(UnionDebtsInfo);
