import {ComponentMeta, ComponentStory} from "@storybook/react";
import Form from "./index";
import {AppThemeProvider} from "../index";
import {Input} from "../Input";

export default {
    title: "開發中/Form",
    component: Form
} as ComponentMeta<typeof Form>

const Template:ComponentStory<typeof Form> = (args) => {
    return (
        <AppThemeProvider>
            <Form>
            </Form>
        </AppThemeProvider>
    )
}

export const Normal = Template.bind({});
