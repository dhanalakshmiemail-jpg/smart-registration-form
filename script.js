// Get HTML elements
const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const bioInput = document.getElementById("bio");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const bioError = document.getElementById("bioError");

const charCounter = document.getElementById("charCounter");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

// Validation functions

function validateName() {
    const name = nameInput.value.trim();

    if (name === "") {
        nameError.textContent = "Please enter your full name.";
        setInvalid(nameInput);
        return false;
    }

    nameError.textContent = "";
    setValid(nameInput);
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Email address is required.";
        setInvalid(emailInput);
        return false;
    }

    if (!emailPattern.test(email)) {
        emailError.textContent =
            "Please enter a valid email address.";
        setInvalid(emailInput);
        return false;
    }

    emailError.textContent = "";
    setValid(emailInput);
    return true;
}

function validatePassword() {
    const password = passwordInput.value;

    if (password.length === 0) {
        passwordError.textContent = "Password is required.";
        setInvalid(passwordInput);
        return false;
    }

    if (password.length < 6) {
        passwordError.textContent =
            "Password must contain at least 6 characters.";
        setInvalid(passwordInput);
        return false;
    }

    passwordError.textContent = "";
    setValid(passwordInput);
    return true;
}

function validateBio() {
    const bio = bioInput.value.trim();

    if (bio === "") {
        bioError.textContent = "Please write a short bio.";
        setInvalid(bioInput);
        return false;
    }

    if (bioInput.value.length > 200) {
        bioError.textContent =
            "Your bio cannot exceed 200 characters.";
        setInvalid(bioInput);
        return false;
    }

    bioError.textContent = "";
    setValid(bioInput);
    return true;
}

// Apply validation styles

function setInvalid(input) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    input.setAttribute("aria-invalid", "true");
}

function setValid(input) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    input.setAttribute("aria-invalid", "false");
}

// Update the character counter

function updateCharacterCounter() {
    const length = bioInput.value.length;

    charCounter.textContent = `${length} / 200 characters`;

    charCounter.classList.remove("near-limit", "at-limit");

    if (length >= 200) {
        charCounter.classList.add("at-limit");
    } else if (length >= 160) {
        charCounter.classList.add("near-limit");
    }
}

// Check whether every field is valid

function updateSubmitButton() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isBioValid = validateBio();

    submitBtn.disabled = !(
        isNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isBioValid
    );
}

// Real-time input events

nameInput.addEventListener("input", function () {
    validateName();
    updateSubmitButton();
    hideSuccessMessage();
});

emailInput.addEventListener("input", function () {
    validateEmail();
    updateSubmitButton();
    hideSuccessMessage();
});

passwordInput.addEventListener("input", function () {
    validatePassword();
    updateSubmitButton();
    hideSuccessMessage();
});

bioInput.addEventListener("input", function () {
    updateCharacterCounter();
    validateBio();
    updateSubmitButton();
    hideSuccessMessage();
});

// Hide the previous success message when editing

function hideSuccessMessage() {
    successMessage.hidden = true;
}

// Handle form submission

form.addEventListener("submit", function (event) {
    event.preventDefault();

    updateSubmitButton();

    if (submitBtn.disabled) {
        return;
    }

    const userName = nameInput.value.trim();

    successMessage.textContent =
        `Registration successful! Welcome, ${userName}.`;

    successMessage.hidden = false;

    // Keep the form visible so the success message can be read.
});

// Initial setup

updateCharacterCounter();
updateSubmitButton();