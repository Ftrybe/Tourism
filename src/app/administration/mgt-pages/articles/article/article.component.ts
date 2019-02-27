import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ArticlesService} from '../../../../core/services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  form: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  file: any = '';

  constructor(private fb: FormBuilder, private articlesService: ArticlesService) {
    this.form = this.fb.group({
      id: null,
      title: null,
      coverUrl: null,
      name: null,
      businessHours: null,
      cost: null,
      address: null,
      contact: null,
      topic: null,
      declaration: null
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
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

  ngOnInit() {

  }

  submit() {
    this.form.get('coverUrl').setValue(this.croppedImage);
    this.articlesService.addArticle(this.form.value).subscribe(
      data => console.log(data)
  );
  }
}
