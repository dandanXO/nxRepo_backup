// eslint-disable max-classes-per-file
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {Button, PaginationProps, Space, Switch} from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {GetProductListResponse, Product} from '../../../service/product/ProductApi';
import { ProductFormModal } from "./hooks/useProductFormModal";
import { ProColumnsOperationConstant } from "../../../../shared/components/ProColumnsOperationConstant";
import { getIsSuperAdmin } from '../../../../shared/utils/getUserInfo';
import useGetMerchantEnum from '../../../../shared/hooks/useGetMerchantEnum';
import { GetProductListRequestQuery } from '../../../service/product/request/getProductListRequestQuery';
import { EditableInput } from './EditableInput';
import { NumberValidator } from '../../../../shared/utils/validation/validator';
import { usePatchProductEditMutation } from '../../../service/product/ProductApi';
import CopyText from '../../../../shared/components/CopyText';

interface ProductTableProps {
    setProductModalData: React.Dispatch<React.SetStateAction<ProductFormModal>>;
    triggerGetList?: any;
    productListData?: any;
}

const ProductTable = (props: ProductTableProps) => {
    const isSuperAdmin = getIsSuperAdmin();
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const [patchProduct, { isSuccess: patchProductSuccess }] = usePatchProductEditMutation();
    const [productList, setProductList] = useState<Product[]>(props.productListData);
    const initSearchList: GetProductListRequestQuery = { enabled: true, merchantId: '', productName: '' };
    const [searchList, setSearchList] = useState(initSearchList);

    useEffect(() => {
        setProductList(props.productListData);
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
        }
    }, [props.productListData])


    useEffect(() => {
        props.triggerGetList(searchList)
    }, [searchList, patchProductSuccess])

    const handleEditProductList = (productId, inputValue) => {
        patchProduct({ productId, ...inputValue });
    }

    const columns = useMemo(() => {

        const columns: ProColumns<Product>[] = [
            {
                title: '操作',
                valueType: 'option',
                key: 'option',
                render: (text, record, _, action) => [
                    <a key="editable" onClick={() => props.setProductModalData({
                        show: true,
                        isEdit: true,
                        productId: record.productId,
                    })}>修改</a>,
                ],
                width: ProColumnsOperationConstant.width["1"],
            },
            { key: 'productName', title: '产品名称', dataIndex: 'productName', initialValue: "" ,render: (text) => <CopyText text={text} />},
            { key: 'logo', title: 'Logo', dataIndex: 'logo', valueType: 'image', hideInSearch: true },
            { key: 'loanTerm', title: '期限(天)', dataIndex: 'loanTerm', hideInSearch: true },

            {
                key: 'extensionRate',
                title: '新客/次新客前置利息（%）',
                dataIndex: 'mix-preInterestRate',
                hideInSearch: true,
                render: (text, record) => {
                    return (
                        <div>{Number(Number(record.preInterestRate) * 100).toFixed(1)}/{Number(Number(record.renewPreInterestRate) * 100).toFixed(1)}</div>
                    )
                }
            },
            {
                key: 'overdueRate',
                title: '新客/次新客后置利息（%）',
                dataIndex: 'mix-postInterestRate',
                hideInSearch: true,
                render: (text, record) => {
                    return (
                        <div>{Number(Number(record.postInterestRate) * 100).toFixed(1)}/{Number(Number(record.renewPostInterestRate) * 100).toFixed(1)}</div>
                    )
                }
            },

            { key: 'newGuestProductDisplayStatus', title: '新客优先满足', dataIndex: 'newGuestProductDisplayStatus', hideInSearch: true,
                render: (text, record) => {
                    return <Switch onChange={(checked) => {
                        handleEditProductList(record.productId, {newGuestProductDisplayStatus: checked});
                    }} checkedChildren="是" unCheckedChildren="否" defaultChecked={record.newGuestProductDisplayStatus}/>;
                }},
            {
                key: 'newGuestMaxThreshold', title: '新客订单上限', dataIndex: 'newGuestMaxThreshold', initialValue: "", hideInSearch: true,
                width: ProColumnsOperationConstant.width["4"], render: (text, record) => {
                    return <EditableInput name='newGuestMaxThreshold' placeholder='新客订单上限'
                        initValue={record.newGuestMaxThreshold} productId={record.productId} handleSave={handleEditProductList}
                        rules={{
                            validator: async (_, value) => NumberValidator(_, value)({
                                required: true,
                                requiredErrorMessage: "请输入新客订单上限",
                                min: 0,
                                max: 99999,
                                maxMessage: "不可超过99999",
                            })
                        }}
                    />
                }
            },
            { key: 'renewProductDisplayStatus', title: '次新客优先满足', dataIndex: 'renewProductDisplayStatus', hideInSearch: true,
                render: (text, record) => {
                    return <Switch onChange={(checked) => {
                        handleEditProductList(record.productId, {renewProductDisplayStatus: checked});
                    }} checkedChildren="是" unCheckedChildren="否" defaultChecked={record.renewProductDisplayStatus}/>;
                }
            },
            {
                key: 'renewMaxThreshold', title: '次新客订单上限', dataIndex: 'renewMaxThreshold', initialValue: "", hideInSearch: true,
                width: ProColumnsOperationConstant.width["4"], render: (text, record) => {
                    return <EditableInput name='renewMaxThreshold' placeholder='次新客订单上限'
                        initValue={record.renewMaxThreshold} productId={record.productId} handleSave={handleEditProductList}
                        rules={{
                            validator: async (_, value) => NumberValidator(_, value)({
                                required: true,
                                requiredErrorMessage: "请输入次新客订单上限",
                                min: 0,
                                max: 99999,
                                maxMessage: "不可超过99999",
                            })
                        }}
                    />
                }
            },
            {
                key: 'weight', title: '权重', dataIndex: 'weight', hideInSearch: true, width: ProColumnsOperationConstant.width["2"],
                render: (text, record) => {
                    return <EditableInput name='weight' placeholder='权重'
                        initValue={record.weight} productId={record.productId} handleSave={handleEditProductList}
                        rules={{
                            validator: async (_, value) => NumberValidator(_, value)({
                                min: 0,
                                max: 99,
                                maxMessage: "不可超过99",
                            })
                        }} />
                }
            },
            {
                key: 'enabled', title: '状态', dataIndex: 'enabled', valueType: 'select', initialValue: '', valueEnum: {
                    '': { text: '全部', status: 'Default' },
                    true: { text: '上架', status: 'Success' },
                    false: { text: '下架', status: 'Default' },
                }
            },
            { key: 'updateTime', title: '修改时间', dataIndex: 'updateTime', hideInSearch: true, valueType: 'dateTime' },
        ];
        if (isSuperAdmin) {
            columns.splice(1, 0, {
                title: '商户名', dataIndex: 'merchantId', key: 'merchantId', valueEnum: merchantListEnum, valueType: 'select', initialValue: '',
                width: ProColumnsOperationConstant.width["2"]
            })
        }
        return columns;



    }, [merchantListEnum, isSuperAdmin]);





    const actionRef = useRef<ActionType>();

    // const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    //     console.log(current, pageSize);
    // };

    const [currentPaginationPageSize, setCurrentPaginationPageSize] = useState(10);


    return (
        <ProTable<Product>
            columns={columns}
            actionRef={actionRef}
            dataSource={productList}
            editable={{ type: 'multiple', }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                // onChange(value) {
                //     console.log('value: ', value);
                // },
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button onClick={() => {

                            form.resetFields();
                            setSearchList(initSearchList);
                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                const { productName, enabled, merchantId = '' } = form.getFieldsValue();
                                setSearchList({productName, enabled, merchantId});
                                form.submit();
                            }}
                        >
                            {searchText}
                        </Button>
                    </Space>
                ),
            }}
            options={{
                setting: {
                    listsHeight: 400,
                },
                reload: () => props.triggerGetList(null)
            }}
            form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                // syncToUrl: (values, type) => {
                //   if (type === 'get') {
                //     return {
                //       ...values,
                //       created_at: [values.startTime, values.endTime],
                //     };
                //   }
                //   return values;
                // },
            }}
            pagination={{
                // NOTE: Changing Page Size
                showSizeChanger: true,
                pageSize: currentPaginationPageSize,
                onShowSizeChange: (current, pageSize) => {
                    console.log(current, pageSize);
                    setCurrentPaginationPageSize(pageSize);
                },
                // onChange: (page) => {
                //     console.log("onChange.page", page)
                // },
                // defaultCurrent: 0,
                // total: productList?.length,
                // current: currentPaginationPage,
            }}
            dateFormatter="string"
            headerTitle={
                <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => props.setProductModalData({
                    isEdit: false,
                    show: true,
                })}>添加</Button>
            }
        />
    );
};

export default ProductTable;
