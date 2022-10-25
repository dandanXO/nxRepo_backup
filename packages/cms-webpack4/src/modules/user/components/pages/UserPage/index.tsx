import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, InputNumber, Modal, Radio, Space } from 'antd';
import UserTable from './UserTable';
import AddBlackListModal from './AddBlackListModal';
import { usePostBlackListAddMutation } from '../../../api/UserApi';

import AdminPage from '../../../../shared/components/AdminPage';
const UserManage = () => {
    const [showModal, setShowModal] = useState({show:false,userId:''});
    const [form] = Form.useForm();
    const [postBlackListAdd, { isLoading, isSuccess }] = usePostBlackListAddMutation();

    const onFinish = (values: any) => {
        postBlackListAdd({ ...values, userId: showModal.userId });
        form.resetFields();
        setShowModal({ show: false, userId: "" })
    };



    const handleCloseModal = () => {
        setShowModal({ show: false, userId: "" })
        form.resetFields()
    }

    return (
        <AdminPage
            navigator={{
                ancestor: {
                    path: "/",
                    breadcrumbName: "首页",
                },
                parent: {
                    path: null,
                    breadcrumbName: "用户管理",
                },
                self: {
                    path: null,
                    breadcrumbName: "用户管理"
                }
            }}
        >
            <>
                <UserTable setShowModal={setShowModal} />
                <AddBlackListModal showModal={showModal.show} handleCloseModal={handleCloseModal} onFinish={onFinish} form={form} />
            </>

        </AdminPage>
    )
}

export default UserManage;

