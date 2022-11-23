
import { PageContainer } from '@ant-design/pro-components';
import OrderReviewTable from './OrderReviewTable';
import { itemRender } from '../../../shared/itemRender';

const OrderReviewPage = () => {
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
                        { path: null, breadcrumbName: '待终审订单' },
                    ],
                },
            }}
        >
             <OrderReviewTable  />
        </PageContainer>
    )
}

export default OrderReviewPage;

