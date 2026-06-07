export function initNavbar() {

    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("navbarMenu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

}