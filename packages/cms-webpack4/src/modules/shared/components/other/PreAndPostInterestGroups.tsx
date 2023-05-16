import React, { useEffect, useState, CSSProperties, ReactElement } from 'react';
import { Divider, Form, Input, Typography, Row, Col, Space, Button, Collapse, Tooltip } from "antd";
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { maxOneUnitFloatReplacer } from '../../utils/format/maxOneUnitFloatReplacer';
import { FormInstance, useWatch } from 'antd/lib/form/Form';
import { CustomAntFormFieldError } from '../../utils/validation/CustomAntFormFieldError';
import { validateValue, validateNum, validateplusAmount } from './validatePreOrPostInterestGroups';
import {
    riskLabelMap
} from "../../../product/components/pages/ProductPage/ProductForm/RateSettingSection/ProductInterestRatePairsModal";


export const CustomLabel = (props: { style?: CSSProperties, children: string | ReactElement | ReactElement[] }) => <div style={{ marginRight: 8, width: 123, height: 32, lineHeight: "32px", display: "inline-block", ...props.style }}>{props.children}</div>


interface PreAndPostInterestGroupsProps {
    form: FormInstance;
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>;
    interestRatePairsTouchInput: any;
    parentName?: string;
    groupName?: string;
    fieldName: string | [number, string];
}

