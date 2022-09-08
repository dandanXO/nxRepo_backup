import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppThemeProvider } from "../../../../core/components";
import RepaymentNoticeModal from "./index";

export default {
    title: "Page/LoanDetailsPage",
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
