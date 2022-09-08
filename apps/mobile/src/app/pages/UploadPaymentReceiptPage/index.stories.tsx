import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PureUploadPaymentReceiptPage } from "./index";
import { AppThemeProvider } from "../../core/components";

export default {
    title: "Page/UploadPaymentReceiptPage",
    component: PureUploadPaymentReceiptPage,
} as ComponentMeta<typeof PureUploadPaymentReceiptPage>;

export const Page: ComponentStory<typeof PureUploadPaymentReceiptPage> = () => {
    return (
        <AppThemeProvider>
            <PureUploadPaymentReceiptPage
                postRepayReceiptRequest={() => {}}
                token={""}
                orderNo="123"
            />
        </AppThemeProvider>
    );
};
