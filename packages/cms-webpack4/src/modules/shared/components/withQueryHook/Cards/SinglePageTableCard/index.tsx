import { ProTable } from '@ant-design/pro-components';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import React from 'react';

import { InformationCard } from '../../../Cards';

interface ISinglePageTableCardProps {
    title: string;
    columns: {
        title: string | (() => React.ReactElement);
        key: string;
        dataIndex: string;
        render?: (dom: React.ReactNode, entity: any) => React.ReactElement;
    }[];
    rowKey?: string;
    hook: UseQuery<QueryDefinition<any, any, any, any>>;
    params: any;
    dataSourceKey?: string; // 當dataSource包在response的某key時需要帶入
}

export const SinglePageTableCard = ({
    title,
    hook,
    params,
    rowKey,
    columns,
    dataSourceKey,
}: ISinglePageTableCardProps): JSX.Element => {
    const { data, isFetching } = hook(params);

    return (
        <InformationCard title={title}>
            <ProTable
                bordered
                dataSource={dataSourceKey ? data && data[dataSourceKey] : data}
                columns={columns}
                loading={isFetching}
                search={false}
                toolBarRender={false}
                pagination={false}
                rowKey={rowKey}
            />
        </InformationCard>
    );
};
