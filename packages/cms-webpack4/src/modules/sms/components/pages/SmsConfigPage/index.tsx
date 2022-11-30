import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, InputNumber, Modal, Radio, Space } from 'antd';
import AdminPage from '../../../../shared/components/AdminPage';
import SmsConfigTable from './SmsConfigTable';
const SmsConfigPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    // const [postBlackList, { isLoading, isSuccess }] = usePostBlackListMutation();

    const onFinish = (values: any) => {
        // postBlackList(values);
        form.resetFields();
        setShowModal(false)
    };

    const handleCloseModal = () => {
        setShowModal(false)
        form.resetFields()
    }

    return (
        <AdminPage
            navigator={{
                ancestor: { path: '/', breadcrumbName: '首页', },
                parent: { path: null, breadcrumbName: '短信管理', },
                self: { path: null, breadcrumbName: '短信配置', },
            }}
        >
            <>
                {/* <SmsConfigTable setShowModal={setShowModal} isPostBlackListSuccess={isSuccess}/> */}
                <SmsConfigTable setShowModal={setShowModal} />
                {/* <AddBlackListModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    onFinish={onFinish}
                    form={form}
                /> */}
            </>
        </AdminPage>
    );
}

export default SmsConfigPage;

