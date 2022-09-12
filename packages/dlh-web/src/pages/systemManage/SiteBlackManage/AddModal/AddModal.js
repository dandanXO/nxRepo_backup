import React, { Component } from 'react';
import { Modal, Form,Input, Radio } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AddModal extends Component{
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

    onOk = () => {
        const { handleOk, form: { getFieldsValue } } = this.props;
        handleOk(getFieldsValue());
    }


    render() {
        const { visible, form: { getFieldDecorator }, handleCancel, intl } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={600}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.modify.loan.website"})}
            >
                <Form>
                    <FormItem label={intl.formatMessage({id : "page.search.list.website.name"})} {...this.layout}>
                        {
                            getFieldDecorator('siteName', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "page.table.website.name.empty"})}
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id : "page.search.list.website.name.enter"})} />
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.search.list.website.domain"})} {...this.layout}>
                        {
                            getFieldDecorator('siteDomain', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "page.table.website.domain.empty"}) }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id : "page.table.website.domain.empty.example"})} />
                            )
                        }
                    </FormItem>

                    <FormItem label={intl.formatMessage({id : "page.search.list.status"})} {...this.layout}>
                        {
                            getFieldDecorator('status', {})(
                                <RadioGroup>
                                    <Radio value={1}><FormattedMessage id="page.table.disabled" /></Radio>
                                    <Radio value={2}><FormattedMessage id="page.table.enabled" /></Radio>
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
    info: PropTypes.object,
    intl: PropTypes.object.isRequired,
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
            siteName: Form.createFormField({
                value: info['siteName'] || ''
            }),
            siteDomain: Form.createFormField({
                value: info['siteDomain'] || ''
            }),
            status: Form.createFormField({
                value: info['status'] || ''
            })
        };
    }
})(injectIntl(AddModal));