import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PureBindBankAccountPage } from "../PureBindBankAccountPage";
import {AppThemeProvider, DefaultThemeConfig, GreenThemeConfig} from "@frontend/mobile/shared/ui";
import {PageLayoutTemplate1} from "../i18n/pageByLayout/PageLayoutTemplate1";
import {PageLayoutTemplate2} from "../i18n/pageByLayout/PageLayoutTemplate2";
import {IndiaBindBankAccountPage} from "../i18n/pageByCountry/IndiaBindBankAccountPage";
import React from "react";
import {PakistanBindBankAccountPage} from "../i18n/pageByCountry/PakistanBindBankAccountPage";

export default {
    title: "Page/BindBankAccountPage",
    component: PureBindBankAccountPage,
} as ComponentMeta<typeof PureBindBankAccountPage>;

// NOTE: Hide me when in India
export const IndiaPage: ComponentStory<typeof PureBindBankAccountPage> = (args) => {
    return (
        <AppThemeProvider theme={DefaultThemeConfig}>
          <IndiaBindBankAccountPage postBankBindSave={() => {}} cardholderName={""}/>
        </AppThemeProvider>
    );
};

export const PakistanPage: ComponentStory<typeof PureBindBankAccountPage> = (args) => {
  return (
    <AppThemeProvider theme={GreenThemeConfig}>
      <PakistanBindBankAccountPage postBankBindSave={() => {}} cardholderName={""}/>
    </AppThemeProvider>
  );
};
