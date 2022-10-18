import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import UserInfo from '../../components/UserInfo';
import AddressBook from '../../components/AddressBook';
import SmsMessage from '../../components/SmsMessage';
import LoanInfo from '../../components/LoanInfo';
import { useParams } from "react-router-dom";
const UserReviewInfoPage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const urlParams = useParams<{ userId: string }>();
    const userId = Number(urlParams.userId)

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const tabs = [
        { label: '用户信息', key: 'userInfo', children: <UserInfo userId={userId}/> }, // 务必填写 key
        { label: '通讯录', key: 'addressBook', children: <AddressBook userId={userId}/> },
        { label: '手机短信', key: 'smsMessage', children: <SmsMessage userId={userId}/> },
      ];

    return domLoaded ? (
        <div>
            <PageContainer
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
            >
                <Tabs items={tabs}/>
            </PageContainer>

        </div>
    ) : null;
};
export default UserReviewInfoPage;
