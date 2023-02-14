
import { PageContainer } from '@ant-design/pro-components';
import OrderFinalReviewTable from './OrderFinalReviewTable';
import { itemRender } from '../../../shared/components/atoms/itemRender';

const OrderFinalReviewPage = () => {
    // NOTE: breadcrumb

    return (
        <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    itemRender: itemRender,
                    routes: [
                        { path: "/", breadcrumbName: '首页' },
                        { path: null, breadcrumbName: '订单管理' },
                        { path: null, breadcrumbName: '订单终审' },
                    ],
                },
            }}
        >
             <OrderFinalReviewTable  />
        </PageContainer>
    )
}

export default OrderFinalReviewPage;

