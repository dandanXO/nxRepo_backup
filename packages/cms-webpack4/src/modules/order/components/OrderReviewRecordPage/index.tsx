import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, InputNumber, Modal, Radio, Space } from 'antd';
import AdminPage from '../../../shared/components/AdminPage';
import OrderReviewRecordTable from './OrderReviewRecordTable';


const OrderReviewRecordPage = () => {
   

    return (
        <AdminPage
            navigator={{
                ancestor: { path: '/', breadcrumbName: '首页', },
                parent: { path: null, breadcrumbName: '用户管理', },
                self: { path: null, breadcrumbName: '用户审核纪录', },
            }}
        >
            <>
                <OrderReviewRecordTable />
            </>
        </AdminPage>
    );
}

export default OrderReviewRecordPage;

