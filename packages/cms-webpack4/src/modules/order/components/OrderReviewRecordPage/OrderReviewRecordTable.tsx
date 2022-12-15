import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, InputNumber, Modal, Radio, Space, Tag } from 'antd';
import moment from 'moment';
import useValuesEnums from '../../../shared/hooks/useValuesEnums';
import { useLazyGetOrderReviewRecordListQuery } from '../../api/OrderReviewRecordApi';
import { GetOrderReviewRecordListProps, OrderReviewRecordListResponse, GetOrderReviewRecordListRequestQuerystring } from '../../api/types/orderReviewRecordTypes/getOrderReviewRecordList';
import CopyText from '../../../shared/components/CopyText';
import queryString from "query-string";
import {enumObjectToMap} from '../../../shared/utils/enumObjectToMap';
import { getIsSuperAdmin } from '../../../shared/utils/getUserInfo';
import {ProColumnsOperationConstant} from "../../../shared/components/ProColumnsOperationConstant";


const OrderReviewRecordTable = () => {

    const isSuperAdmin = getIsSuperAdmin();
    const { operatorListEnum ,merchantListEnum} = useValuesEnums();
    const initSearchList: GetOrderReviewRecordListRequestQuerystring = {
        appName: '', merchantId: '', operatorId: '', orderNo: '', phoneNo: '', productName: '', reviewStatus: '', reviewTimeEnd: '',
        reviewTimeStart: '', userName: '', pageNum: 1, pageSize: 10
    }

    const [searchList, setSearchList] = useState(initSearchList);
    const [recordList, setRecordList] = useState<GetOrderReviewRecordListProps>({ records: [] });

    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetOrderReviewRecordListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList])

    useEffect(() => {
        if (currentData !== undefined) {
            setRecordList(currentData);
        }
    }, [currentData]);


    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }

    const handleExportOrderList = () => {
        const searchQueryString = queryString.stringify(searchList);
        window.open(`/hs/admin/order-review-record/list/download?${searchQueryString}`);
    }
   
      const statusEnum =  {
        '': { text: '不限' },
        '1': { text: '机审通过', color: 'blue' },
        '2': { text: '机审拒绝', color: 'blue' },
        '6': { text: '审核通过', color: 'green' },
        '7': { text: '审核拒绝', color: 'red' },
    };

    const columns: ProColumns<OrderReviewRecordListResponse>[] = [
        { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo', initialValue: "", render: (text) => <CopyText text={text} /> },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: "", render: (text) => <CopyText text={text} /> },
        { title: '姓名', dataIndex: 'userName', key: 'userName', initialValue: "", render: (text) => <CopyText text={text} /> },
        { title: 'APP名称', dataIndex: 'appName', key: 'appName', initialValue: "", render: (text) => <CopyText text={text} /> },
        { title: '产品名称', dataIndex: 'productName', key: 'productName', initialValue: "", render: (text) => <CopyText text={text} /> },
        { title: '审核状态', dataIndex: 'reviewStatus', key: 'reviewStatus', valueType: 'select', initialValue: "", valueEnum: enumObjectToMap(statusEnum) },
        { title: '审核时间', dataIndex: 'reviewTime', key: 'reviewTime', hideInSearch: true, valueType: 'dateTime', width: '100px', },
        { title: '审核时间', dataIndex: 'reviewTimeRange', valueType: 'dateRange', key: 'reviewTimeRange', fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true, initialValue: "" },
        { title: '操作人', dataIndex: 'operator', key: 'operator',  initialValue: "" , hideInSearch: true},
        { title: '操作人', dataIndex: 'operatorId', key: 'operatorId', hideInTable: true, valueType: 'select', valueEnum: operatorListEnum, initialValue: "" },
        { title: '备注', dataIndex: 'remark', key: 'remark', hideInSearch: true, render: (text) => <CopyText text={text} /> },
    ]

    if(isSuperAdmin){
        columns.unshift({
            title: '商户名', dataIndex: 'merchantName', key: 'merchantName', valueEnum: merchantListEnum, valueType: 'select', initialValue: '',
            width: ProColumnsOperationConstant.width["2"], render: (text) => <CopyText text={text} />, hideInSearch: true
        }, { title: '商戶名', dataIndex: 'merchantId', key: 'merchantId', hideInTable: true, initialValue: "", valueEnum: merchantListEnum },)
    }
    return (
        <ProTable<OrderReviewRecordListResponse>
            columns={columns}
            dataSource={recordList?.records || []}
            loading={isFetching} 
            rowKey="id"
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button onClick={() => {
                             form.resetFields();
                            // @ts-ignore
                            setSearchList(initSearchList);
                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { appName, merchantId = '', operatorId, orderNo, phoneNo, productName, reviewStatus, userName, reviewTimeRange } = form.getFieldValue();
                                setSearchList({
                                    ...initSearchList,
                                    appName, merchantId, operatorId, orderNo, phoneNo, productName, reviewStatus, userName,
                                    reviewTimeEnd: reviewTimeRange ? reviewTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    reviewTimeStart: reviewTimeRange ? reviewTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                })
                                form.submit();
                            }}
                        >
                            {searchText}
                        </Button>
                    </Space>
                ),
            }}
            options={{
                setting: { listsHeight: 400, },
                reload: () => triggerGetList(searchList),

            }}
            toolBarRender={() => [<Button onClick={handleExportOrderList} type='primary'>导出</Button>]}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: recordList?.totalRecords,
                current: recordList?.records?.length === 0 ? 0 : recordList.currentPage,
            }}
        />

    )
}

export default OrderReviewRecordTable;

