import React, { useEffect, useState } from "react";

import { Button, Icon } from "antd";
import styles from "./ConfigItem.less";
import ConfigItem from "./ConfigItem";
import ErrorMessage from "./ErrorMessage";
import InputForNumber from "./InputForNumber";
import InputForText from "./InputForText";

function ConfigInput({ inputKey, channelId, name, value, remark, inputType, saveValue, ...props }) {
  const [currentValue, setCurrentValue] = useState(value);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
 
  const handleSaveValue=()=>{
    saveValue(inputKey, channelId, currentValue);
    setIsEdit(false);
  }

  const handleResetValue = () => {
    setCurrentValue(value)
    setIsEdit(false);
    setErrorMessage("");
  };

  const renderInputType = () => {
    
    const inputProps = {
      ...props,
      currentValue,
      inputType,
      setCurrentValue,
      setErrorMessage,
      setIsEdit
    }
    
    return inputType === "float" || inputType === "number" ? <InputForNumber {...inputProps} /> : <InputForText {...inputProps} />;
  };

  return (
    <ConfigItem name={name} remark={remark}>
      {isEdit &&
        <div>
          <Button onClick={handleSaveValue} disabled={errorMessage} type="primary"><Icon type="check" /></Button>
          <Button onClick={handleResetValue}><Icon type="close" /></Button>
        </div>
      }
      <div className={`${styles.validationInput} ${errorMessage !== "" ? styles.errorInput : ""}`}>
        {renderInputType()}
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    </ConfigItem>
  );
}

export default ConfigInput;
