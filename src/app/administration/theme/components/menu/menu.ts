import {Menu} from './menu.model';

export const verticalMenuItems = [
  new Menu(1, '仪表板', '/manager', null, 'dashboard', null, false, 0),
  new Menu(2, '首页管理', null, null, 'home', null, true, 0),
  new Menu(21, 'Banner', '/manager/home/banner', null, 'computer', null, false, 2),
  new Menu(22, '推荐列表', '/manager/home/hot', null, 'computer', null, false, 2),
  new Menu(3, '游记管理', '/manager/notes', null, 'list', null, false, 0),
  new Menu(4, '文章管理', '/manager/articles/', null, 'keyboard', null, false, 0),
  new Menu(5, '用户管理', '/manager/users', null, 'account_box', null, false, 0),
  new Menu(6, '管理员管理', '/manager/admin', null, 'account_box', null, false, 0),
];

export const horizontalMenuItems = [

];
