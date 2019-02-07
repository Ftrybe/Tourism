import {Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {debounce} from '../core/directive/debounce';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @ViewChild('backToTop') backToTop: ElementRef;
  @ViewChild('main') main: ElementRef;

  constructor(private render: Renderer2,
              @Inject(DOCUMENT) private document: Document) {
  }

  // @debouce 防抖
  @HostListener('window:scroll', [''])
  @debounce()
  public windScrolled() {
    this.scrollEvent();
  }

  public scrollEvent() {
    const target = this.document.documentElement.scrollTop;
    target > 360 ? this.render.setStyle(this.backToTop.nativeElement, 'display', 'flex')
      : this.render.setStyle(this.backToTop.nativeElement, 'display', 'none');
  }

  ngOnInit() {
    this.render.setStyle(this.backToTop.nativeElement, 'display', 'none');
  }
}
