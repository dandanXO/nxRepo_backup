import React from "react";
import { Card, Descriptions } from "antd";
import { useTranslation } from "react-i18next";

const { Item } = Descriptions;

const CardStyle = (props: { title: string, children }) => {
    const { title, children } = props
    return (
        <Card title={title} type="inner" size="small" headStyle={{ fontWeight: 'bold' }} bodyStyle={{ padding: 0 }} style={{ marginTop: '24px' }}>
            {children}
        </Card>
    );
}

interface IOrderInfoCardProps {
    orderId: number
}

const OrderInfoCard = ({
    orderId
}:IOrderInfoCardProps) => {
    const { t } = useTranslation()

    return (
        <CardStyle title={t('infoCard.orderInfo')}>
            <Descriptions size="small" bordered>
                <Item label={t('infoCard.orderNum')}>{orderId || "-"}</Item>
                <Item label={t('infoCard.orderNum')}>{orderId || "-"}</Item>
                <Item label={t('infoCard.orderNum')}>{orderId || "-"}</Item>
                <Item label={t('infoCard.orderNum')}>{orderId || "-"}</Item>
                <Item label={t('infoCard.orderNum')}>{orderId || "-"}</Item>
                <Item label={t('infoCard.orderNum')}>{orderId || "-"}</Item>
                <Item label={t('infoCard.orderNum')}>{orderId || "-"}</Item>
                <Item label={t('infoCard.orderNum')}>{orderId || "-"}</Item>
                <Item label={t('infoCard.orderNum')}>{orderId || "-"}</Item>
            </Descriptions>
        </CardStyle>
    )
}

export default OrderInfoCard;
