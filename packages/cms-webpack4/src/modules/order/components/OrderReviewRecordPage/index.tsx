import AdminPage from '../../../shared/components/common/AdminPage';
import OrderReviewRecordTable from './OrderReviewRecordTable';


const OrderReviewRecordPage = (): JSX.Element => {


    return (
        <AdminPage
            navigator={{
                ancestor: { path: '/', breadcrumbName: '首页', },
                parent: { path: null, breadcrumbName: '订单管理', },
                self: { path: null, breadcrumbName: '订单审核纪录', },
            }}
        >
            <>
                <OrderReviewRecordTable />
            </>
        </AdminPage>
    );
};

export default OrderReviewRecordPage;

