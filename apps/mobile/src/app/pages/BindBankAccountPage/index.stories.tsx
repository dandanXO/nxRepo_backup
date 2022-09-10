import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PureBindBankAccountPage } from "./PureBindBankAccountPage";
import { AppThemeProvider } from "@frontend/mobile/shared/ui";

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
