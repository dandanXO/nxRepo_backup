import React, { Component } from 'react';
import { Modal, Form, Select, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import styles from './BlackModals.less';
import {axios} from "utils";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
let _this = null;
class BlackModal extends Component{
    layout = {
        labelCol: {
            span: 7
        },
        wrapperCol: {
            span: 17
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.intl.formatMessage({id : "windowPage.captcha.code"}),
            disabled: false,
            
        };
        this.timer = null;
        _this = this;
    }


    componentDidMount() {
     

    }



    onOk = () => {
        const { handleOk, form: { getFieldsValue, validateFields } } = this.props;
        validateFields((err) => {
            if(err) {
                return;
            }
            handleOk(getFieldsValue());
        });
    }

    render() {
        const { visible, form: { getFieldDecorator }, handleCancel, intl } = this.props;
        const { disabled,text } = this.state;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={600}
                visible={visible}
                title={intl.formatMessage({id : "page.table.add.blacklist"})}
                okText ={intl.formatMessage({id : "page.table.ok"})}
                cancelText={intl.formatMessage({id : "page.table.cancel"})}
            >
                <Form>

                    <FormItem label={intl.formatMessage({id : "windowPage.remarks"})} {...this.layout}>
                        {
                            getFieldDecorator('refundReason', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }
                                ]
                            })(
                                <TextArea rows={4}/>
                            )
                        }
                    </FormItem>
                </Form>


            </Modal>
        );
    }
}
BlackModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    intl: PropTypes.object.isRequired,
};
BlackModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {},
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            refundReason: Form.createFormField({
                value: info['refundReason'] || ''
            }),
        };
    }
})(injectIntl(BlackModal));