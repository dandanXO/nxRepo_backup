import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { configManageAction } from './index';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from "react-intl";
import { ConfigTypes, CollapseCard } from 'components';
import styles from './config.less';
import { Tag } from 'antd';
const { ConfigInput, ConfigSwitch, ConfigTag, ConfigRadio } = ConfigTypes;

function ConfigManage(props) {

    const { configList = [] } = props;
    const [isCollapse, setCollapse] = useState(true);

    useEffect(() => {
        const { getSystemData } = props;
        getSystemData();
    }, [])

    const saveValue = (key, channelId, value) => {
        const { updateSystemData } = props;
        updateSystemData({ key, channelId, value });
    };

    const renderConfigTypes = (props) => {
        const { inputType, key } = props;
        const inputProps = {
            ...props,
            key: key,
            inputKey: key,
            saveValue: saveValue
        }
        return inputType === "tag" ? (<ConfigTag  {...inputProps} />) :
            inputType === "switch" ? (<ConfigSwitch {...inputProps} />) :
                inputType === "radio" ? (<ConfigRadio  {...inputProps} />) :
                    (<ConfigInput {...inputProps} />);
    };

    const groupLabels = (group) => {
        const groupLabels = {
            'anti_fraud_setting': '反欺诈设置',
            'loan_setting': '放款设置',
            'system_setting': '系统设置',
            'risk_setting': '风控设置'
        }
        return groupLabels[group] || group ;
    };

    const handleCollapse = () => {
        setCollapse(!isCollapse);
    };

    return (
        <div>
            <div className={styles.configContent}>
                <div className={styles.cardOperate} id={"ConfigTop"}>
                    <Tag onClick={handleCollapse} color="geekblue">{isCollapse ? '收合' : '展開'}</Tag>
                    {configList.map(list => <Tag color="geekblue" key={list.group}> <a href={`#${list.group}`}>{groupLabels(list.group)}</a></Tag>)}
                </div>
                {configList.map((list, index) => <CollapseCard href={"#ConfigTop"} key={list.group + index} title={groupLabels(list.group)} isCollapse={isCollapse} id={list.group}
                    configList={list.configs.map((config) => renderConfigTypes(config))} />)}
            </div>
        </div>
    );

}

const mapStateToProps = (state) => {
    const { systemManageState: { configManageState } } = state;
    return {
        configList: configManageState['configList']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSystemData: configManageAction.cfGetSystemConfigData,
        updateSystemData: configManageAction.cfUpdateSystemConfigData
    }, dispatch)
}

ConfigManage.propTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ConfigManage));