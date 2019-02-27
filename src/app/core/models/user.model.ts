import {Sex} from './sex.enum';

export class User {
  id: number;
  username: string;
  password: string;
  nickname?: string;
  email?: string;
  sex: Sex;
  picture?: string;
  create_time: Date;
  birthday?: Date;
}
