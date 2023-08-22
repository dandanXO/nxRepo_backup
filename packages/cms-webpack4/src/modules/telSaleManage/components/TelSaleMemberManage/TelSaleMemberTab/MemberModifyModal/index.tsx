import { Form, Modal, Select, Spin } from 'antd';
import React, { useState } from 'react';

import { useUpdateUserMutation } from '../../../../../shared/api/UsersApi';
import { UsersItem } from '../../../../../shared/api/types/user/getUsers';
import { useGetTelSaleTeamsQuery } from '../../../../api/TelTeamManageApi';

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
    const [updateUser, { isLoading: userUpdating }] = useUpdateUserMutation();
    const { currentData, isFetching } = useGetTelSaleTeamsQuery(null);

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
                    telGroupId: record.telGroupId,
                    telTeamId: selectedTeam,
                })
                    .unwrap()
                    .then(onModified);
            }}
            okButtonProps={{
                disabled: isFetching,
                loading: userUpdating,
            }}
            cancelButtonProps={{
                disabled: isFetching || userUpdating,
            }}
        >
            <Form {...layout}>
                <Item label="姓名">{record.trueName}</Item>
                <Item label="手机号">{record.phoneNo}</Item>
                <Item label="角色">{record.roleStr}</Item>
                <Item label="电销团队">
                    {isFetching && <Spin />}
                    {!isFetching && (
                        <Select
                            value={selectedTeam}
                            onSelect={(value) => {
                                setSelectedTeam(value);
                            }}
                            onClear={() => {
                                setSelectedTeam(null);
                            }}
                            allowClear
                        >
                            {currentData.map((team) => (
                                <Select.Option key={team.id} value={team.id}>
                                    {team.name}
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
