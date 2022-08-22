import {ComponentMeta, ComponentStory} from "@storybook/react";
import BindBankAccountPage from "./index";
import {AppThemeProvider} from "../../core/components";

export default {
    title: "Page/BindBankAccountPage",
    component: BindBankAccountPage,
} as ComponentMeta<typeof BindBankAccountPage>

export const Page: ComponentStory<typeof BindBankAccountPage> = (args) => {
    return (
        <AppThemeProvider>
            <BindBankAccountPage/>
        </AppThemeProvider>
    )
}
