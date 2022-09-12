import React, { useEffect, useRef, useState } from 'react';
import { Input, Tag, Button, Icon } from "antd";
import styles from './ConfigItem.less';
import ConfigItem from "./ConfigItem";
import InputForNumber from "./InputForNumber";
import InputForText from "./InputForText";
import ErrorMessage from "./ErrorMessage";

function ConfigTag({ inputKey, channelId, name, value, remark, saveValue, min, max, scale }) {

    const valueToArray = value.split(",");
    const [tags, setTags] = useState(valueToArray);
    const [editTag, setEditTag] = useState(null); // 被編輯的tag
    const inputRef = useRef();
    const [inputVal, setInputVal] = useState("");
    const [inputVisible, setInputVisible] = useState(false);




    // for 編輯的 tag input
    const handleOnchange = (e) => {
        setInputVal(e.target.value);
        setIsEdit(true);
    };

    const handleConfirm = () => {
        if (inputVal === "") return;
        const newTags = [...tags];
        const index = editTag !== null ? editTag : newTags.length;
        newTags[index] = inputVal;
        setTags([...newTags]);
        setInputVal("");
        setEditTag(null);
    };

    const handleClose = (e, index) => {
        e.preventDefault();
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags([...newTags]);
        setIsEdit(true)
    };

    const handleDoubleClick = (tag, index) => {
        setEditTag(index);
        setInputVal(tag);
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [editTag, isEdit]);


    // for add input
    const [currentValue, setCurrentValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const renderInputType = () => {
        const inputProps = {
            inputType: min === null && max === null ? 'text' : scale !== null ? 'float' : 'number',
            min,
            max,
            scale,
            currentValue,
            setCurrentValue,
            setErrorMessage,
            setIsEdit
        }
        return min !== null && max !== null ? <InputForNumber  {...inputProps} /> : <InputForText {...inputProps} />;
    };

    const handleAddTag = () => {
        setInputVisible(true);
        setIsEdit(true);
    }

    const handleResetEditStatus = () => {
        setInputVisible(false);
        setEditTag(null);
        setIsEdit(false)
        setCurrentValue("")
        setErrorMessage("");
    }

    const handleResetValue = () => {
        setTags(valueToArray);
        handleResetEditStatus();
    };

    const handleSave = () => {
        const newTags = currentValue !== "" ? [...tags, currentValue] : [...tags];
        setTags([...newTags]);
        handleResetEditStatus();
        saveValue(inputKey, channelId, newTags.join());
    }

    return (
        <ConfigItem name={name} remark={remark}>
            <div className={styles.configTagConfirm}>
                {isEdit &&
                    <div>
                        <Button onClick={handleSave} disabled={errorMessage} type="primary"><Icon type="check" /></Button>
                        <Button onClick={handleResetValue}><Icon type="close" /></Button>
                    </div>
                }
                <div className={`${styles.tagAdd} ${errorMessage !== "" ? styles.errorInput : ""}`}>
                    {isEdit && inputVisible && renderInputType()}
                    <ErrorMessage errorMessage={errorMessage} />
                </div>
                {!inputVisible && <Tag color="blue" onClick={handleAddTag}>+ Add</Tag>}
            </div>
            <div className={styles.validationTag}>
                {tags.map((tag, index) => {
                    const tagKey = tag + index;
                    return editTag !== index ? (
                        <Tag key={'tag' + tagKey} closable={true} color="blue" onClose={(e) => handleClose(e, index)}>
                            <span key={'span' + tagKey} onDoubleClick={() => handleDoubleClick(tag, index)}>{tag}</span>
                        </Tag>
                    ) : (
                        <Input key={'edidInput' + tagKey} size="small" ref={inputRef} value={inputVal}
                            style={{ width: tag.length < 5 || tag.length === undefined ? "60px" : tag.length * 13 + 'px' }}
                            onChange={handleOnchange} onBlur={handleConfirm} onPressEnter={handleConfirm}
                        />
                    );
                })}
            </div>
        </ConfigItem>
    );
}

export default ConfigTag;
