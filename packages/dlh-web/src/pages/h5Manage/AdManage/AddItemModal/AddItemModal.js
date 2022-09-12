import React, { Component } from 'react';
import { Modal, Form, Upload, Button, Input, Select, Icon, message, Checkbox, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from "react-intl";

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class AddItemModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadFileInfo: {}
        };
    }

    onOk = () => {
        const { form: { getFieldsValue, validateFields }, handleOk } = this.props;
        const { uploadFileInfo } = this.state;
        validateFields((err, values) => {
            if (err) {
                return;
            }

            const formData = getFieldsValue();
            if (uploadFileInfo.url) {
                formData.logoUrl = uploadFileInfo.url;
            }
            handleOk(formData);
        });
    }

    onCancel = () => {
        this.props.handleCancel();
    }

    afterClose = () => {
        this.props.form.resetFields()
        this.setState({ uploadFileInfo: {} });
        this.props.afterClose();
    }

    getUploadValueFromEvent = (e) => {
        const { file } = e;
        if (file.status === 'error') {
            if (file.response) {
                const { errorMessage } = file.response;
                message.error(errorMessage);
            } else {
                message.error('上传失败');
            }
            return [];
        }

        if (file.response) {
            const { fileName, url } = file.response;
            this.setState({ uploadFileInfo: { fileName, url } });
        }
        return [file];
    }

    renderUpLoadItem = () => {
        return (
            <Upload
                accept=".png, .jpg"
                multiple={false}
                type={'drag'}
                action={'/hs/admin/ad-manage/logo/upload'}
                listType={'picture'}
            >
                <Button> <Icon type="upload"/> <FormattedMessage id='windowPage.click.upload' /> </Button>
            </Upload>
        );
    }

    eventTagsOptions = [
        {
            label: '申请被拒',
            value: 'REJECTED'
        },
        {
            label: '拉黑',
            value: 'BLACK_LIST'
        },
        {
            label: '还款成功1次',
            value: 'REPAYMENT_1TH_TIMES'
        },
        {
            label: '还款成功2次',
            value: 'REPAYMENT_2TH_TIMES'
        },
        {
            label: '还款成功2次(含)以上',
            value: 'REPAYMENT_ABOVE_2TH_TIMES'
        },
    ];

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    render() {

        const { intl, visible, form: { getFieldDecorator } } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={this.onCancel}
                width={700}
                visible={visible}
                afterClose={this.afterClose}
                title={<FormattedMessage id='page.table.add.modify' />}
            >
                <Form>
                    <FormItem {...this.formItemLayout} label={'logo'}>
                        {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.getUploadValueFromEvent,
                            rules: [
                                { required: true, message: <FormattedMessage id='windowPage.remarks.empty'/> },
                            ],
                        })(
                            this.renderUpLoadItem()
                        )}
                    </FormItem>
                    <Form.Item {...this.formItemLayout} label={'id'} style={{ display: 'none' }}>
                        {
                            getFieldDecorator('id', {})
                            (
                                <Input/>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...this.formItemLayout} label={'logoUrl'} style={{ display: 'none' }}>
                        {
                            getFieldDecorator('logoUrl', {})
                            (
                                <Input/>
                            )
                        }
                    </Form.Item>
                    <FormItem {...this.formItemLayout} label={<FormattedMessage id='page.table.ad.appName' />}>
                        {
                            getFieldDecorator('appName', {
                                rules: [
                                    { required: true, message: <FormattedMessage id='windowPage.remarks.empty'/> },
                                ],
                            })(
                                <Input />
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={<FormattedMessage id='page.table.ad.title' />}>
                        {
                            getFieldDecorator('title', {
                                rules: [
                                    { required: true, message: <FormattedMessage id='windowPage.remarks.empty'/> },
                                ],
                            })(
                                <Input />
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={<FormattedMessage id='page.table.ad.quota' />}>
                        {
                            getFieldDecorator('quota', {
                                rules: [
                                    { required: true, message: <FormattedMessage id='windowPage.remarks.empty'/> },
                                ],
                            })(
                                <Input placeholder={'ex：1000-2000'}/>
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={<FormattedMessage id='page.table.ad.loan.success.rate' />}>
                        {
                            getFieldDecorator('successRate', {
                                rules: [
                                    { required: true, message: <FormattedMessage id='windowPage.remarks.empty'/> },
                                    {
                                        message: 'ex: 0-100',
                                        type: 'number', min: 0, max: 100,
                                        transform(value) {
                                            if (value) {
                                                return Number(value);
                                            }
                                        }
                                    }
                                ],
                            })(
                                <InputNumber min={0} max={100} formatter={value => `${value}%`} />
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={<FormattedMessage id='page.table.ad.loan.interest.rate' />}>
                        {
                            getFieldDecorator('interestRate', {
                                rules: [
                                    { required: true, message: <FormattedMessage id='windowPage.remarks.empty'/> },
                                    {
                                        message: 'ex: 0-100',
                                        type: 'number', min: 0, max: 100,
                                        transform(value) {
                                            if (value) {
                                                return Number(value);
                                            }
                                        }
                                    }
                                ],
                            })(
                                <InputNumber min={0} max={100} formatter={value => `${value}%`} />
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={<FormattedMessage id='page.table.ad.loan.terms' />}>
                        {
                            getFieldDecorator('terms', {
                                rules: [
                                    { required: true, message: <FormattedMessage id='windowPage.remarks.empty'/> },
                                    {
                                        message: 'ex: 0-999',
                                        type: 'number', min: 0, max: 999,
                                        transform(value) {
                                            if (value) {
                                                return Number(value);
                                            }
                                        }
                                    }
                                ],
                            })(
                                <InputNumber min={0} max={999} formatter={value => `${value} ${intl.formatMessage({id : "windowPage.day"})}`} />
                            )
                        }
                    </FormItem>
                    {/*<FormItem {...this.formItemLayout} label={<FormattedMessage id='page.table.ad.eventTags' />}>*/}
                    {/*    {*/}
                    {/*        getFieldDecorator('eventTags', {*/}
                    {/*            rules: [*/}
                    {/*                { required: true, message: <FormattedMessage id='windowPage.remarks.empty'/> },*/}
                    {/*            ],*/}
                    {/*        })(*/}
                    {/*           <CheckboxGroup options={this.eventTagsOptions} defaultValue={['Pear']}/>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*</FormItem>*/}
                    <FormItem {...this.formItemLayout} label={<FormattedMessage id='page.table.ad.linkUrl' />}>
                        {
                            getFieldDecorator('linkUrl', {
                                rules: [
                                    { required: true, message: <FormattedMessage id='windowPage.remarks.empty'/> },
                                ],
                            })(
                                <Input />
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={<FormattedMessage id='page.table.ad.sort' />}>
                        {
                            getFieldDecorator('sort', {
                                rules: [
                                    { required: true, message: <FormattedMessage id='windowPage.remarks.empty'/> },
                                    {
                                        message: 'ex: 0-1000',
                                        type: 'number', min: 0, max: 1000,
                                        transform(value) {
                                            if (value) {
                                                return Number(value);
                                            }
                                        }
                                    }
                                ],
                            })(
                                <InputNumber min={0} max={1000} />
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={<FormattedMessage id='page.table.ad.enabled' />}>
                        {
                            getFieldDecorator('enabled', {
                                rules: [
                                    { required: true },
                                ],
                            })(
                                <Select>
                                    <Option value="true"><FormattedMessage id='page.table.enabled' /></Option>
                                    <Option value="false"><FormattedMessage id='page.table.disabled' /></Option>
                                </Select>
                            )
                        }
                    </FormItem>

                </Form>

            </Modal>
        );
    }
}

AddItemModal.propTypes = {
    visible: PropTypes.bool,
    info: PropTypes.object,
    handleCancel: PropTypes.func,
    handleOk: PropTypes.func,
    afterClose: PropTypes.func,
};
AddItemModal.defaultProps = {
    visible: false,
    info: {},
    handleCancel() {},
    handleOk() {},
    afterClose() { }
};
export default Form.create({
    mapPropsToFields(props) {
        const { info = {} } = props;

        const initFileList = info.logoUrl ? [{
            uid: -1,
            name: '',
            url: info.logoUrl
        }] : [];
        return {
            upload: Form.createFormField({
                value: initFileList
            }),
            id: Form.createFormField({
                value: info['id']
            }),
            logoUrl: Form.createFormField({
                value: info['logoUrl']
            }),
            appName: Form.createFormField({
                value: info['appName']
            }),
            timeUnit: Form.createFormField({
                value: info['appName']
            }),
            title: Form.createFormField({
                value: info['title']
            }),
            quota: Form.createFormField({
                value: info['quota']
            }),
            successRate: Form.createFormField({
                value: info['successRate']
            }),
            interestRate: Form.createFormField({
                value: info['interestRate']
            }),
            terms: Form.createFormField({
                value: info['terms']
            }),
            // eventTags: Form.createFormField({
            //     value: info['eventTags']
            // }),
            linkUrl: Form.createFormField({
                value: info['linkUrl']
            }),
            enabled: Form.createFormField({
                value: info['enabled'] ? 'true' : 'false'
            }),
            sort: Form.createFormField({
                value: info['sort']
            })
        }
    },
    onFieldsChange(props, fields) {
        // console.log(fields);
    }
})(injectIntl(AddItemModal));
