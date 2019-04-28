import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../../../core/services/window.service';
import {NoteService} from '../../../core/services/note.service';
import {ActivatedRoute} from '@angular/router';
import {Note} from '../../../core/models/note';
import {NoteCollectionService} from '../../../core/services/note-collection.service';
import {NotePraiseService} from '../../../core/services/note-praise.service';
import {debounce} from '../../../core/directive/debounce';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit, OnDestroy, AfterViewInit {
  // 目录节点
  @ViewChild('catalogWarp') catalogElement: ElementRef;
  // 目录节点的容器
  @ViewChild('warp') warp: ElementRef;
  // 滚动监听句柄
  public handle;
  public note: Note;
  public isOpen: boolean;
  public catalogs: any;
  public isCollection: boolean;
  public isPraise: boolean;

  constructor(private render: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              @Inject(WINDOW) private window: Window,
              private collectionService: NoteCollectionService,
              private praiseService: NotePraiseService,
              private noteService: NoteService,
              private route: ActivatedRoute,
              private changeRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.initData();
    this.changeCatalogModel();
    this.getSelfCollectionState(this.note.id);
    this.getSelfPraiseState(this.note.id);
  }

  initData() {
    this.route.data.subscribe(
      (data: { note: Note }) => {
        console.log(data);
        this.note = data[0];
      }
    );
    this.getCollectionCount(this.note.id);
    this.getPraiseCount(this.note.id);
  }

  changeCatalogModel() {
    this.isOpen = false;
    this.handle = this.window.addEventListener('scroll', () => {
      this.document.documentElement.scrollTop > 570 ?
        this.render.addClass(this.catalogElement.nativeElement, 'action') :
        this.render.removeClass(this.catalogElement.nativeElement, 'action');
    });
  }

  // 目录切换
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  ngAfterViewInit(): void {
    this.setAnchor();
    this.changeRef.detectChanges();
  }

  @debounce(300)
  praise(id) {
    this.praiseService.praise(id).subscribe(
      data => {
        this.getSelfPraiseState(id);
        this.getPraiseCount(id);
      }
    );
  }

  collection(id) {
    this.collectionService.collection(id).subscribe(
      data => {
        this.getCollectionCount(id);
        this.getSelfCollectionState(id);
      }
    );
  }

  setAnchor() {
    this.catalogs = Array.from(this.document.querySelectorAll('.note-body .content h2'));
    console.log(this.catalogs);
    for (const catalogsKey in this.catalogs) {
      this.render.setAttribute((this.catalogs[catalogsKey] as Element), 'id', catalogsKey);
      this.render.addClass((this.catalogs[catalogsKey] as Element), 'anchor');
    }
  }

  getAnchor(id) {
    this.window.location.hash = '';
    this.window.location.hash = id;
  }

  getSelfPraiseState(noteId) {
    this.praiseService.queryPraise(noteId).subscribe(
      isPraise => {
        this.isPraise = isPraise;
      }
    );
  }


  getPraiseCount(noteId) {
    this.praiseService.count(noteId).subscribe(
      count => {
        this.note.praiseCount = count as number;
      }
    );
  }

  getCollectionCount(noteId) {
    this.collectionService.count(noteId).subscribe(
      count => {
        this.note.collectionCount = count as number;
      }
    );
  }

  getSelfCollectionState(noteId) {
    this.collectionService.queryCollection(noteId).subscribe(
      isCollection => {
        this.isCollection = isCollection;
      }
    );
  }

  ngOnDestroy(): void {
    // 销毁混动监听
    this.window.removeEventListener('scroll', this.handle, false);
  }

}
