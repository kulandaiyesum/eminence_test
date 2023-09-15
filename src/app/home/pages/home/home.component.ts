import { Component } from '@angular/core';
import { BannerContent } from '../../models/banner-content';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  componentName: string = 'home';
  scrollingItems: string[] = [
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

  bannerContents: BannerContent[] = [
    {
      contentHead: 'Infinite Question Generation',
      contentSubHead: 'QGen',
      contentParagraph:
        'Unlike with most QBanks, when you run out of questions on a particular topic on our platform, simply build more using QGen!',
      contentPara2: '',
      isEven: true,
      backgroundColor: '',
      img: '../../../../assets/images/home_banner1.avif',
    },
    {
      contentHead: 'Trustworthy, Accurate Content',
      contentSubHead: 'Dependable',
      contentParagraph:
        'Material is sourced from the most reliable and up to date medical exam prep publishers and vetted by physicians.',
      contentPara2: '',
      isEven: false,
      backgroundColor: 'var(--bg-gray-color)',
      img: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/12009105/990599_938505.png',
    },
    {
      contentHead: 'Practice With Friends and Others Online',
      contentSubHead: 'Collaborative',
      contentParagraph:
        'Invite your friends or join a lobby online to practice questions with others in a virtual group exam room',
      contentPara2: 'Coming Soon!',
      isEven: true,
      backgroundColor: '',
      img: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/12009105/764966_630604.png',
    },
    {
      contentHead: 'Actionable Intel',
      contentSubHead: 'Cutting-Edge',
      contentParagraph:
        'Based on your performance analysis, Eminence will offer QGen recommendations to help you generate questions that turn your weaknesses into strengths.',
      contentPara2: 'Coming Soon!',
      isEven: false,
      backgroundColor: 'var(--bg-gray-color)',
      img: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/12009105/134978_374803.png',
    },
  ];

  panelOpenState = false;
}
