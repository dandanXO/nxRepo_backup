import React, { ReactNode } from 'react';
import { Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// actualCopy 實際複製的可以與顯示的內容不同，沒給就是預設text
function CopyText({ text, actualCopy = text }: { text: ReactNode, actualCopy?: ReactNode}): JSX.Element {
    const handleCopy = (copyContent: ReactNode) => {
        // console.log("copyContent", copyContent);
        if(window["SentryModule"] && window["SentryModule"]["sendCopyColumnTextMessage"]) {
            window["SentryModule"]["sendCopyColumnTextMessage"](copyContent);
        }
    };
    return (
        <div style={{ cursor: 'pointer' }}>
            {text &&
                <CopyToClipboard text={actualCopy} onCopy={() => handleCopy(text)}>
                    <Tooltip title={'点击复制'} >
                        <span>{text}</span>
                    </Tooltip>
                </CopyToClipboard>
            }
        </div>
    );
}

export default CopyText;
