import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { collectTeamManageAction } from './index';
import { message, Button, Input, Switch,Tabs } from 'antd';
import PropTypes from 'prop-types';
import { useInput } from 'hooks';
import styles from "./CollectTeamManage.less";
import { ExpandableTable } from "components";
import EditInput from './EditInput';
import ExpandRow from './ExpandRow/ExpandRow';
import {PeopleManage}from './PeopleManage';
const { TabPane } = Tabs;

function CollectTeamManage({ teamsData, intl, getCollectTeamsList, addCollectTeamData, addCollectGroupData, updateCollectTeamData, deleteCollectTeamData }) {
    const { value: teamValue, setValue: setTeamValue, handleOnChange: handleTeamValue } = useInput();

    useEffect(() => {
        getCollectTeamsList();
    }, []);

    const handleAddTeam = () => {
        teamValue === "" ?
            message.warning(intl.formatMessage({ id: "page.table.collect-team.enter" })) :
            addCollectTeamData({ name: teamValue });
        setTeamValue('');
    }

    const handleUpdateTeam = (record, inputValue) => {
        const { id, enabled } = record;
        updateCollectTeamData({ id, enabled, name: inputValue })
    }

    const handleDeleteTeam = (record) => {
        const { id } = record;
        deleteCollectTeamData({ id })
    }

    const handleOnSwitchChange = (record) => {
        const { id, name } = record;
        record.enabled = record.enabled && record.enabled ? false : true;
        updateCollectTeamData({ id, enabled: record.enabled, name })
    }
    const handleAddGruop = (id, groups, groupValue, dueDaysStart, dueDaysEnd) => {
        addCollectGroupData({ collectTeamId: id, name: groupValue, dueDaysStart, dueDaysEnd })
    }

    const columns = [
        {
            title: <FormattedMessage id={'page.table.enabled'}/>, dataIndex: 'enabled', key: 'enabled', width: '15%', render(text, record) {
                return (<Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={text} size="small" onChange={() => handleOnSwitchChange(record)} />);
            }
        },
        {
            title: <FormattedMessage id={'page.table.collect-team.name'}/>, dataIndex: 'name', key: 'name',  render(text, record) {
                return (<EditInput intl={intl} inputValue={text} record={record} handleUpdateTeam={handleUpdateTeam} handleDeleteTeam={handleDeleteTeam} />);
            }
        },
    ]

    return <div>
        <Tabs animated={false}>
            <TabPane tab={intl.formatMessage({ id: "page.table.collect-team" })} key="1">
                <div className={styles.inputItem}>
                    <FormattedMessage id='page.table.add.collect-team' /> :
                    <Input value={teamValue} onChange={handleTeamValue} placeholder={intl.formatMessage({ id: "page.table.collect-team.enter" })} />
                    <Button type="primary" shape="circle" icon="plus" onClick={handleAddTeam} />
                </div>
                <ExpandableTable
                    columns={columns}
                    dataSource={teamsData}
                    expandedRowRender={(record, i) => <ExpandRow record={record} handleAddGruop={handleAddGruop} intl={intl} />}
                />
            </TabPane>
            <TabPane tab={intl.formatMessage({ id: "page.table.collect-people" })} key="2">
               <PeopleManage/>
            </TabPane>
        </Tabs>
    </div>
}

CollectTeamManage.propTypes = {
    intl: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { systemManageState: { collectTeamManageState } } = state;
    return {
        teamsData: collectTeamManageState['teamsData'],
        groupsData: collectTeamManageState['groupsData'],
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCollectTeamsList: collectTeamManageAction.getCollectTeam,
        addCollectTeamData: collectTeamManageAction.addCollectTeam,
        updateCollectTeamData: collectTeamManageAction.updateCollectTeam,
        deleteCollectTeamData: collectTeamManageAction.deleteCollectTeam,
        addCollectGroupData: collectTeamManageAction.addCollectGroup,
        getCollectGroupList: collectTeamManageAction.getCollectGroup,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CollectTeamManage));

