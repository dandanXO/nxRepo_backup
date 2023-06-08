import React, { useEffect } from "react";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import usePageSearchParams from "../../../shared/hooks/usePageSearchParams";
import { useTranslation } from "react-i18next";
import { i18nTodayPhoneUrgeList } from "./i18n/translations";
import { useHistory, useLocation } from "react-router-dom";
import { Tag, Tooltip, Typography } from "antd";
import { TodayPhoneUrgeListItem } from "../../api/types/getTodayPhoneUrgeList";
import { formatPrice } from "../../../shared/utils/format/formatPrice";
import moment from "moment-timezone";
import { currentDayOverDueStageEnum } from "../../../shared/constants/overDueStageEnum.constant";
import { CheckCircleTwoTone, InfoCircleOutlined } from "@ant-design/icons";
import { useLazyGetTodayPhoneUrgeListQuery } from "../../api/TodayPhoneUrgeApi";
import useGetMerchantEnum from "../../../shared/hooks/common/useGetMerchantEnum";
import { getIsSuperAdmin } from "../../../shared/storage/getUserInfo";

const { Text } = Typography

const initSearchList = {
    appName: '', collectorId: '', followUpResult: '', merchantId: '', overDueTag: '', overdueDays: '', phone: '', stage: '', userName: '', pageNum: 1, pageSize: 10
}

const searchFormLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const searchSpan  = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 8,
}

