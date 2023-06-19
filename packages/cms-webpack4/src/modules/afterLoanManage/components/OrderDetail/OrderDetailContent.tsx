import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useEnum} from "../../../shared/constants/useEnum";
import {useGetAdminSwitchQuery} from "../../../shared/api/commonApi";
import {getIsSuperAdmin} from "../../../shared/storage/getUserInfo";
import moment from "moment";
import {CopyTextIcon} from "../../../shared/components/other/CopyTextIcon";
import {Button, message, Modal, Tabs, Tag, Tooltip} from "antd";
import {formatPrice} from "../../../shared/utils/format/formatPrice";
import {InfoCircleOutlined} from "@ant-design/icons";
import {
    DescriptionsCard,
    PhotoCard,
    SinglePageTableCard,
    TableCard
} from "../../../shared/components/withQueryHook/Cards";
import {UrgeModal} from "./UrgeModal";
import {
    useGetCollectOverDueOrderDetailQuery,
    useGetCollectOverDueUserDetailQuery,
    useLazyGetCollectOverDueContactListQuery,
    useLazyGetCollectOverDueSMSLogQuery,
    useLazyGetCollectOverDueCollectRecordQuery
} from "../../api/CollectOverDueApi";

interface IOrderDetailContentProps {
    userId: string;
    collectId: string
}

