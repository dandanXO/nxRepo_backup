import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, InputNumber, Modal, Radio, Space } from 'antd';
import UserReviewTable from './UserReviewTable';
import { usePostBlackListAddMutation } from '../../../api/UserApi';
import useAutoLogin from '../../../../shared/hooks/useAutoLogin';


const UserReviewPage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const [showModal, setShowModal] = useState({show:false,userId:''});
    const [form] = Form.useForm();
    const [postBlackListAdd, { isLoading, isSuccess }] = usePostBlackListAddMutation();
    useAutoLogin();
    useEffect(() => {
        setDomLoaded(true);
    }, [])


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
        domLoaded ? <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    routes: [
                        { path: '', breadcrumbName: '首页', },
                        { path: '', breadcrumbName: '用户管理', },
                        { path: '', breadcrumbName: '用户终审', },
                        { path: '', breadcrumbName: '审核', },
                    ],
                },
            }}
        >
            <UserReviewTable setShowModal={setShowModal} />
            {/* <AddBlackListModal showModal={showModal.show} handleCloseModal={handleCloseModal} onFinish={onFinish} form={form} /> */}
        </PageContainer> : null
    )
}

export default UserReviewPage;

