// ==========================
// 1. إعدادات الـ GSAP
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    // تسجيل الإضافة لتفعيل ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ==========================
    // 2. المتغيرات الرئيسية
    // ==========================
    const envelopeScreen = document.getElementById("envelope-screen");
    const mainContent = document.getElementById("main-content");
    const magicSound = document.querySelector("#magicSound");

    // إخفاء المحتوى الرئيسي عند البداية
    mainContent.style.display = "none";

    // ==========================
    // 3. فتح الظرف
    // ==========================
// Create magical sparkles
function createMagicSparkles(){

    const container = document.querySelector(".magic-sparkles");

    for(let i = 0; i < 50; i++){

        const sparkle = document.createElement("span");

        sparkle.style.left = "50%";
        sparkle.style.top = "50%";

        container.appendChild(sparkle);

        gsap.to(sparkle, {
            x: gsap.utils.random(-350, 350),
            y: gsap.utils.random(-350, 350),
            scale: gsap.utils.random(0.5, 2),
            rotation: gsap.utils.random(0, 360),
            opacity: 0,
            duration: gsap.utils.random(1, 1.8),
            ease: "power2.out",

            onComplete: () => {
                sparkle.remove();
            }
        });

    }
}


// Envelope opening

envelopeScreen.addEventListener("click", () => {

    const tl = gsap.timeline();


    tl
    // Wax seal disappears
    .to(".wax-seal", {
        scale: 0,
        rotation: 40,
        y: -80,
        opacity: 0,
        duration: 0.6,
        ease: "back.in(1.7)"
    })


    // Magic sound + sparkles
    .call(() => {

        const magicSound = document.getElementById("magicSound");

        if(magicSound){

            magicSound.volume = 0.5;
            magicSound.currentTime = 0;

            magicSound.play().catch(error => {
                console.log("Magic sound error:", error);
            });

        }


        createMagicSparkles();

    })


    // Envelope moves forward
    .to(".envelope-img", {
        scale: 1.15,
        y: -20,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2")


    // Opening feeling
    .to(".envelope-img", {
        rotationX: 15,
        duration: 0.5,
        ease: "power2.inOut"
    })


    // Soft glow
    .to("#envelope-screen", {
        backgroundColor: "#fff8e8",
        duration: 0.4,
        ease: "power2.out"
    })


    // Reveal invitation
    .to("#envelope-screen", {

        opacity: 0,

        filter: "blur(15px)",

        scale: 1.1,

        duration: 1.2,

        ease: "power3.inOut",


        onComplete: () => {


            envelopeScreen.style.display = "none";


            mainContent.style.display = "block";


            window.scrollTo(0,0);



            // Start wedding song
            const weddingSong = document.getElementById("weddingSong");


            if(weddingSong){

                weddingSong.volume = 0;

                weddingSong.play().catch(error => {
                    console.log("Wedding song error:", error);
                });


                gsap.to(weddingSong, {
                    volume: 0.35,
                    duration: 3
                });

            }



            startHeroAnimation();


        }

    });

});

    // ==========================
    // 4. دوال الحركات (Animations)
    // ==========================
    function startHeroAnimation() {
        gsap.from(".hero-text > *", {
            opacity: 0,
            y: 40,
            duration: 1.5,
            stagger: 0.3,
            ease: "power3.out"
        });
    }

    // حركة بطاقة الدعوة عند التمرير
    gsap.from(".invitation-wrapper", {
        scrollTrigger: {
            trigger: ".invitation-wrapper",
            start: "top 80%"
        },
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    });

    // حركة الأقسام عند التمرير
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%"
            },
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power2.out"
        });
    });

    // ==========================
    // 6. العد التنازلي
    // ==========================
    const weddingDate = new Date("July 23, 2026 14:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        document.getElementById("days").innerText = String(days).padStart(2, "0");
        document.getElementById("hours").innerText = String(hours).padStart(2, "0");
        document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
        document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});