export const OrderDetailContent = ({
   userId, collectId
}: IOrderDetailContentProps) => {
    const [showModal, setShowModal] = useState(false)
    const [showCopied, setShowCopied] = useState(false)
    const [refreshTabTag, setRefreshTabTag] = useState(false)

    const [messageApi, messageContextHolder]= message.useMessage();
    const [modalApi, modalContextHolder] = Modal.useModal();

    const { data: adminSwitch, isFetching: adminSwitchFetching } = useGetAdminSwitchQuery(null);
    const { data: orderInfo, isFetching: orderInfoFetching } = useGetCollectOverDueOrderDetailQuery({collectId});

    const { t } = useTranslation()
    const {
        OrderStatusEnum,
        OrderLabelEnum,
        FollowUpResultEnum,
        EmergencyContactEnum,
        GenerateRePayLinkEnum
    } = useEnum();

    const fetched = !orderInfoFetching && !adminSwitchFetching

    const onUrgeRecordAdded = (generateLinkType, link) => {
        setShowModal(false)
        messageApi.success(t('common:saved'))
        if(generateLinkType !== 'NONE') {
            modalApi.confirm({
                title: GenerateRePayLinkEnum[generateLinkType].copyLabel,
                icon: null,
                content: link,
                okText: t('common:clickToCopy'),
                onOk: () => {
                    navigator.clipboard.writeText(link)
                    setShowCopied(true)
                }
            })
        }
        setRefreshTabTag(!refreshTabTag)
    }

    useEffect(() => {
        if(showCopied) {
            messageApi.success(t('common:linkCopied')).then(() => setShowCopied(false))
        }
    }, [showCopied])

    const tabsItems = useMemo(() => {

        if(!fetched) return null

        const isSuperAdmin = getIsSuperAdmin();

        // 取得後台使用者開關 (是否可查看 tab -通訊錄 & 手機短信)
        // 在參數配置配有 "是否屏蔽當日到期前訂單通訊錄" 開關。
        // 開關沒開 = 顯示   (不用管到不到期） (開關有開 todayCollect.contactSwitch = true  , 開關沒開 todayCollect.contactSwitch = false)
        // 開關打開 + 有到期 = 顯示   (detailTabControl.contactSwitch = true , isNotOverdue = false -> addTab = true)
        // 開關打開 + 沒到期 = 不顯示 (detailTabControl.contactSwitch = true , isNotOverdue = true -> addTab = false)
        const contactSwitch = adminSwitch.todayCollect.contactSwitch;
        const smsSwitch = adminSwitch.todayCollect.smsSwitch;
        const overDueDate = moment(orderInfo.expireTime).startOf('day')
        const isOverDue = !moment().startOf('day').isBefore(overDueDate)
        const showContactListTab = !contactSwitch || isOverDue
        const showSMSTab = !smsSwitch || isOverDue

        const orderInfoDescriptions = [
            { key: 'orderNumber', dataIndex: 'orderNumber' },
            { key: 'mobileNumber', dataIndex: 'mobileNumber' },
            { key: 'channel', dataIndex: 'channel' },
            { key: 'appName', dataIndex: 'appName', render: (value, { channelUrl }) => <div>{value}<CopyTextIcon text={channelUrl}/></div> },
            { key: 'productName', dataIndex: 'productName' },
            { key: 'orderStatus', dataIndex: 'orderStatus', render: (value) => <Tag color={OrderStatusEnum[value].color}>{t(OrderStatusEnum[value].text)}</Tag> },
            { key: 'orderLabel', dataIndex: 'orderLabel', render:(value) => <Tag color={OrderLabelEnum[value].color}>{t(OrderLabelEnum[value].text)}</Tag> },
            { key: 'loanAmount', dataIndex: 'loanAmount', render: (value) => <div>{formatPrice(value) || 0 }</div> },
            { key: 'disburseAmount', dataIndex: 'disburseAmount', render: (value) => <div>{formatPrice(value) || 0 }</div> },
            {
                titleTooltip: <Tooltip title={t('urgeCollection:tooltip.amountDue')}><InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf', margin: '0 5px' }} /></Tooltip>,
                key: 'amountDue',
                dataIndex: 'amountDue',
                render: (value) => <div>{formatPrice(value) || 0 }</div>
            },
            { key: 'reductionAmount', dataIndex: 'reductionAmount', render: (value) => <div>{formatPrice(value) || 0 }</div> },
            { key: 'amountPaid', dataIndex: 'amountPaid', render: (value) => <div>{formatPrice(value) || 0 }</div> },
            { key: 'outstandingBalance', dataIndex: 'outstandingBalance', render: (value) => <div style={{color: '#FF4D4F'}}>{formatPrice(value) || 0 }</div> },
            { key: 'extensionAmount', dataIndex: 'extensionAmount', render: (value) => <div style={{color: '#FF4D4F'}}>{formatPrice(value) || 0 }</div> },
            { key: 'daysOverdue', dataIndex: 'daysOverdue', render: (value) => <div style={{color: '#FF4D4F'}}>{value}</div> },
            { key: 'overDueFee', dataIndex: 'overdueFee', render: (value) => <div style={{color: '#FF4D4F'}}>{formatPrice(value) || 0 }</div> },
            { key: 'applicationTime', dataIndex: 'applicationTime', render: (value) => <div>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</div> },
            { key: 'reviewTime', dataIndex: 'reviewTime', render: (value) => <div>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</div> },
            { key: 'expirationTime', dataIndex: 'expireTime', render: (value) => <div>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</div> },
        ]
        if(isSuperAdmin) {
            orderInfoDescriptions.splice(0, 0, {
                key: 'merchantName', dataIndex: 'merchantName'
            })
        }

        const collectRecordColumns = [
            { title: t('urgeCollection:trackingTime'), key: 'trackingTime', dataIndex: 'trackingTime', render: (_, { trackingTime }) =><div>{moment(trackingTime).format('YYYY-MM-DD HH:mm:ss')}</div> },
            { title: t('urgeCollection:stage'), key: 'overdueStage', dataIndex: 'overdueStage' },
            { title: t('urgeCollection:contactPerson'), key: 'contactPerson', dataIndex: 'contactPerson' },
            { title: t('urgeCollection:phone'), key: 'mobileNumber', dataIndex: 'mobileNumber' },
            {
                title: t('urgeCollection:followUpResult'),
                key: 'followUpResult',
                dataIndex: 'followUpResult',
                render: (_, { followUpResult }) => {
                    const followUpResultStatus = FollowUpResultEnum[followUpResult]
                    return <div>{followUpResultStatus.text}</div>
                }
            },
            {
                title: ()=><div>{t('urgeCollection:ptpTime')} <Tooltip title={<div style={{ whiteSpace: "pre-line"}}>{t('ptpTimeTooltip')}</div>}><InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} /></Tooltip></div>,
                key: 'ptpTime',
                dataIndex: 'ptpTime'
            },
            { title: t('urgeCollection:trackingRecord'), key: 'trackingRecord', dataIndex: 'trackingRecord' },
            { title: t('urgeCollection:collectorName'), key: 'collector', dataIndex: 'collector' },
        ]

        const registerDescriptions = [
            { key: 'userId', dataIndex: 'personaInfo.userId' },
            { key: 'registerChannel', dataIndex: 'personaInfo.channelName' },
            { key: 'packageName', dataIndex: 'personaInfo.appName' },
            { key: 'mobileNumber', dataIndex: 'personaInfo.phoneNo' },
            { key: 'registerTime', dataIndex: 'personaInfo.addTime', render: (_, { personaInfo }) => <div>{moment(personaInfo.addTime).format('YYYY-MM-DD HH:mm:ss')}</div> },
            { key: 'userSource', dataIndex: 'personaInfo.userSource' },
        ]

        const personalDescriptions = [
            { key: 'userName', dataIndex: 'personaInfo.nameTrue' },
            { key: 'gender', dataIndex: 'personaInfo.gender' },
            { key: 'idCardNo', dataIndex: 'personaInfo.idcardNo' },
            { key: 'fatherName', dataIndex: 'personaInfo.fatherName' },
            { key: 'birthDay', dataIndex: 'personaInfo.birth' },
            { key: 'panId', dataIndex: 'personaInfo.panId' },
            { key: 'education', dataIndex: 'personaInfo.education' },
            { key: 'maritalStatus', dataIndex: 'personaInfo.marriageStatus' },
            { key: 'email', dataIndex: 'personaInfo.email' },
            { key: 'occupation', dataIndex: 'personaInfo.position' },
            { key: 'salaryRange', dataIndex: 'personaInfo.salaryRange' },
            { key: 'address', dataIndex: 'personaInfo.address' },
        ]

        const emergencyContactColumns = [
            { title: t('common:table.contactType'), key: 'contact', dataIndex: 'contact', render: (_, { contact }) => <div>{EmergencyContactEnum[contact] && EmergencyContactEnum[contact].text}</div>  },
            { title: t('common:table.relationShip'), key: 'relationShip', dataIndex: 'relationShip' },
            { title: t('common:table.contactName'), key: 'contactName', dataIndex: 'contactName' },
            { title: t('common:table.contactPhone'), key: 'contactPhone', dataIndex: 'contactPhone' },
            { title: t('common:table.uploadTime'), key: 'uploadTime', dataIndex: 'uploadTime', render: (_, { uploadTime }) => <div>{moment(uploadTime).format('YYYY-MM-DD HH:mm:ss')}</div> },
        ]

        let identityPhotoRows = ['idcardFrontPhoto', 'idcardBackPhoto', 'idcardPortraitPhoto']
        if(appInfo.COUNTRY === 'India') {
            identityPhotoRows = ['panPhoto', ...identityPhotoRows]
        }

        const contactListColumns = [
            { title: t('common:table.contactName'), key: 'name', dataIndex: 'name' },
            { title: t('common:table.phone'), key: 'phone', dataIndex: 'phone' },
            { title: t('common:table.lastAddedTime'), key: 'lastUpdateTime', dataIndex: 'lastUpdateTime', render: (_, { lastUpdateTime }) => <div>{moment(lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}</div> },
        ]

        const smsLogsColumns = [
            { title: t('common:table.sendPhoneNumber'), key: 'phone', dataIndex: 'phone' },
            { title: t('common:table.smsContent'), key: 'content', dataIndex: 'content' },
            { title: t('common:table.smsSendType'), key: 'content', dataIndex: 'direction' },
            { title: t('common:table.sendTime'), key: 'time', dataIndex: 'time', render: (_, { time }) => <div>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</div> },
        ]

        const OrderInfoTab = () => (
            <div style={{ margin: '16px' }}>
                <DescriptionsCard titleKey={'orderInfo'} descriptions={orderInfoDescriptions} hook={useGetCollectOverDueOrderDetailQuery} params={{collectId}} />
                <TableCard titleKey='urgeRecord' columns={collectRecordColumns} hook={useLazyGetCollectOverDueCollectRecordQuery} queryBody={{collectId}} rowKey='id' />
            </div>
        )

        const UserInfoTab = () => (
            <div style={{ margin: '16px' }}>
                <DescriptionsCard titleKey={'registerInfo'} descriptions={registerDescriptions} hook={useGetCollectOverDueUserDetailQuery} params={{userId}} />
                <PhotoCard titleKey={'identityInfo'} rows={identityPhotoRows} hook={useGetCollectOverDueUserDetailQuery} params={{userId}} dataSourceKey='userImage'/>
                <DescriptionsCard titleKey={'personalInfo'} descriptions={personalDescriptions} hook={useGetCollectOverDueUserDetailQuery} params={{userId}} />
                <SinglePageTableCard titleKey={'emergencyContact'} columns={emergencyContactColumns} hook={useGetCollectOverDueUserDetailQuery} params={{userId}} rowKey='contact' dataSourceKey='emergencyContacts' />
            </div>
        )

        const ContactListTab = () => (
            <div style={{ margin: '16px' }}>
                <TableCard  columns={contactListColumns} hook={useLazyGetCollectOverDueContactListQuery} queryBody={{userId}} rowKey='phone' />
            </div>
        )

        const SMSMessageTab = () => (
            <div style={{ margin: '16px' }}>
                <TableCard columns={smsLogsColumns} hook={useLazyGetCollectOverDueSMSLogQuery} queryBody={{userId}} rowKey='id' />
            </div>
        )

        let tabsItems = [
            { label: t('common:tab.orderInfo'), key: 'orderInfo', children: <OrderInfoTab /> },
            { label: t('common:tab.userInfo'), key: 'userInfo', children: <UserInfoTab /> },
        ]

        if (showContactListTab) {
            tabsItems = [...tabsItems, { label: t('common:tab.contractList'), key: 'contactList', children: <ContactListTab /> }]
        }
        if (showSMSTab) {
            tabsItems = [...tabsItems, { label: t('common:tab.smsMessage'), key: 'smsMessage', children: <SMSMessageTab /> }]
        }

        return tabsItems
    }, [fetched])

    const Tab = useCallback(() => {
        if (!tabsItems) return null
        return (
            <Tabs
                items={tabsItems}
                tabBarExtraContent={
                    <Button
                        type='primary'
                        onClick={()=>setShowModal(true)}
                    >
                        {t('urgeCollection:addUrge')}
                    </Button>}
            />
        )
    }, [tabsItems, refreshTabTag])

    return (
        <React.Fragment>
            {messageContextHolder}
            {modalContextHolder}
            <UrgeModal
                collectId={collectId}
                userId={userId}
                open={showModal}
                amountDue={orderInfo?.amountDue}
                handleCloseModal={()=>setShowModal(false)}
                onAdded={onUrgeRecordAdded}
            />
            <Tab />
        </React.Fragment>
    )
}
