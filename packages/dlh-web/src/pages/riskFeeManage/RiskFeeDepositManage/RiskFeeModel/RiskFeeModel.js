import React, { Component } from 'react';
import { Form, Modal, Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import TextArea from 'antd/lib/input/TextArea';


class RiskFeeModel extends Component{
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
                width={500}
                visible={visible}
                title={'风控费用充值'}>
                <div>
                    <Form>
                        <Form.Item label={'充值金额'} {...this.layout}>
                            {
                                getFieldDecorator('tradeAmount', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <InputNumber min={1} precision={2} max={1000000}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'备注'} {...this.layout}>
                            {
                                getFieldDecorator('remark', {
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <TextArea rows={4} placeholder={'请输入备注'}/>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        );
    }

}

RiskFeeModel.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object
};
RiskFeeModel.defaultProps = {
    visible: false,
    handleOk: () => {},
    handleCancel: () =>{},
    info: {
        tradeAmount: '',
        remark: ''
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            name: Form.createFormField({
                value: info['tradeAmount'] || ''
            }),
            url: Form.createFormField({
                value: info['remark'] || ''
            })
        }
    }
})(RiskFeeModel);