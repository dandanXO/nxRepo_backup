import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PureUploadPaymentReceiptPage } from "./index";
import { AppThemeProvider } from "../../core/components";
export default {
    title: "Page/UploadPaymentReceiptPage",
    component: PureUploadPaymentReceiptPage,
} as ComponentMeta<any>;

export const Page: ComponentStory<any> = () => {
    return (
        <AppThemeProvider>
            <PureUploadPaymentReceiptPage
                postRepayReceiptRequest={{} as any}
                token={{} as any}
                orderNo="123"
            />
        </AppThemeProvider>
    );
};
