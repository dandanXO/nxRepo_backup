import AdminPage from '../../../shared/components/common/AdminPage';
import PayReceiptTable from './PayReceiptTable';
const PayReceiptPage = (): JSX.Element => {


    return (
        <AdminPage
            navigator={{
                ancestor: { path: '/', breadcrumbName: '首页' },
                parent: { path: null, breadcrumbName: '财务管理' },
                self: { path: null, breadcrumbName: '还款补单' },
            }}
        >
            <>
                <PayReceiptTable/>
            </>
        </AdminPage>
    );
};

export default PayReceiptPage;

