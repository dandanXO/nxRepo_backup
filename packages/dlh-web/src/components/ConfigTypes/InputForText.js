import React, {useRef } from 'react';
import { Input} from "antd";
import styles from './ConfigItem.less';

const { TextArea } = Input;

function InputForText({ inputType, currentValue, setCurrentValue, setIsEdit, setErrorMessage }) {

    const inputRef = useRef();
    const validationInput = (e) => {
        const inputValue = e.target.value;
        if (currentValue !== inputValue) { setIsEdit(true); }
        setCurrentValue(inputValue);
        setErrorMessage(inputValue === "" ? "不能為空" : "");
    }
    
    const renderInput = () => {
        const inputProps = {
            onChange: validationInput,
            onBlur: validationInput,
            value: currentValue
        }
        return inputType === 'textarea' ?
            <TextArea ref={inputRef} {...inputProps} autoSize />:
            <Input ref={inputRef} className={styles.inputStyle} {...inputProps} />
    }
    return (
        renderInput()
    );
}

export default InputForText;
