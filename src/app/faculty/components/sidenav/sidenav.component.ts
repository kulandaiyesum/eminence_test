import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  opened = true;
  selectedIndex: number | null = 0;
  public component = 'qgen';
  constructor() {}
  ngOnInit(): void {}
  changeBackgroundColor(index: number): void {
    this.selectedIndex = index;
  }
  qgen() {
    this.component = 'qgen';
  }
  editor() {
    this.component = 'editor';
  }
  askeminence() {
    this.component = 'askeminence';
  }

  history() {
    this.component = 'history';
  }
}
