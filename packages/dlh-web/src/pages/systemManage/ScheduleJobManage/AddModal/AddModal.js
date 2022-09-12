import React, { Component } from 'react';
import { Modal, Form,Input, Radio } from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AddModal extends Component{
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

    onOk = () => {
        const { handleOk, form: { getFieldsValue } } = this.props;
        handleOk(getFieldsValue());
    }


    render() {
        const { visible, form: { getFieldDecorator }, handleCancel } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={600}
                visible={visible}
                title={'添加/修改任务'}
            >
                <Form>
                    <FormItem label={'任务名称'} {...this.layout}>
                        {
                            getFieldDecorator('jobName', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '任务名称不能为空' }
                                ]
                            })(
                                <Input placeholder={'请输入任务名称'} />
                            )
                        }
                    </FormItem>
                    <FormItem label={'任务类名'} {...this.layout}>
                        {
                            getFieldDecorator('beanName', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '任务类名不能为空' }
                                ]
                            })(
                                <Input placeholder={'请输入任务类名'} />
                            )
                        }
                    </FormItem>
                    <FormItem label={'任务表达式'} {...this.layout}>
                        {
                            getFieldDecorator('cronExpression', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '任务表达式不能为空' }
                                ]
                            })(
                                <Input placeholder={'请输入任务表达式'} />
                            )
                        }
                    </FormItem>

                    <FormItem label={'状态'} {...this.layout}>
                        {
                            getFieldDecorator('status', {})(
                                <RadioGroup>
                                    <Radio value={1}>运行</Radio>
                                    <Radio value={2}>暂停</Radio>
                                </RadioGroup>
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
    info: PropTypes.object
};
AddModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {}
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            jobName: Form.createFormField({
                value: info['jobName'] || ''
            }),
            beanName: Form.createFormField({
                value: info['beanName'] || ''
            }),
            cronExpression: Form.createFormField({
                value: info['cronExpression'] || ''
            }),
            status: Form.createFormField({
                value: info['status'] || ''
            })
        };
    }
})(AddModal);