import React, { lazy, useState,useEffect } from "react";
import { Divider, Form, FormInstance, Space, Radio, Tooltip, Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import FirstAndRepeatLoanFormByValue from "./FirstAndRepeatLoanFormByValue";
import FirstAndRepeatLoanFormByScore from "./FirstAndRepeatLoanFormByScore";
import FirstAndRepeatLoanFormByCount from "./FirstAndRepeatLoanFormByCount";
import { CustomAntFormFieldError } from "../../../../shared/utils/validation/CustomAntFormFieldError";

interface RepeatLoanSectionProps{
    isEdit:boolean;
    customAntFormFieldError:CustomAntFormFieldError;
    setCustomAntFormFieldError:React.Dispatch<React.SetStateAction<Object>>;
    form: FormInstance;
}

const RepeatLoanSection = (props: RepeatLoanSectionProps) => {
    const oldRankStrategy = Form.useWatch('oldRankStrategy', props.form);

    const resetErrorMessage = () => {
        const errorKeys = Object.keys(props.customAntFormFieldError);
        const removeRepeatLoanError = errorKeys.filter((i) => i.indexOf("repeatLoan") < 0);
        const errorList = removeRepeatLoanError.reduce((prev, curr) => {
          return { ...prev, [curr]: props.customAntFormFieldError[curr] };
        }, {});
        props.setCustomAntFormFieldError(errorList);
    }

    const [modal, contextHolder] = Modal.useModal();

    const oldRankStratOnChange = (e) => {
        resetErrorMessage();
        const { repeatLoan } = props.form.getFieldsValue();
        const isLoanFormNotFilled = repeatLoan.map(loan => {
            return Object.keys(loan).filter(field => field !== 'id').every(i => loan[i] === undefined)
        }).every(i => i === true);
        if (!isLoanFormNotFilled) {
            modal.confirm({
                title: "切换分数类型将会清空现有的数据，确定仍要切换吗？",
                onOk() {
                    const isResetRepeatLoan = props.isEdit ? repeatLoan.map(i => ({ id: i.id })) : [];
                    props.form.setFieldsValue({ repeatLoan: isResetRepeatLoan });
                },
                onCancel() {
                    props.form.setFieldsValue({ oldRankStrategy });
                    props.setCustomAntFormFieldError(props.customAntFormFieldError);
                }
            })
        }
    }
    return (
        <React.Fragment>
            <Divider style={{color:'#00000073'}} orientation="left">复借配置</Divider>
            <Form.Item label={"分数类型"} name={"oldRankStrategy"} required>
                <Radio.Group onChange={oldRankStratOnChange} >
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
                tooltip={
                    <div>
                        <div>填写规则：</div>
                        <div>▪ 所有字段必填。</div>
                        <div>▪ 请按级数大小，由大至小填写数值。</div>
                        <div>▪ 范围类型的各级距数值需连贯。</div>
                        <div>▪ 各级距数值不可包含于相邻级距中。</div>
                        <div>▪ 所有数值必须为大于0的整数。</div>
                    </div>
                }
                help={(props.customAntFormFieldError?.[`repeatLoan_error`] as any)?.help}
                validateStatus={(props.customAntFormFieldError?.[`repeatLoan_error`] as any)?.validateStatus}>
                {{
                    'KEY_VALUE': <FirstAndRepeatLoanFormByValue {...props} type="repeatLoan" />,
                    'SCORE': <FirstAndRepeatLoanFormByScore {...props} type="repeatLoan"/>,
                    'REPAY_COUNT': <FirstAndRepeatLoanFormByCount {...props} type="repeatLoan"/>
                }[oldRankStrategy]}
            </Form.Item>
            <Form.Item label={'复借规则'} name="oldUseRcQuota" required initialValue={true}>
                <Radio.Group>
                    <Radio value={true}>依照风控</Radio>
                    <Radio value={false}>系统规则</Radio>
                </Radio.Group>
            </Form.Item>
            {contextHolder}
        </React.Fragment>
    )
}

export default RepeatLoanSection;
