import { Component, Input, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @Input() text:string="Texto por defecto"
  @Input() placement:string="top"
  @Input() html:boolean=false
  @Input() width:string="17"
  sanitizer: DomSanitizer = inject(DomSanitizer)


  ngOnInit(): void {
    
  }

  renderizarHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
