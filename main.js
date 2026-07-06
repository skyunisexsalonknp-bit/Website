// Toggle logic for full-screen responsive mobile navigation overlay
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        setTimeout(() => {
            menu.classList.remove('opacity-0');
            menu.classList.add('opacity-100');
        }, 10);
    } else {
        menu.classList.remove('opacity-100');
        menu.classList.add('opacity-0');
        setTimeout(() => {
            menu.classList.add('hidden');
        }, 500);
    }
}

// Interactivity script to let users locally download a simple text copy of the rate list
function downloadRateList() {
    const textMenu = `
SKY UNISEX SALON — SERVICE MENU
Kanpur · Mon–Sun · 10 AM – 10 PM

HAIR ARTISTRY
------------------------------------------
Signature Haircut · Women       ₹ 900
Precision Cut · Men             ₹ 500
Hair Wash & Blow Dry            ₹ 450
Ironing / Tonging               ₹ 800

SKIN THERAPIES
------------------------------------------
Sky Signature Facial            ₹ 1,800
Vitamin C Radiance Facial       ₹ 2,200
24k Gold Ceremony               ₹ 3,350
Hydra Clean-up                  ₹ 900
    `;
    const blob = new Blob([textMenu.trim()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sky-unisex-salon-rate-list.txt";
    a.click();
    URL.revokeObjectURL(url);
}

// Compiles submission data into a pre-composed deep link directly opening WhatsApp
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('formName').value;
    const phone = document.getElementById('formPhone').value;
    const message = document.getElementById('formMessage').value || "I'd like to book an appointment.";
    
    const structuredText = `Hi Sky Unisex Salon,\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    const targetUrl = `https://wa.me/918707268973?text=${encodeURIComponent(structuredText)}`;
    
    window.open(targetUrl, '_blank');
}