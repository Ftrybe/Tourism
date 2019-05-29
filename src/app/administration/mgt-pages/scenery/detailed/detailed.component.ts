import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {DOCUMENT} from '@angular/common';
import {ImageCropperDialogComponent} from '../../../../dialog/image-cropper-dialog/image-cropper-dialog.component';
import {Scenery} from '../../../../core/models/scenery';
import {SceneryService} from '../../../../core/services/scenery.service';

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
  scenery: Scenery;

  constructor(
    private fb: FormBuilder,
    public sceneryService: SceneryService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document) {
    this.form = this.fb.group({
      id: null,
      title: null,
      coverUrl: null,
      name: null,
      businessHours: null,
      cost: null,
      address: null,
      contact: null,
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
          this.scenery = data[0];
          this.oldCoverImage = data[0].coverUrl;
        }
      }
    );
  }

  submit() {
    const scenery: Scenery = this.form.value as Scenery;
    if (scenery.id) {
      this.croppedImage.length > 1 ?
        scenery.coverUrl = this.croppedImage : scenery.coverUrl = this.oldCoverImage;
      this.sceneryService.update(scenery).subscribe(
        data => {
          this.router.navigate(['/manager/scenery']);
        }
      );
    } else {
      scenery.coverUrl = this.croppedImage;
      this.sceneryService.add(scenery).subscribe(
        data => {
          this.router.navigate(['/manager/scenery']);
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
