export class Question {
  _id: string;
  reqId: string;
  userId: string;
  options: QgenOption[];
  title: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  createdBy?: string;
  modifiedBy?: string;
  createdAt?: string;
  modifiedAt?: string;
}
export class QgenOption {
  id: string;
  text: string;
  correctAnswer: string;
  explanation: string;
}

export class TempQuestion {
  index: number;
  question: Question;
}
