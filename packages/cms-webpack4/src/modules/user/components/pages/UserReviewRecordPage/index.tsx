import AdminPage from '../../../../shared/components/common/AdminPage';
import UserReviewRecordTable from './UserReviewRecordTable';

const UserReviewRecordPage = (): JSX.Element => {
    return (
        <AdminPage
            navigator={{
                ancestor: { path: '/', breadcrumbName: '首页' },
                parent: { path: null, breadcrumbName: '用户管理' },
                self: { path: null, breadcrumbName: '用户审核纪录' },
            }}
        >
            <>
                <UserReviewRecordTable />
            </>
        </AdminPage>
    );
};

export default UserReviewRecordPage;
