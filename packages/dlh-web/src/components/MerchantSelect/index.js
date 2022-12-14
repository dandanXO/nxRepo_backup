import React from "react";
import {Select} from "antd";
const Option = Select.Option;
import {FormattedMessage} from "react-intl";

export const MerchantSelect = ({allMerchants}) => {
  const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
  const options = [
    <Option value={''} key={''}>
      <FormattedMessage id="page.search.list.no.restrict" />
    </Option>
  ].concat(ele);
  return (
    <Select>
      {options}
    </Select>
  )
};
