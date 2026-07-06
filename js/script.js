/* ==========================================================
   script.js — Premium Interactive Information Module
   Tuồng Việt Nam
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initAccordion();
    initScrollToTop();
});

/* ==========================================================
   Scroll Reveal (fade-in on enter viewport)
========================================================== */

function initScrollReveal() {
    const els = document.querySelectorAll(".fade-in");
    if (!els.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.12 }
    );

    els.forEach(el => observer.observe(el));
}

/* ==========================================================
   Quick-Reference Accordion
========================================================== */

function initAccordion() {
    const items = document.querySelectorAll(".acc-item");

    items.forEach(item => {
        const btn = item.querySelector(".acc-btn");
        const panel = item.querySelector(".acc-panel");
        if (!btn || !panel) return;

        btn.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            // close all others
            items.forEach(other => {
                if (other === item) return;
                other.classList.remove("open");
                const otherBtn = other.querySelector(".acc-btn");
                const otherPanel = other.querySelector(".acc-panel");
                if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
                if (otherPanel) otherPanel.style.maxHeight = "0";
            });

            // toggle current
            if (isOpen) {
                item.classList.remove("open");
                btn.setAttribute("aria-expanded", "false");
                panel.style.maxHeight = "0";
            } else {
                item.classList.add("open");
                btn.setAttribute("aria-expanded", "true");
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
}

/* ==========================================================
   Scroll To Top
========================================================== */

function initScrollToTop() {
    const btn = document.querySelector(".to-top");
    if (!btn) return;

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
