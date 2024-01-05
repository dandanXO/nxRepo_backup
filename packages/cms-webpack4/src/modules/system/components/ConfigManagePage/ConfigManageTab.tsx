import { Collapse, List, Tabs } from 'antd';
import { useEffect, useState } from 'react';

import { useLazyGetConfigListQuery } from '../../api/configManageApi';
import { ConfigList } from '../../api/types/configManageTypes/getConfigList';
import ConfigInput from './components/ConfigInput';

// const { ConfigInput, ConfigSwitch, ConfigTag, ConfigRadio } = ConfigTypes;
const ConfigManageTab = (): JSX.Element => {
    // api
    const [triggerGetList, { currentData }] = useLazyGetConfigListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });
    useEffect(() => {
        triggerGetList(null);
    }, []);

    console.log(currentData);

    const CollapseCard = ({ configData }) => {
        const { configs, group } = configData;
        console.log('configs', configData, configData['group']);
        return (
            <Collapse>
                <Collapse.Panel header={groupLabels(group)} key={group}>
                    <List
                        itemLayout="horizontal"
                        dataSource={configs}
                        renderItem={(item: ConfigList) => {
                            console.log('item-------', item);
                            return (
                                <List.Item>
                                    <div dangerouslySetInnerHTML={{ __html: item.name }}></div>
                                    {/* {item.inputType==="text" && renderConfigTypes(item)} */}
                                    {renderConfigTypes(item)}
                                </List.Item>
                            );
                        }}
                    />
                </Collapse.Panel>
            </Collapse>
        );
    };

    const saveValue = (key, channelId, value) => {
        // const { updateSystemData } = props;
        // updateSystemData({ key, channelId, value });
        console.log('123132', key, channelId, value);
    };

    const renderConfigTypes = (props) => {
        const { key } = props;
        const inputProps = {
            ...props,
            // key: key,
            inputKey: key,
            saveValue: saveValue,
        };

        return <ConfigInput {...inputProps} />;
        // return inputType === "tag" ? (<ConfigTag  {...inputProps} />) :
        //     inputType === "switch" ? (<ConfigSwitch {...inputProps} />) :
        //         inputType === "radio" ? (<ConfigRadio  {...inputProps} />) :
        //             (<ConfigInput {...inputProps} />);
    };
    const groupLabels = (group) => {
        const groupLabels = {
            anti_fraud_setting: '反欺诈设置',
            loan_setting: '放款设置',
            system_setting: '系统设置',
            risk_setting: '风控设置',
        };
        return groupLabels[group] || group;
    };
    // const tabs = [
    //     // { label: '用户信息', key: 'userInfo', children: <UserInfo userId={userId}/> }, // 务必填写 key
    //     // { label: '通讯录', key: 'addressBook', children: <AddressBook userId={userId}/> },
    //     // { label: '手机短信', key: 'smsMessage', children: <SmsMessage userId={userId}/> },
    //     // { label: '借款信息', key: 'loanInfo', children: <LoanInfo userId={userId}/> },
    //   ];

    const [tabs, setTabs] = useState([]);

    // const tabsList =

    //   console.log(tabsList)

    useEffect(() => {
        if (currentData !== undefined) {
            const tabList = currentData?.map((curr) => {
                return {
                    label: groupLabels(curr.group),
                    key: curr.group,
                    children: <CollapseCard configData={curr} />,
                };
            });
            setTabs(tabList);
        }
    }, [currentData]);

    return <Tabs items={tabs} />;
};
export default ConfigManageTab;
