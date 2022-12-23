import { Form, Input, Collapse } from "antd";
import React from "react";
import { NumberValidator } from "../../../../../shared/utils/validation/validator";
const { Panel } = Collapse;

const OrderSettingSection = (props) => {
    return (
        <React.Fragment>
            <Collapse ghost defaultActiveKey={["1"]}>
                <Panel header="订单配置设定" key="1">
                    <Form.Item name="loanMaxThreshold" label="新客订单上限" required
                        
                        rules={[
                            {
                                validator: async (_, value) => NumberValidator(_, value)({
                                    required: true,
                                    requiredErrorMessage: "请输入新客订单上限",
                                    min: 0,
                                    max: 99999,
                                    maxMessage: "不可超过99999",
                                })
                            },
                        ]}>
                        <Input allowClear placeholder="输入正整数" style={{ width: '280px', margin: '0 8px 0 0' }}/>
                    </Form.Item>
                    <Form.Item name="reLoanMaxThreshold" label="次新客订单上限" required
                       
                        rules={[
                            {
                                validator: async (_, value) => NumberValidator(_, value)({
                                    required: true,
                                    requiredErrorMessage: "请输入次新客订单上限",
                                    min: 0,
                                    max: 99999,
                                    maxMessage: "不可超过99999",
                                })
                            },
                        ]}>
                        <Input allowClear placeholder="输入正整数"  style={{  width: '280px', margin: '0 8px 0 0' }}/>
                    </Form.Item>
                </Panel>
            </Collapse>
        </React.Fragment>
    )
}

export default OrderSettingSection;
