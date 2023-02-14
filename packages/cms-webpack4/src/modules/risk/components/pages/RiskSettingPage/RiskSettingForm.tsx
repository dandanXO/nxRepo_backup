import { Form, FormInstance, Input, Radio, Select, Switch, Tooltip ,Space} from "antd";
import React from "react";
import TextArea from "antd/es/input/TextArea";
import {AdminForm} from "../../../../shared/components/atoms/AdminForm";
import {Store} from "antd/es/form/interface"
import {RiskModelMenu} from "../../../domain/vo/RiskModelMenu";
import { CustomAntFormFieldError } from "../../../../shared/utils/validation/CustomAntFormFieldError";
import RepeatLoanSection from "./RepeatLoanSection";
import FirstLoanSection from "./FirstLoanSection";
interface RiskSettingFormProps {
    isEdit: boolean;
    id?: number;
    form: FormInstance;
    initialValues: Store;
    onFieldsChange: (changedFields: any, allFields: any) => void;
    onFinish: () => void;
    currentRiskMenuData: Array<RiskModelMenu>;
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<Object>>;
}

const RiskSettingForm = (props: RiskSettingFormProps) => {
    // NOTE:
    return (
        <AdminForm
            form={props.form}
            initialValues={props.initialValues}
            onFieldsChange={props.onFieldsChange}
            onFinish={props.onFinish}
        >
            <Form.Item
                label="风控名称"
                name="modelName"
                rules={[{ required: true }]}
                extra={
                    '设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。'
                }
            >
                <Input placeholder="风控名称" disabled={props.isEdit} />
            </Form.Item>

            <Form.Item
                label={'风控应用'}
                name="riskModelName"
                rules={[{ required: true }]}
            >
                <Select placeholder={'选择'}>
                    {props.currentRiskMenuData &&
                        props.currentRiskMenuData.map((risk, index) => {
                            return (
                                <Select.Option key={index} value={risk.id}>
                                    {risk.riskModelName}
                                </Select.Option>
                            );
                        })}
                </Select>
            </Form.Item>

            <FirstLoanSection
                isEdit={props.isEdit}
                customAntFormFieldError={props.customAntFormFieldError}
                setCustomAntFormFieldError={props.setCustomAntFormFieldError}
                form={props.form}

            />
            <RepeatLoanSection
                isEdit={props.isEdit}
                customAntFormFieldError={props.customAntFormFieldError}
                setCustomAntFormFieldError={props.setCustomAntFormFieldError}
                form={props.form}
            />

            <Form.Item
                label={'状态'}
                name={'enabled'}
                valuePropName={'checked'}
            >
                <Switch
                    checkedChildren={'启用'}
                    unCheckedChildren={'停用'}
                ></Switch>
            </Form.Item>

            <Form.Item label={'备注'} name="remark">
                <TextArea placeholder={'备注'} />
            </Form.Item>
        </AdminForm>
    );
}

export default RiskSettingForm;
