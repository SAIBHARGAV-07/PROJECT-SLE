function userLogin() {
    const username = document.getElementById("username").value;

    localStorage.setItem("username", username);
    localStorage.setItem("role", "user");

    window.location.href = "user-dashboard.html";
    return false;
}
