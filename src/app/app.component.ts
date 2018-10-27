import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { filter,map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
     this.router.events.pipe(
       filter(e=>e instanceof NavigationEnd),
       map(() => this.activatedRoute),
       map(r => {
         while (r.firstChild) r = r.firstChild;
         return r;
       }),
       filter(r =>r.outlet === 'primary'),
       mergeMap(r =>r.data)
     )
     .subscribe(e =>this.titleService.setTitle(e['title']));
    }

}
