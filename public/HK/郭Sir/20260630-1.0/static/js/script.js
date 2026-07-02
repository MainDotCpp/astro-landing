// Modal Functionality

function openModal(modalId) {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-' + modalId);
    
    if (overlay && modal) {
        overlay.style.display = 'block';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    const modals = document.querySelectorAll('.modal');
    
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

