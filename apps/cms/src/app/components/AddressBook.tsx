import { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Modal, Form, Input, Radio,Spin,Space } from 'antd';

interface AddressBookResponse{
    name?:string;
    phoneNo?:string;
    creatTime?:string

}


const AddressBook = () => {


    const columns: ProColumns<AddressBookResponse>[] = [
      
        { title: '商户编号', dataIndex: 'merchantId', key: 'merchantId', hideInSearch: true },
        { title: '商户名', dataIndex: 'name', key: 'name' , initialValue: ""},
        { title: '联系电话', dataIndex: 'contact', key: 'contact' , initialValue: ""},
        { title: '电子邮箱', dataIndex: 'email', key: 'email', hideInSearch: true },
        {
            title: '状态', dataIndex: 'enabled', valueType: 'select', initialValue: 'all', key: 'enabled', valueEnum: {
                all: { text: '全部', status: 'Default' },
                true: { text: '启用', status: 'Success' },
                false: { text: '禁用', status: 'Default', },
            }
        },
        { title: '创建时间', dataIndex: 'createTime', hideInSearch: true, key: 'createTime', valueType: 'dateTime' },
        { title: '更新時間', dataIndex: 'updateTime', hideInSearch: true, key: 'updateTime', valueType: 'dateTime' },

    ]

  return (
       
            // <ProTable<GetMerchantListResponse>
            //     columns={columns}
            //     dataSource={dataList}
            //     loading={isFetching}
            //     rowKey="id"
            // />
        
    )
}

export default AddressBook;

