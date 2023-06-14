import React from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import { itemRender } from "../../../../shared/components/common/itemRender";
import {Tabs, Tag, Tooltip} from "antd";
import {
    DescriptionsCard,
    PhotoCard,
    SinglePageTableCard,
    TableCard
} from "../../../../shared/components/withQueryHook/Cards";
import {
    useGetCollectTodayOrderDetailQuery,
    useGetCollectTodayUserDetailQuery,
    useLazyGetCollectTodayCollectRecordQuery
} from "../../../api/CollectTodayApi";
import {getIsSuperAdmin} from "../../../../shared/storage/getUserInfo";
import {CopyTextIcon} from "../../../../shared/components/other/CopyTextIcon";
import {formatPrice} from "../../../../shared/utils/format/formatPrice";
import {useEnum} from "../../../../shared/constants/useEnum";
import {i18nUrgeCollection} from "../../../../../i18n/urgeCollection/translations";
import moment from "moment-timezone";
import {InfoCircleOutlined} from "@ant-design/icons";
import {i18nCards} from "../../../../shared/components/i18n/cards/translations";

export const OrderDetail = () => {
    const urlParams=useParams<{ userId: string, collectId: string}>()
    const { t } = useTranslation(i18nUrgeCollection.namespace);
    const { t: cardsT } = useTranslation(i18nCards.namespace);
    const {
        OrderStatusEnum,
        OrderLabelEnum,
        FollowUpResultEnum,
        EmergencyContactEnum
    } = useEnum();

    const userId = Number(urlParams.userId);
    const collectId = Number(urlParams.collectId);
    const isSuperAdmin = getIsSuperAdmin();

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
        { title: cardsT('contactType'), key: 'contact', dataIndex: 'contact', render: (_, { contact }) => <div>{EmergencyContactEnum[contact] && EmergencyContactEnum[contact].text}</div>  },
        { title: cardsT('relationShip'), key: 'relationShip', dataIndex: 'relationShip' },
        { title: cardsT('contactName'), key: 'contactName', dataIndex: 'contactName' },
        { title: cardsT('contactName'), key: 'contactPhone', dataIndex: 'contactPhone' },
        { title: cardsT('uploadTime'), key: 'uploadTime', dataIndex: 'uploadTime', render: (_, { uploadTime }) => <div>{moment(uploadTime).format('YYYY-MM-DD HH:mm:ss')}</div> },
    ]

    let identityPhotoRows = ['idcardFrontPhoto', 'idcardBackPhoto', 'idcardPortraitPhoto']
    if(appInfo.COUNTRY === 'India') {
        identityPhotoRows = ['panPhoto', ...identityPhotoRows]
    }

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


    const tabsItems = [
        { label: t('tab.orderInfo'), key: 'orderInfo', children: <OrderInfoTab /> },
        { label: t('tab.userInfo'), key: 'userInfo', children: <UserInfoTab /> },
    ]


    return (
        <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    itemRender: itemRender,
                    routes: [
                        { path: "/", breadcrumbName: t('menu.homePage') },
                        { path: null, breadcrumbName: t('menu.currentDayOverdueCall') },
                        { path: "/todayLoanManage/todayPhoneUrgeList", breadcrumbName: t('menu.currentDayOverdueCallList') },
                        { path: null, breadcrumbName: t('breadcrumb.orderDetails') },
                    ],
                },
            }}
        >
            <Tabs items={tabsItems} />
        </PageContainer>
    )
}
