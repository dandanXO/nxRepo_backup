import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';

import { useLazyGetUserOrdersListQuery } from '../../api/UserInfoApi';
import { GetUserOrders } from '../../api/userInfoTypes/getUserOrders';
import { UserId } from '../../domain/UserId';

const LoanInfo = ({ userId }: UserId): JSX.Element => {
    const [triggerGetList, { currentData, isLoading }] = useLazyGetUserOrdersListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });
    const [pageable, setPagealbe] = useState({ userId, pageNum: 1, pageSize: 10 });
    const [loanInfo, setLoanInfo] = useState<any>();
    useEffect(() => {
        triggerGetList(pageable);
    }, [pageable]);

    useEffect(() => {
        if (currentData !== undefined) {
            setLoanInfo(currentData);
        }
    }, [currentData]);

    const pageOnChange = (current, pageSize) => {
        setPagealbe({ ...pageable, pageNum: current, pageSize: pageSize });
    };
    const columns: ProColumns<GetUserOrders>[] = [
        { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo' },
        { title: '借款产品', dataIndex: 'productName', key: 'productName' },
        { title: '借款金额', dataIndex: 'deviceMoney', key: 'deviceMoney', align: 'right' },
        { title: '到帐金额', dataIndex: 'lendMoney', key: 'lendMoney', align: 'right' },
        { title: '放款时间', dataIndex: 'loanTime', key: 'loanTime', valueType: 'dateTime' },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            valueType: 'select',
            initialValue: '',
            valueEnum: {
                '': { text: '不限', color: '' },
                '0': { text: '审核中', color: 'blue' },
                '1': { text: '审核拒绝', color: 'red' },
                '2': { text: '放款中', color: 'blue' },
                '3': { text: '放款失败', color: 'red' },
                '4': { text: '待还款', color: 'blue' },
                '5': { text: '已逾期', color: 'gold' },
                '6': { text: '已结清', color: 'orange' },
                '7': { text: '已展期', color: 'lightgray' },
            },
        },
        { title: '申请时间', dataIndex: 'applyTime', key: 'applyTime', valueType: 'dateTime' },
        { title: '还款时间', dataIndex: 'payTime', key: 'payTime', valueType: 'dateTime' },
        { title: '到期時間', dataIndex: 'expireTime', key: 'expireTime', valueType: 'dateTime' },
    ];

    return (
        <ProTable<GetUserOrders>
            columns={columns}
            dataSource={(!isLoading && loanInfo?.records) || []}
            loading={isLoading}
            rowKey="id"
            search={false}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: loanInfo?.totalRecords,
                current: loanInfo?.records?.length === 0 ? 0 : loanInfo?.currentPage,
            }}
        />
    );
};

export default LoanInfo;
