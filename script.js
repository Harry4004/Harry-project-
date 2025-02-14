document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const navbar = document.querySelector(".navbar");
    const themeToggle = document.getElementById("theme-toggle");
    const scrollProgress = document.querySelector(".scroll-progress");
    const form = document.querySelector("#contact-form");
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");
    const feedback = document.querySelector("#form-feedback");
    const backToTopButton = document.getElementById("back-to-top");
    const errorIcons = document.querySelectorAll(".error-icon");
    const submitButton = document.querySelector("#contact-form button");
    const loadingSpinner = document.querySelector(".loading-spinner");

    // Theme Toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLightTheme = document.body.classList.contains("light-theme");
        themeToggle.innerHTML = isLightTheme ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem("theme", isLightTheme ? "light" : "dark");
    });

    // Load Saved Theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Sticky Navbar
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("shrink");
        } else {
            navbar.classList.remove("shrink");
        }
    });

    // Smooth Scrolling
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Progress Bar
    window.addEventListener("scroll", () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });

    // Back to Top Button
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Real-Time Form Validation
    const validateForm = () => {
        let isValid = true;
        errorIcons.forEach(icon => icon.style.display = "none");

        if (nameInput.value.trim().length < 3) {
            isValid = false;
            nameInput.nextElementSibling.style.display = "block";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            isValid = false;
            emailInput.nextElementSibling.style.display = "block";
        }

        if (messageInput.value.trim() === "") {
            isValid = false;
            messageInput.nextElementSibling.style.display = "block";
        }

        return isValid;
    };

    // Form Submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        feedback.textContent = "";

        if (validateForm()) {
            submitButton.disabled = true;
            loadingSpinner.style.display = "block";
            submitButton.querySelector(".button-text").style.visibility = "hidden";

            // Simulate form submission
            setTimeout(() => {
                loadingSpinner.style.display = "none";
                submitButton.querySelector(".button-text").style.visibility = "visible";
                submitButton.disabled = false;

                feedback.innerHTML = '<span class="success">Form submitted successfully!</span>';
                localStorage.setItem("name", nameInput.value.trim());
                localStorage.setItem("email", emailInput.value.trim());
                localStorage.setItem("message", messageInput.value.trim());
                form.reset();
            }, 2000);
        } else {
            feedback.innerHTML = '<span class="error">Please fix the errors above.</span>';
        }
    });

    // Load Saved Form Data
    if (localStorage.getItem("name")) nameInput.value = localStorage.getItem("name");
    if (localStorage.getItem("email")) emailInput.value = localStorage.getItem("email");
    if (localStorage.getItem("message")) messageInput.value = localStorage.getItem("message");

    // Button Click Animation
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.95)";
        });
        button.addEventListener("mouseup", () => {
            button.style.transform = "scale(1)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });
});
