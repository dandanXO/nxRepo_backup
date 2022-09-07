import { ComponentMeta, ComponentStory } from "@storybook/react";
import LoanBrand from "./index";
import { AppThemeProvider } from "../index";
import * as React from "react";

export default {
    title: "Business Component/LoanBrand",
    component: LoanBrand,
} as ComponentMeta<typeof LoanBrand>;

const fileIcon = require("../images/fileIcon.jpg");

const Template: ComponentStory<typeof LoanBrand> = (args) => (
    <AppThemeProvider>
        <LoanBrand
            iconUrl={fileIcon}
            productName="productName"
            sizeType={"small"}
        />
    </AppThemeProvider>
);

export const Normal = Template.bind({});
