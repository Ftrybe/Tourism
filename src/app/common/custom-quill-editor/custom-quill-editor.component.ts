import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {FileHolder} from 'angular2-image-upload';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NoteService} from '../../core/services/note.service';
import {DOCUMENT} from '@angular/common';
import {QuillUploadImageInterface} from '../../core/interface/quill-upload-image.interface';


@Component({
  selector: 'app-custom-quill-editor',
  templateUrl: './custom-quill-editor.component.html',
  styleUrls: ['./custom-quill-editor.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: CustomQuillEditorComponent, multi: true}
  ]
})
export class CustomQuillEditorComponent implements OnInit, ControlValueAccessor {

  res_image_url: any;
  // 富文本编辑器配置，添加自定义事件
  quillEditorRef: any;
  formModel: FormGroup;
  @Input() quillService: QuillUploadImageInterface;

  // 上传按钮
  constructor(private fb: FormBuilder,
              private noteService: NoteService,
              @Inject(DOCUMENT) private document: Document) {
    this.formModel = fb.group({
      content: []
    });
  }

  ngOnInit() {
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
    this.quillService.uploadImage(file.src).subscribe(
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
    this.quillEditorRef.insertEmbed(length, 'image', `${url}`);
    this.quillEditorRef.setSelection(length + 1);
  }

  contentChange($event: { content: any; delta: any; editor: any; html: string | null; oldDelta: any; source: string; text: string }) {
    this.formModel.get('content').setValue($event.html);
  }

  registerOnChange(fn: any): void {
    console.log('registerOnChange' + fn);

  }

  registerOnTouched(fn: any): void {
    console.log('registerOnChange' + fn);

  }

  setDisabledState(isDisabled: boolean): void {
    console.log('registerOnChange' + isDisabled);

  }

  writeValue(obj: any): void {
    if (obj) {
      this.formModel.setValue(obj);
    }
  }
}
