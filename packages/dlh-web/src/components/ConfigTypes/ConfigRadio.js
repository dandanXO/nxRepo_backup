import React, {  useState } from 'react';
import { Radio } from "antd";
import ConfigItem from "./ConfigItem"

const { Group, Button } = Radio
function ConfigRadio({ inputKey, channelId, name, value, remark, saveValue, options  }) {

    const [currentValue, setCurrentValue] = useState(value)

    const handleOnChange = (e) => {
        setCurrentValue(e.target.value)
        saveValue(inputKey, channelId, e.target.value)
    }

    return (
        <ConfigItem name={name} remark={remark}>
            <Group defaultValue={currentValue} onChange={handleOnChange}>
                {options.map(option => <Button key={option.value} value={option.value} >{option.label}</Button>)}
            </Group>
        </ConfigItem>
    );
}

export default ConfigRadio;
