import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PureBindBankAccountPage } from "./PureBindBankAccountPage";
import {AppThemeProvider, GreenThemeConfig} from "@frontend/mobile/shared/ui";

export default {
    title: "Page/BindBankAccountPage",
    component: PureBindBankAccountPage,
} as ComponentMeta<typeof PureBindBankAccountPage>;

export const Page: ComponentStory<typeof PureBindBankAccountPage> = (args) => {
    return (
        <AppThemeProvider theme={GreenThemeConfig}>
            <PureBindBankAccountPage
                postBankBindSave={() => {}}
                cardholderName="cardholderName"
            />
        </AppThemeProvider>
    );
};
