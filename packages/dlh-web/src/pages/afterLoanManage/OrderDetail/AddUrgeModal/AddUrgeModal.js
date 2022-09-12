import React, { Component } from 'react';
import { Form, Modal, Input } from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const { TextArea } = Input;


class AddUrgeModal extends  Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    onOk = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, handleOk } = this.props;
        handleOk(getFieldsValue());
    }

    render() {
        const { visible, handleCancel, form: { getFieldDecorator } } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={400}
                visible={visible}
                title={'添加催收记录'}
            >
                <Form onSubmit={this.onOk}>
                    <FormItem>
                        {
                            getFieldDecorator('remark', {
                                initialValue: ''
                            })(
                                <TextArea rows={5} placeholder={'请输入备注'}/>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

AddUrgeModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    remark: PropTypes.string
};
AddUrgeModal.deaultProps = {
    visible: false,
    remark: '',
    handleCancel(){},
    handleOk(){}
};

export default Form.create({
    mapPropsToFields(props){
        const { remark } = props;
        return {
            remark: Form.createFormField({
                value: remark
            })
        }
    }
})(AddUrgeModal);
