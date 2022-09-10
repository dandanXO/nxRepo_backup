import { AppThemeProvider } from "@frontend/mobile/shared/ui";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PureUploadPaymentReceiptPage } from "./index";

export default {
    title: "Page/UploadPaymentReceiptPage",
    component: PureUploadPaymentReceiptPage,
} as ComponentMeta<typeof PureUploadPaymentReceiptPage>;

export const Page: ComponentStory<typeof PureUploadPaymentReceiptPage> = () => {
    return (
        <AppThemeProvider>
            <PureUploadPaymentReceiptPage
                postRepayReceiptRequest={() => {
                    // do nothing.
                }}
                token={""}
                orderNo="123"
            />
        </AppThemeProvider>
    );
};
