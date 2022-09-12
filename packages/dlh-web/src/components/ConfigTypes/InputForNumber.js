import React from 'react';
import { InputNumber } from "antd";

function InputForNumber({ currentValue, setCurrentValue, setErrorMessage,setIsEdit, min, max, inputType, scale }) {

    let step = 1 / Number("1".padEnd(scale + 1, "0")) || 1;

    const regexType = {
        number: /^(\-|\+)?\d*$/,
        float: min < 0 ? `^(\\-?\\d+)(\\.\\d{0,${scale}})?$` : `^(\\d+)(\\.\\d{0,${scale}})?$`
    }

    const errorText={
        number: '整數',
        float: `${scale}位小數`
    }
    
    const validationInput = (inputValue) => {

        setCurrentValue(inputValue);
        if (Number(currentValue).toFixed(scale || 0) !== Number(inputValue).toFixed(scale || 0)) {
            setIsEdit(true)
        }
        let regex = new RegExp(regexType[inputType]);
        const isValidNumber = (Number(inputValue) > max || Number(inputValue) < min);
        setErrorMessage("")
        if (!regex.test(inputValue) || isValidNumber || inputValue === "") {
            setErrorMessage(inputValue === "" ? "不能為空" : `請輸入${min}~${max}中間的${errorText[inputType]}`);
        }
    }

    return (
        <InputNumber  min={min} max={max} value={currentValue} step={step} onChange={validationInput} />
    );
}

export default InputForNumber;
