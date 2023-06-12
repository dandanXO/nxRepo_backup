import React from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { itemRender } from "../../../../shared/components/common/itemRender";
import { Tabs } from "antd";
import {Descriptions} from "../../../../shared/components/withQueryHook";
import {useGetCollectTodayOrderDetailQuery, useGetCollectTodayUserDetailQuery} from "../../../api/CollectTodayApi";
import {getIsSuperAdmin} from "../../../../shared/storage/getUserInfo";

export const OrderDetail = () => {
    const urlParams=useParams<{ userId: string, orderId: string}>()
    const { t } = useTranslation()

    const userId = Number(urlParams.userId);
    const orderId = Number(urlParams.orderId);
    const isSuperAdmin = getIsSuperAdmin();

    const orderInfoDescriptions = [
        { key: 'orderNumber', dataIndex: 'orderNumber' },
        { key: 'mobileNumber', dataIndex: 'mobileNumber' },
        { key: 'channel', dataIndex: 'channel' },
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
            <Descriptions titleKey={'orderInfo'} descriptions={orderInfoDescriptions} hook={useGetCollectTodayOrderDetailQuery} params={{orderId}} />
        </div>
    )

    const UserInfoTab = () => (
        <div style={{ margin: '16px' }}>
            <Descriptions titleKey={'registerInfo'} descriptions={registerDescriptions} hook={useGetCollectTodayUserDetailQuery} params={{userId}} />
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
