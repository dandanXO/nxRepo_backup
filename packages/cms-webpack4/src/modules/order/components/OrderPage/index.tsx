import AdminPage from '../../../shared/components/common/AdminPage';
import OrderTable from './OrderTable';

const OrderPage = (): JSX.Element => {
    return (
        <AdminPage
            navigator={{
                ancestor: {
                    path: '/',
                    breadcrumbName: '首页',
                },
                parent: {
                    path: null,
                    breadcrumbName: '订单管理',
                },
                self: {
                    path: null,
                    breadcrumbName: '订单列表',
                },
            }}
        >
            <>
                <OrderTable />
            </>
        </AdminPage>
    );
};

export default OrderPage;
