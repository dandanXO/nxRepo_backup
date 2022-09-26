import { useEffect, useState } from 'react';
import moment from "moment"
import Table from "../../component/table";
import { PageContainer } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import UserInfo from '../../component/UserInfo';
import AddressBook from '../../component/AddressBook';
import SmsMessage from '../../component/SmsMessage';
import LoanInfo from '../../component/LoanInfo';


const Product = () => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const tabs = [
        { label: '用户信息', key: 'userInfo', children: <UserInfo/> }, // 务必填写 key
        { label: '通讯录', key: 'addressBook', children: <AddressBook/> },
        { label: '手机短信', key: 'smsMessage', children: <SmsMessage/> },
        { label: '借款信息', key: 'loanInfo', children: <LoanInfo/> },
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
                            { path: '', breadcrumbName: '产品管理' },
                            { path: '', breadcrumbName: '产品管理' },
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
export default Product;
