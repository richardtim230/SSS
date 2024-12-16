document.addEventListener("DOMContentLoaded", () => {
    const notifications = document.querySelectorAll(".notification");
    const notificationContainer = document.getElementById("notification-container");
    let currentNotificationIndex = 0;

    // Function to show the next notification
    function showNextNotification() {
        // Hide all notifications first
        notifications.forEach((notification) => {
            notification.classList.remove("show");
        });

        // Show the current notification
        notifications[currentNotificationIndex].classList.add("show");

        // Move to the next notification in the queue
        currentNotificationIndex++;
        if (currentNotificationIndex >= notifications.length) {
            currentNotificationIndex = 0; // Loop back to the first notification
        }
    }

    // Show notifications in intervals (e.g., every 5 seconds)
    setInterval(showNextNotification, 15000);

    // Show the first notification immediately
    showNextNotification();
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
