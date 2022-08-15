import {ComponentMeta, ComponentStory} from "@storybook/react";
import ListItem from "./index";
import {AppThemeProvider} from "../index";

export default {
    title: "Component/ListItem",
    component: ListItem
} as ComponentMeta<typeof ListItem>

export const Template: ComponentStory<typeof ListItem> = (args) => (
    <AppThemeProvider>
        <ListItem title="title" text="text"></ListItem>
    </AppThemeProvider>
)
