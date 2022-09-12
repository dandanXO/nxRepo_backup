import React, { Component } from 'react';
import { Modal, Form, Select, Input, Radio, InputNumber,DatePicker, message } from 'antd';
import PropTypes, { number } from 'prop-types';
import moment from "moment/moment";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import {injectIntl, FormattedMessage} from "react-intl";

class AddModal extends Component{
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
        this.state = {
            isShow: this.props.info['payType'] === '2'
        };
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
    renderItem = () => {
        const { isShow } = this.state;
        const { info: { needPayMoney, hadPaidMoney }, form: { getFieldsValue }, intl } = this.props;
        const money = getFieldsValue()['totalMoney'] || 0;
        let surplusMoney = Number(needPayMoney) - Number(hadPaidMoney) - Number(money);
        surplusMoney = Number.isInteger(surplusMoney) ? surplusMoney : surplusMoney.toFixed(2);
        if(!isShow){
            return null;
        }
        return (
            <FormItem label={intl.formatMessage({id : "windowPage.reduce.amount"})} {...this.layout}>
                {
                    <div>{surplusMoney}</div>
                }
            </FormItem>
        );
    }

    handleChange = (e) => {
        this.setState({
            isShow: e.target.value === '2'
        });
    }
    afterClose = () => {
        this.setState({
            isShow: false
        });
    }


    render() {
        const { visible, form: { getFieldDecorator }, handleCancel, info, modalLoading, intl } = this.props;
        //const { visible, form: { getFieldDecorator }, handleCancel, info, modalLoading } = this.props;
        let checkReminderMoney = Number(info['remainderMoney']);
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={600}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.repaid.record"})}
                confirmLoading={modalLoading}
                afterClose={this.afterClose}
            >
                <Form>
                    <FormItem label={intl.formatMessage({id : "page.search.list.name"})} {...this.layout}>
                        {
                            <div>{info['userTrueName'] || ''}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.search.list.mobile"})} {...this.layout}>
                        {
                            <div>{info['userPhone'] || ''}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.table.contract.amount"})+" + "+intl.formatMessage({id : "windowPage.late.fee"})} {...this.layout}>
                        {
                            <div>{info['needPayMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.table.reduce.amount"})} {...this.layout}>
                        {
                            <div>{info['reductionMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.table.amount.paid"})} {...this.layout}>
                        {
                            <div>{info['hadPaidMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.current.repayment"})} {...this.layout}>
                        {
                            <div>{info['remainderMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.repayment.type"})} {...this.layout}>
                        {
                            getFieldDecorator('payType', {})(
                                <RadioGroup>
                                    <Radio value={'1'}><FormattedMessage id="windowPage.repayment" /></Radio>
                                </RadioGroup>
                                // <RadioGroup onChange={this.handleChange}>
                                //     <Radio value={'1'}>还款</Radio>
                                //     {Number(info['status']) === 12 && <Radio value={'2'}>减免还款</Radio>}
                                // </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.repayment.method"})} {...this.layout}>
                        {
                            getFieldDecorator('payName', {})(
                                <RadioGroup>
                                    <Radio value={'1'}><FormattedMessage id="windowPage.alipay" /></Radio>
                                    <Radio value={'3'}><FormattedMessage id="windowPage.weChat.pay" /></Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <Form.Item {...this.layout} label={intl.formatMessage({id : "windowPage.repayment.amount"})}>
                        {
                            getFieldDecorator('totalMoney', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) },
                                    { max : checkReminderMoney, message : intl.formatMessage({id : "windowPage.cannot.exceed.current.repaid.amount"}), type : 'number'},
                                ]
                            })(
                                <InputNumber />
                            )
                        }
                    </Form.Item>
                    {
                        this.renderItem()
                    }
                    <Form.Item {...this.layout} label={intl.formatMessage({id : "page.search.list.trans.serial.no"})}>
                        {
                            getFieldDecorator('payTradeNo', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"})},
                                    // { whitespace: true, message: '交易流水号不能出现空白' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id : "page.search.list.trans.serial.no.enter"})}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...this.layout} label={intl.formatMessage({id : "windowPage.posting.time"})}>
                        {
                            getFieldDecorator('payTime', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"})}
                                ]
                            })(
                                <DatePicker format={'YYYY-MM-DD HH:mm:ss'}/>
                            )
                        }
                    </Form.Item>
                    <FormItem label={intl.formatMessage({id : "windowPage.remarks"})} {...this.layout}>
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
AddModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    modalLoading: PropTypes.bool,
    onChange: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
AddModal.deafultProps = {
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
            payType: Form.createFormField({
                ...info['payType'],
                value: info['payType'].value
            }),
            payName: Form.createFormField({
                ...info['payName'],
                value: info['payName'].value
            }),
            totalMoney: Form.createFormField({
                ...info['totalMoney'],
                value: info['totalMoney'].value
            }),
            payTradeNo: Form.createFormField({
                ...info['payTradeNo'],
                value: info['payTradeNo'].value
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
})(injectIntl(AddModal));