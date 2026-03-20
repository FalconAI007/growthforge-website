// document ready
(function initMain() {

    // 1. Sticky Navbar Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }

    // 3. FAQ Accordion Logic
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Smoothly collapse/expand
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                // If single open per category rules apply, we can close others here
                // For a simpler approach, letting them open independently is often preferred,
                // but prompt says "Only one answer open at a time per category"
                
                const category = this.closest('.faq-category');
                if (category) {
                    const activeBtns = category.querySelectorAll('.accordion-btn.active');
                    activeBtns.forEach(activeBtn => {
                        if (activeBtn !== this) {
                            activeBtn.classList.remove('active');
                            activeBtn.nextElementSibling.style.maxHeight = null;
                        }
                    });
                }
                
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 4. Contact Form Submission simulation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('fullName').value.split(' ')[0] || 'there';
            
            const formContainer = contactForm.parentElement;
            formContainer.innerHTML = `
                <div style="background: var(--bg-grey); padding: 3rem 2rem; border-radius: 1rem; text-align: center; border: 1px solid var(--border-light);">
                    <div style="width: 64px; height: 64px; background: #D1FAE5; color: var(--success-green); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h3 style="margin-bottom: 0.5rem;">Thanks ${nameInput}!</h3>
                    <p style="margin-bottom: 0;">We've received your request. One of our strategists will reach out within 24 hours.</p>
                </div>
            `;
        });
    }

})();
