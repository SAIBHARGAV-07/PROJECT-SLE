function adminLogin() {
    const adminId = document.getElementById("adminId").value;

    localStorage.setItem("username", adminId);
    localStorage.setItem("role", "admin");

    window.location.href = "admin-dashboard.html";
    return false;
}
