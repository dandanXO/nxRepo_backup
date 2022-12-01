import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import RepaymentModal from "./index";
import { AppThemeProvider } from "@frontend/mobile/shared/ui";
export default {
    title: "Page/LoanDetailsPage/Modals",
    component: RepaymentModal,
} as ComponentMeta<typeof RepaymentModal>;

export const ModalRepayment: ComponentStory<typeof RepaymentModal> = (args) => {
    return (
        <AppThemeProvider>
            <RepaymentModal
                balance={8500}
                setRepayBalance={() => {
                    // do nothing.
                }}
                setShowRepaymentModal={() => {
                    // do nothing.
                }}
                setShowRepaymentNoticeModal={() => {
                    // do nothing.
                }}
                handlePostRepayCreate={() => {
                    // do nothing.
                }}
                paymentMethodList={["type1", "type2"]}
                setPayType={{} as any}
            />
        </AppThemeProvider>
    );
};