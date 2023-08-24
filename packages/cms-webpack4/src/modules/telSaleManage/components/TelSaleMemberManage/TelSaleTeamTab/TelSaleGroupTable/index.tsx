import React from 'react';

import { TelSaleGroupsItem } from '../../../../api/types/getTelSaleTeams';
import AddGroupForm from '../AddGroupForm';

interface ITelSaleGroupTableProps {
    id: number;
    groups: TelSaleGroupsItem[];
}

const TelSaleGroupTable = ({ id }: ITelSaleGroupTableProps): JSX.Element => {
    return (
        <div style={{ padding: '10px 20px' }}>
            <AddGroupForm
                teamId={id}
                onAdd={() => {
                    console.log('GGGG');
                }}
            />
        </div>
    );
};

export default TelSaleGroupTable;
