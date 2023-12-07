import { Card, Descriptions, Empty, Image, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetOrderDetailQuery } from '../../api/UserInfoApi';
import { GetOrderDetailResponse } from '../../api/userInfoTypes/getOrderDetail';
import { AMOUNT_UNIT } from '../../constants/constant';
import { useEnum } from '../../constants/useEnum';
import { formatPrice } from '../../utils/format/formatPrice';

const { Item } = Descriptions;

const CardStyle = (props: { title: string; children }) => {
    const { title, children } = props;
    return (
        <Card
            title={title}
            type="inner"
            size="small"
            headStyle={{ fontWeight: 'bold' }}
            bodyStyle={{ padding: 0 }}
            style={{ marginTop: '24px' }}
        >
            {children}
        </Card>
    );
};

const isUtr = (utr: string) => {
    return (
        typeof utr !== 'undefined' && utr !== '' && appInfo.COUNTRY !== 'Pakistan' && appInfo.COUNTRY !== 'Bangladesh'
    );
};
const isReceiptImage = (receiptImage: string) => {
    return typeof receiptImage !== 'undefined' && receiptImage !== '';
};

const OrderInfo = (props: { orderId: number; showLoanCertificate?: boolean }): JSX.Element => {
    const { currentData } = useGetOrderDetailQuery({ orderId: props.orderId });
    const imgError =
        'data:image/png;base64,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';

    const [orderDetail, setOrderDetail] = useState<GetOrderDetailResponse>({});

    const { t } = useTranslation();
    const { PayOutMethodEnum, PayOutStatusEnum } = useEnum();

    useEffect(() => {
        if (currentData !== undefined) {
            setOrderDetail(currentData);
        }
    }, [currentData]);
    const statusEnum = {
        '': { text: '不限' },
        '1': { text: '机审中', color: 'default' },
        '6': { text: '审核中', color: 'blue' },
        '7': { text: '审核拒绝', color: 'red' },
        '8': { text: '放款中', color: 'purple' },
        '9': { text: '还款中', color: 'blue' },
        '10': { text: '已完成', color: 'green' },
        '11': { text: '放款失败', color: 'red' },
        '12': { text: '已逾期', color: 'orange' },
    };
    const {
        orderNo,
        phoneNo,
        channelName,
        appName,
        productName,
        status,
        isOldUser,
        dummy,
        lendDays,
        deviceMoney,
        lendMoney,
        totalMoney,
        applyTime,
        reviewTime,
        loanTime,
        expireTime,
        overdueDays,
        overdueMoney,
        utr,
        receiptImage,
        couponUsageAmount,
        lastUpdateTime,
        loanCertificate,
    } = orderDetail;

    return (
        currentData !== undefined && (
            <div style={{ margin: '16px' }}>
                <CardStyle title="订单信息">
                    <Descriptions size="small" bordered>
                        <Item label="订单编号">{orderNo || '-'}</Item>
                        <Item label="手机号">{phoneNo || '-'}</Item>
                        <Item label="申請渠道">{channelName || '-'}</Item>
                        <Item label="APP名称">{appName || '-'}</Item>
                        <Item label="申请产品">{productName || '-'}</Item>
                        <Item label="订单状态">
                            {statusEnum[status] ? (
                                <Tag color={statusEnum[status].color}>{statusEnum[status].text}</Tag>
                            ) : (
                                '-'
                            )}
                        </Item>
                        <Item label="老客下单">{isOldUser ? '是' : '否'}</Item>
                        <Item label="空放订单">{dummy ? '是' : '否'}</Item>
                        <Item label="借款期限">{lendDays === 0 || lendDays ? lendDays : '-'}</Item>
                        <Item label="申请金额">{deviceMoney === 0 || deviceMoney ? deviceMoney : '-'}</Item>
                        <Item label="到帐金额">{lendMoney === 0 || lendMoney ? lendMoney : '-'}</Item>
                        <Item label="应还金额">{totalMoney === 0 || totalMoney ? totalMoney : '-'}</Item>
                        <Item label="使用优惠券金额">{couponUsageAmount || 0}</Item>
                        <Item label="申请时间">
                            {applyTime ? moment(applyTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                        </Item>
                        <Item label="审核时间">
                            {reviewTime ? moment(reviewTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                        </Item>
                        <Item label="放款时间">{loanTime ? moment(loanTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</Item>
                        <Item label="到期时间">
                            {expireTime ? moment(expireTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                        </Item>
                        <Item label="逾期天数">{overdueDays === 0 || overdueDays ? overdueDays : '-'}</Item>
                        <Item label="逾期金额">{overdueMoney === 0 || overdueMoney ? overdueMoney : '-'}</Item>
                    </Descriptions>
                </CardStyle>

                {props.showLoanCertificate && (
                    <CardStyle title={t('order:loanCertificate')}>
                        <Descriptions size="small" bordered column={2}>
                            <Item label={t('common:status')}>
                                {loanCertificate?.status ? (
                                    <Tag color={PayOutStatusEnum.get(loanCertificate.status).color}>
                                        {PayOutStatusEnum.get(loanCertificate.status).text}
                                    </Tag>
                                ) : (
                                    '-'
                                )}
                            </Item>
                            <Item label={t('order:payOutAmount', { unit: AMOUNT_UNIT })}>
                                {loanCertificate?.amount ? formatPrice(loanCertificate.amount) : '-'}
                            </Item>
                            <Item label={t('order:payOutCreateTime')}>
                                {loanCertificate?.createTime
                                    ? moment(loanCertificate?.createTime).format('YYYY-MM-DD HH:mm:ss')
                                    : '-'}
                            </Item>
                            <Item label={t('order:payOutFinishTime')}>
                                {loanCertificate?.finishTime
                                    ? moment(loanCertificate?.finishTime).format('YYYY-MM-DD HH:mm:ss')
                                    : '-'}
                            </Item>
                            <Item label={t('order:paymentOrderNumber')}>{loanCertificate?.orderNo || '-'}</Item>
                            <Item label={t('order:receiverName')}>{loanCertificate?.name || '-'}</Item>
                            <Item label={t('order:paymentMethod')}>
                                {loanCertificate?.payoutMethod
                                    ? PayOutMethodEnum.get(loanCertificate.payoutMethod)
                                    : '-'}
                            </Item>
                            <Item label={t('order:payeeAccount')}>{loanCertificate?.account || '-'}</Item>
                        </Descriptions>
                    </CardStyle>
                )}

                <CardStyle title="还款证明">
                    {isUtr(utr) || isReceiptImage(receiptImage) ? (
                        <Descriptions size="small" bordered>
                            <Item label="更新时间" labelStyle={{ width: 150 }} span={3}>
                                {lastUpdateTime ? moment(lastUpdateTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                            </Item>
                            {isUtr(utr) && (
                                <Item label="UTR" labelStyle={{ width: 150 }} span={3}>
                                    {utr || '-'}
                                </Item>
                            )}
                            {isReceiptImage(receiptImage) && (
                                <Item label="还款证明单据" labelStyle={{ width: 150 }} span={3}>
                                    <Image width={200} src={receiptImage || '-'} fallback={imgError} />
                                </Item>
                            )}
                        </Descriptions>
                    ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                </CardStyle>
            </div>
        )
    );
};

export default OrderInfo;
