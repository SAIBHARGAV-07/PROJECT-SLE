/* CUSTOM MODAL ALERT */
function showModal(message) {
    // Remove existing modal if present
    const existingModal = document.getElementById("customModal");
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement("div");
    modal.id = "customModal";
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-box">
                <p>${message}</p>
                <button onclick="closeModal()">OK</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Add event listener for Enter key
    document.addEventListener("keypress", function(e) {
        if (e.key === "Enter" && modal.parentElement) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById("customModal");
    if (modal) {
        modal.remove();
    }
}
