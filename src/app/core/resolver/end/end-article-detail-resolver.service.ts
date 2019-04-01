import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Article} from '../../models/article';
import {EMPTY, Observable, of} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';
import {ArticlesService} from '../../services/articles.service';

@Injectable({
  providedIn: 'root'
})
export class EndArticleDetailResolverService implements Resolve<Article> {

  constructor(private router: Router, private articlesService: ArticlesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> | Promise<Article> | Article {
    let id = route.paramMap.get('id');
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
