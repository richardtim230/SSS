// Use debounce to limit frequent state updates
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
// Array of Educational Messages
const messages = [
  "Education is the most powerful weapon to change the world.",
  "Knowledge is power. Stay curious!",
  "Learning is a treasure that follows its owner everywhere.",
  "Mistakes are proof that you are trying.",
  "Education is not preparation for life; it is life itself.",
  "Never stop learning because life never stops teaching.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Your mind is your greatest asset—invest in it.",
  "Teachers open the door, but you must walk through it.",
  "Reading is to the mind what exercise is to the body."
];

// Initialize Variables
let currentMessageIndex = 0;
const messageElement = document.getElementById('educational-message');

// Function to Display a Message
function displayMessage(index) {
  // Set the message
  messageElement.textContent = messages[index];

  // Add entry animation
  messageElement.classList.add('educational-text');
  
  // Remove entry animation after 9 seconds and add exit animation
  setTimeout(() => {
    messageElement.classList.remove('educational-text');
    messageElement.classList.add('educational-text-exit');
  }, 9000);

  // Clean up exit animation for the next cycle
  setTimeout(() => {
    messageElement.classList.remove('educational-text-exit');
  }, 10000);
}

// Initialize the First Message
displayMessage(currentMessageIndex);

// Cycle Through Messages Every 10 Seconds
setInterval(() => {
  currentMessageIndex = (currentMessageIndex + 1) % messages.length;
  displayMessage(currentMessageIndex);
}, 10000);


// Celebration Animation Script

// Generate random sparkles

const sparklesContainer = document.querySelector('.sparkles');

const confettiContainer = document.querySelector('.confetti');

// Create sparkles

function createSparkles() {

  for (let i = 0; i < 50; i++) {

    const sparkle = document.createElement('span');

    sparkle.style.left = `${Math.random() * 100}vw`;

    sparkle.style.top = `${Math.random() * 100}vh`;

    sparkle.style.animationDuration = `${Math.random() * 3 + 1}s`;

    sparklesContainer.appendChild(sparkle);

  }

}

// Create confetti

function createConfetti() {

  for (let i = 0; i < 100; i++) {

    const confettiPiece = document.createElement('span');

    confettiPiece.style.left = `${Math.random() * 100}vw`;

    confettiPiece.style.animationDuration = `${Math.random() * 3 + 2}s`;

    confettiPiece.style.animationDelay = `${Math.random()}s`;

    confettiContainer.appendChild(confettiPiece);

  }

}

// Auto-hide celebration after 10 seconds

setTimeout(() => {

  const celebrationOverlay = document.getElementById('celebration-overlay');

  celebrationOverlay.style.display = 'none';

  document.body.style.overflow = 'auto'; // Enable scrolling

}, 120000);

// Initialize animations

createSparkles();

createConfetti();


// Tour Data
const tourSteps = [
    {
    title: "HAPPY NEW YEAR!",
    description: "Welcome to the year 2025! A year filled with diverse opportunities.",
    image: "Happy New Year 2024 Instagram Post_1735703147472.jpg"
  },
  {
    title: "Welcome to Students Support System",
    description: "Get started with our intuitive dashboard and tools.",
    image: "logo.png"
  },
  {
    title: "CLASS SCHEDULES AND NOTE MAKING",
    description: "Manage your class schedules, personal reading timetable and taking of notes. Also contains inbuilt browser for browsing lecture materials.",
    image: "classsch.jpg"
  },
  {
    title: "Academic Archives",
    description: "Access and manage your school course materials in a simplified and comprehensive format. Each lecture topics contains quick quizzes for instant testing of knowledge",
    image: "arch.jpg"
  },
  {
    title: "PRACTICE QUESTIONS AND ANSWERS",
    description: "Access Unlimited Past Questions and preview answers with detailed explanations.",
    image: "practice.jpg"
  },
  {
    title: "Online Games",
    description: "You don't have to feel bored as a result of too much reading!📖, take a break by playing our online games which are fun and educative!.",
    image: "onlineg.jpg"
  },
  {
    title: "School Portal",
    description: "Access and manage your school E-portal here! You don't have to go away from the 'Students Support System'! .",
    image: "schepo.jpg"
  },
  {
    title: "GPA AND CGPA CALCULATOR",
    description: "Get assistance with instance calculation of your CGPA! It's completely free and private.",
    image: "cgp.jpg"
  }
];

let currentStep = 0;

// DOM Elements
const tourTitle = document.getElementById('tour-title');
const tourDescription = document.getElementById('tour-description');
const tourImage = document.getElementById('tour-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const closeBtn = document.getElementById('close-btn');
const overlay = document.getElementById('tour-overlay');

// Initialize Tour
function showStep(step) {
  const { title, description, image } = tourSteps[step];
  tourTitle.innerText = title;
  tourDescription.innerText = description;
  tourImage.src = image;

  // Toggle Button Visibility
  prevBtn.style.display = step === 0 ? 'none' : 'inline-block';
  nextBtn.style.display = step === tourSteps.length - 1 ? 'none' : 'inline-block';
}

// Event Listeners
nextBtn.addEventListener('click', () => {
  if (currentStep < tourSteps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Start Tour
showStep(currentStep);

window.addEventListener('load', () => {
  // Show the first notification on page load
  const notification1 = document.getElementById('notification1');
  document.body.classList.add('modal-active'); // Prevent scrolling
  notification1.classList.remove('hidden');

  // Schedule the second notification for 12:00 PM
  const targetTime = new Date();
  targetTime.setHours(12, 0, 0, 0); // Set to 12:00 PM

  const now = new Date();

  if (now >= targetTime) {
    // If it's already 12:00 PM or later, show the second notification immediately
    showNotification('notification2');
  } else {
    // Calculate the delay until 12:00 PM
    const delay = targetTime - now;
    setTimeout(() => {
      showNotification('notification2');
    }, delay);
  }
});

function showNotification(notificationId) {
  const notification = document.getElementById(notificationId);
  document.body.classList.add('modal-active'); // Prevent scrolling
  notification.classList.remove('hidden');
}

function dismissNotification(notificationId) {
  const notification = document.getElementById(notificationId);
  document.body.classList.remove('modal-active'); // Re-enable scrolling
  notification.classList.add('hidden');
}

document.addEventListener("DOMContentLoaded", () => {
  const notificationWidget = document.getElementById("notificationWidget");

  // Display message dynamically
  const message = "Welcome to the Obafemi Awolowo University Students Support System, a platform where all your academic questions are answered with maximum supports given!.";
  notificationWidget.querySelector("p").textContent = message;
});



document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("popup-container");

    const form = document.getElementById("user-form");

    const welcomeMessage = document.getElementById("welcome-message");

    const userData = localStorage.getItem("userData");

    if (!userData) {

        popup.classList.add("show");

    } else {

        const user = JSON.parse(userData);

        welcomeMessage.textContent = `Welcome back, ${user.nickname}! Explore your campus.`;

    }

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value;

        const nickname = document.getElementById("nickname").value;

        const department = document.getElementById("department").value;

        const user = { fullName, nickname, department };

        localStorage.setItem("userData", JSON.stringify(user));

        popup.classList.remove("show");

        welcomeMessage.textContent = `Welcome, ${nickname}! Explore your campus.`;

    });

});
