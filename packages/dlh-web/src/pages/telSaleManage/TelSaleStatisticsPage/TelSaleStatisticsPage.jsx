import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as telSaleAction from '../models/actions';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from "react-intl";
import SearchList  from "./SearchList/SearchList";
import { CommonTable, CopyText, UrgePersonModal } from 'components';
import { Button, Icon, Tooltip, message } from 'antd';
import moment from 'moment';
function TelSaleStatisticsPage ({
     intl,
     getStatisticsList,
     getCollectorList,
     statisticsList,
     collectorList,
     loading,
}) {
    const initTime = [
        moment().subtract(7, 'days'),
        moment()
    ];
    const convertInitTime=[
        initTime[0].format('YYYY-MM-DD 00:00:00'),
        initTime[1].format('YYYY-MM-DD 23:59:59')
    ]
    const [searchParams, setSearchParams] = useState({
        assignedStartTime: convertInitTime[0],
        assignedEndTime: convertInitTime[1],
        loanStartTime: convertInitTime[0],
        loanEndTime: convertInitTime[1],
        registerStartTime: convertInitTime[0],
        registerEndTime: convertInitTime[1],
        collectorId: "",
    });

    useEffect(() => {
        getCollectorList();
    }, []);

    useEffect(() => {
        getStatisticsList({ ...searchParams })
    }, [searchParams])

    const columns = [

        { title: intl.formatMessage({ id: "page.search.customer.service" }), dataIndex: 'collectorName', key: 'collectorName', render (text) { return <CopyText text={text} /> } },
        { title: intl.formatMessage({ id: "page.table.assigneda.total" }), dataIndex: 'totalAssigned', key: 'totalAssigned' },
        { title: intl.formatMessage({ id: "page.table.assigned.new.guest" }), dataIndex: 'newGuestAssigned', key: 'newGuestAssigned' },
        { title: intl.formatMessage({ id: "page.table.assigned.old.guest" }), dataIndex: "oldGuestAssigned", key: "oldGuestAssigned" },
        {
            title: intl.formatMessage({ id: "page.table.registered.new.guest" }), dataIndex: "newGuestRegistered", key: "newGuestRegistered",
            render (text, record) {return <div>{`${record.newGuestRegistered} ( ${record.newGuestRegisteredRate} )`}</div>}
        },
        {
            title: intl.formatMessage({ id: "page.table.certified.new.guest" }), dataIndex: "newGuestCertified", key: "newGuestCertified",
            render (text, record) { return <div>{`${record.newGuestCertified} ( ${record.newGuestCertifiedRate} )`}</div> }
        },
        {
            title: intl.formatMessage({ id: "page.table.loan.new.guest" }), dataIndex: "newGuestLoan", key: "newGuestLoan",
            render (text, record) { return <div>{`${record.newGuestLoan} ( ${record.newGuestLoanRate} )`}</div> }
        },
        {
            title: intl.formatMessage({ id: "page.table.loan.old.guest" }), dataIndex: "oldGuestLoan", key: "oldGuestLoan",
            render (text, record) { return <div>{`${record.oldGuestLoan} ( ${record.oldGuestLoanRate} )`}</div> }
        },

    ]


    const handleSearch = (obj) => {
        const { assignedTime, collectorId } = obj
        const convertStartTime = (time) => time ? time.format('YYYY-MM-DD 00:00:00') : '';
        const convertEndTime = (time) => time ? time.format('YYYY-MM-DD 23:59:59'): '';

        setSearchParams({
            assignedStartTime: convertStartTime(assignedTime[0]),
            assignedEndTime: convertEndTime(assignedTime[1]),
            collectorId
        });
    }


    return (
        <div className={''}>
            <SearchList handleSearch={handleSearch} time={initTime} collectors={collectorList}/>
            <CommonTable
                dataSource={statisticsList}
                columns={columns}
                loading={loading}
            />

        </div>
    );
}
const mapStateToProps = (state) => {
    const { telSaleManageState: { telSaleState } } = state;
    return {
        statisticsList: telSaleState['statisticsListData'],
        loading: telSaleState['statisticsListLoading'],
        collectorList:telSaleState['telSaleCollectorListData'],
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getStatisticsList: telSaleAction.statisticsList.get,
        getCollectorList: telSaleAction.telSaleCollectorList.get,
    }, dispatch)
}

TelSaleStatisticsPage.propTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TelSaleStatisticsPage));

