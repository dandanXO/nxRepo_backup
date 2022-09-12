import React, { useEffect, useState } from 'react';
import { Tooltip, message } from 'antd';
import { injectIntl, FormattedMessage } from "react-intl";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import styles from './CopyText.less'

// acturalCopy 實際複製的可以與顯示的內容不同，沒給就是預設text 
function CopyText({ text, acturalCopy = text, intl, isEllispsis = false }) {

    const handleCopy = () => {
        message.success(intl.formatMessage({ id: "page.table.copy.success" }), 2);
    }
    return (
        <div className={styles.copyText}> 
            {text &&
                <CopyToClipboard text={acturalCopy} onCopy={handleCopy}> 
                    <Tooltip title={<FormattedMessage id="page.table.copy" />} >
                        <span className={`${isEllispsis ? styles.isEllispsis : ''}`}>{text}</span>
                    </Tooltip>
                </CopyToClipboard>
            }
        </div>
    )
}
CopyText.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default injectIntl(CopyText);
