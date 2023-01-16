import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { collectTeamManageAction } from './index';
import {message, Button, Input, Switch, Tabs, Form, Select} from 'antd';
const { Option } = Select;
import PropTypes from 'prop-types';
import { useInput } from 'hooks';
import styles from "./CollectTeamManage.less";
import { ExpandableTable } from "components";
import EditInput from './EditInput';
import ExpandRow from './ExpandRow/ExpandRow';
import {SystemPeopleManage}from './PeopleManage';
import SearchList from "./SearchList/SearchList";
import {getAllMerchants, getIsSuperAdmin} from "../../../utils";
const { TabPane } = Tabs;

function CollectTeamManage({ teamsData, intl, getCollectTeamsList, addCollectTeamData, addCollectGroupData, updateCollectTeamData, deleteCollectTeamData }) {
    const { value: teamValue, setValue: setTeamValue, handleOnChange: handleTeamValue } = useInput();
    const { value: merchantIdValue, setValue: setMerchantIdValue, handleOnChange: handleMerchantIdValue } = useInput();
    const isSuperAdmin = getIsSuperAdmin();
    const allMerchants = getAllMerchants();

    useEffect(() => {
        getCollectTeamsList();
    }, []);

    const handleAddTeam = () => {
      if(teamValue === "") {
        message.warning(intl.formatMessage({ id: "page.table.collect-team.enter" }));
        return;
      }

      if(isSuperAdmin && merchantIdValue === "") {
        message.warning(intl.formatMessage({ id: "page.search.list.select.empty" }, { text: intl.formatMessage({id : "page.search.list.merchantName"}) }));
        return;
      }
      addCollectTeamData({ name: teamValue, merchantId: merchantIdValue });
      setTeamValue('');
      setMerchantIdValue('');
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
    const handleAddGruop = (id, groups, groupValue, collectStage) => {
        addCollectGroupData({ collectTeamId: id, name: groupValue, collectStage })
    }

    const columns = [
        {
            title: <FormattedMessage id={'page.table.enabled'}/>,
            dataIndex: 'enabled',
            key: 'enabled',
            width: '15%',
            render(text, record) {
                return (<Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={text} size="small" onChange={() => handleOnSwitchChange(record)} />);
            }
        },
        {
            title: <FormattedMessage id={'page.table.collect-team.name'}/>,
            dataIndex: 'name',
            key: 'name',
            render(text, record) {
                return (<EditInput intl={intl} inputValue={text} record={record} handleUpdateTeam={handleUpdateTeam} handleDeleteTeam={handleDeleteTeam} />);
            }
        },
    ]

    if(isSuperAdmin) {
      columns.unshift({
        title: intl.formatMessage({id: "page.search.list.merchantName"}),
        dataIndex: 'merchantName',
        key: 'merchantName',
        width: '15%',
      })
    }

    const convertParams = (obj) => {
      const { merchantId = '' } = obj;
      return {
        merchantId,
      };
    }

    const submit = (obj) => {
      const params = convertParams(obj);
      getCollectTeamsList({
        params,
      });
    }

    const renderMerchants = () => {
      if(!allMerchants) return;
      const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
      return [<Option key={'merchantIdOption'} value=""><FormattedMessage id="page.search.list.select" /></Option>].concat(ele)
    }
    // console.log('isSuperAdmin',isSuperAdmin)
    return (
        <div>
            <Tabs animated={false}>
                <TabPane tab={intl.formatMessage({ id: "page.table.collect-team" })} key="1">
                    {isSuperAdmin && <SearchList submit={submit} isSuperAdmin={isSuperAdmin} allMerchants={allMerchants} />}
                    <div className={styles.inputItem}>
                        <FormattedMessage id='page.table.add.collect-team' /> :
                        <Input value={teamValue} onChange={handleTeamValue} placeholder={intl.formatMessage({ id: "page.table.collect-team.enter" })} />
                        {isSuperAdmin &&
                            <div>
                                <FormattedMessage id='page.search.list.merchantName' /> :
                                <Select style={{ margin: "0 18px", width: "300px" }} value={merchantIdValue} onSelect={(value) => {
                                    setMerchantIdValue(value);
                                }}>
                                    {renderMerchants()}
                                </Select>
                            </div>
                        }
                        <Button type="primary" shape="circle" icon="plus" onClick={handleAddTeam} />
                    </div>
                    <ExpandableTable
                        columns={columns}
                        dataSource={teamsData}
                        expandedRowRender={(record, i) => <ExpandRow record={record} addGruop={handleAddGruop} intl={intl} />}
                    />
                </TabPane>
                <TabPane tab={intl.formatMessage({ id: "page.table.collect-people" })} key="2">
                    <SystemPeopleManage />
                </TabPane>
            </Tabs>
        </div>
    )
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

