// eslint-disable max-classes-per-file
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import { useLazyGetProductManageListQuery, useLoginMutation } from "../../api";
import { GetProductListResponseProduct } from "../../types/getProductList";
import {ProductFormModal} from "./hooks/useProductFormModal";

interface ProductTable {
  setProductModalData: React.Dispatch<React.SetStateAction<ProductFormModal>>;
  triggerGetList?: any;
  productListData?: any;
}
const DemoTable = (props: ProductTable) => {

    const [triggerLogin, { isSuccess: isLoginSuccess }] = useLoginMutation();

    // const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetProductManageListQuery({
    //     pollingInterval: 0,
    //     refetchOnFocus: false,
    //     refetchOnReconnect: false
    // });


    // const { currentData, refetch} = useGetProductManageListQuery(null, {
    //   skip: false,
    //   pollingInterval: 0,
    //   refetchOnMountOrArgChange: false,
    //   refetchOnFocus: false,
    //   refetchOnReconnect: false,
    // });

    useEffect(() => {
        if (window.top == window.self) {
            // Top level window
            console.log("[Debug][iframe] i'm master")
            if (!isLoginSuccess) {
                triggerLogin({
                    phoneNo: "19888888888",
                    code: "123456"
                });
            }
            if (isLoginSuccess) props.triggerGetList(null);
        } else {
            // Not top level. An iframe, popup or something
            console.log("[Debug][iframe] inner parent window")
          props.triggerGetList(null);
        }

    }, [triggerLogin, props.triggerGetList, isLoginSuccess])


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
        { title: '產品名稱', dataIndex: 'productName', initialValue: "" },
        { title: 'Logo', dataIndex: 'logo', valueType: 'image', hideInSearch: true },
        { title: '期限(天)', dataIndex: 'loanTerm', hideInSearch: true },
        { title: '展期利率(%)', dataIndex: 'extensionRate', hideInSearch: true, render: (text) => Number(Number(text) * 100).toFixed(1) },
        { title: '逾期費率(%)', dataIndex: 'overdueRate', hideInSearch: true , render: (text) => Number(Number(text) * 100).toFixed(1) },
        { title: '權重', dataIndex: 'weight', hideInSearch: true },
        {
          title: '狀態', dataIndex: 'enabled', valueType: 'select', initialValue: 'all', valueEnum: {
            all: { text: '全部', status: 'Default' },
            true: { text: '上架', status: 'Success' },
            false: { text: '下架', status: 'Default' },
          }
        },
        { title: '修改時間', dataIndex: 'updateTime', hideInSearch: true, valueType: 'dateTime' },
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
                                    .filter(i => productName === "" ? i : i.productName === productName)
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

export default DemoTable;
