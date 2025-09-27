document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 100;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

function initSectionAnimations() {
    const sections = document.querySelectorAll('#about, #services, #tech-stack, #projects, #team');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('section-animated')) {
                entry.target.classList.add('section-animated');
                animateSection(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    checkVisibleSections();
    window.addEventListener('scroll', throttle(checkVisibleSections, 100));
}

function checkVisibleSections() {
    const sections = document.querySelectorAll('#about, #services, #tech-stack, #projects, #team');
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;

    sections.forEach(section => {
        if (!section.classList.contains('section-animated')) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop + windowHeight > sectionTop + 100) {
                section.classList.add('section-animated');
                animateSection(section);
            }
        }
    });
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function animateSection(section) {
    const sectionId = section.getAttribute('id');
    let elements = [];
    let baseDelay = 50; // milliseconds

    switch(sectionId) {
        case 'about':
            elements = section.querySelectorAll('.about-stats .stat-item');
            setTimeout(() => animateCounters(), 300);
            break;
        case 'services':
            elements = section.querySelectorAll('.service-card');
            baseDelay = 80;
            break;
        case 'tech-stack':
            const categories = section.querySelectorAll('.tech-category');
            categories.forEach((category, categoryIndex) => {
                const logos = category.querySelectorAll('.tech-logo');
                setTimeout(() => {
                    logos.forEach((logo, logoIndex) => {
                        setTimeout(() => {
                            if (!logo.classList.contains('animated')) {
                                logo.classList.add('animated');
                                logo.style.opacity = '1';
                                logo.style.transform = 'translateY(0) scale(1)';
                            }
                        }, logoIndex * 30);
                    });
                }, categoryIndex * 100);
            });
            return;
        case 'projects':
            elements = section.querySelectorAll('.project-card');
            baseDelay = 100;
            break;
        case 'team':
            elements = section.querySelectorAll('.team-member');
            baseDelay = 80;
            break;
    }

    elements.forEach((element, index) => {
        if (!element.classList.contains('animated')) {
            element.classList.add('animated');
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * baseDelay);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initSectionAnimations();
    loadProjects();
    loadTeam();
});

document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(contactForm)) {
            showFormMessage('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        const formData = new FormData(contactForm);
        const formValues = {
            from_name: formData.get('name').trim(),
            from_email: formData.get('email').trim(),
            company: formData.get('company').trim() || 'Not specified',
            service: formData.get('service'),
            message: formData.get('message').trim()
        };

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email via C# API backend
        console.log('Sending email via C# API...');
        
        // Use environment variable for API URL or fallback to localhost for development
        const apiUrl = window.CONTACT_API_URL || 'http://localhost:5000';
        
        fetch(`${apiUrl}/api/contact/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                name: formValues.from_name,
                email: formValues.from_email,
                company: formValues.company,
                service: formValues.service,
                message: formValues.message
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Email response:', data);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            if (data.success) {
                showFormMessage(data.message, 'success');
                contactForm.reset();
            } else {
                showFormMessage(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('API request failed:', error);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly at contact@aetherion.com', 'error');
        });
    });

    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#ededed';
            }

            if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value.trim())) {
                    field.style.borderColor = '#e74c3c';
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

function initAnimationStyles() {
    const elements = document.querySelectorAll('.service-card, .project-card, .team-member, .tech-logo, .stat-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const techLogos = document.querySelectorAll('.tech-logo');
    techLogos.forEach(logo => {
        logo.style.transform = 'translateY(20px) scale(0.9)';
        logo.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initAnimationStyles();
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            const navbar = document.querySelector('.navbar');
            if (aboutSection && navbar) {
                const offsetTop = aboutSection.offsetTop - navbar.offsetHeight - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (!window.matchMedia('(hover: none)').matches) {
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.01)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                this.style.animation = 'pulse 0.4s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 400);
            });
        });
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.03); }
        100% { transform: scale(1); }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

if (window.innerWidth > 768) {
    document.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.3;
        
        if (parallax && scrolled < window.innerHeight) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        field.classList.remove('error');
        field.style.borderColor = '#ededed';
        
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
        }
        
        if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }
        
        if (!isValid) {
            field.classList.add('error');
            field.style.borderColor = '#e74c3c';
        }
        
        return isValid;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #3b4476, #c9cff6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 0.8s ease-in-out infinite;
    `;
    
    loadingOverlay.appendChild(loader);
    document.body.appendChild(loadingOverlay);
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 300);
        }, 500);
    });
});

function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid || typeof projects === 'undefined') return;

    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const techTags = project.tech.map(tech => `<span>${tech}</span>`).join('');
        
        projectCard.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image}'); background-size: cover; background-position: center;">
                <div class="project-date">${project.date}</div>
                <div class="project-category">${project.category}</div>
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.video ? `<button class="video-btn" onclick="openVideoModal('${project.video}')" title="Watch Demo"><i class="fas fa-play"></i></button>` : ''}
                        <a href="${project.demoLink}" target="_blank" class="project-link" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>
                        <a href="${project.codeLink}" target="_blank" class="project-link" title="View Code"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    const newProjectCards = projectsGrid.querySelectorAll('.project-card');
    newProjectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

function openVideoModal(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    
    iframe.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.video-modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeVideoModal();
        }
    });
});

function loadTeam() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid || typeof team === 'undefined') return;

    teamGrid.innerHTML = '';
    
    team.forEach(member => {
        const teamMember = document.createElement('div');
        teamMember.className = 'team-member';
        
        const linkedinLink = member.linkedinLink && member.linkedinLink !== 'none' ? 
            `<a href="${member.linkedinLink}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>` : '';
        
        const githubLink = member.githubLink && member.githubLink !== 'none' ? 
            `<a href="${member.githubLink}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>` : '';
        
        teamMember.innerHTML = `
            <div class="member-image" style="background-image: url('${member.image}'); background-size: cover; background-position: center;">
                <div class="member-overlay">
                    <div class="member-social">
                        ${linkedinLink}
                        ${githubLink}
                    </div>
                </div>
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="member-role">${member.title}</p>
                <p class="member-bio">${member.description}</p>
            </div>
        `;
        
        teamGrid.appendChild(teamMember);
    });

    const newTeamMembers = teamGrid.querySelectorAll('.team-member');
    newTeamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}