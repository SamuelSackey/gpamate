import CourseItem from "./CourseItem";

interface List {
  list: CourseItem[];
  gpa: number;
  load(): void;
  save(): void;
  calculate(): void;
  clearList(): void;
  addItem(itemObj: CourseItem): void;
  removeItem(id: string): void;
}

export default class CourseList implements List {
  static instance: CourseList = new CourseList();

  private constructor(
    private _list: CourseItem[] = [],
    private _gpa: number = 0
  ) {}

  get list(): CourseItem[] {
    return this._list;
  }

  get gpa(): number {
    return this._gpa;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("courseList");
    if (typeof storedList !== "string") return; // to stop is no list is stored

    const parsedList: CourseItem[] = JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newCourseItem = new CourseItem(
        itemObj.id,
        itemObj.name,
        itemObj.credits,
        itemObj.grade
      );
      CourseList.instance.addItem(newCourseItem);
    });
  }

  save(): void {
    localStorage.setItem("courseList", JSON.stringify(this._list));
  }

  calculate(): void {
    this._gpa = 4.0;
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: CourseItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id != id);
    this.save();
  }
}
