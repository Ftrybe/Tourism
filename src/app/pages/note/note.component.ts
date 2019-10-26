import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { debounce } from '../../core/directive/debounce';
import { AjaxResponse } from '../../core/models/ajax-response';
import { Note } from '../../core/models/note';
import { PageHelper } from '../../core/models/page-helper';
import { NoteService } from '../../core/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  // 辣鸡代码！
  public notes: Note[] = [];
  pageNum: number = 1;
  hasNextPage: boolean;

  constructor(public noteService: NoteService) {
  }

  @HostListener('window:scroll')
  @debounce(400)
  public onWindowScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.getList(this.pageNum + 1);
    }
  }

  ngOnInit() {
    console.log(this.notes);
    //this.getList(1);
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
  show(){
    console.log(this.notes);
  }
}
