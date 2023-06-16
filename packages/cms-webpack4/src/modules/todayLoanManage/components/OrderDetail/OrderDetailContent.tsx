import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {i18nUrgeCollection} from "../../../../i18n/urgeCollection/translations";
import {useEnum} from "../../../shared/constants/useEnum";
import {useGetAdminSwitchQuery} from "../../../shared/api/commonApi";
import {
    useGetCollectTodayOrderDetailQuery,
    useGetCollectTodayUserDetailQuery,
    useLazyGetCollectTodayCollectRecordQuery, useLazyGetCollectTodayContactListQuery, useLazyGetCollectTodaySMSLogQuery
} from "../../api/CollectTodayApi";
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
    const { data: orderInfo, isFetching: orderInfoFetching } = useGetCollectTodayOrderDetailQuery({collectId});

    const { t } = useTranslation(i18nUrgeCollection.namespace)
    const {
        OrderStatusEnum,
        OrderLabelEnum,
        FollowUpResultEnum,
        EmergencyContactEnum,
        GenerateRePayLinkEnum
    } = useEnum(i18nUrgeCollection.namespace);

    const fetched = !orderInfoFetching && !adminSwitchFetching

    const onUrgeRecordAdded = (generateLinkType, link) => {
        setShowModal(false)
        messageApi.success(t('saved'))
        if(generateLinkType !== 'NONE') {
            modalApi.confirm({
                title: GenerateRePayLinkEnum[generateLinkType].copyLabel,
                icon: null,
                content: link,
                okText: t('clickToCopy'),
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
            messageApi.success(t('linkCopied')).then(() => setShowCopied(false))
        }
    }, [showCopied])

    const tabsItems = useMemo(() => {
        console.log('get Tabs Items')

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
                titleTooltip: <Tooltip title={t('tooltip.amountDue')}><InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf', margin: '0 5px' }} /></Tooltip>,
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
            { title: t('trackingTime'), key: 'trackingTime', dataIndex: 'trackingTime', render: (_, { trackingTime }) =><div>{moment(trackingTime).format('YYYY-MM-DD HH:mm:ss')}</div> },
            { title: t('stage'), key: 'overdueStage', dataIndex: 'overdueStage' },
            { title: t('contactPerson'), key: 'contactPerson', dataIndex: 'contactPerson' },
            { title: t('phone'), key: 'mobileNumber', dataIndex: 'mobileNumber' },
            {
                title: t('followUpResult'),
                key: 'followUpResult',
                dataIndex: 'followUpResult',
                render: (_, { followUpResult }) => {
                    const followUpResultStatus = FollowUpResultEnum[followUpResult]
                    return <div>{followUpResultStatus.text}</div>
                }
            },
            {
                title: ()=><div>{t('ptpTime')} <Tooltip title={<div style={{ whiteSpace: "pre-line"}}>{t('ptpTimeTooltip')}</div>}><InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} /></Tooltip></div>,
                key: 'ptpTime',
                dataIndex: 'ptpTime'
            },
            { title: t('trackingRecord'), key: 'trackingRecord', dataIndex: 'trackingRecord' },
            { title: t('collectorName'), key: 'collector', dataIndex: 'collector' },
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
            { title: t('table.contactType'), key: 'contact', dataIndex: 'contact', render: (_, { contact }) => <div>{EmergencyContactEnum[contact] && EmergencyContactEnum[contact].text}</div>  },
            { title: t('table.relationShip'), key: 'relationShip', dataIndex: 'relationShip' },
            { title: t('table.contactName'), key: 'contactName', dataIndex: 'contactName' },
            { title: t('table.contactPhone'), key: 'contactPhone', dataIndex: 'contactPhone' },
            { title: t('table.uploadTime'), key: 'uploadTime', dataIndex: 'uploadTime', render: (_, { uploadTime }) => <div>{moment(uploadTime).format('YYYY-MM-DD HH:mm:ss')}</div> },
        ]

        let identityPhotoRows = ['idcardFrontPhoto', 'idcardBackPhoto', 'idcardPortraitPhoto']
        if(appInfo.COUNTRY === 'India') {
            identityPhotoRows = ['panPhoto', ...identityPhotoRows]
        }

        const contactListColumns = [
            { title: t('table.contactName'), key: 'name', dataIndex: 'name' },
            { title: t('table.phone'), key: 'phone', dataIndex: 'phone' },
            { title: t('table.lastAddedTime'), key: 'lastUpdateTime', dataIndex: 'lastUpdateTime', render: (_, { lastUpdateTime }) => <div>{moment(lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}</div> },
        ]

        const smsLogsColumns = [
            { title: t('table.sendPhoneNumber'), key: 'phone', dataIndex: 'phone' },
            { title: t('table.smsContent'), key: 'content', dataIndex: 'content' },
            { title: t('table.smsSendType'), key: 'content', dataIndex: 'direction' },
            { title: t('table.sendTime'), key: 'time', dataIndex: 'time', render: (_, { time }) => <div>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</div> },
        ]

        const OrderInfoTab = () => (
            <div style={{ margin: '16px' }}>
                <DescriptionsCard titleKey={'orderInfo'} descriptions={orderInfoDescriptions} hook={useGetCollectTodayOrderDetailQuery} params={{collectId}} />
                <TableCard titleKey='urgeRecord' columns={collectRecordColumns} hook={useLazyGetCollectTodayCollectRecordQuery} queryBody={{collectId}} rowKey='id' />
            </div>
        )

        const UserInfoTab = () => (
            <div style={{ margin: '16px' }}>
                <DescriptionsCard titleKey={'registerInfo'} descriptions={registerDescriptions} hook={useGetCollectTodayUserDetailQuery} params={{userId}} />
                <PhotoCard titleKey={'identityInfo'} rows={identityPhotoRows} hook={useGetCollectTodayUserDetailQuery} params={{userId}} dataSourceKey='userImage'/>
                <DescriptionsCard titleKey={'personalInfo'} descriptions={personalDescriptions} hook={useGetCollectTodayUserDetailQuery} params={{userId}} />
                <SinglePageTableCard titleKey={'emergencyContact'} columns={emergencyContactColumns} hook={useGetCollectTodayUserDetailQuery} params={{userId}} rowKey='contact' dataSourceKey='emergencyContacts' />
            </div>
        )

        const ContactListTab = () => (
            <div style={{ margin: '16px' }}>
                <TableCard  columns={contactListColumns} hook={useLazyGetCollectTodayContactListQuery} queryBody={{userId}} rowKey='phone' />
            </div>
        )

        const SMSMessageTab = () => (
            <div style={{ margin: '16px' }}>
                <TableCard columns={smsLogsColumns} hook={useLazyGetCollectTodaySMSLogQuery} queryBody={{userId}} rowKey='id' />
            </div>
        )

        let tabsItems = [
            { label: t('tab.orderInfo'), key: 'orderInfo', children: <OrderInfoTab /> },
            { label: t('tab.userInfo'), key: 'userInfo', children: <UserInfoTab /> },
        ]

        if (showContactListTab) {
            tabsItems = [...tabsItems, { label: t('tab.contractList'), key: 'contactList', children: <ContactListTab /> }]
        }
        if (showSMSTab) {
            tabsItems = [...tabsItems, { label: t('tab.smsMessage'), key: 'smsMessage', children: <SMSMessageTab /> }]
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
                        {t('addUrge')}
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
                handleCloseModal={()=>setShowModal(false)}
                onAdded={onUrgeRecordAdded}
            />
            <Tab />
        </React.Fragment>
    )
}
