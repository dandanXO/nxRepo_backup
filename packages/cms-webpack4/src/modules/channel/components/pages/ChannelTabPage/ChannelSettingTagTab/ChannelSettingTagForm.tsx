import Form from "antd/es/form";
import {AdminForm, AdminFormProps} from "../../../../../shared/components/AdminForm";
import {Input} from "antd/es";
import {Divider} from "antd";
import React from "react";

type ChannelSettingTagFormProps = {
    isEdit: boolean;
    id?: number;
} & AdminFormProps;

export const ChannelSettingTagForm = (props: ChannelSettingTagFormProps) => {

    return (
        <AdminForm
            form={props.form}
            initialValues={props.initialValues}
            onFieldsChange={props.onFieldsChange}
            onFinish={props.onFinish}
            onFinishFailed={props.onFinishFailed}
            onValuesChange={props.onValuesChange}
        >
            <Form.Item label="渠道配置标签" name={"name"} required>
                <Input placeholder={"渠道配置标签"}/>
            </Form.Item>

            <Divider orientation="left">GP上架用配置</Divider>

            <Form.Item label="测试登录帳號" name={"auditAcc"} required>
                <Input placeholder={"测试登录帳號 10 碼"}/>
            </Form.Item>

            <Form.Item label="测试登录验证码" name={"auditAccOtpCode"} required>
                <Input placeholder={"测试登录验证码 6 码"}/>
            </Form.Item>

            <Divider orientation="left">广告审核配置</Divider>

            <Form.Item label="本金" name={"auditLoanAmount"} required>
                <Input placeholder={"本金"}/>
            </Form.Item>

            <Form.Item label="服务费" name={"auditServiceFee"} required>
                <Input placeholder={"服务费"}/>
            </Form.Item>

            <Form.Item label="利息" name={"auditTaxFee"} required>
                <Input placeholder={"利息"}/>
            </Form.Item>

            <Form.Item label="天数" name={"auditTerm"} required>
                <Input placeholder={"天数"}/>
            </Form.Item>

            <Form.Item label="订单额度" name={"auditQuota"} required>
                <Input placeholder={"订单额度"}/>
            </Form.Item>




        </AdminForm>
    )
}
