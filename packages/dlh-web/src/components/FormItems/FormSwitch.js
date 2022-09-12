import React, { useEffect, useState } from 'react';
import { Form, Switch } from 'antd';
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from 'prop-types';
const FormItem = Form.Item;

const defaultLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

function FormSwitch ({ intl, form, label = "", field = "", required = false, editing = false, layout = { ...defaultLayout }, value, size = "default" }) {

    return (
        <FormItem {...layout} label={intl.formatMessage({ id: label })}>
            {
                form.getFieldDecorator(field, {
                    valuePropName: 'checked',
                    initialValue: value,
                    rules: [{ required: required }]
                })(
                    <Switch checkedChildren="ON" unCheckedChildren="OFF" size={size} />
                )
            }
        </FormItem>
    )
}
FormSwitch.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default injectIntl(FormSwitch);