import { Form, FormInstance, Input, Radio, Select, Switch, Tooltip, Space } from "antd";
import CustomLabel from "./CustomLabel";
import { NumberValidator } from "../../../../shared/utils/validation/validator";
import { CustomAntFormFieldError } from "../../../../shared/utils/validation/CustomAntFormFieldError";
interface FormProps {
    isEdit: boolean;
    customAntFormFieldError: CustomAntFormFieldError;
    type?: string;
}
function FirstAndRepeatLoanFormByValue(props: FormProps) {
    return <>
        {["极好", "良好", "正常", "普通", "拒绝"].map((levelTag, index) => {
            return (
                <Form.Item key={index}>
                    {index === 0 && (
                        <div>
                            <CustomLabel style={{ margin: '0 14px 0 0', width: 76 }}>风控标签</CustomLabel>
                            <CustomLabel>风控商等级</CustomLabel>
                            <CustomLabel>最高可放款笔数</CustomLabel>
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

                        <Form.Item name={[props.type, index, "providerRank"]} style={{ margin: '0 8px 0 0' }}
                            rules={[{
                                required: true,
                                message: "请输入值"
                            }]}
                        >
                            <Input placeholder={"值"} />
                        </Form.Item>
                        <Form.Item name={[props.type, index, "loanCount"]} style={{ margin: '0 8px 0 0' }}
                            help={(props.customAntFormFieldError?.[`${props.type}_loanCount_${index}`] as any)?.help}
                            validateStatus={(props.customAntFormFieldError?.[`${props.type}_loanCount_${index}`] as any)?.validateStatus}
                            rules={[{ required: true, message: "请输入值"}]}
                        >
                            <Input placeholder={"笔数"} />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
            )
        })}

    </>

}

export default FirstAndRepeatLoanFormByValue