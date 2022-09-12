import React, { useEffect, useState } from 'react';
import { Form ,Input } from 'antd';
import { injectIntl, FormattedMessage } from "react-intl";

import PropTypes from 'prop-types';
const FormItem = Form.Item;
const defaultLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}
function FormInputNumber({ intl,form, label, field, required, type, min, max, placeholder, editing, layout={...defaultLayout}, scale }) {

    const errorText = {
        number: <FormattedMessage id="windowPage.number" />,
        float: <FormattedMessage id="windowPage.decimal" values={{ scale: scale }} />
    }

    const regexText = {
        number: /^(\-|\+)?\d*$/,
        float: min < 0 ? `^(\\-?\\d+)(\\.\\d{0,${scale}})?$` : `^(\\d+)(\\.\\d{0,${scale}})?$`
    }


    return (
        <FormItem {...layout} label={intl.formatMessage({ id: label })}>
            {form.getFieldDecorator(field, {
                rules: [
                    { required: required, message: required ? "不能为空" : "" },
                    {
                        asyncValidator: (rule, value) => {
                            return new Promise((resolve, reject) => {
                                if (!new RegExp(regexText[type]).test(value) || value < min || value > max) {
                                    reject("");
                                } else {
                                    resolve();
                                }
                            });
                        },
                        message: min && max
                            ? <FormattedMessage id="windowPage.money.enter.range" values={{ min: min, max: max, text: errorText[type] }} />
                            : <FormattedMessage id={"windowPage.money.enter"} values={{ text: errorText[type] }} />,
                        transform (value) {
                            if (value || value === 0) {
                                return Number(value);
                            }
                        },
                    },
                ],
                normalize: (value) => {
                    if (isNaN(value) || value === " ") {
                        return value === " " ? "" : value;
                    }
                    if (value || value === 0) {
                        return type === "number" ? Number(value) : value;
                    }
                },
            })(<Input disabled={editing} placeholder={placeholder ? intl.formatMessage({ id: placeholder }) : ""} />)}
        </FormItem>
    );
}
FormInputNumber.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default injectIntl(FormInputNumber);