import React from "react";
import { Form, Modal, Spin ,Input ,Radio } from "antd";

interface MerchantModalProps {
    isEdit?: boolean;
    isMerchantEditing?: boolean;
    isMerchantCreating?: boolean;
    merchantModalVisible?: boolean;
    handleCloseModal: () => void;
    onFinish: any;
    form?: any;
}

const MerchantModal = (props: MerchantModalProps): JSX.Element => {
    const { isEdit, isMerchantEditing, isMerchantCreating, merchantModalVisible, handleCloseModal, onFinish, form } = props;
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };
    return (
        <Modal
            title={isEdit ? "编辑商户" : "添加商户"}
            open={merchantModalVisible}
            onCancel={handleCloseModal}
            onOk={form.submit}
        >
            <Spin spinning={isEdit ? isMerchantEditing : isMerchantCreating}>
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{
                    name: "",
                    contact: "",
                    email: "",
                    enabled: true
                }}>
                    {isEdit && <Form.Item name="merchantId" label="商户编号" hidden >
                        <Input allowClear />
                    </Form.Item>}
                    <Form.Item name="name" label="商户名" rules={[{ required: true }]}>
                        <Input allowClear placeholder="商户名"/>
                    </Form.Item>
                    <Form.Item name="mchNo" label="商户帐号" rules={[{ required: true }]} >
                        <Input allowClear disabled={isEdit} placeholder="商户帐号"/>
                    </Form.Item>
                    <Form.Item name="password" label="商户密码" rules={[{ required: !isEdit }]}>
                        <Input allowClear placeholder="商户密码"/>
                    </Form.Item>
                    <Form.Item name="contact" label="联系电话" >
                        <Input allowClear placeholder="联系电话"/>
                    </Form.Item>
                    <Form.Item name="email" label="电子邮箱">
                        <Input allowClear placeholder="mail@mail.com"/>
                    </Form.Item>
                    <Form.Item name="enabled" label="状态">
                        <Radio.Group >
                            <Radio value={true}>启用</Radio>
                            <Radio value={false}>禁用</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>

    );
};

export default MerchantModal ;
