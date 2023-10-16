import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  ChangeDetectorRef,
} from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-build-test',
  templateUrl: './build-test.component.html',
  styleUrls: ['./build-test.component.scss'],
})
export class BuildTestComponent {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('scrollExplanationContainer')
  scrollExplanationContainer: ElementRef;
  @ViewChildren(MatCheckbox) checkboxes: QueryList<MatCheckbox>;
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const scrollbar = Scrollbar.init(this.scrollContainer.nativeElement, {
      // Smooth Scrollbar options go here
    });
    const scrollbars = Scrollbar.init(
      this.scrollExplanationContainer.nativeElement,
      {
        // Smooth Scrollbar options go here
      }
    );
  }

  selectAll(event: any): void {
    const isChecked = event.checked;

    if (isChecked) {
      // If "All" checkbox is checked, select all other checkboxes
      this.checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    } else {
      // If "All" checkbox is unchecked, unselect all other checkboxes
      this.checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }

    // Manually trigger change detection to update the checkboxes
    this.cdr.detectChanges();
  }
}
