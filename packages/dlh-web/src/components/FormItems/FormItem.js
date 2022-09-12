import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import FormInputNumber from "./FormInputNumber";
import FormInput from "./FormInput";
import FormSwitch from "./FormSwitch";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";
import PropTypes from "prop-types";

function FormItem ({ type, ...props }) {
 
    return type === "input"? <FormInput {...props} />
         : type === "number" || type === "float" ? <FormInputNumber type={type}  {...props} />
         : type === "switch"? <FormSwitch {...props}  />
         : type === "select"? <FormSelect {...props}  />
         : <FormTextArea {...props}  />;
}
FormItem.PropTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(FormItem);
