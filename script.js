var sidemen = document.getElementById("sidemenu");
function openmenu() {
    sidemen.style.right = "0";
}
function closemenu() {
    sidemen.style.right = "-200px";
}

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

document.addEventListener('DOMContentLoaded', function () {
    var socialIcons = document.querySelector('.social-icons-side');
    var closeIcon = document.querySelector('.close-icon');
    var expandIcon = document.querySelector('.expand-icon');

    document.querySelector('.close-icon').addEventListener('click', function () {
        socialIcons.style.transition = 'transform 0.8s ease';
        socialIcons.style.transform = 'translateX(-40px)';
        closeIcon.style.display = 'none';
        expandIcon.style.display = 'block';
        setTimeout(function () {
            socialIcons.style.display = 'none';
        }, 400);
    });

    document.querySelector('.expand-icon').addEventListener('click', function () {
        socialIcons.style.transition = 'transform 0.8s ease-in';
        socialIcons.style.transform = 'translateX(0px)';
        expandIcon.style.display = 'none';
        socialIcons.style.display = 'block';
        closeIcon.style.display = 'block';
    });

    // Contact form submission
    const contactForm = document.getElementById("contact-form");
    const notification = document.getElementById("notification");
    const closeNotification = document.getElementById("close-notification");
    const notificationSound = new Audio("Notification.mp3");
    const contactWebhookURL = 'https://meowmeowmeowmewo.app.n8n.cloud/webhook-test/ab3adf51-5cf2-4403-952f-d7e48459b2ac'; // Webhook URL preserved

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("Name");
        const email = formData.get("email");
        const message = formData.get("Message");

        // Send data to contact webhook
        fetch(contactWebhookURL, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log("Contact data sent to webhook successfully!");
                notificationSound.play();
                notification.style.display = "block";
                setTimeout(() => {
                    notification.style.display = "none";
                }, 3000);
                contactForm.reset();
            } else {
                console.error("Failed to send contact data to webhook:", response);
                alert("Failed to send message. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Error sending contact data to webhook:", error);
            alert("Failed to send message. Please try again later.");
        });
    });

    // Feedback form submission
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackWebhookURL = 'https://meowmeowmeowmewo.app.n8n.cloud/webhook-test/7f5926fe-8404-4364-b320-4b770153ff1c'; // Webhook URL preserved

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(feedbackForm);
            const name = formData.get("Name");
            const opinion = formData.get("Opinion");

            // Send data to feedback webhook
            fetch(feedbackWebhookURL, {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    opinion: opinion,
                    timestamp: new Date().toISOString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log("Feedback data sent to webhook successfully!");
                    notification.style.display = "block";
                    setTimeout(() => {
                        notification.style.display = "none";
                    }, 3000);
                    feedbackForm.reset();
                } else {
                    console.error("Failed to send feedback data to webhook:", response);
                    alert("Failed to send feedback. Please try again later.");
                }
            })
            .catch(error => {
                console.error("Error sending feedback data to webhook:", error);
                alert("Failed to send feedback. Please try again later.");
            });
        });
    }

    closeNotification.addEventListener("click", function () {
        notification.style.display = "none";
    });

    // Scroll to top
    window.addEventListener("scroll", function () {
        var scrollToTop = document.getElementById("scrollToTop");
        if (window.scrollY > 1000) {
            scrollToTop.classList.add("visible");
        } else {
            scrollToTop.classList.remove("visible");
        }
    });

    // Click effect
    function clickEffect(e) {
        var d = document.createElement("div");
        d.className = "clickEffect";
        d.style.top = e.clientY + "px";
        d.style.left = e.clientX + "px";
        document.body.appendChild(d);
        d.addEventListener('animationend', function () {
            d.parentElement.removeChild(d);
        }.bind(this));
    }
    document.addEventListener('click', clickEffect);

    // Feedback button visibility
    document.addEventListener('scroll', function() {
        const feedbackBtn = document.getElementById('feedbackBtn');
        const copyrightSection = document.querySelector('.copyright');
        const rect = copyrightSection.getBoundingClientRect();

        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            feedbackBtn.classList.add('hidden');
        } else {
            feedbackBtn.classList.remove('hidden');
        }
    });

    // ScrollReveal configuration
    ScrollReveal({
        reset: true,
        distance: '95px',
        duration: 1500,
        delay: 250,
        viewFactor: 0.15
    });

    const revealConfig = {
        origin: 'bottom',
        scale: 0.5,
        interval: 200
    };

    ScrollReveal().reveal('.logo, #sidemenu, .header-text', { origin: 'top', reset: false });
    ScrollReveal().reveal('.about-col-1', { origin: 'bottom' });
    ScrollReveal().reveal('.about-col-2', { origin: 'bottom' });
    ScrollReveal().reveal('.sub-title, .services-list', revealConfig);
    ScrollReveal().reveal('.sub-title, .work-list, .btn', revealConfig);
    ScrollReveal().reveal('.gallery-about', { origin: 'bottom' });
    ScrollReveal().reveal('.gallery', { origin: 'left', interval: 150 });
    ScrollReveal().reveal('.sub-title, .contact-left, .contact-right', revealConfig);
    ScrollReveal().reveal('.copyright', { origin: 'bottom' });
    ScrollReveal().reveal('.header-img', { scale: 1.7 });
    ScrollReveal().reveal('.tab-links', { origin: 'bottom', interval: 100 });
    ScrollReveal().reveal('.hire-description', { delay: 400 });
    ScrollReveal().reveal('.h1-head, .h6-head, .header-img', { delay: 3050, reset: true, useDelay: 'onload' });
    ScrollReveal().reveal('.project-title, .service-title, .description-about, .skills-title, .contact-title, .gallery-title, .education-title, hr, .hire-title', { origin: 'top' });
    ScrollReveal().reveal('.img-about, .h6-head, .description-hire-button, .email, .gallery-img', { origin: 'right' });
    ScrollReveal().reveal('.srvc, .text, .edc', { origin: 'bottom' });
    ScrollReveal().reveal('.h1-head, .hire-description, .name, .gallery-about', { origin: 'left' });
    ScrollReveal().reveal('.header-img', { scale: 1.7 });
    ScrollReveal().reveal('.prjct', { scale: 0.5, duration: 1500, interval: 200 });
    ScrollReveal().reveal('.srvc', { interval: 150 });
    ScrollReveal().reveal('.hire-description', { delay: 400 });
    ScrollReveal().reveal('.h1-head, .h6-head, .header-img', { delay: 3050, reset: true, useDelay: 'onload' });
    ScrollReveal().reveal('.header-image img', {
        duration: 2500,
        scale: 0.5,
        rotate: { x: 0, y: 180, z: 0 },
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: true
    });
});