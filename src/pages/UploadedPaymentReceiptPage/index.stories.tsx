import {ComponentMeta, ComponentStory} from "@storybook/react";
import UploadedPaymentReceiptPage from "./index";
import {AppThemeProvider} from "../../core/components";

export default {
    title: "Page/UploadedPaymentReceiptPage",
    component: UploadedPaymentReceiptPage,
} as ComponentMeta<typeof UploadedPaymentReceiptPage>;

export const Page:ComponentStory<typeof UploadedPaymentReceiptPage> = (args) => {
    return (
        <AppThemeProvider>
            <UploadedPaymentReceiptPage/>
        </AppThemeProvider>
    )
}
