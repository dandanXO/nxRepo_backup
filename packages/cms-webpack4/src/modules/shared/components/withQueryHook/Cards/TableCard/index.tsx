import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {i18nCards} from "../../../i18n/cards/translations";
import {InformationCard} from "../../../Cards";
import {ProTable} from "@ant-design/pro-components";
import {UseLazyQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {QueryDefinition} from "@reduxjs/toolkit/query";

interface ITableCardProps {
    titleKey?: string,
    columns: {
        title: string | (() => React.ReactElement),
        key: string,
        dataIndex: string,
        render?: (dom:React.ReactNode, entity: any) => React.ReactElement
    }[],
    rowKey?: string,
    hook: UseLazyQuery<QueryDefinition<any, any, any, any>>,
    queryBody: any,
}

export const TableCard = ({
    titleKey, hook, queryBody, rowKey, columns
}: ITableCardProps) => {
    const [searchParams, setSearchParams] = useState({pageNum: 1, pageSize: 10})
    const { t } = useTranslation(i18nCards.namespace)

    const [triggerGetList, { currentData, isFetching }] = hook({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const pageOnChange = (current, pageSize) => {
        setSearchParams({ pageNum: current, pageSize: pageSize })
    }

    const showTotal = ( total, range) => {
        const [start, end] = range
        return t('pagination.showingRange', {
            start,
            end,
            total
        })
    }

    useEffect(() => {
        triggerGetList({...queryBody, ...searchParams})
    }, [searchParams])

    return (
        <InformationCard title={t(titleKey)}>
            <ProTable
                bordered
                loading={isFetching}
                dataSource={currentData?.records}
                columns={columns}
                search={false}
                toolBarRender={false}
                rowKey={rowKey}
                pagination={currentData?.totalRecords < 10 ? false: {
                    showSizeChanger: true,
                    defaultPageSize: 10,
                    onChange: pageOnChange,
                    total: currentData?.totalRecords,
                    current: currentData?.records?.length === 0 ? 0 : currentData?.currentPage,
                    locale: {
                        items_per_page: t('pagination.itemPerPage')
                    },
                    showTotal,
                }}
            />
        </InformationCard>
    )
}
