import { ProColumns, ProTable } from '@ant-design/pro-components';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { InformationCard } from '../../../Cards';

interface ISinglePageTableCardProps {
    title?: string;
    columns: ProColumns[];
    rowKey?: string;
    hook: UseQuery<QueryDefinition<any, any, any, any>>;
    params: any;
    dataSourceKey?: string; // 當dataSource包在response的某key時需要帶入
    dataSourcePath?: string; // 當dataSource包在response的某key時需要帶入
}

// 使用useQuery而不是useLazyQuery用的TableCard
export const SinglePageTableCard = ({
    title,
    hook,
    params,
    rowKey,
    columns,
    dataSourcePath,
}: ISinglePageTableCardProps): JSX.Element => {
    const { t } = useTranslation();

    const { data, isFetching } = hook(params);

    const showTotal = (total, range) => {
        const [start, end] = range;
        return t('common:pagination.showingRange', {
            start,
            end,
            total,
        });
    };

    const dataSource = !dataSourcePath
        ? data
        : dataSourcePath.split('.').reduce((acc, current) => acc && acc[current], data);

    return (
        <InformationCard title={title}>
            <ProTable
                bordered
                dataSource={dataSource}
                columns={columns}
                loading={isFetching}
                search={false}
                toolBarRender={false}
                rowKey={rowKey}
                pagination={
                    dataSource?.length <= 10
                        ? false
                        : {
                              showSizeChanger: true,
                              defaultPageSize: 10,
                              locale: {
                                  // eslint-disable-next-line camelcase
                                  items_per_page: t('common:pagination.itemPerPage'),
                              },
                              showTotal,
                          }
                }
            />
        </InformationCard>
    );
};
