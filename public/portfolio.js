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
// Smooth animation function (place this before launchRocket function)
Math.easeInOutQuad = function (t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

document.addEventListener("scroll", function () {
  let rocket = document.getElementById("rocketBtn");
  if (window.scrollY > 300) {
    // Show rocket after scrolling 300px
    rocket.style.display = "block";
  } else {
    rocket.style.display = "none";
  }
});

function launchRocket() {
  let rocket = document.getElementById("rocketBtn");
  let blast = document.getElementById("blastGif");
  let navbar = document.querySelector(".nav-bar");

  let navbarHeight = navbar.offsetHeight; // Get dynamic navbar height
  let startScroll = window.scrollY; // Current scroll position
  let startBottom = parseInt(getComputedStyle(rocket).bottom) || 20; // Rocket's initial position
  let targetBottom = window.innerHeight - navbarHeight - 50; // Final rocket position before blast
  let duration = 1500; // 2 seconds
  let startTime = null;

  function animate(time) {
    if (!startTime) startTime = time;
    let progress = (time - startTime) / duration;
    progress = Math.min(progress, 1); // Clamp progress to 1 (avoid overshooting)

    let easedProgress = Math.easeInOutQuad(progress); // Smooth animation
    let newScrollY = startScroll * (1 - easedProgress); // Scroll up
    let newRocketPos =
      startBottom + (targetBottom - startBottom) * easedProgress; // Move rocket up

    window.scrollTo(0, newScrollY);
    rocket.style.bottom = `${newRocketPos}px`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      finalizeRocket();
    }
  }

  function finalizeRocket() {
    window.scrollTo(0, 0); // Snap to top
    
    rocket.style.display = "none"; // Hide rocket
    rocket.style.bottom = "-200px";
    // Get navbar height dynamically
    let navbarHeight = document.querySelector(".nav-bar").offsetHeight;

    // Set blast position **above the navbar**
    blast.style.top = `${navbarHeight - 40}px`; // Place blast right above navbar
    blast.style.display = "block";

    setTimeout(() => {
      blast.style.display = "none"; // Hide blast after explosion
      setTimeout(() => {
        rocket.src = "/Images/rocket.png";
        rocket.style.bottom = "20px";
      }, 200); // Reset position
    }, 700);
  }
  rocket.style.display = "block";
  rocket.src = "/Images/rocket_launch.gif"; // Change to launch GIF
  requestAnimationFrame(animate);
}
