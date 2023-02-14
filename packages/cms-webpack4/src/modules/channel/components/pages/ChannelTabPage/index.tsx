import AdminPage from "../../../../shared/components/atoms/AdminPage";
import {Tabs} from "antd";
import {ChannelSettingTabPage} from "./ChannelSettingTab";
import {ChannelSettingTagTabPage} from "./ChannelSettingTagTab";
import {useState} from "react";

export const ChannelTabPage = () => {
    const [activeKey, setActiveKey] = useState("channel");
    const tabs = [
        { key: 'channel', label: '渠道配置列表', children: <ChannelSettingTabPage active={activeKey === "channel"}/>, forceRender: false},
        { key: 'channel-tag', label: '渠道配置标签管理', children: <ChannelSettingTagTabPage active={activeKey === "channel-tag"}/>, forceRender: false},
    ];
    return (
        <AdminPage
            navigator={{
                ancestor: {
                    path: "",
                    breadcrumbName: "首页",
                },
                parent: {
                    path: "",
                    breadcrumbName: "渠道管理",
                },
                self: {
                    path: "",
                    breadcrumbName:"渠道配置"
                }
            }}
        >
            <Tabs items={tabs} onChange={(activeKey) => {
                setActiveKey(activeKey)
            }}/>
        </AdminPage>
    )
}
