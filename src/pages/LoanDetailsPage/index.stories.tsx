import {ComponentMeta, ComponentStory} from "@storybook/react";
import LoanDetailsPage from "./index";
import {AppThemeProvider} from "../../core/components";

export default {
    title: "Page/LoanDetailsPage",
    component: LoanDetailsPage,
} as ComponentMeta<typeof LoanDetailsPage>

export const Page:ComponentStory<typeof LoanDetailsPage> = () => {
    return (
        <AppThemeProvider>
            <LoanDetailsPage/>
        </AppThemeProvider>
    )
}
