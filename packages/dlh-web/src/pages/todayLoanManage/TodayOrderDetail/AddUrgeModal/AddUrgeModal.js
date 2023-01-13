import React, { Component } from 'react';
import { Form, Modal, Input,Select } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import {FormattedMessage} from "react-intl";

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

class AddUrgeModal extends  Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    onOk = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue, validateFields }, handleOk } = this.props;
        validateFields((err) => {
            if (err) {
                return;
            }
            handleOk(getFieldsValue());
        })
    }

    render() {
        const { visible, handleCancel, form: { getFieldDecorator } , intl } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={600}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.collect.record"})}
            >
                <Form onSubmit={this.onOk}>
                <FormItem {...this.formItemLayout} label={<FormattedMessage id="customer.status" />}  >
                        {
                            getFieldDecorator('status', {
                                initialValue: '',
                                rules: [{ required: true, message: intl.formatMessage({ id: "page.table.enter" }, { text: intl.formatMessage({ id: "customer.status" }) }) }]
                            })(
                                <Select>
                                    <Option value={''}><FormattedMessage id="page.search.list.select" /></Option>
                                    <Option value={'1'}><FormattedMessage id="customer.status.promise" /></Option>
                                    <Option value={'2'}><FormattedMessage id="customer.status.missed" /></Option>
                                    <Option value={'3'}><FormattedMessage id="customer.status.turned.off" /></Option>
                                    <Option value={'4'}><FormattedMessage id="customer.status.lost.contact" /></Option>
                                    <Option value={'5'}><FormattedMessage id="customer.status.other" /></Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={<FormattedMessage id="windowPage.remarks" />} >
                        {
                            getFieldDecorator('remark', {
                                initialValue: '',
                                rules: [{ required: true, message: intl.formatMessage({ id: "page.table.enter" }, { text: intl.formatMessage({ id: "windowPage.remarks" }) }) }]
                            })(
                                <TextArea rows={5} placeholder={'请输入备注'} />
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
            }),
            status: Form.createFormField({
                value: ''
            })
        }
    }
})(injectIntl(AddUrgeModal));
