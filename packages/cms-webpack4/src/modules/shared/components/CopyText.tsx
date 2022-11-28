import React, { useEffect, useState } from 'react';
import { Tooltip, message} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';


// acturalCopy 實際複製的可以與顯示的內容不同，沒給就是預設text 
function CopyText({ text, acturalCopy = text}) {

    const handleCopy = () => {
        message.success('复制成功');
    }
    return (
        <div style={{cursor:'pointer'}}> 
            {text &&
                <CopyToClipboard text={acturalCopy} onCopy={handleCopy}> 
                    <Tooltip title={'点击复制'} >
                        <span>{text}</span>
                    </Tooltip>
                </CopyToClipboard>
            }
        </div>
    )
}

export default CopyText;
