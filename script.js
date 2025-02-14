document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const themeToggle = document.getElementById("theme-toggle");
    
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "black";
        } else {
            navbar.style.background = "rgba(0, 0, 0, 0.7)";
        }
    });

    // Dark mode toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("dark-mode", isDarkMode);
        themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
    });

    // Load dark mode preference
    if (localStorage.getItem("dark-mode") === "true") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }
});
