import React, { Component } from 'react';
import { Form, Modal, Input,Select,Radio } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";

const RadioGroup = Radio.Group;
const { TextArea } = Input;

class riskModel extends Component{
    layout = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
           span: 19
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
        const { visible, form: { getFieldDecorator }, intl } = this.props;
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.modify.configuration"})}>
                <div>
                    <Form>
                        <Form.Item label={'type'} {...this.layout} style={{ display: 'none' }}>
                            {
                                getFieldDecorator('type', {
                                    initialValue: 'type'
                                })(
                                    <Input />
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'channelId'} {...this.layout} style={{ display: 'none' }}>
                            {
                                getFieldDecorator('channelId', {
                                    initialValue: ''
                                })(
                                    <Input disabled={true}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.belonging.channel"})} {...this.layout} >
                            {
                                getFieldDecorator('channelName', {
                                    initialValue: ''
                                })(
                                    <Input disabled={true}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.config.name"})} {...this.layout}>
                            {
                                getFieldDecorator('name', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "page.search.list.config.name.enter"})}/>
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
                        <Form.Item label={intl.formatMessage({id : "page.table.configuration.value"})} {...this.layout}>
                            {
                                getFieldDecorator('value', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "windowPage.configuration.value.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.remarks"})} {...this.layout}>
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

riskModel.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    intl: PropTypes.object.isRequired,
};

riskModel.defaultProps = {
    visible: false,
    handleOk: () => {},
    handleCancel: () =>{},
    info: {
        name: '',
        key:'',
        value:'',
        iscontrol:'',
        type:'',
        summary:'',
        channelId:'',
        channeName:''
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
            }),
            channelName: Form.createFormField({
                value: info['channelName']
            })
        }
    }
})(injectIntl(riskModel));