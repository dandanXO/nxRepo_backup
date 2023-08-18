import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Space, Switch } from 'antd';
import React from 'react';

import EditableInput from '../../../../shared/components/Inputs/EditableInput';
import AddTeamForm from './AddTeamForm';

const TelSaleTeamTab = (): JSX.Element => {
    const columns: ProColumns[] = [
        {
            title: '电销团队名称',
            key: 'teamName',
            width: '20%',
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
    const data = [
        {
            id: '001',
            enabled: true,
            name: '新客',
        },
        {
            id: '002',
            enabled: false,
            name: '老客',
        },
    ];

    return (
        <div>
            <AddTeamForm
                onAdd={(teamName) => {
                    console.log(teamName);
                }}
            />
            <ProTable rowKey="id" columns={columns} dataSource={data} search={false} toolBarRender={false} />
        </div>
    );
};

export default TelSaleTeamTab;
