export class Banner {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  // 主题类型 0 主页 banner 1 美食 2景点
  topic: string;

  toJsonByAdd(): string {
    return '[{"title":"' + this.title + '","subtitle":"' + this.subtitle + '","topic":"' + this.topic + '"}]';
  }
}
