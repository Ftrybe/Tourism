import {Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../../../core/services/window.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit, OnDestroy {
  // 目录节点
  @ViewChild('catalog') catalogElement: ElementRef;
  // 目录节点的容器
  @ViewChild('warp') warp: ElementRef;
  // 滚动监听句柄
  public handle;

  public isOpen: boolean;

  constructor(private render: Renderer2, @Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) {
  }

  ngOnInit() {
    this.isOpen = false;
    this.handle = this.window.addEventListener('scroll', () => {
      this.document.documentElement.scrollTop > 440 ?
        this.render.addClass(this.catalogElement.nativeElement, 'action') :
        this.render.removeClass(this.catalogElement.nativeElement, 'action');
    });
  }

  ngOnDestroy(): void {
    // 销毁混动监听
    this.window.removeEventListener('scroll', this.handle, false);
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
