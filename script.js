// Use debounce to limit frequent state updates
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Throttle the resize event
window.addEventListener('resize', throttle(function() {
  console.log('Resized!');
}, 1000));

// Throttle the click event for toggling the menu
document.addEventListener('click', throttle(function(event) {
  const sideNav = document.getElementById('sideNav');
  const menuIcon = document.querySelector('.menu-icon');

  if (sideNav.classList.contains('active') &&
      !sideNav.contains(event.target) &&
      !menuIcon.contains(event.target)) {
      sideNav.classList.remove('active');
  }
}, 500));



// Array of image paths and URLs
const imageSources = [
  "cgp.jpg", "onlineg.jpg", "practice.jpg", "schepo.jpg", "arch.jpg", "classsch.jpg", "logo.png",// Local image path
  "group-five-african-college-students-spending-time-together-campus-university-yard-black-afro-friends-sitting-grass-studying-with-laptops_627829-6069.webp"  // URL
];

// Function to preload images
function preloadImages(sources, callback) {
  let loadedCount = 0;

  sources.forEach((source, index) => {
    const img = new Image();
    img.src = source;

    img.onload = () => {
      console.log(`Image ${index + 1} loaded`);
      loadedCount++;

      // Display the image after loading
      const imgElement = document.getElementById(`image${index + 1}`);
      if (imgElement) {
        imgElement.src = source;
        imgElement.style.display = "inline-block";
      }

      // Call the callback when all images are loaded
      if (loadedCount === sources.length) {
        callback();
      }
    };

    img.onerror = () => {
      console.error(`Failed to load image at ${source}`);
    };
  });
}

// Preload images
preloadImages(imageSources, () => {
  console.log("All images preloaded!");
});

function toggleMenu() {
  const sideNav = document.getElementById('sideNav');
  sideNav.classList.toggle('active');
}


document.addEventListener('click', function(event) {
  const sideNav = document.getElementById('sideNav');
  const menuIcon = document.querySelector('.menu-icon');

  // Check if the click is outside the menu and not on the menu icon
  if (sideNav.classList.contains('active') &&
      !sideNav.contains(event.target) &&
       !menuIcon.contains(event.target)) {
      sideNav.classList.remove('active');

  }
});
// Array of Educational Messages
const messages = [
  "Education is the most powerful weapon to change the world.",
  "Knowledge is power. Stay curious!",
  "Learning is a treasure that follows its owner everywhere.",
  "Mistakes are proof that you are trying.",
  " What do you know about Hon Richard D'Prof?.", 
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

document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splashScreen");
  const app = document.getElementById("app");

  // Institution details
  const institutionDetails = {
    name: "OBAFEMI AWOLOWO UNIVERSITY",
    address: "Ile Ife, Osun State, Nigeria",
  };

  // Set institution details
  document.getElementById("institutionName").textContent = institutionDetails.name;
  document.getElementById("institutionAddress").textContent = institutionDetails.address;

  // Display splash screen for 10 seconds
  setTimeout(() => {
    splashScreen.style.display = "none"; // Hide splash screen
    app.style.display = "block"; // Show main app
    document.body.style.overflow = "auto"; // Re-enable scrolling
  }, 10000); // 10 seconds
});



// Tour Data
const tourSteps = [
    
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
document.getElementById('floating-btn').addEventListener('click', function() {
    var menu = document.getElementById('floating-menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
});


// Use debounce to limit frequent state updates
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Throttle the resize event
window.addEventListener('resize', throttle(function() {
  console.log('Resized!');
}, 1000));

// Throttle the click event for toggling the menu
document.addEventListener('click', throttle(function(event) {
  const sideNav = document.getElementById('sideNav');
  const menuIcon = document.querySelector('.menu-icon');

  if (sideNav.classList.contains('active') &&
      !sideNav.contains(event.target) &&
      !menuIcon.contains(event.target)) {
      sideNav.classList.remove('active');
  }
}, 500));
