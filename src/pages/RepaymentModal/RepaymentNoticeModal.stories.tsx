import * as React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AppThemeProvider} from "../../core/components";
import RepaymentNoticeModal from "./RepaymentNoticeModal";

export default {
    title: 'Page/RepaymentNoticeModal',
    component: RepaymentNoticeModal,
} as ComponentMeta<typeof RepaymentNoticeModal>;

export const Prototype: ComponentStory<typeof RepaymentNoticeModal> = (args) => {
    return (
        <AppThemeProvider>
            <RepaymentNoticeModal/>
        </AppThemeProvider>
    )
}




