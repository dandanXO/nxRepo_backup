import { Form, Modal, Radio, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { HelperFormItem } from '../../../../shared/components/FormItem';
import { AmountInput } from '../../../../shared/components/Inputs';
import { useEnum } from '../../../../shared/constants/useEnum';
import { formatPrice } from '../../../../shared/utils/format/formatPrice';
import { fieldValidator } from '../../../../shared/validate/fieldValidator';
import { usePostCollectOverDuePhoneUrgeRecordMutation } from '../../../api/OverDuePhoneUrgeApi';
import { urgeCollectRecordSchema } from './urgeCollectRecordSchema';

const { Item } = Form;
const { Group, Button } = Radio;

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

interface IUrgeModalProps {
    collectId: string;
    userId: string;
    open: boolean;
    amountDue: number;
    handleCloseModal: () => void;
    onAdded: (generateLinkType, link: string) => void;
    generateLinkSwitch: boolean; // 是否可產生還款鏈結開關，true: 不可產生 / false : 可以產生
}

export const UrgeModal = ({
    open,
    handleCloseModal,
    collectId,
    userId,
    onAdded,
    amountDue,
    generateLinkSwitch,
}: IUrgeModalProps): JSX.Element => {
    const { t } = useTranslation();
    const formSchema = urgeCollectRecordSchema({ partialMoneyMax: amountDue });
    const [postTodayPhoneUrgeRecord, { isLoading }] = usePostCollectOverDuePhoneUrgeRecordMutation();
    const { EmergencyContactEnum, FollowUpResultEnum, GenerateRePayLinkEnum } = useEnum();
    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();

    const onOk = () => {
        form.submit();
    };

    const onFinish = () => {
        const { ptpTime, generateLink, repayAmount, ...rest } = form.getFieldsValue();
        const requestBody = {
            userId: Number(userId),
            collectId: Number(collectId),
            ptpTime: (ptpTime && ptpTime.format('HH:mm')) || '',
            generateLink: generateLink || 'NONE',
            repayAmount: Number(repayAmount),
            ...rest,
        };

        postTodayPhoneUrgeRecord(requestBody)
            .unwrap()
            .then((response) => {
                onAdded(requestBody.generateLink, response.remark);
                form.resetFields();
            })
            .catch((error) => {
                if (error?.data?.message) {
                    modal.confirm({
                        content: error.data.message,
                    });
                }
            });
    };

    const RePayLink = () => (
        <>
            <Item
                {...layout}
                name="generateLink"
                label={t('urgeCollection:generateLink')}
                tooltip={t('urgeCollection:tooltip.repayLink')}
                required
            >
                <Group buttonStyle="solid" style={{ display: 'flex', flexFlow: 'row wrap', rowGap: '5px' }}>
                    {Object.keys(GenerateRePayLinkEnum).map((part) => {
                        if (part == '') return null;
                        return (
                            <Button key={part} value={part}>
                                {GenerateRePayLinkEnum[part].text}
                            </Button>
                        );
                    })}
                </Group>
            </Item>
            {
                <Item dependencies={['generateLink']} noStyle>
                    {({ getFieldValue }) => {
                        const generateLink = getFieldValue('generateLink');
                        if (generateLink !== 'PARTIAL_REPAYMENT') return null;

                        return (
                            <HelperFormItem
                                layout={layout}
                                label={t('urgeCollection:repayAmount')}
                                help={`${t('urgeCollection:amountDue')} : ${formatPrice(amountDue)}`}
                                name="partialMoney"
                                required
                                rules={[
                                    { validator: (rule, value) => fieldValidator(rule['field'], value, formSchema) },
                                ]}
                            >
                                <AmountInput />
                            </HelperFormItem>
                        );
                    }}
                </Item>
            }
        </>
    );

    const PTPTime = () => (
        <Item
            {...layout}
            tooltip={t('urgeCollection:ptpTimeTooltip')}
            name="ptpTime"
            label={t('urgeCollection:ptpTime')}
            required
            rules={[{ required: true, message: `${t('zod:required')}${t('urgeCollection:ptpTime')}` }]}
        >
            <TimePicker placeholder={t('common:placeholder.select')} format={'HH:mm'} minuteStep={15} />
        </Item>
    );

    return (
        open && (
            <Modal
                title={t('urgeCollection:addUrge')}
                open={open}
                onCancel={() => {
                    handleCloseModal();
                }}
                onOk={onOk}
                maskClosable={false}
                width="752px"
                confirmLoading={isLoading}
                cancelButtonProps={{ disabled: isLoading }}
                okText={t('common:confirm')}
            >
                {contextHolder}
                <Form
                    disabled={isLoading}
                    form={form}
                    initialValues={{
                        contactPerson: 'BORROWER',
                        followUpResult: 'Promise',
                        ptpTime: '',
                        generateLink: 'NONE',
                        trackingRecord: '',
                    }}
                    onFinish={onFinish}
                >
                    <Item {...layout} name="contactPerson" label={t('urgeCollection:contactPerson')} required>
                        <Group buttonStyle="solid" style={{ display: 'flex', flexFlow: 'row wrap', rowGap: '5px' }}>
                            {Object.keys(EmergencyContactEnum).map((part) => {
                                return (
                                    <Button key={part} value={part}>
                                        {EmergencyContactEnum[part].text}
                                    </Button>
                                );
                            })}
                        </Group>
                    </Item>

                    <Item {...layout} name="followUpResult" label={t('urgeCollection:followUpResult')} required>
                        <Group buttonStyle="solid" style={{ display: 'flex', flexFlow: 'row wrap', rowGap: '5px' }}>
                            {Object.keys(FollowUpResultEnum).map((part) => {
                                if (part == '') return;
                                return (
                                    <Button key={part} value={part}>
                                        {FollowUpResultEnum[part].text}
                                    </Button>
                                );
                            })}
                        </Group>
                    </Item>

                    <Item dependencies={['followUpResult']} noStyle>
                        {({ getFieldValue }) => {
                            const followResult = getFieldValue('followUpResult');
                            if (followResult !== 'Promise' && followResult !== 'Other') return null;
                            return (
                                <>
                                    {followResult === 'Promise' && <PTPTime />}
                                    {(followResult === 'Promise' || followResult === 'Other') &&
                                        !generateLinkSwitch && <RePayLink />}
                                </>
                            );
                        }}
                    </Item>

                    <HelperFormItem
                        layout={layout}
                        name="trackingRecord"
                        label={t('urgeCollection:trackingRecord')}
                        help={t('urgeCollection:addTrackingRecordHelp')}
                        required
                        rules={[
                            { required: true, message: `${t('zod:required')}${t('urgeCollection:trackingRecord')}` },
                        ]}
                    >
                        <TextArea autoSize={{ minRows: 6 }} />
                    </HelperFormItem>
                </Form>
            </Modal>
        )
    );
};
