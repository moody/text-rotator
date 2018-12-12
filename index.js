const MAX_LETTERS = 26;
const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);

let rotateBy = 13;

// DOM objects
let incrementText;
let upButton, downButton;
let normalTextArea, rotatedTextArea;

$( document ).ready(() => {
  // Init DOM objects
  incrementText = $("#increment-text");
  upButton = $("#up-button");
  downButton = $("#down-button");
  normalTextArea = $("#normal-textarea");
  rotatedTextArea = $("#rotated-textarea");
  
  incrementText.text(rotateBy);

  // Button handlers
  upButton.click(() => {
    increment();
    updateTextArea(rotatedTextArea);
  });
  downButton.click(() => {
    decrement();
    updateTextArea(rotatedTextArea);
  });
  
  // Bind text area changes
  normalTextArea.bind("input propertychange", () => updateTextArea(rotatedTextArea));
  rotatedTextArea.bind("input propertychange", () => updateTextArea(normalTextArea));
})

function increment() {
  if (++rotateBy > MAX_LETTERS-1) rotateBy = 0;
  incrementText.text(rotateBy);
}

function decrement() {
  if (--rotateBy < 0) rotateBy = MAX_LETTERS-1;
  incrementText.text(rotateBy);
}

function rotate(str, reverse) {
  let arr = str.toUpperCase().split("");
  arr = arr.map((c) => {
    // Return if char is not A-Z
    if (c.match(/[^A-Z]/g)) return c;

    /*
      1. Convert ASCII value to 0-25
      2. Add rotation value
      3. Wrap value around 0-25 by using modulo
      4. Add ASCII value for "A"
    */
   c = reverse ?
    (((c.charCodeAt(0) - A) - rotateBy + MAX_LETTERS) % MAX_LETTERS) + A :
    (((c.charCodeAt(0) - A) + rotateBy) % MAX_LETTERS) + A;

    // Return ASCII value as string
    return String.fromCharCode(c);
  });

  return arr.join("");
}

function updateTextArea(textArea) {
  let value = (textArea === rotatedTextArea) ?
    rotate(normalTextArea.val()) :
    rotate(rotatedTextArea.val(), true);
  textArea.val(value);
}
