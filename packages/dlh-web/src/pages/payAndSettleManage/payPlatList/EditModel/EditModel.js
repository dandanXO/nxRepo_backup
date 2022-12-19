import React, { Component } from 'react';
import { Form, Modal, Input, TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";

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
        const { visible, form: { getFieldDecorator }, allPayTypeList, intl ,info} = this.props;

        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={intl.formatMessage({id :"windowPage.add.modify.repayment.platform"})}>
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
                        {info.platClass === '' && <Form.Item label={intl.formatMessage({ id: "page.search.list.platform.type" })} {...this.layout}>
                            {
                                getFieldDecorator('platClass', {
                                    rules: [{ required: true, message: intl.formatMessage({ id: "windowPage.remarks.empty" }) }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({ id: "page.search.list.platform.type.enter" })} />
                                )
                            }
                        </Form.Item>}
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
                        <Form.Item label={intl.formatMessage({id : "windowPage.payment.method"})} {...this.layout}>
                        {
                            getFieldDecorator('payTypeIds', {})(
                                <TreeSelect
                                    treeDataSimpleMode={{ rootPId: 0 }}
                                    treeData={allPayTypeList}
                                    treeCheckable={true}
                                    showCheckedStrategy={TreeSelect.SHOW_ALL}
                                    allowClear={true}
                                    dropdownStyle={{ height: '300px' }}
                                    searchPlaceholder={intl.formatMessage({id : "windowPage.select.support.repayment.method"})}

                                />
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
        platName: '',
        platClass: '',
        reqGateway: '',
        payGateway: '',
        payTypeList: '',
        payTypeIds: []
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
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
            payTypeList: Form.createFormField({
                value: info['payTypeList']
            }),
            payTypeIds: Form.createFormField({
                value: info['payTypeIds'] ||[]
            })
        }
    }
})(injectIntl(EditModel));