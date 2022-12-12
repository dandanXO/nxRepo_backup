import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, message, Button, Input, Tag } from 'antd';
import { injectIntl } from "react-intl";
import CheckBoxGroup from './CheckBoxGroup';
import styles from "./UrgePersonModal.less";
import useFavoriteList from './useFavoriteList';
import { history, showMsg, getAdminUserInfo } from "utils";

function UrgePersonModal ({ modalTitle, urgePerson, visible, onModalCancel, onModalOk, intl }) {

    const { location: { pathname } } = history;
    const [checkAllList, setCheckAllList] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [userID, setUserID] = useState('');
    const [favoriteName, setFavoriteName] = useState("");
    const { favoriteList, handleAddFavorite, handleRemoveFavorite } = useFavoriteList({ userID, pathname }); //取得及設定常用群組

    useEffect(() => {
        const adminUserInfo = async () => {
            const res = await getAdminUserInfo();
            setUserID(res.data.id);
        };
        adminUserInfo()
    }, [])
    const onOk = () => {
        if (checkAllList.length === 0) {
            message.warning(intl.formatMessage({ id: "windowPage.select.collector" }))
            return
        }
        setCheckAllList([]);
        setIsAdd(false);
        const removeCheckAllListRepeatData = checkAllList.filter((text, index, arr) => arr.indexOf(text) === index);
        onModalOk(removeCheckAllListRepeatData);
    }

    const onCancel = () => {
        setCheckAllList([]);
        setIsAdd(false)
        onModalCancel();
    }

    const onCheckAllChange = (e, checkedList) => {
        const checkList = e.target.checked ? 
        [...checkAllList, ...checkedList.filter(i=>!checkAllList.includes(i))] : 
        [...checkAllList].filter(i => checkedList.indexOf(i) < 0);
        setCheckAllList(checkList);
    };
    const onCheckboxChange = (checkedList, checkGroup) => { //checkedList 目前check的項目, checkGroup 目前check項目的群組
        const list = [...checkAllList].filter(i => checkGroup.indexOf(i) < 0).concat(checkedList);
        setCheckAllList(list);
    };

    
    // 點擊常用清單名稱，將常用清單的紀錄勾選回去
    const handleMapToFavorite = ({ list }) => {
        const mapToList = list.reduce((prev, curr) => {
            urgePerson.forEach(i => curr === i.value ? prev.push(curr) : prev)
            return prev
        }, [])
        setCheckAllList(mapToList);
        if (mapToList.length === 0) {
            showMsg(intl.formatMessage({ id: "windowPage.no.match.collector" }))
        }
    }

    // 新增常用清單
    const handleAddFavoriteGroup = () => {
        handleAddFavorite(favoriteName, checkAllList);
        setFavoriteName("");
        setIsAdd(false);
    }

    const renderFavoriteGroups = () => {

        return favoriteList.map((tag, index) => {
            return (
                <Tag
                    key={'tag' + index}
                    color="blue"
                    closable={true}
                    className={styles.antdTag}
                    onClose={(e) => handleRemoveFavorite(e, tag)}>
                    <span onClick={() => handleMapToFavorite(tag)}>{tag.name}</span>
                </Tag>
            )
        })
    }

    const renderCheckBox = () => {

        const compareFn = (a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 0;
        const sortUrgePerson = [...urgePerson].sort(compareFn);
        const urgePersonType = sortUrgePerson.map(i => i.name[0]).filter((text, index, arr) => arr.indexOf(text) === index);
        const usrgePersonList = urgePersonType.map(i => sortUrgePerson.filter(item => item.name[0] === i));

        return urgePersonType.map((type, index) => {
            return (
                <CheckBoxGroup
                    key={type}
                    urgePerson={sortUrgePerson}
                    groupType={type}
                    checkBoxList={usrgePersonList[index]}
                    onCheckAllChange={onCheckAllChange}
                    onCheckboxChange={onCheckboxChange}
                    checkAllList={checkAllList}

                />
            );
        });
    }

    return (
        <Modal
            className={styles.urgePersonModal}
            onOk={onOk}
            onCancel={onCancel}
            width={600}
            visible={visible}
            title={intl.formatMessage({ id: modalTitle })}
            footer={[
                <div key="addFavorite" className={styles.addToFavorite}>
                    <Button onClick={() => setIsAdd(true)}>{intl.formatMessage({ id: "windowPage.add.favorite.collector" })}</Button>
                    {isAdd &&
                        <div className={styles.inputItem}>
                            <Input value={favoriteName} onChange={(e) => setFavoriteName(e.target.value)} placeholder={intl.formatMessage({ id: "windowPage.add.favorite.collector.enter" })} />
                            <Button type="primary" shape="circle" icon="plus" onClick={handleAddFavoriteGroup} />
                        </div>
                    }
                </div>,
                <div key="confirmButton">
                    <Button onClick={onCancel}>{intl.formatMessage({ id: "page.table.cancel" })}</Button>
                    <Button type="primary" onClick={onOk}>{intl.formatMessage({ id: "page.table.ok" })}</Button>
                </div>
            ]}
        >
            <div className={styles.favoriteList}>
                <div><Tag color="blue" closable={false} className={styles.antdTag} onClick={() => setCheckAllList([])}><span>{intl.formatMessage({ id: "windowPage.reset" })}</span></Tag></div>
                <div>{renderFavoriteGroups()}</div>
            </div>
            <div>{renderCheckBox()}</div>

        </Modal>
    );
}

UrgePersonModal.propTypes = {
    visible: PropTypes.bool,
    onModalCancel: PropTypes.func,
    onModalOk: PropTypes.func,
    urgePerson: PropTypes.array,  //催收人
    intl: PropTypes.object.isRequired,
};
UrgePersonModal.defaultProps = {
    visible: false,
    urgePerson: [],
    onModalCancel() { },
    onModalOk() { }
};
export default injectIntl(UrgePersonModal);
