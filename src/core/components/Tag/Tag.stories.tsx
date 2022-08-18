import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Tag from "./index";
import {AppThemeProvider} from "../index";

export default {
    title: 'Component/Tag',
    component: Tag,
    args: {
    },
    argTypes: {
        status:{
            options: ['EXTEND', 'OVERDUE','PAY_OFF',"PROCESSING","UNPAID"],
            control: 'radio',
            description: "狀態",
            defaultValue: "EXTEND",
        }
    },
    parameters: {

    }
} as ComponentMeta<typeof Tag>;

export const Template: ComponentStory<typeof Tag> = (args) => (
    <AppThemeProvider>
        <Tag {...args} >{args.status}</Tag>
    </AppThemeProvider>
)


