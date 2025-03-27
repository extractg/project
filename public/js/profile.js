document.addEventListener("DOMContentLoaded", function () {
    const profileUsername = document.getElementById("username");
    if (localStorage.getItem("isAuthenticated") !== "true") {
        window.location.href = "login.html";
    } else {
        profileUsername.textContent = localStorage.getItem("username");
    }

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
        window.location.href = "login.html";
    });
});