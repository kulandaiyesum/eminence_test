export class Exam {
  studentId: string;
  questionId: string;
  selectedAnswer: string = ''; // A or b or C or D or E
  selectedAnswerId?: string = '';
  isCorrectAnswer: string = 'NO'; // "NO" or "YES"
  flag: string = 'NO'; // "NO" or "YES"
  createdBy: string;
}

export class indexBasedQuestionType {
  _id: string;
  reqId: string;
  options: ExamTutorOption[];
  title: string; //
  status?: string; // VREVIEWED
  isEdited: boolean;
  isDeleted: boolean;
  createdAt?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  coreQuestionId?: string;
  subSystemId: string;
  subjectId: string;
  systemId: string;
}
export class ExamTutorOption {
  _id: string;
  text: string;
  correctAnswer: string;
  explanation: string | null;
  createdAt?: string;
  isDeleted: boolean;
  status: number;
}
