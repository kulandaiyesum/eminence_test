import { Component, ElementRef, ViewChild } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('scrollExplanationContainer') scrollExplanationContainer: ElementRef;
  sampleQuestions: string =
    "A 70-year-old man presents to the clinic with complaints of fatigue, weight loss, and shortness of breath. He also reports that he has been experiencing episodes of dizziness and fainting. On examination, his blood pressure is 110/70 mmHg, pulse is 60 beats per minute, and respiratory rate is 18 breaths per minute. Cardiac auscultation reveals a low-pitched, rumbling diastolic murmur best heard at the apex. His tongue appears enlarged and there is hepatosplenomegaly. His labs show proteinuria and hypoalbuminemia. Which of the following is the most likely cause of this patient's condition?";
  sampleOptions = [
    'A. Deposition of immunoglobulin light chain',
    'B. Deposition of serum amyloid-associated protein',
    'C. Deposition of mutated serum transthyretin',
    'D. Deposition of non-mutated serum transthyretin E. Deposition of beta-amyloid precursor protein',
  ];
  sampleExplanation:string=`This patient's presentation of fatigue, weight loss, shortness of breath, dizziness, fainting, low-pitched, rumbling diastolic murmur, enlarged tongue, hepatosplenomegaly, proteinuria, and hypoalbuminemia is suggestive of systemic amyloidosis.
  The most common form of systemic amyloidosis in the elderly is primary amyloidosis (AL amyloidosis), which is caused by deposition of immunoglobulin light chain (Choice A). This form of amyloidosis is often associated with plasma cell dyscrasias such as multiple myeloma.`


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const scrollbar = Scrollbar.init(this.scrollContainer.nativeElement, {
      // Smooth Scrollbar options go here
    });
    const scrollbars = Scrollbar.init(this.scrollExplanationContainer.nativeElement, {
      // Smooth Scrollbar options go here
    });
  }
}