function PreAndPostInterestGroups(props: PreAndPostInterestGroupsProps) {
    const { form, customAntFormFieldError, setCustomAntFormFieldError, interestRatePairsTouchInput, fieldName, parentName } = props;
    const isMultiGroup = Array.isArray(fieldName)
    let interestRatePairs = form.getFieldsValue()[isMultiGroup?parentName:fieldName];

    useEffect(() => {
        if (!interestRatePairsTouchInput) return
        if (!interestRatePairs[0]) return



        const touchGroupIndex = isMultiGroup && interestRatePairsTouchInput[0]?.name[1]
        if(isMultiGroup && touchGroupIndex !== fieldName[0]) return;
        const touchIndex = interestRatePairsTouchInput[0]?.name[isMultiGroup?3:1];
        interestRatePairs = isMultiGroup ? interestRatePairs[touchGroupIndex]?.[fieldName[1]] : interestRatePairs
        interestRatePairs = interestRatePairs?.[touchIndex]
        const touchField = interestRatePairsTouchInput[0]?.name[isMultiGroup?4:2];
        const touchValue = interestRatePairsTouchInput[0]?.value;

        const isPreOrPostInterest = touchField === 'preInterest' || touchField === 'postInterest';

        const preInterest = interestRatePairs?.preInterest;
        const postInterest = interestRatePairs?.postInterest;

        const isOver100 = Number(preInterest) + Number(postInterest) > 100;

        if (touchField === 'num') {
            setCustomAntFormFieldError(prev => {
                const error = validateNum(touchValue, "请输入起始期数");
                const errorSection = {
                    validateStatus: error ? "error" : "",
                    help: error,
                    value: touchValue,
                }
                if (isMultiGroup) {
                    prev[parentName][touchGroupIndex] = {
                        ...prev[parentName][touchGroupIndex]
                    }
                    prev[parentName][touchGroupIndex][touchIndex] = {
                        ...prev[parentName][touchGroupIndex][touchIndex],
                        ['num'] : errorSection
                    }
                } else {
                    prev[fieldName][touchIndex] = {
                        ...prev[fieldName][touchIndex],
                        ['num']: errorSection
                    }
                }

                return {
                    ...prev,
                    [isMultiGroup ? parentName : fieldName as string]: prev[isMultiGroup ? parentName : fieldName as string]
                }
            })
        }

        if (touchField === 'plusAmount') {
            setCustomAntFormFieldError(prev => {
                const error = validateNum(touchValue, "请输入提額金额");
                const errorSection = {
                    validateStatus: error ? "error" : "",
                    help: error,
                    value: touchValue,
                }
                if (isMultiGroup) {
                    prev[parentName][touchGroupIndex] = {
                        ...prev[parentName][touchGroupIndex]
                    }
                    prev[parentName][touchGroupIndex][touchIndex] = {
                        ...prev[parentName][touchGroupIndex][touchIndex],
                        ['plusAmount'] : errorSection
                    }
                } else {
                    prev[fieldName][touchIndex] = {
                        ...prev[fieldName][touchIndex],
                        ['plusAmount']: errorSection
                    }
                }

                return {
                    ...prev,
                    [isMultiGroup ? parentName : fieldName as string]: prev[isMultiGroup ? parentName : fieldName as string]
                }
            })
        }

        if (interestRatePairsTouchInput[0]?.name?.length > 1 && isPreOrPostInterest) {
            const preOrPostInterestErrorText = touchField === 'preInterest' ? '前置' : '後置';
            const preOrPostInterestError = validateValue(touchValue, `请输入${preOrPostInterestErrorText}利息`);
            const preInterestError = validateValue(preInterest, "请输入前置利息");
            const postInterestError = validateValue(postInterest, "请输入後置利息");

            setCustomAntFormFieldError(prev => {
                if (preInterestError === '' && postInterestError === '') {
                    const errorSection = {
                        validateStatus: isOver100 ? "error" : "",
                        help: isOver100 ? "前置利息＋后置利息不得超过100%" : "",
                    }
                    if (isMultiGroup) {
                        prev[parentName][touchGroupIndex] = {
                            ...prev[parentName][touchGroupIndex]
                        }
                        prev[parentName][touchGroupIndex][touchIndex] = {
                            ...prev[parentName][touchGroupIndex][touchIndex],
                            preInterest: errorSection,
                            postInterest: errorSection
                        }
                    } else {
                        prev[fieldName][touchIndex] = {
                            ...prev[fieldName][touchIndex],
                            preInterest: errorSection,
                            postInterest: errorSection
                        }
                    }
                } else {
                    const errorSection = {
                        validateStatus: preOrPostInterestError ? "error" : "",
                        help: preOrPostInterestError,
                        value: touchValue
                    }
                    if (isMultiGroup) {
                        prev[parentName][touchGroupIndex] = {
                            ...prev[parentName][touchGroupIndex]
                        }
                        prev[parentName][touchGroupIndex][touchIndex] = {
                            ...prev[parentName][touchGroupIndex][touchIndex],
                            [touchField] : errorSection
                        }
                    } else {
                        prev[fieldName][touchIndex] = {
                            ...prev[fieldName][touchIndex],
                            [touchField] : errorSection
                        }
                    }
                }

                return {
                    ...prev,
                    [isMultiGroup ? parentName : fieldName as string]: prev[isMultiGroup ? parentName : fieldName as string]
                }
            })
        }

    },[interestRatePairsTouchInput])

    const handleUpdateCustomAntFormFieldError = (index) => {
        if (isMultiGroup) {
            setCustomAntFormFieldError(prev => {
                prev[parentName][fieldName[0]] = {
                    ...prev[parentName][fieldName[0]]
                }
                delete prev[parentName][fieldName[0]][index]

                const interestRatePairs = JSON.parse(JSON.stringify(prev[parentName][fieldName[0]]))
                const groupColumns = Object.keys(interestRatePairs).map((part)=>Number(part))
                const latestInterestRatePairs = groupColumns.reduce((acc, current) => {
                    const newIndex = current < index ? current : current - 1
                    return { ...acc, [newIndex]: interestRatePairs[current] }
                }, {})

                const groupLatestInterestRatePairs = {
                    ...prev[parentName],
                    [fieldName[0]]: latestInterestRatePairs
                }

                return {
                    ...prev,
                    [[parentName][fieldName[0]]] : groupLatestInterestRatePairs
                }
            })
        } else {
            setCustomAntFormFieldError(prev => {
                delete prev[fieldName][index];

                const interestRatePairs = JSON.parse(JSON.stringify(prev[fieldName]))
                const groupColumns = Object.keys(interestRatePairs).map((part)=>Number(part))
                const latestInterestRatePairs = groupColumns.reduce((acc, current) => {
                    const newIndex = current < index ? current : current - 1
                    return { ...acc, [newIndex]: interestRatePairs[current] }
                }, {})

                return { ...prev, [fieldName]: latestInterestRatePairs }
            })
        }
    }

    const errors = customAntFormFieldError?.productInterestRatePairs

    return (
        <Form.List name={fieldName}>
            {(fields, { add, remove }) => {
                return (
                    <>
                        {fields.map(({ key, name, ...restField }, index) => {
                            const columnErrors = isMultiGroup ? errors?.[fieldName[0]]?.[index] : errors?.[index]
                            return (
                                <React.Fragment key={key}>
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
                                        { isMultiGroup && (
                                            <Form.Item
                                                { ...(index !== 0 ) && { initialValue : riskLabelMap[fieldName[0]].key }}
                                                name={[name, props.groupName]}
                                                style={{ display: "none" }}
                                            >
                                                <Input />
                                            </Form.Item>
                                        )}
                                        <Form.Item
                                            {...(index !== 0 || !isMultiGroup) && {initialValue: ''}}
                                            {...restField}
                                            style={{ width: 125 }}
                                            name={[name, 'num']}
                                            validateStatus={columnErrors?.num?.validateStatus || ""}
                                            help={columnErrors?.num?.help || ""}
                                        >
                                            <Input placeholder="起始期数" />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ width: 125 }}
                                            {...(index !== 0 || !isMultiGroup) && {initialValue: ''}}
                                            {...restField}
                                            name={[name, 'preInterest']}
                                            validateStatus={columnErrors?.preInterest?.validateStatus || ""}
                                            help={columnErrors?.preInterest?.help || ""}
                                            normalize={(value, prevValue, prevValues) => {
                                                return maxOneUnitFloatReplacer(value);
                                            }}
                                        >
                                            <Input placeholder="前置利息" suffix={"%"} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            {...(index !== 0 || !isMultiGroup) && {initialValue: ''}}
                                            style={{ width: 125 }}
                                            name={[name, 'postInterest']}
                                            validateStatus={columnErrors?.postInterest?.validateStatus || ""}
                                            help={columnErrors?.postInterest?.help || ""}
                                            normalize={(value, prevValue, prevValues) => {
                                                return maxOneUnitFloatReplacer(value);
                                            }}
                                        >
                                            <Input placeholder="后置利息" suffix={"%"} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            {...(index !== 0 || !isMultiGroup) && {initialValue: ''}}
                                            style={{ width: 125 }}
                                            name={[name, 'plusAmount']}
                                            validateStatus={columnErrors?.plusAmount?.validateStatus || ""}
                                            help={columnErrors?.plusAmount?.help || ""}
                                        >
                                            <Input placeholder="提額金额" />
                                        </Form.Item>
                                        {index !== 0 && <MinusCircleOutlined onClick={() => {
                                            handleUpdateCustomAntFormFieldError(index);
                                            remove(name);
                                        }} />}
                                    </Space>
                                </React.Fragment>
                            )
                        })}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                添加
                            </Button>
                        </Form.Item>
                    </>
                )
            }}
        </Form.List>
    )
}

export default PreAndPostInterestGroups;
