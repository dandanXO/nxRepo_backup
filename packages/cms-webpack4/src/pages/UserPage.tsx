import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, InputNumber, Modal, Radio, Space } from 'antd';
import UserTable from '../modules/user/components/UserTable';
import AddBlackListModal from '../modules/user/components/AddBlackListModal';
import { GetUerListProps, UserListContent, GetUserListResponse, GetUserListRequestQuerystring, GetUerProps } from "../modules/user/api/types/getUserList";
import { usePostBlackListAddMutation } from '../modules/user/api/UserApi';
import useAutoLogin from '../modules/shared/hooks/useAutoLogin';


const UserManage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const [showModal, setShowModal] = useState({show:false,userId:''});
    const [form] = Form.useForm();
    const [postBlackListAdd, { isLoading, isSuccess }] = usePostBlackListAddMutation();
    useAutoLogin();
    useEffect(() => {
        setDomLoaded(true);
    }, [])


    const onFinish = (values: any) => {
        console.log( values,showModal)
        postBlackListAdd({ ...values, userId: showModal.userId });
        form.resetFields();
        setShowModal({ show: false, userId: "" })
    };



    const handleCloseModal = () => {
        setShowModal({ show: false, userId: "" })
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
            <AddBlackListModal showModal={showModal.show} handleCloseModal={handleCloseModal} onFinish={onFinish} form={form} />
        </PageContainer> : null
    )
}

export default UserManage;

