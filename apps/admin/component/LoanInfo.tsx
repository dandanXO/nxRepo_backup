import { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Modal, Form, Input, Radio,Spin,Space } from 'antd';

interface LoanInfoResponse {
    orderNo?: string;
    productName?: string;
    loanAmount?: string;
    checkAmount?: string;
    loanTime?: string;
    status?: string;
    applyTime?: string;
    payTime?: string;
    expirationTime?: string;
}


const LoanInfo = () => {

    const dataList = [
      {
        orderNo: 'no-610833274984176',
        productName: 'A1 Loan',
        loanAmount: '3,000',
        checkAmount: '1,800',
        loanTime: '2022-08-19 08:03:12',
        status: '6',
        applyTime: '2022-08-19 08:03:12',
        payTime: '2022-08-25 08:03:12',
        expirationTime: '2022-08-25 08:03:12',
      },
      {
        orderNo: 'no-610833274984176',
        productName: 'A1 Loan',
        loanAmount: '3,000',
        checkAmount: '1,800',
        loanTime: '2022-08-19 08:03:12',
        status: '7',
        applyTime: '2022-08-19 08:03:12',
        payTime: '2022-08-25 08:03:12',
        expirationTime: '2022-08-25 08:03:12',
      },
      {
        orderNo: 'no-610833274984176',
        productName: 'A1 Loan',
        loanAmount: '3,000',
        checkAmount: '1,800',
        loanTime: '2022-08-19 08:03:12',
        status: '8',
        applyTime: '2022-08-19 08:03:12',
        payTime: '2022-08-25 08:03:12',
        expirationTime: '2022-08-25 08:03:12',
      },
    ];

    const columns: ProColumns<LoanInfoResponse>[] = [

        { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo' },
        { title: '借款产品', dataIndex: 'productName', key: 'productName' },
        { title: '借款金额', dataIndex: 'loanAmount', key: 'loan' },
        { title: '到帐金额', dataIndex: 'checkAmount', key: 'loanAmount' },
        { title: '放款时间', dataIndex: 'loanTime', key: 'loanTime', valueType: 'dateTime' },
        {
            title: '状态', dataIndex: 'status', key: 'status', valueType: 'select', initialValue: '',
            valueEnum: {
                '': { text: '不限', color: '' },
                '0': { text: '审核中', color: 'blue' },
                '1': { text: '机审拒绝', color: 'red' },
                '2': { text: '人审拒绝', color: 'red' },
                '3': { text: '待打款', color: 'purple' },
                '4': { text: '打款中', color: 'blue' },
                '5': { text: '打款失败', color: 'red' },
                '6': { text: '还款中', color: 'blue' },
                '7': { text: '已逾期', color: 'orange' },
                '8': { text: '已完成', color: 'green' },
            },
        },
        { title: '申请时间', dataIndex: 'applyTime', key: 'applyTime', valueType: 'dateTime' },
        { title: '还款时间', dataIndex: 'payTime', key: 'payTime', valueType: 'dateTime' },
        { title: '到期時間', dataIndex: 'expirationTime', key: 'expirationTime', valueType: 'dateTime' },
    ]

  return (
       
            <ProTable<LoanInfoResponse>
                columns={columns}
                dataSource={dataList}
                // loading={isFetching}
                rowKey="id"
                search={false}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 10
                }}
            />
        
    )
}

export default LoanInfo;

