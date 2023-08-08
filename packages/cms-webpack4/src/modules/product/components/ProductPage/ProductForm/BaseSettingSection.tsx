import { Form, Input } from 'antd';
import { Select } from 'antd';
import React from 'react';

import { GetAvailableMerchantResponse } from '../../../service/product/response/getAvailableMerchantResponse';

const { Option } = Select;

interface BaseSettingSectionProps {
    merchantList?: GetAvailableMerchantResponse[];
    isEdit: boolean;
}
const BaseSettingSection = (props: BaseSettingSectionProps): JSX.Element => {
    if (!props.merchantList) return null;
    // console.log("props.merchantList", props.merchantList);

    return (
        <React.Fragment>
            <Form.Item name="merchantId" label="商户名" rules={[{ required: true }]}>
                <Select placeholder="商户名" allowClear>
                    {props?.merchantList?.map((i) => (
                        <Option key={i.merchantId} value={i.merchantId}>
                            {i.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="productName" label="产品名" rules={[{ required: true }]}>
                <Input allowClear placeholder="产品名" />
            </Form.Item>

            {/*// NOTICE: 後端移除*/}
            {/*<Form.Item name="adminUsername" label="用户名">*/}
            {/*  <Input allowClear disabled={props.isEdit}/>*/}
            {/*</Form.Item>*/}

            {/*// NOTICE: 後端移除*/}
            {/*<Form.Item name="adminPassword" label="登入密码" rules={[{ required: !props.isEdit }]}>*/}
            {/*  <Input.Password allowClear placeholder="登入密码"/>*/}
            {/*</Form.Item>*/}
        </React.Fragment>
    );
};

export default BaseSettingSection;
