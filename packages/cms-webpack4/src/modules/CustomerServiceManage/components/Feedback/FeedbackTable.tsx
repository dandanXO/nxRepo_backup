import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

import CopyText from '../../../shared/components/other/CopyText';
import { useLazyGetFeedbackListQuery } from '../../api/FeedbackManageApi';
import { FeedbackListItem } from '../../api/types/getFeedbackList';

const searchFormLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const searchSpan = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 8,
};

export const FeedbackTable = (): JSX.Element => {
    const initDateTime = moment();
    const initSearchParameters = {
        appName: undefined,
        category: undefined,
        name: undefined,
        phoneNo: undefined,
        createTimeBegin: initDateTime.format('YYYY-MM-DD'),
        createTimeEnd: initDateTime.format('YYYY-MM-DD'),
    };
    const [searchParameters, setSearchParameters] = useState(initSearchParameters);

    const [triggerGetList, { currentData, isFetching }] = useLazyGetFeedbackListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    const columns: ProColumns<FeedbackListItem>[] = [
        {
            title: '手机号',
            dataIndex: 'phoneNo',
            width: '14%',
            render: (data) => <CopyText text={data} />,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            width: '14%',
            render: (data) => <CopyText text={data} />,
        },
        {
            title: 'APP名称',
            dataIndex: 'appName',
            width: '14%',
            render: (data) => <CopyText text={data} />,
        },
        {
            title: '问题分类',
            dataIndex: 'category',
            width: '14%',
        },
        {
            title: '用户反馈内容',
            dataIndex: 'feedback',
            width: '30%',
            hideInSearch: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: '14%',
            hideInSearch: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            hideInTable: true,
            valueType: 'dateRange',
            fieldProps: {
                placeholder: ['开始日期', '结束日期'],
                allowClear: false,
            },
            initialValue: [initDateTime, initDateTime],
        },
    ];

    useEffect(() => {
        triggerGetList(searchParameters);
    }, [searchParameters]);

    return (
        <ProTable<FeedbackListItem>
            loading={isFetching}
            columns={columns}
            dataSource={currentData?.records}
            form={{ ...searchFormLayout }}
            options={{
                setting: { listsHeight: 400, draggable: false },
                reload: () => triggerGetList(searchParameters),
            }}
            search={{
                span: searchSpan,
                labelWidth: 'auto',
                optionRender: ({ resetText, searchText }, { form }) => [
                    <Space>
                        <Button
                            onClick={() => {
                                form.setFieldsValue({ ...initSearchParameters });
                                setSearchParameters(initSearchParameters);
                            }}
                        >
                            {resetText}
                        </Button>
                        <Button type="primary" onClick={() => form.submit()}>
                            {searchText}
                        </Button>
                    </Space>,
                ],
            }}
            onSubmit={(params) => {
                const { createTime, ...rest } = params;
                setSearchParameters({
                    ...searchParameters,
                    ...rest,
                    createTimeBegin: createTime[0],
                    createTimeEnd: createTime[1],
                });
            }}
        />
    );
};
