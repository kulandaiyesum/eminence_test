import { Component, Input } from '@angular/core';
import { BannerContent } from '../../models/banner-content';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  @Input() bannerContent!: BannerContent;
  @Input() componentName: string = '';
}
