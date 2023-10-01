import CourseList from "../models/CourseList";

interface DOMList {
  gpaDisplay: HTMLHeadingElement;
  tbody: HTMLTableSectionElement;
  clear(): void;
  render(CourseList: CourseList): void;
}

export default class ListTemplate implements DOMList {
  gpaDisplay: HTMLHeadingElement;
  tbody: HTMLTableSectionElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.gpaDisplay = document.getElementById(
      "gpaDisplay"
    ) as HTMLHeadingElement;

    this.tbody = document.getElementById(
      "courseList"
    ) as HTMLTableSectionElement;
  }

  clear(): void {
    this.gpaDisplay.textContent = "0.00";
    this.tbody.innerHTML = "";
  }

  render(CourseList: CourseList): void {
    this.clear();

    CourseList.list.forEach((item) => {
      const tr = document.createElement("tr") as HTMLTableRowElement;
      tr.id = item.id;

      const tdCourse = document.createElement("td") as HTMLTableCellElement;
      tdCourse.className = "td-custom";
      tdCourse.textContent = item.name;
      tr.append(tdCourse);

      const tdCredits = document.createElement("td") as HTMLTableCellElement;
      tdCredits.className = "td-custom";
      tdCredits.id = item.id;
      tdCredits.textContent = item.credits;
      tr.append(tdCredits);

      const tdGrade = document.createElement("td") as HTMLTableCellElement;
      tdGrade.className = "td-custom";
      tdGrade.textContent = item.grade;
      tr.append(tdGrade);

      //   button cell
      const tdButton = document.createElement("td") as HTMLTableCellElement;
      tdButton.className =
        "bg-gray-200 border border-gray-300 hover:opacity-80";

      const deleteButton = document.createElement(
        "button"
      ) as HTMLButtonElement;
      deleteButton.className =
        "w-full p-1 min-[320px]:p-2 flex items-center justify-center text-gray-700 bg-gray-200 focus:outline-none";
      deleteButton.innerHTML = ` 
      <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-gray-500"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path d="M6 6L18 18M18 6L6 18" />
    </svg>`;
      tdButton.append(deleteButton);
      tr.append(tdButton);

      //   on delete button clicked
      deleteButton.addEventListener("click", () => {
        CourseList.removeItem(item.id);
        this.render(CourseList);
      });

      //   append row to table
      this.tbody.append(tr);
    });

    this.gpaDisplay.textContent = CourseList.gpa.toFixed(2);
  }
}
