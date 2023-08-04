import AdminPage from '../../../shared/components/common/AdminPage';
import { FeedbackTable } from './FeedbackTable';

export const Feedback = (): JSX.Element => (
    <AdminPage
        navigator={{
            ancestor: {
                path: '/',
                breadcrumbName: '首页',
            },
            parent: {
                path: null,
                breadcrumbName: '客服管理',
            },
            self: {
                path: null,
                breadcrumbName: '客服管理',
            },
        }}
    >
        <FeedbackTable />
    </AdminPage>
);
