export type ActivityBanner = {
    action: "APPLY_LOAN" | "POP_URL";
    actionUrl: string;
    payload: AdsTemplate1Payload1 | AdsTemplate1Payload2;
}

export interface ActivityBannerResponse {
    contents?: ActivityBanner[];
    name: string;
    templateType: 1 | 2 | 3;
}

// NOTE: refactor
export type AdsTemplate1Payload1 = {
    isBrand: boolean,
    title: string;
    priceUnit: string;
    price: string;
    description: string;
}
export type AdsTemplate1Payload2 = {
    isBrand: boolean,
    title: string;
    description1: string;
    description2: string;
    actionName: string;
}
