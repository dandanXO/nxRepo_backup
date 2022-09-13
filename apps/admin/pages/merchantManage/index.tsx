import { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Modal, Form, Input ,Radio } from 'antd';


type MerchantListItme={
    merchantId:number;
    mchNo:string;
    name:string;
    contact:string;
    enabled:string;
    // email:string; 多的
    merchantCreateTime:string; //少了
    merchantUpdateTime:string; //少了
}

const MerchantManage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const defaultData: MerchantListItme[] = [
        {
            merchantId:1,
            mchNo:'1',
            name:'name1',
            contact:'123345',
            enabled:'enable',
            merchantCreateTime:'2020-1-1',
            merchantUpdateTime:'2020-1-2',
        },
        {
            merchantId:2,
            mchNo:'2',
            name:'name2',
            contact:'2222222',
            enabled:'disable',
            merchantCreateTime:'2020-2-1',
            merchantUpdateTime:'2020-2-2',
        },
      ]; 

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    const columns: ProColumns<MerchantListItme>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => { action?.startEditable?.(record.merchantId) }}>修改</a>,
                <a key="delete">删除</a>,
            ],
        },
        { title: '商戶編號', dataIndex: 'merchantId', hideInSearch: true },
        { title: '商戶名稱', dataIndex: 'merchantName' },
        { title: '聯繫電話', dataIndex: 'merchantTel' },
        { title: '狀態', dataIndex: 'merchantStatus', valueType: 'select', valueEnum:{
            enable: { text: '啟用', status: 'Success'},
            disable: { text: '禁用',  status: 'Default', },
        }},
        { title: '創建時間', dataIndex: 'merchantCreateTime', hideInSearch: true },
        { title: '更新時間', dataIndex: 'merchantUpdateTime', hideInSearch: true },

    ]
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log(values)
    };
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };
    const handleCloseModal = () => {
        setAddModalVisible(false)
        form.resetFields()
    }
    return (
        domLoaded? <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    routes: [
                        {
                            path: '',
                            breadcrumbName: '首頁',
                        },
                        {
                            path: '',
                            breadcrumbName: '產品管理',
                        },
                        {
                            path: '',
                            breadcrumbName: '商戶管理',
                        },
                    ],
                },
            }}
        >
            <ProTable<MerchantListItme>
                columns={columns}
                request={async () => ({
                    data: defaultData,
                    total: 2,
                    success: true,
                })}
                rowKey="id"
                headerTitle={<Button key="button" icon={"+ "} type="primary" onClick={()=>setAddModalVisible(true)}>新建</Button>}
            />
            <Modal
                title="添加商戶"
                visible={addModalVisible}
                onCancel={handleCloseModal}
                onOk={form.submit}
            >
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="name" label="商戶名稱" rules={[{ required: true }]} >
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item name="contact" label="聯繫電話" rules={[{ required: true }]}>
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item name="enabled" label="狀態" initialValue={"true"}>
                        <Radio.Group >
                            <Radio value="true">啟用</Radio>
                            <Radio value="false">禁用</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </PageContainer>:null
    )
}

export default MerchantManage;

