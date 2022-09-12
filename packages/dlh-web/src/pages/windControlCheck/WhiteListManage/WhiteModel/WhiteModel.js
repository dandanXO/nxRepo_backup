import React, { Component } from 'react';
import { Form, Modal, Input, Radio, Select } from 'antd';
import PropTypes from 'prop-types';
import TextArea from 'antd/lib/input/TextArea';
import { injectIntl, FormattedMessage } from "react-intl";

class WhiteModel extends Component {
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
        this.state = { confirmLoading: false };
    }

    handleOk = () => {
        const { form: { getFieldsValue, validateFields }, handleOk } = this.props;
        const _this = this;
        validateFields((err) => {
            if (err) {
                return;
            }
            this.setState({ confirmLoading: true })
            handleOk(getFieldsValue(), ()=> _this.setState({ confirmLoading: false }));
        })
    }

    handleCancel = () => {
        this.props.handleCancel();
        this.setState({ confirmLoading: false })
    }

    render() {
        const { confirmLoading } = this.state;
        const { visible, form: { getFieldDecorator }, intl } = this.props;
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                confirmLoading={confirmLoading}
                title={intl.formatMessage({ id: "page.table.add.modify" })}>
                <div>
                    <Form>
                        {/*<Form.Item label={intl.formatMessage({id : "page.search.list.name"})} {...this.layout}>
                            {
                                getFieldDecorator('userTrueName', {
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "page.table.batch.name.enter"})}/>
                                )
                            }
                        </Form.Item>*/}
                        <Form.Item label={intl.formatMessage({ id: "windowPage.mobile" })} {...this.layout}>
                            {
                                getFieldDecorator('phoneNo', {
                                    rules: [ { required: true, message: intl.formatMessage({ id: "windowPage.remarks.empty" }) } ]
                                })(
                                    <Input placeholder={intl.formatMessage({ id: "page.table.batch.mobile.enter" })}/>
                                )
                            }
                        </Form.Item>
                        {/* <Form.Item label={'身份证号'} {...this.layout}>
                            {
                                getFieldDecorator('idcardNo', {
                                })(
                                    <Input placeholder={'请输入身份证号'}/>
                                )
                            }
                        </Form.Item> */}
                        {/* <Form.Item label={'备注'} {...this.layout}>
                            {
                                getFieldDecorator('reason', {
                                })(
                                    <Input placeholder={'请输入备注'}/>
                                )
                            }
                        </Form.Item> */}
                        <Form.Item label={intl.formatMessage({ id: "page.table.batch.add" })} {...this.layout}>
                            {
                                getFieldDecorator('reason', {})(
                                    <TextArea rows={10} placeholder={intl.formatMessage({ id: "page.table.batch.add.format" })}/>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        );
    }

}

WhiteModel.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    intl: PropTypes.object.isRequired,
};
WhiteModel.defaultProps = {
    visible: false,
    handleOk: () => {
    },
    handleCancel: () => {
    },
    info: {
        userTrueName: '',
        phoneNo: '',
    }
};

export default Form.create({
    mapPropsToFields(props) {
        const { info = {} } = props;
        return {
            /*name: Form.createFormField({
                value: info['userTrueName'] || ''
            }),*/
            url: Form.createFormField({
                value: info['phoneNo'] || ''
            }),
            modelName: Form.createFormField({
                value: info['idcardNo'] || ''
            }),
            enabled: Form.createFormField({
                value: info['reason'] || ''
            })
        }
    }
})(injectIntl(WhiteModel));