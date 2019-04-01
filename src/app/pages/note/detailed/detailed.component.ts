import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../../../core/services/window.service';
import {NoteService} from '../../../core/services/note.service';
import {ActivatedRoute} from '@angular/router';
import {Note} from '../../../core/models/note';
import {NoteCollectionService} from '../../../core/services/note-collection.service';
import {NotePraiseService} from '../../../core/services/note-praise.service';
import {logger} from 'codelyzer/util/logger';

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

  constructor(private render: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              @Inject(WINDOW) private window: Window,
              private collectionService: NoteCollectionService,
              private praiseService: NotePraiseService,
              private noteService: NoteService,
              private route: ActivatedRoute,
              private changeRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { note: Note }) => {
        this.note = data[0];
      }
    );
    this.isOpen = false;
    this.handle = this.window.addEventListener('scroll', () => {
      this.document.documentElement.scrollTop > 570 ?
        this.render.addClass(this.catalogElement.nativeElement, 'action') :
        this.render.removeClass(this.catalogElement.nativeElement, 'action');
    });

  }

  ngOnDestroy(): void {
    // 销毁混动监听
    this.window.removeEventListener('scroll', this.handle, false);
  }

  // 目录切换
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  setAnchor() {
    this.catalogs = Array.from(this.document.querySelectorAll('.content h1'));
    for (const catalogsKey in this.catalogs) {
      this.render.setAttribute((this.catalogs[catalogsKey] as Element), 'id', catalogsKey);
    }
  }

  getAnchor(id) {
    this.window.location.hash = '';
    this.window.location.hash = id;
  }

  ngAfterViewInit(): void {
    this.setAnchor();
    this.changeRef.detectChanges();
  }

  praise() {

  }

  collection() {

  }
}
