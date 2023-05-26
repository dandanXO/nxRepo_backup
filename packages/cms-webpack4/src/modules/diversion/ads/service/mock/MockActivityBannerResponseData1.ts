import { ActivityBannerResponse } from '../../export/service/types';
import { AdTemplate1BrandCard, AdTemplate1Card } from '../../import/ActivityAdListPage/components/AdTemplate1';

export const MockActivityBannerResponseData1: ActivityBannerResponse<AdTemplate1BrandCard, AdTemplate1Card> = {
    name: 'Ads Name',
    templateType: 1,
    enabled: true,
    scenario: 'DEFAULT',
    sort: 0,
    contents: [
        {
            // NOTICE: REFACTOR
            action: 'APPLY_LOAN',
            actionUrl: '',
            payload: {
                title: '新人福利',
                priceUnit: 'PKR',
                price: '5,000',
                description: '新人大禮包',
            },
        },
        {
            // NOTICE: REFACTOR
            action: 'APPLY_LOAN',
            actionUrl: '',
            payload: {
                // NOTICE: REFACTOR
                action: 'APPLY_LOAN',
                actionUrl: '',
                actionName: '點我借款 >',
                title: '利息優惠1',
                description1: '- 1.0%',
                description2: '原利息15%',
            },
        },
        {
            // NOTICE: REFACTOR
            action: 'POP_URL',
            actionUrl: 'http://google.com',
            payload: {
                // NOTICE: REFACTOR
                action: 'POP_URL',
                actionUrl: '',
                actionName: '點我借款 >',
                title: '利息優惠2',
                description1: '- 2.0%',
                description2: '原利息25%',
            },
        },
    ],
};
