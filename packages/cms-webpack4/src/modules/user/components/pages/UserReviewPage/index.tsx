
import { PageContainer } from '@ant-design/pro-components';
import UserReviewTable from './UserReviewTable';
import {Route} from "antd/es/breadcrumb/Breadcrumb";

const UserReviewPage = () => {
    // NOTE: breadcrumb
    const itemRender = (route: Route, params: any, routes: Route[], paths: string[]): React.ReactNode => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <span>{route.breadcrumbName}</span>
        );
    }
    return (
        <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    itemRender,
                    routes: [
                        { path: '', breadcrumbName: '首页', },
                        { path: '/', breadcrumbName: '用户管理', },
                        { path: '/user-review', breadcrumbName: '用户终审', },
                        { path: '/user-review', breadcrumbName: '审核', },
                    ],
                },
            }}
        >
             <UserReviewTable  />
        </PageContainer>
    )
}

export default UserReviewPage;

