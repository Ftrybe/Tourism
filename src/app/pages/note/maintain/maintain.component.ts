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
import {$e} from 'codelyzer/angular/styles/chars';
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
  old_image: any;
  user: User;
  note: Note;

  // 上传按钮
  constructor(private fb: FormBuilder,
              public noteService: NoteService,
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
      content: ['', Validators.required],
      declaration: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        if (data[0]) {
          this.formModel.patchValue(data[0]);
          this.cover_image_base64 = data[0].coverUrl;
          this.old_image = this.cover_image_base64;
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
          this.router.navigate(['/note/detailed', this.formModel.get('id').value]);
        }
      }
    );
  }

  addNote() {
    this.noteService.add(this.formModel.value).subscribe(
      data => {
        if (data) {
          this.router.navigate(['/note/detailed', data.id]);
        }
      }
    );
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
      this.cover_image_base64 = this.old_image;
    });
  }

  openDeclareDialog() {
    const dialogRef = this.dialog.open(NoteDeclarationDialogComponent, {
      width: '800px',
      data: this.formModel.get('declaration').value
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.formModel.get('declaration').setValue(data);
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
    );
  }

}
