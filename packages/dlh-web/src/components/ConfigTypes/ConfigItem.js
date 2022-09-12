import React from 'react';
import { Tooltip } from "antd";
import styles from './ConfigItem.less';

function ConfigItem({ name, remark, children }) {

    const configButtons = children[0] || [];
    const validationItem = children[1] || children;

    return (
        <div className={styles.configItem}>
            <div className={styles.configName} dangerouslySetInnerHTML={{ __html: name }}></div>
            <div className={styles.configConfirm}>{configButtons && configButtons}</div>
            <Tooltip placement="top" title={<div dangerouslySetInnerHTML={{ __html: remark }}></div>}>
                {validationItem}
            </Tooltip>
        </div>
    );
}

export default ConfigItem;
