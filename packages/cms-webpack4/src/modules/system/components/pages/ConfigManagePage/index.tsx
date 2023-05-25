import AdminPage from '../../../../shared/components/common/AdminPage';
import ConfigManageTab from './ConfigManageTab';

const ConfigManagePage = (): JSX.Element => {

    return (
        <AdminPage
            navigator={{
                ancestor: { path: '/', breadcrumbName: '首页', },
                parent: { path: null, breadcrumbName: '系统管理', },
                self: { path: null, breadcrumbName: '参数配置', },
            }}
        >
            <>
                <ConfigManageTab/>
            </>
        </AdminPage>
    );
};

export default ConfigManagePage;

