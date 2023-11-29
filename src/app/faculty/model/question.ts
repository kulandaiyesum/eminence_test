export class Question {
  _id: string;
  reqId: string;
  options: QgenOption[];
  title: string;
  status: string;
  isEdited: boolean;
  isDeleted: boolean;
  createdAt?: string;
  coreQuestionId?: string;
}
export class QgenOption {
  _id: string;
  text: string;
  correctAnswer: string; // 'false' or 'true'
  explanation: string | null;
  createdAt?: string;
  coreOptionId?: string;
  isDeleted: boolean;
  status: number; // ex. 1
}

export class TempQuestion {
  index: number;
  question: Question;
}
