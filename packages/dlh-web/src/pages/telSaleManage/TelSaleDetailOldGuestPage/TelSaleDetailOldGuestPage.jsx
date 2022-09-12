import React, { useEffect, useState } from 'react';
import styles from './TelSaleDetailOldGuestPage.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as telSaleAction from '../models/actions';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from "react-intl";
import moment from 'moment';
import { CommonTable } from 'components';
import { Tabs, Icon, Tooltip, Card, Row, Col, Modal } from 'antd';
import { RecordList } from '../components';
import { emerRelation } from 'utils'
import { maritalStatus, salaryRange, education, position, repaymentType } from "utils";
const { TabPane } = Tabs;
function TelSaleDetailOldGuestPage ({
    intl,
    getGuestInfo,
    getRecordList,
    getUserContactsList,
    getOverdueCollectionList,
    changeModalVisible,
    guestInfo = [],
    userContactsList = [],
    overdueCollectionList = [],
    loading,
    recordList = [],
    addRecord,
    visible,
    ...props
}) {

    const { history: { location: { pathname } } } = props;

    const urlQuery = pathname.split('id=')[1].split('&');
    const phoneNo = urlQuery[0];
    const userId = urlQuery[1];

    useEffect(() => {
        getGuestInfo({ phoneNo: phoneNo }, 'old');
        getUserContactsList({ userId: userId })
        getRecordList({ page: 0, size: 10, phoneNo: phoneNo }, 'old');
        
    }, []);

    const handleAddRecord = (obj,form) => {
        addRecord({ phoneNo: phoneNo, ...obj },'new');
        form.resetFields();
    }

    const handlePageChange = (info) => {
        const { current, pageSize } = info;
        getRecordList({ page: current - 1, size: pageSize, phoneNo: phoneNo },'new');
    };


    const ColItem = ({ i18n, label, className = {} }) => <Col className={`${styles.col} ${className}`} lg={12} xl={8}><span ><FormattedMessage id={i18n} />：</span><span className={styles.title}>{label}</span></Col>
    
    const handleRecordDetail=(id)=>{
        getOverdueCollectionList({overdueId:id})
        changeModalVisible(true)
    }
    
    const renderOrderInfo = () => {
        const { orderInfo=[] } = guestInfo;
        const { hsPayOrderList=[] ,overdueCollectionRecords=[],hsOrderOverdueRecordList=[]}=orderInfo;
        const { orderNo, userTrueName, isOlduser, userPhone, deviceMoney, applyTime, loanTime, lendMoney,
            expireDays, payable, overMoney, payMoney, reductionAmt, serviceMoney,leftMoney, appName } = orderInfo;

        const isOlduserStyle = isOlduser ? styles.hint : {};
        const isOrderUserText = { 0: <FormattedMessage id="page.table.no" />, 1: <FormattedMessage id="page.table.yes" /> }
           
        
        const orderList = [
            { i18n: "page.search.list.order.no", label: orderNo },
            { i18n: "page.search.list.name", label: userTrueName },
            { i18n: "page.table.old.user", label: isOrderUserText[orderInfo.isOlduser], className: isOlduserStyle },
            { i18n: "page.search.list.mobile", label: userPhone },
            { i18n: "page.table.loan", label: deviceMoney },
            { i18n: "page.search.list.appication.time", label: applyTime && moment(Number(applyTime) * 1000).format('YYYY-MM-DD HH:mm:ss') },
            { i18n: "page.table.loan.time", label: loanTime && moment(Number(loanTime) * 1000).format('YYYY-MM-DD HH:mm:ss') },
            { i18n: "page.table.loan.amount", label: lendMoney },
            { i18n: "page.table.days.overdue", label: expireDays },
            { i18n: "page.table.amount.due.currency", label: payable },
            { i18n: "windowPage.late.fee.currency", label: overMoney },
            { i18n: "page.table.amount.paid.currency", label: payMoney },
            { i18n: "page.table.reduce.amount.currency", label: reductionAmt },
            { i18n: "page.table.interest_tax", label: serviceMoney },
            { i18n: "windowPage.remain.due", label: leftMoney },
            { i18n: "page.table.appName", label: appName },
        ]

        // 还款记录
        const hsPayOrderListColumns = [
            {
                title: <FormattedMessage id="page.search.list.repaid.time" />, dataIndex: 'payTime', key: 'payTime',
                render (text) { return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss'); }
            },
            { title: <FormattedMessage id="windowPage.payment.method" />, dataIndex: 'payName', key: 'payName' },
            { title: <FormattedMessage id="windowPage.repayment.type" />, dataIndex: 'state', key: 'state', render (text) { return repaymentType[text] || ''; } },
            { title: <FormattedMessage id="windowPage.repayment.amount" />, dataIndex: 'totalMoney', key: 'totalMoney', render (text, record) { return convertMoneyFormat(text); } },
            { title: <FormattedMessage id="page.search.list.trans.serial.no" />, dataIndex: 'payTradeNo', key: 'payTradeNo' },
            { title: <FormattedMessage id="windowPage.collector" />, dataIndex: 'collectorName', key: 'collectorName' }
        ];

        //催收记录
        const overdueCollectionRecordsColumns = [
            {
                title: <FormattedMessage id="windowPage.add.time" />, dataIndex: 'createTime', key: 'createTime',
                render (text) { return moment(text).format('YYYY-MM-DD HH:mm:ss'); }
            },
            { title: <FormattedMessage id="windowPage.collect.remark" />, dataIndex: 'remark', key: 'remark', width: '60%' },
            { title: <FormattedMessage id="windowPage.collector" />, dataIndex: 'collectorname', key: 'collectorname' }
        ];

        //逾期记录
        const hsOrderOverdueRecordListColumns = [
            { title: intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo' },
            {
                title: intl.formatMessage({ id: "page.table.overdue.time" }), dataIndex: 'expireTime', key: 'expireTime',
                render (text) { return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss'); }
            },
            { title: intl.formatMessage({ id: "windowPage.collector" }), dataIndex: 'collectorName', key: 'collectorName' },
            {
                title: intl.formatMessage({ id: "page.table.operation" }), dataIndex: 'overdueId', key: 'overdueId',
                render (text) {
                    return (
                        <Tooltip title={intl.formatMessage({ id: "windowPage.view.collect.record" })}>
                            <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={()=>handleRecordDetail(text)}>
                                <Icon type={'edit'} />
                            </div>
                        </Tooltip>

                    );
                }
            }
        ];

        const tableProps = {
            loading: loading,
            rowKey: (r, i) => i
        }
        return <div>
            <Card type={'inner'} className={styles.card} title={intl.formatMessage({ id: "windowPage.business.info" })}>
                <Row gutter={24}>
                    {orderList.map(i => <ColItem {...i} key={i.i18n}/>)}
                </Row>
            </Card>
            <CommonTable {...tableProps} columns={hsPayOrderListColumns} dataSource={hsPayOrderList} title={() => <div><FormattedMessage id="windowPage.repayment.record" /></div>} />
            <CommonTable {...tableProps} columns={overdueCollectionRecordsColumns} dataSource={overdueCollectionRecords} title={() => <div><FormattedMessage id="windowPage.collect.record" /></div>} />
            <CommonTable {...tableProps} columns={hsOrderOverdueRecordListColumns} dataSource={hsOrderOverdueRecordList} title={() => <div><FormattedMessage id="windowPage.overdue.record" /></div>} />
        </div>
    }

    const renderUserInfo = () => {
        const { customerInfo = [] } = guestInfo;
        const { emergencyContactInfos = [] } = customerInfo
        const { nameTrue, userPhone, idCardNo, address,
            idcardFrontPhoto, idcardBackPhoto, livingPhoto, panPhoto } = customerInfo;
      
        const infoList = [
            { i18n: "page.search.list.name", label: nameTrue },
            { i18n: "page.search.list.mobile", label: userPhone },
            { i18n: "windowPage.identity.card", label: idCardNo },
            { i18n: "windowPage.home.address", label: address },
            { i18n: "page.content.maritalStatus", label: maritalStatus[customerInfo.marriageStatus] },
            { i18n: "page.content.salaryRange", label: salaryRange[customerInfo.salaryRange] },
            { i18n: "page.table.education", label: education[customerInfo.education] },
            { i18n: "page.table.position", label: position[customerInfo.position] },
        ]

       
        return <div>
           
            <Card type={'inner'} className={styles.card} title={intl.formatMessage({ id: "windowPage.person.info" })}>
                <Row gutter={24}>
                    {infoList.map(i => <ColItem {...i} key={i.i18n}/>)}
                </Row>
            </Card>
            <Card type={'inner'} className={styles.card} title={intl.formatMessage({ id: "windowPage.business.info" })}>
                {emergencyContactInfos && emergencyContactInfos.map((info, idx) => {
                    return (
                        <Row gutter={24}>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.name" />：</span><span>{info.name || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.content.relationship" />：</span><span>{emerRelation[info.relationShip] || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.mobile" />：</span><span>{info.phoneNr || ''}</span></Col>
                        </Row>
                    )
                })}
            </Card>
            <Card type={'inner'} title={intl.formatMessage({ id: "windowPage.customer.infor" })}>
                <Row gutter={96}>
                    <Col className={styles.col} lg={12} xl={8}>
                        {idcardFrontPhoto && <img className={styles.imgCol} width={'100%'} src={idcardFrontPhoto} />}
                    </Col>
                    <Col className={styles.col} lg={12} xl={8}>
                        {idcardBackPhoto && <img className={styles.imgCol} width={'100%'} src={idcardBackPhoto} />}
                    </Col>
                    <Col className={styles.col} lg={12} xl={8}>
                        {livingPhoto && <img className={styles.imgCol} width={'100%'} src={livingPhoto} />}
                    </Col>
                    <Col className={styles.col} lg={12} xl={8}>
                        {panPhoto && <img className={styles.imgCol} width={'100%'} src={panPhoto} />}
                    </Col>
                </Row>
            </Card>
        </div>
    }

    const renderAddressBook=()=>{
        const columns = [
            { title: intl.formatMessage({id : "page.search.list.name"}), dataIndex: 'contactsName', key: 'contactsName' },
            { title: intl.formatMessage({id : "page.search.list.mobile"}), dataIndex: 'contactsPhone', key: 'contactsPhone' }
        ];
        return (
            <CommonTable columns={columns} dataSource={userContactsList} title={() => <div><FormattedMessage id="windowPage.contat.list.info" /></div>}/>
        );
    }

    const overdueCollectionColumns = [
        {
            title: <FormattedMessage id="windowPage.add.time" />,
            dataIndex: 'createTime',
            key: 'createTime',
            render(text) {
                return moment(text).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        { title: <FormattedMessage id="windowPage.collect.remark" />, dataIndex: 'remark', key: 'remark',width:'60%' },
        { title: <FormattedMessage id="windowPage.collector" />, dataIndex: 'collectorname', key: 'collectorname' }
    ];
    
    return (
        <div className={''}>
            <Tabs animated={false} tabBarExtraContent={''}>
                <TabPane tab={intl.formatMessage({ id: "windowPage.order.info" })} key="1">
                    {renderOrderInfo()}
                </TabPane>
                <TabPane tab={intl.formatMessage({ id: "windowPage.customer.msg" })} key="2">
                    {renderUserInfo()}
                </TabPane>
                <TabPane tab={intl.formatMessage({ id: "windowPage.contact.list" })} key="3">
                    {renderAddressBook()}
                </TabPane>
                <TabPane tab={intl.formatMessage({ id: "page.table.tel.sale.remark" })} key="4">
                    <RecordList
                        phoneNo={phoneNo}
                        recordList={recordList}
                        handleAddRecord={handleAddRecord}
                        handlePageChange={handlePageChange}
                    />
                </TabPane>
            </Tabs>
            <Modal
                onCancel={()=>changeModalVisible(false)}
                width={1000}
                visible={visible}
                footer={null}
                title={intl.formatMessage({id : "windowPage.collect.record"})}
            >
                <div>
                    <CommonTable columns={overdueCollectionColumns} dataSource={overdueCollectionList}/>
                </div>
            </Modal>
        </div>
    );
}
const mapStateToProps = (state) => {
    const { telSaleManageState: { telSaleState } } = state;
    return {
        guestInfo: telSaleState['guestInfoData'],
        loading: telSaleState['guestInfoLoading'],
        recordList: telSaleState['recordListData'],
        userContactsList: telSaleState['userContactsData'],
        overdueCollectionList: telSaleState['overdueCollectionData'],
        visible: telSaleState['overdueCollectionModalVisible'],
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGuestInfo: telSaleAction.guestInfo.get,
        getRecordList: telSaleAction.recordList.get,
        addRecord: telSaleAction.addCollectionRecordData,
        getUserContactsList: telSaleAction.userContacts.get,
        getOverdueCollectionList:telSaleAction.overdueCollection.get,
        changeModalVisible:telSaleAction.changeOverdueCollectionModalVisible,
    }, dispatch)
}

TelSaleDetailOldGuestPage.propTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TelSaleDetailOldGuestPage));

