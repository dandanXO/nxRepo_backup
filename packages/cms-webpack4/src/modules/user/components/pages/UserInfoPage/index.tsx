import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import UserInfo from '../../../../shared/components/userInfo/UserInfo';
import AddressBook from '../../../../shared/components/userInfo/AddressBook';
import SmsMessage from '../../../../shared/components/userInfo/SmsMessage';
import LoanInfo from '../../../../shared/components/userInfo/LoanInfo';
import {Link, useParams} from "react-router-dom";
import {Route} from "antd/es/breadcrumb/Breadcrumb";
import {itemRender} from "../../../../shared/components/common/itemRender";
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

    return domLoaded ? (
        <div>
            <PageContainer
                // loading
                header={{
                    ghost: true,
                    breadcrumb: {
                        itemRender: itemRender,
                        routes: [
                            { path: "/", breadcrumbName: '首页' },
                            { path: null, breadcrumbName: '用户管理' },
                            { path: "/user", breadcrumbName: '用户管理' },
                            { path: null, breadcrumbName: '用户详细信息' },
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
