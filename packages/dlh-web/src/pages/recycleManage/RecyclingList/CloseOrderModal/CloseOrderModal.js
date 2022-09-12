import React, { Component } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class CloseOrderModal extends Component{
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

    renderReason = () => {
        const { refuseReason } = this.props;
        return refuseReason.map((item, index) => <Option value={item.value} key={index}>{item.value}</Option>)
    }

    render() {
        const { visible, form: { getFieldDecorator }, handleCancel } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={500}
                visible={visible}
                title={'关闭物流信息'}
            >
                <Form>
                    <FormItem label={'选择原因'} {...this.layout}>
                        {
                            getFieldDecorator('refusedReason', {})(
                                <Select>
                                    {this.renderReason()}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label={'备注'} {...this.layout}>
                        {
                            getFieldDecorator('refusedRemark', {
                                initialValue:''
                            })(
                                <TextArea rows={5} placeholder={'请输入备注'}/>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
CloseOrderModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    refuseReason: PropTypes.array
};
CloseOrderModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {
        refusedRemark: ''
    },
    refuseReason: []
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {}, refuseReason } = props;
        const isArr = Array.isArray(refuseReason) && refuseReason.length > 0;
        return {
            refusedReason: Form.createFormField({
                value: isArr ? refuseReason[0].value : ''
            }),
            refusedRemark: Form.createFormField({
                value: info['refusedRemark'] || ''
            })
        };
    }
})(CloseOrderModal);