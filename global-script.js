document.addEventListener("DOMContentLoaded", () => {
  const accessCodeInput = document.getElementById("accessCode");
  const submitButton = document.getElementById("submitCode");
  const errorMessage = document.getElementById("errorMessage");
  const welcomeScreen = document.querySelector(".welcome-screen");
  const loadingScreen = document.querySelector(".loading-screen");
  const institutionName = document.getElementById("institutionName");
  const countdownElement = document.getElementById("countdown");
  const loadingLogo = document.getElementById("loadingLogo");

  const institutions = {
    "OAU-NG123": { name: "OBAFEMI AWOLOWO UNIVERSITY", link: "oau-index.html.htm", logo: "logo.png" },
    "FUTA.NG123": { name: "Federal University of Technology, Akure", link: "futa-index.html.htm", logo: "futa-logo.png" },
    "FUOYE-NG": { name: "Federal University, Oye-Ekiti", link: "fuoye-index.html.htm", logo: "fuoye-logo.png" },
    "UNIBAD-NG12": { name: "University of Ibadan", link: "ibadan-index.html.htm", logo: "AddText_01-19-12.49.34 (1).png" },
    "UNILORIN-123": { name: "University of Ilorin", link: "ilorin-index.html.htm", logo: "logo-footer-1~2.png" },
    "CODE103": { name: "University of Benin", link: "benin-index.html.htm", logo: "UNIBEN-logto.png" },
    "CODE104": { name: "LAUTECH, Ogbomoso", link: "lautech-index.html.htm", logo: "favicon1.png" },
    "CODE105": { name: "University of Nigeria, Nsukka", link: "institution-d.html", logo: "ibadan-logo.png" },
    "CODE106": { name: "University of Ibadan", link: "institution-d.html", logo: "ibadan-logo.png" },
    "CODE202": { name: "Institution E", link: "institution-e.html", logo: "logoE.png" },
  };

  // Retrieve refresh count, validation status, and institution data from localStorage
  let refreshCount = parseInt(localStorage.getItem("refreshCount") || "0");
  const isAccessCodeValid = localStorage.getItem("isAccessCodeValid") === "true";
  const institutionLink = localStorage.getItem("institutionLink");
  const institutionNameStored = localStorage.getItem("institutionName");
  const institutionLogo = localStorage.getItem("institutionLogo");

  if (isAccessCodeValid && refreshCount < 5 && institutionLink) {
    // Skip access code validation and show welcome page directly
    showLoadingScreen(institutionNameStored, institutionLogo, institutionLink);
  } else {
    // Show access code input screen
    welcomeScreen.style.display = "block";
  }

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

      // Reset refresh count and set access code validation status
      localStorage.setItem("refreshCount", "0");
      localStorage.setItem("isAccessCodeValid", "true");
      localStorage.setItem("institutionLink", link);
      localStorage.setItem("institutionName", name);
      localStorage.setItem("institutionLogo", logo);

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

  // Increment refresh count on each page load
  refreshCount += 1;
  localStorage.setItem("refreshCount", refreshCount.toString());

  function showLoadingScreen(name, logo, link) {
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
  }
});