export const TodayPhoneUrgeListTable = () => {

    const { searchList, handleToDetailPage } = usePageSearchParams({searchListParams: initSearchList})
    const [ triggerGetList, { currentData: currentTodayPhoneUrgeList, isFetching: todayHoneUrgeListFetching}] = useLazyGetTodayPhoneUrgeListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const { triggerGetMerchantList, merchantListEnum} = useGetMerchantEnum()

    const { t }= useTranslation(i18nTodayPhoneUrgeList.namespace)
    const history = useHistory();
    const location = useLocation();
    const currentPath = location.pathname;
    const isSuperAdmin = getIsSuperAdmin();

    const orderLabelEnum = {
        'NewLoan': { text: t('orderLabelStatus.newLoan'), color:'orange'},
        'ReLoan': { text: t('orderLabelStatus.reLoan'), color: 'blue'},
        'Extension': { text: t('orderLabelStatus.extension'), color: 'green'}
    }

    const followUpResultEnum = {
        Promise: { text: t('followUpResultStatus.Promise'), color: '#1890FF'},
        FinancialDifficulties: { text: t('followUpResultStatus.FinancialDifficulties'), color: '#13C2C2'},
        Missed: { text: t('followUpResultStatus.Missed'), color: '#EE6416D9'},
        TurnedOff: { text: t('followUpResultStatus.TurnedOff'), color: '#EE6416D9'},
        InvalidPhoneNumber: { text: t('followUpResultStatus.InvalidPhoneNumber'), color: 'black'},
        BadAttitude: { text: t('followUpResultStatus.BadAttitude'), color: 'black'},
        Other: { text: t('followUpResultStatus.Other'), color: 'black'},
    }

    const handleClickPromote = (userId:number, orderId: number ) => {
        history.push(`${currentPath}/detail/${userId}/${orderId}`)
        handleToDetailPage(`${currentPath}/detail`, currentPath)
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
        { title: t('appName'), dataIndex: 'appName', key: 'appName' },
        {
            title: t('orderLabel'),
            dataIndex: 'orderLabel',
            key: 'orderLabel',
            valueType: 'select',
            valueEnum: orderLabelEnum,
            render: (_, { orderLabel }) => {
                const orderLabelStatus = orderLabelEnum[orderLabel];
                return <div style={{ textAlign: 'center'}}>{orderLabelStatus? <Tag color={orderLabelStatus.color}>{orderLabelStatus.text}</Tag>: '-'}</div>
            }
        },
        { title: t('userName'), dataIndex: 'userName', key: 'userName' },
        { title: t('phone'), dataIndex: 'phone', key: 'phone', render: (_, { phone }) => <Typography>{phone.substring(0, 3) + "*".repeat(phone.length - 6) + phone.substring(phone.length - 3)}</Typography>},
        {
            title: t('stage'),
            dataIndex: 'stage',
            key: 'stage',
            valueType: 'select',
            valueEnum: currentDayOverDueStageEnum,
            render: (_, { stage }) => <Typography>{currentDayOverDueStageEnum[stage].text}</Typography>,
        },
        { title: t('overdueDays'), dataIndex: 'overdueDays', key: 'overdueDays' },
        { title: t('outstandingBalance'), dataIndex: 'outstandingBalance', key: 'outstandingBalance', hideInSearch: true,  render: (_, { outstandingBalance }) => <Typography>{formatPrice(Number(outstandingBalance) || 0)}</Typography>},
        { title: t('lastOpenAppTime'), dataIndex: 'lastOpenAppTime', key: 'lastOpenAppTime', hideInSearch: true, render: (_, { lastOpenAppTime }) => <Typography>{moment(lastOpenAppTime).format('YYYY-MM-DD HH:mm:ss')}</Typography> },
        { title: t('latestRepaymentCodeAcquisitionTime'), dataIndex: 'latestRepaymentCodeAcquisitionTime', key: 'latestRepaymentCodeAcquisitionTime', hideInSearch: true, render: (_, { latestRepaymentCodeAcquisitionTime }) => <Typography>{moment(latestRepaymentCodeAcquisitionTime).format('YYYY-MM-DD HH:mm:ss')}</Typography> },
        { title: t('followUpCount'), dataIndex: 'followUpCount', key: 'followUpCount', hideInSearch: true },
        { title: t('contactable'), dataIndex: 'contactable', key: 'contactable', hideInSearch: true, render: (_, { contactable }) => contactable? <div style={{ textAlign: 'center'}}><CheckCircleTwoTone twoToneColor="#52c41a" /></div>: null},
        {
            title: t('followUpResult'),
            dataIndex: 'followUpResult',
            key: 'followUpResult',
            valueType: 'select',
            valueEnum: followUpResultEnum,
            render: (_, { followUpResult }) => {
                const followUpResultStatus = followUpResultEnum[followUpResult]
                return <Text style={{ color: followUpResultStatus.color }}>{followUpResultStatus.text}</Text>
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
        { title: t('collectorName'), dataIndex: 'collectorName', key: 'collectorName' },
    ]
    if(isSuperAdmin) {
        columns.splice(1,0,{
            title: t('merchantName'), dataIndex: 'merchantName', key: 'merchantName', hideInSearch: true
        })
        columns.splice(2,0,{
            title: t('merchantName'), dataIndex: 'merchantId', key: 'merchantId', hideInTable: true, valueType: 'select', valueEnum: merchantListEnum, fieldProps: { showSearch: true, allowClear: false}
        })
    }

    const mockDataList = [
        {
            overDueId: 4256,
            userId: 151395,
            merchantName: '此商戶勿動',
            orderNo: 'no-26633851756610752',
            appName: 'longingloan',
            orderLabel: 'NewLoan',
            userName: 'RESHIN T RASHEED',
            phone: '9746567027',
            stage: 'T_1',
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

    useEffect(() => {
        triggerGetList(searchList);
    }, [triggerGetList])

    useEffect(() => {
        if(isSuperAdmin) {
            triggerGetMerchantList(null)
        }
    }, [isSuperAdmin])

    return <ProTable<TodayPhoneUrgeListItem>
        loading={todayHoneUrgeListFetching}
        // dataSource={currentTodayPhoneUrgeList?.records || []}
        dataSource={mockDataList}
        columns={columns}
        rowKey='overDueId'
        search={{
            span: searchSpan,
            labelWidth: 'auto'
        }}
        form={{ ...searchFormLayout }}
    />
}
