import {Topic} from './topic';

export class Article {
  id: string;
  titile: string;
  name: string;
  topic: Topic;
  declaration: string;
  create_time: Date;
  updateTime: Date;
  businessHours: string;
  address: string;
  coverUrl: string;
  state: string;
}
