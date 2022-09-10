export interface InputIconProps {
  size?: number;
  color?: string;
  fill?: string;
}

export type InputStatus = 'Idle' | 'Hover' | 'Focus' | 'KeyDown';
export type InputValidStatus = 'ReadyForValid' | boolean;
export enum InputValidEnum {
  'ReadyForValid' = 'ReadyForValid',
}
