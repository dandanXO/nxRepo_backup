import UserReviewTable from './UserReviewTable';
import { PageContainer } from '@ant-design/pro-components';
import { Route } from 'antd/es/breadcrumb/Breadcrumb';
import React from 'react';

const UserReviewPage = (): JSX.Element => {
    // NOTE: breadcrumb
    const itemRender = (route: Route, params: any, routes: Route[]): React.ReactNode => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <span>{route.breadcrumbName}</span>;
    };
    return (
        <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    itemRender: itemRender,
                    routes: [
                        { path: '/', breadcrumbName: '首页' },
                        { path: null, breadcrumbName: '用户管理' },
                        { path: null, breadcrumbName: '用户终审' },
                    ],
                },
            }}
        >
            <UserReviewTable />
        </PageContainer>
    );
};

export default UserReviewPage;
