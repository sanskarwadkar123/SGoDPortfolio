(() => {
    "use strict";

    // Mobile navigation
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#primary-nav");

    if (menuButton && navigation) {
        const closeMenu = () => {
            navigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
        };

        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("is-open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navigation.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) closeMenu();
        });
    }

    // Automatic copyright year
    const year = document.querySelector("#current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Statistics image fallback
    document.querySelectorAll(
        ".stats-visual img[data-fallback-src]"
    ).forEach(image => {

        let fallbackAttempted = false;

        image.addEventListener("error", () => {
            if (!fallbackAttempted) {
                fallbackAttempted = true;
                image.src = image.dataset.fallbackSrc;
                return;
            }

            image.hidden = true;

            const fallback =
                image.parentElement.querySelector(".stats-fallback");

            if (fallback) {
                fallback.hidden = false;
            }
        });
    });

})();
