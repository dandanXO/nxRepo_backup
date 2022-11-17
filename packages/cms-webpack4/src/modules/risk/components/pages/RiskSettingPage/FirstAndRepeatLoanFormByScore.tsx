import { Form, FormInstance, Input, Radio, Select, Switch, Tooltip, Space } from "antd";
import CustomLabel from "../../../../shared/components/CustomLabel";
import {NumberValidator} from "../../../../shared/utils/validation/validator";
import { CustomAntFormFieldError } from "../../../../shared/utils/validation/CustomAntFormFieldError";

interface FormProps{
    isEdit:boolean;
    customAntFormFieldError:CustomAntFormFieldError;
    type?:string;
}

function FirstAndRepeatLoanFormByScore(props:FormProps) {

    return <>
            {["极好", "良好", "正常", "普通", "拒绝"].map((levelTag, index) => {
                return (
                    <Form.Item key={index}>
                        {index === 0 && (
                            <div>
                                <CustomLabel style={{ width: 76 }}>风控标签</CustomLabel>
                                <CustomLabel style={{ width: 88 }}>最大值</CustomLabel>
                                <CustomLabel style={{ width: 76 }}>最小值</CustomLabel>
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

                            <Form.Item style={{ margin: '0 8px 0 0', width: 170 }}>
                                <Form.Item name={[props.type, index, "max"]} style={{ margin: '0 8px 0 0', width: 72, display: 'inline-block' }}
                                    validateStatus={(props.customAntFormFieldError?.[`${props.type}_max_${index}`] as any)?.validateStatus}
                                    help={(props.customAntFormFieldError?.[`${props.type}_max_${index}`] as any)?.help}
                                    rules={[{ required: true, message: "请输入值" }]}
                                >
                                    <Input placeholder={"值"} />
                                </Form.Item>
                                <Form.Item style={{ display: 'inline-block', margin: '0 8px 0 0' }}>-</Form.Item>
                                <Form.Item name={[props.type, index, "min"]} style={{ margin: '0', width: 72, display: 'inline-block' }}
                                    validateStatus={(props.customAntFormFieldError?.[`${props.type}_min_${index}`] as any)?.validateStatus}
                                    help={(props.customAntFormFieldError?.[`${props.type}_min_${index}`] as any)?.help}
                                    rules={[{ required: true, message: "请输入值" }]}
                                >
                                    <Input placeholder={"值"} />
                                </Form.Item>
                            </Form.Item>

                            <Form.Item name={[props.type, index, "loanCount"]} style={{ margin: '0 8px 0 0', width: 110 }}
                                validateStatus={(props.customAntFormFieldError?.[`${props.type}_loanCount_${index}`] as any)?.validateStatus}
                                help={(props.customAntFormFieldError?.[`${props.type}_loanCount_${index}`] as any)?.help}
                                rules={[{ required: true, message: "请输入笔数" }]}
                            >
                                <Input placeholder={"笔数"} />
                            </Form.Item>

                            <Form.Item name={[props.type, index, "balance"]} style={{ margin: '0 8px 0 0', width: 110 }}
                                validateStatus={(props.customAntFormFieldError?.[`${props.type}_balance_${index}`] as any)?.validateStatus}
                                help={(props.customAntFormFieldError?.[`${props.type}_balance_${index}`] as any)?.help}
                                rules={[{ required: true, message: "请输入最高可借总额" }]}
                            >
                                <Input placeholder={"最高可借总额"} />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                )
            })}
    </>

}

export default FirstAndRepeatLoanFormByScore;
