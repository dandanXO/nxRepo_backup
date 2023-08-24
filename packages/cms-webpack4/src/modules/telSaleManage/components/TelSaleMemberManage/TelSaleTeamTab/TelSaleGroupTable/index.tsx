import { ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useState } from 'react';

import { useLazyGetTelSaleGroupsQuery } from '../../../../api/TelTeamManageApi';
import { TelSaleGroupsItem } from '../../../../api/types/getTelSaleTeams';
import AddGroupForm from '../AddGroupForm';

interface ITelSaleGroupTableProps {
    id: number;
    groups: TelSaleGroupsItem[];
}

const TelSaleGroupTable = ({ id, groups }: ITelSaleGroupTableProps): JSX.Element => {
    const [telSaleGroup, setTelSaleGroup] = useState<TelSaleGroupsItem[]>(groups);
    const [getTelSaleGroups, { currentData, isFetching }] = useLazyGetTelSaleGroupsQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    const columns: ProColumns<TelSaleGroupsItem>[] = [
        {
            title: '电销组别名称',
            dataIndex: 'name',
        },
    ];

    return (
        <div style={{ margin: '10px 20px', padding: '20px', backgroundColor: 'white' }}>
            <AddGroupForm
                teamId={id}
                onAdd={() => {
                    getTelSaleGroups({ telTeamId: id });
                }}
            />
            <div style={{ padding: '10px', border: '1px solid lightgrey', borderBottom: 'none' }}>电销组别名称</div>
            {(currentData || groups).map((group, index) => (
                <div
                    key={group.id}
                    style={{
                        padding: '10px',
                        border: '1px solid lightgrey',
                        borderBottom: `${index !== (currentData || groups).length - 1 && 'none'}`,
                    }}
                >
                    {group.name}
                </div>
            ))}
        </div>
    );
};

export default TelSaleGroupTable;
