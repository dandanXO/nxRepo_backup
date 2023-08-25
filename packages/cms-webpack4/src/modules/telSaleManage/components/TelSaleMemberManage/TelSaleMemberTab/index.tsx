import { EditOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { useLazyGetUsersQuery } from '../../../../shared/api/UsersApi';
import { UsersItem } from '../../../../shared/api/types/user/getUsers';
import { useGetTelSaleRolesQuery } from '../../../api/TelTeamManageApi';
import MemberModifyModal from './MemberModifyModal';

const statusEnum = new Map();
statusEnum.set('', { text: '全部' });
statusEnum.set('1', { text: '启用' });
statusEnum.set('0', { text: '冻结' });

const searchSpan = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 8,
};

const searchFormLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const getUsersInitialBody = {
    pageNum: 1,
    pageSize: 10,
    pageEnable: true,
    enabled: '',
    phoneNo: '',
    roleId: null,
};

const TelSaleMemberTab = (): JSX.Element => {
    const [openMemberModify, setOpenMemBerModify] = useState<{ open: boolean; record: UsersItem }>({
        open: false,
        record: {},
    });

    const [getUsersBody, setGetUsersBody] = useState(getUsersInitialBody);
    const [getUsers, { currentData: getUsersResponse, isFetching: isGetUsersLoading }] = useLazyGetUsersQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    const { currentData: telSaleRoles, isLoading: telSaleRolesLoading } = useGetTelSaleRolesQuery(null);

    useEffect(() => {
        getUsers({
            parameters: { telManage: true },
            body: getUsersBody,
        });
    }, [getUsersBody]);

    const roleMap = new Map();
    roleMap.set('', { text: '不限' });
    let i = 0;
    while (telSaleRoles?.length > i) {
        roleMap.set(telSaleRoles[i].roleId, { text: telSaleRoles[i].name });
        i++;
    }

    const columns: ProColumns<UsersItem>[] = [
        {
            title: '姓名',
            dataIndex: 'trueName',
            hideInSearch: true,
        },
        {
            title: '账号',
            dataIndex: 'userName',
            hideInSearch: true,
        },
        {
            title: '手机号',
            dataIndex: 'phoneNo',
            initialValue: '',
        },
        {
            title: '角色',
            dataIndex: 'roleStr',
            hideInSearch: true,
        },
        {
            title: '角色',
            dataIndex: 'roleId',
            initialValue: '',
            valueType: 'select',
            valueEnum: roleMap,
            hideInTable: true,
            fieldProps: {
                allowClear: false,
            },
        },
        {
            title: '电销团队',
            dataIndex: 'telTeamName',
            hideInSearch: true,
        },
        {
            title: '电销组别',
            dataIndex: 'telGroupName',
            hideInSearch: true,
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            valueType: 'select',
            valueEnum: statusEnum,
            initialValue: '',
            fieldProps: {
                allowClear: false,
            },
        },
        {
            title: '操作',
            dataIndex: 'operate',
            hideInSearch: true,
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setOpenMemBerModify({
                                open: true,
                                record,
                            });
                        }}
                    />
                </Space>
            ),
        },
    ];

    const pageOnChange = (current, pageSize) => {
        setGetUsersBody({ ...getUsersBody, pageNum: current, pageSize });
    };

    const loading = isGetUsersLoading || telSaleRolesLoading;

    return (
        <>
            <ProTable<UsersItem>
                rowKey="id"
                loading={loading}
                toolBarRender={false}
                columns={columns}
                dataSource={getUsersResponse?.data}
                form={{ ...searchFormLayout }}
                search={{
                    span: searchSpan,
                    labelWidth: 'auto',
                    optionRender: ({ resetText, searchText }, { form }) => [
                        <Space>
                            <Button
                                onClick={() => {
                                    form.setFieldsValue({ ...getUsersInitialBody });
                                    setGetUsersBody(getUsersInitialBody);
                                }}
                            >
                                {resetText}
                            </Button>
                            <Button type="primary" onClick={() => form.submit()}>
                                {searchText}
                            </Button>
                        </Space>,
                    ],
                }}
                onSubmit={(params) => {
                    console.log(params);
                    setGetUsersBody({
                        ...getUsersBody,
                        ...params,
                    });
                }}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 10,
                    onChange: pageOnChange,
                    total: getUsersResponse?.total,
                    current: getUsersResponse?.pageNum,
                }}
            />
            {openMemberModify.open && (
                <MemberModifyModal
                    open={openMemberModify.open}
                    record={openMemberModify.record}
                    onCancel={() => {
                        setOpenMemBerModify({ open: false, record: {} });
                    }}
                    onModified={() => {
                        setOpenMemBerModify({ open: false, record: {} });
                        getUsers({
                            parameters: { telManage: true },
                            body: getUsersBody,
                        });
                    }}
                />
            )}
        </>
    );
};

export default TelSaleMemberTab;
