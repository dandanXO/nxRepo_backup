import { Form, Modal, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { useUpdateUserMutation } from '../../../../../shared/api/UsersApi';
import { UsersItem } from '../../../../../shared/api/types/user/getUsers';
import { useGetTelSaleTeamsQuery, useLazyGetTelSaleGroupsQuery } from '../../../../api/TelTeamManageApi';

const { Item } = Form;

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

interface IMemberModifyModalProps {
    open: boolean;
    onCancel: () => void;
    record: UsersItem;
    onModified: () => void;
}

const MemberModifyModal = ({ open, record, onCancel, onModified }: IMemberModifyModalProps): JSX.Element => {
    const [selectedTeam, setSelectedTeam] = useState(record.telTeamId);
    const [selectedGroup, setSelectedGroup] = useState(record.telGroupId);
    const [updateUser, { isLoading: userUpdating }] = useUpdateUserMutation();
    const { currentData: telSaleTeams, isFetching: telSaleTeamsFetching } = useGetTelSaleTeamsQuery(null);
    const [getTelSaleGroups, { currentData: telSaleGroups, isLoading: telSaleGroupsFetching }] =
        useLazyGetTelSaleGroupsQuery();

    const loading = telSaleTeamsFetching || telSaleGroupsFetching;

    useEffect(() => {
        if (selectedTeam) {
            getTelSaleGroups({ telTeamId: selectedTeam });
        }
    }, [selectedTeam]);

    const team = telSaleTeams?.find((team) => team.id === selectedTeam);

    const enableTeams = telSaleTeams?.reduce(
        (acc, current) => (current.enabled ? [...acc, { label: current.name, value: current.id }] : acc),
        [],
    );
    const disableTeams = telSaleTeams?.reduce(
        (acc, current) => (!current.enabled ? [...acc, { label: `(已停用)${current.name}`, value: current.id }] : acc),
        [],
    );

    const teamOptions = [
        {
            label: '启用',
            options: enableTeams || [],
        },
        {
            label: '已停用',
            options: disableTeams || [],
        },
    ];

    return (
        <Modal
            title="分配团队"
            open={open}
            onCancel={onCancel}
            maskClosable={false}
            closable={false}
            onOk={() => {
                updateUser({
                    // 不帶其他參數無法呼叫
                    id: record.id,
                    collectGroupId: record.collectGroupId,
                    collectTeamId: record.collectTeamId,
                    departmentId: record.departmentId,
                    deptManager: record.deptManager,
                    enabled: record.enabled,
                    googleAuthFlag: record.googleAuthFlag,
                    merchantId: record.merchantId,
                    password: record.password,
                    passwordLogin: record.passwordLogin,
                    phoneNo: record.phoneNo,
                    roleId: record.roleId,
                    trueName: record.trueName,
                    userName: record.userName,
                    telGroupId: selectedGroup,
                    telTeamId: selectedTeam,
                })
                    .unwrap()
                    .then(onModified);
            }}
            okButtonProps={{
                disabled: loading,
                loading: userUpdating,
            }}
            cancelButtonProps={{
                disabled: loading || userUpdating,
            }}
        >
            <Form {...layout}>
                <Item label="姓名">{record.trueName}</Item>
                <Item label="手机号">{record.phoneNo}</Item>
                <Item label="角色">{record.roleStr}</Item>
                <Item label="电销团队">
                    {loading && <Spin />}
                    {!loading && (
                        <Select
                            value={selectedTeam}
                            onSelect={(value) => {
                                setSelectedTeam(value);
                                setSelectedGroup(null);
                            }}
                            onClear={() => {
                                setSelectedTeam(null);
                            }}
                            allowClear
                            options={teamOptions}
                        />
                    )}
                </Item>
                <Item label="电销组别">
                    {loading && <Spin />}
                    {!loading && (
                        <Select
                            value={selectedGroup}
                            onSelect={(value) => {
                                setSelectedGroup(value);
                            }}
                            onClear={() => {
                                setSelectedGroup(null);
                            }}
                            allowClear
                        >
                            {telSaleGroups?.map((group) => (
                                <Select.Option key={group.id} value={group.id}>
                                    {`${!team.enabled ? '(已停用)' : ''}${group.name}`}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                </Item>
            </Form>
        </Modal>
    );
};

export default MemberModifyModal;
