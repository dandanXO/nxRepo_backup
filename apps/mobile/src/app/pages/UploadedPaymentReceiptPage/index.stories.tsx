import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppThemeProvider } from "@frontend/mobile/shared/ui";
import {PureUploadedPaymentReceiptPage} from "./PureUploadedPaymentReceiptPage";
export default {
    title: "Page/UploadedPaymentReceiptPage",
    component: PureUploadedPaymentReceiptPage,
} as ComponentMeta<typeof PureUploadedPaymentReceiptPage>;

export const Page: ComponentStory<typeof PureUploadedPaymentReceiptPage> = (
    args
) => {
    return (
        <AppThemeProvider>
            <PureUploadedPaymentReceiptPage
                navigateToLoanDetails={() => {
                    // do nothing.
                }}
            />
        </AppThemeProvider>
    );
};
