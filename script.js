document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticket-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const githubInput = document.getElementById('github');
    const avatarInput = document.getElementById('avatar');
    const ticketSection = document.querySelector('.ticket-section');
    const ticketPreview = document.getElementById('ticket-preview');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const avatarError = document.getElementById('avatar-error');
    const githubError = document.getElementById('github-error');
    const congratsMessage = document.querySelector('.congrats-message');
    const userEmailSpan = document.getElementById('user-email');
    const ticketAvatarImg = document.getElementById('ticket-avatar');
    const userNameTicket = document.querySelector('.user-name-ticket');
    const userHandleTicket = document.querySelector('.user-handle-ticket');
    const ticketNumberDisplay = document.getElementById('ticket-number');

    // Function to validate name
    function validateName(name) {
        if (!name.trim()) {
            nameError.textContent = 'Please enter your full name.';
            return false;
        }
        return true;
    }

    // Function to validate email
    function validateEmail(email) {
        if (!email.trim()) {
            emailError.textContent = 'Please enter your email address.';
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address.';
            return false;
        }
        return true;
    }

    // Function to validate avatar
    function validateAvatar(avatarInput) {
        const file = avatarInput.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSizeMB = 2;
            const maxSizeKB = maxSizeMB * 1024;

            if (!allowedTypes.includes(file.type)) {
                avatarError.textContent = 'Please upload a valid image file (JPEG, PNG, GIF).';
                return false;
            }

            if (file.size > maxSizeKB * 1024) {
                avatarError.textContent = `Image size must be less than ${maxSizeMB}MB.`;
                return false;
            }
        }
        return true; // Avatar is optional
    }

    // Function to generate the ticket preview
    function generateTicket(name, email, github, avatarFile) {
        congratsMessage.textContent = `Congrats, ${name}! Your ticket is ready.`;
        userEmailSpan.textContent = email;
        userNameTicket.textContent = name;
        userHandleTicket.textContent = `@${github}`;
        ticketNumberDisplay.textContent = `#${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

        if (avatarFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                ticketAvatarImg.src = event.target.result;
                ticketAvatarImg.style.display = 'block'; // Ensure image is visible
            };
            reader.readAsDataURL(avatarFile);
        } else {
            ticketAvatarImg.style.display = 'none'; // Hide avatar if no file
            ticketAvatarImg.src = '';
        }
    }

    // Event listener for form submission
    ticketForm.addEventListener('submit', (event) => {
        event.preventDefault();

        nameError.textContent = '';
        emailError.textContent = '';
        avatarError.textContent = '';
        githubError.textContent = '';

        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isAvatarValid = validateAvatar(avatarInput);
        const isGithubValid = true; // Basic validation for now

        if (isNameValid && isEmailValid && isAvatarValid && isGithubValid) {
            generateTicket(nameInput.value, emailInput.value, githubInput.value, avatarInput.files[0]);
            ticketSection.style.display = 'block';
            // Scroll to the ticket section
            ticketSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Basic handling for the upload area click to trigger file input
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('avatar');

    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                // You could add some visual feedback here to show a file has been selected
            }
        });
    }
});