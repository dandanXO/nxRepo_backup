import React, { useEffect, useState } from 'react';
import styles from './TelSaleListNewGuestPage.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as telSaleAction from '../models/actions';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from "react-intl";
import SearchList  from "./SearchList/SearchList";
import { ColumnExpandTable, CopyText, UrgePersonModal } from 'components';
import { Button, Icon, Tooltip, message } from 'antd';

function TelSaleListNewGuestPage ({
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
    useEffect(() => {
        getPersonOrGroupList();
        getCollectorList();
    }, []);

    useEffect(() => {
        if(!urgePersonModalVisible){
            getTelSaleList({ ...searchParams },'new');
        }
    }, [searchParams,urgePersonModalVisible])

    const firstColumns=[
        {
            title: intl.formatMessage({id: "page.table.operation"}),dataIndex: 'id', key: 'id',width:"5%",
            render(text, record) {
                const {phoneNo} = record;
                return (
                    <Tooltip title={intl.formatMessage({id: "page.table.view.detail"})}>
                        <div onClick={() => handleRecordModal(phoneNo)} className={styles.operatorWrapper}>
                            <Icon type="exception"/>
                        </div>
                    </Tooltip>
                );
            }
        },
        { title: intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'phoneNo', key: 'phoneNo', render(text) { return <CopyText text={text} /> } },
        { title: intl.formatMessage({ id: "page.search.list.status" }), dataIndex: 'userStatus', key: 'userStatus' },
        { title: intl.formatMessage({ id: "page.search.list.distribute.time" }), dataIndex: 'distributeTime', key: 'distributeTime'},
        { title: intl.formatMessage({ id: "page.search.list.reg.time" }),dataIndex: 'registeredTime', key: 'registeredTime'},
        { title: intl.formatMessage({ id: "page.table.tel.sale.collector.name" }), dataIndex: "collectorName", key: "collectorName" },

    ]

    const expandColumns = [
        { title: intl.formatMessage({ id: "page.table.idCard" }), dataIndex: 'idCard', key: 'idCard', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.questionnaire" }), dataIndex: 'questionnaire', key: 'questionnaire', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.emerg.contact" }), dataIndex: 'emergeContact', key: 'emergeContact', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "windowPage.person.info" }), dataIndex: 'personalInfo', key: 'personalInfo', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.livness" }), dataIndex: 'liveNess', key: 'liveNess', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.bank.card" }), dataIndex: 'bankCard', key: 'bankCard', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.contact" }), dataIndex: 'contact', key: 'contact', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.photo" }), dataIndex: 'photo', key: 'photo', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.app" }), dataIndex: 'app', key: 'app', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.sms" }), dataIndex: 'sms', key: 'sms', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.system" }), dataIndex: 'system', key: 'system', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.network" }), dataIndex: 'network', key: 'network', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.location" }), dataIndex: 'location', key: 'location', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.sim.card" }), dataIndex: 'sim', key: 'sim', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.bluetooth" }), dataIndex: 'bluetooth', key: 'bluetooth', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.file" }), dataIndex: 'file', key: 'file', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.video" }), dataIndex: 'video', key: 'video', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
        { title: intl.formatMessage({ id: "page.table.Audio" }), dataIndex: 'audio', key: 'audio', render (text) { return <FormattedMessage id={text?'page.table.yes':'page.table.no'} /> } },
    ]


    const handleRecordModal = (phoneNo) => {
        const { history: { push } } = props;
        push(`/tel-sale-new-guest/id=${phoneNo}`);
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
        setSelectedRow(selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys: selectedRow,
        onChange: onSelectChange,
    };

    const onModalOk = (obj) => {
        // 如果type是group，只需要傳 departmentIds ，type是personal，只需要傳 collectorIds
        let key = type === 'group' ? 'departmentIds' : 'collectorIds';
        distributeTelSale({ disIds: selectedRow.join(','), [key]: obj.join(',') });
        setSelectedRow([])
    };
    return (
        <div className={''}>
            <SearchList handleSearch={handleSearch} time={[]} collectors={collectorList} />
            <ColumnExpandTable
                rowKey={(record, index) => record.id}
                rowSelection={rowSelection}
                tableData={telSaleList}
                loading={loading}
                firstColumns={firstColumns}
                lastColumns={[]}
                expandColumns={expandColumns}
                extraButtons={[
                    <Button type={'primary'} onClick={handleModalVisible}><FormattedMessage id="page.table.redistribute.order"/></Button>
                ]}
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

TelSaleListNewGuestPage.propTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TelSaleListNewGuestPage));

