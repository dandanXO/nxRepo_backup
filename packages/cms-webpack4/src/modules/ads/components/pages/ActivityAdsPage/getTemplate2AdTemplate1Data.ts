import {ActivityBanner} from "../../../service/types";
import {
  AdTemplate2BrandCard,
  AdTemplate2Card, IAdTemplate2Data
} from "../../../import/ActivityAdListPage/components/AdTemplate2";


function instanceOfBrandCard2(obj: any): obj is AdTemplate2BrandCard {
    return 'priceUnit' in obj;
}

function instanceOfCard2(obj: any): obj is AdTemplate2Card {
    return 'title' in obj;
}

export const getTemplate2AdTemplate1Data = (ads?: ActivityBanner<AdTemplate2BrandCard, AdTemplate2Card>[]): IAdTemplate2Data | null => {
    if (!ads) return null;
    return {
        brandCard: {
            title1: (ads[0].payload as AdTemplate2BrandCard).title1,
            title2: (ads[0].payload as AdTemplate2BrandCard).title2,
            priceUnit: (ads[0].payload as AdTemplate2BrandCard).priceUnit,
            price: (ads[0].payload as AdTemplate2BrandCard).price,
            actionName: (ads[0].payload as AdTemplate2BrandCard).actionName,
            action: ads[0].action,
            actionUrl: ads[0].actionUrl,
        },
        topCard: {
            title: (ads[1].payload as AdTemplate2Card).title,
            actionName: (ads[1].payload as AdTemplate2Card).actionName,
            action: ads[1].action,
            actionUrl: ads[1].actionUrl,
        },
        bottomCard: {
            title: (ads[2].payload as AdTemplate2Card).title,
            actionName: (ads[2].payload as AdTemplate2Card).actionName,
            action: ads[2].action,
            actionUrl: ads[2].actionUrl,
        },
    }
}
