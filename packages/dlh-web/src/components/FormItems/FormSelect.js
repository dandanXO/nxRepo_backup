import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from 'prop-types';
const FormItem = Form.Item;

const defaultLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}
function FormSelect ({ intl, form, label = "", field = "", required = false, editing = false, layout = { ...defaultLayout } ,value,renderOptions}) {

    return (
        <FormItem {...layout} label={intl.formatMessage({ id: label })}>
            {
                form.getFieldDecorator(field, {
                    initialValue: value,
                    rules: [{ required: required }]
                })(
                    <Select>
                        {renderOptions()}
                    </Select>
                )
            }
        </FormItem>

    )
}
// function FormSelect ({ intl, form, label = "", field = "", required = false, editing = false, layout = { ...defaultLayout } ,renderOptions}) {
// console.log(renderOptions)
//     return (
//         <FormItem {...layout} label={intl.formatMessage({ id: label })}>
//             {
//                 form.getFieldDecorator(field, {
//                     initialValue: '',
//                     rules: [{ required: required }]
//                 })(
//                     <Select>
//                         {/* {options()} */}
//                     </Select>
//                 )
//             }
//         </FormItem>

//     )
// }
FormSelect.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default injectIntl(FormSelect);