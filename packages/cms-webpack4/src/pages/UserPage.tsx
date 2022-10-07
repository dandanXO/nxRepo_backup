import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, InputNumber, Modal, Radio, Space } from 'antd';
import UserTable from '../modules/user/components/UserTable';
import { GetUerListProps, UserListContent, GetUserListResponse, GetUserListRequestQuerystring, GetUerProps } from "../modules/user/api/types/getUserList";
import { useLazyGetUserManageListQuery, useGetChannelListQuery, useGetUserSMSListQuery } from '../modules/user/api/UserApi';
import useAutoLogin from '../modules/shared/hooks/useAutoLogin';


const UserManage = () => {
    const [domLoaded, setDomLoaded] = useState(false);

    

    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    useAutoLogin();
    useEffect(() => {


        setDomLoaded(true);

    }, [])







    const onFinish = (values: any) => {
        // isEdit ? putMerchantEdit(values) : postMerchantCreate({ merchantId: values.merchantId, ...values });
        form.resetFields()
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const handleCloseModal = () => {
        setShowModal(false)
        form.resetFields()
    }

    return (
        domLoaded ? <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    routes: [
                        { path: '', breadcrumbName: '首页', },
                        { path: '', breadcrumbName: '用户管理', },
                        { path: '', breadcrumbName: '用户管理 ', },
                    ],
                },
            }}
        >
            <UserTable setShowModal={setShowModal} />
            <Modal
                title={"添加黑名单"}
                open={showModal}
                onCancel={handleCloseModal}
                onOk={form.submit}
            >
                {/* <Spin spinning={isEdit ? isMerchantEditing : isMerchantCreating}> */}
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{ comment: "" }}>
                    <Form.Item name="comment" label="备注" rules={[{ required: true }]} extra="提醒您，备注提交后即不可再修改">
                        <Input.TextArea allowClear rows={8} />
                    </Form.Item>
                </Form>
                {/* </Spin> */}
            </Modal>
        </PageContainer> : null
    )
}

export default UserManage;

