document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticket-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const avatarInput = document.getElementById('avatar');
    const ticketPreview = document.getElementById('ticket-preview');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const avatarError = document.getElementById('avatar-error');

    ticketForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        avatarError.textContent = '';

        // Perform validation
        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isAvatarValid = validateAvatar(avatarInput);

        if (isNameValid && isEmailValid && isAvatarValid) {
            // Generate the ticket
            generateTicket(nameInput.value, emailInput.value, avatarInput.files[0]);
        }
    });

    function validateName(name) {
        if (!name.trim()) {
            nameError.textContent = 'Please enter your name.';
            return false;
        }
        return true;
    }

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

    function validateAvatar(avatarInput) {
        const file = avatarInput.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Example allowed types
            const maxSizeMB = 2; // Example max size in MB
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
        return true; // Avatar is optional, so no file is also valid
    }

    function generateTicket(name, email, avatarFile) {
        ticketPreview.innerHTML = ''; // Clear any previous ticket

        const ticketDiv = document.createElement('div');
        ticketDiv.classList.add('generated-ticket');

        const nameElement = document.createElement('p');
        nameElement.classList.add('ticket-info');
        nameElement.innerHTML = `<strong>Name:</strong> ${name}`;

        const emailElement = document.createElement('p');
        emailElement.classList.add('ticket-info');
        emailElement.innerHTML = `<strong>Email:</strong> ${email}`;

        ticketDiv.appendChild(nameElement);
        ticketDiv.appendChild(emailElement);

        if (avatarFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const avatarContainer = document.createElement('div');
                avatarContainer.classList.add('avatar-container');
                const avatarImg = document.createElement('img');
                avatarImg.src = event.target.result;
                avatarImg.alt = 'User Avatar';
                avatarContainer.appendChild(avatarImg);
                ticketDiv.prepend(avatarContainer); // Add avatar at the top of the ticket
                ticketPreview.appendChild(ticketDiv);
            };
            reader.readAsDataURL(avatarFile);
        } else {
            ticketPreview.appendChild(ticketDiv);
        }
    }
});