import React, { useEffect, useState } from 'react';
import styles from './TelSaleDetailNewGuestPage.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as telSaleAction from '../models/actions';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from "react-intl";
import moment from 'moment';
import { Tabs, Card, Row, Col } from 'antd';
import { maritalStatus, salaryRange, education, position } from "utils";
import { RecordList } from '../components';
const { TabPane } = Tabs;
function TelSaleDetailNewGuestPage ({ intl, getGuestInfo, getRecordList, guestInfo, recordList, addRecord, ...props }) {

    const { history: { location: { pathname } } } = props;
    const phoneNo = pathname.split('id=')[1];

    useEffect(() => {
        getGuestInfo({ phoneNo: phoneNo },'new');
        getRecordList({ page: 0, size: 10, phoneNo: phoneNo},'new');
    }, []);

    const renderDetail = () => {
        const { orderNo, userName, userPhone, deviceMoney, applyTime, loanTime, appName, idcardNo, address } = guestInfo;
        const ColItem=({i18n,label})=><Col className={styles.col} lg={12} xl={8}><span ><FormattedMessage id={i18n} />：</span><span className={styles.title}>{label}</span>
    </Col>
        const orderList = [
            { i18n: "page.search.list.order.no", label: orderNo },
            { i18n: "page.search.list.name", label: userName },
            { i18n: "page.search.list.mobile", label: userPhone },
            { i18n: "page.table.loan", label: deviceMoney },
            { i18n: "page.search.list.appication.time", label: applyTime && moment(Number(applyTime) * 1000).format('YYYY-MM-DD HH:mm:ss') },
            { i18n: "page.table.loan.time", label: loanTime && moment(Number(loanTime) * 1000).format('YYYY-MM-DD HH:mm:ss') },
            { i18n: "page.table.appName", label: appName },
        ]

        const infoList = [
            { i18n: "page.search.list.name", label: userName },
            { i18n: "page.search.list.mobile", label: userPhone },
            { i18n: "windowPage.identity.card", label: idcardNo },
            { i18n: "windowPage.home.address", label: address },
            { i18n: "page.content.maritalStatus", label: maritalStatus[guestInfo.marriageStatus] },
            { i18n: "page.content.salaryRange", label: salaryRange[guestInfo.salary] },
            { i18n: "page.table.education", label: education[guestInfo.education] },
            { i18n: "page.table.position", label: position[guestInfo.position] },
        ]
        return <div>
            <Card type={'inner'} className={styles.card} title={intl.formatMessage({ id: "windowPage.business.info" })}>
                <Row gutter={24}>
                    {orderList.map(i => <ColItem {...i} />)}
                </Row>
            </Card>
            <Card type={'inner'} className={styles.card} title={intl.formatMessage({ id: "windowPage.person.info" })}>
                <Row gutter={24}>
                    {infoList.map(i => <ColItem {...i} />)}
                </Row>
            </Card>
        </div>
    }
    const handleAddRecord = (obj,form) => {
        addRecord({ phoneNo: phoneNo, ...obj },'new');
        form.resetFields();
    }

    const handlePageChange = (info) => {
        const { current, pageSize } = info;
        getRecordList({ page: current - 1, size: pageSize, phoneNo: phoneNo },'new');
    };

    return (
        <div className={''}>
            <Tabs animated={false} tabBarExtraContent={''}>
                <TabPane tab={intl.formatMessage({ id: "page.table.details" })} key="1">
                    {renderDetail()}
                </TabPane>
                <TabPane tab={intl.formatMessage({ id: "page.table.tel.sale.remark" })} key="2">
                    <RecordList
                        phoneNo={phoneNo}
                        recordList={recordList}
                        handleAddRecord={handleAddRecord}
                        handlePageChange={handlePageChange}
                    />
                </TabPane>

            </Tabs>
        </div>
    );
}
const mapStateToProps = (state) => {
    const { telSaleManageState: { telSaleState } } = state;
    return {
        guestInfo: telSaleState['guestInfoData'],
        recordList: telSaleState['recordListData'],
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGuestInfo: telSaleAction.guestInfo.get,
        getRecordList: telSaleAction.recordList.get,
        addRecord: telSaleAction.addCollectionRecordData
    }, dispatch)
}

TelSaleDetailNewGuestPage.propTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TelSaleDetailNewGuestPage));

