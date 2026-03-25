/* CALCULATE AGE FROM DATE OF BIRTH */
function calculateAge() {
    const dob = document.getElementById("dob").value;
    if (!dob) return;
    
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const ageField = document.getElementById("age");
    if (ageField) {
        ageField.value = age;
    }
}

/* PASSWORD + CAPTCHA VALIDATION */
function validateForm() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let captchaInput = document.getElementById("captchaInput").value.trim().toUpperCase();

    if (password !== confirmPassword) {
        showModal("❌ Passwords do not match!");
        return false;
    }

    if (captchaInput !== captchaText.toUpperCase()) {
        showModal("❌ Captcha does not match!");
        generateCaptcha();
        return false;
    }

    // Registration successful
    showModal("✅ Registration successful! Redirecting to login page...");
    setTimeout(function() {
        window.location.href = "user-login.html";
    }, 1500);
    
    return false;
}
