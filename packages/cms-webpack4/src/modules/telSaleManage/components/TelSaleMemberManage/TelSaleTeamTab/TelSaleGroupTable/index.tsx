import { Modal, Spin } from 'antd';
import React from 'react';

import EditableInput from '../../../../../shared/components/Inputs/EditableInput';
import {
    useDeleteTelSaleGroupMutation,
    useLazyGetTelSaleGroupsQuery,
    usePutTelSaleGroupMutation,
} from '../../../../api/TelTeamManageApi';
import { TelSaleGroupsItem } from '../../../../api/types/getTelSaleTeams';
import AddGroupForm from '../AddGroupForm';

interface ITelSaleGroupTableProps {
    telTeamId: number;
    groups: TelSaleGroupsItem[];
}

const TelSaleGroupTable = ({ telTeamId, groups }: ITelSaleGroupTableProps): JSX.Element => {
    const [getTelSaleGroups, { currentData, isFetching }] = useLazyGetTelSaleGroupsQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    const [deleteTelSaleGroup, { isLoading: telSaleGroupDeleting }] = useDeleteTelSaleGroupMutation();
    const [putTelSaleGroup, { isLoading: telSaleGroupPutting }] = usePutTelSaleGroupMutation();

    const [modal, contextHolder] = Modal.useModal();

    const data = currentData || groups;

    return (
        <div style={{ margin: '10px 20px', padding: '20px', backgroundColor: 'white' }}>
            {contextHolder}
            <AddGroupForm
                teamId={telTeamId}
                onAdd={() => {
                    getTelSaleGroups({ telTeamId });
                }}
            />
            {!isFetching && data.length !== 0 && (
                <div style={{ width: '40%', padding: '10px', border: '1px solid lightgrey', borderBottom: 'none' }}>
                    电销组别名称
                </div>
            )}
            {!isFetching &&
                data.map((group, index) => (
                    <div
                        key={group.id}
                        style={{
                            width: '40%',
                            padding: '10px',
                            border: '1px solid lightgrey',
                            borderBottom: `${index !== data.length - 1 && 'none'}`,
                        }}
                    >
                        <EditableInput
                            originValue={group.name}
                            onDelete={() => {
                                modal.confirm({
                                    title: `确认要删除[${group.name}]吗？`,
                                    type: 'warn',
                                    onOk: () => {
                                        deleteTelSaleGroup({ id: group.id })
                                            .unwrap()
                                            .then(() => {
                                                getTelSaleGroups({ telTeamId });
                                            });
                                    },
                                });
                            }}
                            onUpdate={(name) => {
                                putTelSaleGroup({ id: group.id, name, telTeamId })
                                    .unwrap()
                                    .then(() => {
                                        getTelSaleGroups({ telTeamId });
                                    });
                            }}
                            loading={telSaleGroupDeleting || telSaleGroupPutting}
                        />
                    </div>
                ))}
            {isFetching && <Spin />}
        </div>
    );
};

export default TelSaleGroupTable;
