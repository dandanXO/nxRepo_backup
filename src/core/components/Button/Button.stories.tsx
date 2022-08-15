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
        <Button styleType="primary">Confirm</Button>
        <Button styleType="secondary">Confirm</Button>
        <Button styleType="link">Confirm</Button>
    </AppThemeProvider>
);

export const StyleType = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
StyleType.args = {
    size: "small",
};

const SizeTemplate: ComponentStory<typeof Button> = (args) => (
    <AppThemeProvider>
        <Button styleType="primary" size="10">Confirm</Button>
        <Button styleType="secondary" size="20">Confirm</Button>
        <Button styleType="link" size="30">Confirm</Button>
    </AppThemeProvider>
);

export const Size = SizeTemplate.bind({});
Size.args = {

};
