import AdminPage from '../../../shared/components/common/AdminPage';

const TelSaleMemberManage = (): JSX.Element => {
    return (
        <AdminPage
            navigator={{
                ancestor: {
                    path: '/',
                    breadcrumbName: '首页',
                },
                parent: {
                    path: null,
                    breadcrumbName: '电销管理',
                },
                self: {
                    path: null,
                    breadcrumbName: '电销管理人员管理',
                },
            }}
        >
            <div>RRRR</div>
        </AdminPage>
    );
};

export default TelSaleMemberManage;
