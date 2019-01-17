import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewRef} from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @ViewChild('warp')
  warp: ElementRef;

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
    const oWrap = this.warp.nativeElement;
    // 整个画面宽度
    const oAllWidth = oWrap.offsetWidth;
    const oDiv = oWrap.children;

    // 每张图片宽度
    const oPerWidth = oDiv[0].offsetWidth;
    // 图片的margin-top和margin-left值
    const mt  = 10;
    const ml  = 10;
    console.log(oPerWidth);
    // 求第一行所能容纳的列数
    const cols = Math.floor(oAllWidth / (oPerWidth + ml));
    // 第一行排列
    const arr = [];
    for (let i = 0; i < cols; i++) {
      oDiv[i].style.top = 0;
      oDiv[i].style.left = i * (oPerWidth + ml) + 'px';
      // 将第一行每列的高度值存到数组中
      arr.push(oDiv[i].offsetHeight);
    }
    // 排剩下的图片
    comPos(cols);

    // 剩下填充的图片定位高度是最短的那一列的高度+margintop值
    // 定位left值是最短那一列的left值
    function comPos(startWay) {
      for (let i = startWay; i < oDiv.length; i++) {
        oDiv[i].style.top = arr[minIndex(arr)] + mt + 'px';
        oDiv[i].style.left = oDiv[minIndex(arr)].style.left;
        // 更新数组中各列高度
        arr[minIndex(arr)] += oDiv[i].offsetHeight + mt;
      }
    }

    // 找最小高度索引
    function minIndex(arr) {
      const minValue = Math.min.apply(null, arr);
      const minIndex = arr.indexOf(minValue);
      return minIndex;
    }

    // 滚动条滚动，不停地插入图片到最短的那一列下方
    const ch = document.documentElement.clientHeight;
/*    window.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (arr[minIndex(arr)] < ch + scrollTop) {
        const str = '';
        console.log('data.data');
        for (const i = 0; i < data.data.length; i++) {
          str += '<div><img src=' + data.data[i].src;
          +'></div>';
          console.log(data.data);
        }
        oWrap.innerHTML += str;
        // 从div最末尾添加图片
        comPos(oDiv.length - data.data.length);
      }
    };*/
  }

}
