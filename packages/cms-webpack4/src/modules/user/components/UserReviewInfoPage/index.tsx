import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, List, Modal, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { itemRender } from '../../../shared/components/common/itemRender';
import AddressBook from '../../../shared/components/userInfo/AddressBook';
import SmsMessage from '../../../shared/components/userInfo/SmsMessage';
import UserInfo from '../../../shared/components/userInfo/UserInfo';
import { usePostUserReviewMutation } from '../../api/UserReviewApi';
import UserReviewModal from './UserReviewModal';

const UserReviewInfoPage = (): JSX.Element => {
    const [domLoaded, setDomLoaded] = useState(false);
    const urlParams = useParams<{ userId: string }>();
    const userId = Number(urlParams.userId);
    const [form] = Form.useForm();
    const [showModal, setShowModal] = useState(false);
    const [postUserReview, { data, isSuccess }] = usePostUserReviewMutation();
    const history = useHistory();
    const [modal, contextHolder] = Modal.useModal();
    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const tabs = [
        { label: '用户信息', key: 'userInfo', children: <UserInfo userId={userId} /> }, // 务必填写 key
        { label: '通讯录', key: 'addressBook', children: <AddressBook userId={userId} /> },
        { label: '手机短信', key: 'smsMessage', children: <SmsMessage userId={userId} /> },
    ];

    const handleCloseModal = () => {
        form.resetFields();
        setShowModal(false);
    };

    useEffect(() => {
        setShowModal(false);
        if (data && data.length === 0) {
            history.push('/user-review');
        }

        // 送出審核 - 錯誤訊息提醒
        if (data && data.length !== 0) {
            modal.error({
                title: 'Error',
                content: (
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta title={`用户ID - ${item.userId}`} description={item.errorMessage} />
                            </List.Item>
                        )}
                    />
                ),
            });
        }
    }, [isSuccess]);

    const onFinish = () => {
        postUserReview({ userIds: [userId], ...form.getFieldsValue() });
    };

    return domLoaded ? (
        <div>
            <PageContainer
                style={{
                    paddingBottom: 65,
                }}
                // loading
                header={{
                    // title: '页面标题',
                    ghost: true,
                    breadcrumb: {
                        itemRender: itemRender,
                        routes: [
                            { path: '/', breadcrumbName: '首页' },
                            { path: null, breadcrumbName: '用户管理' },
                            { path: '/userManage/userLastCheck', breadcrumbName: '用户终审' },
                            { path: null, breadcrumbName: '审核' },
                        ],
                    },
                }}
                footer={[
                    <Button key="cancel" type="ghost" onClick={() => history.goBack()}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => setShowModal(true)}>
                        审核
                    </Button>,
                ]}
            >
                <Tabs items={tabs} />
                <UserReviewModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    form={form}
                    onFinish={onFinish}
                />
                {contextHolder}
            </PageContainer>
        </div>
    ) : null;
};
export default UserReviewInfoPage;