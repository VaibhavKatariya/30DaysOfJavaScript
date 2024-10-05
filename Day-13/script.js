const passwordInput = document.getElementById('password');
const strengthOutput = document.getElementById('strength-level');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = 'Weak';

    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[\W]/.test(password)) {
        strength = 'Strong';
    } else if (password.length >= 6 && (/[A-Z]/.test(password) || /[0-9]/.test(password) || /[\W]/.test(password))) {
        strength = 'Medium';
    }

    strengthOutput.textContent = strength;
});
