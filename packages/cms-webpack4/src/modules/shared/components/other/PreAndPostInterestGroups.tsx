import React, { useEffect, CSSProperties, ReactElement } from 'react';
import {  Form, Input, Space, Button, Tooltip } from "antd";
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { maxOneUnitFloatReplacer } from '../../utils/format/maxOneUnitFloatReplacer';
import { FormInstance } from 'antd/lib/form/Form';
import { CustomAntFormFieldError } from '../../utils/validation/CustomAntFormFieldError';
import { validateValue, validateNum, validateplusAmount } from './validatePreOrPostInterestGroups';


export const CustomLabel = (props: { style?: CSSProperties, children: string | ReactElement | ReactElement[] }): JSX.Element => <div style={{ marginRight: 8, width: 123, height: 32, lineHeight: "32px", display: "inline-block", ...props.style }}>{props.children}</div>;


interface PreAndPostInterestGroupsProps {
    form: FormInstance;
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>;
    interestRatePairsTouchInput: any;
    fieldName: string;
}

function PreAndPostInterestGroups(props: PreAndPostInterestGroupsProps): JSX.Element {
    const { form, customAntFormFieldError, setCustomAntFormFieldError, interestRatePairsTouchInput, fieldName } = props;
    const interestRatePairs = form.getFieldsValue()[fieldName];

    useEffect(() => {

        if (!interestRatePairsTouchInput) return;
        if (!interestRatePairs[0]) return;

        const touchIndex = interestRatePairsTouchInput[0]?.name[1];
        const toucField = interestRatePairsTouchInput[0]?.name[2];
        const touchValue = interestRatePairsTouchInput[0]?.value;

        const isPreOrPostInterest = toucField === 'preInterest' || toucField === 'postInterest';

        const preInterest = interestRatePairs[touchIndex]?.preInterest;
        const postInterest = interestRatePairs[touchIndex]?.postInterest;

        const isOver100 = Number(preInterest) + Number(postInterest) > 100;

        if (toucField === 'num') {
            setCustomAntFormFieldError(prev => {
                const error = validateNum(touchValue, "请输入起始期数");
                prev[fieldName][touchIndex] = {
                    ...prev[fieldName][touchIndex],
                    ['num']: {
                        validateStatus: error ? "error" : "",
                        help: error,
                        value: touchValue,
                    },
                };
                return {
                    ...prev,
                    [fieldName]: prev[fieldName]
                };
            });
        }

        if (toucField === 'plusAmount') {
            setCustomAntFormFieldError(prev => {
                const error = validateplusAmount(touchValue, "请输入提額金额");
                prev[fieldName][touchIndex] = {
                    ...prev[fieldName][touchIndex],
                    ['plusAmount']: {
                        validateStatus: error ? "error" : "",
                        help: error,
                        value: touchValue,
                    },
                };
                return {
                    ...prev,
                    [fieldName]: prev[fieldName]
                };
            });
        }

        if (interestRatePairsTouchInput[0]?.name?.length > 1 && isPreOrPostInterest) {

            const preOrPostInterestErrorText = toucField === 'preInterest' ? '前置' : '後置';
            const preOrPostInterestrror = validateValue(touchValue, `请输入${preOrPostInterestErrorText}利息`);
            const preInterestError = validateValue(preInterest, "请输入前置利息");
            const postInterestError = validateValue(postInterest, "请输入後置利息");

            setCustomAntFormFieldError(prev => {

                if (preInterestError === '' && postInterestError === '') {
                    prev[fieldName][touchIndex] = {
                        ...prev[fieldName][touchIndex],
                        preInterest: {
                            validateStatus: isOver100 ? "error" : "",
                            help: isOver100 ? "前置利息＋后置利息不得超过100%" : "",
                        },
                        postInterest: {
                            validateStatus: isOver100 ? "error" : "",
                            help: isOver100 ? "前置利息＋后置利息不得超过100%" : ""
                        },
                    };
                } else {
                    prev[fieldName][touchIndex] = {
                        ...prev[fieldName][touchIndex],
                        [toucField]: {
                            validateStatus: preOrPostInterestrror ? "error" : "",
                            help: preOrPostInterestrror,
                            value: touchValue,
                        },
                    };
                }
                return {
                    ...prev,
                    [fieldName]: prev[fieldName]
                };
            });
        }
    }, [interestRatePairsTouchInput]);

    const handleUpdateCustomAntFormFieldError = (index) => {

        setCustomAntFormFieldError(prev => {
            delete prev[fieldName][index];
            const interestRatePairs = JSON.parse(JSON.stringify(prev[fieldName]));
            const latestInterestRatePairs = Object.keys(interestRatePairs).reduce((init, curr, currIndex) => {
                return { ...init, [currIndex]: interestRatePairs[curr] };
            }, {});
            return { ...prev, [fieldName]: latestInterestRatePairs };
        });
    };

    return (
        <Form.List name={fieldName}>
            {(fields, { add, remove }) => {
                return (
                    <>
                        {fields.map(({ key, name, ...restField }, index) => (
                            <>
                                {index === 0 && (
                                    <Input.Group compact>
                                        <div>
                                            <CustomLabel style={{ width: 125 }}>
                                                <Space>起始期数
                                                    <Tooltip title={
                                                        <div>
                                                            <div>例如：</div>
                                                            <div>▪ 起始期数1，前置利息10%，后置利息15%＋起始期数4，前置利息8%，后置利息12%，则1~3期费率同起始期数1，第4期之后费率同起始期数4。</div>
                                                            <div>▪ 期数建议由小至大填写。</div>
                                                        </div>
                                                    }>
                                                        <InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} />
                                                    </Tooltip>
                                                </Space>
                                            </CustomLabel>
                                            <CustomLabel style={{ width: 125 }}>前置利息</CustomLabel>
                                            <CustomLabel style={{ width: 125 }}>后置利息</CustomLabel>
                                            <CustomLabel style={{ width: 125 }}>提額金额</CustomLabel>
                                        </div>
                                    </Input.Group>
                                )}

                                <Space key={key} size={8} style={{ marginBottom: 0 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        style={{ width: 125 }}
                                        name={[name, 'num']}
                                        validateStatus={customAntFormFieldError?.productInterestRatePairs?.[index]?.num?.validateStatus || ""}
                                        help={customAntFormFieldError?.productInterestRatePairs?.[index]?.num?.help || ""}
                                        initialValue={''}
                                    >
                                        <Input placeholder="起始期数" />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ width: 125 }}
                                        {...restField}
                                        name={[name, 'preInterest']}
                                        validateStatus={customAntFormFieldError?.productInterestRatePairs?.[index]?.preInterest?.validateStatus || ""}
                                        help={customAntFormFieldError?.productInterestRatePairs?.[index]?.preInterest?.help || ""}
                                        normalize={(value) => {
                                            return maxOneUnitFloatReplacer(value);
                                        }}
                                        initialValue={''}
                                    >
                                        <Input placeholder="前置利息" suffix={"%"} />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        style={{ width: 125 }}
                                        name={[name, 'postInterest']}
                                        validateStatus={customAntFormFieldError?.productInterestRatePairs?.[index]?.postInterest?.validateStatus || ""}
                                        help={customAntFormFieldError?.productInterestRatePairs?.[index]?.postInterest?.help || ""}
                                        normalize={(value) => {
                                            return maxOneUnitFloatReplacer(value);
                                        }}
                                        initialValue={''}
                                    >
                                        <Input placeholder="后置利息" suffix={"%"} />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        style={{ width: 125 }}
                                        name={[name, 'plusAmount']}
                                        validateStatus={customAntFormFieldError?.productInterestRatePairs?.[index]?.plusAmount?.validateStatus || ""}
                                        help={customAntFormFieldError?.productInterestRatePairs?.[index]?.plusAmount?.help || ""}
                                        initialValue={''}
                                    >
                                        <Input placeholder="提額金额" />
                                    </Form.Item>
                                    {index !== 0 && <MinusCircleOutlined onClick={() => {
                                        handleUpdateCustomAntFormFieldError(index);
                                        remove(name);
                                    }} />}
                                </Space>
                            </>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                添加
                            </Button>
                        </Form.Item>
                    </>
                );
            }}
        </Form.List>
    );
}

export default PreAndPostInterestGroups;
