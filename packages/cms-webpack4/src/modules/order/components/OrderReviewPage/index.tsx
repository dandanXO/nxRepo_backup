import { PageContainer } from '@ant-design/pro-components';

import { itemRender } from '../../../shared/components/common/itemRender';
import OrderReviewTable from './OrderReviewTable';

const OrderReviewPage = (): JSX.Element => {
    // NOTE: breadcrumb

    return (
        <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    itemRender: itemRender,
                    routes: [
                        { path: '/', breadcrumbName: '首页' },
                        { path: null, breadcrumbName: '订单管理' },
                        { path: null, breadcrumbName: '订单复审' },
                    ],
                },
            }}
        >
            <OrderReviewTable />
        </PageContainer>
    );
};

export default OrderReviewPage;
