import { PriorityEnum } from '../enums';
import { OptionInterface } from '../interfaces';

export const PriorityOptions: OptionInterface[] = [
  { label: PriorityEnum.LOW, value: PriorityEnum.LOW },
  { label: PriorityEnum.MEDIUM, value: PriorityEnum.MEDIUM },
  { label: PriorityEnum.HIGH, value: PriorityEnum.HIGH },
];
