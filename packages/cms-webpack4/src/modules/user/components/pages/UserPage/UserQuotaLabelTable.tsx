import { ProColumns, ProTable } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField, ProFormRadio } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {
    useLazyGetUserQuotaLabelListQuery,
    usePostUserQuotaLabelMutation,
    usePutUserQuotaLabelMutation,
    useDeleteUserQuotaLabelMutation
} from '../../../api/UserQuotaLabelApi';
import useGetUserQuotaLabelEnum from '../../../../shared/hooks/useGetUserQuotaLabelEnum';
import { Button, Popconfirm, Space } from 'antd';
import { GetUserQuotaLabelListRequestQuerystring, GetUserQuotaLabelListProps, GetUserQuotaLabelListResponse, UserQuotaLabel } from '../../../api/types/userQuotaLabelTypes/getUserQuotaLabelList';
import { NumberValidator } from '../../../../shared/utils/validation/validator';



export default () => {
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<UserQuotaLabel[]>([]);

    const { triggerGetUserQuotaLable, userQuotaLablEnum, userQuotaLablSelect, colorEnum } = useGetUserQuotaLabelEnum();

    const initSearchList: GetUserQuotaLabelListRequestQuerystring = {
        labelId: '', pageSize: 1000, pageNum: 1
    }
    const [searchList, setSearchList] = useState(initSearchList)
    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetUserQuotaLabelListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [AddUserQuotaLabel, { isSuccess: isAddSuccess, isLoading: isAdding, }] = usePostUserQuotaLabelMutation();
    const [EditUserQuotaLabel, { isSuccess: isEditSuccess, isLoading: isEditing, }] = usePutUserQuotaLabelMutation();
    const [deleteUserQuotaLabel, { isSuccess: isDeteleSuccess, isLoading: isDeleting, }] = useDeleteUserQuotaLabelMutation();

    useEffect(() => {
        triggerGetList(searchList);

        // 取得用戶額度標籤下拉選單
        triggerGetUserQuotaLable(null);
    }, [searchList, isAddSuccess, isDeteleSuccess, isEditSuccess])

    useEffect(() => {
        if (currentData !== undefined) {
            setDataSource(currentData.records)
        }
    }, [currentData])

    const columns: ProColumns<UserQuotaLabel>[] = [
        { title: '额度标签', dataIndex: 'id', valueType: 'select', valueEnum: userQuotaLablEnum, hideInTable: true, initialValue: '', fieldProps: { showSearch: true } },
        {
            title: '操作',
            valueType: 'option',
            width: 150,
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => { action?.startEditable?.(record.id) }}>修改</a>,
                <Popconfirm
                    placement="top"
                    title={'删除此行?'}
                    onConfirm={() => {
                        deleteUserQuotaLabel({ id: Number(record.id) });
                        setDataSource(
                            dataSource.filter((item) => item.id !== record.id),
                        );
                    }}
                    okText="确定"
                    cancelText="取消"
                >
                    <a key="delete">删除</a>
                </Popconfirm>,
            ],
        },
        {
            title: '用户额度标签', dataIndex: 'quotaLabel', hideInSearch: true,
            formItemProps: (form, { rowIndex }) => {
                return {
                    rules: [{ required: true, message: '此项为必填项' }]
                };
            },
        },
        {
            title: '标签顏色', key: 'labelColor', dataIndex: 'labelColor', valueType: 'select', valueEnum: colorEnum, hideInSearch: true, initialValue: 'blue',
            formItemProps: (form, { rowIndex }) => {
                return {
                    rules: [{ required: true }]
                };
            },
        },
        {
            title: '可借笔数', dataIndex: 'loanCount', key: 'loanCount', hideInSearch: true,
            formItemProps: (form, { rowIndex }) => {
                return {
                    rules: [
                        {
                            validator: async (_, value) =>
                                NumberValidator(_, value,)({
                                    required: true,
                                    requiredErrorMessage: '请输入可借笔数',
                                    min: 0,
                                    minMessage: '请输入数字',
                                }),
                        },
                    ],
                };
            },
        },
        {
            title: '可借额度', dataIndex: 'loanAmount', key: 'loanAmount', hideInSearch: true,
            formItemProps: (form, { rowIndex }) => {
                return {
                    rules: [
                        {
                            validator: async (_, value) =>
                                NumberValidator(_, value,)({
                                    required: true,
                                    requiredErrorMessage: '请输入可借额度',
                                    min: 0,
                                    minMessage: '请输入数字',
                                }),
                        },
                    ],
                };
            },
        },
    ];

    return (
        <>
            <EditableProTable<UserQuotaLabel>
                rowKey="id"
                recordCreatorProps={{
                    newRecordType: 'dataSource',
                    position: 'bottom',
                    record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                }}
                loading={isFetching}
                search={{
                    labelWidth: 'auto',
                    // @ts-ignore
                    optionRender: ({ searchText, resetText }, { form }) => (
                        <Space>
                            <Button onClick={() => {
                                // @ts-ignore
                                form.setFieldsValue({ ...initSearchList })
                                setSearchList(initSearchList);

                            }}>{resetText}</Button>
                            <Button
                                type={'primary'}
                                onClick={() => {
                                    // @ts-ignore
                                    const { id } = form.getFieldsValue();
                                    setSearchList({ ...searchList, labelId:id, pageNum: 1 })
                                    form.submit();
                                }}
                            >
                                {searchText}
                            </Button>
                        </Space>
                    ),
                }}
                toolBarRender={() => []}
                columns={columns}
                // @ts-ignore
                value={dataSource}
                onChange={setDataSource}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                        const { quotaLabel, labelColor, loanCount, loanAmount } = data;
                        const isEdit = dataSource.some(i => i.id === Number(row.id));
                        const saveQuotaLabel = {
                            quotaLabel,
                            labelColor,
                            loanCount: Number(loanCount),
                            loanAmount: Number(loanAmount)
                        }
                        isEdit ? EditUserQuotaLabel({ id: Number(row.id), ...saveQuotaLabel }) : AddUserQuotaLabel(saveQuotaLabel)
                    },

                    onChange: setEditableRowKeys,
                    actionRender: (row, config, dom) => {
                        const isEdit = dataSource.some(i => i.id === Number(row.id));
                        return isEdit ? [dom.save, dom.delete, dom.cancel] : [dom.save, dom.delete]
                    }
                }}
             
            />
        </>
    );
};
