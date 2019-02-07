import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {debounce} from '../../core/directive/debounce';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, AfterViewInit {
  // 辣鸡代码！
  @ViewChild('warp')
  warp: ElementRef;
  isCanGetData: boolean = true;
  public oWrap;
  public array;
  mt = 10;
  ml = 10;
  ch;

  constructor(private render: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
  }

  @HostListener('window:resize')
  @debounce(100)
  public onWindowResize(): void {
    this.sortNode();
  }

  public sortNode() {
    const oWrap = this.oWrap;
    // 整个画面宽度
    const oAllWidth = oWrap.offsetWidth;
    const oDiv = oWrap.children;
    // 每张图片宽度
    const oPerWidth = oDiv[0].offsetWidth;
    // 图片的margin-top和margin-left值

    // 求第一行所能容纳的列数
    const cols = Math.floor(oAllWidth / (oPerWidth + this.ml));
    // 第一行排列
    const arr = [];
    for (let i = 0; i < cols; i++) {
      this.render.setStyle(oDiv[i], 'top', '0');
      // oDiv[i].style.top = 0;
      this.render.setStyle(oDiv[i], 'left', i * (oPerWidth + this.ml) + 'px');
      // 将第一行每列的高度值存到数组中
      arr.push(oDiv[i].offsetHeight);
    }
    // 排剩下的图片
    // comPos(cols);
    this.comPos(cols, oDiv, arr);
    oWrap.style.height = arr[this.maxIndex(arr)] + 'px';
    this.array = arr;
    this.ch = document.documentElement.clientHeight;
  }

  @HostListener('window:scroll')
  @debounce()
  public onWindowScroll(): void {
    if (this.isCanGetData) {
      const arr = this.array;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (arr[this.minIndex(arr)] < this.ch + scrollTop) {
        const str = '';
        // this.render.appendChild(this.oWrap, '<div class="text"></div>');
        console.log('data.data');
        this.oWrap.innerHTML += str;
        // 从div最末尾添加图片
      }
      this.isCanGetData = false;
    }
  }

  ngOnInit() {
    this.oWrap = this.warp.nativeElement;
  }

  minIndex(array): number {
    const minValue = Math.min.apply(null, array);
    return array.indexOf(minValue);
  }

  maxIndex(array): number {
    const minValue = Math.max.apply(null, array);
    return array.indexOf(minValue);
  }

  comPos(startWay, oDiv, arr) {
    // const arr = this.array;
    for (let i = startWay; i < oDiv.length; i++) {
      oDiv[i].style.top = arr[this.minIndex(arr)] + this.mt + 'px';
      oDiv[i].style.left = oDiv[this.minIndex(arr)].style.left;
      // 更新数组中各列高度
      arr[this.minIndex(arr)] += oDiv[i].offsetHeight + this.mt;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.sortNode(), 50);
  }
}
