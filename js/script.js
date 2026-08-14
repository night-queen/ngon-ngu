/* ==========================================================
   script.js — Ngôn ngữ trong nghệ thuật Tuồng
   - Scroll reveal (fade-in on enter viewport)
   - Floating scroll-to-top button
   - Footer "to-top" button
   - Smooth scrolling is handled by CSS (scroll-behavior)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initFloatingTop();
    initFooterTop();
});

/* ----------------------------------------------------------
   Reveal elements as they enter the viewport.
   Falls back to visible if IntersectionObserver is absent.
---------------------------------------------------------- */
function initScrollReveal(){
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)){
        els.forEach(el => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    els.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------
   Floating scroll-to-top button (created dynamically so the
   markup stays clean). Appears after scrolling a full screen.
---------------------------------------------------------- */
function initFloatingTop(){
    const btn = document.createElement("button");
    btn.className = "float-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Lên đầu trang");
    btn.innerHTML = '<svg class="ico" aria-hidden="true"><use href="#i-arrow-up"/></svg>';
    document.body.appendChild(btn);

    btn.addEventListener("click", scrollToTop);

    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            btn.classList.toggle("show", window.scrollY > window.innerHeight * 0.9);
            ticking = false;
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

/* ----------------------------------------------------------
   Footer "to-top" button in the footer bar.
---------------------------------------------------------- */
function initFooterTop(){
    const btn = document.querySelector(".to-top");
    if (!btn) return;
    btn.addEventListener("click", scrollToTop);
}

/* ---------------------------------------------------------- */
function scrollToTop(){
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
