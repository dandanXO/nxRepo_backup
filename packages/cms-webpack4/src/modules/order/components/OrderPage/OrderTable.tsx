import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, InputNumber, Modal, Radio, Space, Tag } from 'antd';
import moment from 'moment';
import { HashRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import useValuesEnums from '../../../shared/hooks/useValuesEnums';
import { useLazyGetOrderListQuery } from '../../api/OrderApi';
import { GetOrderListResponse, GetOrderListProps, OrderListResponse } from '../../api/types/OrderTypes/getOrderList';
import usePageSearchParams from '../../../shared/hooks/usePageSearchParams';
import CopyText from '../../../shared/components/CopyText';
import queryString from "query-string";
import {ProColumnsOperationConstant} from "../../../shared/components/ProColumnsOperationConstant";
import { getIsSuperAdmin } from '../../../shared/utils/getUserInfo';
const OrderTable = () => {

    const isSuperAdmin = getIsSuperAdmin();
    const { channelListEnum, providerListEnum ,merchantListEnum } = useValuesEnums();
    const initSearchList = {
        merchantName:'', appName: '', applyTimeEnd: '', applyTimeStart: '', channelId: '', expireTimeEnd: '', expireTimeStart: '', isLeng: '', isOldUser: '',
        loanTimeEnd: '', loanTimeStart: '', orderNo: '', productName: '', rcProvider: '', status: '', userPhone: '', userTrueName: '', pageNum: 1, pageSize: 10
    }
    // redux
    const history = useHistory();

    // state
    const [orderList, setOrderList] = useState<GetOrderListProps>({ records: [] });
    const { searchList, setSearchList, handleToDetailPage, searchParams } = usePageSearchParams({ searchListParams: initSearchList });

    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetOrderListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList])

    useEffect(() => {
        if (currentData !== undefined) {
            setOrderList(currentData);
        }
    }, [currentData])

    const handleToUserDetail = (userId, orderId, orderNo) => {
        history.push(`order-detail/${userId}/${orderId}/${orderNo}`);
        handleToDetailPage('/order-detail', '/order');
    }

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }

    const handleExportOrderList = () => {
        const searchQueryString = queryString.stringify(searchList);
        window.open(`/hs/admin/order/list/download?${searchQueryString}`);
    }

    const statusEnum = {
        '': { text: '不限' },
        '1': { text: '机审中', color: 'default'},
        '6': { text: '审核中', color: 'blue' },
        '7': { text: '订单拒绝', color: 'red' },
        '8': { text: '放款中', color: 'purple' },
        '9': { text: '还款中', color: 'blue' },
        '10': { text: '已完成', color: 'green' },
        '11': { text: '放款失败', color: 'red' },
        '12': { text: '已逾期', color: 'orange' },
    };

    const columns: ProColumns<OrderListResponse>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            align: 'left',
            width: ProColumnsOperationConstant.width["1"],
            render: (text, record, _, action) => {
                return <a key="editable" onClick={() => handleToUserDetail(record.userId, record.id, record.orderNo)} >查看</a>
            }
        },
        { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo', initialValue: searchParams.orderNo || "", render: (text) => <CopyText text={text} /> },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: searchParams.userPhone || "" , render: (text) => <CopyText text={text} />},
        { title: '姓名', dataIndex: 'userName', key: 'userName', initialValue: searchParams.userName || "" , render: (text) => <CopyText text={text} />},
        {
            title: '老客下单', dataIndex: 'isOldUser', valueType: 'select', key: 'isOldUser', initialValue: searchParams.isOldUser || "",
            width: '50px', align: 'center', valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
        },
        { title: '申请渠道', dataIndex: 'channelId', valueType: 'select', key: 'channelId', valueEnum: channelListEnum, initialValue: searchParams.channelId || '', hideInTable: true },
        { title: '申请渠道', dataIndex: 'channelName', valueType: 'select', key: 'channelName', hideInSearch: true },
        { title: 'APP名称', dataIndex: 'appName', key: 'appName', initialValue: searchParams.appName || "", render: (text) => <CopyText text={text} /> },
        { title: '产品名称', dataIndex: 'productName', key: 'productName', initialValue: searchParams.productName || "" , render: (text) => <CopyText text={text} />},
        {
            title: '订单状态', dataIndex: 'status', valueType: 'select', key: 'status', initialValue: searchParams.status || "",
            valueEnum: statusEnum,
            render: (text, { status }) => {
                const tagStatus = statusEnum[status] || { color: '', text: '' };
                return statusEnum[status] ? <Tag color={tagStatus.color}>{tagStatus.text}</Tag> : '-';
            },
        },
        { title: '空放订单', dataIndex: 'dummy', key: 'dummy', hideInSearch: true, valueEnum: { true: { text: '是' }, false: { text: '否' } } ,width:'50px',align:'center'},
        { title: '申请金额', dataIndex: 'deviceMoney', key: 'idcadeviceMoneyrdNo', hideInSearch: true, initialValue: searchParams.deviceMoney || "", align: 'right' },
        { title: '到帐金额', dataIndex: 'lendMoney', key: 'lendMoney', hideInSearch: true, initialValue: searchParams.lendMoney || "", align: 'right' },
        { title: '借款期限(天)', dataIndex: 'lendDays', key: 'lendDays', hideInSearch: true, initialValue: searchParams.lendDays || "", align: 'center',width: '80px' },
        { title: '申请时间', dataIndex: 'applyTime', key: 'applyTime', hideInSearch: true, valueType: 'dateTime',width:'100px', },
        {
            title: '申请时间', dataIndex: 'applyTimeRange', valueType: 'dateRange', key: 'applyTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true,
            initialValue: (searchParams.applyTimeStart === undefined || searchParams.applyTimeStart === "") ? "" : [moment(searchParams.applyTimeStart), moment(searchParams.applyTimeEnd)]
        },
        { title: '放款时间', dataIndex: 'loanTime', key: 'loanTime', hideInSearch: true, valueType: 'dateTime',width:'100px', },
        {
            title: '放款时间', dataIndex: 'loanTimeRange', valueType: 'dateRange', key: 'loanTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true,
            initialValue: (searchParams.loanTimeStart === undefined || searchParams.loanTimeStart === "") ? "" : [moment(searchParams.loanTimeStart), moment(searchParams.loanTimeEnd)]
        },
        { title: '到期日', dataIndex: 'expireDate', key: 'expireDate', valueType: "date", hideInSearch: true, width: '100px', tip: '截止时间为该日23:59:59', },
        {
            title: '到期日', dataIndex: 'expireDateRange', valueType: 'dateRange', key: 'expireDateRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true,
            initialValue: (searchParams.expireTimeStart === undefined || searchParams.expireTimeStart === "") ? "" : [moment(searchParams.expireTimeStart), moment(searchParams.expireTimeEnd)]
        },

        {
            title: '是否展期', dataIndex: 'isLeng', valueType: 'select', key: 'isLeng', initialValue: searchParams.isLeng || "",
            width: '50px', align: 'center', valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
        },
        { title: '风控应用', dataIndex: 'riskModelName', key: 'riskModelName', initialValue: searchParams.rcProvider || "", valueEnum: providerListEnum,},
    ]
    if(isSuperAdmin){
        columns.splice(1,0,{
            title: '商户名', dataIndex: 'merchantName',  key: 'merchantName',  valueEnum: merchantListEnum, valueType: 'select', initialValue: searchParams.merchantName || '',
            width: ProColumnsOperationConstant.width["2"],
        })
    }

    return (
        <ProTable<OrderListResponse>
            columns={columns}
            dataSource={orderList?.records || []}
            loading={isFetching}
            rowKey="id"
            // headerTitle={<Button key="button" disabled={!isImportTelSale} type="primary" ghost onClick={handleImportTelSale}>导入电销</Button>}
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button onClick={() => {
                            //  form.resetFields();
                            // @ts-ignore
                            form.setFieldsValue({ ...initSearchList, applyTimeRange: '', expireDateRange: '', loanTimeRange: '' })
                            setSearchList(initSearchList);
                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { appName, applyTimeRange, channelId, expireDateRange, isLeng, isOldUser, loanTimeRange, orderNo, productName, riskModelName, status, phoneNo, userName ,merchantName=''} = form.getFieldValue();
                                console.log('merchantName',merchantName,merchantListEnum.get(merchantName).text)
                                const merchant = merchantName !== '' ? merchantListEnum.get(merchantName)?.text : '';
                                setSearchList({
                                    ...initSearchList,
                                    appName,
                                    applyTimeEnd: applyTimeRange ? applyTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    applyTimeStart: applyTimeRange ? applyTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    channelId: channelId === '0' ? '' : channelId,
                                    expireTimeEnd: expireDateRange ? expireDateRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    expireTimeStart: expireDateRange ? expireDateRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    isLeng,
                                    isOldUser,
                                    loanTimeEnd: loanTimeRange ? loanTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    loanTimeStart: loanTimeRange ? loanTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    orderNo,
                                    productName,
                                    rcProvider: riskModelName,
                                    status,
                                    userPhone: phoneNo,
                                    userTrueName: userName,
                                    merchantName: isSuperAdmin ? merchant : ''
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
                total: orderList?.totalRecords,
                current: orderList?.records?.length === 0 ? 0 : orderList.currentPage,
            }}
        />

    )
}

export default OrderTable;

