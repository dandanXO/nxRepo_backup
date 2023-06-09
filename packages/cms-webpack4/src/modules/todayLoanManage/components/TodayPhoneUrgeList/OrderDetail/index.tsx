import React from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { itemRender } from "../../../../shared/components/common/itemRender";
import { Tabs } from "antd";
import { ContentOptionalTab } from "../../../../shared/components/ContentOptionalTab";
import {
    useGetUserDetailQuery
} from "../../../../shared/api/UserInfoApi";
import { CollectionRecordCard, OrderInfoCard, RegisterInfoCard } from "../../../../shared/components/infoCards";

export const OrderDetail = () => {
    const urlParams=useParams<{ userId: string, orderId: string}>()
    const { t } = useTranslation()

    const userId = Number(urlParams.userId);
    const orderId = Number(urlParams.orderId);

    const orderInfoCardItems = [
        { key: 'orderInfo', render: () => <OrderInfoCard orderId={orderId} /> },
        { key: 'collectRecord', render: () => <CollectionRecordCard orderId={orderId} />}
    ]

    const userInfoCardItems = [
        { key: 'registerInfo', render: (props) => <RegisterInfoCard {...props} /> }
    ]

    const tabsItems = [
        { label: t('tab.orderInfo'), key: 'orderInfo', children: <ContentOptionalTab items={orderInfoCardItems} />},
        { label: t('tab.userInfo'), key: 'userInfo', children: <ContentOptionalTab items={userInfoCardItems} dataHook={{ hook: useGetUserDetailQuery, params: { userId } }} />}
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
