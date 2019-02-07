import {Injectable} from '@angular/core';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {EmptyOverlayComponentRef} from './empty-overlay-component-ref';
import {ComponentPortal} from '@angular/cdk/portal';
import {OverlayComponent} from '../../../common/overlay/overlay.component';
import {NavbarComponent} from '../../../common/navbar/navbar.component';

interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
};

@Injectable({
  providedIn: 'root'
})
export class EmptyOverlayComponentService {

  constructor(
    private overlay: Overlay) {
  }

  open(config: FilePreviewDialogConfig = {}) {
    // Override default configuration
    const dialogConfig = {...DEFAULT_CONFIG, ...config};

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
     const dialogRef = new EmptyOverlayComponentRef(overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(OverlayComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);

     overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
