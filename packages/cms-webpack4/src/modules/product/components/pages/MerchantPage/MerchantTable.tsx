import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useLazyGetMerchantManageListQuery } from "../../../service/merchant/MerchantApi";
import { GetMerchantListResponse } from "../../../service/merchant/getMerchantList";
import { ProColumnsOperationConstant } from "../../../../shared/components/common/ProColumnsOperationConstant";

interface MerchantTableProps {
    postMerchantSuccess?: boolean;
    putMerchantSuccess?: boolean;
    setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    setMerchantModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    form?: any;
}

const MerchantTable = ({
    postMerchantSuccess,
    putMerchantSuccess,
    setIsEdit,
    setMerchantModalVisible,
    form
}: MerchantTableProps
): JSX.Element => {

    const [triggerGetList, { currentData, isFetching }] = useLazyGetMerchantManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [merchantList, setMerchantList] = useState<GetMerchantListResponse[]>(currentData);

    useEffect(() => {
        triggerGetList(null);
        setMerchantModalVisible(false);
    }, [putMerchantSuccess, postMerchantSuccess]);


    useEffect(() => {
        setMerchantList(currentData);
    }, [currentData]);

    const columns: ProColumns<GetMerchantListResponse>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record) => [
                <a key="editable" onClick={() => {
                    setIsEdit(true);
                    setMerchantModalVisible(true);
                    form.setFieldsValue(record);
                }}>修改</a>,
            ],
            width: ProColumnsOperationConstant.width["1"],
        },
        { title: '商户编号', dataIndex: 'merchantId', key: 'merchantId', hideInSearch: true },
        { title: '商户名', dataIndex: 'name', key: 'name', initialValue: "" },
        { title: '联系电话', dataIndex: 'contact', key: 'contact', initialValue: "" },
        { title: '电子邮箱', dataIndex: 'email', key: 'email', hideInSearch: true },
        {
            title: '状态', dataIndex: 'enabled', valueType: 'select', initialValue: 'all', key: 'enabled', valueEnum: {
                all: { text: '全部', status: 'Default' },
                true: { text: '启用', status: 'Success' },
                false: { text: '禁用', status: 'Default', },
            },
            width: 80,
        },
        { title: '创建时间', dataIndex: 'createTime', hideInSearch: true, key: 'createTime', valueType: 'dateTime' },
        { title: '更新時間', dataIndex: 'updateTime', hideInSearch: true, key: 'updateTime', valueType: 'dateTime' },

    ];


    return (

        <ProTable<GetMerchantListResponse>
            columns={columns}
            dataSource={merchantList}
            loading={isFetching}
            rowKey="id"
            headerTitle={<Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => {
                setMerchantModalVisible(true);
                setIsEdit(false);
            }}>添加</Button>}
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button onClick={() => {
                            form.resetFields();
                            setMerchantList(currentData);

                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { name, contact, enabled } = form.getFieldValue();
                                const searchData = currentData
                                    .filter(i => name === "" ? i : i.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
                                    .filter(i => contact === "" ? i : i.contact.indexOf(contact) > -1)
                                    .filter(i => enabled === "all" ? i : i.enabled.toString() === enabled);
                                setMerchantList(searchData);
                                form.submit();
                            }}
                        >
                            {searchText}
                        </Button>
                    </Space>
                ),
            }}
            options={{
                setting: { listsHeight: 400, },
                reload: () => triggerGetList(null)
            }}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10
            }}
        />

    );
};

export default MerchantTable;

