import {Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../../../core/services/window.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit, OnDestroy {

  @ViewChild('catalog') catalogElement: ElementRef;

  public handle;

  constructor(private render: Renderer2, @Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) {
  }

  ngOnInit() {
    this.handle = this.window.addEventListener('scroll', () => {
      this.document.documentElement.scrollTop > 440 ?
        this.render.addClass(this.catalogElement.nativeElement, 'action') :
        this.render.removeClass(this.catalogElement.nativeElement, 'action');
    });
  }

  ngOnDestroy(): void {
    this.window.removeEventListener('scroll', this.handle, false);
  }

}
