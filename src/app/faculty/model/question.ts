export class Question {
  _id: string;
  reqId: string;
  userId?: string; // need to ask
  options: QgenOption[];
  title: string;
  status?: number;
  isEdited: boolean;
  isDeleted: boolean;
  createdBy?: string;
  modifiedBy?: string;
  createdAt?: string;
  modifiedAt?: string;
  coreQuestionId?: string;
}
export class QgenOption {
  _id: string;
  text: string;
  correctAnswer: string;
  explanation: string;
  createdBy?: string;
  modifiedBy?: string;
  createdAt?: string;
  modifiedAt?: string;
  coreOptionId?: string;
}

export class TempQuestion {
  index: number;
  question: Question;
}
