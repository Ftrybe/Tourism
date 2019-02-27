import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  // 选项卡索引
  index: number = 0;
  // 按顺序存放选项卡名称，方便切换选项卡
  tapMap = ['info', 'collection', 'publish', 'news'];
  // 取消订阅
  subscript;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.subscript = this.route.queryParams.subscribe(data => {
      this.index = this.tapMap.indexOf(data.select);
    });
  }
  // 选项卡更改事件
  changeQueryParam() {
    this.router.navigate([location.pathname], {queryParams: {select: this.tapMap[this.index]}});
  }

  changeIndexEvent(data) {
    this.index = data;
  }

  ngOnDestroy(): void {
    this.subscript.unsubscribe();
  }
}
