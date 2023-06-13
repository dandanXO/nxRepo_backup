import React from "react";
import {UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {useTranslation} from "react-i18next";
import {i18nDescriptionsCard} from "./i18n/translations";
import {InformationCard} from "../../Cards";
import {Descriptions as AntDescriptions } from "antd";

const { Item } = AntDescriptions;

interface IDescriptionsCardProps {
    titleKey: string,
    descriptions: {
        key: string,
        dataIndex: string; // [useQuery 返回的object的key，多層用.區隔]
        render?: (value:any, data: any) => React.ReactElement
    }[],
    hook?: UseQuery<any>,
    params?: any,
}

export const DescriptionsCard = ({
   titleKey, descriptions, hook, params = {}
}:IDescriptionsCardProps) => {

    const { t } = useTranslation(i18nDescriptionsCard.namespace)
    const { data, isFetching } = hook(params)

    if(isFetching) return null;

    return (
        <InformationCard title={t(titleKey)}>
            <AntDescriptions size="small" bordered>
                {descriptions.map((part) => {

                    return (
                        <Item key={part.key} label={t(part.key)}>{
                            (part.render && part.render(data[part.dataIndex], data)) ||
                            data[part.dataIndex] ||
                            '-'}
                        </Item>
                    )
                })}
            </AntDescriptions>
        </InformationCard>
    )
}
