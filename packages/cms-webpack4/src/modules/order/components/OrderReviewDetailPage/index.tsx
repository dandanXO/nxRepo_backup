import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Tabs, Button ,Form,Modal,List } from 'antd';
import UserInfo from '../../../shared/components/userInfo/UserInfo';
import AddressBook from '../../../shared/components/userInfo/AddressBook';
import SmsMessage from '../../../shared/components/userInfo/SmsMessage';
import { useParams,useHistory } from "react-router-dom";
import OrderReviewModal from './OrderReviewModal';
import { usePostOrderReviewMutation } from '../../api/OrderReviewApi';
import OrderInfo from '../../../shared/components/userInfo/OrderInfo';
import {itemRender} from "../../../shared/components/common/itemRender";

const OrderFinalReviewDetailPage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const urlParams = useParams<{ userId: string, orderId: string,orderNo: string }>();
    const userId = Number(urlParams.userId);
    const orderId = Number(urlParams.orderId);
    const orderNo = urlParams.orderNo;
    const [form] = Form.useForm();
    const [showModal,setShowModal]=useState(false);
    const [postOrderReview, { data, isLoading, isSuccess }] = usePostOrderReviewMutation();
    const [errorModal, errorContextHolder] = Modal.useModal();
    const history = useHistory();

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const tabs = [
        { label: '订单信息', key: 'orderInfo', children: <OrderInfo orderId={orderId}/> }, // 务必填写 key
        { label: '用户信息', key: 'userInfo', children: <UserInfo userId={userId} type="order"/> },
        { label: '通讯录', key: 'addressBook', children: <AddressBook userId={userId} /> },
        { label: '手机短信', key: 'smsMessage', children: <SmsMessage userId={userId} /> },
    ];

    const handleCloseModal=()=>{
        form.resetFields();
        setShowModal(false);
    }

    const onFinish = () => {
        const {status}=form.getFieldsValue();
        const reasonText={
            0:`终审拒绝`,
            1:``,
            2:'复审拒绝且拉黑',
            3:'复审拒绝7天'
        }
        postOrderReview({ orderNos: [orderNo], ...form.getFieldsValue() , reason: reasonText[status]})
            .unwrap()
            .then((payload) => {
                setShowModal(false);
                history.push('/order-review');
            })
            .catch((error) => {
                errorModal.error({
                    title: 'Error',
                    content: `审核失败`
                })
            })
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
                            { path: '/order-review', breadcrumbName: '订单复审', },
                            { path: null, breadcrumbName: '审核', },
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
                {errorContextHolder}
            </PageContainer>
        </div>
    ) : null;
};
export default OrderFinalReviewDetailPage;
