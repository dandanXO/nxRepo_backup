import React from "react";
import {Form, Input, Modal, Radio, Space, TimePicker} from "antd";
import {useTranslation} from "react-i18next";
import {i18nUrgeCollection} from "../../../../../i18n/urgeCollection/translations";
import {useEnum} from "../../../../shared/constants/useEnum";
import TextArea from "antd/es/input/TextArea";
import {usePostTodayPhoneUrgeRecordMutation} from "../../../api/TodayPhoneUrgeApi";
import {reject} from "ramda";
import {HelperFormItem} from "../../../../shared/components/FormItem";
import moment from "moment-timezone";


const { Item } = Form
const { Group, Button } = Radio

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

interface IUrgeModalProps {
    collectId: string;
    userId: string;
    open: boolean;
    handleCloseModal: () => void,
    onAdded: (generateLinkType, link:string) => void
}

export const UrgeModal = ({
    open, handleCloseModal, collectId, userId, onAdded
}: IUrgeModalProps) => {
    const { t } = useTranslation(i18nUrgeCollection.namespace)
    const [ postTodayPhoneUrgeRecord, { isLoading }] = usePostTodayPhoneUrgeRecordMutation();
    const { EmergencyContactEnum, FollowUpResultEnum, GenerateRePayLinkEnum } = useEnum(i18nUrgeCollection.namespace)
    const [ form] = Form.useForm();

    const onOk = () => {
        form.submit()
    }

    const onFinish = () => {
        const { ptpTime, generateLink, ...rest } = form.getFieldsValue()
        let requestBody = {
            userId: Number(userId),
            collectId: Number(collectId),
            ptpTime: ptpTime.format('HH:mm') || '',
            generateLink: generateLink || 'NONE',
            ...rest
        }

        postTodayPhoneUrgeRecord(requestBody).unwrap().then((response) => {
            onAdded(requestBody.generateLink, response.remark)
            form.resetFields();
        })
    }

    const RePayLink = (generateLinkLabel, generateLinkTooltip, partialMoneyLabel ) => (
        <>
            <Item
                {...layout}
                name='generateLink'
                label={t('generateLink')}
                tooltip={t('tooltip.repayLink')}
                required
            >
                <Group buttonStyle='solid'>
                    {Object.keys(GenerateRePayLinkEnum).map((part) => {
                        if (part == '') return null
                        return (
                            <Button
                                key={part}
                                value={part}
                                style={{ marginBottom: '10px'}}
                            >
                                {GenerateRePayLinkEnum[part].text}
                            </Button>
                        )
                    })}
                </Group>
            </Item>
            <Item
                dependencies={['generateLink']}
                noStyle
            >
                {
                    ({getFieldValue}) => {
                        const generateLink = getFieldValue('generateLink')
                        if(generateLink !== 'PARTIAL_REPAYMENT') return null

                        return (
                            <Item
                                {...layout}
                                label={t('repayAmount')}
                                name='partialMoney'
                                required
                                rules={[
                                    { required: true }
                                ]}
                                style={{ marginTop: '-10px' }}
                            >
                                <Input style={{ width: '200px'}} />
                            </Item>
                        )
                    }
                }
            </Item>
        </>
    )

    const PTPTime = () => (
        <Item
            {...layout}
            name='ptpTime'
            label={t('ptpTime')}
            required
            rules={[
                { required: true,  message: `${t('keyIn')}${t('ptpTime')}` },
            ]}
            style={{ marginTop: '-10px' }}
        >
            <TimePicker
                placeholder={t('placeholder.select')}
                format={'HH:mm'}
                minuteStep={15}
            />
        </Item>
    )

    return open && (
        <Modal
            title={t('addUrge')}
            open={open}
            onCancel={() => {
                handleCloseModal()
            }}
            onOk={onOk}
            maskClosable={false}
            width='752px'
            confirmLoading={isLoading}
            cancelButtonProps={{ disabled : isLoading }}
        >
            <Form
                disabled={isLoading}
                form={form}
                initialValues={{
                    contactPerson: 'BORROWER',
                    followUpResult: 'Promise',
                    ptpTime: '',
                    generateLink: 'NONE',
                    trackingRecord: ''
                }}
                onFinish={onFinish}
            >
                <Item
                    {...layout}
                    name='contactPerson'
                    label={t('contactPerson')}
                    required
                >
                    <Group buttonStyle='solid'>
                        {Object.keys(EmergencyContactEnum).map((part) => {
                            return (
                                <Button
                                    key={part}
                                    value={part}
                                    style={{ marginBottom: '10px' }}
                                >
                                    {EmergencyContactEnum[part].text}
                                </Button>
                            )
                        })}
                    </Group>
                </Item>

                <Item
                    {...layout}
                    name='followUpResult'
                    label={t('followUpResult')}
                    required
                    style={{ marginTop: '-10px' }}
                >
                    <Group buttonStyle='solid'>
                        {Object.keys(FollowUpResultEnum).map((part) => {
                            if (part == '') return
                            return (
                                <Button
                                    key={part}
                                    value={part}
                                    style={{ marginBottom: '10px'}}
                                >
                                    {FollowUpResultEnum[part].text}
                                </Button>
                            )
                        })}
                    </Group>
                </Item>

                <Item
                    dependencies={['followUpResult']}
                    noStyle
                >
                    {
                        ({getFieldValue}) => {
                            const followResult = getFieldValue('followUpResult')
                            if((followResult !== 'Promise' && followResult !== 'Other')) return null
                            return (
                                <>
                                    {(followResult === 'Promise') && <PTPTime />}
                                    {(followResult === 'Promise' || followResult === 'Other') && <RePayLink />}
                                </>
                            )
                        }
                    }
                </Item>

                <HelperFormItem
                    layout={layout}
                    name='trackingRecord'
                    form={form}
                    label={t('trackingRecord')}
                    help={t('addTrackingRecordHelp')}
                    required
                    rules={[
                        { required: true, message: `${t('keyIn')}${t('trackingRecord')}` },
                    ]}
                >
                    <TextArea autoSize={{ minRows:6 }} />
                </HelperFormItem>
            </Form>
        </Modal>
    )
}
