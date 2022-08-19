import {ComponentMeta, ComponentStory} from "@storybook/react";
import UploadPaymentReceiptPage from "./index";
import {AppThemeProvider} from "../../core/components";
export default {
    title: 'Page/UploadPaymentReceiptPage',
    component: UploadPaymentReceiptPage,
} as ComponentMeta<any>

export const Page: ComponentStory<any> = () => {
    return (
        <AppThemeProvider>
            <UploadPaymentReceiptPage/>
        </AppThemeProvider>
    )
}


