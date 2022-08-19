import {ComponentMeta, ComponentStory} from "@storybook/react";
import BankAccountPage from "./index";
import {AppThemeProvider} from "../../core/components";

export default {
    title: "Page/BankAccountPage",
    component: BankAccountPage,
} as ComponentMeta<typeof BankAccountPage>

export const Page: ComponentStory<typeof BankAccountPage> = (args) => {
    return (
        <AppThemeProvider>
            <BankAccountPage/>
        </AppThemeProvider>
    )
}
