import { Divider, Form, FormInstance, Modal, Radio } from 'antd';
import React from 'react';

import { CustomAntFormFieldError } from '../../../../shared/utils/validation/CustomAntFormFieldError';
import FirstAndRepeatLoanFormByScore from './FirstAndRepeatLoanFormByScore';
import FirstAndRepeatLoanFormByValue from './FirstAndRepeatLoanFormByValue';

interface FirstLoanSectionProps {
    isEdit: boolean;
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<CustomAntFormFieldError>;
    form: FormInstance;
}

const FirstLoanSection = (props: FirstLoanSectionProps): JSX.Element => {
    const rankStrategy = Form.useWatch('rankStrategy', props.form);

    const resetErrorMessage = () => {
        const errorKeys = Object.keys(props.customAntFormFieldError);
        const removefirstLoanError = errorKeys.filter((i) => i.indexOf('firstLoan') < 0);
        const errorList = removefirstLoanError.reduce((prev, curr) => {
            return { ...prev, [curr]: props.customAntFormFieldError[curr] };
        }, {});
        props.setCustomAntFormFieldError(errorList);
    };

    const [modal, contextHolder] = Modal.useModal();

    const rankStratOnChange = () => {
        resetErrorMessage();

        const { firstLoan } = props.form.getFieldsValue();

        const isLoanFormNotFilled = firstLoan
            .map((loan) => {
                return Object.keys(loan)
                    .filter((field) => field !== 'id')
                    .every((i) => loan[i] === undefined);
            })
            .every((i) => i === true);

        if (!isLoanFormNotFilled) {
            modal.confirm({
                title: '切换分数类型将会清空现有的数据，确定仍要切换吗？',
                onOk() {
                    const isResetFirstLoan = props.isEdit ? firstLoan.map((i) => ({ id: i.id })) : [];
                    props.form.setFieldsValue({ firstLoan: isResetFirstLoan });
                },
                onCancel() {
                    props.form.setFieldsValue({ rankStrategy });
                    props.setCustomAntFormFieldError(props.customAntFormFieldError);
                },
            });
        }
    };

    return (
        <React.Fragment>
            <Divider style={{ color: '#00000073' }} orientation="left">
                新客配置
            </Divider>
            <Form.Item label={'分数类型'} name={'rankStrategy'} required>
                <Radio.Group onChange={rankStratOnChange}>
                    <Radio value={'KEY_VALUE'}>值</Radio>
                    <Radio value={'SCORE'}>范围</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label={'新客分数'}
                required
                tooltip={
                    <div>
                        <div>填写规则：</div>
                        <div>▪ 所有字段必填。</div>
                        <div>▪ 请按级数大小，由大至小填写数值。</div>
                        <div>▪ 所有数值必须为≥0的整数。</div>
                        <div>▪ 范围类型的各级距数值需连贯且大小值数值不可包含于相邻级距中。</div>
                        <div>▪ 最高可放款笔数和最高可借总额字段，下一级的值应≤上一级的值。</div>
                    </div>
                }
                help={(props.customAntFormFieldError?.[`firstLoan_error`] as any)?.help}
                validateStatus={(props.customAntFormFieldError?.[`firstLoan_error`] as any)?.validateStatus}
            >
                {
                    {
                        KEY_VALUE: <FirstAndRepeatLoanFormByValue {...props} type="firstLoan" />,
                        SCORE: <FirstAndRepeatLoanFormByScore {...props} type="firstLoan" />,
                    }[rankStrategy]
                }
            </Form.Item>
            <Form.Item label={'新客规则'} name="useRcQuota" required initialValue={true}>
                <Radio.Group>
                    <Radio value={true}>依照风控</Radio>
                    <Radio value={false}>系统规则</Radio>
                </Radio.Group>
            </Form.Item>
            {contextHolder}
        </React.Fragment>
    );
};

export default FirstLoanSection;
