import AdminPage from "../../../../shared/components/atoms/AdminPage";
import {RepaymentRateTable} from "./RepaymentRateTable";

export const NewCustomerRiskControlRepaymentRatePage = () => {
    return (
        <AdminPage navigator={{
            ancestor: { path: '/', breadcrumbName: '首页' },
            parent: { path: null, breadcrumbName: '数据统计' },
            self: { path: null, breadcrumbName: '新客风控回款率' },
        }}>
            <RepaymentRateTable/>
        </AdminPage>
    )
}
