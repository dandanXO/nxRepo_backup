import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, InputNumber, Modal, Radio, Space } from 'antd';

import AdminPage from '../../../shared/components/common/AdminPage';
import OrderTable from './OrderTable';

const OrderPage = () => {


    return (
        <AdminPage
            navigator={{
                ancestor: {
                    path: '/',
                    breadcrumbName: '首页',
                },
                parent: {
                    path: null,
                    breadcrumbName: '订单管理',
                },
                self: {
                    path: null,
                    breadcrumbName: '订单列表',
                },
            }}
        >
            <>
                <OrderTable/>
            </>
        </AdminPage>
    );
};

export default OrderPage;

