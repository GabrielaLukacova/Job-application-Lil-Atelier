const clean = new URL(location.href);
for (const k of [...clean.searchParams.keys()]) if(k.startsWith('utm_')) clean.searchParams.delete(k);
if(clean.href!==location.href && location.protocol !== 'file:') history.replaceState(history.state,'',clean.href);
const photo=document.querySelector('#portrait');
function fallbackPhoto(){photo.hidden=true;document.querySelector('.portrait-fallback').hidden=false;}
photo.addEventListener('error',fallbackPhoto);
if(photo.complete&&!photo.naturalWidth) fallbackPhoto();
// Crop only the estimated transparent top 10% of the natural image height.
function framePhoto(){if(photo.naturalWidth){photo.style.marginTop=`-${10*photo.naturalHeight/photo.naturalWidth}%`;}}
photo.addEventListener('load',framePhoto);framePhoto();
for(const img of document.querySelectorAll('.work-image img')){
 const fallback=img.nextElementSibling;
 function update(){const ok=img.naturalWidth>0;img.hidden=!ok;fallback.hidden=ok;}
 img.addEventListener('load',update);img.addEventListener('error',update);if(img.complete)update();
}
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('enter');io.unobserve(e.target);}}, {threshold:.15});document.querySelectorAll('.why-title,.strength-grid article,.work-item').forEach(e=>io.observe(e));}

if ('IntersectionObserver' in window) {
 const links = [...document.querySelectorAll('nav a')];
 const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
 const update = () => { const y = document.querySelector('.header').offsetHeight + 40; let current = sections.filter(s => s.getBoundingClientRect().top <= y).pop(); if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections[sections.length-1]; links.forEach(a => { if(current && a.hash === '#' + current.id) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); }); };
 window.addEventListener('scroll', update, {passive:true}); window.addEventListener('resize',update); update();
}

/* Scroll-to-top button and portrait framing */
(() => {
    const topButton = document.querySelector(".scroll-top");

    if (topButton) {
        const updateButton = () => {
            topButton.classList.toggle("visible", window.scrollY > 450);
        };

        window.addEventListener("scroll", updateButton, {
            passive: true
        });

        topButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"
            });
        });

        updateButton();
    }

    const portraitImage = document.querySelector("#portrait");

    if (portraitImage) {
        const adjustPortrait = () => {
            if (portraitImage.naturalWidth) {
                portraitImage.style.marginTop =
                    `-${10 * portraitImage.naturalHeight /
                    portraitImage.naturalWidth}%`;
            }
        };

        portraitImage.addEventListener("load", adjustPortrait);
        adjustPortrait();
    }
})();
