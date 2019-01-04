import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {

      // 路由动态修改标题
     this.router.events.pipe(
       filter(e => e instanceof NavigationEnd),
       map(() => this.activatedRoute),
       map(r => {
         while (r.firstChild) r = r.firstChild;
         return r;
       }),
       filter(r => r.outlet === 'primary'),
       mergeMap(r => r.data)
     )
     .subscribe(e =>this.titleService.setTitle(e['title']));
    }

}
