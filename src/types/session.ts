export type Session = {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  roomId: string;
  capacity: number;
  speakerIds: string[]
  questionIds: string[]
}