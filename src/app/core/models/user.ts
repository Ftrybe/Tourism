import {Sex} from './sex.enum';

export class User {
  id: string;
  username: string;
  password: string;
  nickname?: string;
  email?: string;
  sex: Sex;
  picture: string;
  createTime: Date;
  modifyTime: Date;
  birthday?: Date;
  declaration: string;
  isAccountNonLocked: boolean;
}
