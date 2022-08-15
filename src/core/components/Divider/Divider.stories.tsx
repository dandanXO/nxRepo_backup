import Divider from "./index";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AppThemeProvider} from "../index";

export default {
    title: "Component/Divider",
    component: Divider
} as ComponentMeta<typeof Divider>

const Template: ComponentStory<typeof Divider> = args => (
    <AppThemeProvider>
        <Divider/>
    </AppThemeProvider>
);

export const Normal = Template.bind({});
