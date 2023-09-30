import "./index.css";

// Grab HTML Elements
const mobileNavBtn = document.querySelector(
  "button.mobile-menu-button"
) as HTMLButtonElement;
const mobileNavMenu = document.querySelector(".mobile-menu") as HTMLDivElement;

// Add Event Listeners
mobileNavBtn.addEventListener("click", () => {
  mobileNavMenu.classList.toggle("hidden");
});
