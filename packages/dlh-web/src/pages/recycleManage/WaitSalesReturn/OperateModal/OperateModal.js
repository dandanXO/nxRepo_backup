import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio } from 'antd';
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

class CheckModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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

    render() {
        const { form: { getFieldDecorator }, visible, handleCancel } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={500}
                visible={visible}
                title={'处理'}
            >
                <Form>
                    <Form.Item {...formItemLayout} label={'快递公司'}>
                        {
                            getFieldDecorator('refundExpressCompany', {
                                initialValue: "",
                                rules: [
                                    { required: true, message: '请输入快递公司名称' }
                                ]
                            })(
                                <Input placeholder={'请输入快递公司名称'}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'快递单号'}>
                        {
                            getFieldDecorator('refundExpressNo', {
                                initialValue: "",
                                rules: [
                                    { required: true, message: '请输入快递单号' }
                                ]
                            })(
                                <Input placeholder={'请输入快递单号'}/>
                            )
                        }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

CheckModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    info: PropTypes.object
};
CheckModal.defaultProps = {
    visible: false,
    handleCancel(){},
    handleOk(){},
    info: {}
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            refundExpressCompany: Form.createFormField({
                value: info['company'] || ''
            }),
            refundExpressNo: Form.createFormField({
                value: info['number'] || ''
            })
        };
    }
})(CheckModal);