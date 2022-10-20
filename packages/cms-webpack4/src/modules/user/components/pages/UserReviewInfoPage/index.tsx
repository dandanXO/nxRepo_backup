import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Tabs, Button ,Form } from 'antd';
import UserInfo from '../../components/UserInfo';
import AddressBook from '../../components/AddressBook';
import SmsMessage from '../../components/SmsMessage';
import { useParams } from "react-router-dom";
import UsesrReviewModal from './UserReviewModal';
import {  useHistory } from "react-router-dom";
const UserReviewInfoPage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const urlParams = useParams<{ userId: string }>();
    const userId = Number(urlParams.userId)
    const [form] = Form.useForm();
    const [showModal,setShowModal]=useState(false);
    const history=useHistory();
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

    const onFinish=()=>{

        console.log(form.getFieldsValue())
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
                        routes: [
                            { path: '', breadcrumbName: '首页' },
                            { path: '', breadcrumbName: '用户管理' },
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
            </PageContainer>
        </div>
    ) : null;
};
export default UserReviewInfoPage;
