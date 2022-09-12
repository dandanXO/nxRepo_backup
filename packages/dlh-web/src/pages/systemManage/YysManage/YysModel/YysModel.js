import React, { Component } from 'react';
import { Form, Modal, Input,Select,Radio } from 'antd';
import PropTypes from 'prop-types';
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class yysModel extends Component{
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
        const { visible, form: { getFieldDecorator } } = this.props;
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={'修改运营商配置'}>
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

yysModel.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object
};

yysModel.defaultProps = {
    visible: false,
    handleOk: () => {},
    handleCancel: () =>{},
    info: {
        name: '',
        key:'',
        value:'',
        iscontrol:'',
        type:'',
        summary:''
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            name: Form.createFormField({
                value: info['name'] || ''
            }),
            value: Form.createFormField({
                value: info['value'] || ''
            }),
            key: Form.createFormField({
                value: info['key'] || ''
            }),
            iscontrol: Form.createFormField({
                value: info['iscontrol'] || ''
            }),
            type: Form.createFormField({
                value: info['type'] || ''
            }),
            summary: Form.createFormField({
                value: info['summary'] || ''
            })
        }
    }
})(yysModel);