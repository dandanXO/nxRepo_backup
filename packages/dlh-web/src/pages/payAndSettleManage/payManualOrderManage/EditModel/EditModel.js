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
            payPlatList: [],
            payMchList: []
        };
    }

    handlePayTypeChange = (value) => {
        const _this = this;
        const { allPayPlatList } = this.props;
        let {payPlatLists} = _this.state;
        let tempPayPlatList = [];
        allPayPlatList.map(function(item){
            let typeIdArray = item.payTypeList.split(',');
            let templatPayTypeList = typeIdArray.filter(t => t == value );
            if(!!templatPayTypeList && Array.isArray(templatPayTypeList) && templatPayTypeList.length>0){
                tempPayPlatList.push(item);
            }
        });
        payPlatLists = tempPayPlatList || [];
        _this.setState({
            payPlatList: payPlatLists
        });
        this.props.form.setFieldsValue({
            'payPlatId': ''
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
        const { visible,allPayTypeList, form: { getFieldDecorator } } = this.props;
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={'手动充值支付'}>
                <div>
                    <Form>
                        <Form.Item label={'代收方式'} {...this.layout}>
                            {
                                getFieldDecorator('payTypeId', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请选择代收方式' }]
                                })(
                                    <Select initialValue='' onChange={this.handlePayTypeChange}>
                                        {allPayTypeList.length > 0 && allPayTypeList.map((item, i) => {
                                            return <Select.Option key={i} value={item.id}>{item.label}</Select.Option>
                                        })}
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'代收平台'} {...this.layout}>
                            {
                                getFieldDecorator('payPlatId', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请选择代收平台' }]
                                })(
                                    <Select initialValue=''>
                                        {Array.isArray(this.state.payPlatList) && this.state.payPlatList.length > 0 && this.state.payPlatList.map((item, i) => {
                                            return <Select.Option key={i} value={item.id}>{item.platName}</Select.Option>
                                        })}
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'用户姓名'} {...this.layout}>
                            {
                                getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '用户姓名不能为空' }]
                                })(
                                    <Input placeholder={'请输入用户姓名'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'身份证号码'} {...this.layout}>
                            {
                                getFieldDecorator('identityId', {
                                    rules: [{ required: true, message: '身份证号码不能为空' },
                                        { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号码'}]
                                })(
                                    <Input placeholder={'请输入身份证号码'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'手机号码'} {...this.layout}>
                            {
                                getFieldDecorator('phoneNo', {
                                    rules: [{ required: true, message: '手机号码不能为空' },
                                        { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的手机号码'}]
                                })(
                                    <Input placeholder={'请输入手机号码'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'充值金额'} {...this.layout}>
                            {
                                getFieldDecorator('amount', {
                                    rules: [{ required: true, message: '充值金额不能为空' },
                                        { pattern: /^(?!(0[0-9]{0,}$))[0-9]+(.[0-9]{1,2})?$/, message: '请输入正确的数值'}]
                                })(
                                    <Input placeholder={'请输入充值金额'}/>
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
    allPayPlatList: PropTypes.array,
    allPayTypeList: PropTypes.array,
    allPayMchList: PropTypes.array,
    info: PropTypes.object
};
EditModel.defaultProps = {
    visible: false,
    handleOk: () => {},
    handleCancel: () =>{},
    allPayPlatList:[],
    allPayTypeList: [],
    allPayMchList:[],
    info: {
        amount: 1
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            amount:Form.createFormField({
                value: info['amount']
            })
        }
    }
})(EditModel);