
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(async function(OneSignal) {
      await OneSignal.init({
        appId: "85c1ffaa-abcf-4acb-be6b-79bde698bdc0",
        promptOptions: {
          slidedown: {
            enabled: true,
            autoPrompt: true,
            actionMessage: "We'd like to send you notifications!",
            acceptButtonText: "Allow",
            cancelButtonText: "No Thanks",
          },
        },
      });

      // Log subscription state
      const isSubscribed = await OneSignal.isPushNotificationsEnabled();
      console.log("Is the user subscribed?", isSubscribed);
    });

    document.getElementById('subscribe-btn').addEventListener('click', async () => {
      const permission = await OneSignal.pushManager.subscribe();
      console.log("Notification permission granted:", permission);
    });
  

// Use debounce to limit frequent state updates
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

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
