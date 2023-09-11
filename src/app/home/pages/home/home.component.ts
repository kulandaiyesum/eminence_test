import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  scrollingItems = [
    'University of Kentucky College of Medicine',
    'Geisel School of Medicine',
    'Northwell Health',
    'Mercer University College of Medicine',
    'Stanford University School of Medicine',
    'Kaiser Permanente of Northern California',
    'Ministerio de Salud - Ecuador',
    'Albany Medical College',
    'American University of the Caribbean School of Medicine',
    'Virginia Tech',
    'University of Alabama School of Medicine',
    'San Juan Bautista School of Medicine - Puerto Rico',
    'John A. Burns School of Medicine',
    'Kerkorian School of Medicine at UNLV',
    'Saint James School of Medicine',
    'The Medical College of Georgia',
    'Geisinger Commonwealth School of Medicine',
  ];

  @ViewChild('scrollingContent') scrollingContent!: ElementRef;
  ngAfterViewInit(): void {}
}
