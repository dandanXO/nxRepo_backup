import { Tooltip, message } from 'antd';
import React, { ReactNode } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

// actualCopy 實際複製的可以與顯示的內容不同，沒給就是預設text
function CopyText({ text, actualCopy = text }: { text: ReactNode; actualCopy?: ReactNode }): JSX.Element {
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation();

    const handleCopy = (copyContent: ReactNode) => {
        // console.log("copyContent", copyContent);
        if (window['SentryModule'] && window['SentryModule']['sendCopyColumnTextMessage']) {
            window['SentryModule']['sendCopyColumnTextMessage'](copyContent);
        }
        messageApi.success(t('common:message.copied'));
    };

    return (
        <div style={{ cursor: 'pointer' }}>
            {contextHolder}
            {text && (
                <CopyToClipboard text={actualCopy} onCopy={() => handleCopy(text)}>
                    <Tooltip title={t('common:clickToCopy')}>
                        <span>{text}</span>
                    </Tooltip>
                </CopyToClipboard>
            )}
        </div>
    );
}

export default CopyText;
