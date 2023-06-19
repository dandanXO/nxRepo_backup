import React from "react";
import {InformationCard} from "../../../Cards";
import {UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {QueryDefinition} from "@reduxjs/toolkit/query";
import {Descriptions} from "antd";
import {ZoomInImage} from "../../../Images";
import {useTranslation} from "react-i18next";

const { Item } = Descriptions

interface IPhotoCardProps {
    title: string,
    rows: string[],
    hook: UseQuery<QueryDefinition<any, any, any, any>>,
    params: any,
    dataSourceKey?: string // 當dataSource包在response的某key時需要帶入
}

export const PhotoCard = ({
                              title, hook, params, dataSourceKey, rows
}: IPhotoCardProps) => {
    const { data, isFetching } = hook(params);
    const { t } = useTranslation();

    if(isFetching) return null;

    const dataSource = dataSourceKey ? data[dataSourceKey]: data

    return(
        <InformationCard title={title}>
            <Descriptions size="small" bordered layout="vertical" column={{ xs: 1, sm: 2, md: 2, lg: 4 }}>
                {
                    rows.map((part) => (
                        <Item key={part} label={t(`user:${part}.${appInfo.COUNTRY}`)}>
                            <ZoomInImage image={dataSource[part]} />
                        </Item>
                    ))
                }
            </Descriptions>
        </InformationCard>
    )
}
