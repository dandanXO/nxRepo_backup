import React, { useEffect } from "react";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, Space, Tag, Tooltip, Typography } from "antd";
import usePageSearchParams from "../../../shared/hooks/usePageSearchParams";
import { useLazyGetOverDuePhoneUrgeListQuery } from "../../api/OverDuePhoneUrgeApi";
import useGetMerchantEnum from "../../../shared/hooks/common/useGetMerchantEnum";
import { useGetOverDueCollectorListQuery } from "../../api/OverDueCollectorApi";
import { useTranslation } from "react-i18next";
import { i18nOverDuePhoneUrgeList } from "./i18n/translations";
import { useHistory, useLocation } from "react-router-dom";
import { getIsSuperAdmin } from "../../../shared/storage/getUserInfo";
import { formatPrice } from "../../../shared/utils/format/formatPrice";
import moment from "moment-timezone";
import { CheckCircleTwoTone, InfoCircleOutlined } from "@ant-design/icons";
import { OverDuePhoneUrgeListItem } from "../../api/types/getOverDuePhoneUrgeList";
import {useEnum} from "../../../shared/constants/useEnum";

const { Text } = Typography

const initSearchList = {
    appName: '', collectorId: '', followUpResult: '', merchantId: '', overDueTag: '', overdueDays: '', phone: '', stage: '', userName: '', pageNum: 1, pageSize: 10
}

const searchSpan  = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 8,
}

const searchFormLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export const OverDuePhoneUrgeListTable = () => {
    const { searchList, searchParams, setSearchList, handleToDetailPage } = usePageSearchParams({searchListParams: initSearchList})
    const [ triggerGetList, { currentData: overDuePhoneUrgeListResponse, isFetching: overDuePhoneUrgeListFetching }] = useLazyGetOverDuePhoneUrgeListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    })
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum()
    const { data: collectorData } = useGetOverDueCollectorListQuery(null);

    const { t } = useTranslation(i18nOverDuePhoneUrgeList.namespace)
    const { OrderLabelEnum, OverDueStageEnum } = useEnum();
    const history = useHistory();
    const location = useLocation();


    const currentPath = location.pathname;
    const isSuperAdmin = getIsSuperAdmin();

    const collectorListEnum = collectorData?.reduce((acc, current)=> {
        acc.set(current.collectorId, { text: current.collectorName})
        return acc
    }, new Map().set('', { text: t('noRestriction') }))

    const followUpResultEnum = {
        '': { text: t('noRestriction') },
        Promise: { text: t('followUpResultStatus.Promise'), color: '#1890FF'},
        FinancialDifficulties: { text: t('followUpResultStatus.FinancialDifficulties'), color: '#13C2C2'},
        Missed: { text: t('followUpResultStatus.Missed'), color: 'orange'},
        TurnedOff: { text: t('followUpResultStatus.TurnedOff'), color: 'orange'},
        InvalidPhoneNumber: { text: t('followUpResultStatus.InvalidPhoneNumber'), color: 'black'},
        BadAttitude: { text: t('followUpResultStatus.BadAttitude'), color: 'black'},
        Other: { text: t('followUpResultStatus.Other'), color: 'black'},
    }

    const columns: ProColumns[] = [
        {
            title: t('function'),
            key: 'operate',
            valueType: "option",
            render: (_, record,) => {
                return <a key="editable" onClick={() => handleClickPromote(record.userId, record.overDueId)} >{t('followUp')}</a>
            },
        },
        { title: t('orderNo'), dataIndex: 'orderNo', key: 'orderNo', hideInSearch: true },
        { title: t('appName'), dataIndex: 'appName', key: 'appName', initialValue: searchParams.appName || '' },
        {
            title: t('orderLabel'),
            dataIndex: 'orderLabel',
            key: 'orderLabel',
            render: (_, { orderLabel }) => {
                const orderLabelStatus = OrderLabelEnum[orderLabel];
                return <div style={{ textAlign: 'center'}}>{orderLabelStatus? <Tag color={orderLabelStatus.color}>{orderLabelStatus.text}</Tag>: '-'}</div>
            },
            hideInSearch: true
        },
        { title: t('orderLabel'), dataIndex: 'overDueTag', key: 'overDueTag', initialValue: searchParams.overDueTag || '', hideInTable: true, valueType: 'select', valueEnum: OrderLabelEnum, fieldProps: { allowClear:  false } },
        { title: t('userName'), dataIndex: 'userName', key: 'userName', initialValue: searchParams.userName || '' },
        { title: t('phone'), dataIndex: 'phone', key: 'phone', initialValue: searchParams.phone || '', render: (_, { phone }) => <Typography>{phone.substring(0, 3) + "*".repeat(phone.length - 6) + phone.substring(phone.length - 3)}</Typography>},
        {
            title: t('stage'),
            dataIndex: 'stage',
            key: 'stage',
            initialValue: searchParams.stage || '',
            valueType: 'select',
            valueEnum: { '': { text: t('noRestriction') }, ...OverDueStageEnum},
            render: (_, { stage }) => <Typography>{OverDueStageEnum[stage].text}</Typography>,
            fieldProps: {
                allowClear: false
            }
        },
        { title: t('overdueDays'), dataIndex: 'overdueDays', key: 'overdueDays', initialValue: searchParams.overdueDays || '' },
        { title: t('outstandingBalance'), dataIndex: 'outstandingBalance', key: 'outstandingBalance', hideInSearch: true,  render: (_, { outstandingBalance }) => <Typography>{formatPrice(Number(outstandingBalance) || 0)}</Typography>},
        { title: t('lastOpenAppTime'), dataIndex: 'lastOpenAppTime', key: 'lastOpenAppTime', hideInSearch: true, render: (_, { lastOpenAppTime }) => <Typography>{moment(lastOpenAppTime).format('YYYY-MM-DD HH:mm:ss')}</Typography> },
        { title: t('latestRepaymentCodeAcquisitionTime'), dataIndex: 'latestRepaymentCodeAcquisitionTime', key: 'latestRepaymentCodeAcquisitionTime', hideInSearch: true, render: (_, { latestRepaymentCodeAcquisitionTime }) => <Typography>{moment(latestRepaymentCodeAcquisitionTime).format('YYYY-MM-DD HH:mm:ss')}</Typography> },
        { title: t('followUpCount'), dataIndex: 'followUpCount', key: 'followUpCount', hideInSearch: true },
        { title: t('contactable'), dataIndex: 'contactable', key: 'contactable', hideInSearch: true, render: (_, { contactable }) => contactable? <div style={{ textAlign: 'center'}}><CheckCircleTwoTone twoToneColor="#52c41a" /></div>: null},
        {
            title: t('followUpResult'),
            dataIndex: 'followUpResult',
            key: 'followUpResult',
            initialValue: searchParams.followUpResult || '',
            valueType: 'select',
            valueEnum: followUpResultEnum,
            render: (_, { followUpResult }) => {
                const followUpResultStatus = followUpResultEnum[followUpResult]
                return <Text style={{ color: followUpResultStatus.color }}>{followUpResultStatus.text}</Text>
            },
            fieldProps: {
                allowClear: false
            }
        },
        {
            title: ()=><div>{t('ptpTime')} <Tooltip title={<div style={{ whiteSpace: "pre-line"}}>{t('ptpTimeTooltip')}</div>}><InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} /></Tooltip></div>,
            dataIndex: 'ptpTime',
            key: 'ptpTime',
            hideInSearch: true,
        },
        { title: t('trackingRecord'), dataIndex: 'trackingRecord', key: 'trackingRecord', hideInSearch: true },
        { title: t('recentTrackingTime'), dataIndex: 'recentTrackingTime', key: 'recentTrackingTime', hideInSearch: true, render: (_, { recentTrackingTime }) => <Typography>{moment(recentTrackingTime).format('YYYY-MM-DD HH:mm:ss')}</Typography> },
        { title: t('collectorName'), dataIndex: 'collectorName', key: 'collectorName', initialValue: searchParams.collectorName || '', hideInSearch: true },
        { title: t('collectorName'), dataIndex: 'collectorId', key: 'collectorId', initialValue: searchParams.collectorId || '', hideInTable: true, valueType: 'select', valueEnum: collectorListEnum, fieldProps: { showSearch: true, allowClear: false } },
    ]
    if(isSuperAdmin) {
        columns.splice(1,0,{
            title: t('merchantName'), dataIndex: 'merchantName', key: 'merchantName', hideInSearch: true
        })
        columns.splice(2,0,{
            title: t('merchantName'), dataIndex: 'merchantId', key: 'merchantId', initialValue: searchParams.merchantId || '', hideInTable: true, valueType: 'select', valueEnum: merchantListEnum, fieldProps: { showSearch: true, allowClear: false}
        })
    }

    const mockDataList = [
        {
            overDueId: 14270,
            userId: 151395,
            merchantName: '此商戶勿動',
            orderNo: 'no-26633851756610752',
            appName: 'longingloan',
            orderLabel: 'NewLoan',
            userName: 'RESHIN T RASHEED',
            phone: '9746567027',
            stage: 'S1',
            overdueDays: 0,
            outstandingBalance: '1000',
            lastOpenAppTime: '2023-06-07T09:20:11',
            latestRepaymentCodeAcquisitionTime: '2024-06-07T09:20:11',
            followUpCount: 0,
            contactable: true,
            followUpResult: 'Missed',
            ptpTime: '09:20',
            trackingRecord: 'Borrower facing financial hardship due to job loss and medical expenses.',
            recentTrackingTime: '2023-06-07T09:20:11',
            collectorName: 'Ted'
        }
    ]

    const handleClickPromote = (userId:number, orderId: number ) => {
        history.push(`${currentPath}/detail/${userId}/${orderId}`)
        handleToDetailPage(`${currentPath}/detail`, currentPath)
    }

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }

    useEffect(() => {
        if(Object.keys(searchParams).length === 0) {
            triggerGetList(searchList);
        } else if (JSON.stringify(searchParams) === JSON.stringify(searchList)) {
            triggerGetList(searchList);
        }
    }, [searchList])

    useEffect(() => {
        if(isSuperAdmin) {
            triggerGetMerchantList(null)
        }
    }, [isSuperAdmin])

    return <ProTable<OverDuePhoneUrgeListItem>
        loading={overDuePhoneUrgeListFetching}
        // dataSource={overDuePhoneUrgeListResponse?.records || [] }
        dataSource={mockDataList}
        columns={columns}
        rowKey='overDueId'
        search={{
            span: searchSpan,
            labelWidth: 'auto',
            optionRender: ({ searchText, resetText }, { form }) => [
                <Space>
                    <Button
                        onClick={()=>{
                            form.setFieldsValue({ ...initSearchList })
                            setSearchList(initSearchList)
                        }}
                    >
                        {resetText}
                    </Button>
                    <Button
                        type='primary'
                        onClick={()=> {
                            const { collectorId, merchantId, overdueDays, ...restField } = form.getFieldsValue();
                            setSearchList({
                                ...searchList,
                                ...restField,
                                collectorId: collectorId ? Number(collectorId): undefined,
                                merchantId: merchantId ? Number(merchantId): undefined,
                                overdueDays: overdueDays ? Number(overdueDays): undefined,
                            })
                        }}
                    >
                        {searchText}
                    </Button>
                </Space>]
        }}
        form={{ ...searchFormLayout }}
        options={{
            reload: () => triggerGetList(searchList),
        }}
        pagination={{
            showSizeChanger: true,
            defaultPageSize: 10,
            onChange: pageOnChange,
            total: overDuePhoneUrgeListResponse?.totalRecords,
            current: overDuePhoneUrgeListResponse?.records?.length === 0 ? 0 : overDuePhoneUrgeListResponse?.currentPage,
        }}
    />
}
