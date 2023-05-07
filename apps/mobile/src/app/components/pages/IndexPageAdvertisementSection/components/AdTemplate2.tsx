import { AdTemplateCard } from "../index";

export interface AdTemplate2 {
    brandCard: AdTemplate2BrandCard;
    card: AdTemplate2Card;
}

export interface AdTemplate2BrandCard extends AdTemplateCard {
    title1: string;
    title2: string;
    description: string;
}

export interface AdTemplate2Card extends AdTemplateCard {
    title: string;
}
