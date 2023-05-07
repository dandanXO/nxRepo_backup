import { AdTemplateCard } from "../index";

export interface AdTemplate3 {
    brandCard: AdTemplate3Card;
    card: AdTemplate3Card;
}

export interface AdTemplate3Card extends AdTemplateCard {
    title: string;
    description1: string;
    description2: string;
}
