import { Form, FormInstance, Input, Radio, Select, Switch, Tooltip, Space } from "antd";
import CustomLabel from "./CustomLabel";
import {NumberValidator} from "../../../../shared/utils/validation/validator";
import { CustomAntFormFieldError } from "../../../../shared/utils/validation/CustomAntFormFieldError";
interface FormProps{
    isEdit:boolean;
    customAntFormFieldError:CustomAntFormFieldError;
    type?:string;
}

function FirstAndRepeatLoanFormByRange(props:FormProps) {

    return <>
            {["极好", "良好", "正常", "普通", "拒绝"].map((levelTag, index) => {
                return (
                 
                    <Form.Item key={index} style={{ margin: '0' }}>
                        {index === 0 && (
                            <div>
                                <CustomLabel style={{ width: 76 }}>风控标签</CustomLabel>
                                <CustomLabel style={{ width: 88 }}>最大值</CustomLabel>
                                <CustomLabel style={{ width: 72 }}>最小值</CustomLabel>
                                <CustomLabel style={{ width: 110 }}>最高可放款笔数</CustomLabel>
                                <CustomLabel style={{ width: 110 }}>最高可借总额</CustomLabel>
                            </div>
                        )}
                        <Input.Group compact>
                            {props.isEdit && (
                                <Form.Item name={[props.type, index, "id"]} style={{ display: "none" }}>
                                    <Input />
                                </Form.Item>
                            )}
                            <Form.Item style={{ margin: '0 8px 0 0', width: 76 }}>
                                <Input placeholder={levelTag} disabled />
                            </Form.Item>

                            <Form.Item  style={{margin: '0 8px 0 0', width: 170 }}
                                help={(props.customAntFormFieldError?.[`${props.type}_max_${index}`] as any)?.help}
                                validateStatus={(props.customAntFormFieldError?.[`${props.type}_max_${index}`] as any)?.validateStatus}
                            >
                                <Form.Item name={[props.type, index, "max"]} style={{ margin: '0 8px 0 0', width: 72, display: 'inline-block' }}
                                    rules={[
                                        {
                                            validator: async (_, value) => NumberValidator(_, value)({
                                                required: true,
                                                requiredErrorMessage: "请输入值",
                                                min: 0,
                                                minMessage: "请输入大于0的整数"
                                            })
                                        },
                                    ]}
                                    validateStatus={(props.customAntFormFieldError?.[`${props.type}_max_${index}`] as any)?.validateStatus}
                                >
                                    <Input placeholder={"值"} />
                                </Form.Item>
                                <Form.Item style={{ display: 'inline-block', margin: '0 8px 0 0' }}>-</Form.Item>
                                <Form.Item name={[props.type, index, "min"]} style={{ margin: '0', width: 72, display: 'inline-block' }}
                                    rules={[
                                        {
                                            validator: async (_, value) => NumberValidator(_, value)({
                                                required: true,
                                                requiredErrorMessage: "请输入值",
                                                min: 0,
                                                minMessage: "请输入大于0的整数"
                                            })
                                        },
                                    ]}
                                    validateStatus={(props.customAntFormFieldError?.[`${props.type}_max_${index}`] as any)?.validateStatus}
                                >
                                    <Input placeholder={"值"} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item name={`${props.type}_${index}`} style={{marginRight: '8px', width: 110 }}
                                help={(props.customAntFormFieldError?.[`${props.type}_loanCount_${index}`] as any)?.help}
                                validateStatus={(props.customAntFormFieldError?.[`${props.type}_loanCount_${index}`] as any)?.validateStatus}
                            >
                                <Form.Item name={[props.type, index, "loanCount"]} style={{ margin: '0 8px 0 0', width: 110 }}
                                 validateStatus={(props.customAntFormFieldError?.[`${props.type}_loanCount_${index}`] as any)?.validateStatus}
                                    rules={[
                                        {
                                            validator: async (_, value) => NumberValidator(_, value)({
                                                required: true,
                                                requiredErrorMessage: "请输入笔数",
                                                min: 0,
                                                minMessage: "请输入大于0的整数"
                                            })
                                        },
                                    ]}
                                >
                                    <Input placeholder={"笔数"} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item name={`${props.type}_${index}`} style={{marginRight: '8px', width: 110 }}
                                help={(props.customAntFormFieldError?.[`${props.type}_balance_${index}`] as any)?.help}
                                validateStatus={(props.customAntFormFieldError?.[`${props.type}_balance_${index}`] as any)?.validateStatus}
                            >
                                <Form.Item name={[props.type, index, "balance"]} style={{ margin: '0 8px 0 0', width: 110 }}
                                 validateStatus={(props.customAntFormFieldError?.[`${props.type}_balance_${index}`] as any)?.validateStatus}
                                    rules={[
                                        {
                                            validator: async (_, value) => NumberValidator(_, value)({
                                                required: true,
                                                requiredErrorMessage: "请输入最高可借总额",
                                                min: 0,
                                                minMessage: "请输入大于0的整数"
                                            })
                                        },
                                    ]}
                                >
                                    <Input placeholder={"最高可借总额"} />
                                </Form.Item>
                            </Form.Item>

                        </Input.Group>
                    </Form.Item>
                )
            })}
    </>

}

export default FirstAndRepeatLoanFormByRange;
