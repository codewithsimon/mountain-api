/* ========================================
   Mock Mountain Data
   ======================================== */

const mountainData = {
    everest: {
        id: "everest",
        name: "Mount Everest",
        height: 8849,
        unit: "meters",
        prominence: 8849,
        range: "Himalayas",
        country: ["Nepal", "China"],
        coordinates: {
            latitude: 27.9881,
            longitude: 86.9250
        },
        firstAscent: {
            year: 1953,
            climbers: ["Edmund Hillary", "Tenzing Norgay"]
        },
        difficulty: "Extreme",
        description: "The highest mountain in the world"
    },
    k2: {
        id: "k2",
        name: "K2",
        height: 8611,
        unit: "meters",
        prominence: 4020,
        range: "Karakoram",
        country: ["Pakistan", "China"],
        coordinates: {
            latitude: 35.8825,
            longitude: 76.5133
        },
        firstAscent: {
            year: 1954,
            climbers: ["Achille Compagnoni", "Lino Lacedelli"]
        },
        difficulty: "Extreme",
        description: "The second highest mountain in the world, known as the Savage Mountain"
    },
    kilimanjaro: {
        id: "kilimanjaro",
        name: "Kilimanjaro",
        height: 5895,
        unit: "meters",
        prominence: 5885,
        range: "Eastern Rift Mountains",
        country: ["Tanzania"],
        coordinates: {
            latitude: -3.0674,
            longitude: 37.3556
        },
        firstAscent: {
            year: 1889,
            climbers: ["Hans Meyer", "Ludwig Purtscheller"]
        },
        difficulty: "Moderate",
        description: "The highest mountain in Africa and the highest free-standing mountain in the world"
    }
};

/* ========================================
   Smooth Scrolling for Navigation Links
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a, .cta-button');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

/* ========================================
   Copy to Clipboard Functionality
   ======================================== */

function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const codeBlock = document.getElementById(targetId);

            if (codeBlock) {
                const code = codeBlock.textContent;

                navigator.clipboard.writeText(code).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.classList.add('copied');

                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    this.textContent = 'Failed';

                    setTimeout(() => {
                        this.textContent = 'Copy';
                    }, 2000);
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', setupCopyButtons);

/* ========================================
   Interactive Mountain Demo
   ======================================== */

function setupInteractiveDemo() {
    const mountainSelect = document.getElementById('mountain-select');
    const demoOutput = document.getElementById('demo-output');

    if (!mountainSelect || !demoOutput) return;

    mountainSelect.addEventListener('change', function() {
        const selectedMountain = this.value;

        if (selectedMountain && mountainData[selectedMountain]) {
            const data = mountainData[selectedMountain];
            const jsonString = JSON.stringify(data, null, 2);

            demoOutput.innerHTML = `
                <div class="code-block-wrapper">
                    <button class="copy-button" data-target="demo-code">Copy</button>
                    <pre class="code-block" id="demo-code"><code>${jsonString}</code></pre>
                </div>
            `;

            demoOutput.classList.add('active');

            setupCopyButtons();
        } else {
            demoOutput.classList.remove('active');
            demoOutput.innerHTML = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', setupInteractiveDemo);

/* ========================================
   Navbar Scroll Effect
   ======================================== */

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', handleNavbarScroll);

/* ========================================
   Mobile Menu Toggle
   ======================================== */

function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuToggle || !navLinks) return;

    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', setupMobileMenu);
