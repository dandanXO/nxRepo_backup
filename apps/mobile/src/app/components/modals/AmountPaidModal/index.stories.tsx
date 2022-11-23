import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import AmountPaidModal from "./AmountPaidModal";
import { AppThemeProvider } from "@frontend/mobile/shared/ui";

export default {
    title: "Modal/AmountPaidModal",
    component: AmountPaidModal,
} as ComponentMeta<typeof AmountPaidModal>;
export const Template: ComponentStory<typeof AmountPaidModal> = (
    args
) => {
    const data = {
        balance: 0,
        repayAmount: 1380,
        repayDate: "2022-06-25",
    };
    return (
        <AppThemeProvider>
            <AmountPaidModal
                repayRecords={[data]}
                setShowAmountPaidModal={() => {
                    // do nothing.
                }}
            />
        </AppThemeProvider>
    );
};