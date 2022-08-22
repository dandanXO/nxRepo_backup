import * as React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Card from "./index";
import {AppThemeProvider} from "../index";
import CardContent from "../CardContent";

export default {
    title: 'Component/Card',
    component: Card,
    args: {
        // isHot: true,
        // children: <div>test</div>,
    },
    argTypes: {

    },
    parameters: {

    }
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
    <AppThemeProvider>
        <Card {...args}><div>Card</div></Card>
    </AppThemeProvider>
)

export const Normal = Template.bind({});
Normal.args = {
    isHot: false
}

export const ContentTemplate: ComponentStory<typeof Card> = (args) => (
    <AppThemeProvider>
        <Card {...args}>
            <CardContent/>
        </Card>
    </AppThemeProvider>
)

