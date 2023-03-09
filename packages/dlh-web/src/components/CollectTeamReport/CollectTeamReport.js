import React, { useState,useEffect } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import SearchList from './SearchList/SearchList';
import { CommonTable } from 'components';
import styles from "./CollectTeamReport.less";
import download from "downloadjs";
import { message } from "antd";
function CollectTeamReport({ type,teamsData, tableData, getReportData, initTime, downloadReport, downloadData, intl, isSuperAdmin, allMerchants ,loading }) {

    const renderRowSpan = (date, team, parentField, parentValue, field, value, index) => {
        const obj = {
            children: value,
            props: { className: field }
        };
        const dateList = tableData.filter((item) => item.reportDate === date);
        const mainData = dateList.filter((i) => i.team === team);

        const filterParentData =
            parentField !== ""
                ? mainData.filter((i) => i[parentField] === parentValue)
                : [...dateList];

        const filterData = filterParentData.filter((i) => i[field] === value);

        let firstIndex = filterParentData.map((x) => x[field]).indexOf(value);
        let firstRowIndex = filterParentData[firstIndex].rowIndex;
        let lastIndex = filterParentData.map((x) => x[field]).lastIndexOf(value);
        let lastRowIndex = filterParentData[lastIndex].rowIndex;
        const count = filterData.length;

        if (count > 0 && index === firstRowIndex) {
            obj.props.rowSpan = count;
            return obj;
        }
        const next = index === dateList.length - 1 ? index : index + 1;
        const isSameData = dateList[index][field] === dateList[next][field];
        if (isSameData || index === lastRowIndex) {
            obj.props.rowSpan = 0;
            return obj;
        }
    };


    useEffect(()=>{
        if (downloadData.length === 0) return;
        const downloadReport = async () => {
            await message.success(intl.formatMessage({ id: "page.table.exporting" }));
            await download(downloadData, intl.formatMessage({ id: `menu.collect.team.report.${type}.xlsx` }, { expDate: Date.now() }));
            await message.destroy();
        }
        downloadReport();
    },[downloadData])

    const columns = [
        {
            title: <FormattedMessage id="page.table.report.date" />, dataIndex: "reportDate", key: "reportDate",
            render: (value, row) => renderRowSpan(row.reportDate, row.team, "", value, "reportDate", value, row.rowIndex)
        },
        {
            title: <FormattedMessage id="page.table.collect-team" />, className: 'teams',
            children: [
                {
                    title: <FormattedMessage id="page.table.name" />, dataIndex: "team", key: "team", className: 'teams',width:'100px',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "reportDate", row.reportDate, "team", value, row.rowIndex)
                },
                {
                    title: <FormattedMessage id="page.table.count" />, dataIndex: "teamCount", key: "teamCount", className: 'teams',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "team", row.team, "teamCount", value, row.rowIndex)
                },
                {
                    title: <FormattedMessage id="page.table.rate" />, dataIndex: "teamRate", key: "teamRate", className: 'teams',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "team", row.team, "teamRate", value, row.rowIndex)
                },
                {
                    title: <FormattedMessage id="page.table.achieved.amount" />, dataIndex: "teamAchievedMoney", key: "teamAchievedMoney", className: 'teams',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "team", row.team, "teamAchievedMoney", value, row.rowIndex)
                },
                {
                    title: <FormattedMessage id="page.table.achievement.rate" />, dataIndex: "teamAchievedMoneyRate", key: "teamAchievedMoneyRate", className: 'teams',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "team", row.team, "teamAchievedMoneyRate", value, row.rowIndex)
                },
                {
                    title: <FormattedMessage id="page.table.partial.repayment.amount" />, dataIndex: "teamTotalPartialMoney", key: "teamTotalPartialMoney", className: 'teams',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "team", row.team, "teamTotalPartialMoney", value, row.rowIndex)
                }
            ]
        },
        {
            title: <FormattedMessage id="page.table.collect-group" />, className: 'groups',
            children: [
                {
                    title: <FormattedMessage id="page.table.name" />, dataIndex: "group", key: "group", className: 'groups',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "team", row.team, "group", value, row.rowIndex)
                },
                {
                    title: <FormattedMessage id="page.table.count" />, dataIndex: "groupCount", key: "groupCount", className: 'groups',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "group", row.group, "groupCount", value, row.rowIndex)
                },
                {
                    title: <FormattedMessage id="page.table.rate" />, dataIndex: "groupRate", key: "groupRate", className: 'groups',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "group", row.group, "groupRate", value, row.rowIndex)
                },
                {
                    title: <FormattedMessage id="page.table.achieved.amount" />, dataIndex: "groupAchievedMoney", key: "groupAchievedMoney", className: 'groups',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "group", row.group, "groupAchievedMoney", value, row.rowIndex)
                },
                {
                    title: <FormattedMessage id="page.table.achievement.rate" />, dataIndex: "groupAchievedMoneyRate", key: "groupAchievedMoneyRate", className: 'groups',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "group", row.group, "groupAchievedMoneyRate", value, row.rowIndex)
                },
                {
                    title: <FormattedMessage id="page.table.partial.repayment.amount"/>, dataIndex: "groupTotalPartialMoney", key: "groupTotalPartialMoney", className: 'groups',
                    render: (value, row) => renderRowSpan(row.reportDate, row.team, "group", row.group, "groupTotalPartialMoney", value, row.rowIndex)
                },
            ]
        },
        {
            title: <FormattedMessage id="windowPage.collector" />, className: 'collectors',
            children: [
                { title: <FormattedMessage id="page.table.name" />, dataIndex: "collector", key: "collector", className: 'name' },
                { title: <FormattedMessage id="page.table.count" />, dataIndex: "collectorCount", key: "collectorCount", className: 'count'},
                { title: <FormattedMessage id="page.table.rate" />, dataIndex: "collectorRate", key: "collectorRate", className: 'rate' },
                { title: <FormattedMessage id="page.table.achieved.amount" />, dataIndex: "collectorAchievedMoney", key: "collectorAchievedMoney", className: 'collectorAchievedMoney' },
                { title: <FormattedMessage id="page.table.achievement.rate" />, dataIndex: "collectorAchievedMoneyRate", key: "collectorAchievedMoneyRate", className: 'collectorAchievedMoneyRate' },
                { title: <FormattedMessage id="page.table.partial.repayment.amount" />, dataIndex: "collectorTotalPartialMoney", key: "collectorTotalPartialMoney", className: 'collectorTotalPartialMoney' }
            ]
        }
    ];
    if(isSuperAdmin) {
      columns.unshift({
        title: intl.formatMessage({id: "page.search.list.merchantName"}),
        dataIndex: 'merchantName',
        key: 'merchantName'
      })
    }



    const handleSearch = (obj) => {
        
        const { time, collectTeamId, leng, merchantId = '' } = obj
        const isArr = Array.isArray(time) && time.length > 0;
        const limit = 7;
        // query over 7d
        if (isArr && time[0] && time[1] && time[1].diff(time[0], 'days') > limit) {
            message.warning(intl.formatMessage({ id: 'page.search.list.collect.team.report.days.violation' }, { 'days': limit }), 3);
            return;
        }

        const params = {
            startDate: isArr ? time[0].format('YYYY-MM-DD') : '',
            endDate: isArr ? time[1].format('YYYY-MM-DD') : '',
            collectTeamId,
            leng,
            merchantId
        }
        getReportData(params)
    }


    let rowClassName = 'dark';
    const getRowClassName = (row, index) => {

        if (row.rowIndex === 0) {
            rowClassName = rowClassName === 'dark' ? 'light' : 'dark';
        }
        return rowClassName
    }

    return <div className={styles.collectTeamReportTable}>
        <SearchList teamsData={teamsData} handleSearch={handleSearch} initTime={initTime} downloadReport={downloadReport} isSuperAdmin={isSuperAdmin} allMerchants={allMerchants}/>
        <CommonTable
            loading={loading}
            columns={columns}
            dataSource={tableData}
            pagination={null}
            rowClassName={getRowClassName}
            rowKey={(record, index) => index}
        />
    </div>
}

CollectTeamReport.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CollectTeamReport);

