import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio, InputNumber } from 'antd';
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

class CheckModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: this.props.info['success'] || '3'
        };
    }

    onOk = () => {
        const { handleOk, form: { getFieldsValue } } = this.props;
        handleOk(getFieldsValue());
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ selectValue: value });
    }
    afterClose = () => {
        this.setState({ selectValue: '3' });
    }
    render() {
        const { form: { getFieldDecorator }, visible, info, handleCancel } = this.props;
        const maxData = info['money'] ? Number(info['money']) : 0;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={500}
                afterClose={this.afterClose}
                visible={visible}
                title={'质检结果'}
            >
                <Form>
                    <Form.Item {...formItemLayout} label={'操作'}>
                        {
                            getFieldDecorator('status', {
                                initialValue: '3'
                            })(
                                <RadioGroup onChange={this.handleChange}>
                                    <Radio value={'3'}>质检通过</Radio>
                                    <Radio value={'4'}>质检不通过</Radio>
                                </RadioGroup>
                            )
                        }
                    </Form.Item>
                    {
                        Number(this.state.selectValue) === 3 ? (
                            <Form.Item {...formItemLayout} label={'支付尾款'}>
                                {
                                    getFieldDecorator('restMoney', {
                                        initialValue: maxData
                                    })(
                                        <InputNumber max={maxData} min={0} precision={2} />
                                    )
                                }
                            </Form.Item>
                        ) : null
                    }

                    <Form.Item {...formItemLayout} label={'备注'}>
                        {
                            getFieldDecorator('inspectRemark', {
                                initialValue: ""
                            })(
                                <TextArea placeholder={'备注'} rows={5}/>
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
            status: Form.createFormField({
                value: info['success'] || '3'
            }),
            restMoney: Form.createFormField({
                value: Number(info['money']) || 0
            }),
            inspectRemark: Form.createFormField({
                value: info['remark'] || ''
            }),
        };
    }
})(CheckModal);



