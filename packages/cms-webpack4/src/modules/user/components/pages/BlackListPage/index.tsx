import AdminPage from '../../../../shared/components/common/AdminPage';
import { usePostBlackListMutation } from '../../../api/BlackListApi';
import AddBlackListModal from './AddBlackListModal';
import BlackListTable from './BlackListTable';
import { Form } from 'antd';
import { useState } from 'react';

const BlackListPage = (): JSX.Element => {
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const [postBlackList, { isSuccess }] = usePostBlackListMutation();

    const onFinish = (values: any) => {
        postBlackList(values);
        form.resetFields();
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        form.resetFields();
    };

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
                    breadcrumbName: '黑名单',
                },
            }}
        >
            <>
                <BlackListTable setShowModal={setShowModal} isPostBlackListSuccess={isSuccess} />
                <AddBlackListModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    onFinish={onFinish}
                    form={form}
                />
            </>
        </AdminPage>
    );
};

export default BlackListPage;
