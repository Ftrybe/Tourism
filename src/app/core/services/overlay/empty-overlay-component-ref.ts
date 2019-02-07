import {OverlayRef} from '@angular/cdk/overlay';

export class EmptyOverlayComponentRef {
  constructor(private overlayRef: OverlayRef) {
  }

  public component;

  close(): void {
    this.overlayRef.dispose();
  }
}
