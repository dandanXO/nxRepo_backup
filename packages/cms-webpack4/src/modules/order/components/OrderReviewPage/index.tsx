
import { PageContainer } from '@ant-design/pro-components';
import OrderReviewTable from './OrderReviewTable';
import { itemRender } from '../../../shared/itemRender';

import {Route} from "antd/es/breadcrumb/Breadcrumb";

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
                        { path: null, breadcrumbName: '用户管理' },
                        { path: null, breadcrumbName: '用户终审' },
                    ],
                },
            }}
        >
             <OrderReviewTable  />
        </PageContainer>
    )
}

export default OrderReviewPage;

