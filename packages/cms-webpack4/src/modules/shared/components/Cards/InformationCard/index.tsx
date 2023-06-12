import React from "react";
import {Card} from "antd";

interface IInformationCardProps {
    title: string;
    children: React.ReactNode
}

export const InformationCard = ({
    title, children
}: IInformationCardProps) => (
    <Card title={title} type="inner" size="small" headStyle={{ fontWeight: 'bold' }} bodyStyle={{ padding: 0 }} style={{ marginTop: '24px' }}>
        {children}
    </Card>
)
