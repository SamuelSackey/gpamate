export interface Item {
  id: string;
  name: string;
  credits: string;
  grade: string;
  points: number;
}

const gradeMap: { [key: string]: number } = {
  A: 4,
  "B+": 3.5,
  B: 3,
  "C+": 2.5,
  C: 2,
  "D+": 1.5,
  D: 1,
  E: 0.5,
  F: 0,
};

export default class CourseItem implements Item {
  points!: number;

  constructor(
    public id: string,
    public name: string,
    public credits: string,
    public grade: string
  ) {
    this.points = gradeMap[grade] * parseInt(this.credits);
  }
}
