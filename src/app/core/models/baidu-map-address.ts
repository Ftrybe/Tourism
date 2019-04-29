import {BaiduMapLocation} from './baidu-map-location';

export class BaiduMapAddress {
  status: number;
  location: BaiduMapLocation;
  precise: number;
  confidence: number;
  comprehension: number;
  level: string;
}
