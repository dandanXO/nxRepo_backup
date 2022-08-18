import {ComponentMeta, ComponentStory} from "@storybook/react";
import BankAccountPage from "./BankAccountPage";
import {AppThemeProvider} from "../../core/components";

export default {
    title: "Page/BankAccountPage",
    component: BankAccountPage,
} as ComponentMeta<typeof BankAccountPage>

export const Prototype: ComponentStory<typeof BankAccountPage> = (args) => {
    return (
        <AppThemeProvider>
            <BankAccountPage/>
        </AppThemeProvider>
    )
}
