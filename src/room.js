import EventEmitter from "events";

export default class Room extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this.cleaned = false;
  }

  clean() {
    this.cleaned = true;
    this.emit("room:cleaned");
  }

  isCleaned() {
    return this.cleaned;
  }
}
