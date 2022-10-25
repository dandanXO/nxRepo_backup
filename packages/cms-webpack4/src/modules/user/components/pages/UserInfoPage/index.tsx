import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import UserInfo from '../../components/UserInfo';
import AddressBook from '../../components/AddressBook';
import SmsMessage from '../../components/SmsMessage';
import LoanInfo from '../../components/LoanInfo';
import { useParams } from "react-router-dom";
import {Route} from "antd/es/breadcrumb/Breadcrumb";
const UserInfoPage = () => {
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
        { label: '借款信息', key: 'loanInfo', children: <LoanInfo userId={userId}/> },
      ];

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
                // loading
                header={{
                   
                    ghost: true,
                    breadcrumb: {
                        itemRender,
                        routes: [
                            { path: '', breadcrumbName: '首页' },
                            { path: '/user', breadcrumbName: '用户管理' },
                            { path: '/', breadcrumbName: '用户管理' },
                            { path: '', breadcrumbName: '用户详细信息' },
                        ],
                    },
                }}
            >
                <Tabs items={tabs}/>
            </PageContainer>

        </div>
    ) : null;
};
export default UserInfoPage;
