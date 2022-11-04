import {DropdownProps, Select} from "./index";
import {Meta, Story} from "@storybook/react";
import React from "react";
import {ThemeModuleSkinType, ThemeModuleSkinTypeEnum} from "../type/module";
// import DesignThemeProvider from "../../../themeUtilties/ThemeProvider";

export default {
    title: "Select",
    component: Select,
    argTypes: {onSelect: {action: "onSelect"}},
} as Meta;

const Template: Story<DropdownProps> = (args: DropdownProps) => <Select {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    dataSource: ["Easypaisa1", "Easypaisa2", "Easypaisa3", "Easypaisa4"],
    defaultIndex: 0,
    // NOTE: 修改預設寬度
    fixButtonWidth: "325px",
    theme: {
        // REFACTORING
        mode: ThemeModuleSkinTypeEnum.early,
    },
};
