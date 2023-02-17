import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Radio, Space, List ,AutoComplete} from 'antd';
import { LoginAccountList, GetLoginAccountListRequestQuery } from '../../../api/types/LoginAccountManageTypes/getLoginAccountList';
import { usePostLogoutMutation, useLazyGetLoginAccountListQuery } from '../../../api/LoginAccountManageApi';
import { ProColumnsOperationConstant } from "../../../../shared/components/common/ProColumnsOperationConstant";
import { getIsSuperAdmin } from '../../../../shared/storage/getUserInfo';
import useGetMerchantEnum from '../../../../shared/hooks/common/useGetMerchantEnum';
import CopyText from '../../../../shared/components/other/CopyText';

const LoginAccountManageTable = () => {

    const isSuperAdmin = getIsSuperAdmin();
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();

    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetLoginAccountListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [postLogout, { data, isSuccess: postLogoutIsSuccess }] = usePostLogoutMutation();

    const initSearchList: GetLoginAccountListRequestQuery = {
        accountNumber: '', ip: '', lastActiveEndTime: '', lastActiveStartTime: '', lastLoginEndTime: '', lastLoginStartTime: '', loginLocation: '', merchantId: '',
    }

    // state
    const [searchList, setSearchList] = useState<GetLoginAccountListRequestQuery>(initSearchList);
    const [modal, contextHolder] = Modal.useModal();
    const [selectedRow, setSelectedRow] = useState([]);
    const [buttonDisabled, setButtonDisbaled] = useState(true)
    const [expandRow, setExpandRow] = useState([]);


    const onSelectChange = (selectedRowKeys) => {
        setButtonDisbaled(selectedRowKeys.length === 0 ? true : false)
        console.log(selectedRowKeys)
        setSelectedRow(selectedRowKeys);
    };

    const onExpandChange = (expandRowKeys) => {
        setExpandRow(expandRowKeys)
    }

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList, postLogoutIsSuccess])

    useEffect(() => {
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
        };
    }, [isSuperAdmin])

    const handleLogoutAll = () => {
        modal.confirm({
            content: `确认全部踢出吗？`,
            onOk() {
                const logoutAccounts = currentData
                    .filter(i => selectedRow.includes(i.accountNumber))
                    .map(account => account.tokens)
                    .reduce((prev, curr) => [...prev, ...curr], [])
                postLogout({ tokens: logoutAccounts }).unwrap().then(() => { onSelectChange([]); });
            }
        });
    }


    const handleLogout = (confirmType, record) => {
        const confirmText = confirmType === 'ip' ? `确认要踢出此IP位址吗？` : `确认要踢出此用户吗？`;

        modal.confirm({
            content: confirmText,
            onOk() {
                postLogout({ tokens: confirmType === 'ip' ? [record.token] : record.tokens })
                    .unwrap().then(() => onSelectChange(selectedRow.filter(i => i !== record.accountNumber)));
            }
        });
    }


    const columns: ProColumns<LoginAccountList>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [<a key="editable" onClick={() => handleLogout('account', record)} >踢出</a>],
            width: '50px',
        },
        { title: '手机号/登入帐号', dataIndex: 'accountNumber', key: 'accountNumber', initialValue: "", render: (text) => <CopyText text={text} /> },
        { title: 'IP位址', dataIndex: 'ip', key: 'ip', initialValue: "", hideInTable: true },
        { title: '登入地区', dataIndex: 'loginLocation', key: 'loginLocation', initialValue: "", hideInTable: true },
        { title: '最后活跃时间', dataIndex: 'lastActiveTime', key: 'lastActiveTime', initialValue: "", hideInSearch: true },
        {
            title: '最后活跃时间', dataIndex: 'lastActiveTimeRange', key: 'lastActiveTimeRange', valueType: 'dateTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'], minuteStep: 15, secondStep: 10 }, hideInTable: true, initialValue: ""
        },
        {
            title: '上次登入时间', dataIndex: 'lastLoginTimeRange', key: 'lastLoginTimeRange',  valueType: 'dateTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'], minuteStep: 15, secondStep: 10 }, hideInTable: true, initialValue: ""
        },

    ]

    if (isSuperAdmin) {
        columns.splice(1, 0, {
            title: '商户名', dataIndex: 'merchantName', key: 'merchantName', hideInSearch: true, width: ProColumnsOperationConstant.width["2"], render: (text) => <CopyText text={text} />
        }, {
            title: '商户名', dataIndex: 'merchantId', key: 'merchantId', hideInTable: true, initialValue: '', valueType: 'select', valueEnum: merchantListEnum, fieldProps: { showSearch: true }
        })
    }

    const expandedRowRender = (data) => {
        return (
            <ProTable
                columns={[
                    { width: `${50 + 32}px`, }, // checkbox 47px + 操作 50px
                    { title: 'IP位址', dataIndex: 'ip', key: 'ip', render: (text) => <CopyText text={text} /> },
                    { title: '登入地区', dataIndex: 'loginLocation', key: 'loginLocation', render: (text) => <CopyText text={text} /> },
                    { title: '最后活跃时间', dataIndex: 'lastActiveTime', key: 'lastActiveTime' },
                    { title: '上次登入时间', dataIndex: 'lastLoginTime', key: 'lastLoginTime' },
                    {
                        title: '操作',
                        valueType: 'option',
                        key: 'option',
                        render: (text, record, _, action) => [<a key="editable" onClick={() => handleLogout('ip', record)} >踢出</a>],
                        width: ProColumnsOperationConstant.width["1"],
                    },
                ]}
                headerTitle={false}
                search={false}
                options={false}
                dataSource={data}
                pagination={false}
                tableStyle={{ padding: '12px 8px', background: '#fafafa' }}
            />

        );
    };


    return (
        <ProTable<LoginAccountList>
            expandable={{
                expandedRowKeys: expandRow,
                onExpandedRowsChange: onExpandChange,
                expandedRowRender: (record) => expandedRowRender(record.operators)
            }}
            columns={columns}
            dataSource={currentData || []}
            loading={isFetching}
            rowSelection={{
                selectedRowKeys: selectedRow,
                onChange: onSelectChange,
            }}
            rowKey={({ accountNumber }) => accountNumber}
            headerTitle={<Button key="passButton" type="primary" ghost disabled={buttonDisabled} onClick={() => handleLogoutAll()}>全部踢出</Button>}
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space >
                        {contextHolder}
                        <Button
                            onClick={() => {
                                // @ts-ignore
                                form.setFieldsValue({
                                    ...initSearchList,
                                    lastActiveTimeRange: '',
                                    lastLoginTimeRange: ''
                                });
                                setSearchList(initSearchList);
                                onSelectChange([]);
                            }}
                        >
                            {resetText}
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { merchantId = '', accountNumber, ip, loginLocation, lastActiveTimeRange, lastLoginTimeRange } = form.getFieldValue();
                                console.log(lastLoginTimeRange)
                                setSearchList({
                                    merchantId, accountNumber, ip, loginLocation,
                                    lastActiveEndTime: lastActiveTimeRange[1] ? lastActiveTimeRange[1].format('YYYY-MM-DD HH:mm:ss') : '',
                                    lastActiveStartTime: lastActiveTimeRange[0] ? lastActiveTimeRange[0].format('YYYY-MM-DD HH:mm:ss') : '',
                                    lastLoginEndTime: lastLoginTimeRange[1] ? lastLoginTimeRange[1].format('YYYY-MM-DD HH:mm:ss') : '',
                                    lastLoginStartTime: lastLoginTimeRange[0] ? lastLoginTimeRange[0].format('YYYY-MM-DD HH:mm:ss') : '',
                                });
                                onSelectChange([]);
                                form.submit();

                            }}
                        >
                            {searchText}
                        </Button>
                    </Space>
                ),
            }}
            options={{
                setting: { listsHeight: 400 },
                reload: () => triggerGetList(searchList),
            }}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
            }}
        >

        </ProTable>
    );
}

export default LoginAccountManageTable;

