import { environment } from '../../environments/environment';
import { IndiaCountry } from 'libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from 'libs/shared/domain/src/country/PakistanCountry';
interface IStatusEnum {
    [key: string]: {
        text: string;
        color: string;
        bg: string;
        // buttonText: string;
    };
}

const isIndia = environment.country === IndiaCountry.country;

const statusEnum = {
    OVERDUE: {
        text: 'Overdue',
        color: 'text-[#F24822]',
        bg: 'bg-[#F9DDDC]',
        // buttonText: 'Repay Details',
    },
    PAY_OFF: {
        text: 'Pay off',
        color: 'text-[#A3A3A3]',
        bg: 'bg-[#E9ECEF]',
        // buttonText: '',
    },
    UNPAID: {
        text: 'Unpaid',
        color: isIndia ? 'text-[#F7A84C]' : 'text-[#F58B10]',
        bg: 'bg-[#FFEBD6]',
        // buttonText: 'Repay Details',
    },
    PROCESSING: {
        text: 'Processing',
        color: isIndia ? 'text-[#F6CF5B]' : 'text-[#F4C535]',
        bg: 'bg-[#FFF2D1]',
        // buttonText: 'Details',
    },
    REJECTED: {
        text: 'Reject',
        color: 'text-[#F24822]',
        bg: 'bg-[#F9DDDC]',
        // buttonText: 'Details',
    },
    EXTEND: {
        text: 'Extend',
        color: isIndia ? 'text-[#9046CF]' : 'text-[#0091DE]',
        bg: isIndia ? 'bg-[#F3ECFD]' : 'bg-[#ECEFFD]',
        // buttonText: 'Repay Details',
    },
} as IStatusEnum;

export const Status = (status: string) => {
    return status
        ? statusEnum[status]
        : { text: '', color: '', bg: '' };
};
