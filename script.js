// URAVTODOR Universal Script

document.addEventListener("DOMContentLoaded", () => {

    // Мобільне меню

    const menuBtn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");

    if (menuBtn && menu) {

        menuBtn.addEventListener("click", () => {
            menu.classList.toggle("active");
        });

        const navLinks = document.querySelectorAll("#menu a");

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("active");
            });
        });
    }

    // Плавний скрол

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

    // Анімація карток

    const cards = document.querySelectorAll(".card");

    if (cards.length > 0) {

        cards.forEach(card => {

            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "0.5s ease";

        });

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                }

            });

        });

        cards.forEach(card => observer.observe(card));

    }

    // Анімація статистики

    const stats = document.querySelectorAll(".stat h3");

    stats.forEach(stat => {

        const originalText = stat.textContent;
        const value = parseInt(originalText.replace(/\D/g, ""));

        if (!value) return;

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                let current = 0;

                const increment = Math.ceil(value / 80);

                const update = () => {

                    current += increment;

                    if (current >= value) {

                        stat.textContent = originalText;
                        return;

                    }

                    stat.textContent = current + "+";

                    requestAnimationFrame(update);

                };

                update();

                observer.unobserve(stat);

            });

        });

        observer.observe(stat);

    });

    // Активний пункт меню

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;
            const height = section.offsetHeight;

            if (pageYOffset >= top && pageYOffset < top + height) {
                current = section.getAttribute("id");
            }

        });

        document.querySelectorAll("nav a").forEach(link => {

            link.classList.remove("active-link");

            const href = link.getAttribute("href");

            if (href === "#" + current) {
                link.classList.add("active-link");
            }

        });

    });

});
