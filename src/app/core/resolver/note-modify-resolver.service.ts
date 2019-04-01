import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../models/user';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {Note} from '../models/note';
import {NoteService} from '../services/note.service';
import {UsersService} from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class NoteModifyResolverService implements Resolve<Note> {

  constructor(private noteService: NoteService, private router: Router, private userService: UsersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note> | Promise<Note> | Note {
    let id = route.paramMap.get('id');
    return this.noteService.getNote(id).pipe(
      catchError(
        err => {
          this.router.navigate(['../']);
          return EMPTY;
        }
      ),
      take(1),
      mergeMap(note => {
        if (note) {
          if (this.userService.getUserId() === note.userId) {
            return of(note);
          } else {
            this.router.navigate(['../']);
            return EMPTY;
          }
        } else {
          this.router.navigate(['../']);
          return EMPTY;
        }
      })
    );
  }
}
