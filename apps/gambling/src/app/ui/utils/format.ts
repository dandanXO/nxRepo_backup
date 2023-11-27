export const format = (money: number) => money.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2})

export const clamp = (value: number, min: number, max: number) => value > max ? max: value < min ? min: value;
