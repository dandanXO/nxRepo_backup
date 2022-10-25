import Form from "antd/es/form";
import {AdminForm, AdminFormProps} from "../../../../../shared/components/AdminForm";
import {Input} from "antd/es";
import {Alert, Divider, Select, Switch, Typography} from "antd";
const { Text } = Typography;

import React from "react";

type ChannelSettingFormProps = {
    isEdit: boolean;
    id?: number;
} & AdminFormProps;

export const ChannelSettingForm = (props: ChannelSettingFormProps) => {

    return (
        <AdminForm
            form={props.form}
            initialValues={props.initialValues}
            onFieldsChange={props.onFieldsChange}
            onFinish={props.onFinish}
        >
            <Form.Item label="渠道名称" name={"name"} required
                       validateStatus={(props.customAntFormFieldError?.name as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.name as any)?.help}
            >
                <Input placeholder={"渠道名称"}/>
            </Form.Item>

            <Form.Item label="PackgeID" name={"packageId"} required
                       validateStatus={(props.customAntFormFieldError?.packageId as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.packageId as any)?.help}
                       extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder={"PackgeID"}/>
            </Form.Item>

            <Form.Item label="渠道链接" name={"url"} required
                       validateStatus={(props.customAntFormFieldError?.url as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.url as any)?.help}
                       extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder={"渠道链接"}/>
            </Form.Item>

            <Form.Item label="风控方案" name="modelName"  rules={[{ required: true }]} >
                <Select
                    placeholder="选择"
                    // onChange={this.onGenderChange}
                    allowClear
                >
                    {/*{props?.merchantList?.map((i) => <Option key={i.merchantId} value={i.merchantId}>{i.name}</Option>)}*/}
                </Select>
            </Form.Item>

            <Form.Item label="包名" name={"appName"} required
                       validateStatus={(props.customAntFormFieldError?.appName as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.appName as any)?.help}
                       extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder={"包名"}/>
            </Form.Item>

            <Form.Item label="配置标签" name="publishId" rules={[{ required: true }]}
                       extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Select
                    placeholder="选择"
                    // onChange={this.onGenderChange}
                    allowClear
                >
                    {/*{props?.merchantList?.map((i) => <Option key={i.merchantId} value={i.merchantId}>{i.name}</Option>)}*/}
                </Select>
            </Form.Item>


            <Form.Item label="状态" name="enabled" valuePropName="checked">
                <Switch checkedChildren="启用" unCheckedChildren="停用"/>
            </Form.Item>

            <Alert
                message="启用、停用说明"
                description={
                    <div>
                        <div>1. 渠道状态为【停用】时，参数配置{'>'}渠道禁止注册配置中<Text strong>增加</Text>本渠道id，<Text strong>限制</Text>渠道注册。</div>
                        <div>2. 渠道状态为【启用】时，参数配置{'>'}渠道禁止注册配置中<Text strong>移除</Text>本渠道id，<Text strong>不限制</Text>渠道注册。</div>
                        <div>3. 以上功能<Text strong>修改渠道时</Text>才有效。</div>
                    </div>
                }
                type="info"
                showIcon
            />



        </AdminForm>
    )
}
