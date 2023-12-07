import { PageContainer } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { itemRender } from '../../../shared/components/common/itemRender';
import AddressBook from '../../../shared/components/userInfo/AddressBook';
import LoanInfo from '../../../shared/components/userInfo/LoanInfo';
import OrderInfo from '../../../shared/components/userInfo/OrderInfo';
import SmsMessage from '../../../shared/components/userInfo/SmsMessage';
import UserInfo from '../../../shared/components/userInfo/UserInfo';

const OrderDetailPage = (): JSX.Element => {
    const [domLoaded, setDomLoaded] = useState(false);
    const urlParams = useParams<{ userId: string; orderId: string }>();
    const userId = Number(urlParams.userId);
    const orderId = Number(urlParams.orderId);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const tabs = [
        { label: '订单信息', key: 'orderInfo', children: <OrderInfo orderId={orderId} showLoanCertificate /> }, // 务必填写 key
        { label: '用户信息', key: 'userInfo', children: <UserInfo userId={userId} type="order" /> },
        { label: '通讯录', key: 'addressBook', children: <AddressBook userId={userId} /> },
        { label: '手机短信', key: 'smsMessage', children: <SmsMessage userId={userId} /> },
        { label: '借款信息', key: 'loanInfo', children: <LoanInfo userId={userId} /> },
    ];

    return domLoaded ? (
        <div>
            <PageContainer
                // loading
                header={{
                    ghost: true,
                    breadcrumb: {
                        itemRender: itemRender,
                        routes: [
                            { path: '/', breadcrumbName: '首页' },
                            { path: null, breadcrumbName: '订单管理' },
                            { path: '/orderManagement/orderList', breadcrumbName: '订单列表' },
                            { path: null, breadcrumbName: '订单详情' },
                        ],
                    },
                }}
            >
                <Tabs items={tabs} />
            </PageContainer>
        </div>
    ) : null;
};
export default OrderDetailPage;
