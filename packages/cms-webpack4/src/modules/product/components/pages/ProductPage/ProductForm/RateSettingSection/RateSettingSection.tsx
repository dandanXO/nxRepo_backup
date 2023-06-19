import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Collapse, Form, Input, Typography, message } from 'antd';
import { FormInstance } from 'antd/es';
import React, { CSSProperties, useEffect, useState } from 'react';

import { validatePreOrPostInterestGroups } from '../../../../../../shared/components/other/validatePreOrPostInterestGroups';
import { maxOneUnitFloatReplacer } from '../../../../../../shared/utils/format/maxOneUnitFloatReplacer';
import { CustomAntFormFieldError } from '../../../../../../shared/utils/validation/CustomAntFormFieldError';
import { NumberValidator } from '../../../../../../shared/utils/validation/validator';
import {
    ProductInterestRate,
    productInterestRatesContentKey,
} from '../../../../../service/product/domain/productInterestRatePair';
import { ProductInterestRatePairsModal } from './ProductInterestRatePairsModal';

const { Paragraph, Text } = Typography;
const { Panel } = Collapse;
interface RateSettingSectionProps {
    modal: any;
    form: FormInstance;
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>;
    setInterestRatePairsTouchInput: React.Dispatch<any>;
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
    const [showProductInterestRatePairsModal, setShowProductInterestRatePairsModal] = useState(false);
    const { confirm } = props.modal;
    const [messageAPI, contextHolder] = message.useMessage();
    const [tempProductInterestRatePairs, setTempProductInterestRatePairs] = useState<ProductInterestRate[]>([]);
    const [everResetField, setEverResetField] = useState(false);

    const productInterestRatePairCheckedError =
        props.customAntFormFieldError['productInterestRatePairsChecked']['help'];
    const productInterestRatePairsChecked = Form.useWatch('productInterestRatePairsChecked', props.form);

    const handleProductInterestRatePairsModalOnOK = () => {
        const { productInterestRatePairs } = props.form.getFieldsValue();
        const { validateMap: productInterestRatePairsValidationMap, hasError } = validatePreOrPostInterestGroups(
            productInterestRatePairs,
            true,
            productInterestRatesContentKey,
        );

        props.setCustomAntFormFieldError((prev) => {
            const finalMap =
                Object.keys(productInterestRatePairsValidationMap).length > 0
                    ? productInterestRatePairsValidationMap
                    : prev.productInterestRatePairs;
            return {
                ...prev,
                productInterestRatePairs: finalMap as any,
            };
        });
        if (!hasError) {
            messageAPI.success('已储存');
            props.form.setFieldValue('productInterestRatePairsChecked', true);
            props.setInterestRatePairsTouchInput(null);
            setTempProductInterestRatePairs([...productInterestRatePairs]);
            setShowProductInterestRatePairsModal(false);
        }
    };

    const handleProductInterestRatePairsModalOnClose = () => {
        // 有修改過欄位才要跳彈窗
        if (props.interestRatePairsTouchInput || everResetField) {
            confirm({
                icon: null,
                content: (
                    <div style={{ height: '20px', display: 'flex' }}>
                        <ExclamationCircleOutlined
                            style={{ color: '#FAAD14', display: 'block', fontSize: '20px', marginRight: '10px' }}
                        />
                        <div style={{ lineHeight: '20px' }}>
                            您的表单填写尚未完成，离开将不会储存已变更的资料。确定要离开吗？
                        </div>
                    </div>
                ),
                onOk() {
                    props.form.setFieldValue('productInterestRatePairs', tempProductInterestRatePairs);
                    props.setCustomAntFormFieldError((prev) => ({
                        ...prev,
                        productInterestRatePairs: {},
                    }));
                    props.setInterestRatePairsTouchInput(null);
                    setShowProductInterestRatePairsModal(false);
                    setEverResetField(false);
                },
                onCancel() {
                    //
                },
            });
        } else {
            setShowProductInterestRatePairsModal(false);
        }
    };

    const handleProductInterestRateSettingOnClick = () => {
        props.setCustomAntFormFieldError((prev) => ({
            ...prev,
            productInterestRatePairsChecked: {
                validateStatus: '',
                help: '',
            },
        }));
        setShowProductInterestRatePairsModal(true);
    };

    // 不使用Form.useWatch取得productInterestRatePairs作為deps是因為沒有render過的欄位用useWatch取得不到值
    useEffect(() => {
        if (!showProductInterestRatePairsModal) {
            const productInterestRatePairs = props.form.getFieldValue('productInterestRatePairs');
            setTempProductInterestRatePairs([...productInterestRatePairs]);
        }
    }, [props.form.getFieldValue('productInterestRatePairs')]);

    // console.log("customAntFormFieldError", props.customAntFormFieldError);
    return (
        <React.Fragment>
            {contextHolder}
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

                    <Form.Item label="复贷利率" name="productInterestRatePairsChecked" required>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <a
                                style={{ textDecoration: 'underline' }}
                                onClick={handleProductInterestRateSettingOnClick}
                            >
                                配置
                            </a>
                            <CheckCircleFilled
                                style={{ color: `${productInterestRatePairsChecked ? '#52C41A' : '#D9D9D9'}` }}
                            />
                            {productInterestRatePairCheckedError && (
                                <div style={{ position: 'absolute', color: 'red', top: '23px' }}>
                                    {productInterestRatePairCheckedError}
                                </div>
                            )}
                        </div>
                    </Form.Item>
                    {showProductInterestRatePairsModal && (
                        <ProductInterestRatePairsModal
                            form={props.form}
                            customAntFormFieldError={props.customAntFormFieldError}
                            setCustomAntFormFieldError={props.setCustomAntFormFieldError}
                            interestRatePairsTouchInput={props.interestRatePairsTouchInput}
                            show={showProductInterestRatePairsModal}
                            onOk={handleProductInterestRatePairsModalOnOK}
                            handleCloseModal={handleProductInterestRatePairsModalOnClose}
                            setEverResetField={setEverResetField}
                        />
                    )}
                </Panel>
            </Collapse>
        </React.Fragment>
    );
};

export default RateSettingSection;
