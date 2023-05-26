import { Form, Input, Radio, Switch, Select, Collapse } from "antd";

import React from "react";
import { TagValidator } from "../../../../../shared/utils/validation/validator";

const { Panel } = Collapse;
export function UploadSettingSection(): JSX.Element {
    return <>
        <Collapse ghost defaultActiveKey={["1"]}>
            <Panel header="上架设定" key="1">
                <Form.Item name="top" label="产品置顶" valuePropName="checked">
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                </Form.Item>

                <Form.Item name="tags" label="热门产品标签" extra="至少1笔，至多3笔" style={{ marginBottom: 0 }}
                    rules={[
                        {
                            validator: async (_, value) => TagValidator(_, value)({
                                typeErrorMessage: "至少1笔，至多3笔",
                                required: true,
                                message: "至少1笔，至多3笔",
                            })
                        },
                    ]}
                    tooltip={
                        <div>
                            <span>参考文字：</span>
                            <ul>
                                <li>instant disbursal</li>
                                <li>paperless process</li>
                                <li>no processing fee</li>
                                <li>paperless journey</li>
                                <li>best plans</li>
                                <li>flexible repayment</li>
                                <li>Best</li>
                                <li>loan fast</li>
                                <li>low interest</li>
                                <li>high approval rates</li>
                            </ul>
                            <span>建议使用简明易懂的词汇</span>
                        </div>
                    }
                >
                    <Select mode="tags" style={{ width: '100%' }} placeholder="热门产品文字标签" />
                </Form.Item>

                <Form.Item name="templateType" label="借款模板">
                    <Radio.Group>
                        <Radio value={1}>应还 = 合同金额</Radio>
                        <Radio value={2}>到手 = 合同金额</Radio>
                    </Radio.Group>
                </Form.Item>


                <Form.Item name="weight" label="权重" >
                    <Input allowClear placeholder="填写 0-99 间的数字" />
                </Form.Item>

                <Form.Item name="enabled" label="状态" valuePropName="checked">
                    <Switch checkedChildren="上架" unCheckedChildren="下架" />
                </Form.Item>
            </Panel>
        </Collapse>
    </>;
}
