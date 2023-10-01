import "./index.css";
import CourseItem from "./models/CourseItem";

import CourseList from "./models/CourseList";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  // Mobile nav setup
  const mobileNavBtn = document.querySelector(
    "button.mobile-menu-button"
  ) as HTMLButtonElement;
  const mobileNavMenu = document.querySelector(
    ".mobile-menu"
  ) as HTMLDivElement;
  // Mobile nav button Event Listeners
  mobileNavBtn.addEventListener("click", () => {
    mobileNavMenu.classList.toggle("hidden");
  });

  // course list setup
  const courseList = CourseList.instance;
  const template = ListTemplate.instance;

  const courseEntryForm = document.getElementById(
    "entry-form"
  ) as HTMLFormElement;
  courseEntryForm.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    console.log("entered");

    const nameInput = document.getElementById("name-input") as HTMLInputElement;
    const name: string = nameInput.value.trim();

    const creditsInput = document.getElementById(
      "credits-input"
    ) as HTMLInputElement;
    const credits: string = creditsInput.value.trim();

    const gradeInput = document.getElementById(
      "grade-input"
    ) as HTMLInputElement;
    const grade: string = gradeInput.value.trim();

    const itemId: number = courseList.list.length
      ? parseInt(courseList.list[courseList.list.length - 1].id) + 1
      : 1;

    const newItem = new CourseItem(
      itemId.toString(),
      name ? name : `Course ${itemId}`,
      credits,
      grade
    );

    courseList.addItem(newItem);
    template.render(courseList);
  });

  const clearButton = document.getElementById("clear-btn") as HTMLButtonElement;
  clearButton.addEventListener("click", (): void => {
    courseList.clearList();
    template.clear();
  });

  courseList.load();
  template.render(courseList);
};

document.addEventListener("DOMContentLoaded", initApp);
