import { PageContainer } from '@ant-design/pro-components';
import { Route } from 'antd/es/breadcrumb/Breadcrumb';
import React from 'react';

import LoginAccountManageTable from './LoginAccountManageTable';

const LoginAccountManagePage = (): JSX.Element => {
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
                        { path: null, breadcrumbName: '系统管理' },
                        { path: null, breadcrumbName: '登入帐号管理' },
                    ],
                },
            }}
        >
            <LoginAccountManageTable />
        </PageContainer>
    );
};

export default LoginAccountManagePage;
