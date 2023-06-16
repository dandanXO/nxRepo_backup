import React from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { itemRender } from "../../../shared/components/common/itemRender";
import {i18nUrgeCollection} from "../../../../i18n/urgeCollection/translations";
import {OrderDetailContent} from "./OrderDetailContent";

export const OrderDetail = () => {

    const { t } = useTranslation(i18nUrgeCollection.namespace);
    const urlParams=useParams<{ userId: string, collectId: string}>()

    const { userId, collectId} = urlParams;

    return (
        <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    itemRender: itemRender,
                    routes: [
                        { path: "/", breadcrumbName: t('menu.homePage') },
                        { path: null, breadcrumbName: t('menu.overdueCollection') },
                        { path: "/afterLoanManage/phoneUrgeList", breadcrumbName: t('menu.overdueCallList') },
                        { path: null, breadcrumbName: t('breadcrumb.orderDetails') },
                    ],
                },
            }}
        >
            <OrderDetailContent userId={userId} collectId={collectId} />
        </PageContainer>
    )
}
