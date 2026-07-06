/* Sky Unisex Salon — shared interactions */

// ---- CONFIG: update these two lines with the salon's real details ----
const WHATSAPP_NUMBER = "919876543210"; // TODO: replace with Sky Unisex Salon's real WhatsApp Business number (country code + number, no + or spaces)
const MAPS_QUERY = "Sky Unisex Salon, Kanpur"; // TODO: replace with exact address once confirmed

function waLink(message){
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

document.addEventListener("DOMContentLoaded", () => {

  // ---- Populate every WhatsApp CTA on the page ----
  document.querySelectorAll("[data-wa]").forEach(el => {
    const msg = el.getAttribute("data-wa") || "Hi Sky Unisex Salon, I'd like to book an appointment.";
    el.setAttribute("href", waLink(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // ---- Maps link ----
  document.querySelectorAll("[data-maps]").forEach(el => {
    el.setAttribute("href", `https://www.google.com/maps/search/${encodeURIComponent(MAPS_QUERY)}`);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // ---- Mobile menu ----
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".mobile-overlay");
  if (hamburger && overlay){
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("is-open");
      overlay.classList.toggle("is-open");
      document.body.style.overflow = overlay.classList.contains("is-open") ? "hidden" : "";
    });
    overlay.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      hamburger.classList.remove("is-open");
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }));
  }

  // ---- Active nav link (by current filename) ----
  const current = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a, .mobile-overlay a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")){
      a.classList.add("active");
    }
  });

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll(".reveal, .horizon");
  if ("IntersectionObserver" in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in-view"));
  }

  // ---- Service-menu tabs ----
  const tabButtons = document.querySelectorAll(".tab-btn");
  if (tabButtons.length){
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".rate-panel").forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab)?.classList.add("active");
      });
    });
  }

  // ---- Gallery filter chips ----
  const chips = document.querySelectorAll(".chip");
  if (chips.length){
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const cat = chip.dataset.filter;
        document.querySelectorAll(".masonry-item").forEach(item => {
          const match = cat === "all" || item.dataset.category === cat;
          item.classList.toggle("show", match);
        });
      });
    });
  }

  // ---- Quick query form -> WhatsApp ----
  const qform = document.querySelector(".qform");
  if (qform){
    qform.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = qform.querySelector("#qname")?.value.trim() || "";
      const service = qform.querySelector("#qservice")?.value.trim() || "";
      const message = qform.querySelector("#qmessage")?.value.trim() || "";
      let text = `Hi Sky Unisex Salon, my name is ${name || "[name]"}.`;
      if (service) text += ` I'm interested in: ${service}.`;
      if (message) text += ` ${message}`;
      window.open(waLink(text), "_blank", "noopener");
    });
  }

  // ---- Rate list "Download" -> print ----
  document.querySelectorAll("[data-print]").forEach(btn => {
    btn.addEventListener("click", () => window.print());
  });

});
