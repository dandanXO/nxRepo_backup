import React, { useCallback, useEffect, useState } from 'react';
import { Input, Button, message, Popconfirm, Select } from "antd";
import styles from '../CollectTeamManage.less';
import { useInput } from 'hooks';
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { collectTeamManageAction } from '../index';
import { CommonTable } from 'components';
const { Option } = Select;


function ExpandRow ({ intl, record, addGruop, updateCollectGroupData, deleteCollectGroupData }) {
    const { id, groups = [] } = record
    const { value, setValue, handleOnChange } = useInput();
    const [collectStageValue, setCollectStageValue] = useState("S1");

    const [groupList, setGroupList] = useState(groups);
    const [updateList, setUpdateList] = useState([]);

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


    const handleAddGruop = () => {

        if (!checkGroupExist('', value)) return;
        addGruop(id, groups, value, collectStageValue)
        setValue("");
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

    const handleModifyItem = (id) => {
        const modifyItemIndex = updateList.findIndex(i => i.id === id);
        updateList.splice(modifyItemIndex, 1);
        setUpdateList([...updateList])
    }

    const handleModifyGroups = async (updateId) => {

        const updateItem = updateList.filter(i => i.id === updateId);
        const { id, name, collectStage, collectTeamId } = updateItem[0];
        if (!checkGroupExist(id, name)) return; // 確認催收子別名稱是否重複
        await updateCollectGroupData({ id, name, collectStage, collectTeamId });
        handleModifyItem(updateId);

    }

    const handleDeleteGroup = (id) => {

        deleteCollectGroupData({ id })
        handleModifyItem(id);
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

    const CollectStageSelect = ({value,id}) => {
        
        const handleChange = (optionValue) => {
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
            <Option value="T0">T0</Option>
            <Option value="T_1">T-1</Option>
        </Select>
    }

    const handleModifyCancel = (id) => {
        handleModifyItem(id);
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
            width:'20%',
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
                <FormattedMessage id='page.table.overdue.stage' /> :
                <Select defaultValue={"S1"} style={{ width: 120, marginLeft: 8 }} onChange={(value) => setCollectStageValue(value)}>
                    <Option value="S1">S1</Option>
                    <Option value="S2">S2</Option>
                    <Option value="S3">S3</Option>
                    <Option value="S4">S4</Option>
                    <Option value="T0">T0</Option>
                    <Option value="T_1">T-1</Option>
                </Select>
                <Button type="primary" onClick={handleAddGruop} icon="plus" />
            </div>
            <div className={styles.groupTableStyle}>
                <CommonTable
                    columns={columns}
                    dataSource={groupList || []}
                    pagination={null}
                />
            </div>
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

