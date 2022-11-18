import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import RepaymentNoticeModal from "./index";
import { AppThemeProvider } from "@frontend/mobile/shared/ui";

export default {
    title: "Page/LoanDetailsPage/Modals",
    component: RepaymentNoticeModal,
} as ComponentMeta<typeof RepaymentNoticeModal>;

export const ModalRepaymentNotice: ComponentStory<
    typeof RepaymentNoticeModal
> = (args) => {
    return (
        <AppThemeProvider>
            <RepaymentNoticeModal
                setShowRepaymentNoticeModal={() => {
                    // do nothing.
                }}
                handlePostRepayCreate={() => {
                    // do nothing.
                }}
                balance={1010}
            />
        </AppThemeProvider>
    );
};
