import AdminPage from "../../../../shared/components/AdminPage";
import {Tabs} from "antd";
import {ChannelSettingTabPage} from "./ChannelSettingTab";
import {ChannelSettingTagTabPage} from "./ChannelSettingTagTab";

export const ChannelTabPage = () => {
    const tabs = [
        { label: '渠道配置列表', key: 'channel', children: <ChannelSettingTabPage/>},
        { label: '渠道配置标签管理', key: 'channel-tab', children: <ChannelSettingTagTabPage/>},
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
            <Tabs items={tabs}/>
        </AdminPage>
    )
}
