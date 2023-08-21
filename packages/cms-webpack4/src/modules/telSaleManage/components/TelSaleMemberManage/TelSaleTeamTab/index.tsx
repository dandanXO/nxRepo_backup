import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Switch } from 'antd';
import React, { useEffect } from 'react';

import EditableInput from '../../../../shared/components/Inputs/EditableInput';
import { useLazyGetTelSaleTeamsQuery } from '../../../api/TelTeamManageApi';
import { TelSaleTeamsItem } from '../../../api/types/getTelSaleTeams';
import AddTeamForm from './AddTeamForm';

const TelSaleTeamTab = (): JSX.Element => {
    const [getTelSaleTeam, { currentData, isFetching }] = useLazyGetTelSaleTeamsQuery();

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
                        console.log('delete');
                    }}
                    onUpdate={(name) => {
                        console.log('update');
                        console.log(name);
                    }}
                />
            ),
        },
        {
            title: '启用',
            key: 'turnOn',
            render: (_, record) => (
                <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={record.enabled} />
            ),
        },
    ];

    return (
        <div>
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
