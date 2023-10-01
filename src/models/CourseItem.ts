export interface Item {
  id: string;
  name: string;
  credits: string;
  grade: string;
  points: number;
}

const gradeMap: { [key: string]: number } = {
  A: 4.0,
  B: 3.7,
  c: 3,
  D: 1.0,
  F: 0.0,
};

export default class CourseItem implements Item {
  private _points!: number;

  constructor(
    public id: string,
    public name: string,
    public credits: string,
    public grade: string
  ) {}

  get points(): number {
    return this._points;
  }

  set points(grade: string) {
    this._points = gradeMap[grade];
  }
}
