import React, { useEffect, useState } from 'react';
import { Tooltip, Icon, message } from 'antd';
import { injectIntl } from "react-intl";
import styles from "./CopyToLink.less";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormattedMessage } from "react-intl";
import EllipsisText from './EllipsisText';
import PropTypes from 'prop-types';
function CopyToLink({ text, intl, title }) {

    const handleCopy = () => {
        message.success(intl.formatMessage({ id: "page.table.copy.success" }), 2);
    }
    return (
        <div className={styles.copyToLink}>
            <EllipsisText text={text} />
            {text &&
                <CopyToClipboard text={text} onCopy={handleCopy}>
                    <Tooltip title={title ? title : <FormattedMessage id="page.table.copy" />}><Icon type={'copy'} /></Tooltip>
                </CopyToClipboard>
            }
        </div>
    )

}
CopyToLink.PropTypes = {
    intl: PropTypes.object.isRequired,
}


export default injectIntl(CopyToLink);
