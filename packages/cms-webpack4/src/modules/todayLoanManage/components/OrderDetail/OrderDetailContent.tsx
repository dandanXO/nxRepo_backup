import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Image, Modal, Tabs, Tag, Tooltip, message } from 'antd';
import i18next from 'i18next';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetAdminSwitchQuery } from '../../../shared/api/commonApi';
import { CopyTextIcon } from '../../../shared/components/other/CopyTextIcon';
import {
    DescriptionsCard,
    PhotoCard,
    SinglePageTableCard,
    TableCard,
} from '../../../shared/components/withQueryHook/Cards';
import { DescriptionsCardDescriptions } from '../../../shared/components/withQueryHook/Cards/DescriptionsCard';
import { AMOUNT_UNIT } from '../../../shared/constants/constant';
import { useEnum } from '../../../shared/constants/useEnum';
import { getIsSuperAdmin } from '../../../shared/storage/getUserInfo';
import { formatPrice } from '../../../shared/utils/format/formatPrice';
import {
    useGetCollectTodayGenerateLinkSwitchQuery,
    useGetCollectTodayOrderDetailQuery,
    useGetCollectTodayUserDetailQuery,
    useLazyGetCollectTodayCollectRecordQuery,
    useLazyGetCollectTodayContactListQuery,
    useLazyGetCollectTodaySMSLogQuery,
} from '../../api/CollectTodayApi';
import { UrgeModal } from './UrgeModal';

const amountUnit = AMOUNT_UNIT;

interface IOrderDetailContentProps {
    userId: string;
    collectId: string;
}

