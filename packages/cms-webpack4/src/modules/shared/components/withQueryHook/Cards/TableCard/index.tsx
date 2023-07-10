import { ProColumns, ProTable } from '@ant-design/pro-components';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InformationCard } from '../../../Cards';

interface ITableCardProps {
    title?: string;
    columns: ProColumns[];
    rowKey?: string;
    hook: UseLazyQuery<QueryDefinition<any, any, any, any>>;
    queryBody: any;
    hasTotalRecords?: boolean;
    dataSourcePath?: string;
    totalRecordsPath?: string;
}

export const TableCard = ({
    title,
    hook,
    queryBody,
    rowKey,
    columns,
    dataSourcePath,
    totalRecordsPath,
    hasTotalRecords = true,
}: ITableCardProps): JSX.Element => {
    const [searchParams, setSearchParams] = useState({ pageNum: 1, pageSize: 10 });
    const { t } = useTranslation();

    const [triggerGetList, { currentData, isFetching }] = hook({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    const pageOnChange = (current, pageSize) => {
        setSearchParams({ pageNum: current, pageSize: pageSize });
    };

    const dataSource = !dataSourcePath
        ? currentData?.records
        : dataSourcePath.split('.').reduce((acc, current) => acc && acc[current], currentData);

    const totalRecords = !hasTotalRecords
        ? dataSource?.length
        : !totalRecordsPath
        ? currentData?.totalRecords
        : totalRecordsPath.split('.').reduce((acc, current) => acc && acc[current], currentData);

    const showTotal = (total, range) => {
        const [start, end] = range;
        return t('common:pagination.showingRange', {
            start,
            end,
            total,
        });
    };

    useEffect(() => {
        triggerGetList({ ...queryBody, ...searchParams });
    }, [searchParams]);

    return (
        <InformationCard title={title}>
            <ProTable
                bordered
                loading={isFetching}
                dataSource={dataSource}
                columns={columns}
                search={false}
                toolBarRender={false}
                rowKey={rowKey}
                pagination={
                    totalRecords < 10
                        ? false
                        : {
                              showSizeChanger: true,
                              defaultPageSize: 10,
                              onChange: hasTotalRecords ? pageOnChange : undefined,
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
