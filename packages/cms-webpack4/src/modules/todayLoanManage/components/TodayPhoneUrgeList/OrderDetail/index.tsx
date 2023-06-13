import React from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { itemRender } from "../../../../shared/components/common/itemRender";
import {Tabs, Tag, Tooltip} from "antd";
import {DescriptionsCard} from "../../../../shared/components/withQueryHook/Cards";
import {
    useGetCollectTodayOrderDetailQuery,
    useGetCollectTodayUserDetailQuery,
    useLazyGetCollectTodayCollectRecordQuery
} from "../../../api/CollectTodayApi";
import {getIsSuperAdmin} from "../../../../shared/storage/getUserInfo";
import {CopyTextIcon} from "../../../../shared/components/other/CopyTextIcon";
import {formatPrice} from "../../../../shared/utils/format/formatPrice";
import {useEnum} from "../../../../shared/constants/useEnum";
import {TableCard} from "../../../../shared/components/withQueryHook/Cards/TableCard";
import {i18nUrgeCollection} from "../../../../../i18n/urgeCollection/translations";
import moment from "moment-timezone";
import {InfoCircleOutlined} from "@ant-design/icons";

export const OrderDetail = () => {
    const urlParams=useParams<{ userId: string, collectId: string}>()
    const { t } = useTranslation(i18nUrgeCollection.namespace);
    const { OrderStatusEnum, OrderLabelEnum, FollowUpResultEnum} = useEnum();

    const userId = Number(urlParams.userId);
    const collectId = Number(urlParams.collectId);
    const isSuperAdmin = getIsSuperAdmin();

    const orderInfoDescriptions = [
        { key: 'orderNumber', dataIndex: 'orderNumber' },
        { key: 'mobileNumber', dataIndex: 'mobileNumber' },
        { key: 'channel', dataIndex: 'channel' },
        { key: 'appName', dataIndex: 'appName', render: (value, { channelUrl }) => <div>{value}<CopyTextIcon text={channelUrl}/></div> },
        { key: 'productName', dataIndex: 'productName' },
        { key: 'orderStatus', dataIndex: 'orderStatus', render: (value) => <Tag color={OrderStatusEnum[value].color}>{t(OrderStatusEnum[value].text)}</Tag> },
        { key: 'orderLabel', dataIndex: 'orderLabel', render:(value) => <Tag color={OrderLabelEnum[value].color}>{t(OrderLabelEnum[value].text)}</Tag> },
        { key: 'loanAmount', dataIndex: 'loanAmount', render: (value) => <div>{formatPrice(value) || 0 }</div> },
        { key: 'disburseAmount', dataIndex: 'disburseAmount', render: (value) => <div>{formatPrice(value) || 0 }</div> },
        { key: 'amountDue', dataIndex: 'amountDue', render: (value) => <div>{formatPrice(value) || 0 }</div> },
        { key: 'reductionAmount', dataIndex: 'reductionAmount', render: (value) => <div>{formatPrice(value) || 0 }</div> },
        { key: 'amountPaid', dataIndex: 'amountPaid', render: (value) => <div>{formatPrice(value) || 0 }</div> },
        { key: 'outstandingBalance', dataIndex: 'outstandingBalance', render: (value) => <div style={{color: '#FF4D4F'}}>{formatPrice(value) || 0 }</div> },
        { key: 'extensionAmount', dataIndex: 'extensionAmount', render: (value) => <div style={{color: '#FF4D4F'}}>{formatPrice(value) || 0 }</div> },
        { key: 'daysOverdue', dataIndex: 'daysOverdue', render: (value) => <div style={{color: '#FF4D4F'}}>{value}</div> },
    ]
    if(isSuperAdmin) {
        orderInfoDescriptions.splice(0, 0, {
            key: 'merchantName', dataIndex: 'merchantName'
        })
    }

    const collectRecordColumns = [
        { title: t('trackingTime'), key: 'trackingTime', dataIndex: 'trackingTime', render: (_, { trackingTime }) =><div>{moment(trackingTime).format('YYYY-MM-DD HH:mm:ss')}</div> },
        { title: t('stage'), key: 'overdueStage', dataIndex: 'overdueStage' },
        { title: t('contactPerson'), key: 'contactPerson', dataIndex: 'contactPerson' },
        { title: t('phone'), key: 'mobileNumber', dataIndex: 'mobileNumber' },
        {
            title: t('followUpResult'),
            key: 'followUpResult',
            dataIndex: 'followUpResult',
            render: (_, { followUpResult }) => {
                const followUpResultStatus = FollowUpResultEnum[followUpResult]
                return <div>{followUpResultStatus.text}</div>
            }
        },
        {
            title: ()=><div>{t('ptpTime')} <Tooltip title={<div style={{ whiteSpace: "pre-line"}}>{t('ptpTimeTooltip')}</div>}><InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} /></Tooltip></div>,
            key: 'ptpTime',
            dataIndex: 'ptpTime'
        },
        { title: t('trackingRecord'), key: 'trackingRecord', dataIndex: 'trackingRecord' },
        { title: t('collectorName'), key: 'collector', dataIndex: 'collector' },
    ]

    const registerDescriptions = [
        { key: 'phoneNo', dataIndex: 'result.name' },
    ]

    const OrderInfoTab = () => (
        <div style={{ margin: '16px' }}>
            <DescriptionsCard titleKey={'orderInfo'} descriptions={orderInfoDescriptions} hook={useGetCollectTodayOrderDetailQuery} params={{collectId}} />
            <TableCard titleKey='urgeRecord' columns={collectRecordColumns} hook={useLazyGetCollectTodayCollectRecordQuery} queryBody={{collectId}} rowKey='' />
        </div>
    )

    const UserInfoTab = () => (
        <div style={{ margin: '16px' }}>
            <DescriptionsCard titleKey={'registerInfo'} descriptions={registerDescriptions} hook={useGetCollectTodayUserDetailQuery} params={{userId}} />
        </div>
    )


    const tabsItems = [
        { label: t('tab.orderInfo'), key: 'orderInfo', children: <OrderInfoTab /> },
        { label: t('tab.userInfo'), key: 'userInfo', children: <UserInfoTab /> }
    ]


    return (
        <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    itemRender: itemRender,
                    routes: [
                        { path: "/", breadcrumbName: t('menu.homePage') },
                        { path: null, breadcrumbName: t('menu.currentDayOverdueCall') },
                        { path: "/todayLoanManage/todayPhoneUrgeList", breadcrumbName: t('menu.currentDayOverdueCallList') },
                        { path: null, breadcrumbName: t('breadcrumb.orderDetails') },
                    ],
                },
            }}
        >
            <Tabs items={tabsItems} />
        </PageContainer>
    )
}
