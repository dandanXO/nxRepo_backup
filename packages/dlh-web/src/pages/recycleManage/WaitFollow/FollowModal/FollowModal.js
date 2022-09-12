import React, { Component } from 'react';
import { Modal, Form, Radio, Input } from 'antd';
import PropTypes from 'prop-types';

const RadioGroup = Radio.Group;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
class FollowModal extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    onOk = () => {
        const { handleOk, form: { getFieldsValue } } = this.props;
        handleOk(getFieldsValue());
    }

    render() {
        const { form: { getFieldDecorator }, handleCancel, visible, isShowRadio } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={400}
                visible={visible}
                title={'处理'}
            >
                <Form>
                    <Form.Item {...formItemLayout} label={'操作'}>
                        {
                            getFieldDecorator('customerDealStatus', {})(
                                <RadioGroup>
                                    {
                                        isShowRadio && <Radio value={'6'}>提交放款</Radio>
                                    }
                                    <Radio value={'5'}>退货/提交催收</Radio>
                                </RadioGroup>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={'备注'}>
                        {
                            getFieldDecorator('customerDealRemak', {
                                initialValue: ''
                            })(
                               <TextArea rows={5} placeholder={'备注'}/>
                            )
                        }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

FollowModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    info: PropTypes.object,
    isShowRadio: PropTypes.bool
};
FollowModal.defaultProps = {
    visible: false,
    handleCancel(){},
    handleOk(){},
    info: {},
    isShowRadio: true
};
export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            customerDealStatus: Form.createFormField({
                value: info['operator']
            }),
            customerDealRemak: Form.createFormField({
                value: info['remark'] || ''
            })
        };
    }
})(FollowModal);
