import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProductDetailModal from "./index";
import { AppThemeProvider } from "@frontend/mobile/shared/ui";
import * as React from "react";

export default {
    title: "Modal/ProductDetailModal",
    component: ProductDetailModal,
} as ComponentMeta<typeof ProductDetailModal>;

export const Template: ComponentStory<typeof ProductDetailModal> = () => {
    return (
        <AppThemeProvider>
            <ProductDetailModal
                recommendProducts={data}
                setShowProductDetailModal={() => {
                    // do nothing.
                }}
            />
        </AppThemeProvider>
    );
};

const data = {
    productId: 3,
    logoUrl:
        "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/8285186.png",
    productName: "AA LOAN",
    loanQuota: "160-9000",
    term: "10Days",
    interestRate: "10~40%",
    approvedRate: "70 ~ 95%",
    approvedTime: "< 3 Min",
    tags: ["best", " hot", " lower rate"],
    csTime: "08:00AM ~ 7:00PM",
    csEmail: "csemail@test.copm",
    privacyUrl: "https://site.india-api-dev.com/api/v2/html/privacy",
    termUrl: "https://site.india-api-dev.com/api/v2/html/agreement",
    disclosureUrl: "https://site.india-api-dev.com/api/v2/html/disclosure",
    agreementUrl: "https://site.india-api-dev.com/api/v2/html/agreement",
    top: true,
    sort: 0,
    backgroundUrl:
        "https://platform-bucket-in.s3.ap-south-1.amazonaws.com/%E6%B5%8B%E8%AF%95%E7%94%A8/upload/icon_logo/bg1.jpg",
};
