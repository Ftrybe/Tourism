import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import {NgControl, NgModel} from '@angular/forms';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Directive({
  selector: '[appLetterLengthLimit]'
})
export class LetterLengthLimitDirective implements OnInit {
  @Input() appLetterLengthLimit: number;
  maxLength: number;

  constructor(private elementRef: ElementRef, private render: Renderer2) {
  }

  ngOnInit(): void {
    this.maxLength = this.appLetterLengthLimit;
    this.render.setStyle(this.elementRef.nativeElement, 'overflow', 'hidden');
  }
  @HostListener('input', ['$event.target'])
  onkeyup(target) {
    if (target.value.length > this.maxLength) {
      target.value = target.value.substring(0, this.maxLength);
      return false;
    }
  }
}
