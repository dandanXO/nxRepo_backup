import React, { Component } from 'react';
import { Modal, Form, Input, Switch } from 'antd';
import PropTypes from 'prop-types';

const labelLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

class DeviceModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible
        };
    }

    onOk = () => {
        const { form: { getFieldsValue }, handleOk } = this.props;
        const paramsObj = getFieldsValue();
        // console.log(paramsObj)
        handleOk(paramsObj);
    }
    onCancel = () => {
        // this.setState({ visible: false });
        this.props.handleCancel();
    }

    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        if(visible !== this.props.visible) {
            this.setState({ visible });
        }
    }

    // componentDidUpdate(prevProps) {
    //     const { formData } = prevProps;
    //     if(JSON.stringify(formData) !== JSON.stringify(this.props.formData)) {
    //         setFieldsValue(this.props.formData);
    //     }
    // }

    render() {
        // const { visible } = this.;
        const { visible, form: { getFieldDecorator }, formData: { deviceType, memoryNum, maxAmount, isUse }} = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={this.onCancel}
                width={'400px'}
                confirmLoading={false}
                visible={visible}
                title={'设备'}
            >
                <div>
                    <Form>
                        <Form.Item {...labelLayout} label={'设备型号'}>
                            {
                                getFieldDecorator('deviceType', {
                                    initialValue: deviceType
                                })(
                                    <Input placeholder={'请输入设备型号'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...labelLayout} label={'闪存大小'}>
                            {
                                getFieldDecorator('memoryNum', {
                                    initialValue: memoryNum
                                })(
                                    <Input placeholder={'请输入闪存大小'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...labelLayout} label={'最大额度'}>
                            {
                                getFieldDecorator('maxAmount', {
                                    initialValue: maxAmount
                                })(
                                    <Input placeholder={'请输入最大额度'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...labelLayout} label={'是否启动'}>
                            {
                                getFieldDecorator('isUse', {
                                    valuePropName: 'checked',
                                    initialValue: isUse
                                })(
                                    <Switch checkedChildren="开" unCheckedChildren="关" />
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        );
    }
}
DeviceModal.propTypes = {
    visible: PropTypes.bool,
    formData: PropTypes. object,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func
};
DeviceModal.defaultProps = {
    visible: false,
    formData: {
        deviceType: '',
        memoryNum: '',
        maxAmount: '',
        isUse: false
    },
    handleCancel(){},
    handleOk(){}
};

export default Form.create({
    mapPropsToFields(props){
        return {
            deviceType: Form.createFormField({
                value: props.formData.deviceType
            }),
            memoryNum: Form.createFormField({
                value: props.formData.memoryNum
            }),
            maxAmount: Form.createFormField({
                value: props.formData.maxAmount
            }),
            isUse: Form.createFormField({
                value: props.formData.isUse
            })
        }
    }
})(DeviceModal);