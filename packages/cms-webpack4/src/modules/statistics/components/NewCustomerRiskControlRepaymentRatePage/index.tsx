import AdminPage from '../../../shared/components/common/AdminPage';
import { RepaymentRateTable } from './RepaymentRateTable';

const NewCustomerRiskControlRepaymentRatePage = (): JSX.Element => {
    return (
        <AdminPage
            navigator={{
                ancestor: { path: '/', breadcrumbName: '首页' },
                parent: { path: null, breadcrumbName: '数据统计' },
                self: { path: null, breadcrumbName: '新客风控回款率' },
            }}
        >
            <RepaymentRateTable />
        </AdminPage>
    );
};

export default NewCustomerRiskControlRepaymentRatePage;