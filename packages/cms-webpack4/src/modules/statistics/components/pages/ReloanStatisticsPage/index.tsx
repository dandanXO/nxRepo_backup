
import { PageContainer } from '@ant-design/pro-components';
import ReloanStatisticsTable from './ReloanStatisticsTable';

import {Route} from "antd/es/breadcrumb/Breadcrumb";

const ReloanStatisticsPage = () => {
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
                        { path: null, breadcrumbName: '数据统计' },
                        { path: null, breadcrumbName: '用户复借统计' },
                    ],
                },
            }}
        >
             <ReloanStatisticsTable  />
        </PageContainer>
    )
}

export default ReloanStatisticsPage;

