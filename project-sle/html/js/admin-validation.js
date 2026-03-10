function validateCaptchaAdmin() {
    const userCaptcha = document.getElementById("captchaInput").value.trim().toUpperCase();
    if (userCaptcha !== captchaText.toUpperCase()) {
        showModal("❌ Captcha incorrect. Try again!");
        generateCaptcha();
        return false;
    }
    return true;
}

function validateAdminForm() {
    // First validate captcha
    if (!validateCaptchaAdmin()) {
        return false;
    }

    // Validate age
    const ageField = document.getElementById("age");
    const age = parseInt(ageField.value);

    if (isNaN(age)) {
        showModal("⚠️ Please select Date of Birth to calculate age.");
        return false;
    }

    if (age < 21) {
        showModal("❌ Admin must be at least 21 years old.");
        return false;
    }

    // Registration successful
    showModal("✅ Admin Registration successful! Redirecting to login page...");
    setTimeout(function() {
        window.location.href = "admin-login.html";
    }, 1500);
    
    return false;
}
