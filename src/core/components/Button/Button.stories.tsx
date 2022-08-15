import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from "./index";
import {AppThemeProvider} from "../index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Component/Button',
    component: Button,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        // theme,
    },
    argTypes: {

    },
    parameters: {

    }

} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
    <AppThemeProvider>
        <Button {...args} >Confirm</Button>
    </AppThemeProvider>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    styleType: "primary",
    size: "small",
};

export const Link = Template.bind({});
Link.args = {
    styleType: 'link',
};
