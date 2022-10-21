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
        >
            <Form.Item label="渠道配置标签" name={"name"} required
                       validateStatus={(props.customAntFormFieldError?.name as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.name as any)?.help}
            >
                <Input placeholder={"渠道配置标签"}/>
            </Form.Item>

            <Divider orientation="left">GP上架用配置</Divider>

            <Form.Item label="测试登录帳號" name={"auditAcc"} required
                       validateStatus={(props.customAntFormFieldError?.auditAcc as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.auditAcc as any)?.help}
            >
                <Input placeholder={"登录帐号为您的电话号码"}/>
            </Form.Item>

            <Form.Item label="测试登录验证码" name={"auditAccOtpCode"} required
                       validateStatus={(props.customAntFormFieldError?.auditAccOtpCode as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.auditAccOtpCode as any)?.help}
            >
                <Input placeholder={"请输入6码验证码"}/>
            </Form.Item>

            <Divider orientation="left">广告审核配置</Divider>

            <Form.Item label="本金" name={"auditLoanAmount"} required
                       validateStatus={(props.customAntFormFieldError?.auditLoanAmount as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.auditLoanAmount as any)?.help}
            >
                <Input placeholder={"本金"}/>
            </Form.Item>

            <Form.Item label="服务费" name={"auditServiceFee"} required
                       validateStatus={(props.customAntFormFieldError?.auditServiceFee as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.auditServiceFee as any)?.help}
            >
                <Input placeholder={"服务费"}/>
            </Form.Item>

            <Form.Item label="税额" name={"auditTaxFee"} required
                       validateStatus={(props.customAntFormFieldError?.auditTaxFee as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.auditTaxFee as any)?.help}
            >
                <Input placeholder={"税额"}/>
            </Form.Item>

            <Form.Item label="天数" name={"auditTerm"} required
                       validateStatus={(props.customAntFormFieldError?.auditTerm as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.auditTerm as any)?.help}
            >
                <Input placeholder={"天数"} suffix={"days"}/>
            </Form.Item>

            <Form.Item label="订单额度" name={"auditQuota"} required
                       validateStatus={(props.customAntFormFieldError?.auditQuota as any)?.validateStatus}
                       help={(props.customAntFormFieldError?.auditQuota as any)?.help}
            >
                <Input placeholder={"订单额度"}/>
            </Form.Item>




        </AdminForm>
    )
}
