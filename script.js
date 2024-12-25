// Select the button and the paragraph
const button = document.getElementById("myButton");
const message = document.getElementById("message");

// Add a click event to the button
button.addEventListener("click", () => {
    message.textContent = "Hello! You clicked the button!";
});
