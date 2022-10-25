import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Tabs, Button ,Form,Modal,List } from 'antd';
import UserInfo from '../../components/UserInfo';
import AddressBook from '../../components/AddressBook';
import SmsMessage from '../../components/SmsMessage';
import { useParams } from "react-router-dom";
import UsesrReviewModal from './UserReviewModal';
import {  useHistory } from "react-router-dom";
import { usePostUserReviewMutation } from '../../../api/UserReviewApi';
import {Route} from "antd/es/breadcrumb/Breadcrumb";
const UserReviewInfoPage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const urlParams = useParams<{ userId: string }>();
    const userId = Number(urlParams.userId)
    const [form] = Form.useForm();
    const [showModal,setShowModal]=useState(false);
    const [postUserReview, { data, isLoading, isSuccess }] = usePostUserReviewMutation();
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

    const handleCloseModal=()=>{
        form.resetFields();
        setShowModal(false);
    }

    useEffect(() => {
        setShowModal(false);
        if(data && data.length === 0){
            history.push('/user-review');
        }

        // 送出審核 - 錯誤訊息提醒
        if (data && data.length !== 0) {
            modal.error({
                title: 'Error',
                content:
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`用户ID - ${item.userId}`}
                                    description={item.errorMessage}
                                />
                            </List.Item>
                        )}
                    />
            })
        }

    }, [isSuccess])

    const onFinish = () => {
        postUserReview({ userIds: [userId], ...form.getFieldsValue() })
    }

    // NOTE: breadcrumb
    const itemRender = (route: Route, params: any, routes: Route[], paths: string[]): React.ReactNode => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <span>{route.breadcrumbName}</span>
        );
    }

    return domLoaded ? (
        <div>
            <PageContainer
                style={{
                    paddingBottom: 65
                }}
                // loading
                header={{
                    // title: '页面标题',
                    ghost: true,
                    breadcrumb: {
                        itemRender,
                        routes: [
                            { path: '', breadcrumbName: '首页' },
                            { path: '/user-review', breadcrumbName: '用户管理' },
                            { path: '', breadcrumbName: '用户终审' },
                        ],
                    },
                }}
                footer={[
                    <Button key="cancel" type='ghost' onClick={()=>history.goBack()}>取消</Button>,
                    <Button key="submit" type="primary" onClick={()=>setShowModal(true)}>审核</Button>,
                ]}
            >
                <Tabs items={tabs} />
                <UsesrReviewModal showModal={showModal} handleCloseModal={handleCloseModal} form={form} onFinish={onFinish}/>
                {contextHolder}
            </PageContainer>
        </div>
    ) : null;
};
export default UserReviewInfoPage;
