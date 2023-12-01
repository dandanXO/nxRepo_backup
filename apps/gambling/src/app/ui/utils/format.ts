export const formatLocaleMoney = (money: number) => money.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2})

export const clampNumber = (value: number, min: number, max: number) => value > max ? max: value < min ? min: value;
