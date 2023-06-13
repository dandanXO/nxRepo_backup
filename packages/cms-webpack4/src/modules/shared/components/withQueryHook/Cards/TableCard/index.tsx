import React from "react";
import {useTranslation} from "react-i18next";
import {i18nCards} from "../../../i18n/cards/translations";
import {InformationCard} from "../../../Cards";
import {ProTable} from "@ant-design/pro-components";
import {UseLazyQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";

interface ITableCardProps {
    titleKey: string,
    columns: {
        key: string,
        dataIndex: string,
        render?: (value:any, columnData: any) => React.ReactElement
    }[],
    hook: UseLazyQuery<any>
}

export const TableCard = ({
    titleKey,
}: ITableCardProps) => {
    const { t } = useTranslation(i18nCards.namespace)

    return (
        <InformationCard title={t(titleKey)}>
            <ProTable
                search={false}
                toolBarRender={false}
            />
        </InformationCard>
    )
}
