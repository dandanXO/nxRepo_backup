import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import { useGetProductManageListQuery, useLazyGetProductManageListQuery } from "../../api";
import { GetProductListResponse } from "../../types/getProductList";
const columns: ProColumns<GetProductListResponse>[] = [
    {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            <a key="editable" onClick={() => { action?.startEditable?.(record.productId) }}>修改</a>,
        ],
    },
    { title: '產品名稱', dataIndex: 'productName' },
    { title: 'Logo', dataIndex: 'logo', hideInSearch: true },
    { title: '展期利率(%)', dataIndex: 'extensionRate', hideInSearch: true },
    { title: '逾期費率(%)', dataIndex: 'overdueRate', hideInSearch: true },
    { title: '權重', dataIndex: 'weight', hideInSearch: true },
    {
        title: '狀態', dataIndex: 'enabled', valueType: 'select', valueEnum: {
            enable: { text: '啟用', status: 'Success' },
            disable: { text: '禁用', status: 'Default', },
        }
    },
    { title: '修改時間', dataIndex: 'createTime', hideInSearch: true },
];


const demoTable = () => {
    const { currentData, isLoading, isFetching } = useGetProductManageListQuery({});
    console.log(currentData);


    const actionRef = useRef<ActionType>();
    return (
        <ProTable<GetProductListResponse>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params = {}, sort, filter) => {
                console.log(sort, filter);
                return request<{
                    data: GithubIssueItem[];
                }>('https://proapi.azurewebsites.net/github/issues', {
                    params,
                });
            }}

            editable={{ type: 'multiple', }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                onChange(value) {
                    console.log('value: ', value);
                },
            }}
            rowKey="id"
            search={{ labelWidth: 'auto',}}
            options={{
                setting: {
                    listsHeight: 400,
                },
            }}
            form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                    if (type === 'get') {
                        return {
                            ...values,
                            created_at: [values.startTime, values.endTime],
                        };
                    }
                    return values;
                },
            }}
            pagination={{
                pageSize: 10,
                onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle={<Button key="button" icon={<PlusOutlined />} type="primary">新建</Button>}
        />
    );
};
export default demoTable;
