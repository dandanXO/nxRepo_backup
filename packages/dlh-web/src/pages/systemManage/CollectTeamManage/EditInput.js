import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, Popconfirm } from "antd";
import { useInput } from 'hooks'
import styles from "./CollectTeamManage.less";


function EditInput({ intl, inputValue, record, handleUpdateTeam, handleDeleteTeam }) {
    const { value, setValue } = useInput();
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        setValue(inputValue)
    }, [])

    const handleOnChange = (e) => {
        setIsEdit(true)
        setValue(e.target.value)
    }
    const handleSaveValue = () => {
        handleUpdateTeam(record, value);
        setIsEdit(false)
    }
    const handleDeleteItem = () => {
        handleDeleteTeam(record);
        setIsEdit(false)
    }
    const handleResetValue = () => {
        setValue(inputValue);
        setIsEdit(false)
    }

    const renderDeleteButton = () => {
        const element =
            (<Popconfirm title={intl.formatMessage({ id: "windowPage.confirm.delete" })} onConfirm={handleDeleteItem} onCancel={()=>{}} okText="Yes" cancelText="No">
                <Button size="small" type="danger" icon="delete"/>
            </Popconfirm>);
        return element;
    }
    return (
        <div className={`${styles.inputItem} ${styles.editInput}`} >
            <Input value={value} onChange={handleOnChange} />
            {!isEdit && renderDeleteButton()}
            {isEdit && <Button size="small" onClick={handleSaveValue} type="primary" icon="check" />}
            {isEdit && <Button size="small" onClick={handleResetValue} icon="close" />}
        </div>
    );
}

export default EditInput;
