import React, { useEffect, useRef, useState } from 'react';
import { Input, Tag, Button } from "antd";
import styles from './EditTag.less';

function EditTag({ groups, updateList, setUpdateList, deleteList, setDeleteList, handleModifyGroups }) {

    const [tags, setTags] = useState(groups);
    const [editTag, setEditTag] = useState(null); // 被編輯的tag
    const inputRef = useRef();
    const [inputVal, setInputVal] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setTags(groups)
    }, [groups])

    // for 編輯的 tag input
    const handleOnchange = (e) => {
        setInputVal(e.target.value);
        setIsEdit(true);
    };

    const handleConfirm = (tag) => {
        
        if (inputVal === "") return;
        const { collectTeamId, id } = tag
        setUpdateList([...updateList, { collectTeamId, id, name: inputVal }])
        const newTags = [...tags];
        const index = editTag !== null ? editTag : newTags.length;
        newTags[index] = {...tag,name:inputVal};
        setTags([...newTags]);
        setInputVal("");
        setEditTag(null);
    };

    const handleClose = (e, index, tag) => {
        e.preventDefault();
        setDeleteList([...deleteList, tag.id])
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

    const handleResetEditStatus = () => {
        setEditTag(null);
        setIsEdit(false)
    }

    const handleResetValue = () => {
        setTags(groups);
        handleResetEditStatus();
    };

    const handleSave = () => {

        handleResetEditStatus();
        handleModifyGroups()
    }

    return (
        <div className={styles.editTag}>
            <div className={styles.buttonConfirm}>
                {isEdit && <Button size="small" onClick={handleSave} type="primary" icon="check" />}
                {isEdit && <Button size="small" onClick={handleResetValue} icon="close" />}
            </div>
            <div>
                {tags.map((tag, index) => {
                    return editTag !== index ? (
                        <Tag key={'tag'+tag.id} closable={true} color="blue" onClose={(e) => handleClose(e, index, tag)}>
                            <span key={'span' + tag.id} onDoubleClick={() => handleDoubleClick(tag.name, index)}>{tag.name}</span>
                        </Tag>
                    ) : (
                        <Input key={'edidInput' + tag.id} size="small" ref={inputRef} value={inputVal}
                            style={{ width: tag.name.length < 5 || tag.name.length === undefined ? "60px" : tag.name.length * 13 + 'px' }}
                            onChange={handleOnchange} onBlur={() => handleConfirm(tag)} onPressEnter={() => handleConfirm(tag)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default EditTag;
