import { ComponentMeta, ComponentStory } from "@storybook/react";
import UploadingFileModal from "./index";
import { AppThemeProvider } from "../../../../core/components";

export default {
    title: "Page/UploadPaymentReceiptPage",
    component: UploadingFileModal,
} as ComponentMeta<typeof UploadingFileModal>;

export const ModalUploadingFile: ComponentStory<typeof UploadingFileModal> = () => {
    return (
        <AppThemeProvider>
            <UploadingFileModal />
        </AppThemeProvider>
    );
};
