import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Article} from '../../../../core/models/article';
import {Topic} from '../../../../core/models/topic';
import {ArticlesService} from '../../../../core/services/articles.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {DOCUMENT} from '@angular/common';
import {ImageCropperDialogComponent} from '../../../../dialog/image-cropper-dialog/image-cropper-dialog.component';
import {FileHolder} from 'angular2-image-upload';
import {Food} from '../../../../core/models/food';
import {FoodService} from '../../../../core/services/food.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  form: FormGroup;
  croppedImage: any = '';
  file: any = '';
  oldCoverImage: string = './assets/img/upload_bg.png';
  food: Food;
  // 上传返回的图片路径
  res_image_url: any;
  // 富文本编辑器配置，添加自定义事件
  quillEditorRef: any;

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document) {
    this.form = this.fb.group({
      id: null,
      title: null,
      coverUrl: null,
      name: null,
      cost: null,
      address: null,
      declaration: null,
      state: null,
      content: null
    });
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        if (data[0]) {
          this.form.patchValue(data[0]);
          this.food = data[0];
          this.oldCoverImage = data[0].coverUrl;
        }
      }
    );
  }

  submit() {
    const food: Food = this.form.value as Food;
    console.log(food.id);
    if (food.id) {
      this.croppedImage.length > 1 ?
        food.coverUrl = this.croppedImage : food.coverUrl = this.oldCoverImage;
      this.foodService.update(food).subscribe(
        data => {
          this.router.navigate(['/manager/food']);
        }
      );
    } else {
      food.coverUrl = this.croppedImage;
      this.foodService.add(food).subscribe(
        data => {
          this.router.navigate(['/manager/food']);
        }
      );
    }
  }

  openCropperDialog() {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '900px',
      data: {
        title: '封面上传',
        resizeToWidth: 1920,
        cropperMinWidth: 1080,
        aspectRatio: 16 / 9,
        maintainAspectRatio: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.oldCoverImage = result;
      this.croppedImage = result;
    });
  }

}
