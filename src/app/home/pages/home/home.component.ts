import { Component } from '@angular/core';
import { BannerContent } from '../../models/banner-content';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
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
      // id: 1,
      contentHead: 'Actionable Intel',
      contentSubHead: 'Cutting-Edge',
      contentParagraph:
        'Our AI system offers personalized performance analysis to students, providing actionable insights for a more effective and focused study experience. Leverage data to drive student success and enhance learning outcomes.',
      contentPara2: 'Coming Soon!',
      isEven: false,
      backgroundColor: 'var(--bg-gray-color)',
      img: '../../../../assets/images/home_banner1.avif',
    },
    {
      // id: 2,
      contentHead: 'Infinite Question Generation',
      contentSubHead: 'QGen',
      contentParagraph:
        'Harness the potential of artificial intelligence with QGen, our automated question generator. Produce unlimited, high-quality, exam-focused questions tailored to the needs of your curriculum, saving time and resources.',
      contentPara2: '',
      isEven: true,
      backgroundColor: '',
      img: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/12009105/990599_938505.png',
    },
    {
      // id: 3,
      contentHead: 'Trustworthy, Accurate Content',
      contentSubHead: 'Dependable',
      contentParagraph:
        'Material is sourced from the most reliable and up to date medical exam prep publishers and vetted by physicians.',
      contentPara2: '',
      isEven: false,
      backgroundColor: 'var(--bg-gray-color)',
      img: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/12009105/764966_630604.png',
    },
    {
      // id: 4,
      contentHead: 'Affordability & Accesibility',
      contentSubHead: 'Cost-effective',
      contentParagraph:
        'Through reduced overheads and AI-driven solutions, we provide high-quality, exam-focused content at a significantly reduced rate. Increase access to quality educational resources and promote equitable education within your institution.',
      contentPara2: 'Coming Soon!',
      isEven: true,
      backgroundColor: '',
      img: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/12009105/134978_374803.png',
    },
  ];

  panelOpenState = false;
}
