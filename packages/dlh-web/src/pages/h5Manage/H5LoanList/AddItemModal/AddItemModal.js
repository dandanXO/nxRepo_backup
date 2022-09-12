import React, { Component } from 'react';
import { Modal, Form, Upload, Button, Input, Select, Icon, message } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const FormItem = Form.Item;
const Option = Select.Option;

class AddItemModal extends Component{
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    constructor(props) {
        super(props);
        this.state = {};
    }
    onOk = () => {
        const { form: { getFieldsValue, validateFields }, handleOk } = this.props;
        validateFields((err, values) => {
           if(err) {
               return;
           }
           handleOk(getFieldsValue());
        });
    }

    getToken = () => {
        const { getToken } = this.props;
        getToken();
    }

    normFile = (e) => {
        const { file } = e;
        if(file.status === 'error') {
            message.error(this.props.intl.formatMessage({id : "windowPage.upload.failed"}));
            return [];
        }
        return [file];
    }

    renderUpLoadItem = () => {
        const { uploadType , fileInfo } = this.props;
        if(uploadType === 'qiniu') {
            return (
                <Upload
                    action={'http://up.qiniup.com'}
                    listType="text"
                    data={fileInfo}
                >
                    <Button onClick={this.getToken}>
                        <Icon type="upload" /> <FormattedMessage id="windowPage.click.upload" />
                    </Button>
                </Upload>
            );
        }else if(uploadType === 'localOss') {
            return (
                <Upload
                    action={'/hs/admin/loanPlatform/ossUploadImg'}
                    listType="text"
                    data={fileInfo}
                >
                    <Button onClick={this.getToken}>
                        <Icon type="upload" /> <FormattedMessage id="windowPage.click.upload" />
                    </Button>
                </Upload>
            );
        }else{
            return (
                <Upload
                    action={'/hs/admin/loanPlatform/ossUploadImg'}
                    listType="text"
                    data={fileInfo}
                >
                    <Button onClick={this.getToken}>
                        <Icon type="upload" /> <FormattedMessage id="windowPage.click.upload" />
                    </Button>
                </Upload>
                );
        }
    }

