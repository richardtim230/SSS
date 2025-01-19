document.addEventListener("DOMContentLoaded", () => {
  const accessCodeInput = document.getElementById("accessCode");
  const submitButton = document.getElementById("submitCode");
  const errorMessage = document.getElementById("errorMessage");
  const welcomeScreen = document.querySelector(".welcome-screen");
  const loadingScreen = document.querySelector(".loading-screen");
  const institutionName = document.getElementById("institutionName");
  const countdownElement = document.getElementById("countdown");
  const loadingLogo = document.getElementById("loadingLogo");

  // Predefined access codes with links and logos
  const institutions = {
    "CODE123": { name: "OBAFEMI AWOLOWO UNIVERSITY", link: "oau-index.html.htm", logo: "logo.png" },
    "CODE456": { name: "Federal University of Technology, Akure", link: "futa-index.html.htm", logo: "futa-logo.png" },
    "CODE789": { name: "Federal University, Oye-Ekiti", link: "fuoye-index.html.htm", logo: "fuoye-logo.png" },
    "CODE101": { name: "University of Ibadan", link: "ibadan-index.html.htm", logo: "AddText_01-19-12.49.34 (1).png" },
    "CODE102": { name: "University of Ilorin", link: "ilorin-index.html.htm", logo: "ibadan-logo.png" },
    "CODE103": { name: "University of Benin", link: "benin-index.html.htm", logo: "ibadan-logo.png" },
    "CODE104": { name: "LAUTECH, Ogbomoso", link: "lautech-index.html.htm", logo: "ibadan-logo.png" },
    "CODE105": { name: "University of Nigeria, Nsukka", link: "institution-d.html", logo: "ibadan-logo.png" },
    "CODE106": { name: "University of Ibadan", link: "institution-d.html", logo: "ibadan-logo.png" },
    "CODE202": { name: "Institution E", link: "institution-e.html", logo: "logoE.png" },
  };

  submitButton.addEventListener("click", () => {
    const enteredCode = accessCodeInput.value.trim();

    if (institutions[enteredCode]) {
      const { name, link, logo } = institutions[enteredCode];

      // Show loading screen
      welcomeScreen.style.display = "none";
      loadingScreen.style.display = "block";

      // Set institution name and logo
      institutionName.textContent = `Welcome to ${name}`;
      loadingLogo.src = logo;

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
