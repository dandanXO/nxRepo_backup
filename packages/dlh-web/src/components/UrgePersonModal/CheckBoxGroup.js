import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { injectIntl } from "react-intl";
import styles from "./CheckBoxGroup.less";

function CheckBoxGroup({ groupType, urgePerson = [], checkBoxList = [], onCheckAllChange, onCheckboxChange, checkAllList = [] }) {

    const [list, setList] = useState([]);
    const [isCheck, setIsCheck] = useState(false);

    const handleAllCheckOnchange = (e) => {
        const checkAllList = urgePerson.filter(i => i.name[0] === e.target.value).map(list => list.value);
        setList(e.target.checked ? checkAllList : [])
        setIsCheck(true)
        onCheckAllChange(e, checkAllList)
    }

    const handleCheckOnchange = (checkedList) => {
        setList(checkedList)
        const checkGroup = checkBoxList.map(i => i.value)
        onCheckboxChange(checkedList, checkGroup)
    }
    useEffect(() => {
        if (list.length === 0) {
            setIsCheck(false)
        }
        if (list.length === checkBoxList.length) {
            setIsCheck(true)
        }
    }, [list])

    useEffect(() => {
        const mapToList = checkAllList.reduce((prev, curr) => {
            checkBoxList.forEach(i => curr === i.value ? prev.push(curr) : prev)
            return prev
        }, [])
        setList(mapToList)
    }, [checkAllList])

    return <div className={styles.CheckBoxGroup}>
        <Checkbox className={styles.checkAllTitle} checked={isCheck} onChange={handleAllCheckOnchange} value={groupType}>{groupType}</Checkbox>
        <Checkbox.Group value={list} onChange={handleCheckOnchange}>
            {checkBoxList.map(item => <Checkbox value={item.value} key={item.value} >{`${item.name}`}</Checkbox>)}
        </Checkbox.Group>
    </div>
}

export default injectIntl(CheckBoxGroup);