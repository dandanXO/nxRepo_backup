import React from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CopyOutlined} from "@ant-design/icons";
import {message, Tooltip} from "antd";
import {useTranslation} from "react-i18next";

interface ICopyTextIconProps {
    text: string
    tooltip?: boolean
}

export const CopyTextIcon = (
    { text, tooltip }: ICopyTextIconProps
) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation()

    const handleCopy = () => {
        messageApi.success(t('message.copySuccess'))
    }

    const Copy = () => (
        <CopyToClipboard text={text} onCopy={handleCopy}>
            <CopyOutlined />
        </CopyToClipboard>
    )

    return (
        <div style={{ display: "inline", padding: '0 5px', color: '#1890FF' }}>
            {contextHolder}
            {tooltip ? <Tooltip title={text}><div style={{display:'inline'}}><Copy/></div></Tooltip>:<Copy/>}
        </div>
    )
}
