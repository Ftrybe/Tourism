import {BaiduMapLocation} from './baidu-map-location';

export class BaiduMapSuggestion {
  status: number;
  message: string;
  result: BaiduMapResult[];

}

export class BaiduMapResult {
  name: string;
  location: BaiduMapLocation;
  uid: string;
  province: string;
  city: string;
  district: string;
}
