import { Form, Tabs } from 'antd';
import { useState } from 'react';

import AdminPage from '../../../shared/components/common/AdminPage';
import { usePostBlackListAddMutation } from '../../api/UserApi';
import AddBlackListModal from './AddBlackListModal';
import UserQuotaLabelTable from './UserQuotaLabelTable';
import UserTable from './UserTable';

const UserManage = (): JSX.Element => {
    const [showModal, setShowModal] = useState({ show: false, userId: '' });
    const [form] = Form.useForm();
    const [postBlackListAdd, { isSuccess: isPostBlackListSuccess }] = usePostBlackListAddMutation();

    const onFinish = (values: any) => {
        postBlackListAdd({ ...values, userId: showModal.userId });
        form.resetFields();
        setShowModal({ show: false, userId: '' });
    };

    const handleCloseModal = () => {
        setShowModal({ show: false, userId: '' });
        form.resetFields();
    };

    const TabItems = [
        {
            label: '用户管理列表',
            key: '用户管理列表',
            children: <UserTable setShowModal={setShowModal} isPostBlackListSuccess={isPostBlackListSuccess} />,
        },
        { label: '用户额度标签', key: '用户额度标签', children: <UserQuotaLabelTable /> },
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
                    breadcrumbName: '用户管理',
                },
                self: {
                    path: null,
                    breadcrumbName: '用户管理',
                },
            }}
        >
            <>
                <Tabs items={TabItems} />
                <AddBlackListModal
                    showModal={showModal.show}
                    handleCloseModal={handleCloseModal}
                    onFinish={onFinish}
                    form={form}
                />
            </>
        </AdminPage>
    );
};

export default UserManage;
