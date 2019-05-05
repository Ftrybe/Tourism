import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {flatMap, mergeMap, take} from 'rxjs/operators';
import {Note} from '../models/note';
import {NoteService} from '../services/note.service';
import {FoodService} from '../services/food.service';
import {Food} from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodDetailResolverService implements Resolve<Food> {

  constructor(private foodService: FoodService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Food> | Promise<Food> | Food {
    let id = route.paramMap.get('id');
    return this.foodService.getById(id).pipe(
      take(1),
      mergeMap(food => {
        if (food) {
          return of(food);
        } else {
          this.router.navigate(['../']);
          return EMPTY;
        }
      })
    );
  }
}
