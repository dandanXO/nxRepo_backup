import AdminPage from '../../../../shared/components/common/AdminPage';
import DailyRiskControlTable from './DailyRiskControlTable';
const DailyRiskControlPage = () => {

    return (
        <AdminPage
            navigator={{
                ancestor: { path: '/', breadcrumbName: '首页' },
                parent: { path: null, breadcrumbName: '数据统计' },
                self: { path: null, breadcrumbName: '每日新用户风控标签统计' },
            }}
        >
            <>
                <DailyRiskControlTable/>
            </>
        </AdminPage>
    );
}

export default DailyRiskControlPage;

