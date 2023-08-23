import "./styles.css";
import BoxMethod from "./four-box.js";
import Menu from "./menu-config.js";
window.addEventListener("load", function () {
  //when the page first loads the menu should be the first thing to display

  const toBed = document.getElementById("to-bedroom");
  const toEmpty = document.getElementById("to-empty");
  const toKitchen = document.getElementById("to-kitchen");

  const menu = new Menu(toBed, toEmpty, toKitchen);
  menu.loadMenu();

  // Remove these lines to avoid calling startCleaningRoom twice
  // toKitchen.addEventListener("click", () => startCleaningRoom("kitchen"));
  // toBed.addEventListener("click", () => startCleaningRoom("bedroom"));

  startCleaningProcess().catch((error) => {
    console.error("An error occurred during cleaning:", error);
  });
});

async function startCleaningRoom(roomName) {
  const box = new BoxMethod(`${roomName}-box`);
  box.populateItem(roomName);

  // If you want to handle sequential cleaning, you can return the promise
  await box.finishRoom();
}

async function startCleaningProcess() {
  await startCleaningRoom("kitchen");
  await startCleaningRoom("bedroom");
  // You can add more rooms here if needed
  console.log("All rooms are clean!");
}