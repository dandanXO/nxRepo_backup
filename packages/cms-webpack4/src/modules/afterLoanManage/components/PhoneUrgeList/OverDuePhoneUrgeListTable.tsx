import React, { useEffect } from "react";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, Space, Tag, Tooltip, Typography } from "antd";
import usePageSearchParams from "../../../shared/hooks/usePageSearchParams";
import useGetMerchantEnum from "../../../shared/hooks/common/useGetMerchantEnum";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { getIsSuperAdmin } from "../../../shared/storage/getUserInfo";
import { formatPrice } from "../../../shared/utils/format/formatPrice";
import moment from "moment";
import { CheckCircleTwoTone, InfoCircleOutlined } from "@ant-design/icons";
import {useEnum} from "../../../shared/constants/useEnum";
import {i18nUrgeCollection} from "../../../../i18n/urgeCollection/translations";
import {useGetCollectOverDueCollectorListQuery} from "../../api/CollectOverDueApi";
import {useLazyGetCollectOverDuePhoneUrgeListQuery} from "../../api/OverDuePhoneUrgeApi";
import {CollectOverDuePhoneUrgeListItem} from "../../api/types/getCollectOverDuePhoneUrgeList";
import Cookies from "js-cookie";

const { Text } = Typography

const initSearchList = {
    appName: '', collectorId: '', followUpResult: '', merchantId: '', orderLabel: '', overdueDays: '', phone: '', stage: '', userName: '', pageNum: 1, pageSize: 10
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
    const [ triggerGetList, { currentData: overDuePhoneUrgeListResponse, isFetching: overDuePhoneUrgeListFetching }] = useLazyGetCollectOverDuePhoneUrgeListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    })
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum()

    // 一般催收人員不取得催收員列表
    const loginInfo = JSON.parse(Cookies.get('adminUser'))
    const { roleId } = loginInfo['data']
    const ableToGetCollectorList = ![15].includes(roleId)

    let collectorData = undefined

    if (ableToGetCollectorList){
        const { data } = useGetCollectOverDueCollectorListQuery(null);
        collectorData = data
    }

    const { t } = useTranslation(i18nUrgeCollection.namespace)
    const { OrderLabelEnum, OverDueStageEnum, FollowUpResultEnum } = useEnum();
    const history = useHistory();
    const location = useLocation();


    const currentPath = location.pathname;
    const isSuperAdmin = getIsSuperAdmin();

    const collectorListEnum = collectorData?.reduce((acc, current)=> {
        acc.set(current.collectorId, { text: current.collectorName})
        return acc
    }, new Map().set('', { text: t('noRestriction') }))

    const columns: ProColumns[] = [
        {
            title: t('function'),
            key: 'operate',
            valueType: "option",
            render: (_, record,) => {
                return <a key="editable" onClick={() => handleClickPromote(record.userId, record.collectId)} >{t('followUp')}</a>
            },
        },
        { title: t('orderNo'), dataIndex: 'orderNo', key: 'orderNo', hideInSearch: true },
        { title: t('appName'), dataIndex: 'appName', key: 'appName', initialValue: searchParams.appName || '' },
        {
            title: t('orderLabel'),
            dataIndex: 'orderLabel',
            key: 'orderLabel',
            initialValue: searchParams.orderLabel || '',
            valueType: 'select',
            valueEnum: OrderLabelEnum,
            fieldProps: { allowClear:  false },
            render: (_, { orderLabel }) => {
                const orderLabelStatus = OrderLabelEnum[orderLabel];
                return <div style={{ textAlign: 'center'}}>{orderLabelStatus? <Tag color={orderLabelStatus?.color}>{orderLabelStatus?.text}</Tag>: '-'}</div>
            },
        },
        { title: t('userName'), dataIndex: 'userName', key: 'userName', initialValue: searchParams.userName || '' },
        { title: t('phone'), dataIndex: 'phone', key: 'phone', initialValue: searchParams.phone || '', render: (_, { phone }) => <Typography>{phone.substring(0, 3) + "*".repeat(phone.length - 6) + phone.substring(phone.length - 3)}</Typography>},
        {
            title: t('stage'),
            dataIndex: 'stage',
            key: 'stage',
            initialValue: searchParams.stage || '',
            valueType: 'select',
            valueEnum: { '': { text: t('noRestriction') }, ...OverDueStageEnum},
            render: (_, { stage }) => <Typography>{OverDueStageEnum[stage]?.text}</Typography>,
            fieldProps: {
                allowClear: false
            }
        },
        { title: t('overdueDays'), dataIndex: 'overdueDays', key: 'overdueDays', initialValue: searchParams.overdueDays || '' },
        { title: t('outstandingBalance'), dataIndex: 'outstandingBalance', key: 'outstandingBalance', hideInSearch: true,  render: (_, { outstandingBalance }) => <Typography>{formatPrice(Number(outstandingBalance) || 0)}</Typography>},
        { title: t('lastOpenAppTime'), dataIndex: 'lastOpenAppTime', key: 'lastOpenAppTime', hideInSearch: true, render: (_, { lastOpenAppTime }) => <Typography>{(lastOpenAppTime && moment(lastOpenAppTime).format('YYYY-MM-DD HH:mm:ss')) || '-'}</Typography> },
        { title: t('latestRepaymentCodeAcquisitionTime'), dataIndex: 'latestRepaymentCodeAcquisitionTime', key: 'latestRepaymentCodeAcquisitionTime', hideInSearch: true, render: (_, { latestRepaymentCodeAcquisitionTime }) => <Typography>{(latestRepaymentCodeAcquisitionTime && moment(latestRepaymentCodeAcquisitionTime).format('YYYY-MM-DD HH:mm:ss')) || '-'}</Typography> },
        { title: t('followUpCount'), dataIndex: 'followUpCount', key: 'followUpCount', hideInSearch: true },
        { title: t('contactable'), dataIndex: 'contactable', key: 'contactable', hideInSearch: true, render: (_, { contactable }) => contactable? <div style={{ textAlign: 'center'}}><CheckCircleTwoTone twoToneColor="#52c41a" /></div>: null},
        {
            title: t('followUpResult'),
            dataIndex: 'followUpResult',
            key: 'followUpResult',
            initialValue: searchParams.followUpResult || '',
            valueType: 'select',
            valueEnum: FollowUpResultEnum,
            render: (_, { followUpResult }) => {
                const followUpResultStatus = FollowUpResultEnum[followUpResult]
                return <Text style={{ color: followUpResultStatus?.color }}>{followUpResultStatus?.text}</Text>
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
        { title: t('recentTrackingTime'), dataIndex: 'recentTrackingTime', key: 'recentTrackingTime', hideInSearch: true, render: (_, { recentTrackingTime }) => <Typography>{(recentTrackingTime && moment(recentTrackingTime).format('YYYY-MM-DD HH:mm:ss')) || '-'}</Typography> },
        { title: t('collectorName'), dataIndex: 'collectorName', key: 'collectorName', initialValue: searchParams.collectorName || '', hideInSearch: true },
        { title: t('collectorName'), dataIndex: 'collectorId', key: 'collectorId', initialValue: searchParams.collectorId || '', hideInSearch: !ableToGetCollectorList, hideInTable: true, valueType: 'select', valueEnum: collectorListEnum, fieldProps: { showSearch: true, allowClear: false } },
    ]
    if(isSuperAdmin) {
        columns.splice(1,0,{
            title: t('merchantName'), dataIndex: 'merchantName', key: 'merchantName', hideInSearch: true
        })
        columns.splice(2,0,{
            title: t('merchantName'), dataIndex: 'merchantId', key: 'merchantId', initialValue: searchParams.merchantId || '', hideInTable: true, valueType: 'select', valueEnum: merchantListEnum, fieldProps: { showSearch: true, allowClear: false}
        })
    }

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

    return <ProTable<CollectOverDuePhoneUrgeListItem>
        loading={overDuePhoneUrgeListFetching}
        dataSource={overDuePhoneUrgeListResponse?.records || [] }
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
            current: overDuePhoneUrgeListResponse?.records?.length === 0 ? 1 : overDuePhoneUrgeListResponse?.currentPage,
        }}
    />
}
