import React from 'react';
import moment from "moment";
import { orderStatus, convertMoneyFormat } from 'utils';
import { FormattedMessage } from "react-intl";
import { CopyText } from 'components'

const repeatCheckClomns = [
    { title: <FormattedMessage id="page.search.list.order.no" />, dataIndex: 'orderNo', key: 'orderNo', width: 200, render(text) { return <CopyText text={text} /> } },
    // {title: '产品类型', dataIndex: 'deviceModel', key: 'deviceModel'},
    { title: <FormattedMessage id="page.search.list.name" />, dataIndex: 'userTrueName', key: 'userTrueName', width: 180, render(text) { return <CopyText text={text} /> } },
    { title: <FormattedMessage id="page.search.list.mobile" />, dataIndex: 'userPhone', key: 'userPhone', width: 130, render(text) { return <CopyText text={text} /> } },
    {
        title: <FormattedMessage id="page.table.old.user" />,
        dataIndex: 'isOlduser',
        key: 'isOlduser',
        width: 130,
        render(text) {
            return Number(text) === 0 ? <FormattedMessage id="page.table.no" /> : <FormattedMessage id="page.table.yes" />;
        }
    },
    {
        title: <FormattedMessage id="page.table.application.amount" />,
        dataIndex: 'deviceMoney',
        key: 'deviceMoney',
        width: 120,
        render(text, record) {
            return <CopyText text={convertMoneyFormat(text)} />;
        }
    },
    {
        title: <FormattedMessage id="page.table.loan.amount" />,
        dataIndex: "lendMoney",
        key: "lendMoney",
        width: 110,
        render(text, record) {
            return <CopyText text={convertMoneyFormat(text)} />;
        }
    },
    { title: <FormattedMessage id="page.table.loan.period" />, dataIndex: "lendDays", key: "lendDays", width: 110 },
    {
        title: <FormattedMessage id="page.table.handling.fee" />,
        dataIndex: "serviceMoney",
        key: "serviceMoney",
        width: 110,
        render(text, record) {
            const { deviceMoney, lendMoney } = record;
            const res = Number(deviceMoney - lendMoney);
            return <CopyText text={convertMoneyFormat(res)} />;
        }
    },
    {
        title: <FormattedMessage id="page.search.list.appication.time" />,
        dataIndex: 'applyTime',
        key: 'applyTime',
        width: 170,
        render(text) {
            return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    { title: <FormattedMessage id="page.table.channel.source" />, dataIndex: 'channelName', key: 'channelName', width: 180, },
    // {title: '审核员', dataIndex: 'examiner2Id', key: 'examiner2Id'},
    {
        title: <FormattedMessage id="page.search.list.status" />,
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render(text) {
            return orderStatus[text];
        }
    },
]
export { repeatCheckClomns }