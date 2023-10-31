export class Qbank {
  _id: string;
  systemId: string;
  subsystemId: string;
  subjectId: string;
  type: number[]; //(0, 1, 2, 3)
  mode: string; //(tutor or timed)
  userId: string;
  questionsCount: number;
}
