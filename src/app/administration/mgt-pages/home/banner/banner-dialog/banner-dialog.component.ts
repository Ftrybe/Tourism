import {Component, Inject, OnInit} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Banner} from '../../../../../core/models/banner';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BannerService} from '../../../../../core/services/banner.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';


@Component({
  selector: 'app-banner-dialog',
  templateUrl: './banner-dialog.component.html',
  styleUrls: ['./banner-dialog.component.scss'],
})
export class BannerDialogComponent implements OnInit {
  // 表单
  public form: FormGroup;
  imageChangedEvent: any = '';
  checked: boolean = false;
  // 获得图片nase64编码
  croppedImage: any = '';
  // banner: Banner;
  file;
  isNew: boolean;
  aspectRatio = 16 / 9;

  constructor(
    private dialogRef: MatDialogRef<BannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private banner: Banner,
    private fb: FormBuilder,
    private bannerService: BannerService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      id: null,
      title: ['', Validators.required],
      subtitle: [''],
      topic: ['', Validators.required],
      url: null
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.banner) {
      this.isNew = false;
      this.checked = true;
      this.croppedImage = this.banner.url;
      this.form.setValue(this.banner);
    } else {
      this.banner = new Banner();
      this.isNew = true;
    }
  }

  fileChangeEvent(event: any): void {
    this.form.get('topic').value === 'HOME' ? this.aspectRatio = 16 / 9 : this.aspectRatio = 4;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  submit() {
    this.form.get('url').setValue(this.croppedImage);
    this.bannerService.add(this.form.value).pipe(
      catchError(err => {
        this.snackBar.open('添加失败', '关闭', {
          duration: 2000
        });
        return of(false);
      })
    ).subscribe(
      data => {
        if (data) {
          this.snackBar.open('添加成功', '关闭', {
            duration: 2000
          });
          this.onNoClick();
        }
      }
    );
  }

  update() {
    this.croppedImage.length > 1 ? this.form.get('url').setValue(this.croppedImage) : null;
    this.bannerService.update(this.form.value).subscribe(
      data => {
        if (data) {
          this.snackBar.open('更新成功', '关闭', {
            duration: 2000
          });
          this.onNoClick();
        } else {
          this.snackBar.open('更新失败', '关闭', {
            duration: 2000
          });
        }
      }
    );
  }
}
