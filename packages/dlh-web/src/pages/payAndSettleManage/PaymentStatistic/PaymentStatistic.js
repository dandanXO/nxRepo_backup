import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { paymentStatisticAction } from './index';
import moment from 'moment';

import { CommonTable } from 'components';
import SearchList from './SearchList/SearchList';

function PaymentStatistic ({ intl, getTableData, tableData = [], loading }) {

    const initTime = [moment().subtract(3, 'days'), moment()];
    useEffect(() => {
        const startTime = initTime[0].format('YYYY-MM-DD 00:00:00');
        const endTime = initTime[1].format('YYYY-MM-DD 23:59:59');
        getTableData({ startTime, endTime });
    }, []);

    const columns = [
        {
            title: intl.formatMessage({ id: "page.table.date" }),
            dataIndex: 'dateStr',
            key: 'dateStr',
            render (value, row, index) {
                const obj = {
                    children: value,
                    props: {},
                };
                const rowSpan = tableData.filter(i => i.dateStr === value).length;
                const isSameData = tableData[index > 0 ? index - 1 : index].dateStr === value;
                if (index > 0 && rowSpan > 1 && isSameData) {
                    obj.props.rowSpan = 0;
                } else {
                    obj.props.rowSpan = rowSpan;
                }
                return obj;
            },

        },
        {
            title: intl.formatMessage({ id: "page.table.platName" }),
            dataIndex: 'platName',
            key:'platName',
        },
        {
            title: intl.formatMessage({ id: "page.table.payTotal" }),
            dataIndex: 'payTotal',
            key: 'payTotal',
        },
        {
            title: intl.formatMessage({ id: "page.table.paySuccessCount" }),
            dataIndex: 'paySuccessCount',
            key: 'paySuccessCount',
        },
        {
            title: intl.formatMessage({ id: "page.table.paySuccessRate" }),
            dataIndex: 'paySuccessRate',
            key: 'paySuccessRate',
        },
        {
            title: intl.formatMessage({ id: "page.table.settleTotal" }),
            dataIndex: 'settleTotal',
            key: 'settleTotal',
        },
        {
            title: intl.formatMessage({ id: "page.table.settleSuccessCount" }),
            dataIndex: 'settleSuccessCount',
            key: 'settleSuccessCount',
        },
        {
            title: intl.formatMessage({ id: "page.table.settleSuccessRate" }),
            dataIndex: 'settleSuccessRate',
            key: 'settleSuccessRate',
        },
    ]

    const handleSearch = (obj) => {
        const { time } = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        const startTime = isArr ? time[0].format("YYYY-MM-DD 00:00:00") : "";
        const endTime = isArr ? time[1].format("YYYY-MM-DD 23:59:59") : "";
        getTableData({ startTime, endTime });
    }


    return (
        <div>
            <SearchList handleSearch={handleSearch} initTime={initTime} />
            <CommonTable
                columns={columns}
                dataSource={tableData}
                pagination={null}
                loading={loading}
                rowKey={(record, index) => index}
            />
        </div>
    );
}


const mapStateToProps = (state) => {
    const { payAndSettleManageState: { paymentStatisticState } } = state;
    return {
        tableData: paymentStatisticState['tableData'],
        loading: paymentStatisticState['loading'],

    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: paymentStatisticAction.payGetTableData,
    }, dispatch);
}

PaymentStatistic.propTypes = {
    intl: propTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PaymentStatistic));

