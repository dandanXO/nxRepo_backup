import {Form, FormInstance, Input, Radio, Select, Switch} from "antd";
import React, {CSSProperties, useCallback, useEffect, useMemo} from "react";
import {useForm} from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

import {RiskManageModel, RiskModelMenu} from "../api/RiskApi";
import {FormResponseData} from "../pages/RiskSettingPage";
import {Store} from "@reduxjs/toolkit";
import {NumberValidator} from "../../shared/utils/validator";


interface RiskSettingFormProps {
    isEdit: boolean;
    id?: number;
    form: FormInstance;


    initialValues: Store;
    onFieldsChange: (changedFields: any, allFields: any) => void;
    onFinish: () => void;
    onFinishFailed: () => void;
    onValuesChange: (changedFields, allFields) => void;
    currentRiskMenuData: Array<RiskModelMenu>;
}

const CustomLabel = (props: {style?: CSSProperties, children: string}) => <div style={{ marginRight: 8, width: 178, height: 32, lineHeight: "32px", display: "inline-block", ...props.style}}>{props.children}</div>
const RiskSettingForm = (props: RiskSettingFormProps) => {


    // NOTE:
    return (
        <Form
            name="control-hooks"
            form={props.form}
            initialValues={props.initialValues}
            labelAlign={"right"}
            labelWrap={false}
            layout={"horizontal"}
            // 当字段被删除时保留字段值
            preserve={true}
            // 提交失败自动滚动到第一个错误字段
            scrollToFirstError={true}
            onFieldsChange={props.onFieldsChange}
            onFinish={props.onFinish}
            onFinishFailed={props.onFinishFailed}
            onValuesChange={props.onValuesChange}
        >
            <Form.Item label="风控名称" name="modelName" rules={[{ required: true }]}>
                <Input placeholder="风控名称"/>
            </Form.Item>

            <Form.Item label={"風控应用"} name="riskModelName" rules={[{ required: true }]}>
                <Select placeholder={"选择"}>
                    {props.currentRiskMenuData && props.currentRiskMenuData.map((risk, index) => {
                        return (
                            <Select.Option key={index} value={risk.id}>{risk.riskModelName}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>

            <Form.Item label={"新客分数"} required>
                {["极好", "良好", "正常", "普通", "拒绝"].map((levelTag, index) => {
                    return (
                        <Form.Item key={index}>
                            {index === 0 && (
                                <div>
                                    <CustomLabel style={{ width: 76}}>風控標籤</CustomLabel>
                                    <CustomLabel>風控商等級</CustomLabel>
                                    <CustomLabel>初始借款額度</CustomLabel>
                                </div>
                            )}
                            <Input.Group compact>
                                {props.isEdit && (
                                    <Form.Item name={["firstLoan", index, "id"]}  style={{ display: "none" }}>
                                        <Input/>
                                    </Form.Item>
                                )}
                                <Form.Item style={{ margin: '0 8px 0 0', width: 76 }}>
                                    <Input placeholder={levelTag} disabled/>
                                </Form.Item>

                                <Form.Item name={["firstLoan", index, "providerRank"]} style={{ margin: '0 8px 0 0' }}
                                           rules={[{
                                               required: true,
                                               message: "请输入值"
                                           }]}
                                >
                                    <Input placeholder={"值"}/>
                                </Form.Item>

                                <Form.Item name={["firstLoan", index, "balance"]} style={{ margin: '0 8px 0 0' }}
                                           rules={[
                                               {
                                                   validator: async (_, value) =>NumberValidator(_, value)({
                                                       required: true,
                                                       requiredErrorMessage: "请输入可借额度",
                                                   })
                                               },
                                           ]}
                                >
                                    <Input placeholder={"可借额度"}/>
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    )
                })}
            </Form.Item>

            <Form.Item label={"复借分数"} required>
                {["极好", "良好", "正常", "普通", "拒绝"].map((levelTag, index) => {
                    return (
                        <Form.Item key={index}>
                            {index === 0 && (
                                <div>
                                    <CustomLabel style={{ width: 76}}>風控標籤</CustomLabel>
                                    <CustomLabel>風控商等級</CustomLabel>
                                    <CustomLabel>初始借款額度</CustomLabel>
                                </div>
                            )}
                            <Input.Group compact>
                                {props.isEdit && (
                                    <Form.Item name={["repeatLoan", index, "id"]} style={{ display: "none" }}>
                                        <Input/>
                                    </Form.Item>
                                )}

                                <Form.Item style={{ margin: '0 8px 0 0', width: 76 }}>
                                    <Input placeholder={levelTag} disabled/>
                                </Form.Item>

                                <Form.Item name={["repeatLoan", index, "providerRank"]} style={{ margin: '0 8px 0 0' }}
                                           rules={[{
                                               required: true,
                                               message: "请输入值"
                                           }]}
                                >
                                    <Input placeholder={"值"}/>
                                </Form.Item>

                                <Form.Item name={["repeatLoan", index, "balance"]} style={{ margin: '0 8px 0 0' }}
                                           rules={[
                                               {
                                                   validator: async (_, value) =>NumberValidator(_, value)({
                                                       required: true,
                                                       requiredErrorMessage: "请输入可借额度",
                                                   })
                                               },
                                           ]}
                                >
                                    <Input placeholder={"可借额度"}/>
                                </Form.Item>

                            </Input.Group>
                        </Form.Item>
                    )
                })}
            </Form.Item>

            <Form.Item label={"借款金额"} name="useRcQuota">
                <Radio.Group>
                    <Radio value={false}>风控返回</Radio>
                    <Radio value={true}>系统规则</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label={"状态"} name={"enabled"} valuePropName={"checked"}>
                <Switch checkedChildren={"启用"} unCheckedChildren={"停用"}></Switch>
            </Form.Item>

            <Form.Item label={"备注"} name="remark">
                <TextArea placeholder={"备注"}/>
            </Form.Item>
        </Form>
    )
}

export default RiskSettingForm;
