import {Form, FormInstance, Input, Radio, Select, Switch} from "antd";
import React, {CSSProperties} from "react";
import TextArea from "antd/es/input/TextArea";

import {NumberValidator} from "../../../../shared/utils/validation/validator";
import {AdminForm} from "../../../../shared/components/AdminForm";
import {Store} from "antd/es/form/interface"
import {RiskModelMenu} from "../../../api/dto/RiskModelMenu";
interface RiskSettingFormProps {
    isEdit: boolean;
    id?: number;

    form: FormInstance;
    initialValues: Store;
    onFieldsChange: (changedFields: any, allFields: any) => void;
    onFinish: () => void;
    currentRiskMenuData: Array<RiskModelMenu>;
}

const CustomLabel = (props: {style?: CSSProperties, children: string}) => <div style={{ marginRight: 8, width: 178, height: 32, lineHeight: "32px", display: "inline-block", ...props.style}}>{props.children}</div>

const RiskSettingForm = (props: RiskSettingFormProps) => {
    // NOTE:
    return (
        <AdminForm
            form={props.form}
            initialValues={props.initialValues}
            onFieldsChange={props.onFieldsChange}
            onFinish={props.onFinish}
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
                                    <CustomLabel style={{ width: 76}}>风控标签</CustomLabel>
                                    <CustomLabel>风控商等级</CustomLabel>
                                    <CustomLabel>最高可放款笔数</CustomLabel>
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

                                <Form.Item name={["firstLoan", index, "loanCount"]} style={{ margin: '0 8px 0 0' }}
                                           rules={[
                                               {
                                                   validator: async (_, value) =>NumberValidator(_, value)({
                                                       required: true,
                                                       requiredErrorMessage: "请输入笔数",
                                                   })
                                               },
                                           ]}
                                >
                                    <Input placeholder={"笔数"}/>
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
                                    <CustomLabel style={{ width: 76}}>风控标签</CustomLabel>
                                    <CustomLabel>风控商等级</CustomLabel>
                                    <CustomLabel>最高可放款笔数</CustomLabel>
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

                                <Form.Item name={["repeatLoan", index, "loanCount"]} style={{ margin: '0 8px 0 0' }}
                                           rules={[
                                               {
                                                   validator: async (_, value) =>NumberValidator(_, value)({
                                                       required: true,
                                                       requiredErrorMessage: "请输入笔数",
                                                   })
                                               },
                                           ]}
                                >
                                    <Input placeholder={"笔数"}/>
                                </Form.Item>

                            </Input.Group>
                        </Form.Item>
                    )
                })}
            </Form.Item>

            <Form.Item label={"放款笔数"} name="useRcQuota" required>
                <Radio.Group>
                    <Radio value={true}>依照风控</Radio>
                    <Radio value={false}>系统规则</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label={"状态"} name={"enabled"} valuePropName={"checked"}>
                <Switch checkedChildren={"启用"} unCheckedChildren={"停用"}></Switch>
            </Form.Item>

            <Form.Item label={"备注"} name="remark">
                <TextArea placeholder={"备注"}/>
            </Form.Item>
        </AdminForm>
    )
}

export default RiskSettingForm;
