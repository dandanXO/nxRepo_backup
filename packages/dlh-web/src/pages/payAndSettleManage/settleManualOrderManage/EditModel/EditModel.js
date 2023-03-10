import React, { Component } from 'react';
import { Form, Modal, Input,Select } from 'antd';
import PropTypes from 'prop-types';
const { TextArea } = Input;

class EditModel extends Component{
    layout = {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            payMchList: []
        };
    }

    handlePayPlatChange = (value) => {
        const { allSettleMchList } = this.props;
        const _this = this;
        let {payMchList} = _this.state;
        let tempPayPlatList = [];
        allSettleMchList.map(function(item){
            if(item.platId == value && item.isEnabled){
                tempPayPlatList.push(item);
            }
        });
        payMchList = tempPayPlatList || [];
        _this.setState({
            payMchList: payMchList
        });
        this.props.form.setFieldsValue({
            'settleMchId': ''
        });
    }




    handleOk = () => {
        const { form: { getFieldsValue, validateFields }, handleOk } =  this.props;
        validateFields((err) => {
            if(err) {
                return;
            }
            handleOk(getFieldsValue());
        })
    }

    handleCancel = () => {
        this.props.handleCancel();
    }


    render() {
        const { visible,allSettlePlatList, form: { getFieldDecorator } } = this.props;
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={'手动充值支付'}>
                <div>
                    <Form>
                        <Form.Item label={'代收平台'} {...this.layout}>
                            {
                                getFieldDecorator('payPlatId', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请选择代收平台' }]
                                })(
                                    <Select initialValue='' onChange={this.handlePayPlatChange}>
                                        {allSettlePlatList.length > 0 && allSettlePlatList.map((item, i) => {
                                            return <Select.Option key={i} value={item.id}>{item.platName}</Select.Option>
                                        })}
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'代收商户'} {...this.layout}>
                            {
                                getFieldDecorator('settleMchId', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请选择代收商户' }]
                                })(
                                    <Select initialValue=''>
                                        {Array.isArray(this.state.payMchList) && this.state.payMchList.length > 0 && this.state.payMchList.map((item, i) => {
                                            return <Select.Option key={i} value={item.id}>{item.mchName}</Select.Option>
                                        })}
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'用户姓名'} {...this.layout}>
                            {
                                getFieldDecorator('bankAccountName', {
                                    rules: [{ required: true, message: '用户姓名不能为空' }]
                                })(
                                    <Input placeholder={'请输入用户姓名'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'银行卡号'} {...this.layout}>
                            {
                                getFieldDecorator('bankAccount', {
                                    rules: [{ required: true, message: '银行卡号不能为空' },
                                        { pattern: /^([1-9]{1})(\d{10,})$/, message: '请输入正确的银行卡号'}]
                                })(
                                    <Input placeholder={'请输入银行卡号'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'身份证号码'} {...this.layout}>
                            {
                                getFieldDecorator('userIdCardNo', {
                                    rules: [{ required: true, message: '身份证号码不能为空' },
                                        { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号码'}]
                                })(
                                    <Input placeholder={'请输入身份证号码'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'手机号码'} {...this.layout}>
                            {
                                getFieldDecorator('userPhone', {
                                    rules: [{ required: true, message: '手机号码不能为空' },
                                        { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的手机号码'}]
                                })(
                                    <Input placeholder={'请输入手机号码'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'打款金额'} {...this.layout}>
                            {
                                getFieldDecorator('loanMoney', {
                                    rules: [{ required: true, message: '打款金额不能为空' },
                                        { pattern: /^(?!(0[0-9]{0,}$))[0-9]+(.[0-9]{1,2})?$/, message: '请输入正确的数值'}]
                                })(
                                    <Input placeholder={'请输入打款金额'}/>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        );
    }

}

EditModel.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object
};
EditModel.defaultProps = {
    visible: false,
    handleOk: () => {},
    handleCancel: () =>{},
    info: {
        loanMoney: 1
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            loanMoney:Form.createFormField({
                value: info['loanMoney']
            })
        }
    }
})(EditModel);