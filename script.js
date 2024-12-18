document.addEventListener("DOMContentLoaded", () => {
    const notifications = document.querySelectorAll(".notification");
    const notificationContainer = document.getElementById("notification-container");
    const closeAllButton = document.getElementById("close-all");
    let currentNotificationIndex = 0;

    // Function to show the next notification
    function showNextNotification() {
        notifications.forEach((notification) => {
            notification.classList.remove("show");
        });

        notifications[currentNotificationIndex].classList.add("show");

        currentNotificationIndex++;
        if (currentNotificationIndex >= notifications.length) {
            currentNotificationIndex = 0;
        }
    }

    // Show notifications in intervals
    setInterval(showNextNotification, 5000);

    // Show the first notification immediately
    showNextNotification();

    // Close all notifications
    closeAllButton.addEventListener("click", () => {
        notificationContainer.style.display = "none"; // Hide the entire container
    });
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