    render() {
        const { visible, handleCancel, form: { getFieldDecorator }, intl} = this.props;
        const rateSelector = getFieldDecorator('rateUnit', {
            initialValue: intl.formatMessage({id : "page.table.dates"}),
        })(
            <Select style={{ width: 70 }}>
                <Option value="日"><FormattedMessage id="page.table.dates" /></Option>
                <Option value="月"><FormattedMessage id="windowPage.month" /></Option>
            </Select>
        );
        const timeSelector = getFieldDecorator('timeUnit', {
            initialValue: intl.formatMessage({id : "page.table.mins"}),
        })(
            <Select style={{ width: 70 }}>
                <Option value="分钟"><FormattedMessage id="page.table.mins" /></Option>
                <Option value="小时"><FormattedMessage id="page.table.hour" /></Option>
                <Option value="天"><FormattedMessage id="windowPage.day" /></Option>
            </Select>
        );

        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={600}
                visible={visible}
                afterClose={this.props.afterClose}
                title={intl.formatMessage({id : "page.table.add.modify"})}
            >
                <Form>
                    <FormItem {...this.formItemLayout} label={intl.formatMessage({id : "windowPage.upload.logo"})}>
                        {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            rules: [
                                { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) },
                            ],
                        })(
                            this.renderUpLoadItem()
                        )}
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={intl.formatMessage({id : "page.table.product.name"})} >
                        {
                            getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) },
                                ],
                            })(
                                <Input placeholder={intl.formatMessage({id : "page.table.product.name.enter"})}/>
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={intl.formatMessage({id : "page.table.subtitle"})} >
                        {
                            getFieldDecorator('description', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) },
                                ],
                            })(
                                <Input placeholder={intl.formatMessage({id : "Please enter subtitle"})}/>
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={intl.formatMessage({id : "page.table.amount.range"})} >
                        {
                            getFieldDecorator('money', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) },
                                ],
                            })(
                                <Input placeholder={intl.formatMessage({id : "page.table.amount.range.format"})}/>
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={intl.formatMessage({id : "page.table.reference.rate"})} >
                        {
                            getFieldDecorator('rate', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) },
                                ],
                            })(
                                <Input addonAfter={rateSelector}/>
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={intl.formatMessage({id : "page.table.loan.times"})} >
                        {
                            getFieldDecorator('time', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) },
                                ],
                            })(
                                <Input addonAfter={timeSelector}/>
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={intl.formatMessage({id : "page.table.jump.link"})} >
                        {
                            getFieldDecorator('url', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) },
                                ],
                            })(
                                <Input placeholder={intl.formatMessage({id : "page.table.jump.link.enter"})}/>
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={intl.formatMessage({id : "page.table.display.status"})} >
                        {
                            getFieldDecorator('status', {
                                required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"})
                            })(
                                <Select>
                                    <Option value="1"><FormattedMessage id="windowPage.on.shelf" /></Option>  
                                    <Option value="0"><FormattedMessage id="windowPage.off.shelf" /></Option>  
                                </Select>   
                            )
                        }
                    </FormItem>
                    <FormItem {...this.formItemLayout} label={intl.formatMessage({id : "page.table.display.types"})} >
                        {
                            getFieldDecorator('type', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) },
                                ],
                            })(
                                <Select>
                                    <Option value="1"><FormattedMessage id="windowPage.pass" /></Option>
                                    <Option value="2"><FormattedMessage id="windowPage.unqualified" /></Option>
                                    {/* <Option value="3">未通过</Option> */}
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
    handleCancel: PropTypes.func,
    getToken: PropTypes.func,
    fileInfo: PropTypes.object,
    info: PropTypes.object,
    handleOk: PropTypes.func,
    fieldsHandleChange: PropTypes.func,
    afterClose: PropTypes.func,
    uploadType:PropTypes.string,
    intl: PropTypes.object.isRequired,

};
AddItemModal.defaultProps = {
    visible: false,
    handleCancel(){},
    getToken(){},
    fileInfo: {},
    info: {},
    handleOk(){},
    fieldsHandleChange(){},
    afterClose(){}
};
export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            rateUnit: Form.createFormField({
                ...info['rateUnit'],
                value: info['rateUnit'].value
            }),
            timeUnit: Form.createFormField({
                ...info['timeUnit'],
                value: info['timeUnit'].value
            }),
            upload: Form.createFormField({
                ...info['fileList'],
                value: info['fileList'].value
            }),
            name: Form.createFormField({
                ...info['name'],
                value: info['name'].value
            }),
            description: Form.createFormField({
                ...info['description'],
                value: info['description'].value
            }),
            money: Form.createFormField({
                ...info['money'],
                value: info['money'].value
            }),
            rate: Form.createFormField({
                ...info['rate'],
                value: info['rate'].value
            }),
            time: Form.createFormField({
                ...info['time'],
                value: info['time'].value
            }),
            url: Form.createFormField({
                ...info['url'],
                value: info['url'].value
            }),
            status: Form.createFormField({
                ...info['status'],
                value: info['status'].value + ''
            }),
            type: Form.createFormField({
                ...info['type'],
                value: info['type'].value + ''
            })
        }
    },
    onFieldsChange(props, fields){
        const { fieldsHandleChange } = props;
        // console.log(fields)
        // const keys = Object.keys(fields);
        // const newFields = keys.map(item => {
        //     return item === 'upload' ? { fileList: fields[item] } : { [item]: fields[item] };
        // })
        let newFields = {};
        for(let key in fields) {
            if(key === 'upload') {
                newFields['fileList'] = fields[key];
            } else {
                newFields[key] = fields[key];
            }

        }
        // const key = keys[0];
        // const obj = {
        //     [key]: fields[key]['value']
        // };
        // if(key === 'upload') {
        //     const val = obj['upload'];
        //     if(Array.isArray(val) && val.length > 0) {
        //         if(val[0]['status'] === 'done') {
        //             fieldsHandleChange(fields);
        //         }
        //         return;
        //     }
        // }

        fieldsHandleChange(newFields);
    }
})(injectIntl(AddItemModal));
