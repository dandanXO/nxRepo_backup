import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { recallSettingAction } from './index';
import RecallSettingModal from './RecallSettingModal/RecallSettingModal'
import { CommonTable } from 'components';
import { Icon, Switch,Button } from 'antd';
import styles from './RecallSetting.less';


function RecallSetting ({
    intl,
    getTableData,
    getConditions,
    tableData,
    conditionsData = [],
    loading,
    addRecallSetting,
    updateRecallSetting,
    updateRecallSettingEnable,
    deleteSetting,
    editModalVisible,
    changeModalVisible 
}) {

    const [info, setInfo] = useState({})

    useEffect(() => {
     
        getTableData();
        getConditions();
    }, []);

    const columns = [
        {
            title: intl.formatMessage({ id: "page.table.name" }),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: intl.formatMessage({ id: "page.table.recallSetting.condition" }),
            dataIndex: 'recallConditionName',
            key: 'recallConditionName',
        },
        {
            title: intl.formatMessage({ id: "page.table.recallSetting.daysAfter" }),
            dataIndex: 'daysAfter',
            key: 'daysAfter',
        },
        {
            title: intl.formatMessage({ id: "page.table.recallSetting.SMSContent" }),
            dataIndex: 'SMSContent',
            key: 'SMSContent',
            width:'30%'
        },
        {
            title: intl.formatMessage({ id: "page.table.is.enabled" }),
            dataIndex: 'enable',
            key: 'enable',
            render(text, record) {
                const { id, enable } = record
                return (<Switch checkedChildren="ON" unCheckedChildren="OFF" checked={text} size="small" onChange={() => updateRecallSettingEnable({ id: id, enable: !enable })} />);
            }
            
        },
        {
            title: intl.formatMessage({id: "page.table.operation"}),
            dataIndex: 'id',
            key: 'id',
            render(text, record) {
                return(
                    <div className={styles.buttonConfirm}>
                        <Icon type="edit" onClick={()=>editRecallSetting(record)}/>
                        <Icon type="delete" onClick={()=>deleteSetting({id:text})}/>
                    </div>
                )
            }
        }
    ]

    const handleAddRecallSetting = () => {
        setInfo({})
        changeModalVisible(true)
    }

    const editRecallSetting = (record) => {
        setInfo(record)
        changeModalVisible(true)
    }
    const handleModalOK = (obj) => {
        Object.keys(info).length > 0 ? updateRecallSetting(obj) : addRecallSetting(obj);
        changeModalVisible(false)
    }

    const handleModalCancel = () => {
        changeModalVisible(false)
    }

    return (
        <div>
            <Button type="primary" onClick={handleAddRecallSetting}><FormattedMessage id="page.table.add.recall.setting" /></Button>
            <CommonTable
                columns={columns}
                dataSource={tableData}
                loading={loading}
                rowKey={(record, index) => index}
            />
            <RecallSettingModal
                handleEditOK={handleModalOK}
                onCancel={handleModalCancel}
                visible={editModalVisible}
                title={<FormattedMessage id="menu.recall" />}
                info={info}
                conditionsData={conditionsData}
            />
        </div>
    );
}


const mapStateToProps = (state) => {
    const { h5ManageState: { recallSettingState } } = state;
    return {
        tableData: recallSettingState['tableData'],
        conditionsData: recallSettingState['conditionsData'],
        loading: recallSettingState['loading'],
        editModalVisible: recallSettingState['editModalVisible'],
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: recallSettingAction.getRecallSetting,
        getConditions: recallSettingAction.getRecallConditions,
        addRecallSetting: recallSettingAction.addRecallSetting,
        updateRecallSetting: recallSettingAction.updateRecallSetting,
        updateRecallSettingEnable: recallSettingAction.updateRecallSettingEnable,
        deleteSetting: recallSettingAction.deleteRecallSetting,
        changeModalVisible:recallSettingAction.ChangeRecallSettingEditModalVisible,

    }, dispatch);
}

RecallSetting.propTypes = {
    intl: propTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RecallSetting));

