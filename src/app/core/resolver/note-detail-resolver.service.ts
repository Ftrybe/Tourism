import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {flatMap, mergeMap, take} from 'rxjs/operators';
import {Note} from '../models/note';
import {NoteService} from '../services/note.service';

@Injectable({
  providedIn: 'root'
})
export class NoteDetailResolverService implements Resolve<Note> {

  constructor(private noteService: NoteService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note> | Promise<Note> | Note {
    let id = route.paramMap.get('id');
    return this.noteService.getNote(id).pipe(
      take(1),
      mergeMap(note => {
        if (note) {
          return of(note);
        } else {
          this.router.navigate(['../']);
          return EMPTY;
        }
      })
    );
  }
}
