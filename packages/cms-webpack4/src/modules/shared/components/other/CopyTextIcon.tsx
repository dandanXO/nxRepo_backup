import React from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CopyOutlined} from "@ant-design/icons";
import { message } from "antd";
import {useTranslation} from "react-i18next";

interface ICopyTextIconProps {
    text: string
}

export const CopyTextIcon = (
    { text }: ICopyTextIconProps
) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation()

    const handleCopy = () => {
        messageApi.success(t('message.copySuccess'))
    }

    return (
        <div style={{ display: "inline", padding: '0 5px', color: '#1890FF' }}>
            {contextHolder}
            <CopyToClipboard text={text} onCopy={handleCopy}>
                <CopyOutlined />
            </CopyToClipboard>
        </div>
    )
}
