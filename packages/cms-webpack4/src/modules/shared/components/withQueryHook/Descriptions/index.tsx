import React from "react";
import {UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {useTranslation} from "react-i18next";
import {i18nDescriptions} from "./i18n/translations";
import {InformationCard} from "../../Cards";
import {Descriptions as AntDescriptions } from "antd";

const { Item } = AntDescriptions;

interface IDescriptions {
    titleKey: string,
    descriptions: {
        key: string,
        dataIndex: string; // [useQuery 返回的object的key，多層用.區隔]
        render?: React.FC<any>
    }[],
    hook?: UseQuery<any>,
    params?: any,
}

export const Descriptions = ({
   titleKey, descriptions, hook, params = {}
}:IDescriptions) => {

    const { t } = useTranslation(i18nDescriptions.namespace)
    const { data, isFetching } = hook(params)

    if(isFetching) return null;

    return (
        <InformationCard title={t(titleKey)}>
            <AntDescriptions size="small" bordered>
                {descriptions.map((part) => {
                    return <Item key={part.key} label={t(part.key)}>{data[part.dataIndex] || '-'}</Item>
                })}
            </AntDescriptions>
        </InformationCard>
    )
}
