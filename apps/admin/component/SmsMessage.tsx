import { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Modal, Form, Input, Radio,Spin,Space } from 'antd';

interface SmsMessageResponse{
    phoneNo?:string;
    message?:string;
    type?:string;
    creatTime?:string

}


const SmsMessage = () => {

    const dataList = [
        { phoneNo: "6609996417", message: "Layout: hug content（這是多行的範例）Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",type:"接收", creatTime: "2022-08-19 08:03:12" },
        { phoneNo: "6609996417", message: "Layout: hug content（這是單行的範例） Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",type:"发送", creatTime: "2022-08-19 08:03:12" },
    ]

    const columns: ProColumns<SmsMessageResponse>[] = [

        { title: '发送号码', dataIndex: 'phoneNo', key: 'name' },
        { title: '内容', dataIndex: 'message', key: 'nphoneNoame' ,width:'50%'},
        { title: '发送类型', dataIndex: 'type', key: 'nphoneNoame' },
        { title: '发送时间', dataIndex: 'creatTime', key: 'creatTime', valueType: 'dateTime' },
    ]

  return (
       
            <ProTable<SmsMessageResponse>
                columns={columns}
                dataSource={dataList}
                // loading={isFetching}
                rowKey="id"
                search={false}
                options={false}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 10
                }}
            />
        
    )
}

export default SmsMessage;

