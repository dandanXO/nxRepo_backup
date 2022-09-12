import React, { Component } from 'react';
import { Form, Modal, Input } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import {FormattedMessage} from "react-intl";

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
        const { visible, handleCancel, form: { getFieldDecorator } , intl } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={400}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.collect.record"})}
            >
                <Form onSubmit={this.onOk}>
                    <FormItem>
                        {
                            getFieldDecorator('remark', {
                                initialValue: ''
                            })(
                                <TextArea rows={5} placeholder={intl.formatMessage({id : "windowPage.input.remarks"})}/>
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
    remark: PropTypes.string,
    intl: PropTypes.object.isRequired,
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
})(injectIntl(AddUrgeModal));
