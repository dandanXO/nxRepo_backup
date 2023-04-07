import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ExtensionDetailModal from "./index";
import { AppThemeProvider } from "@frontend/mobile/shared/ui";
import {useState} from "react";
export default {
  title: "Page/LoanDetailsPage/Modals",
  component: ExtensionDetailModal,
} as ComponentMeta<typeof ExtensionDetailModal>;

export const ModalExtensionDetail: ComponentStory<typeof ExtensionDetailModal> = (args) => {
  const [showExtensionModal, setShowExtensionModal] = useState(false)
  return (
    <AppThemeProvider>
      <ExtensionDetailModal
        parentOrderNo={"no-3632791101642108-7"}
        setShowExtensionModal={setShowExtensionModal}
      />
    </AppThemeProvider>
  );
};
