import React from 'react';
import moment from "moment";
import { orderStatus, convertMoneyFormat } from 'utils';
import { FormattedMessage } from "react-intl";
import { CopyText } from 'components';


const repeatCheckClomns = [
    // {title: '产品类型', dataIndex: 'deviceModel', key: 'deviceModel'},
    { title: <FormattedMessage id="page.search.list.name" />, dataIndex: 'nameTrue', key: 'nameTrue', width: '18%', render(text) { return <CopyText text={text} /> } },
    { title: <FormattedMessage id="page.search.list.mobile" />, dataIndex: 'phoneNo', key: 'phoneNo', width: '9%' , render(text) { return <CopyText text={text} /> } },
    {
        title: <FormattedMessage id="page.table.old.user" />,
        dataIndex: 'isOlduser',
        key: 'isOlduser',
        width:'9%',
        render(text) {
            return Number(text) === 0 ? <FormattedMessage id="page.table.no" /> : <FormattedMessage id="page.table.yes" />;
        }
    },
    {
        title: <FormattedMessage id="page.table.authinfo.state" />,
        dataIndex: 'userAuthInfo.province',
        key: 'province',
        render(text) { return <CopyText text={text} /> }
      
    },
    {
        title: <FormattedMessage id="page.table.authinfo.district" />,
        dataIndex: "userAuthInfo.city",
        key: "city",
        render(text) { return <CopyText text={text} /> }
    },
    // {title: <FormattedMessage id="page.table.loan.period" />, dataIndex: "lendDays", key: "lendDays"},
    // {
    //     title: <FormattedMessage id="page.table.handling.fee" />,
    //     dataIndex: "serviceMoney",
    //     key: "serviceMoney",
    //     render(text, record) {
    //         const {deviceMoney, lendMoney} = record;
    //         const res = Number(deviceMoney - lendMoney);
    //         return convertMoneyFormat(res);
    //     }
    // },
    {
        title: <FormattedMessage id="page.search.list.reg.time" />,
        dataIndex: 'addTime',
        key: 'addTime',
        render(text) {
            return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    { title: <FormattedMessage id="page.table.channel.source" />, dataIndex: 'channelName', key: 'channelName', width: '15%', render(text) { return <CopyText text={text} /> } },
    // {title: '审核员', dataIndex: 'examiner2Id', key: 'examiner2Id'},
    {
        title: <FormattedMessage id="page.search.list.status" />,
        dataIndex: 'status',
        key: 'status',
        width: '6%',
        render(text) {
            return orderStatus[text];
        }
    },
]
export {repeatCheckClomns}