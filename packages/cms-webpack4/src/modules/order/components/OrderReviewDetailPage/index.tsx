import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Tabs, Button ,Form,Modal,List } from 'antd';
import UserInfo from '../../../shared/components/userInfo/UserInfo';
import AddressBook from '../../../shared/components/userInfo/AddressBook';
import SmsMessage from '../../../shared/components/userInfo/SmsMessage';
import { useParams } from "react-router-dom";
import OrderReviewModal from './OrderReviewModal';
import { useHistory } from "react-router-dom";
import { usePostOrderReviewMutation } from '../../api/OrderReviewApi';
import OrderInfo from '../../../shared/components/userInfo/OrderInfo';
import {itemRender} from "../../../shared/itemRender";
const OrderReviewDetailPage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const urlParams = useParams<{ userId: string }>();
    const userId = Number(urlParams.userId)
    const [form] = Form.useForm();
    const [showModal,setShowModal]=useState(false);
    const [postOrderReview, { data, isLoading, isSuccess }] = usePostOrderReviewMutation();
    const history = useHistory();
    const [modal, contextHolder] = Modal.useModal();
    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const tabs = [
        { label: '订单信息', key: 'orderInfo', children: <OrderInfo userId={userId}/> }, // 务必填写 key
        { label: '用户信息', key: 'userInfo', children: <UserInfo userId={userId} type="order"/> },
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
            history.push('/order-review');
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
                                    // title={`用户ID - ${item.userId}`}
                                    // description={item.errorMessage}
                                />
                            </List.Item>
                        )}
                    />
            })
        }

    }, [isSuccess])

    const onFinish=()=>{
        postOrderReview({userIds:[userId],...form.getFieldsValue()})
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
                        itemRender: itemRender,
                        routes: [
                            { path: '/', breadcrumbName: '首页', },
                            { path: null, breadcrumbName: '订单管理', },
                            { path: '/order-review', breadcrumbName: '订单列表', },
                            { path: null, breadcrumbName: '订单详情', },
                        ],
                    },
                }}
                footer={[
                    <Button key="cancel" type='ghost' onClick={()=>history.goBack()}>取消</Button>,
                    <Button key="submit" type="primary" onClick={()=>setShowModal(true)}>审核</Button>,
                ]}
            >
                <Tabs items={tabs} />
                <OrderReviewModal showModal={showModal} handleCloseModal={handleCloseModal} form={form} onFinish={onFinish}/>
                {contextHolder}
            </PageContainer>
        </div>
    ) : null;
};
export default OrderReviewDetailPage;
