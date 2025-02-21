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

/*Contact Form*/
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("mail").value;
    const message = document.getElementById("area").value;
    const responseMessage = document.getElementById("response-message");

    responseMessage.textContent = "Sending..."; // Show a message while sending
    responseMessage.style.color = "blue";

    try {
      const response = await fetch("/api/send-email.js", {
        // Ensure API path is correct
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      responseMessage.textContent = data.message;
      responseMessage.style.color = response.ok ? "green" : "red";
      if (response.ok) {
        setTimeout(() => {
          window.location.reload(); // Ensure full page refresh
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      responseMessage.textContent = "Error sending email.";
      responseMessage.style.color = "red";
    }
  });
