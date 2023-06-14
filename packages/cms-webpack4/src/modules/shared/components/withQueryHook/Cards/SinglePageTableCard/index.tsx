import React from "react";
import {useTranslation} from "react-i18next";
import {i18nCards} from "../../../i18n/cards/translations";
import {InformationCard} from "../../../Cards";
import {ProTable} from "@ant-design/pro-components";
import {UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {QueryDefinition} from "@reduxjs/toolkit/query";

interface ISinglePageTableCardProps {
    titleKey: string,
    columns: {
        title: string | (() => React.ReactElement),
        key: string,
        dataIndex: string,
        render?: (dom:React.ReactNode, entity: any) => React.ReactElement
    }[],
    rowKey?: string,
    hook: UseQuery<QueryDefinition<any, any, any, any>>,
    params: any,
    dataSourceKey?: string
}

export const SinglePageTableCard = ({
    titleKey, hook, params, rowKey, columns, dataSourceKey
}: ISinglePageTableCardProps) => {
    const { t } = useTranslation((i18nCards.namespace))

    const { data, isFetching } = hook(params);

    return (
        <InformationCard title={t(titleKey)}>
            <ProTable
                bordered
                dataSource={(dataSourceKey?data && data[dataSourceKey]:data)}
                columns={columns}
                loading={isFetching}
                search={false}
                toolBarRender={false}
                pagination={false}
            />
        </InformationCard>
    )
}
