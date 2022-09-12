import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber,DatePicker,message } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


const FormItem = Form.Item;
const { TextArea } = Input;

class OnlineModal extends Component{
    layout = {
        labelCol: {
            span: 7
        },
        wrapperCol: {
            span: 17
        }
    }
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    onOk = () => {
        const { handleOk, form: { getFieldsValue, validateFields } } = this.props;
        validateFields((err) => {
            if(err) {
                return;
            }
            handleOk(getFieldsValue());
        })
    }

    inputAmountCheck = (val) => {
        const {info, intl} = this.props;
        if (!val) {
           message.error(intl.formatMessage({id :"windowPage.enter.correct.deduce.amount"}),2)
        }
        if (val + Number(info['reductionMoney']) >= Number(info['overDueMoney'])) {
            message.warn(intl.formatMessage({id :"windowPage.deduce.over.late.fee"}),4);
        }
    }

    render() {
        const { visible, form: { getFieldDecorator }, handleCancel, info, modalLoading, intl } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={600}
                visible={visible}
                title={intl.formatMessage({id :"windowPage.add.deduce.amount"})}
                confirmLoading={modalLoading}
                afterClose={this.afterClose}
            >
                <Form>
                    <FormItem label={intl.formatMessage({id :"page.search.list.name"})} {...this.layout}>
                        {
                            <div>{info['userTrueName'] || ''}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id :"windowPage.mobile"})} {...this.layout}>
                        {
                            <div>{info['userPhone'] || ''}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id :"page.table.contract.amount"})} {...this.layout}>
                        {
                            <div>{info['deviceMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id :"windowPage.late.fee"})} {...this.layout}>
                        {
                            <div>{info['overDueMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id :"page.table.reduce.amount"})} {...this.layout}>
                        {
                            <div>{info['reductionMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id :"page.table.amount.paid"})} {...this.layout}>
                        {
                            <div>{info['hadPaidMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id :"windowPage.amount.current.pending"})} {...this.layout}>
                        {
                            <div>{info['remainderMoney'] || 0}</div>
                        }
                    </FormItem>
                    <Form.Item {...this.layout} label={intl.formatMessage({id :"windowPage.reduce.amount"})}>
                        {
                            getFieldDecorator('totalMoney', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id :"windowPage.remarks.empty"})},
                                ]
                            })(
                                <InputNumber onChange = {this.inputAmountCheck}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...this.layout} label={intl.formatMessage({id :"windowPage.add.time"})}>
                        {
                            getFieldDecorator('payTime', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id :"windowPage.remarks.empty"}) }
                                ]
                            })(
                                <DatePicker format={'YYYY-MM-DD HH:mm:ss'}/>
                            )
                        }
                    </Form.Item>
                    <FormItem label={intl.formatMessage({id :"windowPage.remarks"})} {...this.layout}>
                        {
                            getFieldDecorator('remark', {})(
                                <TextArea rows={2}/>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
OnlineModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    modalLoading: PropTypes.bool,
    onChange: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
OnlineModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {},
    modalLoading: false,
    onChange: () => {}
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            totalMoney: Form.createFormField({
                ...info['totalMoney'],
                value: info['totalMoney'].value
            }),
            payTime: Form.createFormField({
                ...info['payTime'],
                value: info['payTime'].value
            }),
            remark: Form.createFormField({
                ...info['remark'],
                value: info['remark'].value
            }),
        };
    },
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
})(injectIntl(OnlineModal));