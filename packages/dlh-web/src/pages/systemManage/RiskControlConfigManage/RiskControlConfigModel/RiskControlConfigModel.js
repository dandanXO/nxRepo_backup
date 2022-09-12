import React, { Component } from 'react';
import { Form, Modal, Input,Select,Radio, message  } from 'antd';
import PropTypes from 'prop-types';
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class RiskControlConfigModel extends Component{
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
        this.state = {};
    }

    handleOk = () => {
        const { form: { getFieldsValue, validateFields }, handleOk, info: {key} } =  this.props;
        validateFields((err, values) => {
            if(err) {
                return;
            }
            if (this.vaildateRaiseAmount(key, values)){         
                return;
            }

            handleOk(getFieldsValue());
        })


    }
    handleCancel = () => {
        this.props.handleCancel();
    }

    vaildateRaiseAmount=(keyName,  contextValue) => {
        if (String(keyName) === 'raise_level_amount'){
            const {value} = contextValue;
            if (String(value).includes(',')){
                const levellist = String(value).split(',').map(x => x.trim());
                if (Array.isArray(levellist) && levellist.length > 0){
                    for (const level of levellist){
                        if (!this.isNumeric(level) || !this.chkNullValue(level)){
                            message.warning("输入配置值中每一个值要是整数", 3);
                            return true;
                        }else if (!this.chkRaiseAmount(level)){
                            message.warning("输入配置值中每一个值要是大过0和小于等于5000", 3);
                            return true;
                        }
                    }                    
                }else{
                    message.warning("输入配置值要是整数及要以逗号分隔", 3);
                    return true; 
                }

            }else if (!this.isNumeric(value)){
                message.warning("输入配置值要是整数", 3);
                return true;
            }else if (!this.chkRaiseAmount(value)){
                message.warning("输入配置值要是大过0和小于等于5000", 3);
                return true;
            }

        }

        return false;
    }

    isNumeric = (numValue) => {
        return /^-{0,1}\d+$/.test(numValue);
    }

    chkNullValue= (val) =>{
        if (val && typeof(val) != "undefined" && val.length > 0){
            return true;
        }

        return false;
    }

    chkRaiseAmount(val){
        if (parseInt(val) > 0 && parseInt(val) <= 5000){
            return true;
        }

        return false;
    }

    render() {
        const { visible, form: { getFieldDecorator } } = this.props;
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={'修改配置'}>
                <div>
                    <Form>
                        <Form.Item label={'配置名称'} {...this.layout}>
                            {
                                getFieldDecorator('name', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder={'请输入配置名称'}/>
                                )
                            }
                        </Form.Item>
                        {/* <Form.Item label={'配置代码'} {...this.layout}>
                            {
                                getFieldDecorator('key', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input disabled={true} placeholder={'请输入配置代码'}/>
                                )
                            }
                        </Form.Item> */}
                        <Form.Item label={'配置值'} {...this.layout}>
                            {
                                getFieldDecorator('value', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder={'请输入配置值'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'备注'} {...this.layout}>
                            {
                                getFieldDecorator('summary', {
                                    initialValue: ''
                                })(
                                    <TextArea rows={4}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'channelId'} {...this.layout} style={{ display: 'none' }}>
                            {
                                getFieldDecorator('channelId', {
                                    initialValue: ''
                                })(
                                    <Input rows={4}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'type'} {...this.layout} style={{ display: 'none' }}>
                            {
                                getFieldDecorator('type', {
                                    initialValue: 'type'
                                })(
                                    <Input />
                                )
                            }
                        </Form.Item>
                        {/* <Form.Item label={'参数类型'} {...this.layout}>
                            {
                                getFieldDecorator('type', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Select>
                                        <Option value={'0'}>默认类型</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'开关类型'} {...this.layout}>
                            {
                                getFieldDecorator('iscontrol', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </RadioGroup>
                                )
                            }
                        </Form.Item> */}
                    </Form>
                </div>
            </Modal>
        );
    }

}

RiskControlConfigModel.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object
};

RiskControlConfigModel.defaultProps = {
    visible: false,
    handleOk: () => {},
    handleCancel: () =>{},
    info: {
        name: '',
        key:'',
        value:'',
        iscontrol:'',
        type:5,
        summary:'',
        channelId:''
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            name: Form.createFormField({
                value: info['name']
            }),
            value: Form.createFormField({
                value: info['value']
            }),
            key: Form.createFormField({
                value: info['key']
            }),
            iscontrol: Form.createFormField({
                value: info['iscontrol']
            }),
            type: Form.createFormField({
                value: info['type'] 
            }),
            summary: Form.createFormField({
                value: info['summary']
            }),
            channelId: Form.createFormField({
                value: info['channelId']
            })
        }
    }
})(RiskControlConfigModel);