export const OrderDetailContent = ({ userId, collectId }: IOrderDetailContentProps): JSX.Element => {
    const [showModal, setShowModal] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [refreshTabTag, setRefreshTabTag] = useState(false);

    const [messageApi, messageContextHolder] = message.useMessage();
    const [modalApi, modalContextHolder] = Modal.useModal();

    const { data: adminSwitch, isFetching: adminSwitchFetching } = useGetAdminSwitchQuery(null);
    const { data: orderInfo, isFetching: orderInfoFetching } = useGetCollectTodayOrderDetailQuery({ collectId });
    const { data: generateLinkSwitch, isFetching: generateLinkSwitchFetching } =
        useGetCollectTodayGenerateLinkSwitchQuery({ todayId: collectId });

    const { t } = useTranslation();
    const {
        CurrentDayOrderStatusEnum,
        CurrentDayOverDueStageEnum,
        OrderLabelEnum,
        FollowUpResultEnum,
        EmergencyContactEnum,
        GenerateRePayLinkEnum,
        PayOutStatusEnum,
        PayOutMethodEnum,
    } = useEnum();

    const fetched = !orderInfoFetching && !adminSwitchFetching && !generateLinkSwitchFetching;

    const onUrgeRecordAdded = (generateLinkType, link) => {
        setShowModal(false);
        messageApi.success(t('common:saved'));
        if (generateLinkType !== 'NONE') {
            modalApi.confirm({
                title: GenerateRePayLinkEnum[generateLinkType]?.copyLabel,
                icon: null,
                content: link,
                okText: t('common:clickToCopy'),
                onOk: () => {
                    navigator.clipboard.writeText(link);
                    setShowCopied(true);
                },
            });
        }
        setRefreshTabTag(!refreshTabTag);
    };

    useEffect(() => {
        if (showCopied) {
            messageApi.success(t('common:message.linkCopied')).then(() => setShowCopied(false));
        }
    }, [showCopied]);

    const tabsItems = useMemo(() => {
        if (!fetched) return null;

        const isSuperAdmin = getIsSuperAdmin();

        // 取得後台使用者開關 (是否可查看 tab -通訊錄 & 手機短信)
        // 在參數配置配有 "是否屏蔽當日到期前訂單通訊錄" 開關。
        // 開關沒開 = 顯示   (不用管到不到期） (開關有開 todayCollect.contactSwitch = true  , 開關沒開 todayCollect.contactSwitch = false)
        // 開關打開 + 有到期 = 顯示   (detailTabControl.contactSwitch = true , isNotOverdue = false -> addTab = true)
        // 開關打開 + 沒到期 = 不顯示 (detailTabControl.contactSwitch = true , isNotOverdue = true -> addTab = false)
        const contactSwitch = adminSwitch.todayCollect.contactSwitch;
        const smsSwitch = adminSwitch.todayCollect.smsSwitch;
        const overDueDate = moment(orderInfo.expireTime).startOf('day');
        const isOverDue = !moment().startOf('day').isBefore(overDueDate);
        const showContactListTab = !contactSwitch || isOverDue;
        const showSMSTab = !smsSwitch || isOverDue;

        const orderInfoDescriptions: DescriptionsCardDescriptions[] = [
            { title: t('order:orderNumber'), dataIndex: 'orderNumber' },
            { title: t('order:mobileNumber'), dataIndex: 'mobileNumber' },
            { title: t('order:channel'), dataIndex: 'channel' },
            {
                title: t('order:appName'),
                dataIndex: 'appName',
                render: (value, { channelUrl }) => (
                    <div>
                        {value}
                        <CopyTextIcon text={channelUrl} tooltip copiedMessage={t('common:message.linkCopied')} />
                    </div>
                ),
            },
            { title: t('order:productName'), dataIndex: 'productName' },
            {
                title: t('order:orderStatus'),
                dataIndex: 'orderStatus',
                render: (value) => (
                    <Tag color={CurrentDayOrderStatusEnum.get(value)?.color}>
                        {CurrentDayOrderStatusEnum.get(value)?.text}
                    </Tag>
                ),
            },
            {
                title: t('order:orderLabel'),
                dataIndex: 'orderLabel',
                render: (value) => <Tag color={OrderLabelEnum[value]?.color}>{t(OrderLabelEnum[value]?.text)}</Tag>,
            },
            {
                title: t('order:loanAmount', { unit: amountUnit }),
                dataIndex: 'loanAmount',
                render: (value) => <div>{formatPrice(value) || 0}</div>,
            },
            {
                title: t('order:disburseAmount', { unit: amountUnit }),
                dataIndex: 'disburseAmount',
                render: (value) => <div>{formatPrice(value) || 0}</div>,
            },
            {
                titleTooltip: (
                    <Tooltip title={t('urgeCollection:tooltip.amountDue')}>
                        <InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf', margin: '0 5px' }} />
                    </Tooltip>
                ),
                title: t('order:amountDue', { unit: amountUnit }),
                dataIndex: 'amountDue',
                render: (value) => <div>{formatPrice(value) || 0}</div>,
            },
            {
                title: t('order:couponUsageAmount', { unit: amountUnit }),
                dataIndex: 'couponUsageAmount',
                render: (value) => <div style={{ color: '#1890FF' }}>{value || 0}</div>,
            },
            {
                title: t('order:reductionAmount', { unit: amountUnit }),
                dataIndex: 'reductionAmount',
                render: (value) => <div>{formatPrice(value) || 0}</div>,
            },
            {
                title: t('order:amountPaid', { unit: amountUnit }),
                dataIndex: 'amountPaid',
                render: (value) => <div>{formatPrice(value) || 0}</div>,
            },
            {
                title: t('order:outstandingBalance', { unit: amountUnit }),
                dataIndex: 'outstandingBalance',
                render: (value) => <div style={{ color: '#FF4D4F' }}>{formatPrice(value) || 0}</div>,
            },
            {
                title: t('order:extensionAmount', { unit: amountUnit }),
                dataIndex: 'extensionAmount',
                render: (value) => <div style={{ color: '#FF4D4F' }}>{formatPrice(value) || 0}</div>,
            },
            {
                title: t('order:daysOverdue'),
                dataIndex: 'daysOverdue',
                render: (value) => <div style={{ color: '#FF4D4F' }}>{value}</div>,
            },
            {
                title: t('order:overDueFee', { unit: amountUnit }),
                dataIndex: 'overdueFee',
                render: (value) => <div style={{ color: '#FF4D4F' }}>{formatPrice(value) || 0}</div>,
            },
            {
                title: t('order:applicationTime'),
                dataIndex: 'applicationTime',
                render: (value) => <div>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</div>,
            },
            {
                title: t('order:reviewTime'),
                dataIndex: 'reviewTime',
                render: (value) => <div>{value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>,
            },
            {
                title: t('order:expirationTime'),
                dataIndex: 'expireTime',
                render: (value) => <div>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</div>,
            },
        ];
        if (isSuperAdmin) {
            orderInfoDescriptions.splice(0, 0, {
                title: t('order:merchantName'),
                dataIndex: 'merchantName',
            });
        }

        const loanCertificateDescriptions: DescriptionsCardDescriptions[] = [
            {
                title: t('common:status'),
                dataIndex: 'loanCertificate.status',
                render: (value) =>
                    value ? (
                        <Tag color={PayOutStatusEnum.get(value).color}>{PayOutStatusEnum.get(value).text}</Tag>
                    ) : (
                        '-'
                    ),
            },
            {
                title: t('order:payOutAmount', { unit: AMOUNT_UNIT }),
                dataIndex: 'loanCertificate.amount',
                render: (value) => formatPrice(value),
            },
            {
                title: t('order:payOutCreateTime'),
                dataIndex: 'loanCertificate.createTime',
                render: (value) => moment(value).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                title: t('order:payOutFinishTime'),
                dataIndex: 'loanCertificate.finishTime',
                render: (value) => moment(value).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                title: t('order:paymentOrderNumber'),
                dataIndex: 'loanCertificate.orderNo',
            },
            {
                title: t('order:receiverName'),
                dataIndex: 'loanCertificate.name',
            },
            {
                title: t('order:paymentMethod'),
                dataIndex: 'loanCertificate.payoutMethod',
                render: (value) => PayOutMethodEnum.get(value),
            },
            {
                title: t('order:payeeAccount'),
                dataIndex: 'loanCertificate.account',
            },
        ];

        const repaymentProofDescriptions: DescriptionsCardDescriptions[] = [
            {
                title: t('common:updateTime'),
                dataIndex: 'payReceipt.lastUpdateTime',
                span: 3,
                labelStyle: { width: 120 },
            },
            {
                title: t('urgeCollection:repaymentProof'),
                dataIndex: 'payReceipt.receiptImgUrl',
                span: 3,
                labelStyle: { width: 120 },
                render: (value) => (value ? <Image width={200} src={value} /> : '-'),
            },
        ];

        if (['India'].includes(appInfo.COUNTRY)) {
            repaymentProofDescriptions.splice(1, 0, {
                title: 'UTR',
                dataIndex: 'payReceipt.receipt',
                span: 3,
                labelStyle: { width: 120 },
            });
        }

        const collectRecordColumns = [
            {
                title: t('urgeCollection:trackingTime'),
                dataIndex: 'trackingTime',
                width: '8%',
                render: (_, { trackingTime }) => <div>{moment(trackingTime).format('YYYY-MM-DD HH:mm:ss')}</div>,
            },
            {
                title: t('urgeCollection:stage'),
                dataIndex: 'overdueStage',
                width: '8%',
                ellipsis: true,
                render: (_, { overdueStage }) => CurrentDayOverDueStageEnum[overdueStage]?.text || overdueStage,
            },
            {
                title: t('urgeCollection:contactPerson'),
                dataIndex: 'contactPerson',
                width: '8%',
                render: (_, { contactPerson }) => EmergencyContactEnum[contactPerson]?.text || contactPerson,
            },
            { title: t('urgeCollection:phone'), key: 'mobileNumber', dataIndex: 'mobileNumber', width: '10%' },
            {
                title: t('urgeCollection:followUpResult'),
                dataIndex: 'followUpResult',
                width: '10%',
                render: (_, { followUpResult }) => {
                    return <div>{FollowUpResultEnum[followUpResult]?.text}</div>;
                },
            },
            {
                title: () => (
                    <div>
                        {t('urgeCollection:ptpTime')}{' '}
                        <Tooltip
                            title={<div style={{ whiteSpace: 'pre-line' }}>{t('urgeCollection:ptpTimeTooltip')}</div>}
                        >
                            <InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} />
                        </Tooltip>
                    </div>
                ),
                dataIndex: 'ptpTime',
                width: '6%',
            },
            {
                title: t('urgeCollection:trackingRecord'),
                dataIndex: 'trackingRecord',
                width: '30%',
            },
            { title: t('urgeCollection:collectorName'), key: 'collector', dataIndex: 'collector', width: '10%' },
        ];

        const registerDescriptions = [
            { title: t('user:userId'), dataIndex: 'personaInfo.userId' },
            { title: t('user:registerChannel'), dataIndex: 'personaInfo.channelName' },
            { title: t('user:registerPackageName'), dataIndex: 'personaInfo.appName' },
            { title: t('user:mobileNumber'), dataIndex: 'personaInfo.phoneNo' },
            {
                title: t('user:registerTime'),
                dataIndex: 'personaInfo.addTime',
                render: (value) => <div>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</div>,
            },
            {
                title: t('user:userSource'),
                dataIndex: 'personaInfo.userSource',
                render: (value) =>
                    value ? (
                        <div style={{ display: 'flex' }}>
                            <div
                                style={{
                                    width: '200px',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {value}
                            </div>
                            <CopyTextIcon text={value} tooltip />
                        </div>
                    ) : (
                        '-'
                    ),
            },
        ];

        const personalDescriptions = [
            { title: t('user:userName'), dataIndex: 'personaInfo.nameTrue' },
            { title: t('user:gender'), dataIndex: 'personaInfo.gender' },
            { title: t('user:idCardNo'), dataIndex: 'personaInfo.idcardNo' },
            { title: t('user:fatherName'), dataIndex: 'personaInfo.fatherName' },
            { title: t('user:birthDay'), dataIndex: 'personaInfo.birth' },
            { title: t('user:panId'), dataIndex: 'personaInfo.panId' },
            { title: t('user:education'), dataIndex: 'personaInfo.education' },
            { title: t('user:maritalStatus'), dataIndex: 'personaInfo.marriageStatus' },
            { title: t('user:email'), dataIndex: 'personaInfo.email' },
            { title: t('user:occupation'), dataIndex: 'personaInfo.position' },
            { title: t('user:salaryRange'), dataIndex: 'personaInfo.salaryRange' },
            { title: t('user:address'), dataIndex: 'personaInfo.address' },
        ];

        if (appInfo.COUNTRY !== 'India') {
            personalDescriptions.push({ title: t('user:companyName'), dataIndex: 'personaInfo.companyName' });
        }

        const emergencyContactColumns = [
            {
                title: t('common:table.contactType'),
                dataIndex: 'contact',
                render: (_, { contact }) => <div>{EmergencyContactEnum[contact]?.text}</div>,
            },
            { title: t('common:table.relationShip'), dataIndex: 'relationShip' },
            { title: t('common:table.contactName'), dataIndex: 'contactName' },
            { title: t('common:table.contactPhone'), dataIndex: 'contactPhone' },
            {
                title: t('common:table.uploadTime'),
                dataIndex: 'uploadTime',
                render: (_, { uploadTime }) => <div>{moment(uploadTime).format('YYYY-MM-DD HH:mm:ss')}</div>,
            },
        ];

        let identityPhotoRows = ['idcardFrontPhoto', 'idcardBackPhoto', 'idcardPortraitPhoto'];
        if (appInfo.COUNTRY === 'India') {
            identityPhotoRows = ['panPhoto', ...identityPhotoRows];
        }

        const contactListColumns = [
            { title: t('common:table.contactName'), key: 'name', dataIndex: 'name' },
            { title: t('common:table.phone'), key: 'phone', dataIndex: 'phone' },
            {
                title: t('common:table.lastAddedTime'),
                key: 'lastUpdateTime',
                dataIndex: 'lastUpdateTime',
                render: (_, { lastUpdateTime }) => <div>{moment(lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}</div>,
            },
        ];

        const smsLogsColumns = [
            { title: t('common:table.sendPhoneNumber'), dataIndex: 'phone', width: '15%' },
            { title: t('common:table.smsContent'), dataIndex: 'content', width: '65%' },
            { title: t('common:table.smsSendType'), dataIndex: 'direction', width: '10%' },
            {
                title: t('common:table.sendTime'),
                dataIndex: 'time',
                width: '10%',
                render: (_, { time }) => <div>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</div>,
            },
        ];

        const OrderInfoTab = () => (
            <div style={{ margin: '16px' }}>
                <DescriptionsCard
                    title={t('order:orderInfo')}
                    descriptions={orderInfoDescriptions}
                    hook={useGetCollectTodayOrderDetailQuery}
                    params={{ collectId }}
                />
                <DescriptionsCard
                    title={t('order:loanCertificate')}
                    descriptions={loanCertificateDescriptions}
                    hook={useGetCollectTodayOrderDetailQuery}
                    params={{ collectId }}
                    column={2}
                />
                <TableCard
                    title={t('urgeCollection:urgeRecord')}
                    columns={collectRecordColumns}
                    hook={useLazyGetCollectTodayCollectRecordQuery}
                    queryBody={{ collectId }}
                    rowKey="id"
                />
                <DescriptionsCard
                    title={t('urgeCollection:repaymentProof')}
                    descriptions={repaymentProofDescriptions}
                    hook={useGetCollectTodayOrderDetailQuery}
                    params={{ collectId }}
                />
            </div>
        );

        const UserInfoTab = () => (
            <div style={{ margin: '16px' }}>
                <DescriptionsCard
                    title={t('user:registerInfo')}
                    descriptions={registerDescriptions}
                    hook={useGetCollectTodayUserDetailQuery}
                    params={{ userId }}
                />
                <PhotoCard
                    title={t('user:identityInfo')}
                    rows={identityPhotoRows}
                    hook={useGetCollectTodayUserDetailQuery}
                    params={{ userId }}
                    dataSourceKey="userImage"
                />
                <DescriptionsCard
                    title={t('user:personalInfo')}
                    descriptions={personalDescriptions}
                    hook={useGetCollectTodayUserDetailQuery}
                    params={{ userId }}
                />
                <SinglePageTableCard
                    title={t('user:emergencyContact')}
                    columns={emergencyContactColumns}
                    hook={useGetCollectTodayUserDetailQuery}
                    params={{ userId }}
                    rowKey="contact"
                    dataSourcePath="emergencyContacts"
                />
            </div>
        );

        const ContactListTab = () => (
            <div style={{ margin: '16px' }}>
                <TableCard
                    columns={contactListColumns}
                    hook={useLazyGetCollectTodayContactListQuery}
                    queryBody={{ userId }}
                    rowKey="phone"
                />
            </div>
        );

        const SMSMessageTab = () => (
            <div style={{ margin: '16px' }}>
                <TableCard
                    columns={smsLogsColumns}
                    hook={useLazyGetCollectTodaySMSLogQuery}
                    queryBody={{ userId }}
                    rowKey="id"
                />
            </div>
        );

        let tabsItems = [
            { label: t('common:tab.orderInfo'), key: 'orderInfo', children: <OrderInfoTab /> },
            { label: t('common:tab.userInfo'), key: 'userInfo', children: <UserInfoTab /> },
        ];

        if (showContactListTab) {
            tabsItems = [
                ...tabsItems,
                { label: t('common:tab.contractList'), key: 'contactList', children: <ContactListTab /> },
            ];
        }
        if (showSMSTab) {
            tabsItems = [
                ...tabsItems,
                { label: t('common:tab.smsMessage'), key: 'smsMessage', children: <SMSMessageTab /> },
            ];
        }

        return tabsItems;
    }, [fetched, i18next.language]);

    const Tab = useCallback(() => {
        if (!tabsItems) return null;
        return (
            <Tabs
                items={tabsItems}
                tabBarExtraContent={
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button type="primary" onClick={() => setShowModal(true)}>
                            {t('urgeCollection:addUrge')}
                        </Button>
                        <Button onClick={() => history.back()}>{t('common:goBack')}</Button>
                    </div>
                }
            />
        );
    }, [tabsItems, refreshTabTag]);

    return (
        <React.Fragment>
            {messageContextHolder}
            {modalContextHolder}
            <UrgeModal
                collectId={collectId}
                userId={userId}
                open={showModal}
                amountDue={orderInfo?.amountDue}
                handleCloseModal={() => setShowModal(false)}
                onAdded={onUrgeRecordAdded}
                generateLinkSwitch={generateLinkSwitch}
            />
            <Tab />
        </React.Fragment>
    );
};
