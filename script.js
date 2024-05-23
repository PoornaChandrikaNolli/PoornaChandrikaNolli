document.addEventListener('DOMContentLoaded', function () {
    // Form validation with XSS protection
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let name = document.getElementById('name').value.trim();
        let email = document.getElementById('email').value.trim();
        let dropdownValue = document.getElementById('dropdownValue').value;
        let errorMessage = document.getElementById('error-message');

        if (!name) {
            errorMessage.textContent = 'Name is required.';
            return;
        } else if (!validateEmail(email)) {
            errorMessage.textContent = 'Please enter a valid email.';
            return;
        } else if (!dropdownValue) {
            errorMessage.textContent = 'Please select an option from the dropdown.';
            return;
        } else {
            errorMessage.textContent = '';
            alert(`Form submitted successfully! Name: ${sanitizeHTML(name)}, Email: ${sanitizeHTML(email)}, Option: ${sanitizeHTML(dropdownValue)}`);
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Dropdown menu functionality
    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const value = event.target.getAttribute('data-value');
            document.getElementById('dropdownValue').value = value;
            document.querySelector('.dropbtn').textContent = value;
        });
    });

    // Dynamic content update
    document.getElementById('addTextbox').addEventListener('click', function() {
        const textboxContainer = document.getElementById('textboxContainer');
        const textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.name = 'dynamicTextbox';
        textbox.placeholder = 'Enter additional text';
        textboxContainer.appendChild(textbox);
    });
});
