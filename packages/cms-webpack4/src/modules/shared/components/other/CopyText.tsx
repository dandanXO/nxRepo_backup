import React, { useEffect, useState } from 'react';
import { Tooltip, message} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {Application} from "../../Application";



// acturalCopy 實際複製的可以與顯示的內容不同，沒給就是預設text
function CopyText({ text, acturalCopy = text}) {

    const handleCopy = (copyContent: string) => {
        // message.success('复制成功',2);
        console.log("copyContent", copyContent);

        const userActions = {
            "copy": `Copy-${Application.getEnvironmentName()}-ColumnCopy`,
            "pasta": `Pasta-${Application.getEnvironmentName()}-ColumnCopy`,
            "cut": `Cut-${Application.getEnvironmentName()}-ColumnCopy`,
        }

        if(window["SentryModule"] && window["SentryModule"]["sendMessage"]) {
            window["SentryModule"]["sendMessage"](userActions.copy, copyContent)
        }
    }
    return (
        <div style={{cursor:'pointer'}}>
            {text &&
                <CopyToClipboard text={acturalCopy} onCopy={() => handleCopy(text)}>
                    <Tooltip title={'点击复制'} >
                        <span>{text}</span>
                    </Tooltip>
                </CopyToClipboard>
            }
        </div>
    )
}

export default CopyText;
