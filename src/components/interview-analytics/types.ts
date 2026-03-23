export interface Attempt {
  id: string;
  score: number;
  date: string;
  skills: {
    communication: number;
    technicalKnowledge: number;
    problemSolving: number;
    confidence: number;
    clarity: number;
  };
}
