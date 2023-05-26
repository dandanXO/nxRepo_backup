import PreAndPostInterestGroups from '../../../../../shared/components/other/PreAndPostInterestGroups';
import { maxOneUnitFloatReplacer } from '../../../../../shared/utils/format/maxOneUnitFloatReplacer';
import { CustomAntFormFieldError } from '../../../../../shared/utils/validation/CustomAntFormFieldError';
import { NumberValidator } from '../../../../../shared/utils/validation/validator';
import { Collapse, Form, Input, Typography } from 'antd';
import { FormInstance } from 'antd/es';
import React, { CSSProperties } from 'react';

const { Paragraph, Text } = Typography;
const { Panel } = Collapse;
interface RateSettingSectionProps {
    form: FormInstance;
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>;
    interestRatePairsTouchInput: any;
}
export const CustomLabel = (props: { style?: CSSProperties; children: string }): JSX.Element => (
    <div
        style={{ marginRight: 8, width: 123, height: 32, lineHeight: '32px', display: 'inline-block', ...props.style }}
    >
        {props.children}
    </div>
);

const RateSettingSection = (props: RateSettingSectionProps): JSX.Element => {
    // console.log("customAntFormFieldError", props.customAntFormFieldError);
    return (
        <React.Fragment>
            <Collapse ghost defaultActiveKey={['1']}>
                <Panel header="费率设定" key="1">
                    <Paragraph style={{ margin: '0 0 0 100px' }}>
                        <span>填写规则：</span>
                        <ul>
                            <li>
                                所有费率至多填写至<Text strong>小数点后第一位</Text>，例如：20 或 20.5
                            </li>
                            <li>
                                <Text strong>前置利息+后置利息</Text>不得超过100%
                            </li>
                        </ul>
                    </Paragraph>

                    <Form.Item label="新客利息" required>
                        <Input.Group compact>
                            <div>
                                <CustomLabel style={{ width: 193 }}>前置利息</CustomLabel>
                                <CustomLabel style={{ width: 193 }}>后置利息</CustomLabel>
                            </div>
                        </Input.Group>

                        <Form.Item
                            name="preInterestRate"
                            style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            validateStatus={(props?.customAntFormFieldError?.preInterestRate as any).validateStatus}
                            help={(props?.customAntFormFieldError?.preInterestRate as any).help}
                            normalize={(value) => {
                                return maxOneUnitFloatReplacer(value);
                            }}
                        >
                            <Input allowClear placeholder="填写 0 - 100 间数字" />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>%</Form.Item>

                        <Form.Item
                            name="postInterestRate"
                            style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            validateStatus={(props?.customAntFormFieldError?.postInterestRate as any).validateStatus}
                            help={(props?.customAntFormFieldError?.postInterestRate as any).help}
                            normalize={(value) => {
                                return maxOneUnitFloatReplacer(value);
                            }}
                        >
                            <Input allowClear placeholder="填写 0 - 100 间数字" />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>%</Form.Item>
                    </Form.Item>

                    <Form.Item label="次新客利息" required>
                        <Input.Group compact>
                            <div>
                                <CustomLabel style={{ width: 193 }}>前置利息</CustomLabel>
                                <CustomLabel style={{ width: 193 }}>后置利息</CustomLabel>
                            </div>
                        </Input.Group>

                        <Form.Item
                            name="renewPreInterestRate"
                            style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            validateStatus={
                                (props?.customAntFormFieldError?.renewPreInterestRate as any).validateStatus
                            }
                            help={(props?.customAntFormFieldError?.renewPreInterestRate as any).help}
                            normalize={(value) => {
                                return maxOneUnitFloatReplacer(value);
                            }}
                        >
                            <Input allowClear placeholder="填写 0 - 100 间数字" />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>%</Form.Item>

                        <Form.Item
                            name="renewPostInterestRate"
                            style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            validateStatus={
                                (props?.customAntFormFieldError?.renewPostInterestRate as any).validateStatus
                            }
                            help={(props?.customAntFormFieldError?.renewPostInterestRate as any).help}
                            normalize={(value) => {
                                return maxOneUnitFloatReplacer(value);
                            }}
                        >
                            <Input allowClear placeholder="填写 0 - 100 间数字" />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>%</Form.Item>
                    </Form.Item>

                    <Form.Item label="日利息" tooltip="以年利息计" required>
                        <Form.Item
                            name="dailyRate"
                            style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            rules={[
                                {
                                    validator: async (_, value) =>
                                        NumberValidator(
                                            _,
                                            value,
                                        )({
                                            required: true,
                                            requiredErrorMessage: '请输入日利息',
                                            min: 0,
                                            minMessage: '请输入0-36间数字',
                                            max: 36,
                                            maxMessage: '请输入0-36间数字',
                                        }),
                                },
                            ]}
                            normalize={(value) => {
                                return maxOneUnitFloatReplacer(value);
                            }}
                        >
                            <Input allowClear placeholder="填写 0-36 间数字" />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>%</Form.Item>
                    </Form.Item>

                    <Form.Item label="展期利率" required>
                        <Form.Item
                            name="extensionRate"
                            style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            rules={[
                                {
                                    validator: async (_, value) =>
                                        NumberValidator(
                                            _,
                                            value,
                                        )({
                                            required: true,
                                            requiredErrorMessage: '请输入展期利率',
                                            min: 0,
                                            minMessage: '请输入0-100间数字',
                                            max: 100,
                                            maxMessage: '请输入0-100间数字',
                                        }),
                                },
                            ]}
                            normalize={(value) => {
                                return maxOneUnitFloatReplacer(value);
                            }}
                        >
                            <Input allowClear placeholder="填寫 0 - 100 间數字" />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>%</Form.Item>
                    </Form.Item>

                    <Form.Item label="逾期费率" required>
                        <Form.Item
                            name="overdueRate"
                            style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                            rules={[
                                {
                                    validator: async (_, value) =>
                                        NumberValidator(
                                            _,
                                            value,
                                        )({
                                            required: true,
                                            requiredErrorMessage: '请输入逾期费率',
                                            min: 0,
                                            minMessage: '请输入0-100间数字',
                                            max: 100,
                                            maxMessage: '请输入0-100间数字',
                                        }),
                                },
                            ]}
                            normalize={(value) => {
                                return maxOneUnitFloatReplacer(value);
                            }}
                        >
                            <Input allowClear placeholder="填写 0 - 100 间数字" />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>%</Form.Item>
                    </Form.Item>

                    <Form.Item
                        label="复贷利率"
                        required
                        tooltip={
                            <div>
                                <div>例如：</div>
                                <div>起始期数1，前置利息10%，后置利息15%</div>
                                <div>+起始期数4，前置利息8%，后置利息12%</div>
                                <div>则1~3期费率同起始期数1</div>
                                <div>第4期之后费率同起始期数4</div>
                            </div>
                        }
                    >
                        <PreAndPostInterestGroups
                            form={props.form}
                            fieldName={'productInterestRatePairs'}
                            customAntFormFieldError={props.customAntFormFieldError}
                            setCustomAntFormFieldError={props.setCustomAntFormFieldError}
                            interestRatePairsTouchInput={props.interestRatePairsTouchInput}
                        />
                    </Form.Item>
                </Panel>
            </Collapse>
        </React.Fragment>
    );
};

export default RateSettingSection;
