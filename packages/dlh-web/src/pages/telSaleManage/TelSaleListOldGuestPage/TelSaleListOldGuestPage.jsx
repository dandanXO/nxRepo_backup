import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import styles from './TelSaleListOldGuestPage.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as telSaleAction from '../models/actions';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from "react-intl";
import SearchList  from "./SearchList/SearchList";
import { CommonTable, CopyText, UrgePersonModal } from 'components';
import { Button, Icon, Tooltip, message } from 'antd';
function TelSaleListOldGuestPage ({
     intl,
     getTelSaleList,
     getPersonOrGroupList,
     distributeTelSale,
     telSaleList,
     loading,
     getCollectorList,
     collectorList,
     changeUrgePersonModalVisible,
     urgePersonModalVisible,
     personList: { personData, type },
     ...props
}) {

    const [searchParams, setSearchParams] = useState({ assignedStartTime: "", assignedEndTime: "", status: "", userPhone: "", collectorId: "" })
    const [selectedRow, setSelectedRow] = useState([]);

    const loginInfo = JSON.parse(Cookies.get('adminUser'))
    const { roleId } = loginInfo['data']

    useEffect(() => {
        getPersonOrGroupList();
        getCollectorList()
    }, []);

    useEffect(() => {
        getTelSaleList({ ...searchParams },'old')
    }, [searchParams])

    const columns=[
        {
            title: intl.formatMessage({id: "page.table.operation"}),dataIndex: 'id', key: 'id',width:"5%",
            render(text, record) {
                const {phoneNo,userId} = record;
                return (
                    <Tooltip title={intl.formatMessage({id: "page.table.view.detail"})}>
                        <div onClick={() => handleRecordModal(phoneNo,userId)} className={styles.operatorWrapper}>
                            <Icon type="exception"/>
                        </div>
                    </Tooltip>
                );
            }
        },
        { title: intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'phoneNo', key: 'phoneNo', render(text) { return <CopyText text={text} /> } },
        { title: intl.formatMessage({ id: "page.search.list.status" }), dataIndex: 'userStatus', key: 'userStatus' },
        { title: intl.formatMessage({ id: "page.search.list.distribute.time" }), dataIndex: 'distributeTime', key: 'distributeTime'},
        { title: intl.formatMessage({ id: "page.table.tel.sale.collector.name" }), dataIndex: "collectorName", key: "collectorName" },
    ]


    const handleRecordModal = (phoneNo,userId) => {
        const { history: { push } } = props;
        push(`/tel-sale-old-guest/id=${phoneNo}&${userId}`)
    }
    const handleSearch = (obj) => {
        const { time, userPhone, status, collectorId } = obj
        const isArr = Array.isArray(time) && time.length > 0;
        setSearchParams({
            assignedStartTime: isArr && time[0] ? time[0].format('YYYY-MM-DD 00:00:00') : '',
            assignedEndTime: isArr && time[1] ? time[1].format('YYYY-MM-DD 23:59:59') : '',
            userPhone,
            status,
            collectorId
        });
    }

    //重新分配
    const handleModalVisible = () => {
        selectedRow.length === 0
            ? message.warn(intl.formatMessage({ id: "windowPage.select.order" }))
            : changeUrgePersonModalVisible(true);
    };

    const onSelectChange = (selectedRowKeys) => {
        console.log(selectedRowKeys)
        setSelectedRow(selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys: selectedRow,
        onChange: onSelectChange,
    };

    const onModalOk = (obj) => {
        // 如果type是group，只需要傳 departmentIds ，type是personal，只需要傳 collectorIds
        let key = type === 'group' ? 'departmentIds' : 'collectorIds';
        distributeTelSale({ disIds: selectedRow.join(','), [key]: obj.join(',') }, () => { getTelSaleList({ ...searchParams }) });
        setSelectedRow([])
    };
    return (
        <div className={''}>
            <SearchList handleSearch={handleSearch} time={[]} collectors={collectorList}/>
            {/* 一般電銷人員不顯示重新分配訂單按紐 */}
            {![26].includes(roleId) && <Button type={'primary'} onClick={handleModalVisible}><FormattedMessage id="page.table.redistribute.order"/></Button>}
            <CommonTable
                rowKey={(record, index) => record.id}
                rowSelection={rowSelection}
                dataSource={telSaleList}
                columns={columns}
                loading={loading}
            />
            <UrgePersonModal
                onModalCancel={() => changeUrgePersonModalVisible(false)}
                onModalOk={onModalOk}
                urgePerson={personData}
                visible={urgePersonModalVisible}
                modalTitle={"page.table.select.tel.sale.collector.name"}
            />
        </div>
    );
}
const mapStateToProps = (state) => {
    const { telSaleManageState: { telSaleState } } = state;
    return {
        telSaleList: telSaleState['telSaleListData'],
        loading: telSaleState['telSaleListLoading'],
        urgePersonModalVisible:telSaleState['urgePersonModalVisible'],
        personList: telSaleState['personOrGroupData'],
        collectorList:telSaleState['telSaleCollectorListData'],
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTelSaleList: telSaleAction.telSaleList.get,
        getCollectorList: telSaleAction.telSaleCollectorList.get,
        changeUrgePersonModalVisible: telSaleAction.changeUrgePersonModalVisible,
        distributeTelSale: telSaleAction.distributeTelSaleData,
        getPersonOrGroupList: telSaleAction.personOrGroupList.get,
    }, dispatch)
}

TelSaleListOldGuestPage.propTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TelSaleListOldGuestPage));

