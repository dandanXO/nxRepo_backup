import { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Modal, Form, Input, Radio,Divider } from 'antd';
import { ProductModalType } from "./index";


const ProductModal = ({ setProductModalVisible }: ProductModalType) => {

    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log(values)
    };
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };
    const handleCloseModal = () => {
        setProductModalVisible(false)
        form.resetFields()
    }
    return (
        <Modal
            title="添加商戶"
            visible={true}
            onCancel={handleCloseModal}
            onOk={form.submit}
            width={'80%'}
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="name" label="產品名" rules={[{ required: true }]} >
                    <Input allowClear />
                </Form.Item>
                <Form.Item name="productName" label="產品名" rules={[{ required: true }]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item name="adminUsername" label="用戶名" rules={[{ required: true }]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item name="adminUsername" label="用戶名" rules={[{ required: true }]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item name="adminPassword" label="登入密碼" rules={[{ required: true }]}>
                    <Input allowClear />
                </Form.Item>
                <Divider orientation="left">產品設定</Divider>
                <Form.Item name="logo" label="Logo" rules={[{ required: true }]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item name="backgroundImg" label="廣告橫幅(選填)"  extra="建議上傳 610x300，若沒有上傳，則由系統隨機配置。">
                    <Input allowClear />
                </Form.Item>
                <Form.Item name="amountRange" label="顯示額度"  extra="例如：₹ 3000 - ₹ 10000">
                    <Input allowClear />
                </Form.Item>
                <Form.Item name="interestRange" label="顯示利息" extra="例如：₹ 3000 - ₹ 10000">
                    <Form.Item name="interestRangeStart" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                        <Input allowClear /> -
                    </Form.Item> 
                    <Form.Item name="interestRangeEnd" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                        <Input allowClear />
                    </Form.Item>
                </Form.Item>
                <Form.Item name="enabled" label="狀態" initialValue={"true"}>
                    <Radio.Group >
                        <Radio value="true">啟用</Radio>
                        <Radio value="false">禁用</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ProductModal;

