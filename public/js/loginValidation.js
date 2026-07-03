document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.querySelector("input[name='name']");
    const emailInput = document.querySelector("input[name='email']");
    const passwordInput = document.querySelector("input[name='password']");

    form.addEventListener("submit", (event) => {
        let errors = [];

        // 1. Name Validation
        if (nameInput.value.trim() === "") {
            errors.push("Kindly enter you name!");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            errors.push("enter valid email..");
        }

        // 3. Password Validation
        if (passwordInput.value.length < 6) {
            errors.push("8 letter password");
        }

    
        if (errors.length > 0) {
            event.preventDefault(); // सर्वर पर जाने से रोकना
            alert(errors.join("\n")); // अलर्ट बॉक्स में एरर दिखाना
        }
    });
});