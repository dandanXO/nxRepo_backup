import React, { useCallback, useEffect, useState } from 'react';
import { Input, Button, message, InputNumber, Popconfirm, Modal,Select } from "antd";
import styles from '../CollectTeamManage.less';
import { useInput } from 'hooks';
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { collectTeamManageAction } from '../index';
import { CommonTable } from 'components';
const {Option}=Select


function ExpandRow ({ intl, record, handleAddGruop, updateCollectGroupData, deleteCollectGroupData }) {
    const { id, groups = [] } = record
    const { value, setValue, handleOnChange } = useInput();
    const [daysStartValue, setDaysStartValue] = useState(-1);
    const [daysEndValue, setDaysEndValue] = useState('');
    const [collectStageValue, setCollectStageValue] = useState("S1");
    const [visible,setVisible]=useState(false)


    const [groupList, setGroupList] = useState(groups);
    const [deleteList, setDeleteList] = useState([]);
    const [updateList, setUpdateList] = useState([]);

    useEffect(() => {
        const initDueDaysEnd = groups.length === 0 ? -1 : groups[groups.length - 1].dueDaysEnd;
        setDaysStartValue(initDueDaysEnd);
    }, [groups])

    useEffect(() => {
        const newGroup = [...groups];
        if (updateList.length > 0) {
            const arr = []
            newGroup.forEach((group, index) => {
                const findGroupInGroup = updateList.findIndex(i => i.id === group.id);
                if (findGroupInGroup > -1) {
                    arr.push(updateList[findGroupInGroup])
                } else {
                    arr.push(group)
                }
            }, [])
            setGroupList(arr)
        } else {
            setGroupList(newGroup)
        }
    }, [groups,updateList])

    const handleSave = () => {

        
        if (!checkGroupExist('', value)) return;
        if (daysStartValue === 999) {
            message.warning('逾期天數已達上限 999 天');
            return;
        }
        if (!checkDueDays(value, daysStartValue, daysEndValue)) return;

        handleAddGruop(id, groups, value, daysStartValue, daysEndValue, collectStageValue)
        setValue("");
        setDaysStartValue("");
        setDaysEndValue("");
    }



    const checkGroupExist = (id, groupName) => {

        const isGroupExist = groupList.filter(i => i.name === groupName).length;
        const existLength = id ? 1 : 0; //有id代表是update的，所以groupName有要兩個以上才算重複

        if (groupName !== '' && isGroupExist <= existLength) {
            return true;
        }

        if (groupName === '') {
            message.warning(intl.formatMessage({ id: "page.table.collect-group.enter" }));
            return false;
        };

        if (isGroupExist > existLength) {
            message.warning(intl.formatMessage({ id: "page.table.collect-group.isExist" }));
            return false;
        };
    }

    const checkDueDays = (name, start, end) => {
        if (!name || !start && start !== 0 || !end && end !== 0) {
            const messageText = !name ? intl.formatMessage({ id: "page.table.collect-group" }) : !start ? "n" : "m";
            message.warning(intl.formatMessage({ id: "page.table.enter" }, { text: messageText }));
            return false;
        } else if (end < start || end === start) {
            message.warning(intl.formatMessage({ id: "page.table.compare.text" }, { max: "m", min: "n" }));
            return false;
        } else {
            return true
        }
    }



    const handleModifyGroups = async (updateId) => {

        const updateItem = updateList.filter(i => i.id === updateId);
        const { id, name, dueDaysStart, dueDaysEnd } = updateItem[0];
        const groupsIndex = groups.findIndex(i => i.id === updateId);
        const prevIndex = groupsIndex - 1;
        const prevName = prevIndex >= 0 ? groups[prevIndex].name : groups[0].name;
        const prevDueDaysEnd = prevIndex >= 0 ? groups[prevIndex].dueDaysEnd : groups[0].dueDaysEnd;
        const nextIndex = groupsIndex === groups.length - 1 ? groups.length - 1 : groupsIndex + 1;

        if (!checkGroupExist(id, name)) return; // 確認催收子別名稱是否重複
        if (!checkDueDays(name, dueDaysStart, dueDaysEnd)) return; // 確認逾期天數
        if (dueDaysStart < prevDueDaysEnd && groupsIndex!==0) {
            message.warning(intl.formatMessage({ id: "page.table.compare.text" }, { max: "n", min: `${prevName} - m` }));
            return;
        }
        if (Number(dueDaysEnd) + (groups.length - 1 - groupsIndex) > 999) {
            setVisible(true)
            const deleteLength=999-Number(dueDaysEnd)+ groupsIndex
            const deleteGroups = groups.filter((i, index) => index > deleteLength);
            setDeleteList(deleteGroups)
            return;
        }

        // 比對原始值，start 跟 end 有無異動
        const {dueDaysStart: initDueDaysStart,dueDaysEnd: initDueDaysEnd,} = groups.filter((i) => i.id === updateId)[0];

        const updateGroups = dueDaysStart === initDueDaysStart && dueDaysEnd === initDueDaysEnd ?
            updateItem :
            [...groups].reduce((prev, curr, index) => {
                if (index === prevIndex && groupsIndex !== 0) {
                    return [...prev, { ...curr, dueDaysEnd: dueDaysStart }]
                } else if (index === groupsIndex) {
                    return [...prev, { ...updateItem[0] }]
                } else if (index === nextIndex) {
                    const nextEnd = curr.dueDaysEnd <= dueDaysEnd ? dueDaysEnd + 1 : curr.dueDaysEnd
                    return [...prev, { ...curr, dueDaysStart: dueDaysEnd, dueDaysEnd: nextEnd }]
                } else if (index > nextIndex) {
                    const prevEnd = prev[prev.length - 1].dueDaysEnd;
                    const nextEnd = curr.dueDaysEnd <= prevEnd ? prevEnd + 1 : curr.dueDaysEnd
                    return [...prev, { ...curr, dueDaysStart: prevEnd, dueDaysEnd: nextEnd }]
                }
                else {
                    return prev
                }
            }, []);


        updateGroups.map(group => { updateCollectGroupData(group) })
        setUpdateList([])
    }

    const handleDeleteGroup = (id) => {

        deleteCollectGroupData({ id })
        const groupsIndex = groups.findIndex(i => i.id === id);
        const groupListIndex = groupList.findIndex(i => i.id === id);
        if (groupsIndex !== 0 && groupsIndex !== groupList.length - 1) {
            const prevItem = groups[groupListIndex - 1];
            const nextItem = groups[groupListIndex + 1];
            const updateItem = { ...nextItem, dueDaysStart: prevItem.dueDaysEnd }
            updateCollectGroupData(updateItem)
            setUpdateList([])
        }
    }

    const editGroupField = (id, updateField) => {
        const updateIndex = updateList.findIndex(i => i.id === id);
        const updateGroup = updateIndex > -1 ? updateList[updateIndex] : groupList.filter(i => i.id === id)[0]
        const spliceIndex = updateIndex > -1 ? updateIndex : updateList.length;
        const deleteCount = updateIndex > -1 ? 1 : 0;
        updateList.splice(spliceIndex, deleteCount, { ...updateGroup, ...updateField })
        return updateList
    }

    const NameInput = ({ text, id }) => {
        const [name, setName] = useState(text);
        const [isChange, setIsChange] = useState(false);
        const handleGroupsNameChange = (e) => {
            setName(e.target.value);
            setIsChange(true)
        }
        const handleSetUpdate = useCallback((e) => {
            if(isChange){
                const updateList = editGroupField(id, { name: name });
                setUpdateList([...updateList]);
            }
        }, [name]);

        return <Input value={name} onChange={handleGroupsNameChange} onBlur={handleSetUpdate} onPressEnter={handleSetUpdate}   placeholder={intl.formatMessage({ id: "page.table.collect-group.enter" })} />
    }

    const DueDaysStartInput = ({ text, id }) => {

        const [start, setStart] = useState(text)
        const [isChange, setIsChange] = useState(false);
        const handleDueDaysStartChange = (num) => {
            setStart(num)
            setIsChange(true)
        }
        const handleSetUpdate = useCallback((e) => {
            if(isChange){
                const updateList = editGroupField(id, { dueDaysStart: start });
                setUpdateList([...updateList]);
            }
        }, [start]);
        return <InputNumber min={-1} max={999} value={start} onChange={handleDueDaysStartChange} onBlur={handleSetUpdate} onPressEnter={handleSetUpdate} placeholder={'n'} />
    }

    const DueDaysEndInput = ({ text, id }) => {
        const [end, setEnd] = useState(text)
        const [isChange, setIsChange] = useState(false);
        const handleDueDaysEndChange = (num) => {
            setEnd(num)
            setIsChange(true)
        }
        const handleSetUpdate = useCallback((e) => {
            if (isChange) {
                const updateList = editGroupField(id, { dueDaysEnd: end });
                setUpdateList([...updateList]);
            }
        }, [end]);
        return <InputNumber min={0} max={999} value={end} onChange={handleDueDaysEndChange} onBlur={handleSetUpdate} onPressEnter={handleSetUpdate} placeholder={'m'} />
    }

    const CollectStageSelect = ({value,id}) => {
        
    
        const handleChange = (optionValue) => {
            console.log('optionValue', optionValue)
            if(optionValue!==value){
                const updateList = editGroupField(id, { collectStage: optionValue });
                setUpdateList([...updateList]);
            }
        }

        return <Select defaultValue={value} style={{ width: '90%' }} onChange={handleChange}>
            <Option value="S1">S1</Option>
            <Option value="S2">S2</Option>
            <Option value="S3">S3</Option>
            <Option value="S4">S4</Option>
            <Option value="S5">S5</Option>
            <Option value="S6">S6</Option>
            <Option value="T0">T0</Option>
            <Option value="T_1">T-1</Option>
        </Select>
    }

    const handleModifyCancel = (id) => {
        const isEdit = updateList.findIndex(i => i.id === id);
        updateList.splice(isEdit, 1);
        setUpdateList([...updateList])
    }

    const handleModalOK = () => {
        deleteList.map(i => deleteCollectGroupData({ id: i.id }))
        setVisible(false);
        setDeleteList([])
    }
    const handleModalCancel=()=>{
        setVisible(false);
        setDeleteList([])
    }

    const handleSetDaysStartValue = (num) => {
        if (groupList.length !== 0) return;
        setDaysStartValue(num)
    }

    const columns = [
        {
            title: intl.formatMessage({ id: "page.table.collect-group" }),
            dataIndex: 'name',
            key: 'name',
            width:'30%',
            render: (text, record) => {
                const { id } = record;
                return <NameInput text={text} id={id} />
            }
        },
        {
            title: intl.formatMessage({ id: "page.table.overdue.days" }),
            dataIndex: 'dueDays',
            key: 'dueDays',
            width:'30%',
            render (text, record) {
                const { dueDaysStart, dueDaysEnd, id } = record;
                return (
                    <div className={styles.dueDays}>
                        <DueDaysStartInput text={dueDaysStart} id={id} /> ~
                        <DueDaysEndInput text={dueDaysEnd} id={id}  />
                    </div>
                )
            }
        },
        {
            title: intl.formatMessage({ id: "page.table.overdue.stage" }),
            dataIndex: 'collectStage',
            key: 'collectStage',
            width:'20%',
            render (text, record) {
                const { collectStage,  id } = record;
                return <CollectStageSelect value={collectStage} id={id}/>
                
            }
        },
        {
            title: intl.formatMessage({ id: "page.table.operation" }),
            dataIndex: 'id',
            key: 'id',
            render (text, record) {
                const { id } = record;
                const isEdit = updateList.findIndex(i => i.id === id);
                return (
                    <div className={styles.buttonConfirm}>
                        {isEdit > -1 && <Button size="small" onClick={() => handleModifyGroups(id)} type="primary" icon="check" />}
                        {isEdit > -1 && <Button size="small" onClick={() => handleModifyCancel(id)} icon="close" />}
                        <Popconfirm title={intl.formatMessage({ id: "windowPage.confirm.delete" })} onConfirm={() => handleDeleteGroup(id)} onCancel={() => { }} okText="Yes" cancelText="No">
                            <Button size="small" type="danger" icon="delete" />
                        </Popconfirm>
                    </div>
                )
            }
        },
    ]

    return (
        <div className={styles.expandStyle}>
            <div className={`${styles.inputItem} ${styles.addInputItem} ${styles.addInputItemTitle}`}>
                <FormattedMessage id='page.table.add.collect-group' /> :
                <Input value={value} onChange={handleOnChange} placeholder={intl.formatMessage({ id: "page.table.collect-group.enter" })} />
                <FormattedMessage id='page.table.overdue.days' /> :
                <InputNumber min={-1} max={999} value={daysStartValue} onChange={handleSetDaysStartValue} placeholder={'n'} /> ~
                <InputNumber min={0} max={999} value={daysEndValue} onChange={(num) => setDaysEndValue(num)} placeholder={'m'} />
                <FormattedMessage id='page.table.overdue.stage' /> :
                <Select defaultValue={"S1"} style={{ width: 120, marginLeft: 8 }} onChange={(value) => setCollectStageValue(value)}>
                    <Option value="S1">S1</Option>
                    <Option value="S2">S2</Option>
                    <Option value="S3">S3</Option>
                    <Option value="S4">S4</Option>
                    <Option value="S5">S5</Option>
                    <Option value="S6">S6</Option>
                    <Option value="T0">T0</Option>
                    <Option value="T_1">T-1</Option>
                </Select>
                <Button type="primary" onClick={handleSave} icon="plus" />
            </div>
            <div className={styles.groupTableStyle}>
                <CommonTable
                    columns={columns}
                    dataSource={groupList || []}
                    pagination={null}
                />
            </div>
            <Modal
                visible={visible}
                onOk={handleModalOK}
                onCancel={handleModalCancel}
                okText="Yes"
                cancelText="No"
            >
                <p>{`逾期天数设定已达到上限`}</p>
                <p>{`若仍要修改，下方的催收组别 (${deleteList.length}组) 将被删除`}</p>
            </Modal>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateCollectGroupData: collectTeamManageAction.updateCollectGroup,
        deleteCollectGroupData: collectTeamManageAction.deleteCollectGroup
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(injectIntl(ExpandRow));

