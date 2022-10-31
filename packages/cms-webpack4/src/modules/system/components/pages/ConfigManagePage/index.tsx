import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, InputNumber, Modal, Radio, Space } from 'antd';
import AdminPage from '../../../../shared/components/AdminPage';
import ConfigManageTab from './ConfigManageTab';

const ConfigManagePage = () => {
   
    return (
        <AdminPage
            navigator={{
                ancestor: { path: '/', breadcrumbName: '首页', },
                parent: { path: null, breadcrumbName: '系统管理', },
                self: { path: null, breadcrumbName: '参数配置', },
            }}
        >
            <>
<ConfigManageTab/>
            </>
        </AdminPage>
    );
}

export default ConfigManagePage;

