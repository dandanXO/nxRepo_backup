import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { Form, Input, InputNumber, DatePicker, Button, Radio, message, Popconfirm  } from 'antd';
import {removeBillAction} from './index';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

const getSearchParams = () => {
    return {
        orderNo: '',
        nameTrue: '',
        phoneNo: '',
        payName: '支付宝',
        totalMoney: '',
        payTradeNo: '',
        payType: '1',
        payTime: moment()
    }
}
class RemoveBill extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue, validateFields, setFieldsValue }, removeBill } = this.props;
        validateFields((err, values) => {
            if(err) {
                return;
            }
            const obj = getFieldsValue();
            const payTime = obj['payTime'] ? obj['payTime'].format('YYYY-MM-DD HH:mm:ss') : '';
            const params = { ...obj, payTime };
            removeBill(params, () => {
                message.success('操作成功');
                setFieldsValue(getSearchParams());
            })
        })

    }

    render() {
        const { form: { getFieldDecorator }, btnDisabled } = this.props;
        return (
            <div style={{ width: '400px', margin: '0 auto' }}>
                <Form onSubmit={this.submit}>
                    <Form.Item {...formItemLayout} label={'订单号'}>
                        {
                            getFieldDecorator('orderNo', {
                                initialValue: ''
                            })(
                                <Input placeholder={'请输入订单号'}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'姓名'}>
                        {
                            getFieldDecorator('nameTrue', {
                                initialValue: ''
                            })(
                                <Input placeholder={'请输入姓名'}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'手机号'}>
                        {
                            getFieldDecorator('phoneNo', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '不能为空' }
                                ]
                            })(
                                <Input placeholder={'请输入手机号'}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'交易流水号'}>
                        {
                            getFieldDecorator('payTradeNo', {
                                initialValue: ''
                            })(
                                <Input placeholder={'请输入交易流水号'}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'还款时间'}>
                        {
                            getFieldDecorator('payTime', {
                                initialValue: moment(),
                                rules: [
                                    { required: true, message: '不能为空' }
                                ]
                            })(
                                <DatePicker format={'YYYY-MM-DD HH:mm:ss'}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'还款方式'}>
                        {
                            getFieldDecorator('payName', {
                                initialValue: '支付宝'
                            })(
                                <RadioGroup>
                                    <Radio value={'支付宝'}>支付宝</Radio>
                                    <Radio value={'微信支付'}>微信支付</Radio>
                                    <Radio value={'银行卡转账'}>银行卡转账</Radio>
                                </RadioGroup>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'还款类型'}>
                        {
                            getFieldDecorator('payType', {
                                initialValue: '1'
                            })(
                                <RadioGroup>
                                    <Radio value={'1'}>还款</Radio>
                                    <Radio value={'2'}>展期</Radio>
                                </RadioGroup>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'总金额'}>
                        {
                            getFieldDecorator('totalMoney', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '不能为空' }
                                ]
                            })(
                                <InputNumber/>
                            )
                        }
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button type={'primary'} disabled={btnDisabled} htmlType={'submit'}>提交</Button>
                    </Form.Item>

                </Form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { operatorManageState: {removeBillState} } = state;
    return {
        btnDisabled: removeBillState['disabled']
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeBtnOption: removeBillAction.rvbRemoveBill,
        removeBill: removeBillAction.rvbRemoveBill
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RemoveBill));