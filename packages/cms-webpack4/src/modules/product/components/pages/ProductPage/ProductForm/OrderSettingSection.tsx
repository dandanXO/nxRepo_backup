import { NumberValidator } from '../../../../../shared/utils/validation/validator';
import { Collapse, Form, Input, Switch } from 'antd';
import React from 'react';

const { Panel } = Collapse;

const OrderSettingSection = (): JSX.Element => {
    return (
        <React.Fragment>
            <Collapse ghost defaultActiveKey={['1']}>
                <Panel header="订单配置设定" key="1">
                    <Form.Item label="新客订单上限" required>
                        <Form.Item
                            name="newGuestMaxThreshold"
                            style={{ display: 'inline-block', margin: '0 8px 0 0' }}
                            rules={[
                                {
                                    validator: async (_, value) =>
                                        NumberValidator(
                                            _,
                                            value,
                                        )({
                                            required: true,
                                            requiredErrorMessage: '请输入新客订单上限',
                                            min: 0,
                                            max: 99999,
                                            maxMessage: '不可超过99999',
                                        }),
                                },
                            ]}
                        >
                            <Input
                                allowClear
                                placeholder="输入正整数"
                                style={{ width: '280px', margin: '0 8px 0 0' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="newGuestProductDisplayStatus"
                            label="優先滿足"
                            valuePropName="checked"
                            style={{ display: 'inline-block', margin: '0 8px 0 0' }}
                        >
                            <Switch checkedChildren="是" unCheckedChildren="否" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="次新客订单上限" required>
                        <Form.Item
                            name="renewMaxThreshold"
                            style={{ display: 'inline-block', margin: '0 8px 0 0' }}
                            rules={[
                                {
                                    validator: async (_, value) =>
                                        NumberValidator(
                                            _,
                                            value,
                                        )({
                                            required: true,
                                            requiredErrorMessage: '请输入次新客订单上限',
                                            min: 0,
                                            max: 99999,
                                            maxMessage: '不可超过99999',
                                        }),
                                },
                            ]}
                        >
                            <Input
                                allowClear
                                placeholder="输入正整数"
                                style={{ width: '280px', margin: '0 8px 0 0' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="renewProductDisplayStatus"
                            label="優先滿足"
                            valuePropName="checked"
                            style={{ display: 'inline-block', margin: '0 8px 0 0' }}
                        >
                            <Switch checkedChildren="是" unCheckedChildren="否" />
                        </Form.Item>
                    </Form.Item>
                </Panel>
            </Collapse>
        </React.Fragment>
    );
};

export default OrderSettingSection;
