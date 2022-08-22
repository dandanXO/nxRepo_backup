import {ComponentMeta, ComponentStory} from "@storybook/react";
import UploadingFileModal from "./index";
import {AppThemeProvider} from "../../../../core/components";

export default {
    title: 'Page/UploadPaymentReceiptPage',
    component: UploadingFileModal,
} as ComponentMeta<any>

export const ModalUploadingFile: ComponentStory<any> = () => {
    return (
        <AppThemeProvider>
            <UploadingFileModal/>
        </AppThemeProvider>
    )
}


