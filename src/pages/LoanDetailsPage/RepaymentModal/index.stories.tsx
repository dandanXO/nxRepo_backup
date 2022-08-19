import * as React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Index from "./RepaymentModal";
import {AppThemeProvider} from "../../../core/components";

export default {
    title: 'Page/RepaymentModal',
    component: Index,
} as ComponentMeta<typeof Index>;

export const Prototype: ComponentStory<typeof Index> = (args) => {
    return (
        <AppThemeProvider>
            <Index balance={8500}/>
        </AppThemeProvider>
    )
}




