import React, { lazy, useEffect, useState } from "react";
import { Divider, Form, FormInstance, Input, Typography, Row, Col, Space, Button, Radio, Tooltip } from "antd";
import FirstAndRepeatLoanFormByValue from "./FirstAndRepeatLoanFormByValue";
import FirstAndRepeatLoanFormByRange from "./FirstAndRepeatLoanFormByRange";
import { CustomAntFormFieldError } from "../../../../shared/utils/validation/CustomAntFormFieldError";

interface FirstLoanSectionProps {
    isEdit: boolean;
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<Object>>;
    form: FormInstance;
}

const FirstLoanSection = (props: FirstLoanSectionProps) => {
    const [firstLoanType, setFirstLoanType] = useState('KEY_VALUE');
    useEffect(() => {
        props.setCustomAntFormFieldError({});
        props.form.setFieldsValue({'firstLoan':[]});
    }, [firstLoanType])
    return (
        <React.Fragment>
            <Divider orientation="left">新客配置</Divider>
            <Form.Item label={"分数类型"} name={"rankStrategy"} required initialValue={firstLoanType}>
                <Radio.Group onChange={(e) => setFirstLoanType(e.target.value)} >
                    <Radio value={'KEY_VALUE'}>值</Radio>
                    <Radio value={'SCORE'}>范围</Radio>
                </Radio.Group>

            </Form.Item>
            <Form.Item label={"新客分数"} required
                help={(props.customAntFormFieldError?.[`firstLoan_error`] as any)?.help}
                validateStatus={(props.customAntFormFieldError?.[`firstLoan_error`] as any)?.validateStatus}
            >
                {{
                    'KEY_VALUE': <FirstAndRepeatLoanFormByValue {...props} type="firstLoan" />,
                    'SCORE': <FirstAndRepeatLoanFormByRange {...props} type="firstLoan" />,
                }[firstLoanType]}
            </Form.Item>
            <Form.Item label={'放款笔数'} name="useRcQuota" required>
                <Radio.Group>
                    <Radio value={true}>依照风控</Radio>
                    <Radio value={false}>系统规则</Radio>
                </Radio.Group>
            </Form.Item>
        </React.Fragment>
    )
}

export default FirstLoanSection;
