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
  old_iamge: any;
  // coverUrl: any;
  // 上传返回的图片路径
  res_image_url: any;
  // 富文本编辑器配置，添加自定义事件
  quillEditorRef: any;
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
      content: [null, Validators.required],
      declaration: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        if (data[0]) {
          this.formModel.patchValue(data[0]);
          this.cover_image_base64 = data[0].coverUrl;
          this.old_iamge = this.cover_image_base64;
        }
      }
    );
    this.userService.getSelf().subscribe(
      data => {
        this.user = data;
      }
    );
  }

  // 先判断基本内容是否填写完整，完整则可以点击发表，并且弹出添加简介，简介写完后可以进行提交
  public publish() {
    // 增加
    if (this.cover_image_base64) {
      this.formModel.get('coverUrl').setValue(this.cover_image_base64);
    }
    this.openDeclareDialog();
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
    const length = this.quillEditorRef.getSelection().index;
    const delta = this.quillEditorRef.insertEmbed(length, 'image', `${url}`);
    this.quillEditorRef.setSelection(length + 1);
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
      if (result) {
        this.cover_image_base64 = result;
        return;
      }
      this.cover_image_base64 = this.old_iamge;
    });
  }

  openDeclareDialog() {
    console.log(this.formModel.get('content').value);
/*    const dialogRef = this.dialog.open(NoteDeclarationDialogComponent, {
      width: '800px',
      data: this.formModel.get('declaration').value
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.formModel.get('declaration').setValue(data);
          this.formModel.get('content').setValue(this.document.querySelector('.ql-editor').innerHTML);
          if (this.formModel.valid) {
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
      }
    );*/
  }

  aaa(event: { editor: any; oldRange: Range | null; range: Range | null; source: string | null; html: string }) {
    console.log(event.editor);
    console.log(event.html);
  }
}
