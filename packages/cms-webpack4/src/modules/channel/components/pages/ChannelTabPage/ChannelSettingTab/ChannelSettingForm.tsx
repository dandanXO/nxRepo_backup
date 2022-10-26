import Form from "antd/es/form";
import {AdminForm, AdminFormProps} from "../../../../../shared/components/AdminForm";
import {Input} from "antd/es";
import {Alert, Divider, Select, Switch, Typography} from "antd";
const { Text } = Typography;
const { Option } = Select;

import React from "react";
import {RiskDropMenu} from "../../../../api/dto/RiskDropMenu";
import {ChannelTagDropMenu} from "../../../../api/dto/ChannelTagDropMenu";

type ChannelSettingFormProps = {
    isEdit: boolean;
    id?: number;
} & AdminFormProps & {
    dataForAllRiskDropMenuData: RiskDropMenu[];
    dataForAllChannelSettingTagDropMenuData: ChannelTagDropMenu[];
};

export const ChannelSettingForm = (props: ChannelSettingFormProps) => {

    return (
        <AdminForm
            form={props.form}
            initialValues={props.initialValues}
            onFieldsChange={props.onFieldsChange}
            onFinish={props.onFinish}
        >
            <Form.Item label="渠道名称" name={"name"} rules={[{ required: true }]}
                       // validateStatus={(props.customAntFormFieldError?.name as any)?.validateStatus}
                       // help={(props.customAntFormFieldError?.name as any)?.help}
            >
                <Input placeholder={"渠道名称"}/>
            </Form.Item>

            <Form.Item label="PackgeID" name={"packageId"} rules={[{ required: true }]}
                       // validateStatus={(props.customAntFormFieldError?.packageId as any)?.validateStatus}
                       // help={(props.customAntFormFieldError?.packageId as any)?.help}
                       extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder={"PackgeID"} disabled={props.isEdit}/>
            </Form.Item>

            <Form.Item label="渠道链接" name={"url"} rules={[{ required: true }]}
                       // validateStatus={(props.customAntFormFieldError?.url as any)?.validateStatus}
                       // help={(props.customAntFormFieldError?.url as any)?.help}
                       extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder={"渠道链接"} disabled={props.isEdit}/>
            </Form.Item>

            <Form.Item label="风控方案" name="modelId"  rules={[{ required: true }]} >
                <Select placeholder="选择">
                    {props.dataForAllRiskDropMenuData?.map((menuData, index) => {
                        return <Option key={index} value={menuData.id}>{menuData.modelName}</Option>
                    })}
                </Select>
            </Form.Item>

            <Form.Item label="包名" name={"appName"} rules={[{ required: true }]}
                       // validateStatus={(props.customAntFormFieldError?.appName as any)?.validateStatus}
                       // help={(props.customAntFormFieldError?.appName as any)?.help}
                       extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder={"包名"} disabled={props.isEdit}/>
            </Form.Item>

            <Form.Item label="配置标签" name="publishId" rules={[{ required: true }]}
                       extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Select placeholder="选择" disabled={props.isEdit}>
                    {props.dataForAllChannelSettingTagDropMenuData?.map((menuData, index) => {
                        return <Option key={index} value={menuData.id}>{menuData.name}</Option>
                    })}
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
