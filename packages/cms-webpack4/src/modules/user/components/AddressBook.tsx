import { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Modal, Form, Input, Radio,Spin,Space } from 'antd';
import {useGetUserContactsListQuery} from "../api/UserApi";
import {GetUserId}from "../api/types/getUserId";
import {GetUserContacts} from "../api/types/getUserInfo"
interface AddressBookResponse{
    name?:string;
    phoneNo?:string;
    creatTime?:string

}


const AddressBook = (({userId}:GetUserId) => {

   
    const { currentData, isLoading } = useGetUserContactsListQuery({ userId, pageNumber: 1, pageSize: 10 });
    const columns: ProColumns<GetUserContacts>[] = [

        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '手机号', dataIndex: 'phone', key: 'phone' },
        { title: '最后添加时间', dataIndex: 'lastUpdateTime', key: 'lastUpdateTime', valueType: 'dateTime' },
    ]

  return (

      <ProTable<GetUserContacts>
          columns={columns}
          dataSource={!isLoading && currentData?.content || []}
          loading={isLoading}
          rowKey="id"
          search={false}
          options={false}
          pagination={{
              // pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "300", "400", "500"],
              // pageSize:10,
              showSizeChanger: true,
              defaultPageSize: 10
              // onChange:pageOnChange
          }}
      />

    )
})

export default AddressBook;

