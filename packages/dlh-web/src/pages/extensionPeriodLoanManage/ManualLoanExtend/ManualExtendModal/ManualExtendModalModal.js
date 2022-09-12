import React, { Component } from 'react';
import { Modal, Form,Input} from 'antd';
import PropTypes from 'prop-types';
import InputNumber from "antd/lib/input-number";
import {injectIntl} from "react-intl";

const FormItem = Form.Item;

class ManualExtendModalModal extends Component{
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
        this.state = {};
    }

    onOk = () => {
        const { handleOk, form: { getFieldsValue } } = this.props;
        handleOk(getFieldsValue());
    }


    render() {
        const { visible, form: { getFieldDecorator }, info, handleCancel , intl} = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={600}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.manual.extend.period"})}
            >
                <Form>
                    <FormItem label={intl.formatMessage({id : "page.search.list.name"})} {...this.layout}>
                        {
                            <div>{info['userTrueName'] || ''}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.search.list.mobile"})} {...this.layout}>
                        {
                            <div>{info['userPhone'] || ''}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.table.contract.amount"})} {...this.layout}>
                        {
                            <div>{info['deviceMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.late.fee"})} {...this.layout}>
                        {
                            <div>{info['overDueMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.table.reduce.amount"})} {...this.layout}>
                        {
                            <div>{info['reductionMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.table.amount.paid"})} {...this.layout}>
                        {
                            <div>{info['hadPaidMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.extend.order.expire.time"})} {...this.layout}>
                        {
                            <div>{ info['lengOrderExpireDate'] || ''}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.amount.current.pending"})} {...this.layout}>
                        {
                            <div>{info['remainderMoney'] || 0}</div>
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.extend.fee"})} {...this.layout}>
                        {
                            getFieldDecorator('totalMoney', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.extend.fee.empty"})}
                                ]
                            })(
                                <InputNumber placeholder={intl.formatMessage({id : "windowPage.extend.fee.enter"})} />
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
ManualExtendModalModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    intl: PropTypes.object.isRequired,
};
ManualExtendModalModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {}
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            totalMoney: Form.createFormField({
                value: info['totalMoney'] || ''
            })
        };
    }
})(injectIntl(ManualExtendModalModal));