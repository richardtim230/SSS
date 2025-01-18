document.addEventListener("DOMContentLoaded", () => {
  const accessCodeInput = document.getElementById("accessCode");
  const submitButton = document.getElementById("submitCode");
  const errorMessage = document.getElementById("errorMessage");
  const welcomeScreen = document.querySelector(".welcome-screen");
  const loadingScreen = document.querySelector(".loading-screen");
  const institutionName = document.getElementById("institutionName");
  const countdownElement = document.getElementById("countdown");

  // Predefined access codes with links
  const institutions = {
    "CODE123": { name: "OBAFEMI AWOLOWO UNIVERSITY", link: "oau-index.html.htm" },
    "CODE456": { name: "Institution B", link: "institution-b.html" },
    "CODE789": { name: "Institution C", link: "institution-c.html" },
    "CODE101": { name: "Institution D", link: "institution-d.html" },
    "CODE202": { name: "Institution E", link: "institution-e.html" },
  };

  submitButton.addEventListener("click", () => {
    const enteredCode = accessCodeInput.value.trim();

    if (institutions[enteredCode]) {
      const { name, link } = institutions[enteredCode];

      // Show loading screen
      welcomeScreen.style.display = "none";
      loadingScreen.style.display = "block";

      // Set institution name
      institutionName.textContent = `Welcome to ${name}`;

      // Countdown logic
      let countdown = 10;
      const countdownInterval = setInterval(() => {
        countdown -= 1;
        countdownElement.textContent = countdown;

        if (countdown === 0) {
          clearInterval(countdownInterval);
          // Redirect to the institutional page
          window.location.href = link;
        }
      }, 1000);
    } else {
      errorMessage.textContent = "Invalid access code. Please try again.";
    }
  });
});
