import { useState } from 'react';
import { Form } from 'antd';
import AdminPage from '../../../../shared/components/common/AdminPage';
import WhiteListTable from './WhiteListTable';
import AddWhiteListModal from './AddWhiteListModal';
import { usePostWhiteListMutation } from '../../../api/WhiteListApi';

const WhiteListPage = ():JSX.Element => {
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const [postWhiteList, {  isSuccess }] = usePostWhiteListMutation();

    const onFinish = (values: any) => {
        console.log(values);
        postWhiteList(values);
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
                    breadcrumbName: '白名单',
                },
            }}
        >
            <>
                <WhiteListTable setShowModal={setShowModal} isPostWhiteListSuccess={isSuccess}/>
                <AddWhiteListModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    onFinish={onFinish}
                    form={form}
                />
            </>
        </AdminPage>
    );
};

export default WhiteListPage;

