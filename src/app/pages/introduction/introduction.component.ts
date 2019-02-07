import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  constructor(private  renderer: Renderer2) { }
  // 页面大小改变设置
  setPageChangeSize() {
     const sections = document.getElementsByClassName('section');
    for (let i = 0; i < sections.length; i++ ) {
      const section:  Element = sections.item(i);
      section.setAttribute( 'style', 'height:' +  window.innerHeight / 4 * 3 + 'px');
    }
  }
  ngOnInit() {
    this.setPageChangeSize();
    fromEvent(window, 'resize').pipe(debounceTime(100)).subscribe(() => {
      this.setPageChangeSize();
    });

  }
}
