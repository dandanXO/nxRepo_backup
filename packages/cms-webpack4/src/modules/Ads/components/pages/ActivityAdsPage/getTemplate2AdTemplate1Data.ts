import {ActivityBanner} from "../../../service/types";
import {
    AdTemplate2,
    AdTemplate2BrandCard,
    AdTemplate2Card
} from "../../../import/ActivityAdListPage/components/AdTemplate2";


function instanceOfBrandCard2(obj: any): obj is AdTemplate2BrandCard {
    return 'priceUnit' in obj;
}

function instanceOfCard2(obj: any): obj is AdTemplate2Card {
    return 'title' in obj;
}

export const getTemplate2AdTemplate1Data = (ads?: ActivityBanner<AdTemplate2BrandCard, AdTemplate2Card>[]): AdTemplate2 | null => {
    if (!ads) return;
    return {
        brandCard: {
            title1: instanceOfBrandCard2(ads[0].payload) && ads[0].payload.title1,
            title2: instanceOfBrandCard2(ads[0].payload) && ads[0].payload.title2,
            priceUnit: instanceOfBrandCard2(ads[0].payload) && ads[0].payload.priceUnit,
            price: instanceOfBrandCard2(ads[0].payload) && ads[0].payload.price,
            actionName: instanceOfBrandCard2(ads[0].payload) && ads[0].payload.actionName,
            action: ads[0].action,
            actionUrl: ads[0].actionUrl,
        },
        topCard: {
            title: instanceOfCard2(ads[1].payload) && ads[1].payload.title,
            actionName: instanceOfCard2(ads[1].payload) && ads[1].payload.actionName,
            action: ads[1].action,
            actionUrl: ads[1].actionUrl,
        },
        bottomCard: {
            title: instanceOfCard2(ads[2].payload) && ads[2].payload.title,
            actionName: instanceOfCard2(ads[2].payload) && ads[2].payload.actionName,
            action: ads[2].action,
            actionUrl: ads[2].actionUrl,
        },
    }
}
