import React, { lazy, useState,useEffect } from "react";
import { Divider, Form,FormInstance, Input, Typography, Row, Col, Space, Button,Radio ,Tooltip} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import FirstAndRepeatLoanFormByValue from "./FirstAndRepeatLoanFormByValue";
import FirstAndRepeatLoanFormByRange from "./FirstAndRepeatLoanFormByRange";
import FirstAndRepeatLoanFormByCount from "./FirstAndRepeatLoanFormByCount";
import { CustomAntFormFieldError } from "../../../../shared/utils/validation/CustomAntFormFieldError";

interface RepeatLoanSectionProps{
    isEdit:boolean;
    customAntFormFieldError:CustomAntFormFieldError;
    setCustomAntFormFieldError:React.Dispatch<React.SetStateAction<Object>>;
    form: FormInstance;
}

const RepeatLoanSection = (props: RepeatLoanSectionProps) => {
    const [repeatLoanType,setRepeatLoanType]=useState('KEY_VALUE');
    useEffect(()=>{
        props.setCustomAntFormFieldError({});
        props.form.setFieldsValue({'repeatLoan':[]});
    },[repeatLoanType])

    return (
        <React.Fragment>
            <Divider orientation="left">复借配置</Divider>
            <Form.Item label={"分数类型"} name={"oldRankStrategy"} required initialValue={repeatLoanType}>
                <Radio.Group onChange={(e) => setRepeatLoanType(e.target.value)} >
                    <Radio value={'KEY_VALUE'}>值</Radio>
                    <Radio value={'SCORE'}>范围</Radio>
                    <Radio value={'REPAY_COUNT'}>
                        <Space>
                            依还款笔数
                            <Tooltip title="依成功还款笔数决定最高可借额度">
                                <InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} />
                            </Tooltip>
                        </Space>
                    </Radio>
                </Radio.Group>

            </Form.Item>
            <Form.Item label={"复借分数"} required
                help={(props.customAntFormFieldError?.[`repeatLoan_error`] as any)?.help}
                validateStatus={(props.customAntFormFieldError?.[`repeatLoan_error`] as any)?.validateStatus}>
                {{
                    'KEY_VALUE': <FirstAndRepeatLoanFormByValue {...props} type="repeatLoan" />,
                    'SCORE': <FirstAndRepeatLoanFormByRange {...props} type="repeatLoan"/>,
                    'REPAY_COUNT': <FirstAndRepeatLoanFormByCount {...props} type="repeatLoan"/>
                }[repeatLoanType]}
            </Form.Item>
            <Form.Item label={'放款笔数'} name="oldUseRcQuota" required>
                <Radio.Group>
                    <Radio value={true}>依照风控</Radio>
                    <Radio value={false}>系统规则</Radio>
                </Radio.Group>
            </Form.Item>
        </React.Fragment>
    )
}

export default RepeatLoanSection;
