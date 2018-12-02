import { Component, OnInit, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isClick: boolean;

  @ViewChild('navbarCollapse') navbCollapse: ElementRef;
  constructor(
    private renderer: Renderer2
  ) { }


  ngOnInit() {
  }

  // 侧滑菜单
  toggleMenu() {
    this.isClick = !this.isClick;
    if (this.isClick) {
      this.renderer.addClass(this.navbCollapse.nativeElement, 'show');

      // 点击关闭侧滑
      this.renderer.listen(this.navbCollapse.nativeElement, 'click', () => {
        this.renderer.removeClass(this.navbCollapse.nativeElement, 'show');
        this.isClick = false;
      });
    } else {
      this.renderer.removeClass(this.navbCollapse.nativeElement, 'show');
    }
  }

}
