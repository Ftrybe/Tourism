import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ConfirmRequestDialogComponent} from '../../dialog/confirm-request-dialog/confirm-request-dialog.component';
import {SignComponent} from '../../dialog/sign';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public dialog: MatDialog) {
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    if (err.status === 401 || err.status === 403) {
      const dialogRef = this.dialog.open(ConfirmRequestDialogComponent, {
        data: '你没有操作权限，请先登录'
      });
      dialogRef.afterClosed().subscribe(
        i => {
          if (i) {
            this.dialog.open(SignComponent, {
              id: 'signDialog'
            });
          }
        }
      );
      return of(err.message);
    }
    return Observable.throw(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => this.handleAuthError(err)));
  }
}
