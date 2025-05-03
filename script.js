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
        ticketPreview.innerHTML = '';

        const ticketDiv = document.createElement('div');
        ticketDiv.classList.add('generated-ticket');

        const eventInfo = document.createElement('div');
        eventInfo.classList.add('event-info');
        const eventName = document.createElement('h3');
        eventName.textContent = 'Coding Conf';
        eventInfo.appendChild(eventName);
        ticketDiv.appendChild(eventInfo);

        const eventDetails = document.createElement('p');
        eventDetails.classList.add('event-details');
        eventDetails.textContent = 'Jan 31, 2025 / Kampala, Uganda'; // Updated location
        ticketDiv.appendChild(eventDetails);

        if (avatarFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const avatarContainer = document.createElement('div');
                avatarContainer.classList.add('avatar-container');
                const avatarImg = document.createElement('img');
                avatarImg.src = event.target.result;
                avatarImg.alt = 'User Avatar';
                avatarContainer.appendChild(avatarImg);
                ticketDiv.appendChild(avatarContainer);

                const nameElement = document.createElement('p');
                nameElement.classList.add('user-name');
                nameElement.textContent = name;
                ticketDiv.appendChild(nameElement);

                const handleElement = document.createElement('p');
                handleElement.classList.add('user-handle');
                handleElement.textContent = `@${github}`;
                ticketDiv.appendChild(handleElement);

                ticketPreview.appendChild(ticketDiv);
            };
            reader.readAsDataURL(avatarFile);
        } else {
            const nameElement = document.createElement('p');
            nameElement.classList.add('user-name');
            nameElement.textContent = name;
            ticketDiv.appendChild(nameElement);

            const handleElement = document.createElement('p');
            handleElement.classList.add('user-handle');
            handleElement.textContent = `@${github}`;
            ticketDiv.appendChild(handleElement);

            ticketPreview.appendChild(ticketDiv);
        }

        const ticketNumber = document.createElement('p');
        ticketNumber.classList.add('ticket-number');
        ticketNumber.textContent = `#${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`; // Basic random ticket number
        ticketDiv.appendChild(ticketNumber);
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