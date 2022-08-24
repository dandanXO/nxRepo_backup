import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import RepaymentModal from "./index";
import { AppThemeProvider } from "../../../../core/components";

export default {
    title: "Page/LoanDetailsPage",
    component: RepaymentModal,
} as ComponentMeta<typeof RepaymentModal>;

export const ModalRepayment: ComponentStory<typeof RepaymentModal> = (args) => {
    return (
        <AppThemeProvider>
            <RepaymentModal
                balance={8500}
                setShowRepaymentModal={() => {}}
                setShowRepaymentNoticeModal={() => {}}
            />
        </AppThemeProvider>
    );
};
