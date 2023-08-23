export default class DoClassify {
  constructor() {
    this.emptyDiv = document.getElementById("empty");
    this.config = {
      backgroundColor: "white",
      borderRadius: "25px",
      border: "1px solid #ccc",
      padding: "5px",
      fontSize: "20px",
      fontFamily: "press start 2p, cursive",
    };

    this.messages = [
      "Oh no! It seems like we forgot to fill this room in...",
      "Would you like to clean your own room? Upload a picture of your room to get started. For the most accurate results, make sure your picture has adequate lighting. Max file size: 10 MB.",
    ];

    this.currentMessage = 0;
  }

  doMessage() {
    console.log("doMessage called"); // Log when the method is called
    console.log(
      "emptyDiv visibility:",
      window.getComputedStyle(this.emptyDiv).display
    ); // Log the visibility of the emptyDiv

    const prompt = document.createElement("div");
    prompt.id = 'empty-prompt';
    Object.assign(prompt.style, this.config);

    const message = document.createElement("p");
    message.id = "message";
    message.textContent = this.messages[this.currentMessage];
    console.log("Message content:", message.textContent); // Log the content of the message
    prompt.appendChild(message);

    const nextButton = document.createElement("button");
    nextButton.id = "nextMessage";
    nextButton.textContent = "Next";
    prompt.appendChild(nextButton);

    const upload = document.createElement("input");
    upload.type = "file";
    upload.id = "upload";
    upload.accept = "image/*";
    upload.classList.add("hidden"); // Use classList.add instead of setAttribute
    prompt.appendChild(upload);

    nextButton.addEventListener("click", () => {
      this.currentMessage++;
      if (this.currentMessage < this.messages.length) {
        message.textContent = this.messages[this.currentMessage];
      } else {
        nextButton.classList.add("hidden");
        upload.classList.remove("hidden");
      }
    });

    this.emptyDiv.appendChild(prompt);
  }
}
