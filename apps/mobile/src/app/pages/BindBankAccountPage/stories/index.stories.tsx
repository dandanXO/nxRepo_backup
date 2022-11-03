import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {AppThemeProvider, DefaultThemeConfig, GreenThemeConfig} from "@frontend/mobile/shared/ui";
import {IndiaBindBankAccountPage} from "../i18n/pageByCountry/india/IndiaBindBankAccountPage";

import {PakistanBindBankAccountPage} from "../i18n/pageByCountry/pakistan/PakistanBindBankAccountPage";

export default {
    title: "Page/BindBankAccountPage",
    component: IndiaBindBankAccountPage,
} as ComponentMeta<any>;

// NOTE: Hide me when in India
export const IndiaPage: ComponentStory<any> = (args) => {
    return (
        <AppThemeProvider theme={DefaultThemeConfig}>
          <IndiaBindBankAccountPage postBankBindSave={() => {}} cardholderName={""}/>
        </AppThemeProvider>
    );
};

export const PakistanPage: ComponentStory<any> = (args) => {
  return (
    <AppThemeProvider theme={GreenThemeConfig}>
      <PakistanBindBankAccountPage postBankBindSave={() => {}} cardholderName={""}/>
    </AppThemeProvider>
  );
};
