import {Component, Inject, OnInit} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Banner} from '../banner';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BannerService} from '../banner.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Topic} from '../topic';


@Component({
  selector: 'app-banner-dialog',
  templateUrl: './banner-dialog.component.html',
  styleUrls: ['./banner-dialog.component.scss']
})
export class BannerDialogComponent implements OnInit {
  public form: FormGroup;
  imageChangedEvent: any = '';
  checked: boolean = false;
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
      // switch (this.banner.topic) {
      //   case 'HOME':
      //     this.form.get('topic').setValue('0');
      //     break;
      //   case 'FOOD':
      //     this.form.get('topic').setValue('1');
      //     break;
      //   case 'SCENERY':
      //     this.form.get('topic').setValue('2');
      //     break;
      // }
    } else {
      this.banner = new Banner();
      this.isNew = true;
    }
  }

  fileChangeEvent(event: any): void {
    this.form.get('topic').value === 0 ? this.aspectRatio = 16 / 9 : this.aspectRatio = 4;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.file = event.file;
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  submit() {
    const rbanner: Banner = new Banner();
    rbanner.title = this.form.get('title').value;
    rbanner.subtitle = this.form.get('subtitle').value;
    rbanner.topic = this.form.get('topic').value;
    // this.bannerService.add(this.form.value).pipe(
    this.bannerService.add(this.file, rbanner).pipe(
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
    const rbanner: Banner = new Banner();
    rbanner.title = this.form.get('title').value;
    rbanner.subtitle = this.form.get('subtitle').value;
    rbanner.topic = this.form.get('topic').value;
    console.log(rbanner.topic);
    rbanner.id = this.banner.id;
    if (this.file) {
      this.bannerService.updateFile(this.file, rbanner).subscribe(
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
    } else {
      this.bannerService.update(rbanner).subscribe(
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
}
