function calculateBMI() {
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    var heightInMeters = height / 100;

    var bmi = weight / (heightInMeters * heightInMeters);

    document.getElementById('bmi-result').textContent = bmi.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");
    const heroSection = document.getElementById("hero");

    function updateNavbar() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
            header.classList.remove("transparent");
        } else {
            if (heroSection) {
                header.classList.add("transparent");
                header.classList.remove("scrolled");
            } else {
                header.classList.add("scrolled");
            }
        }
    }

    updateNavbar();
    window.addEventListener("scroll", updateNavbar);
});
