
interface IStatusEnum {
    [key: string]: {
        text: string;
        style: string
    }
}

const statusEnum = {
    'OVERDUE': { text: 'Overdue', style: 'text-[#F24822] bg-[#F9DDDC]' },
    'PAY_OFF': { text: 'Pay off', style: 'text-[#A3A3A3] bg-[#E9ECEF]' },
    'UNPAID': { text: 'Unpaid', style: 'text-[#F58B10] bg-[#FFEBD6]' },
    'PROCESSING': { text: 'Processing', style: 'text-[#F4C535] bg-[#FFF2D1]' },
    'REJECTED': { text: 'Reject', style: 'text-[#F24822] bg-[#F9DDDC]' },
    'EXTEND': { text: 'Expend', style: 'text-[#0091DE] bg-[#ECEFFD]' },
} as IStatusEnum

export const Status = (status: string) => {
    return statusEnum[status]
}