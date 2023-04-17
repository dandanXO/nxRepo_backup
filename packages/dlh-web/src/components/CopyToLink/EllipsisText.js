import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { injectIntl } from "react-intl";
import styles from "./CopyToLink.less";


function EllipsisText ({ text, title = text }) {
    return <div className={styles.linkText}>{text && <Tooltip title={title}>{text}</Tooltip>}</div>
}

export default injectIntl(EllipsisText);
