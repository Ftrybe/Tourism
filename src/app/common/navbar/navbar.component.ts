import { Component, OnInit, ComponentFactoryResolver, ElementRef, Injector, ApplicationRef, ComponentRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { SignComponent } from 'src/app/dialog/sign';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public username: String;
  public isLogin: boolean;
  public screenWidth:Number;
  public isClick:boolean;

  component: ComponentRef<SignComponent>;


  @ViewChild("navberCollapse") navbCollapse:ElementRef;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private injector: Injector,
    private appRef: ApplicationRef,
    private authenticationService: AuthenticationService,
    private renderer:Renderer2
  ) {

    this.component = this.componentFactoryResolver
      .resolveComponentFactory(SignComponent)
      .create(this.injector);
    appRef.attachView(this.component.hostView);
  }

  ngOnInit() {
    //用户登录判断/添加拟态框
    this.isLogin = this.authenticationService.isLoggedIn();
    console.log(this.isLogin);
    if (this.isLogin) {
      this.username = this.authenticationService.getUsername();
    } else {
      let  host = document.createElement("div");
      host.appendChild((this.component.hostView as any).rootNodes[0]);
      this.elementRef.nativeElement.appendChild(host);
    }
  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.appRef.detachView(this.component.hostView);
    this.component.destroy();
  }
  //侧滑菜单
  toggleMenu(){
    this.isClick = !this.isClick;
    if(this.isClick){
      this.renderer.setStyle(this.navbCollapse.nativeElement,"transform","translateX(0rem)");
    }else{
      this.renderer.setStyle(this.navbCollapse.nativeElement,"transform","translateX(-12.5rem)");
    }
   
  }
  //退出登录
  logout(){
    this.authenticationService.logout();
    this.isLogin=false;
  }
}
