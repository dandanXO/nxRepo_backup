import React, { useState } from "react";
import { Form, Modal, Spin, Input, Radio } from "antd";

interface OrderFinalReviewModalProps {
    showModal?: boolean;
    handleCloseModal: () => void;
    onFinish: any;
    form?: any;
}

const OrderFinalReviewModal = ((props: OrderFinalReviewModalProps) => {
    const { showModal, handleCloseModal, onFinish, form } = props;

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };
    const statusOptions = appInfo.COUNTRY !== 'Bangladesh' ? [
        { label: '审核通过', value: 1 },
        { label: '审核不通过', value: 0 },
    ] : [
        { label: '审核通过', value: 1 },
        { label: '拒绝且拉黑', value: 2 },
        { label: '拒绝7天', value: 3 },
    ]


    return (

        <Modal
            title={"提交审核结果"}
            open={showModal}
            onCancel={handleCloseModal}
            onOk={form.submit}
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{ reason: "", status: 1 }}>
                <Form.Item name="status" label="审核结果" >
                    <Radio.Group options={statusOptions} />
                </Form.Item>
                <Form.Item name="remark" label="备注" extra="提醒您，备注提交后即不可再修改">
                    <Input.TextArea allowClear rows={8} />
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default OrderFinalReviewModal;

