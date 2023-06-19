import React from "react";
import {UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {InformationCard} from "../../../Cards";
import {Descriptions as AntDescriptions } from "antd";

const { Item } = AntDescriptions;

interface IDescriptionsCardProps {
    title: string,
    descriptions: {
        title: string,
        titleTooltip?: React.ReactNode,
        dataIndex: string; // [useQuery 返回的object的key，多層用.區隔]
        render?: (value:any, data: any) => React.ReactElement
    }[],
    hook: UseQuery<any>,
    params: any,
}

export const DescriptionsCard = ({
  title, descriptions, hook, params = {}
}:IDescriptionsCardProps) => {

    const { data, isFetching } = hook(params)

    if(isFetching) return null;

    return (
        <InformationCard title={title}>
            <AntDescriptions size="small" bordered>
                {descriptions.map((part) => {
                    const value = part.dataIndex.split('.').reduce((acc, current) => acc[current], data)

                    return (
                        <Item key={part.dataIndex} label={(part.titleTooltip && <div>{part.title}{part.titleTooltip}</div>) || part.title}>{
                            (part.render && part.render(value, data)) ||
                            value ||
                            '-'}
                        </Item>
                    )
                })}
            </AntDescriptions>
        </InformationCard>
    )
}
