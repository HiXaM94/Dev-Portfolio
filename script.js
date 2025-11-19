// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animated Counter for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Intersection Observer for stats animation
const statsSection = document.querySelector('.stats');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateValue(stat, 0, target, 2000);
            });
            observer.unobserve(statsSection);
        }
    });
}, observerOptions);

observer.observe(statsSection);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
    submitBtn.style.background = 'var(--success)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
    }, 3000);
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const button = newsletterForm.querySelector('button');
        
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = 'var(--success)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            emailInput.value = '';
        }, 2000);
    });
}

// Football Standings Data with form indicators
const standingsData = {
    premier: [
        { position: 1, team: 'Arsenal', played: 28, won: 20, drawn: 4, lost: 4, goalsFor: 70, goalsAgainst: 24, points: 64, form: ['W', 'W', 'D', 'W', 'W'] },
        { position: 2, team: 'Liverpool', played: 28, won: 19, drawn: 7, lost: 2, goalsFor: 65, goalsAgainst: 26, points: 64, form: ['W', 'D', 'W', 'W', 'D'] },
        { position: 3, team: 'Man City', played: 28, won: 19, drawn: 6, lost: 3, goalsFor: 63, goalsAgainst: 28, points: 63, form: ['W', 'W', 'W', 'D', 'W'] },
        { position: 4, team: 'Aston Villa', played: 29, won: 17, drawn: 5, lost: 7, goalsFor: 60, goalsAgainst: 42, points: 56, form: ['W', 'L', 'W', 'D', 'W'] },
        { position: 5, team: 'Tottenham', played: 28, won: 16, drawn: 5, lost: 7, goalsFor: 59, goalsAgainst: 42, points: 53, form: ['W', 'L', 'W', 'L', 'W'] }
    ],
    liga: [
        { position: 1, team: 'Real Madrid', played: 27, won: 20, drawn: 6, lost: 1, goalsFor: 56, goalsAgainst: 18, points: 66, form: ['W', 'W', 'W', 'D', 'W'] },
        { position: 2, team: 'Barcelona', played: 27, won: 18, drawn: 6, lost: 3, goalsFor: 57, goalsAgainst: 34, points: 60, form: ['W', 'W', 'D', 'W', 'L'] },
        { position: 3, team: 'Girona', played: 27, won: 18, drawn: 5, lost: 4, goalsFor: 54, goalsAgainst: 32, points: 59, form: ['W', 'L', 'W', 'D', 'W'] },
        { position: 4, team: 'Atlético Madrid', played: 27, won: 16, drawn: 4, lost: 7, goalsFor: 52, goalsAgainst: 31, points: 52, form: ['W', 'W', 'L', 'W', 'D'] },
        { position: 5, team: 'Athletic Club', played: 28, won: 14, drawn: 8, lost: 6, goalsFor: 48, goalsAgainst: 29, points: 50, form: ['D', 'W', 'W', 'D', 'L'] }
    ],
    seriea: [
        { position: 1, team: 'Inter', played: 28, won: 23, drawn: 4, lost: 1, goalsFor: 67, goalsAgainst: 12, points: 73, form: ['W', 'W', 'W', 'W', 'W'] },
        { position: 2, team: 'AC Milan', played: 28, won: 18, drawn: 5, lost: 5, goalsFor: 52, goalsAgainst: 32, points: 59, form: ['W', 'W', 'L', 'W', 'D'] },
        { position: 3, team: 'Juventus', played: 28, won: 17, drawn: 7, lost: 4, goalsFor: 44, goalsAgainst: 23, points: 58, form: ['D', 'D', 'W', 'D', 'W'] },
        { position: 4, team: 'Bologna', played: 28, won: 14, drawn: 9, lost: 5, goalsFor: 41, goalsAgainst: 25, points: 51, form: ['W', 'D', 'W', 'D', 'W'] },
        { position: 5, team: 'Roma', played: 28, won: 14, drawn: 6, lost: 8, goalsFor: 55, goalsAgainst: 35, points: 48, form: ['W', 'W', 'D', 'L', 'W'] }
    ],
    ligue1: [
        { position: 1, team: 'PSG', played: 26, won: 17, drawn: 8, lost: 1, goalsFor: 62, goalsAgainst: 23, points: 59, form: ['W', 'W', 'D', 'W', 'W'] },
        { position: 2, team: 'Brest', played: 27, won: 14, drawn: 8, lost: 5, goalsFor: 37, goalsAgainst: 20, points: 50, form: ['W', 'D', 'W', 'L', 'W'] },
        { position: 3, team: 'Monaco', played: 27, won: 14, drawn: 7, lost: 6, goalsFor: 52, goalsAgainst: 38, points: 49, form: ['L', 'W', 'D', 'W', 'D'] },
        { position: 4, team: 'Lille', played: 27, won: 12, drawn: 10, lost: 5, goalsFor: 39, goalsAgainst: 24, points: 46, form: ['W', 'D', 'W', 'D', 'W'] },
        { position: 5, team: 'Nice', played: 27, won: 12, drawn: 7, lost: 8, goalsFor: 28, goalsAgainst: 22, points: 43, form: ['D', 'L', 'W', 'D', 'L'] }
    ]
};

// Football Standings Functionality
const leagueButtons = document.querySelectorAll('.league-btn');
const standingsBody = document.getElementById('standings-body');

function getFormIndicator(form) {
    return form.map(result => {
        if (result === 'W') return '<div class="form-win" title="Victoire"></div>';
        if (result === 'D') return '<div class="form-draw" title="Nul"></div>';
        if (result === 'L') return '<div class="form-loss" title="Défaite"></div>';
    }).join('');
}

function updateStandings(league) {
    standingsBody.innerHTML = '';
    
    standingsData[league].forEach(team => {
        const goalDifference = team.goalsFor - team.goalsAgainst;
        const goalDiffString = goalDifference > 0 ? `+${goalDifference}` : goalDifference.toString();
        
        const row = document.createElement('div');
        row.className = 'team-row';
        row.innerHTML = `
            <div class="pos">${team.position}</div>
            <div class="team">
                <div class="team-logo">${team.team.substring(0, 2)}</div>
                <div class="team-name">${team.team}</div>
            </div>
            <div class="played">${team.played}</div>
            <div class="won">${team.won}</div>
            <div class="drawn">${team.drawn}</div>
            <div class="lost">${team.lost}</div>
            <div class="goals">${goalDiffString}</div>
            <div class="points"><strong>${team.points}</strong></div>
            <div class="form">
                <div class="form-indicator">
                    ${getFormIndicator(team.form)}
                </div>
            </div>
        `;
        standingsBody.appendChild(row);
    });
}

// Initialize with Premier League
updateStandings('premier');

// League selector functionality
leagueButtons.forEach(button => {
    button.addEventListener('click', () => {
        leagueButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const league = button.getAttribute('data-league');
        updateStandings(league);
    });
});

// Add loading animation to project cards
document.addEventListener('DOMContentLoaded', () => {
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});

// Add fade-in animation class
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);