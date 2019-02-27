import {Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {WINDOW} from '../../core/services/window.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  constructor(private  renderer: Renderer2, @Inject(WINDOW) private window: Window, @Inject(DOCUMENT) private document: Document) {
  }

  // 页面大小改变设置
  setPageChangeSize() {
    const sections = this.document.getElementsByClassName('section');
    for (let i = 0; i < sections.length; i++) {
      const section: Element = sections.item(i);
      section.setAttribute('style', 'height:' + window.innerHeight / 4 * 3 + 'px');
    }
  }

  ngOnInit() {
    this.setPageChangeSize();
    fromEvent(window, 'resize').pipe(debounceTime(100)).subscribe(() => {
      this.setPageChangeSize();
    });

  }

  getAnchor(id) {
    this.window.location.hash = '';
    this.window.location.hash = id;
  }
}
