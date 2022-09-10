import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PureLoanDetailsAdvertisementPage } from "./PureLoanDetailsAdvertisementPage";
import { AppThemeProvider } from "../../core/components";
import { mockGetLoanDetailResponse } from "../../api/getLoanDetail";

export default {
    title: "Page/LoanDetailsPage",
    component: PureLoanDetailsAdvertisementPage,
} as ComponentMeta<typeof PureLoanDetailsAdvertisementPage>;

export const Page: ComponentStory<
    typeof PureLoanDetailsAdvertisementPage
> = () => {
    return (
        <AppThemeProvider>
            <PureLoanDetailsAdvertisementPage
                currentData={mockGetLoanDetailResponse}
                navigateToUploadPaymentReceiptPage={() => {
                    // do nothing.
                }}
                handlePostRepayCreate={() => {
                    // do nothing.
                }}
            />
        </AppThemeProvider>
    );
};
