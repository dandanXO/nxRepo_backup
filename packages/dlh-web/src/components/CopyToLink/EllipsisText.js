import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { injectIntl } from "react-intl";
import styles from "./CopyToLink.less";


function EllipsisText({ text }) {
    return <div className={styles.linkText}>{text && <Tooltip title={text}>{text}</Tooltip>}</div>
}

export default injectIntl(EllipsisText);
