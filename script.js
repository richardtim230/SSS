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