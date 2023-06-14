import React from "react";
import {InformationCard} from "../../../Cards";
import {useTranslation} from "react-i18next";
import {i18nCards} from "../../../i18n/cards/translations";
import {UseQuery} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {QueryDefinition} from "@reduxjs/toolkit/query";
import {Descriptions} from "antd";
import {WaterMark} from "@ant-design/pro-components";
import {ZoomInImage} from "../../../Images";

const { Item } = Descriptions

interface IPhotoCardProps {
    titleKey: string,
    rows: string[],
    hook: UseQuery<QueryDefinition<any, any, any, any>>,
    params: any,
    dataSourceKey?: string // 當dataSource包在response的某key時需要帶入
}

export const PhotoCard = ({
    titleKey, hook, params, dataSourceKey, rows
}: IPhotoCardProps) => {
    const { t } = useTranslation(i18nCards.namespace);
    const { data, isFetching } = hook(params);

    if(isFetching) return null;

    const dataSource = dataSourceKey ? data[dataSourceKey]: data

    return(
        <InformationCard title={t(titleKey)}>
            <Descriptions size="small" bordered layout="vertical" column={{ xs: 1, sm: 2, md: 2, lg: 4 }}>
                {
                    rows.map((part) => (
                        <Item key={part} label={t(`${part}.${appInfo.COUNTRY}`)}>
                            <ZoomInImage image={dataSource[part]} />
                        </Item>
                    ))
                }
            </Descriptions>
        </InformationCard>
    )
}
