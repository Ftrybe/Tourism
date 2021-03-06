import {OverlayRef} from '@angular/cdk/overlay';
import {FilePreviewOverlayComponent} from './file-preview-overlay.component';
import {Observable, Subject} from 'rxjs';
import {filter, take} from 'rxjs/operators';

export class FilePreviewOverlayRef {

  private _beforeClose = new Subject<void>();
  private _afterClosed = new Subject<void>();

  componentInstance: FilePreviewOverlayComponent;

  constructor(private overlayRef: OverlayRef) {
  }

  close(): void {
    this.componentInstance.animationStateChanged.pipe(
      filter((event: any) => event.phaseName === 'start'),
      take(1)
    ).subscribe(() => {
      this._beforeClose.next();
      this._beforeClose.complete();
      this.overlayRef.detachBackdrop();
    });

    this.componentInstance.animationStateChanged.pipe(
      filter((event: any) => event.phaseName === 'done' && event.toState === 'leave'),
      take(1)
    ).subscribe(() => {
      this.overlayRef.dispose();
      this._afterClosed.next();
      this._afterClosed.complete();

      this.componentInstance = null!;
    });

    this.componentInstance.startExitAnimation();
  }

  afterClosed(): Observable<void> {
    return this._afterClosed.asObservable();
  }

  beforeClose(): Observable<void> {
    return this._beforeClose.asObservable();
  }
}
