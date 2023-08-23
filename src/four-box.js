import EventEmitter from "events";
import ApplyAnimation from "./animate-item";
import Tooltip from "./tooltip.js";
import { hideElem, showElem } from "./util.js";
const confetti = require("canvas-confetti");

export default class BoxMethod extends EventEmitter {
  constructor(boxElementId) {
    super();
    this.done = false;
    this.counter = 0;
    this.boxElement = document.getElementById(boxElementId);

  

    this.state = {
      0: "trash",
      1: "put-away",
      2: "store",
      3: "donate",
      4: "done",
    };

    this.roomCleaned = 0;

    this.elems = null;

    this.calculateRect();
    this.boxText = null;

    this.config = {
      backgroundColor: "white",
      borderRadius: "25px",
      border: "1px solid #ccc",
      padding: "5px",
      color: "clay",
      width: "50%",
      fontSize: "20px",
      textAlign: "center",
      position: "absolute",
      bottom: "0px",
      rect: this.rect,
      left: this.left + "px",
      right: this.right + "px",
    };

    this.formatBoxText();
    this.tooltips = [];
  }

  putAway() {
    //put item in box, change state (trash->put-away)
    this.nextState();
    this.formatBoxText();
  }

  getState() {
    return `${this.state[this.counter]}-${this.room}`;
  }

  nextState() {
    this.tooltips.forEach((tooltip) => tooltip.remove());
    this.tooltips = [];
    if (this.counter === 3) {
      this.done = true;
      this.finish();
      this.emit("box:done", { target: this });
    }
    this.counter++;
    this.updateToolTips();
    console.log("counter", this.counter);
    console.log("state", this.state[this.counter]);
  }

  calculateRect() {
    const rect = this.boxElement.getBoundingClientRect();
    this.rect = rect;
    this.left = rect.left;
    this.right = rect.right;
  }

  getElems() {
    this.elems = {
      trash: document.getElementsByClassName(`trash-${this.room}`),
      donate: document.getElementsByClassName(`donate-${this.room}`),
      "put-away": document.getElementsByClassName(`put-away-${this.room}`),
      store: document.getElementsByClassName(`store-${this.room}`),
    };
  }

  populateItem(room) {
    this.reset();
    this.room = room; // Set the room first
    this.getElems(); // Get the elements for the current room
    for (let i = 0; i < 4; i++) {
      const stateValue = this.state[i];
      const className = `${stateValue}-${room}`;
      const elements = document.getElementsByClassName(className);
      for (const element of elements) {
        const elemToolTip = new Tooltip(element.id);
        console.log(this.getState());
        if (element.classList.contains(this.getState())) {
          elemToolTip.add();
        }
        element.addEventListener("click", () => {
          if (element.classList.contains(this.getState())) {
            this.animateItem(element.id);
            this.putAway();
            console.log(element.id);
          }
        });
      }
    }
    console.log("Room name:", this.room);
    this.updateToolTips(); // Update the tooltips for the current state
  }

  animateItem(elementId) {
    const animate = new ApplyAnimation(elementId);
    animate.toBox();
  }

  updateToolTips() {
    const className = `${this.getState()}`;
    console.log("Class name being used:", className);
    const elements = document.getElementsByClassName(className);

    if (elements) {
      for (const element of elements) {
        const elemToolTip = new Tooltip(element.id);
        if (element.classList.contains(this.getState())) {
          elemToolTip.add();
          this.tooltips.push(elemToolTip);
        }
      }
    } else {
      console.log(`No elements found for class name: ${className}`);
    }
  }

  formatBoxText() {
    // Check if this.boxText exists, and create it if not
    if (!this.boxText) {
      this.boxText = document.createElement("div");
      this.boxText.classList.add("box-text");
      Object.assign(this.boxText.style, this.config);
      this.boxElement.appendChild(this.boxText);
    }

    // Update the textContent and id based on the current state
    this.boxText.textContent = this.state[this.counter];
    this.boxText.setAttribute("id", `${this.state[this.counter]}`);
    this.boxTextId = this.state[this.counter];
  }

  finish() {
    const myCanvas = document.createElement("canvas");
    document.querySelector(`#${this.room}`).prepend(myCanvas);
    myCanvas.style.position = "absolute";
    myCanvas.style.width = "100%";
    myCanvas.style.top = "30px";
    myCanvas.style.left = "300px";
    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 400,
      spread: 260,
    });
    this.displayCleanMessage(`${this.room}`);
  }

  displayCleanMessage(parentId) {
    const cleanMessage = document.createElement("div");
    const config = {
      backgroundColor: "white",
      borderRadius: "25px",
      border: "1px solid #ccc",
      padding: "5px",
      fontSize: "20px",
      fontFamily: "press start 2p, cursive",
      rect: document.getElementById(parentId).getBoundingClientRect(),
      left:
        document.getElementById(parentId).getBoundingClientRect().left + "px",
      right: document.getElementById(parentId).right + "px",
    };

    Object.assign(cleanMessage.style, config);
    cleanMessage.classList.add("clean");
    cleanMessage.textContent =
      "Congratulations! This room is now clean, click the arrow go back to the home page!";
    document.querySelector(`#${parentId}`).appendChild(cleanMessage);
    const back = document.createElement("div");
    back.id = "back-btn";
    cleanMessage.append(back);
    back.addEventListener('click',()=>{
      hideElem("kitchen");
      hideElem("bedroom");
      hideElem(`${this.room}-box`);
      this.reset();
      showElem("menu");
      this.finishRoom();
    })
  }

  finishRoom() {
    return new Promise((resolve) => {
      this.once("box:done", () => {
        resolve();
      });
    });
  }

  reset() {
    this.done = false;
    this.counter = 0;
    this.tooltips.forEach((tooltip) => tooltip.remove());
    this.tooltips = [];
    this.formatBoxText();
    // Any other properties that need to be reset
  }
}