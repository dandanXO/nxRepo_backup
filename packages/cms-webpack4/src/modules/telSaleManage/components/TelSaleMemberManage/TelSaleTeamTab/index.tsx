import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Modal, Switch } from 'antd';
import React, { useEffect } from 'react';

import EditableInput from '../../../../shared/components/Inputs/EditableInput';
import {
    useDeleteTelSaleTeamMutation,
    useLazyGetTelSaleTeamsQuery,
    usePutTelSaleTeamMutation,
} from '../../../api/TelTeamManageApi';
import { TelSaleTeamsItem } from '../../../api/types/getTelSaleTeams';
import AddTeamForm from './AddTeamForm';

const TelSaleTeamTab = (): JSX.Element => {
    const [getTelSaleTeam, { currentData, isFetching }] = useLazyGetTelSaleTeamsQuery();
    const [deleteTelSaleTeam, { isLoading: telSaleTeamDeleting }] = useDeleteTelSaleTeamMutation();
    const [putTelSaleTeam, { isLoading: telSaleTeamPutting }] = usePutTelSaleTeamMutation();

    const [modal, contextHolder] = Modal.useModal();

    useEffect(() => {
        getTelSaleTeam(null);
    }, []);

    const columns: ProColumns<TelSaleTeamsItem>[] = [
        {
            title: '电销团队名称',
            key: 'teamName',
            width: '30%',
            render: (_, record) => (
                <EditableInput
                    originValue={record.name}
                    onDelete={() => {
                        modal.confirm({
                            title: `确认要删除[${record.name}]吗？`,
                            type: 'warn',
                            onOk: () => {
                                deleteTelSaleTeam({ id: record.id })
                                    .unwrap()
                                    .then(() => {
                                        getTelSaleTeam(null);
                                    });
                            },
                        });
                    }}
                    onUpdate={(name) => {
                        putTelSaleTeam({ id: record.id, enabled: record.enabled, name })
                            .unwrap()
                            .then(() => {
                                getTelSaleTeam(null);
                            });
                    }}
                    loading={telSaleTeamDeleting || telSaleTeamPutting}
                />
            ),
        },
        {
            title: '启用',
            key: 'turnOn',
            render: (_, record) => (
                <Switch
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                    defaultChecked={record.enabled}
                    loading={telSaleTeamPutting}
                    onClick={(checked) => {
                        putTelSaleTeam({ id: record.id, name: record.name, enabled: checked })
                            .unwrap()
                            .then(() => {
                                getTelSaleTeam(null);
                            });
                    }}
                />
            ),
        },
    ];

    return (
        <div>
            {contextHolder}
            <AddTeamForm
                onAdd={() => {
                    getTelSaleTeam(null);
                }}
            />
            <ProTable<TelSaleTeamsItem>
                rowKey="id"
                loading={isFetching}
                columns={columns}
                dataSource={currentData}
                search={false}
                toolBarRender={false}
            />
        </div>
    );
};

export default TelSaleTeamTab;
