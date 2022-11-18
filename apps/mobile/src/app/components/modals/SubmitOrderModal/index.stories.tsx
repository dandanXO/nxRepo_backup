import {ComponentMeta, ComponentStory} from "@storybook/react";
import SubmitOrderModal from "./index";
import {AppThemeProvider} from "../../../../../../../libs/mobile/shared/ui/src";

export default {
  title: "Modal/SubmitOrderModal",
} as ComponentMeta<typeof SubmitOrderModal>

export const Template: ComponentStory<typeof SubmitOrderModal> = () => {
  return (
    <AppThemeProvider>
      <SubmitOrderModal setShowSubmitOrdereModal={() => {}} handleLoanSubmitOrder={() => {}}/>
    </AppThemeProvider>
  )
}
