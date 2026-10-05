document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('regForm');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const pass = document.getElementById('pass');
    const confirm = document.getElementById('confirm');
    const counter = document.getElementById('counter');

    const fields = [name, email, pass, confirm];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;

    function setError(input, msg) {
        const errDiv = document.getElementById(`${input.id}-err`);
        errDiv.textContent = msg;
        input.classList.add('invalid');
        input.classList.remove('valid');
    }

    function clearError(input) {
        const errDiv = document.getElementById(`${input.id}-err`);
        errDiv.textContent = '';
        input.classList.remove('invalid');
        input.classList.add('valid');
    }

    function validate(input) {
        const val = input.value.trim();

        if (val === '') {
            setError(input, 'Field is required');
            return false;
        }

        if (input === name && val.length < 2) {
            setError(input, 'Minimum 2 characters required');
            return false;
        }

        if (input === email && !emailRegex.test(val)) {
            setError(input, 'Invalid email address');
            return false;
        }

        if (input === pass && val.length < 6) {
            setError(input, 'Minimum 6 characters required');
            return false;
        }

        if (input === confirm && val !== pass.value.trim()) {
            setError(input, 'Passwords do not match');
            return false;
        }

        clearError(input);
        return true;
    }

    fields.forEach(input => {
        input.addEventListener('blur', () => {
            validate(input);
        });

        input.addEventListener('focus', () => {
            input.classList.remove('invalid');
        });
    });

    form.addEventListener('input', () => {
        let count = 0;
        fields.forEach(input => {
            if (input.value.trim() !== '') {
                count++;
            }
        });
        counter.textContent = count;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        fields.forEach(input => {
            if (!validate(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('Success');
            form.reset();
            counter.textContent = '0';
            fields.forEach(input => input.classList.remove('valid'));
        }
    });
});
