import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {debounce} from '../../core/directive/debounce';
import {NoteService} from '../../core/services/note.service';
import {Note} from '../../core/models/note';

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
  public notes: Note[];
  public oWrap;
  public array;
  currPage = 1;
  mt = 10;
  ml = 10;
  ch;

  constructor(private render: Renderer2, private changeDetectorRef: ChangeDetectorRef,
              private noteService: NoteService) {
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
    const d = document.querySelectorAll('.note-card');
    // 每张图片宽度
    const oPerWidth = (d.item(0) as HTMLElement).offsetWidth;
    // 图片的margin-top和margin-left值

    // 求第一行所能容纳的列数
    const cols = Math.floor(oAllWidth / (oPerWidth + this.ml));
    // 第一行排列
    const arr = [];
    for (let i = 0; i < cols; i++) {
      this.render.setStyle(d.item(i), 'top', '0');
      // oDiv[i].style.top = 0;
      this.render.setStyle(d.item(i), 'left', i * (oPerWidth + this.ml) + 'px');
      // 将第一行每列的高度值存到数组中
      arr.push((d.item(i) as HTMLElement).offsetHeight);
    }
    // 排剩下的图片
    // comPos(cols);
    this.comPos(cols, d, arr);
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
        // this.render.appendChild(this.oWrap, '<div class="text">111111</div>');
        this.oWrap.innerHTML += str;
        // 从div最末尾添加图片
      }
      this.isCanGetData = false;
    }
  }

  ngOnInit() {
    this.oWrap = this.warp.nativeElement;
     this.noteService.getList(this.currPage).subscribe(
      data => {
         this.array = data;
         this.notes = data;
      }
    );
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
    setTimeout(() => this.sortNode(), 400);
  }
}
