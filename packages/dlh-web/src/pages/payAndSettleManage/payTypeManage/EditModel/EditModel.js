import React, { Component } from 'react';
import { Form, Modal, Input } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";


const { TextArea } = Input;

class EditModel extends Component{
    layout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
           span: 18
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
                title={intl.formatMessage({id : "windowPage.add.modify.repayment.type"})}>
                <div>
                    <Form>
                        <Form.Item label={intl.formatMessage({id : "windowPage.payment.method"})} {...this.layout}>
                            {
                                getFieldDecorator('typeName', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "windowPage.payment.method.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.payment.method.alias"})} {...this.layout}>
                            {
                                getFieldDecorator('typeAlias', {
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"})}]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "windowPage.payment.method.alias.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.remarks"})} {...this.layout}>
                            {
                                getFieldDecorator('typeNote', {
                                    rules: [{ required: false, message: '' }]
                                })(
                                    <TextArea rows={2}/>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        );
    }

}

EditModel.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    intl: PropTypes.object.isRequired,
};
EditModel.defaultProps = {
    visible: false,
    handleOk: () => {},
    handleCancel: () =>{},
    info: {
        typeName: '',
        typeAlias: '',
        typeNote: ''
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            typeName: Form.createFormField({
                value: info['typeName']
            }),
            typeAlias: Form.createFormField({
                value: info['typeAlias']
            }),
            typeNote: Form.createFormField({
                value: info['typeNote']
            })
        }
    }
})(injectIntl(EditModel));