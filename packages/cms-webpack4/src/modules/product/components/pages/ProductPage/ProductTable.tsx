// eslint-disable max-classes-per-file
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, PaginationProps, Space} from 'antd';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {GetProductListResponseProduct} from "../../../service/product/domain/getProductList";
import {ProductFormModal} from "./hooks/useProductFormModal";
import {ProColumnsOperationConstant} from "../../../../shared/components/ProColumnsOperationConstant";
import { getIsSuperAdmin } from '../../../../shared/utils/getUserInfo';
import useGetMerchantEnum from '../../../../shared/hooks/useGetMerchantEnum';
interface ProductTableProps {
  setProductModalData: React.Dispatch<React.SetStateAction<ProductFormModal>>;
  triggerGetList?: any;
  productListData?: any;
}

const ProductTable = (props: ProductTableProps) => {
    const isSuperAdmin = getIsSuperAdmin();
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const [productList, setProductList] = useState<GetProductListResponseProduct[]>(props.productListData);

    useEffect(()=>{
        setProductList(props.productListData);
        if(isSuperAdmin){
            triggerGetMerchantList(null);
        }
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
            width: ProColumnsOperationConstant.width["1"],
        },
        { key: 'productName', title: '产品名称', dataIndex: 'productName', initialValue: "" },
        { key: 'logo', title: 'Logo', dataIndex: 'logo', valueType: 'image', hideInSearch: true },
        { key: 'loanTerm', title: '期限(天)', dataIndex: 'loanTerm', hideInSearch: true },
        { key: 'extensionRate', title: '展期利率(%)', dataIndex: 'extensionRate', hideInSearch: true, render: (text) => Number(Number(text) * 100).toFixed(1) },
        { key: 'overdueRate', title: '逾期费率(%)', dataIndex: 'overdueRate', hideInSearch: true , render: (text) => Number(Number(text) * 100).toFixed(1) },
        { key: 'weight', title: '权重', dataIndex: 'weight', hideInSearch: true },
        {
            key: 'enabled',title: '状态', dataIndex: 'enabled', valueType: 'select', initialValue: 'all', valueEnum: {
            all: { text: '全部', status: 'Default' },
            true: { text: '上架', status: 'Success' },
            false: { text: '下架', status: 'Default' },
          }
        },
        { key: 'updateTime', title: '修改时间', dataIndex: 'updateTime', hideInSearch: true, valueType: 'dateTime' },
      ];
    //   if(isSuperAdmin){
    //     columns.splice(1,0,{
    //         title: '商户名', dataIndex: 'merchantId',  key: 'merchantId',  valueEnum: merchantListEnum, valueType: 'select', initialValue: '',
    //         width: ProColumnsOperationConstant.width["2"],
    //     })
    //   }
      return columns;

     

    }, [merchantListEnum,isSuperAdmin]);





    const actionRef = useRef<ActionType>();

    // const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    //     console.log(current, pageSize);
    // };

    const [currentPaginationPageSize, setCurrentPaginationPageSize] = useState(10);


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
