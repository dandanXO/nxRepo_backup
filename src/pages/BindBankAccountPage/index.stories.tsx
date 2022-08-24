import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PureBindBankAccountPage } from "./index";
import { AppThemeProvider } from "../../core/components";

export default {
    title: "Page/BindBankAccountPage",
    component: PureBindBankAccountPage,
} as ComponentMeta<typeof PureBindBankAccountPage>;

export const Page: ComponentStory<typeof PureBindBankAccountPage> = (args) => {
    return (
        <AppThemeProvider>
            <PureBindBankAccountPage
                postBankBindSave={() => {}}
                cardholderName="cardholderName"
            />
        </AppThemeProvider>
    );
};
