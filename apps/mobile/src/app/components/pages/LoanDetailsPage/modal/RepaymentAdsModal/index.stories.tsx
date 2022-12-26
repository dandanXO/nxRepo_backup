import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import RepaymentAdsModal from "./index";
import { AppThemeProvider } from "@frontend/mobile/shared/ui";
export default {
    title: "Page/LoanDetailsPage/Modals123",
    component: RepaymentAdsModal,
} as ComponentMeta<typeof RepaymentAdsModal>;

export const ModalRepayment: ComponentStory<typeof RepaymentAdsModal> = (args) => {
    return (
        <AppThemeProvider>
            <RepaymentAdsModal
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
