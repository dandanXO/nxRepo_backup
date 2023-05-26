import NewCustomersDailyConversionRatesTable from './NewCustomersDailyConversionRatesTable';
import { PageContainer } from '@ant-design/pro-components';
import { Route } from 'antd/es/breadcrumb/Breadcrumb';
import React from 'react';

const NewCustomersDailyConversionRatesPage = (): JSX.Element => {
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
                        { path: null, breadcrumbName: '数据统计' },
                        { path: null, breadcrumbName: '新客日统计转化率' },
                    ],
                },
            }}
        >
            <NewCustomersDailyConversionRatesTable />
        </PageContainer>
    );
};

export default NewCustomersDailyConversionRatesPage;
