import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public isClick: boolean = false;

  @ViewChild('navbarCollapse') navbCollapse: ElementRef;
  @ViewChild('overlay') overlay: ElementRef;
  // 监听方法
  overlayListenFun: Function;
  collapseListenFun: Function;
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.overlayListenFun = this.renderer.listen(this.overlay.nativeElement, 'click', () => {
      this.changeShowState();
      this.isClick = false;
    });
    this.collapseListenFun = this.renderer.listen(this.navbCollapse.nativeElement, 'click', () => {
      this.changeShowState();
      this.isClick = false;
    });
  }

  // 侧滑菜单
  toggleMenu() {
    this.isClick = !this.isClick;
    if (this.isClick) {
      this.changeShowState('show');

    } else {
     this.changeShowState();
    }
  }
  changeShowState(state = 'hidden') {
    switch (state) {
      case 'show':
        this.renderer.addClass(this.navbCollapse.nativeElement, 'show');
        this.renderer.addClass(this.overlay.nativeElement, 'show');
        break;
      case 'hidden':
        this.renderer.removeClass(this.navbCollapse.nativeElement, 'show');
        this.renderer.removeClass(this.overlay.nativeElement, 'show');
        break;
    }
  }

  ngOnDestroy(): void {
    // 移除监听
    this.collapseListenFun();
    this.overlayListenFun();
  }
}
