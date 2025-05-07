const inputs = document.querySelectorAll('.otp-input');

    // Move focus to next input field after typing a number
    inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
        inputs[index - 1].focus();
        }
    });
    });

    // Handle paste event to split the pasted text into individual input fields
    document.querySelector('.otp-input').addEventListener('paste', (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const otpArray = paste.split('').slice(0, inputs.length);

    inputs.forEach((input, index) => {
        input.value = otpArray[index] || '';
    });

    // Focus the next available input
    let nextEmptyIndex = otpArray.length;
    while (nextEmptyIndex < inputs.length && otpArray[nextEmptyIndex]) {
        nextEmptyIndex++;
    }

    if (nextEmptyIndex < inputs.length) {
        inputs[nextEmptyIndex].focus();
    }
    });

    // Handle OTP submission
    document.getElementById('submitOtp').addEventListener('click', () => {
    const otp = Array.from(inputs).map(input => input.value).join('');
    const result = document.getElementById('result');
    if (otp.length === 6) {
        result.textContent = `Submitted OTP: ${otp}`;
        result.classList.remove('hidden');
    } else {
        result.textContent = 'Please enter a valid 6-digit OTP';
        result.classList.remove('hidden');
        result.classList.replace('text-green-600', 'text-red-600');
    }
});