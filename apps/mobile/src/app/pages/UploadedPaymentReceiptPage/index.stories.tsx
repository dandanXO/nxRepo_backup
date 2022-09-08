import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PureUploadedPaymentReceiptPage } from "./index";
import { AppThemeProvider } from "../../core/components";

export default {
    title: "Page/UploadedPaymentReceiptPage",
    component: PureUploadedPaymentReceiptPage,
} as ComponentMeta<typeof PureUploadedPaymentReceiptPage>;

export const Page: ComponentStory<typeof PureUploadedPaymentReceiptPage> = (
    args
) => {
    return (
        <AppThemeProvider>
            <PureUploadedPaymentReceiptPage navigateToLoanDetails={() => {
              // do nothing.
            }} />
        </AppThemeProvider>
    );
};
