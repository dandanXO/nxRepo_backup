import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button} from 'antd';
import React, {useEffect, useRef} from 'react';
import {useLazyGetProductManageListQuery, useLoginMutation} from "../../api";
import {GetProductListResponseProduct} from "../../types/getProductList";


const columns: ProColumns<GetProductListResponseProduct>[] = [
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
      enable: { text: '上架', status: 'Success' },
      disable: { text: '下架', status: 'Default', },
    }
  },
  { title: '修改時間', dataIndex: 'createTime', hideInSearch: true },
];


const demoTable = () => {
  const [triggerLogin, {isSuccess: isLoginSuccess}] = useLoginMutation();
  const [ triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized} ] = useLazyGetProductManageListQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false
  });
  // const { currentData, refetch} = useGetProductManageListQuery(null, {
  //   skip: false,
  //   pollingInterval: 0,
  //   refetchOnMountOrArgChange: false,
  //   refetchOnFocus: false,
  //   refetchOnReconnect: false,
  // });

  useEffect(() => {
    if(window.top == window.self) {
      // Top level window
      console.log("[Debug][iframe] i'm master")
      if(!isLoginSuccess) {
        triggerLogin({
          phoneNo: "19888888888",
          code: "123456"
        });
      }
      if(isLoginSuccess) triggerGetList(null);
    } else {
      // Not top level. An iframe, popup or something
      console.log("[Debug][iframe] inner parent window")
      triggerGetList(null);
    }

  }, [triggerLogin, triggerGetList, isLoginSuccess])


  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GetProductListResponseProduct>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      dataSource={currentData}
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
      headerTitle={<Button key="button" icon={<PlusOutlined />} type="primary">添加</Button>}
    />
  );
};

export default demoTable;
