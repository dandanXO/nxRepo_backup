import React, {useState} from "react";
import {Input} from "antd";

const AmountInput =  (props) => {
    const [value, setValue] = useState('');

    const handleOnChane = (e: React.ChangeEvent<HTMLInputElement>) => {
        const originalValue = e.target.value
        const value = Number(originalValue.replace(/,+/g, "")) // 移除千分位符号和空格
        const finalValue = isNaN(value) || value === 0 ? originalValue: value.toLocaleString()
        setValue(finalValue)
        props.onChange(originalValue === '' ? undefined : value)
    }

    return (
        <Input
            onChange={handleOnChane}
            value={value}
        />
    )
}

export default AmountInput
