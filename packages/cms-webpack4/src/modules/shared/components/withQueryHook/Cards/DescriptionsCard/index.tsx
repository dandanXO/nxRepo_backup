import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Descriptions as AntDescriptions } from 'antd';
import React from 'react';

import { InformationCard } from '../../../Cards';

const { Item } = AntDescriptions;

interface IDescriptionsCardProps {
    title: string;
    descriptions: {
        title: string;
        titleTooltip?: React.ReactNode;
        dataIndex: string; // [useQuery 返回的object的key，多層用.區隔]
        render?: (value: any, data: any) => React.ReactElement | string;
    }[];
    hook: UseQuery<any>;
    params: any;
}

export const DescriptionsCard = ({ title, descriptions, hook, params = {} }: IDescriptionsCardProps): JSX.Element => {
    const { data, isFetching } = hook(params);

    if (isFetching) return null;

    return (
        <InformationCard title={title}>
            <AntDescriptions size="small" bordered>
                {descriptions.map((part) => {
                    const value = part.dataIndex.split('.').reduce((acc, current) => acc[current], data);

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
                        >
                            {(part.render && part.render(value, data)) || value || '-'}
                        </Item>
                    );
                })}
            </AntDescriptions>
        </InformationCard>
    );
};
