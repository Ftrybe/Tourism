import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Scenery} from '../models/scenery';
import {EMPTY, Observable, of} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';
import {SceneryService} from '../services/scenery.service';

@Injectable({
  providedIn: 'root'
})
export class SceneryDetailResolverService implements Resolve<Scenery> {

  constructor(private sceneryService: SceneryService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Scenery> | Promise<Scenery> | Scenery {
    const id = route.paramMap.get('id');
    return this.sceneryService.getUserById(id).pipe(
      take(1),
      mergeMap(scenery => {
        if (scenery) {
          return of(scenery);
        } else {
          this.router.navigate(['./']);
          return EMPTY;
        }
      })
    );
  }
}
