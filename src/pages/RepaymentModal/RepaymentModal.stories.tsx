import * as React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import RepaymentModal from "./RepaymentModal";
import {AppThemeProvider} from "../../core/components";

export default {
    title: 'Page/RepaymentModal',
    component: RepaymentModal,
} as ComponentMeta<typeof RepaymentModal>;

export const Prototype: ComponentStory<typeof RepaymentModal> = (args) => {
    return (
        <AppThemeProvider>
            <RepaymentModal/>
        </AppThemeProvider>
    )
}




