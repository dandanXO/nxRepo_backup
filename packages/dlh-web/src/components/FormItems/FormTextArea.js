import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const { TextArea } = Input;
const defaultLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}
function FormTextArea ({ intl, form, label = "", field = "", required = false, placeholder, editing = false, minRows,maxRows=20, layout = { ...defaultLayout } }) {

    return (
        <FormItem {...layout} label={intl.formatMessage({ id: label })}>
            {
                form.getFieldDecorator(field, {
                    initialValue: '',
                    rules: [{ required: required, message: required ? '不能为空' : '' }]
                })(
                    <TextArea  autoSize={{ minRows: minRows, maxRows: maxRows }} disabled={editing} placeholder={placeholder ? intl.formatMessage({ id: placeholder }) : ""}  />
                )
            }
        </FormItem>

    )
}
FormTextArea.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default injectIntl(FormTextArea);