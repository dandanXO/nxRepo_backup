import { Form, FormInstance, Input, Radio, Select, Switch, Tooltip, Space } from "antd";
import CustomLabel from "./CustomLabel";
import { NumberValidator } from "../../../../shared/utils/validation/validator";
import { CustomAntFormFieldError } from "../../../../shared/utils/validation/CustomAntFormFieldError";
import { InfoCircleOutlined } from "@ant-design/icons";
interface FormProps {
    isEdit: boolean;
    customAntFormFieldError: CustomAntFormFieldError;
    type?: string;
}

function FirstAndRepeatLoanFormByCount(props: FormProps) {
    return <>
        {["极好", "良好", "正常", "普通", "拒绝"].map((levelTag, index) => {
            return (
                <Form.Item key={index} style={{ margin: '0' }}>
                    {index === 0 && (
                        <div>
                            <CustomLabel style={{ width: 76 }}>风控标签</CustomLabel>
                            <CustomLabel style={{ width: 140 }}>
                                <Space>还款笔数
                                    <Tooltip title="「拒绝」等级的校验规则为“最大逾期天数大于n天”时">
                                        <InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} />
                                    </Tooltip>
                                </Space>
                            </CustomLabel>
                            <CustomLabel style={{ width: 120 }}>最高可放款笔数</CustomLabel>
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

                        <Form.Item style={{ marginRight: '8px' }}
                            help={(props.customAntFormFieldError?.[`${props.type}_${index}`] as any)?.help}
                            validateStatus={(props.customAntFormFieldError?.[`${props.type}_repaymentCount_${index}`] as any)?.validateStatus}
                        >
                            <Form.Item name={[props.type, index, index === 4 ? "overdueDaysReject" : "repaymentCount"]} style={{ margin: '0 8px 0 0', width: 130 }}
                                validateStatus={(props.customAntFormFieldError?.[`${props.type}_repaymentCount_${index}`] as any)?.validateStatus}
                                rules={[
                                    {
                                        validator: async (_, value) => NumberValidator(_, value)({
                                            required: true,
                                            requiredErrorMessage: `请输入${index === 4 ? "超過逾期天数" : "笔数"}`,
                                            min: 0,
                                        }),
                                    },
                                ]}
                            >
                                <Input placeholder={index === 4 ? "超過逾期天数" : "笔数"} suffix={index === 4 ? "天" : ""} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item style={{ marginRight: '8px' }}
                            help={(props.customAntFormFieldError?.[`${props.type}_${index}`] as any)?.help}
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
                                        })
                                    },
                                ]}
                            >
                                <Input placeholder={"笔数"} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item style={{ marginRight: '8px' }}
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
                                        })
                                    },
                                ]}
                            >
                                <Input placeholder={"最高可借总额"}/>
                            </Form.Item>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>

            )
        })}
    </>

}

export default FirstAndRepeatLoanFormByCount;