import { Form, FormInstance, Input, Radio, Select, Switch, Tooltip ,Space} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React, {CSSProperties} from "react";
import TextArea from "antd/es/input/TextArea";

import {NumberValidator} from "../../../../shared/utils/validation/validator";
import {AdminForm} from "../../../../shared/components/AdminForm";
import {Store} from "antd/es/form/interface"
import {RiskModelMenu} from "../../../domain/vo/RiskModelMenu";
import FirstAndRepeatLoanFormByValue from "./FirstAndRepeatLoanFormByValue";
import FirstAndRepeatLoanFormByRange from "./FirstAndRepeatLoanFormByRange";
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
            <Form.Item label="风控名称" name="modelName" rules={[{ required: true }]}
                       extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder="风控名称" disabled={props.isEdit}/>
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
            {/* <Form.Item label={"分数类型"} name="riskType" required >
                <Radio.Group>
                    <Radio value={'value'}>值</Radio>
                    <Radio value={'range'}>范围</Radio>
                    <Radio value={'count'}>
                        <Space>
                            依还款笔数
                            <Tooltip title="依成功还款笔数决定最高可借额度">
                                <InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} />
                            </Tooltip>
                        </Space>
                    </Radio>
                </Radio.Group>
            </Form.Item> */}

            <FirstAndRepeatLoanFormByValue isEdit={props.isEdit}/>
            {/* <FirstAndRepeatLoanFormByRange isEdit={props.isEdit}/> */}
           

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
