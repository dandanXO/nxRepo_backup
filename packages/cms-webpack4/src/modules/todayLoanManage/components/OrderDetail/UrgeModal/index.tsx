import React from "react";
import {Form, Input, Modal, Radio, Space, TimePicker} from "antd";
import {useTranslation} from "react-i18next";
import {i18nUrgeCollection} from "../../../../../i18n/urgeCollection/translations";
import {useEnum} from "../../../../shared/constants/useEnum";
import TextArea from "antd/es/input/TextArea";
import {usePostTodayPhoneUrgeRecordMutation} from "../../../api/TodayPhoneUrgeApi";


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
    handleCloseModal: () => void
}

export const UrgeModal = ({
    open, handleCloseModal, collectId, userId
}: IUrgeModalProps) => {
    const { t } = useTranslation(i18nUrgeCollection.namespace)
    const [ postTodayPhoneUrgeRecord] = usePostTodayPhoneUrgeRecordMutation();
    const { EmergencyContactEnum, FollowUpResultEnum, GenerateRePayLinkEnum } = useEnum()
    const [ form] = Form.useForm();

    const onOk = () => {
        form.submit()
    }

    const onFinish = () => {
        const { ptpTime , ...rest } = form.getFieldsValue()
        const requestBody = {
            ptpTime: ptpTime.format('HH:mm'),
            userId,
            collectId,
            ...rest
        }
        console.log(requestBody)
    }

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
        >
            <Form
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
                    style={{ marginTop: '-10px', marginBottom: '-10px'}}
                >
                    {
                        ({getFieldValue}) => {
                            const followResult = getFieldValue('followUpResult')
                            if(followResult !== 'Promise') return null
                            return (
                                <>
                                    <Item
                                        {...layout}
                                        name='ptpTime'
                                        label={t('ptpTime')}
                                        required
                                        rules={[
                                            { required: true,  message: `${t('keyIn')}${t('ptpTime')}` },
                                        ]}
                                    >
                                        <TimePicker
                                            placeholder={t('placeholder.select')}
                                            format={'HH:mm'}
                                            minuteStep={15}
                                        />
                                    </Item>

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
                                        style={{ marginTop: '-10px', marginBottom: '-10px'}}
                                    >
                                        {
                                            ({getFieldValue}) => {
                                                const generateLink = getFieldValue('generateLink')
                                                if(generateLink !== 'PARTIAL_REPAYMENT') return

                                                return (
                                                    <Item
                                                        label={t('partialMoney')}
                                                        name='partialMoney'
                                                        required
                                                        rules={[
                                                            { required: true }
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Item>
                                                )
                                            }
                                        }
                                    </Item>
                                </>
                            )
                        }
                    }
                </Item>

                <Item
                    {...layout}
                    label={t('trackingRecord')}
                    name='trackingRecord'
                    required
                    rules={[
                        { required: true, message: `${t('keyIn')}${t('trackingRecord')}` }
                    ]}
                    style={{ marginTop: '-10px'}}
                >
                    <TextArea autoSize={{ minRows:6 }}  />
                </Item>

            </Form>
        </Modal>
    )
}
