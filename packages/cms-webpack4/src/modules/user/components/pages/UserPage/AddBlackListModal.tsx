import React from "react";
import { Form, Modal, Input } from "antd";

interface AddBlackLisModalProps {
    showModal?: boolean;
    handleCloseModal: () => void;
    onFinish: any;
    form?: any;
}


const AddBlackListModal = ((props: AddBlackLisModalProps):JSX.Element => {
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
            {/* <Spin spinning={isEdit ? isMerchantEditing : isMerchantCreating}> */}
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{ refundReason: "" }}>
                <Form.Item name="refundReason" label="备注" rules={[{ required: true }]} >
                    <Input.TextArea allowClear rows={8} placeholder="提醒您，备注提交后即不可再修改"/>
                </Form.Item>
            </Form>
            {/* </Spin> */}
        </Modal>
    );
});

export default AddBlackListModal;

