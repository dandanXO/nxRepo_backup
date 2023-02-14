
import { PageContainer } from '@ant-design/pro-components';
import UserReviewTable from './UserReviewTable';
import {itemRender} from "../../../../shared/components/common/itemRender";

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
                    itemRender: itemRender,
                    routes: [
                        { path: "/", breadcrumbName: '首页' },
                        { path: null, breadcrumbName: '用户管理' },
                        { path: null, breadcrumbName: '用户终审' },
                    ],
                },
            }}
        >
             <UserReviewTable  />
        </PageContainer>
    )
}

export default UserReviewPage;

