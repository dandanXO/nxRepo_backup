import React from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { itemRender } from "../../../../shared/components/common/itemRender";
import {Tabs, Tag} from "antd";
import {DescriptionsCard} from "../../../../shared/components/withQueryHook/Cards";
import {useGetCollectTodayOrderDetailQuery, useGetCollectTodayUserDetailQuery} from "../../../api/CollectTodayApi";
import {getIsSuperAdmin} from "../../../../shared/storage/getUserInfo";
import {CopyTextIcon} from "../../../../shared/components/other/CopyTextIcon";
import {formatPrice} from "../../../../shared/utils/format/formatPrice";
import {useEnum} from "../../../../shared/constants/useEnum";

export const OrderDetail = () => {
    const urlParams=useParams<{ userId: string, orderId: string}>()
    const { t } = useTranslation();
    const { OrderStatusEnum, OrderLabelEnum} = useEnum();

    const userId = Number(urlParams.userId);
    const orderId = Number(urlParams.orderId);
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

    const registerDescriptions = [
        { key: 'phoneNo', dataIndex: 'result.name' },
    ]

    const OrderInfoTab = () => (
        <div style={{ margin: '16px' }}>
            <DescriptionsCard titleKey={'orderInfo'} descriptions={orderInfoDescriptions} hook={useGetCollectTodayOrderDetailQuery} params={{orderId}} />
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
