window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    header.style.boxShadow = window.scrollY > 10 ? 
        "0 2px 10px rgba(0,0,0,0.3)" : "none";
});


// === SMOOTH SCROLL TANPA UBAH HTML ===
// Link dinyatakan sebagai anchor (#section)
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetID = this.getAttribute('href');
        const target = document.querySelector(targetID);
        if (!target) return;

        // Jika header kamu fixed, otomatis dihitung
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;

        // Hitung posisi scroll
        const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        // Lakukan smooth scroll
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    });
});

// Pop up Gambar and swipe 


const items = [...document.querySelectorAll(".lb-item")]; 
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbPrev = document.getElementById("lb-prev");
const lbNext = document.getElementById("lb-next");
const lbClose = document.getElementById("lb-close");
let index = 0;

// OPEN LIGHTBOX
items.forEach((img, i) => {
    img.addEventListener("click", () => {
        index = i;
        showImage();
        lightbox.classList.remove("hidden");
    });
});

// SHOW SELECTED IMAGE
function showImage() {
    lbImg.src = items[index].src;
    lbImg.style.transform = "scale(1)";
    lbImg.classList.remove("zoomed");
}

// NAVIGATION
lbNext.onclick = () => {
    index = (index + 1) % items.length;
    showImage();
};

lbPrev.onclick = () => {
    index = (index - 1 + items.length) % items.length;
    showImage();
};

// CLOSE
lbClose.onclick = () => lightbox.classList.add("hidden");
lightbox.onclick = e => {
    if (e.target.id === "lb-bg") lightbox.classList.add("hidden");
};

// KEYBOARD NAVIGATION
document.addEventListener("keydown", e => {
    if (lightbox.classList.contains("hidden")) return;

    if (e.key === "ArrowRight") lbNext.click();
    if (e.key === "ArrowLeft") lbPrev.click();
    if (e.key === "Escape") lbClose.click();
});

// ZOOM ON CLICK
lbImg.addEventListener("click", () => {
    if (lbImg.classList.contains("zoomed")) {
        lbImg.style.transform = "scale(1)";
        lbImg.classList.remove("zoomed");
    } else {
        lbImg.style.transform = "scale(2)";
        lbImg.classList.add("zoomed");
    }
});

// SWIPE SUPPORT (Mobile)
let touchStartX = 0;
lbImg.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
});

lbImg.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    let diff = touchStartX - endX;

    if (diff > 50) lbNext.click();     // swipe left
    if (diff < -50) lbPrev.click();    // swipe right
});


