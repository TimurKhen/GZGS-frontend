import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ClickEffect]',
})
export class ClickEffect {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() effectColor: string = 'white';
  @Input() effectDuration: string = '0.4s';
  @Input() effectBorderWidth: string = '1px';

  constructor() {
    this.setInitialStyles();
  }

  private setInitialStyles(): void {
    this.renderer.setStyle(this.el.nativeElement, 'border', `${this.effectBorderWidth} solid transparent`);
    this.renderer.setStyle(this.el.nativeElement, 'transition', `all ${this.effectDuration} ease-out`);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'border', `${this.effectBorderWidth} solid ${this.effectColor}`);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, 'border', `${this.effectBorderWidth} solid transparent`);
  }
}
