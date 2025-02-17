function myFunction(icon) {
  icon.classList.toggle("change");
  var nav = document.getElementById("display");
  if (nav.style.display === "flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }
}

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Student", "Developer", "Learner", "Gamer"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;
function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

function bodyclose() {
  var x = document.getElementById("display");
  if (x.style.display == "flex") {
    var y = document.getElementById("menu-icon");

    y.classList.toggle("change");

    x.style.display = "none";
  }
}
/*
function success() {
  x = document.getElementById("name").value;
  y = document.getElementById("mail").value;
  z = document.getElementById("area").value;
  if (x.length > 1 && y.length > 1 && z.length > 1) {
    window.alert("This form has been succesfully submitted")
  }
}
var header = document.getElementById("pills-tab");
var btns = header.getElementsByClassName("nav-item");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  if (current.length > 0) { 
    current[0].className = current[0].className.replace(" active", "");
  }
  this.className += " active";
  });
}
*/
/*CERIFICATE AND EDUCATION BUTTON*/
document
  .getElementById("pills-education-tab")
  .addEventListener("click", function () {
    document.getElementById("pills-education").classList.remove("hidden");
    document.getElementById("pills-certificates").classList.add("hidden");
    document
      .getElementById("pills-certificates-mtab")
      .classList.remove("active");
    document.getElementById("pills-education-mtab").classList.add("active");
  });
document
  .getElementById("pills-certificates-tab")
  .addEventListener("click", function () {
    document.getElementById("pills-certificates").classList.remove("hidden");
    document.getElementById("pills-education").classList.add("hidden");
    document.getElementById("pills-certificates-mtab").classList.add("active");
    document.getElementById("pills-education-mtab").classList.remove("active");
  });
