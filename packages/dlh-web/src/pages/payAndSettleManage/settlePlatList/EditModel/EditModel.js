import React, { Component } from 'react';
import { Form, Modal, Input, TreeSelect,Tooltip } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

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
        const { form: { getFieldsValue, validateFields }, handleOk} =  this.props;
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
        const { visible,info, form: { setFieldsValue,getFieldDecorator }, intl } = this.props;
        // console.dir(getFieldsValue());
        // setFieldsValue('sortNum',info.sortNum+'');
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={intl.formatMessage({id : "Add/Modify Substitue Payment Platform"})}>
                <div>
                    <Form>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.platform.name"})} {...this.layout}>
                            {
                                getFieldDecorator('platName', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "page.search.list.platform.anme.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.platform.type"})} {...this.layout}>
                            {
                                getFieldDecorator('platClass', {
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "page.search.list.platform.type.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.request.gateway.address"})} {...this.layout}>
                            {
                                getFieldDecorator('reqGateway', {
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "windowPage.request.gateway.address.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.repayment.gateway.address"})} {...this.layout}>
                            {
                                getFieldDecorator('payGateway', {
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "windowPage.repayment.gateway.address.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.table.max.value"})} {...this.layout}>
                            {
                                getFieldDecorator('maxMoney', {
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.enter.correct.value"}),whitespace: false,
                                        type:'number',max:'999999999',min:'0',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "page.table.max.value"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.table.min.value"})} {...this.layout}>
                            {
                                getFieldDecorator('minMoney', {
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.enter.correct.value"}),whitespace: false,
                                        type:'number',max:'999999999',min:'0',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "page.table.min.value"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.table.priority"})} {...this.layout}>
                            {
                                getFieldDecorator('sortNum', {
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.enter.correct.value"}),whitespace: false,
                                        type:'number',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "windowPage.enter.priority.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.attention"})} {...this.layout}>
                            <span style={{color:'red'}}><FormattedMessage id="windowPage.higer.num.high.priority" /></span>
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
        platName: '',
        platClass: '',
        reqGateway: '',
        payGateway: '',
        maxMoney: '',
        minMoney: '',
        sortNum: ''
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            'sortNum': Form.createFormField({
                value: info['sortNum'] + ''
            }),
            platName: Form.createFormField({
                value: info['platName']
            }),
            platClass: Form.createFormField({
                value: info['platClass']
            }),
            reqGateway: Form.createFormField({
                value: info['reqGateway']
            }),
            payGateway: Form.createFormField({
                value: info['payGateway']
            }),
            maxMoney: Form.createFormField({
                value: info['maxMoney'] || 9999999.99
            }),
            minMoney: Form.createFormField({
                value: info['minMoney'] || 0.00
            })
        }
    }
})(injectIntl(EditModel));