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
  public notes: Note[];
  public oWrap;
  currPage = 1;


  constructor(private render: Renderer2, private changeDetectorRef: ChangeDetectorRef,
              private noteService: NoteService) {
  }

  ngOnInit() {
    this.oWrap = this.warp.nativeElement;
    this.noteService.getList(this.currPage).subscribe(
      data => {
        this.notes = data;
      }
    );
  }

  search(note: Note[]) {
    this.notes = note;
  }
}
