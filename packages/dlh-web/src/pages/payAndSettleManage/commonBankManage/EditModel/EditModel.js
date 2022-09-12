import React, { Component } from 'react';
import { Form, Modal, Input, Radio,Select,TreeSelect,Upload,Icon } from 'antd';
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
        };
    }

    handleOk = () => {
        const { form: { getFieldsValue, validateFields }, handleOk } =  this.props;
        validateFields((err) => {
            if(err) {
                return;
            }
            let editInfo = getFieldsValue();
            handleOk(editInfo);
        })
    }
    handleCancel = () => {
        this.props.handleCancel();
    }

    render() {
        const { visible, form: { getFieldDecorator,getFieldsValue } } = this.props;

        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={'添加/修改银行卡BIN'}>
                <div>
                    <Form>
                        <Form.Item label={'银行名称'} {...this.layout}>
                            {
                                getFieldDecorator('name', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder={'请输入银行名称'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'银行繁体名称'} {...this.layout}>
                            {
                                getFieldDecorator('nameTW', {
                                    initialValue: '',
                                    rules: [{ required: false, message: '不能为空' }]
                                })(
                                    <Input placeholder={'请输入银行繁体名称'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'银行英文名称'} {...this.layout}>
                            {
                                getFieldDecorator('nameEN', {
                                    initialValue: '',
                                    rules: [{ required: false, message: '不能为空' }]
                                })(
                                    <Input placeholder={'请输入银行英文名称'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'银行代码'} {...this.layout}>
                            {
                                getFieldDecorator('code', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder={'请输入银行代码'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'银行卡类型'} {...this.layout}>
                            {
                                getFieldDecorator('cardType', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder={'请输入银行卡类型'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'银行卡开头'} {...this.layout}>
                            {
                                getFieldDecorator('cardBin', {
                                    initialValue: '',
                                    rules: [{ required: true,
                                        message: '请输入正确的银行卡开头',whitespace: false,
                                        type:'number',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input placeholder={'请输入银行卡开头'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'分行名称'} {...this.layout}>
                            {
                                getFieldDecorator('branchName', {
                                    initialValue: '',
                                    rules: [{ required: false, message: '不能为空' }]
                                })(
                                    <Input placeholder={'请输入分行名称'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'银行卡名称'} {...this.layout}>
                            {
                                getFieldDecorator('cardName', {
                                    initialValue: '',
                                    rules: [{ required: false, message: '不能为空' }]
                                })(
                                    <Input placeholder={'请输入银行卡名称'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'银行卡开头长度'} {...this.layout}>
                            {
                                getFieldDecorator('cardBinLength', {
                                    initialValue: '',
                                    rules: [{ required: false,  message: '请输入正确的数值',whitespace: false,
                                        type:'number',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input placeholder={'请输入银行卡开头长度'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'银行卡号长度'} {...this.layout}>
                            {
                                getFieldDecorator('numLength', {
                                    initialValue: '',
                                    rules: [{ required: false, message: '请输入正确的数值',whitespace: false,
                                        type:'number',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input placeholder={'请输入银行卡号长度'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'优先级'} {...this.layout}>
                            {
                                getFieldDecorator('sortNum', {
                                    rules: [{ required: false, message: '请输入正确的数值',whitespace: false,
                                        type:'number',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input disabled={false} placeholder={'请输入优先级'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'是否启用'} {...this.layout}>
                            {
                                getFieldDecorator('isEnabled', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <Radio.Group>
                                        <Radio value={true}>启用</Radio>
                                        <Radio value={false}>不启用</Radio>
                                    </Radio.Group>
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
        name:'',
        nameTW:'',
        nameEN:'',
        code:'',
        branchName:'',
        cardName:'',
        cardType:'',
        cardBin:'',
        cardBinLength:'',
        numLength:'',
        sortNum: 0,
        isEnabled:true
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            name:Form.createFormField({
                value: info['name']
            }),
            nameTW:Form.createFormField({
                value: info['nameTW']
            }),
            nameEN:Form.createFormField({
                value: info['nameEN']
            }),
            code:Form.createFormField({
                value: info['code']
            }),
            branchName:Form.createFormField({
                value: info['branchName']
            }),
            cardName:Form.createFormField({
                value: info['cardName']
            }),
            cardType:Form.createFormField({
                value: info['cardType']
            }),
            cardBin:Form.createFormField({
                value: info['cardBin']
            }),
            cardBinLength:Form.createFormField({
                value: info['cardBinLength']
            }),
            numLength:Form.createFormField({
                value: info['numLength']
            }),
            sortNum:Form.createFormField({
                value: info['sortNum']
            }),
            isEnabled:Form.createFormField({
                value: info['isEnabled']
            })
        }
    }
})(EditModel);