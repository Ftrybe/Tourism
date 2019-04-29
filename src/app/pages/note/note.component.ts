import {ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {debounce} from '../../core/directive/debounce';
import {NoteService} from '../../core/services/note.service';
import {Note} from '../../core/models/note';
import {AjaxResponse} from '../../core/models/ajax-response';
import {PageHelper} from '../../core/models/page-helper';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  // 辣鸡代码！
  @ViewChild('warp')
  warp: ElementRef;
  public notes: Note[] = [];
  public oWrap;
  pageNum: number = 1;
  hasNextPage: boolean;

  constructor(private render: Renderer2, private changeDetectorRef: ChangeDetectorRef,
              private noteService: NoteService) {
  }

  @HostListener('window:scroll')
  @debounce(200)
  public onWindowScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // Load Your Data Here
      this.getList(this.pageNum + 1);
    }
  }

  ngOnInit() {
    this.oWrap = this.warp.nativeElement;
    this.getList(1);
  }

  getList(page) {
    this.noteService.getList(page).subscribe(
      (data: AjaxResponse<PageHelper<Note>>) => {
        data.data.list.forEach(value => this.notes.push(value));
        this.pageNum = data.data.pageNum;
        this.hasNextPage = data.data.hasNextPage;
      }
    );
  }

  search(note: Note[]) {
    this.notes = note;
  }
}
