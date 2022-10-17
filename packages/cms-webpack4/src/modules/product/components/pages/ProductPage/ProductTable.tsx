// eslint-disable max-classes-per-file
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Space} from 'antd';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {GetProductListResponseProduct} from "../../../api/types/getProductList";
import {ProductFormModal} from "../../../hooks/useProductFormModal";

interface ProductTableProps {
  setProductModalData: React.Dispatch<React.SetStateAction<ProductFormModal>>;
  triggerGetList?: any;
  productListData?: any;
}

const ProductTable = (props: ProductTableProps) => {
    const [productList, setProductList] = useState<GetProductListResponseProduct[]>(props.productListData);

    useEffect(()=>{
        setProductList(props.productListData)
    },[props.productListData])

    const columns = useMemo(() => {

      const columns: ProColumns<GetProductListResponseProduct>[] = [
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
        },
        { key: 'productName', title: '產品名稱', dataIndex: 'productName', initialValue: "" },
        { key: 'logo', title: 'Logo', dataIndex: 'logo', valueType: 'image', hideInSearch: true },
        { key: 'loanTerm', title: '期限(天)', dataIndex: 'loanTerm', hideInSearch: true },
        { key: 'extensionRate', title: '展期利率(%)', dataIndex: 'extensionRate', hideInSearch: true, render: (text) => Number(Number(text) * 100).toFixed(1) },
        { key: 'overdueRate', title: '逾期費率(%)', dataIndex: 'overdueRate', hideInSearch: true , render: (text) => Number(Number(text) * 100).toFixed(1) },
        { key: 'weight', title: '權重', dataIndex: 'weight', hideInSearch: true },
        {
            key: 'enabled',
            title: '狀態', dataIndex: 'enabled', valueType: 'select', initialValue: 'all', valueEnum: {
            all: { text: '全部', status: 'Default' },
            true: { text: '上架', status: 'Success' },
            false: { text: '下架', status: 'Default' },
          }
        },
        { key: 'updateTime', title: '修改時間', dataIndex: 'updateTime', hideInSearch: true, valueType: 'dateTime' },
      ];
      return columns;

    }, []);
    const actionRef = useRef<ActionType>();



    return (
        <ProTable<GetProductListResponseProduct>
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
                collapsed: false,
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button onClick={() => {

                            form.resetFields();
                            setProductList(props.productListData)

                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                const { productName, enabled } = form.getFieldsValue();
                                const searchData = props.productListData
                                    .filter(i => productName === "" ? i :  i.productName.toLowerCase().indexOf(productName.toLowerCase()) > -1)
                                    .filter(i => enabled === "all" ? i : i.enabled.toString() === enabled);
                                setProductList(searchData)
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
                reload:()=>props.triggerGetList(null)
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
                pageSize: 10,
                showSizeChanger: true,
                onChange: (page) => console.log(page),
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
