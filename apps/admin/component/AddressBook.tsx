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

    const dataList = [
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name12", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name1", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name", phoneNo: "6609996417", creatTime: "2022-08-19 08:03:12" },
        { name: "Contact Name3", phoneNo: "66022222417", creatTime: "2022-08-19 08:03:12" },

        
    ]

    const columns: ProColumns<AddressBookResponse>[] = [

        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '手机号', dataIndex: 'phoneNo', key: 'nphoneNoame' },
        { title: '最后添加时间', dataIndex: 'creatTime', key: 'creatTime', valueType: 'dateTime' },
    ]

    // const pageOnChange=(value,b)=>{
    //     console.log(value,b)
    // }

  return (
       
            <ProTable<AddressBookResponse>
                columns={columns}
                dataSource={dataList}
                // loading={isFetching}
                rowKey="id"
                search={false}
                options={false}
                pagination={{
                    // pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "300", "400", "500"],
                    // pageSize:10,
                    showSizeChanger: true,
                    defaultPageSize:10
                    // onChange:pageOnChange
                }}
            />
        
    )
}

export default AddressBook;

