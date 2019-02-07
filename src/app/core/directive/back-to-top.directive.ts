import {Directive, ElementRef, Inject, NgZone, OnDestroy, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {debounceTime} from 'rxjs/operators';

@Directive({
  selector: '[appBackToTop]'
})
export class BackToTopDirective implements OnDestroy {
  public element: ElementRef;
  public function: Function;

  constructor(private _Zone: NgZone, @Inject(DOCUMENT) private document: Document,
              private elementRef: ElementRef, private render: Renderer2) {
    this.element = this.elementRef.nativeElement;
    this.function = this.render.listen(this.element, 'click', () => {
      let timer = null;
      cancelAnimationFrame(timer);
      const startTime = +new Date();
      const b = this.document.body.scrollTop || this.document.documentElement.scrollTop;
      // 500ms
      const d = 500;
      const c = b;
      // 防止变更检测
      this._Zone.runOutsideAngular(() => {
        timer = requestAnimationFrame(function func() {
          const t = d - Math.max(0, startTime - (+new Date()) + d);
          document.documentElement.scrollTop = document.body.scrollTop = t * (-c) / d + b;
          timer = requestAnimationFrame(func);
          if (t === d) {
            cancelAnimationFrame(timer);
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.function();
  }

}
