import { ActivityBannerResponse } from '../../export/service/types';
import { AdTemplate2BrandCard, AdTemplate2Card } from '../../import/ActivityAdListPage/components/AdTemplate2';

export const MockActivityBannerResponseData2: ActivityBannerResponse<AdTemplate2BrandCard, AdTemplate2Card> = {
    name: 'Ads Name',
    templateType: 2,
    enabled: true,
    scenario: 'DEFAULT',
    sort: 0,
    contents: [
        {
            // NOTICE: REFACTOR
            action: 'APPLY_LOAN',
            actionUrl: '',
            payload: {
                // NOTICE: REFACTOR
                action: 'POP_URL',
                actionName: '立即查看',
                actionUrl: '',
                title1: '最快3分鐘',
                title2: '放款率最高',
                priceUnit: 'PKR',
                price: '5,000',
            },
        },
        {
            // NOTICE: REFACTOR
            action: 'APPLY_LOAN',
            actionUrl: '',
            payload: {
                // NOTICE: REFACTOR
                action: 'POP_URL',
                actionUrl: 'http://google.com',
                actionName: '立即申請',
                title: '信用500以上 秒下款',
            },
        },
        {
            // NOTICE: REFACTOR
            action: 'POP_URL',
            actionUrl: 'http://google.com',
            payload: {
                // NOTICE: REFACTOR
                action: 'POP_URL',
                actionUrl: 'http://google.com',
                actionName: '立即申請',
                title: '憑信用卡秒下50000元',
            },
        },
    ],
};
