import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Button, Card, Row, Col, Tooltip, Icon, Modal, message, Descriptions, Tag } from "antd";
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import styles from './OrderDetail.less';
import { CommonTable, FormModal, CopyModalMessage ,CopyToLink} from 'components';
import { orderDetailAction } from './index';
import AddUrgeModal from './AddUrgeModal/AddUrgeModal';
import UrgeRecordModal from './UrgeRecordModal/UrgeRecordModal';
import {axios,convertMoneyFormat, emerRelation, maritalStatus,salaryRange, education, position,repaymentType } from "utils";
import {injectIntl, FormattedMessage} from "react-intl";
import {WatermarkPhoto} from "../../../components/WatermarkPhoto/WatermarkPhoto";
import { Typography } from 'antd';
import conf from 'conf';
const TabPane = Tabs.TabPane;
const { Paragraph } = Typography;
const { Item } = Descriptions;
//还款记录
const backRecordColumns = [
    {
        title: <FormattedMessage id= "page.search.list.repaid.time" />,
        dataIndex: 'payTime',
        key: 'payTime',
        render(text) {
            return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    { title: <FormattedMessage id="windowPage.payment.method" />, dataIndex: 'payName', key: 'payName' },
    {
        title: <FormattedMessage id="windowPage.repayment.type" />,
        dataIndex: 'state',
        key: 'state',
        render(text) {
            return repaymentType[text] || '';
        }
    },
    {
        title: <FormattedMessage id="windowPage.repayment.amount" />,
        dataIndex: 'totalMoney',
        key: 'totalMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    { title: <FormattedMessage id="page.search.list.trans.serial.no" />, dataIndex: 'payTradeNo', key: 'payTradeNo' },
    { title: <FormattedMessage id="windowPage.collector" />, dataIndex: 'collectorName', key: 'collectorName' }
];

//催收记录
const urgeRecordColumns = [
    {
        title: <FormattedMessage id="windowPage.add.time" />,
        dataIndex: 'createTime',
        key: 'createTime',
        render(text) {
            return moment(text).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    {
        title: <FormattedMessage id="customer.status" />, dataIndex: 'followUpResult', key: 'followUpResult', width: '15%',
        render (text) {
            const customerStatus = {
              'Promise': "customer.status.promise",
              'Missed': "customer.status.missed",
              'TurnedOff': "customer.status.turned.off",
              'InvalidPhoneNumber': "customer.status.invalid.phone.number",
              'Other': "customer.status.other",
              'BadAttitude': "customer.status.bad.attitude",
              'FinancialDifficulties': "customer.status.financial.difficulties"
            }
            return text !== null ? <FormattedMessage id={customerStatus[text] || 'page.table.none'} /> : '';
        }
    },
    { title: <FormattedMessage id="windowPage.collect.remark" />, dataIndex: 'trackingRecord', key: 'trackingRecord', width: '50%' },
    { title: <FormattedMessage id="windowPage.collector" />, dataIndex: 'collector', key: 'collector' }
];
//展期记录
const standOverRecordColumns = [
    {
        title: <FormattedMessage id="page.search.list.extend.time" />,
        dataIndex: 'addTime',
        key: 'addTime',
        render(text) {
            return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    {
        title: <FormattedMessage id="windowPage.whether.overdue" />,
        dataIndex: 'expireDays',
        key: 'expireDays',
        render(text) {
            return Number(text) === 0 ? <FormattedMessage id="windowPage.not.overdue" /> : <FormattedMessage id="windowPage.overdue.day"  values={{overDay : text }}/>;
        }
    },
    {
        title: <FormattedMessage id="page.table.extend.fee.curreny" />,
        dataIndex: 'totalMoney',
        key: 'totalMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="windowPage.overdue.late.fee.currency" />,
        dataIndex: 'overMoney',
        key: 'overMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    }
];
//逾期记录
// const overdueRecordColumns = [
//     { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
//     {
//         title: '逾期时间',
//         dataIndex: 'expireTime',
//         key: 'collectorName',
//         render(text) {
//             return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
//         }
//     },
//     { title: '催收人', dataIndex: 'collectorName', key: 'collectorName' },
//     {
//         title: '操作',
//         dataIndex: 'id',
//         key: 'id',
//         render(text) {
//             return (
//                 <Tooltip title={'查看催收记录'}>
//                     <div onClick={}>
//                         <Icon type={'edit'}/>
//                     </div>
//                 </Tooltip>
//
//             );
//         }
//     }
// ];

//通话记录
const phoneRecordColumns = [
    { title: <FormattedMessage id="page.search.list.name" />, dataIndex: 'name', key: 'name' },
    { title: <FormattedMessage id="windowPage.phone.no" />, dataIndex: 'phoneNo', key: 'phoneNo' },
    { title: <FormattedMessage id="windowPage.phone.label" />, dataIndex: 'phoneTag', key: 'phoneTag' },
    { title: <FormattedMessage id="windowPage.phone.area" />, dataIndex: 'area', key: 'area' },
    { title: <FormattedMessage id="windowPage.call.active.six" />, dataIndex: 'callCountActive6month', key: 'callCountActive6month' },
    { title: <FormattedMessage id="windowPage.call.passive.six" />, dataIndex: 'callCountPassive6month', key: 'callCountPassive6month' },
    { title: <FormattedMessage id="windowPage.pass.three.month.call" />, dataIndex: 'callCount3month', key: 'callCount3month' },
    { title: <FormattedMessage id="windowPage.call.time.three" />, dataIndex: 'callTime3month', key: 'callTime3month' },
    { title: <FormattedMessage id="windowPage.pass.six.month.call" />, dataIndex: 'callCount6month', key: 'callCount6month' },
    { title: <FormattedMessage id="windowPage.call.time.six" />, dataIndex: 'callTime6month', key: 'callTime6month' },
];
//短信记录
const msgRecordColumns = [
    { title: <FormattedMessage id="windowPage.start.time" />, dataIndex: 'startTime', key: 'startTime' },
    { title: <FormattedMessage id="windowPage.send.method" />, dataIndex: 'sendType', key: 'sendType' },
    { title: <FormattedMessage id="windowPage.other.side.phone" />, dataIndex: 'number', key: 'number' },
    { title: <FormattedMessage id="windowPage.sms.addr" />, dataIndex: 'msgAddress', key: 'msgAddress' }
];

class OrderDetail extends Component{
    constructor(props) {
        super(props);
        const { location: { pathname }, intl } = this.props;
        //判断是否显示添加催收记录按钮
        const isShowBtn = pathname.indexOf('overdueList') === -1;

        this.state = {
            remark: '',
            isShowBtn,
            repaymentLinkIsProhibited: false,
        };
        const _this = this;
        this.overdueRecordColumns = [
            { title: intl.formatMessage({id : "page.search.list.order.no"}), dataIndex: 'orderNo', key: 'orderNo' },
            {
                title:  intl.formatMessage({id : "page.table.overdue.time"}),
                dataIndex: 'expireTime',
                key: 'expireTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: intl.formatMessage({id : "windowPage.collector"}), dataIndex: 'collectorName', key: 'collectorName' },
            {
                title: intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                render(text) {
                    return (
                        <Tooltip title={intl.formatMessage({id : "windowPage.view.collect.record"})}>
                            <div style={{ textAlign: 'center', cursor: 'pointer' }}  onClick={() => _this.lookRecord(text)}>
                                <Icon type={'edit'}/>
                            </div>
                        </Tooltip>

                    );
                }
            }
        ];
    }

    //查看催收记录
    lookRecord = (text) => {
        const { lookUrgeRecord } = this.props;
        lookUrgeRecord({ overdueId: text });
    }

    urgeHandleCancel = () => {
        const { changeRecordVisible } = this.props;
        changeRecordVisible(false);

    }
    sendPayLink = (isLeng) => {
        const _this = this;
        const { match, getAllUrgeRecord, changeMessageVisible, setMessageContent } = this.props;
        const params = { overdueId: match['params']['id'] || '',isLeng: isLeng };
        axios({
            url: '/hs/admin/orderOverdue/sendPaymentLinks',
            method: 'post',
            data: params
        }).then((res) => {
            if(res && res.code == '200') {
                changeMessageVisible(true)
                setMessageContent(res.data);
                getAllUrgeRecord({ overdueId: match['params']['id'] || '' });
            }else  {
                Modal.error({
                    title:"Message",
                    content:res.message
                });
            }
        });
    }
    sendPaymentLinks = () => {
        this.sendPayLink(false);
    }
    sendExtensionLinks = () => {
        this.sendPayLink(true);
    }

    openRepaymentModel = () => {
        this.props.changeRepaymentVisible(true);
    }

    renderBtn = () => {
        const { isShowBtn, repaymentLinkIsProhibited } = this.state;
        const ele = isShowBtn ? <Button type={'primary'} onClick={this.handleBtnClick}><FormattedMessage id="windowPage.add.collect.record" /></Button> : null;
        return (
            <div className={styles.btnWrapper}>
                {ele}
                <Button onClick={this.openRepaymentModel} type={'primary'} disabled={repaymentLinkIsProhibited}><FormattedMessage id="page.table.operation.send.partial.repayment" /></Button>
                <Button onClick={this.sendPaymentLinks} type={'primary'} disabled={repaymentLinkIsProhibited}><FormattedMessage id="page.table.operation.send.payment.links" /></Button>
                <Button onClick={this.sendExtensionLinks} type={'primary'} disabled={repaymentLinkIsProhibited}><FormattedMessage id="page.table.operation.send.extension.links" /></Button>
                <Button onClick={this.backList}><FormattedMessage id="windowPage.back" /></Button>
            </div>
        );
    }
    //添加催收记录
    handleBtnClick = () => {
        const { changeVisible } = this.props;
        changeVisible(true);
    }
    //返回列表页
    backList = () => {
        const { history: { push }, location: { pathname } } = this.props;
        const pathArr = pathname.split('/');
        const realPath = '/' + pathArr[1];
        push(realPath);
    }
    //渲染订单信息
    renderOrderCard = () => {
        const { orderData: { orderInfo = {} }, intl } = this.props;
        const info = orderInfo['icloud'] || {};
        const isOlduserStyle = orderInfo['isOlduser'] === '是' ? { color: 'red' } : {};
        const standOverNumberStyle = Number(orderInfo.standOverNumber) > 0 ? { color: 'red' } : {};
        const loanCertificate = orderInfo['loanCertificate'] || {}
        const payOutStatusEnum = new Map([
          ['finish', { text: intl.formatMessage({ id: "order.payOutSuccess" }), color: 'blue'}],
          ['fail', { text: intl.formatMessage({ id: "order.payOutFail" }), color: 'red' }],
          ['pending', { text: intl.formatMessage({ id: "order.payOutPending" }), color: '' }],
        ])

        const payOutMethodEnum = new Map([
          ['BANK_ACCOUNT', intl.formatMessage({ id: "common.bankcard" })],
          ['MOBILE_WALLET', intl.formatMessage({ id: "common.eWallet" })],
        ])

        return (
            <div>
                <Card className={styles.cardBackground} type={'inner'} title={intl.formatMessage({id : "windowPage.business.info"})}>
                    <Row gutter={24}>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.order.no" />：</span><span>{orderInfo.orderNo}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.name" />：</span><span>{orderInfo.name}</span></Col>
                        <Col style={isOlduserStyle} className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.old.user" />：</span><span>{orderInfo['isOlduser']}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.mobile" />：</span><span>{orderInfo.phoneNo}</span></Col>
                      <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.product.name" />：</span><span>{orderInfo.productName}</span></Col>
                      <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.appName" />：</span><span>{orderInfo.appName}</span></Col>
                        {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>手机型号：</span><span>{orderInfo.deviceModel}</span></Col>*/}
                        {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>手机内存：</span><span>{orderInfo.deviceMemory}</span></Col>*/}
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.loan" />：</span><span>{orderInfo.loanMoney}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.appication.time" />：</span><span>{orderInfo.applyTime}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.loan.time" />：</span><span>{orderInfo.loanTime}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.expiration.time" />：</span><span>{orderInfo.expireTime}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.loan.amount" />：</span><span>{orderInfo.accountMoney}</span></Col>
                        {/*<Col style={standOverNumberStyle} className={styles.col} lg={12} xl={8}><span className={styles.title}>展期次数：</span><span>{orderInfo.standOverNumber}</span></Col>*/}
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.days.overdue" />：</span><span>{orderInfo['overdueTime']}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.amount.due.currency" />：</span><span>{orderInfo['backMoney']}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.late.fee.currency" />：</span><span>{orderInfo['lateFees']}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.amount.paid.currency" />：</span><span>{orderInfo['hasBackMoney']}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.reduce.amount.currency" />：</span><span>{orderInfo['reductionAmt']}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.interest_tax" />：</span><span>{orderInfo['serviceMoney']}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.remain.due" />：</span><span>{orderInfo['surplusBackMoney']}</span></Col>
                        <Col className={styles.col} lg={12} xl={8} style={{display:'flex'}}><span className={styles.title}><FormattedMessage id="page.table.appName" />：</span><CopyToLink text={orderInfo['appName']} acturalCopy={orderInfo['channelUrl']} title={orderInfo['channelUrl']}/></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.coupon.usage.amount.currency" />：</span><span>{orderInfo.couponUsageAmount}</span></Col>
                        {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>展期费用(₹)：</span><span>{orderInfo['standOverMoney']}</span></Col>*/}
                    </Row>
                </Card>
                {/*<Card type={'inner'} title={'iCloud账号信息'} className={styles.card}>*/}
                    {/*<Row gutter={16}>*/}
                        {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>账号：</span><span>{info['icloudNo'] || ''}</span></Col>*/}
                        {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>密码：</span><span>{info['icloudPwd'] || ''}</span></Col>*/}
                        {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>新密码：</span><span>{info['icloudPwdNew'] || ''}</span></Col>*/}
                        {/*/!*<Col className={styles.col} span={12}><span className={styles.title}>问题1：</span><span>{info['icloudSecurityQuestion1'] || ''}</span></Col>*!/*/}
                        {/*/!*<Col className={styles.col} span={12}><span className={styles.title}>答案1：</span><span>{info['icloudSecurityAnswer1'] || ''}</span></Col>*!/*/}
                        {/*/!*<Col className={styles.col} span={12}><span className={styles.title}>问题2：</span><span>{info['icloudSecurityQuestion2'] || ''}</span></Col>*!/*/}
                        {/*/!*<Col className={styles.col} span={12}><span className={styles.title}>答案2：</span><span>{info['icloudSecurityAnswer2'] || ''}</span></Col>*!/*/}
                        {/*/!*<Col className={styles.col} span={12}><span className={styles.title}>问题3：</span><span>{info['icloudSecurityQuestion3'] || ''}</span></Col>*!/*/}
                        {/*/!*<Col className={styles.col} span={12}><span className={styles.title}>答案3：</span><span>{info['icloudSecurityAnswer3'] || ''}</span></Col>*!/*/}
                    {/*</Row>*/}
                {/*</Card>*/}

                <Card style={{ marginTop: '20px'}} bodyStyle={{ padding: 0, marginTop: '-1px' }} type={'inner'} title={intl.formatMessage({ id: "order.loanCertificate" })}>
                  <Descriptions size="small" bordered column={2}>
                    <Item label={intl.formatMessage({ id: "common.status" })}>{loanCertificate.status ? <Tag color={payOutStatusEnum.get(loanCertificate.status).color}>{payOutStatusEnum.get(loanCertificate.status).text}</Tag> : "-"}</Item>
                    <Item label={intl.formatMessage({ id: "order.payOutAmount" }, { unit: conf.currency })}>{loanCertificate.amount ? loanCertificate.amount.toLocaleString() : '-'}</Item>
                    <Item label={intl.formatMessage({ id: "order.payOutCreateTime" })}>{loanCertificate.createTime ? moment(loanCertificate.createTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</Item>
                    <Item label={intl.formatMessage({ id: "order.payOutFinishTime" })}>{loanCertificate.finishTime ? moment(loanCertificate.finishTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</Item>
                    <Item label={intl.formatMessage({ id: "order.paymentOrderNumber" })}>{loanCertificate.orderNo || '-' }</Item>
                    <Item label={intl.formatMessage({ id: "order.receiverName" })}>{loanCertificate.name || '-' }</Item>
                    <Item label={intl.formatMessage({ id: "order.paymentMethod" })}>{loanCertificate.payoutMethod ? payOutMethodEnum.get(loanCertificate.payoutMethod): '-' }</Item>
                    <Item label={intl.formatMessage({ id: "order.payeeAccount" })}>{loanCertificate.account || '-' }</Item>
                  </Descriptions>
                </Card>

                <CommonTable columns={backRecordColumns} dataSource={orderInfo['backRecord'] || []} title={() => <div><FormattedMessage id="windowPage.repayment.record" /></div>}/>
                <div className={`${styles.card} ${styles.labelStyle}`}>
                    <Card bodyStyle={{ padding: 0, margin: '-1px' }} type={'inner'} title={intl.formatMessage({ id: "windowPage.repayment.proof" })}>
                        <Descriptions size="small" bordered>
                            <Item label={<FormattedMessage id="page.table.update.time" />} span={3}>{orderInfo['lastUpdateTime'] || "-"}</Item>
                            {conf.country === "India" && <Item label="UTR" span={3}>{orderInfo['receipt'] || "-"}</Item>}
                            <Item label={<FormattedMessage id="windowPage.repayment.proof" />} span={3}>
                                {orderInfo['receiptImgUrl'] ? <img width={200} src={orderInfo['receiptImgUrl']} /> : <Icon style={{ fontSize: '30px' }} type="picture" theme="twoTone" twoToneColor="#ccc" />}
                            </Item>
                        </Descriptions>
                    </Card>
                </div>
                <CommonTable columns={urgeRecordColumns} dataSource={orderInfo['urgeRecord'] || []} title={() => <div><FormattedMessage id="windowPage.collect.record" /></div>}/>
                {/*<CommonTable columns={standOverRecordColumns} dataSource={orderInfo['standOverRecord'] || []} title={() => <div>展期记录</div>}/>*/}
                <CommonTable columns={this.overdueRecordColumns} dataSource={orderInfo['overdueRecord'] || []} title={() => <div><FormattedMessage id="windowPage.overdue.record" /></div>}/>

            </div>
        );


    }
    //渲染客户信息
    renderUserInfo = () => {
        const { orderData: { userInfo = {} }, intl } = this.props;

        return (
            <div>
                <Card className={styles.cardBackground} type={'inner'} title={intl.formatMessage({id : "windowPage.person.info"})}>
                    <Row gutter={16}>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.name" />：</span><span>{userInfo.name || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.mobile" />：</span><span>{userInfo.phoneNo || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.identity.card" />：</span><span>{userInfo.idCard || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.home.address" />：</span><span>{userInfo.address || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.risk.rank" />：</span><span>{userInfo.tdreportDes || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.tongdun.score" />：</span><span>{userInfo.tdreportPoint}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.content.maritalStatus" />：</span><span>{maritalStatus[userInfo.marriageStatus] || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.content.salaryRange" />：</span><span>{salaryRange[userInfo.salaryRange] || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.education" />：</span><span>{education[userInfo.education] || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.position" />：</span><span>{position[userInfo.position] || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.email" />：</span><span>{userInfo.email || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8} ><span className={styles.title}>
                            <FormattedMessage id="windowPage.user.source" />：</span>
                            {userInfo.userSource ?
                                <Tooltip title={userInfo.userSource}>
                                    <Paragraph style={{ width: '150px', display: 'inline-block' }} copyable={{ text: userInfo.userSource }} ellipsis={true}>{userInfo.userSource}</Paragraph>
                                </Tooltip> : ''}
                        </Col>
                        {conf.country !== 'India' && <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="detail.user.company.name" />：</span><span>{userInfo.companyName || ''}</span></Col>}
                    </Row>
                </Card>


                <div className={styles.cardWrapper}>
                    <Card className={styles.cardBackground} type={'inner'} title={intl.formatMessage({id : "windowPage.emergency.contact"})}>

                    {userInfo.emergencyContactInfos && userInfo.emergencyContactInfos.map((emer, i) => {
                        return (
                        <Row gutter={24}>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.name" />：</span><span>{emer.name || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.content.relationship" />：</span><span>{emerRelation[emer.relationShip] || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.mobile" />：</span><span>{emer.phoneNr || ''}</span></Col>

                        </Row>
                        )
                    })}
                    </Card>
                </div>


                <div className={styles.card}>
                    <Card className={styles.cardBackground} type={'inner'} title={intl.formatMessage({id : "windowPage.customer.infor"})}>
                        <Row gutter={96}>
                            <Col className={`${styles.col}`} lg={12} xl={8}>
                                {
                                    userInfo['idCardFrontPhoto'] && <WatermarkPhoto className={styles.imgCol} width={'100%'} src={userInfo['idCardFrontPhoto']}/>
                                }
                            </Col>
                            <Col className={`${styles.col}`} lg={12} xl={8}>
                                {
                                  userInfo['idCardBackPhoto'] && <WatermarkPhoto className={styles.imgCol} width={'100%'} src={userInfo['idCardBackPhoto']}/>
                                }

                            </Col>
                            <Col className={`${styles.col}`} lg={12} xl={8}>
                                {
                                  userInfo['idCardPhoto'] && <WatermarkPhoto className={styles.imgCol} width={'100%'} src={userInfo['idCardPhoto']}/>
                                }
                            </Col>
                            <Col className={`${styles.col}`} lg={12} xl={8}>
                                {
                                  userInfo['panPhoto'] && <WatermarkPhoto className={styles.imgCol} width={'100%'} src={userInfo['panPhoto']}/>
                                }
                            </Col>
                        </Row>

                    </Card>
                </div>


            </div>
        );
    }



    handleAddressBookChange = (info) => {
        const { match, getAddressBook } = this.props;
        const userId = match['params']['uid']
        getAddressBook({ userId, pageNum: info.current, pageSize: info.pageSize })
    }
    //渲染通讯录
    renderAddressBook = () => {
        const { addressBook:{data=[],pagination={}}  ,intl } = this.props;
        const columns = [
            { title: intl.formatMessage({id : "page.search.list.name"}), dataIndex: 'name', key: 'name' },
            { title: intl.formatMessage({id : "page.search.list.mobile"}), dataIndex: 'phone', key: 'phone' },
            {
                title: intl.formatMessage({ id: "page.table.last.add.time" }), dataIndex: 'lastUpdateTime', key: 'lastUpdateTime',
                render (text) {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        ];
        return (
            <CommonTable columns={columns} dataSource={data}  pagination={pagination} handlePageChange={this.handleAddressBookChange} title={() => <div><FormattedMessage id="windowPage.contat.list.info" /></div>}/>
        );
    }


    handleSmsMessageChange = (info) => {
        const { match, getSmsMessage } = this.props;
        const userId = match['params']['uid']
        getSmsMessage({ userId, pageNum: info.current, pageSize: info.pageSize })
    }
    //渲染通讯录
    renderSmsMessage = () => {
        const { smsMessage: { data = [], pagination = {} }, intl } = this.props;
        const columns = [
            { title: intl.formatMessage({id : "page.table.send.number"}), dataIndex: 'phone', key: 'phone' },
            { title: intl.formatMessage({id : "page.table.content"}), dataIndex: 'content', key: 'content' ,width:'50%'},
            { title: intl.formatMessage({id : "page.table.sending.type"}), dataIndex: 'direction', key: 'direction' },
            {
                title: intl.formatMessage({ id: "page.table.sending.time" }), dataIndex: 'time', key: 'time',
                render (text) {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            },
        ];
        return (
            <CommonTable columns={columns} dataSource={data}  pagination={pagination} handlePageChange={this.handleSmsMessageChange} title={() => <div><FormattedMessage id="windowPage.contat.list.info" /></div>}/>
        );
    }

    //渲染运营商信息
    renderOperatorMsg = () => {
        const { orderData: { operator = {} } } = this.props;
        return (
            <div>
                <CommonTable columns={phoneRecordColumns} dataSource={operator['photoRecord'] || []} title={() => <div><FormattedMessage id="windowPage.call.record" /></div>}/>
                {/*<CommonTable columns={msgRecordColumns} dataSource={operator['msgRecord'] || []} title={() => <div>短信记录</div>}/>*/}
            </div>
        );
    }
    //关闭添加催收记录弹窗
    urgeModalCancel = () => {
        const { changeVisible } = this.props;
        changeVisible(false);
        this.setState({ remark: '' });
    }
    //添加催收记录
    urgeHandleOk = (obj) => {
        const { match, addUrgeRecord, getAllUrgeRecord } = this.props;
        const params = match['params']['id'] || '';
        addUrgeRecord({ ...obj, overdueId: params }, () => {
            getAllUrgeRecord({ overdueId: params });
        });

    }

    repaymentModelField = [
        { field: 'partialMoney', label: "windowPage.repayment.amount", require: true, type: 'number', scale: 0, min: 1, max: 999999, placeholder:"windowPage.repayment.amount.enter" },
    ]


    repaymentHandleOk = (params) => {
        const { match, sendPartialRepayment, intl } = this.props;
        const { partialMoney } = params;
        if (partialMoney === "" || partialMoney === undefined) {
            message.success(intl.formatMessage({ id: "windowPage.remarks.empty" }));
            return;
        }
        sendPartialRepayment({ partialMoney, overdueId: match['params']['id'] })
    }
    repaymentHandleCancel=()=>{
        this.props.changeRepaymentVisible(false);
    }

    componentDidMount() {
        const {match, getOrderData, getAllUrgeRecord ,getDetailTabControl , getAddressBook,getSmsMessage} = this.props;
        const userId = match['params']['uid']
        const params = match['params']['id'] || '';

        getOrderData({ overdueId: params }, { userId });
        getAllUrgeRecord({ overdueId: params });
        const _this = this;

        // 取得後台使用者開關 (是否可查看 tab -通訊錄 & 手機短信)
        getDetailTabControl();
        getAddressBook({ userId, pageNum: 1, pageSize: 10 });
        getSmsMessage({ userId, pageNum: 1, pageSize: 10 });



        loadRepaymentLinkFlag();

        function loadRepaymentLinkFlag() {
          axios({
            url: '/hs/admin/orderOverdue/repayment-link-is-prohibited',
            method: 'get',
            params: { overdueId: params }
          }).then((res) => {
            _this.setState({
              repaymentLinkIsProhibited: res,
            });
          });
        }
    }

    componentWillUnmount() {
        const { setOrderData } = this.props;
        setOrderData({});
    }

    formatCopyText = (text) => {
        return text.substring(text.indexOf('[ ') + 1, text.indexOf(' ]'))
    }

    render() {
        const ele = this.renderBtn();
        const { visible, recordVisible, recordData, intl, repaymentVisible, messageVisible, messageContent,changeMessageVisible,detailTabControl } = this.props;
        const { remark } = this.state;
        return (
            <div>
                <Tabs animated={false} tabBarExtraContent={ele}>
                    <TabPane tab={intl.formatMessage({id : "windowPage.order.info"})} key="1">
                        {this.renderOrderCard()}
                    </TabPane>
                    <TabPane tab={intl.formatMessage({id : "windowPage.customer.msg"})} key="2">
                        {this.renderUserInfo()}
                    </TabPane>
                    <TabPane tab={intl.formatMessage({id : "windowPage.contact.list"})} key="3" disabled={detailTabControl.contactSwitch}>
                        {this.renderAddressBook()}
                    </TabPane>
                    <TabPane tab={intl.formatMessage({id : "windowPage.sms.list"})} key="4"  disabled={detailTabControl.smsSwitch}>
                        {this.renderSmsMessage()}
                    </TabPane>
                </Tabs>
                <AddUrgeModal intl={intl} visible={visible} handleCancel={this.urgeModalCancel} handleOk={this.urgeHandleOk} remark={remark}/>
                <UrgeRecordModal visible={recordVisible} handleCancel={this.urgeHandleCancel} tableData={recordData}/>
                <FormModal
                    dataSorce={this.repaymentModelField}
                    visible={repaymentVisible}
                    title={<FormattedMessage id="page.table.operation.send.partial.repayment" />}
                    modalHandleok={this.repaymentHandleOk}
                    modalHandleCancel={this.repaymentHandleCancel}
                />
                 <CopyModalMessage
                    visible={messageVisible}
                    messageTitle={'Message'}
                    message={messageContent}
                    copyText={this.formatCopyText(messageContent)}
                    onCancel={() => changeMessageVisible(false)}
                />
            </div>
        );
    }
}

OrderDetail.propTypes = {
    orderData: PropTypes.object,
};
OrderDetail.defaultProps = {
    orderData: {
        orderInfo: {
            orderNo: 1,
            name: 'zs',
            phoneNo: '12345678998',
            loanMoney: '30',
            applyTime: '2018-5-7',
            appName: 'longingloan',
            iCloudAccount: '12345',
            iCloudPassword: '123',
            loanTime: '2018-6-07',
            accountMoney: '30',
            standOverNumber: '2',
            overdueTime: '2018-5-7',
            backMoney: '30',
            lateFees: '10',
            hasBackMoney: '20',
            surplusBackMoney: '10',
            standOverMoney: '10',
            backRecord: [],
            urgeRecord: [],
            standOverRecord: [],
            overdueRecord: [],
            deviceModel: '',
            isOlduser: '1',
            deviceMemory: ''
        },
        userInfo: {
            name: 'zs',
            phoneNo: '1234567892',
            idCard: '123456788945563235',
            address: '浙江省杭州市xxx',
            idCardFrontPhoto: '',
            idCardBackPhoto: '',
            idCardPhoto: ''
        },
        addressBook: [],
        operator: {
            photoRecord: [],
            // msgRecord: []
        }
    }
};
const mapStateToProps = (state) => {
    const { afterLoanManageState: { orderDetailState } } = state;
    return {
        orderData: orderDetailState['orderData'],
        visible: orderDetailState['visible'],
        recordVisible: orderDetailState['recordVisible'],
        recordData: orderDetailState['recordData'],
        repaymentVisible:orderDetailState['repaymentVisible'],
        messageContent:orderDetailState['messageContent'],
        messageVisible:orderDetailState['messageVisible'],
        detailTabControl:orderDetailState['detailTabControl'],
        addressBook:orderDetailState['addressBook'],
        smsMessage:orderDetailState['smsMessage'],
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeVisible: orderDetailAction.ordChangeModalVisible,
        getOrderData: orderDetailAction.ordGetOrderDetail,
        setOrderData: orderDetailAction.ordSetOrderDetail,
        changeRecordVisible: orderDetailAction.ordChangeRrecordModal,
        lookUrgeRecord: orderDetailAction.ordLookUrgeRecord,
        addUrgeRecord: orderDetailAction.ordAddUrgeRecord,
        getAllUrgeRecord: orderDetailAction.ordGetUrgeRecord,
        changeRepaymentVisible: orderDetailAction.ordChangeRepaymentModalVisible,
        sendPartialRepayment:orderDetailAction.ordPartialRepayment,
        setMessageContent:orderDetailAction.ordSetMessageContent,
        changeMessageVisible:orderDetailAction.ordChangeMessageModalVisible,
        getDetailTabControl:orderDetailAction.ordGetDetailTabControl,
        getAddressBook: orderDetailAction.ordGetAddressBook,
        getSmsMessage: orderDetailAction.ordGetSmsMessage
    }, dispatch);
};

OrderDetail.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderDetail));
