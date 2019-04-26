import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Article} from '../models/article';
import {EMPTY, Observable, of} from 'rxjs';
import {ArticlesService} from '../services/articles.service';
import {mergeMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesDetailResolverService implements Resolve<Article> {

  constructor(private articlesService: ArticlesService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> | Promise<Article> | Article {
    const id = route.paramMap.get('id');
    return this.articlesService.getUserById(id).pipe(
      take(1),
      mergeMap(article => {
        if (article) {
          return of(article);
        } else {
          this.router.navigate(['../']);
          return EMPTY;
        }
      })
    );
  }
}
