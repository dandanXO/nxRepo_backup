import React, { useState } from 'react';
import { Switch } from "antd";
import ConfigItem from "./ConfigItem"
import styles from './ConfigItem.less';

function ConfigSwitch({ inputKey, channelId, name, value, remark, saveValue }) {

    const [currentValue, setCurrentValue] = useState(value === "0" ? false : true)

    const handleOnChange = (check) => {
        const isChecked = check === false ? "0" : "1";
        setCurrentValue(check)
        saveValue(inputKey, channelId, isChecked)
    }

    return (
        <ConfigItem name={name} remark={remark}>
            <div className={styles.validationSwitch}>
                <Switch checkedChildren="开" unCheckedChildren="关" checked={currentValue} onChange={handleOnChange} />
            </div>
        </ConfigItem>
    );
}

export default ConfigSwitch;
