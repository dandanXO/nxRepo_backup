import { Tabs } from 'antd';

import AdminPage from '../../../shared/components/common/AdminPage';
import TelSaleMemberTab from './TelSaleMemberTab';
import TelSaleTeamTab from './TelSaleTeamTab';

const TelSaleMemberManage = (): JSX.Element => {
    const tabsItems = [
        { label: '电销团队', key: 'team', children: <TelSaleTeamTab /> },
        { label: '电销人员', key: 'member', children: <TelSaleMemberTab /> },
    ];

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
            <Tabs items={tabsItems} />
        </AdminPage>
    );
};

export default TelSaleMemberManage;
