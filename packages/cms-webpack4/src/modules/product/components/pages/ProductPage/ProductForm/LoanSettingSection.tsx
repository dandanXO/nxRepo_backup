import { Divider, Form, Input, Radio, Switch, Collapse } from "antd";
import React from "react";
import { NumberValidator } from "../../../../../shared/utils/validation/validator";
import { FormInstance } from "antd/es";
import CustomLabel from "../../../../../shared/components/other/CustomLabel";
import { CustomAntFormFieldError } from "../../../../../shared/utils/validation/CustomAntFormFieldError";
const { Panel } = Collapse;
interface LoanSettingSectionProps {
    form: FormInstance;
    enableLoanAmount: boolean;
    enableReLoanAmount: boolean;
    isEdit: boolean;
    customAntFormFieldError: CustomAntFormFieldError;
}


const LoanSettingSection = (props: LoanSettingSectionProps) => {

    return (
        <React.Fragment>
            <Collapse ghost defaultActiveKey={["1"]}>
                <Panel header="借款设定" key="1">
                    <Form.Item label="借贷期限" required>
                        <Form.Item name="loanTerm" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            rules={[
                                {
                                    transform: (value) => Number(value),
                                    validator: async (_, value) => NumberValidator(_, value)({
                                        typeErrorMessage: "请输入大于1的整数",
                                        min: 1,
                                        minMessage: "请输入借贷期限",
                                    })
                                },
                            ]}
                        >
                            <Input allowClear placeholder="天数" />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>天</Form.Item>
                    </Form.Item>

                    <Form.Item label="最高金额上限" required>
                        <Form.Item name="maxAmount" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            rules={[
                                {
                                    transform: (value) => Number(value),
                                    validator: async (_, value) => NumberValidator(_, value)({
                                        min: 1,
                                        minMessage: "请输入大于0的整数",
                                    })
                                },
                            ]}
                        >
                            <Input allowClear placeholder={"最高金额上限"} prefix="₹" />
                        </Form.Item>
                    </Form.Item>
                    {/* NOTICE: Ant Design 4 的 Switch 组件无法从 Form 里取值 */}
                    {props.isEdit &&
                        <Form.Item name="dummy" label="支持空放订单" tooltip="如有调整需求请联络技术" valuePropName="checked">
                            <Switch checkedChildren="是" unCheckedChildren="否" disabled />
                        </Form.Item>
                    }
                    <Form.Item name="extensible" label="支持展期" valuePropName="checked">
                        <Switch checkedChildren="是" unCheckedChildren="否" />
                    </Form.Item>

                    <Form.Item label="逾期超过" required>
                        <Form.Item name="extensibleOverdueDays" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            rules={[
                                {
                                    transform: (value) => Number(value),
                                    validator: async (_, value) => NumberValidator(_, value)({
                                        min: 1,
                                        minMessage: "请输入逾期超过",
                                    })
                                },
                            ]}
                        >
                            <Input allowClear placeholder="填写 1-365 间正整数" />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>天后，不得展期</Form.Item>
                    </Form.Item>

                    <Form.Item label="初贷初始额度">
                        <Form.Item name="newGuestLoanQuotaSwitch" style={{ display: 'inline-block', margin: '0 8px 0 0' }}>
                            <Radio.Group>
                                <Radio value={1}>依照风控</Radio>
                                <Radio value={0}>系统规则</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {props.enableLoanAmount && <Form.Item style={{ margin: '0' }}
                            help={(props.customAntFormFieldError?.[`riskRankLoanAmount_error`] as any)?.help}
                            validateStatus={(props.customAntFormFieldError?.[`riskRankLoanAmount_error`] as any)?.validateStatus}
                        >
                            {[["极好", "EXCELLENT"], ["良好", "GOOD"], ["正常", "NORMAL"], ["普通", "ORDINARY"], ["拒绝", "REJECT"]].map((levelTag, index) => {
                                return (
                                    <Form.Item key={index}>
                                        {index === 0 && (
                                            <div>
                                                <CustomLabel style={{ margin: '0 8px 0 0', width: 76 }}>风控商等级</CustomLabel>
                                                <CustomLabel style={{ width: 120 }}>初始额度</CustomLabel>
                                            </div>
                                        )}
                                        <Input.Group compact>
                                            <Form.Item style={{ margin: '0 8px 0 0', width: 76 }}>
                                                <Input placeholder={levelTag[0]} disabled />
                                            </Form.Item>
                                            <Form.Item name={['riskRankLoanAmount', index, 'riskRank']} initialValue={levelTag[1]} style={{ display: "none" }}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name={['riskRankLoanAmount', index, "loanAmount"]} style={{ margin: '0 8px 0 0', width: 120 }}
                                                help={(props.customAntFormFieldError?.[`riskRankLoanAmount_${index}`] as any)?.help}
                                                validateStatus={(props.customAntFormFieldError?.[`riskRankLoanAmount_${index}`] as any)?.validateStatus}
                                                rules={[{ required: true, message: "请输入初始额度" }]}
                                            >
                                                <Input placeholder={"初始额度"} />
                                            </Form.Item>
                                        </Input.Group>
                                    </Form.Item>
                                );
                            })}
                        </Form.Item>}
                    </Form.Item>


                    <Form.Item label="复贷初始额度">

                        <Form.Item name="oldGuestLoanQuotaSwitch" style={{ display: 'inline-block', margin: '0 8px 0 0' }}>
                            <Radio.Group>
                                <Radio value={1}>依照风控</Radio>
                                <Radio value={0}>系统规则</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item name="oldGuestLoanAmount" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            rules={!props.enableReLoanAmount ? [] : [
                                {
                                    validator: async (_, value) => NumberValidator(_, value)({
                                        required: true,
                                        requiredErrorMessage: "请输入复贷初始额度",
                                        typeErrorMessage: "请输入大于0的整数",
                                    })
                                },
                            ]}
                        >
                            <Input disabled={!props.enableReLoanAmount} placeholder={"复贷初始额度"} />
                        </Form.Item>
                    </Form.Item>
                </Panel>
            </Collapse>

        </React.Fragment>
    );
};

export default LoanSettingSection;
