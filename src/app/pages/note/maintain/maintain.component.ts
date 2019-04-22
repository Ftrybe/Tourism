import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoteService} from '../../../core/services/note.service';
import {DOCUMENT} from '@angular/common';
import {FileHolder} from 'angular2-image-upload';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ImageCropperDialogComponent} from '../../../dialog/image-cropper-dialog/image-cropper-dialog.component';
import {UsersService} from '../../../core/services/users.service';
import {User} from '../../../core/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {Note} from '../../../core/models/note';
import {ConfirmRequestDialogComponent} from '../../../dialog/confirm-request-dialog/confirm-request-dialog.component';
import {NoteDeclarationDialogComponent} from '../note-declaration-dialog/note-declaration-dialog.component';

@Component({
  selector: 'app-maintain',
  templateUrl: './maintain.component.html',
  styleUrls: ['./maintain.component.scss']
})
export class MaintainComponent implements OnInit {
  // 表单组
  formModel: FormGroup;
  // 裁剪返回图片base64编码
  cover_image_base64: any;
  // coverUrl: any;
  // 上传返回的图片路径
  res_image_url: any;
  // 富文本编辑器配置，添加自定义事件
  public quillEditorRef: any;
  user: User;
  note: Note;

  // 上传按钮
  constructor(private fb: FormBuilder,
              private noteService: NoteService,
              @Inject(DOCUMENT) private document: Document,
              private dialog: MatDialog,
              private userService: UsersService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router,
              private changeRef: ChangeDetectorRef) {
    this.formModel = fb.group({
      id: null,
      title: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(50)])],
      coverUrl: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        if (data[0]) {
          this.formModel.patchValue(data[0]);
          this.cover_image_base64 = data[0].coverUrl;
        }
      }
    );
    this.userService.getSelf().subscribe(
      data => {
        this.user = data;
      }
    );
    this.changeRef.detectChanges();
  }

  public publish() {
    // 增加
    if (this.cover_image_base64) {
      this.formModel.get('coverUrl').setValue(this.cover_image_base64);
    }
    if (this.formModel.valid) {
      // 更新
      if (this.formModel.get('id').value) {
        this.updateNote();
      } else {
        // 增加
        this.addNote();
      }
    } else {
      this.snackBar.open('内容不完整，请检查后重新发表', '关闭', {
        duration: 3000
      });
    }

  }

  updateNote() {
    this.noteService.update(this.formModel.value).subscribe(
      data => {
        if (data) {
          this.snackBar.open('更新成功', '关闭', {
            duration: 3000
          });
        }
      }
    );
  }

  addNote() {
    this.noteService.add(this.formModel.value).subscribe(
      data => {
        if (data) {
          this.router.navigate(['/note/modify', data]);
        }
      }
    );
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', () => {
      this.imageHandler();
    });
  }

  imageHandler() {
    const fileUpload: HTMLElement = this.document.querySelector('#upload_image input') as HTMLElement;
    fileUpload.click();
  }

  onUploadFinished(file: FileHolder) {
    this.noteService.uploadImage(file.src).subscribe(
      data => {
        if (data) {
          this.res_image_url = data.image_url;
          this.insertToEditor(this.res_image_url);
        }
      }
    );
  }

  insertToEditor(url: string) {
    const range = this.quillEditorRef.getSelection();
    this.quillEditorRef.insertEmbed(range.index, 'image', `${url}`);
  }

  openCropperDialog() {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '900px',
      data: {
        title: '封面上传',
        resizeToWidth: 1920,
        cropperMinWidth: 1080,
        aspectRatio: 16 / 9,
        maintainAspectRatio: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cover_image_base64 = result;
    });
  }

  openDeclareDialog() {
    const dialogRef = this.dialog.open(NoteDeclarationDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe();
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmRequestDialogComponent, {
      data: '是否添加游记简介'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.openDeclareDialog();
        }
      }
    );
  }
}
