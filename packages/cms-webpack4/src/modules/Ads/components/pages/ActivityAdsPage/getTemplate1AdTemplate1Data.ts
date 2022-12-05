import {ActivityBanner} from "../../../service/types";
import {
    AdTemplate1,
    AdTemplate1BrandCard,
    AdTemplate1Card
} from "../../../import/ActivityAdListPage/components/AdTemplate1";

// NOTICE: Interface type check with Typescript https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
function instanceOfBrandCard(obj: any): obj is AdTemplate1BrandCard {
    return 'priceUnit' in obj;
}

function instanceOfCard(obj: any): obj is AdTemplate1Card {
    return 'description1' in obj;
}
export const getTemplate1AdTemplate1Data = (ads?: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>[]): AdTemplate1 | null => {
    if (!ads) return;
    return {
        brandCard: instanceOfBrandCard(ads[0].payload) && {
            title: ads[0].payload.title,
            priceUnit: instanceOfBrandCard(ads[0].payload) && ads[0].payload.priceUnit,
            price: instanceOfBrandCard(ads[0].payload) && ads[0].payload.price,
            description: instanceOfBrandCard(ads[0].payload) && ads[0].payload.description,
        },
        cards: ads.slice(1, ads.length).map((item: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>) => {
            return {
                action: item.action,
                actionUrl: item.actionUrl,
                actionName: instanceOfCard(item.payload) && item.payload.actionName,
                title: item.payload.title,
                description1: instanceOfCard(item.payload) && item.payload.description1,
                description2: instanceOfCard(item.payload) && item.payload.description2,
            }
        })
    }
}
