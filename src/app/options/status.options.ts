import { StatusEnum } from '../enums';
import { OptionInterface } from '../interfaces';

export const StatusOptions: OptionInterface[] = [
  { label: StatusEnum.TODO, value: StatusEnum.TODO },
  { label: StatusEnum.IN_PROGRESS, value: StatusEnum.IN_PROGRESS },
  { label: StatusEnum.COMPLETED, value: StatusEnum.COMPLETED },
];
