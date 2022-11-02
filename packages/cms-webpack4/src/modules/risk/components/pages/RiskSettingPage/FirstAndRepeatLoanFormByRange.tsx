import { Form, FormInstance, Input, Radio, Select, Switch, Tooltip, Space } from "antd";
import CustomLabel from "./CustomLabel";
import {NumberValidator} from "../../../../shared/utils/validation/validator";
function FirstAndRepeatLoanFormByRange(props:{isEdit:boolean}) {
    return <>
        <Form.Item label={"新客分数"} required>
            {["极好", "良好", "正常", "普通", "拒绝"].map((levelTag, index) => {
                return (
                    <Form.Item key={index}>
                        {index === 0 && (
                            <div>
                                <CustomLabel style={{ width: 76 }}>风控标签</CustomLabel>
                                <CustomLabel style={{ width: 88 }}>最小值</CustomLabel>
                                <CustomLabel style={{ width: 72 }}>最大值</CustomLabel>
                                <CustomLabel style={{ width: 110 }}>最高可放款笔数</CustomLabel>
                                <CustomLabel style={{ width: 110 }}>最高可借总额</CustomLabel>
                            </div>
                        )}
                        <Input.Group compact>
                            {props.isEdit && (
                                <Form.Item name={["firstLoan", index, "id"]} style={{ display: "none" }}>
                                    <Input />
                                </Form.Item>
                            )}
                            <Form.Item style={{ margin: '0 8px 0 0', width: 76 }}>
                                <Input placeholder={levelTag} disabled />
                            </Form.Item>

                            <Form.Item name={["firstLoan", index, "min"]} style={{ margin: '0 8px 0 0', width: 72 }}
                                rules={[
                                    {
                                        validator: async (_, value) => NumberValidator(_, value)({
                                            required: true,
                                            requiredErrorMessage: "请输入值",
                                            min:0,
                                            minMessage:"请输入大于0的整数"
                                        })
                                    },
                                ]}
                            >
                                <Input placeholder={"值"} />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block',  margin: '0 8px 0 0' }}>-</Form.Item>
                            <Form.Item name={["firstLoan", index, "max"]} style={{ margin: '0 8px 0 0', width: 72 }}
                                rules={[
                                    {
                                        validator: async (_, value) => NumberValidator(_, value)({
                                            required: true,
                                            requiredErrorMessage: "请输入值",
                                            min:0,
                                            minMessage:"请输入大于0的整数"
                                        })
                                    },
                                ]}
                            >
                                <Input placeholder={"值"} />
                            </Form.Item>

                            <Form.Item name={["firstLoan", index, "loanCount"]} style={{ margin: '0 8px 0 0' , width: 110}}
                                rules={[
                                    {
                                        validator: async (_, value) => NumberValidator(_, value)({
                                            required: true,
                                            requiredErrorMessage: "请输入笔数",
                                        })
                                    },
                                ]}
                            >
                                <Input placeholder={"笔数"} />
                            </Form.Item>
                            <Form.Item name={["firstLoan", index, "loanAmount"]} style={{ margin: '0 8px 0 0' , width: 110}}
                                rules={[
                                    {
                                        validator: async (_, value) => NumberValidator(_, value)({
                                            required: true,
                                            requiredErrorMessage: "请输入最高可借总额",
                                        })
                                    },
                                ]}
                            >
                                <Input placeholder={"最高可借总额"} />
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
                                <CustomLabel style={{ width: 76 }}>风控标签</CustomLabel>
                                <CustomLabel style={{ width: 88 }}>最小值</CustomLabel>
                                <CustomLabel style={{ width: 72 }}>最大值</CustomLabel>
                                <CustomLabel style={{ width: 110 }}>最高可放款笔数</CustomLabel>
                                <CustomLabel style={{ width: 110 }}>最高可借总额</CustomLabel>
                            </div>
                        )}
                        <Input.Group compact>
                            {props.isEdit && (
                                <Form.Item name={["repeatLoan", index, "id"]} style={{ display: "none" }}>
                                    <Input />
                                </Form.Item>
                            )}

                            <Form.Item style={{ margin: '0 8px 0 0', width: 76 }}>
                                <Input placeholder={levelTag} disabled />
                            </Form.Item>
                            <Form.Item name={["repeatLoan", index, "min"]} style={{ margin: '0 8px 0 0', width: 72 }}
                                rules={[
                                    {
                                        validator: async (_, value) => NumberValidator(_, value)({
                                            required: true,
                                            requiredErrorMessage: "请输入值",
                                            min:0,
                                            minMessage:"请输入大于0的整数"
                                        })
                                    },
                                ]}
                            >
                                <Input placeholder={"值"} />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block',  margin: '0 8px 0 0' }}>-</Form.Item>
                            <Form.Item name={["repeatLoan", index, "max"]} style={{ margin: '0 8px 0 0', width: 72 }}
                                rules={[
                                    {
                                        validator: async (_, value) => NumberValidator(_, value)({
                                            required: true,
                                            requiredErrorMessage: "请输入值",
                                            min:0,
                                            minMessage:"请输入大于0的整数"
                                        })
                                    },
                                ]}
                            >
                                <Input placeholder={"值"} />
                            </Form.Item>

                            <Form.Item name={["repeatLoan", index, "loanCount"]} style={{ margin: '0 8px 0 0' , width: 110}}
                                rules={[
                                    {
                                        validator: async (_, value) => NumberValidator(_, value)({
                                            required: true,
                                            requiredErrorMessage: "请输入笔数",
                                        })
                                    },
                                ]}
                            >
                                <Input placeholder={"笔数"} />
                            </Form.Item>
                            <Form.Item name={["repeatLoan", index, "loanAmount"]} style={{ margin: '0 8px 0 0' , width: 110}}
                                rules={[
                                    {
                                        validator: async (_, value) => NumberValidator(_, value)({
                                            required: true,
                                            requiredErrorMessage: "请输入最高可借总额",
                                        })
                                    },
                                ]}
                            >
                                <Input placeholder={"最高可借总额"} />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                )
            })}
        </Form.Item>
    </>

}

export default FirstAndRepeatLoanFormByRange;