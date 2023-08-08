import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { itemRender } from '../../../shared/components/common/itemRender';
import { OrderDetailContent } from './OrderDetailContent';

const OrderDetail = (): JSX.Element => {
    const { t } = useTranslation();
    const urlParams = useParams<{ userId: string; collectId: string }>();

    const { userId, collectId } = urlParams;

    return (
        <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    itemRender: itemRender,
                    routes: [
                        { path: '/', breadcrumbName: t('common:menu.homePage') },
                        { path: null, breadcrumbName: t('common:menu.currentDayOverdueCall') },
                        {
                            path: '/todayLoanManage/todayPhoneUrgeList',
                            breadcrumbName: t('common:menu.currentDayOverdueCallList'),
                        },
                        { path: null, breadcrumbName: t('common:breadcrumb.orderDetails') },
                    ],
                },
            }}
        >
            <OrderDetailContent userId={userId} collectId={collectId} />
        </PageContainer>
    );
};

export default OrderDetail;
