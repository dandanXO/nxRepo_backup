import React from "react";
import { Form, Modal, Spin ,Input ,Radio } from "antd";
import { FormModalProps } from "../../../../../types/FormModal";

const SmsConfigModal = (props: FormModalProps) => {
    const { isEdit, showModal, isSuccess, onFinish, form, setShowModal } = props
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    return (
        <Modal
            title={isEdit ? "修改短信配置" : "添加短信配置"}
            open={showModal}
            onCancel={()=>setShowModal(false)}
            onOk={form.submit}
        >
            <Spin spinning={isSuccess}>
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{
                    name: "",
                    contact: "",
                    email: "",
                    enabled: true
                }}>
                    {isEdit && <Form.Item name="merchantId" label="商户编号" hidden >
                        <Input allowClear />
                    </Form.Item>}
                    <Form.Item name="name" label="短信名称" rules={[{ required: true }]}>
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item name="contact" label="应用短信商" rules={[{ required: true }]}>
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item name="enabled" label="短信类型" rules={[{ required: true }]}>
                        <Radio.Group >
                            <Radio value={true}>启用</Radio>
                            <Radio value={false}>禁用</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="phoneNos" label="备注" rules={[{ required: true }]} >
                        <Input.TextArea allowClear rows={8} placeholder={"备注"} />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}

export default SmsConfigModal ;
