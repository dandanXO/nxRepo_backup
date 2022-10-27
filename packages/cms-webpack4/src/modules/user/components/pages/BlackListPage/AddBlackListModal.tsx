import React from "react";
import { Form, Modal, Spin, Input, Radio } from "antd";

interface AddBlackLisModalProps {
    showModal?: boolean;
    handleCloseModal: () => void;
    onFinish: any;
    form?: any;
}


const AddBlackListModal = ((props: AddBlackLisModalProps) => {
    const { showModal, handleCloseModal, form, onFinish } = props;

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };
    return (

        <Modal
            title={"添加黑名单"}
            open={showModal}
            onCancel={handleCloseModal}
            onOk={form.submit}
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{ refundReason: "" }}>
                <Form.Item name="phoneNos" label="手机号码" rules={[{ required: true }]} >
                    <Input.TextArea allowClear rows={8} placeholder={"格式：电话号码1,电话号码2,电话号码3，…..号码与号码间以半角逗号分隔，若格式错误将无法添加成功。"}/>
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default AddBlackListModal;

