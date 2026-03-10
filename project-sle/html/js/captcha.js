let captchaText = "";

function generateCaptcha() {
    const canvas = document.getElementById("captchaCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0123456789";
    captchaText = "";

    for (let i = 0; i < 5; i++) {
        captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < captchaText.length; i++) {
        const fontSize = 24 + Math.random() * 6;
        const angle = (Math.random() - 0.5) * 0.6;

        ctx.save();
        ctx.font = fontSize + "px Arial";
        ctx.fillStyle = randomColor();
        ctx.translate(25 + i * 25, 32);
        ctx.rotate(angle);
        ctx.fillText(captchaText[i], 0, 0);
        ctx.restore();
    }

    for (let i = 0; i < 6; i++) {
        ctx.strokeStyle = randomColor();
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
}

function randomColor() {
    return `rgb(${rand()},${rand()},${rand()})`;
}

function rand() {
    return Math.floor(Math.random() * 150);
}

function validateCaptcha() {
    const userCaptcha = document.getElementById("captchaInput").value.trim().toUpperCase();
    if (userCaptcha !== captchaText.toUpperCase()) {
        showModal("❌ Captcha incorrect. Try again!");
        generateCaptcha();
        return false;
    }
    return true;
}

window.addEventListener('load', function() {
    const canvas = document.getElementById('captchaCanvas');
    if (canvas) {
        generateCaptcha();
    }
});
