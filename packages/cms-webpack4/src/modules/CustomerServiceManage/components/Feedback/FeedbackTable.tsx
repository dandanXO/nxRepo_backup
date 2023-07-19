import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import moment from 'moment';
import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';

import CopyText from '../../../shared/components/other/CopyText';
import useGetAppNamesEnum from '../../../shared/hooks/useGetAppNamesEnum';
import {
    useGetFeedbackCategoriesQuery,
    useLazyGetFeedbackListQuery,
    usePostFeedbackModifyStatusMutation,
} from '../../api/FeedbackManageApi';
import { FeedbackListItem } from '../../api/types/getFeedbackList';

const searchFormLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
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
        status: undefined,
        createTimeBegin: initDateTime.format('YYYY-MM-DD'),
        createTimeEnd: initDateTime.format('YYYY-MM-DD'),
        pageNum: 1,
        pageSize: 10,
    };
    const [searchParameters, setSearchParameters] = useState(initSearchParameters);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const { data: feedbackCategories } = useGetFeedbackCategoriesQuery(null);

    const feedbackCategoriesEnum = feedbackCategories?.reduce((acc, current) => {
        acc.set(current.key, { text: current.displayName });
        return acc;
    }, new Map().set('', { text: '不限' }));

    const { triggerGetAppNames, appNamesEnum } = useGetAppNamesEnum();

    const [triggerGetList, { currentData, isFetching }] = useLazyGetFeedbackListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });
    const [postFeedbackModifyStatus, { isLoading }] = usePostFeedbackModifyStatusMutation();
    const [messageApi, contextHolder] = message.useMessage();

    const formRef = useRef<ProFormInstance>();

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
            width: '10%',
            valueType: 'select',
            valueEnum: appNamesEnum,
            fieldProps: { showSearch: true, allowClear: false },
            render: (data) => <CopyText text={data} />,
        },
        {
            title: '狀態',
            dataIndex: 'read',
            width: '5%',
            hideInSearch: true,
            render: (data) => <div style={{ color: `${data ? 'black' : '#1d8bf5'}` }}>{data ? '已读' : '未读'}</div>,
        },
        {
            title: '狀態',
            dataIndex: 'status',
            hideInTable: true,
            valueType: 'select',
            fieldProps: {
                allowClear: false,
                options: [
                    {
                        label: '不限',
                        value: '',
                    },
                    {
                        label: '未读',
                        value: false,
                    },
                    {
                        label: '已读',
                        value: true,
                    },
                ],
            },
        },
        {
            title: '问题分类',
            dataIndex: 'category',
            width: '14%',
            valueType: 'select',
            valueEnum: feedbackCategoriesEnum,
            fieldProps: { allowClear: false },
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
            render: (data) => moment(data.toString()).format('YYYY-MM-DD hh:mm:ss'),
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

    const pageOnChange = (current, pageSize) => {
        setSearchParameters({ ...searchParameters, pageNum: current, pageSize: pageSize });
    };

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const onClickChangeStatus = (status: boolean) => {
        postFeedbackModifyStatus({
            id: selectedRowKeys,
            read: status,
        })
            .unwrap()
            .then(() => {
                messageApi.success({
                    content: '已更新',
                });
                setSelectedRowKeys([]);
                triggerGetList(searchParameters);
            });
    };

    const handleExport = () => {
        const { createTime, ...rest } = formRef.current.getFieldsFormatValue();
        const searchQueryString = queryString.stringify({
            ...rest,
            createTimeBegin: createTime[0],
            createTimeEnd: createTime[1],
        });
        window.open(`hs/admin/feedback/download?${searchQueryString}`);
        setSearchParameters({
            ...rest,
            createTimeBegin: createTime[0],
            createTimeEnd: createTime[1],
        });
    };

    useEffect(() => {
        triggerGetList(searchParameters);
    }, [searchParameters]);

    useEffect(() => {
        triggerGetAppNames(null);
    }, []);

    return (
        <div>
            {contextHolder}
            <ProTable<FeedbackListItem>
                formRef={formRef}
                loading={isFetching || isLoading}
                rowKey={({ id }) => id}
                columns={columns}
                dataSource={currentData?.records}
                form={{ ...searchFormLayout }}
                headerTitle={
                    <Space>
                        <Button
                            type="primary"
                            ghost
                            disabled={selectedRowKeys.length === 0 || isLoading}
                            onClick={() => onClickChangeStatus(false)}
                        >
                            全部未读
                        </Button>
                        <Button
                            type="primary"
                            ghost
                            disabled={selectedRowKeys.length === 0 || isLoading}
                            onClick={() => onClickChangeStatus(true)}
                        >
                            全部已读
                        </Button>
                    </Space>
                }
                toolBarRender={() => [
                    <Button type="primary" onClick={handleExport}>
                        导出
                    </Button>,
                ]}
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
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 10,
                    onChange: pageOnChange,
                    total: currentData?.totalRecords,
                    current: currentData?.currentPage,
                }}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
            />
        </div>
    );
};
