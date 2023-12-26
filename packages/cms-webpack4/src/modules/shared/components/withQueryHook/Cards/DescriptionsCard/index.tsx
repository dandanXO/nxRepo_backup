import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Descriptions as AntDescriptions } from 'antd';
import React from 'react';

import { InformationCard } from '../../../Cards';

const { Item } = AntDescriptions;

export type DescriptionsCardDescriptions = {
    title: string;
    titleTooltip?: React.ReactNode;
    span?: number;
    labelStyle?: React.CSSProperties;
    dataIndex: string; // [useQuery 返回的object的key，多層用.區隔]
    render?: (value: any, data: any) => React.ReactElement | string;
};

interface IDescriptionsCardProps {
    title: string;
    descriptions: DescriptionsCardDescriptions[];
    hook: UseQuery<any>;
    params: any;
    column?: number;
}

export const DescriptionsCard = ({
    title,
    descriptions,
    hook,
    column,
    params = {},
}: IDescriptionsCardProps): JSX.Element => {
    const { data, isFetching } = hook(params);

    if (isFetching) return null;

    return (
        <InformationCard title={title}>
            <AntDescriptions size="small" bordered column={column}>
                {descriptions.map((part) => {
                    const value = part.dataIndex.split('.').reduce((acc, current) => (acc ? acc[current] : null), data);

                    return (
                        <Item
                            key={part.dataIndex}
                            label={
                                (part.titleTooltip && (
                                    <div>
                                        {part.title}
                                        {part.titleTooltip}
                                    </div>
                                )) ||
                                part.title
                            }
                            span={part.span}
                            labelStyle={part.labelStyle}
                        >
                            {(part.render && part.render(value, data)) || value || '-'}
                        </Item>
                    );
                })}
            </AntDescriptions>
        </InformationCard>
    );
};
