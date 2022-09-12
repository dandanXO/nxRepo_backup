import React, { useEffect, useState } from 'react';
import { Form ,Input } from 'antd';
import { injectIntl, FormattedMessage } from "react-intl";

import PropTypes from 'prop-types';
const FormItem = Form.Item;
const defaultLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}
function FormInput ({ intl, form, label = "", field = "", required = false, placeholder, editing = false, layout = { ...defaultLayout } }) {
    return (
        <FormItem {...layout} label={intl.formatMessage({ id: label })}>
            {
                form.getFieldDecorator(field, {
                    initialValue: '',
                    rules: [{ required: required, message: required ? intl.formatMessage({ id: "windowPage.remarks.empty" }) : '' }]
                })(
                    <Input disabled={editing} placeholder={placeholder ? intl.formatMessage({ id: placeholder }) : ""} />
                )
            }
        </FormItem>

    )
}
FormInput.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default injectIntl(FormInput);