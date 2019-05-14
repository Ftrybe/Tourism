import {Component, forwardRef, Inject, Input, OnInit, Output} from '@angular/core';
import {FileHolder} from 'angular2-image-upload';
import {AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NoteService} from '../../core/services/note.service';
import {DOCUMENT} from '@angular/common';
import {QuillUploadImageInterface} from '../../core/interface/quill-upload-image.interface';


@Component({
  selector: 'app-custom-quill-editor',
  templateUrl: './custom-quill-editor.component.html',
  styleUrls: ['./custom-quill-editor.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomQuillEditorComponent), multi: true}
  ]
})
export class CustomQuillEditorComponent implements OnInit, ControlValueAccessor {

  res_image_url: any;
  // 富文本编辑器配置，添加自定义事件
  quillEditorRef: any;

  @Input() quillService: QuillUploadImageInterface;
  data: any;
  formModel: FormGroup;
  propagateChange: any = () => { };

  // 上传按钮
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder) {
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

  contentChange(event: { content: any; delta: any; editor: any; html: string | null; oldDelta: any; source: string; text: string }) {
   this.propagateChange(event.html);
  }


  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }

  registerOnTouched(fn: any): void {

  }


  writeValue(value: any): void {
    this.formModel.get('content').setValue(value);
  }
}
