import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {debounce} from '../../core/directive/debounce';
import {NoteService} from '../../core/services/note.service';
import {Note} from '../../core/models/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
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
  @HostListener('window:scroll')
  @debounce()
  public onWindowScroll(): void {
    if (this.isCanGetData) {
      const arr = this.array;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
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
}
