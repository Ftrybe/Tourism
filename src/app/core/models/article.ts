import {Topic} from './topic';

export class Article {
  id: string;
  titile: string;
  name: string;
  topic: Topic;
  declaration: string;
  createTime: Date;
  modifyTime: Date;
  businessHours: string;
  address: string;
  coverUrl: string;
  state: string;
}
