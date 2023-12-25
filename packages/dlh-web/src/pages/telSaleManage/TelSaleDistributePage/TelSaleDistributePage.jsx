import React, { useEffect, useState } from 'react';
import styles from './TelSaleDistributePage.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as telSaleAction from '../models/actions';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from "react-intl";
import SearchList  from "./SearchList/SearchList";
import ImportModal from './ImportModal/ImportModal';
import { Button, message } from 'antd';
import { CommonTable, UrgePersonModal, CopyText } from 'components';
import moment from "moment";

function TelSaleDistributePage ({
    intl,
    getTelSaleDistributeList,
    getPersonOrGroupList,
    distributeTelSale,
    importPhoneNumbers,
    deletePhoneNumbers,
    changeUrgePersonModalVisible,
    changeImportModalVisible,
    telSaleDistributeList: { data, pagination },
    loading,
    personList: { personData, type },
    urgePersonModalVisible,
    importModalVisible
}) {

    const todayString = moment().format('YYYY-MM-DD')
    const [searchParams, setSearchParams] = useState({ page: 0, size: 10, phoneNo: "", status: "", createTimeStart: `${todayString} 00:00:00`, createTimeEnd: `${todayString} 23:59:59` });
    const [selectedRow, setSelectedRow] = useState([]);

    useEffect(() => {
        getPersonOrGroupList();
    }, []);

    useEffect(() => {
        if(!urgePersonModalVisible){
            getTelSaleDistributeList({...searchParams});
        }
    }, [searchParams,urgePersonModalVisible]);


    const columns = [
        { title: intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: "phoneNo", key: "phoneNo", render (text) { return <CopyText text={text} /> }, },
        { title: intl.formatMessage({ id: "page.search.list.status" }), dataIndex: "status", key: "status", },
        { title: intl.formatMessage({ id: "page.table.tel.sale.createTime" }), dataIndex: "createTime", key: "createTime" },
    ];
    const onModalOk = (obj) => {
        // 如果type是group，只需要傳 departmentIds ，type是personal，只需要傳 collectorIds
        let key = type === 'group' ? 'departmentIds' : 'collectorIds';
        distributeTelSale({ disIds: selectedRow.join(','), [key]: obj.join(',') });
        setSelectedRow([]);
    };

    const handleSearch = (obj) => {
        const { time, phoneNo, status } = obj
        const isArr = Array.isArray(time) && time.length > 0;
        setSearchParams({
          phoneNo,
          status,
          createTimeStart: isArr && time[0] ? time[0].format('YYYY-MM-DD 00:00:00') : '',
          createTimeEnd: isArr && time[1] ? time[1].format('YYYY-MM-DD 23:59:59') : '',
          page: 0,
          size: 10
        });
    };

    const handlePageChange = (info) => {
        const { current, pageSize } = info;
        setSearchParams({ ...searchParams, page: current - 1, size: pageSize, });
    };

    const handleModalVisible = () => {
        selectedRow.length === 0
            ? message.warn(intl.formatMessage({ id: "windowPage.select.order" }))
            : changeUrgePersonModalVisible(true);
    };

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRow(selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys: selectedRow,
        onChange: onSelectChange,
    };

    const handleImportPhoneNumbers=(obj)=>{
        importPhoneNumbers(obj)

    }
    const handleDeleteDistribute = () => {
        selectedRow.length === 0
            ? message.warn(intl.formatMessage({ id: "windowPage.select.order" }))
            : deletePhoneNumbers(selectedRow);
        setSelectedRow([]);
    }
    return (
        <div>
            <SearchList handleSearch={handleSearch} initSearch={searchParams} />
            <div className={styles.operation}>
                <Button type={'danger'} onClick={handleDeleteDistribute}><FormattedMessage id="page.table.delete" /></Button>
                <Button type={"primary"} onClick={handleModalVisible}><FormattedMessage id="windowPage.distribute.tel.sale" /></Button>
                <Button type={"primary"} onClick={() => changeImportModalVisible(true)}><FormattedMessage id="page.table.tel.sale.import" /></Button>
            </div>
            <CommonTable
                rowSelection={rowSelection}
                columns={columns}
                handlePageChange={handlePageChange}
                dataSource={data}
                pagination={{ ...pagination, pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "300", "400", "500", "1000", "2000"] }}
                loading={loading}
            />
            <UrgePersonModal
                onModalCancel={() => changeUrgePersonModalVisible(false)}
                onModalOk={onModalOk}
                urgePerson={personData}
                visible={urgePersonModalVisible}
                modalTitle={"page.table.select.tel.sale.collector.name"}
            />
            <ImportModal
                handleOk={handleImportPhoneNumbers}
                handleCancel={() => changeImportModalVisible(false)}
                visible={importModalVisible}
            />
        </div>
    );
}
const mapStateToProps = (state) => {
    const { telSaleManageState: {  telSaleState } } = state;
    return {
        telSaleDistributeList: telSaleState['distributeListData'],
        loading: telSaleState['distributeListLoading'],
        personList: telSaleState['personOrGroupData'],
        urgePersonModalVisible: telSaleState['urgePersonModalVisible'],
        importModalVisible: telSaleState['importModalVisible'],
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTelSaleDistributeList: telSaleAction.distributeList.get,
        importPhoneNumbers:telSaleAction.importTelSalePhoneNumbers,
        deletePhoneNumbers:telSaleAction.deleteTelSalePhoneNumbers,
        changeImportModalVisible:telSaleAction.changeTelSaleImportModalVisible,
        getPersonOrGroupList: telSaleAction.personOrGroupList.get,
        changeUrgePersonModalVisible: telSaleAction.changeUrgePersonModalVisible,
        distributeTelSale: telSaleAction.distributeTelSaleData,

    }, dispatch)
}

TelSaleDistributePage.propTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TelSaleDistributePage));

