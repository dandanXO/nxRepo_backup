import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PureLoanDetailsPage } from "./index";
import { AppThemeProvider } from "../../core/components";
import { mockGetLoanDetailResponse } from "../../api/getLoanDetail";

export default {
    title: "Page/LoanDetailsPage",
    component: PureLoanDetailsPage,
} as ComponentMeta<typeof PureLoanDetailsPage>;

export const Page: ComponentStory<typeof PureLoanDetailsPage> = () => {
    return (
        <AppThemeProvider>
            <PureLoanDetailsPage
                currentData={mockGetLoanDetailResponse}
                navigateToUploadPaymentReceiptPage={() => {}}
            />
        </AppThemeProvider>
    );
};
