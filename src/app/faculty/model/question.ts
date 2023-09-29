export class Question {
  id: string;
  options: QgenOption[];
  title: string;
}
export class QgenOption {
  id: string;
  text: string;
  correct_answer: boolean;
  explanation: string;
}

export class TempQuestion {
  index: number;
  question: Question;
}
