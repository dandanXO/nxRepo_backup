import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
    AppThemeProvider,
    DefaultThemeConfig,
    GreenThemeConfig,
} from "@frontend/mobile/shared/ui";
import { IndiaBindBankAccountPage } from "./i18n/components/IndiaBindBankAccountPage";
import { PakistanBindBankAccountPage } from "./i18n/components/PakistanBindBankAccountPage";

export default {
    title: "Page/BindBankAccountPage",
    component: IndiaBindBankAccountPage,
    parameters: {
        cardholderName: {
            values: [
                { name: "red", value: "#f00" },
                { name: "green", value: "#0f0" },
                { name: "blue", value: "#00f" },
            ],
        },
    },
} as ComponentMeta<any>;

// NOTE: Hide me when in India
export const IndiaPage: ComponentStory<any> = (args) => {
    return (
        <AppThemeProvider theme={DefaultThemeConfig}>
            <IndiaBindBankAccountPage
                postBankBindSave={() => {}}
                cardholderName={""}
            />
        </AppThemeProvider>
    );
};

export const PakistanPage: ComponentStory<any> = (args) => {
    return (
        <AppThemeProvider theme={GreenThemeConfig}>
            <PakistanBindBankAccountPage
                postBankBindSave={() => {}}
                cardholderName={""}
                triggerPostBankBindSaveToPKMutation={{} as any}
                bindCardDropListData={{
                    availableWalletVendors: [
                        {
                            code: "1",
                            displayName: "wallet1",
                        },
                        {
                            code: "2",
                            displayName: "wallet2",
                        },
                    ],
                    showBankOption: false,
                }}
            />
        </AppThemeProvider>
    );
};
