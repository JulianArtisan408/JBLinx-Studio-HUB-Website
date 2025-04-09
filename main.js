/**
 * JBLinx Studio - Optimized JavaScript v2.1
 * Comprehensive script file for JBLinx Studio website
 * Slogan: "Linking Dreams to Reality"
 * 
 * This file has been optimized for better performance and maintainability
 */

/**
 * Global variables - consolidated for better management
 */
const CONFIG = {
    isDarkMode: localStorage.getItem('darkMode') === 'true',
    themeColors: JSON.parse(localStorage.getItem('themeColors')) || {
        primary: '#7038ff',
        secondary: '#4f8dff',
        accent: '#ff4b6e'
    },
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    isMobile: window.innerWidth < 768,
    audioContext: null,
    audioAnalyser: null,
    audioSource: null,
    audioDataArray: null,
    voiceActive: false,
    debounceTimeout: null,
    loaderComplete: false
};

/**
 * Products data
 */
const PRODUCTS = {
    connectx: {
        id: 'connectx',
        name: 'ConnectX',
        price: 299,
        description: 'A comprehensive communication platform that streamlines team collaboration with real-time messaging, file sharing, and video conferencing.',
        features: [
            'Real-time messaging with read receipts',
            'HD video conferencing with screen sharing',
            'Secure file sharing and storage',
            'Integrations with popular tools',
            'Advanced team management',
            'Cross-platform availability'
        ],
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        model3d: true
    },
    datalinx: {
        id: 'datalinx',
        name: 'DataLinx Analytics',
        price: 399,
        description: 'Powerful data visualization and analytics tool for business intelligence with interactive dashboards and predictive analytics.',
        features: [
            'Interactive dashboards and reports',
            'Predictive analytics with AI integration',
            'Custom report generation',
            'Data cleaning and transformation',
            'Real-time analytics',
            'Export to multiple formats'
        ],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        model3d: true
    },
    securelinx: {
        id: 'securelinx',
        name: 'SecureLinx',
        price: 349,
        description: 'Advanced security solution for protecting digital assets and data with encryption, threat detection, and automated backups.',
        features: [
            'End-to-end encryption',
            'Advanced threat detection',
            'Automated backups',
            'Security audit trails',
            'Multi-factor authentication',
            'Compliance management'
        ],
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        model3d: true
    }
};

/**
 * Initialize the website when the DOM is fully loaded
 * Optimized initialization with performance in mind
 */
document.addEventListener('DOMContentLoaded', () => {
    // Set dark mode based on stored preference
    if (CONFIG.isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Core functionality - load these first
    initLoader();
    
    // Initialize the rest of the features after loader animation
    // This improves perceived performance by showing content faster
    setTimeout(() => {
        // Essential UI elements
        initMegaNavigation();
        initExplorerPanel();
        initMobileMenu();
        initCartSidebar();
        initDarkMode();
        initScrollProgress();
        
        // Smooth scroll behavior for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            if (anchor.getAttribute('href') !== '#') {
                anchor.addEventListener('click', scrollToSection);
            }
        });
        
        // Interactive elements
        initSolutionsTabs();
        initProductDetails();
        initModals();
        initContactForm();
        initBackToTop();
        
        // Visual enhancements - load these last as they're not critical
        if (!CONFIG.isMobile) {
            initCustomCursor();
            initPanelTilt();
            init3DElements();
            initCounters();
            initDotNavigation();
            initSectionJump();
            
            // Load advanced features only for desktop users
            initParticleEffects();
            initScrollAnimations();
            initColorThemeGenerator();
            initScrollSequences();
            initInteractiveTimeline();
            
            // These features use audio - only load them if needed
            if (hasWebAudioSupport()) {
                initAudioVisualizer();
            }
            
            // Only load voice commands if speech recognition is supported
            if (hasSpeechRecognition()) {
                initVoiceCommands();
            }
        }
    }, 600); // Slight delay to allow loader to run
});

/**
 * Feature detection helpers
 */
function hasWebAudioSupport() {
    return !!(window.AudioContext || window.webkitAudioContext);
}

function hasSpeechRecognition() {
    return !!((window.SpeechRecognition || window.webkitSpeechRecognition));
}

/**
 * Utility function: Debounce
 * Limits how often a function can be called
 */
function debounce(func, wait) {
    return function(...args) {
        clearTimeout(CONFIG.debounceTimeout);
        CONFIG.debounceTimeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

/**
 * Initialize loader
 */
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    // Simulate loading progress
    let progress = 0;
    const loadingBar = loader.querySelector('.loader-bar');
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loader after a small delay
            setTimeout(() => {
                loader.classList.add('hidden');
                CONFIG.loaderComplete = true;
                
                // Animate hero elements
                animateHeroElements();
            }, 500);
        }
        
        loadingBar.style.width = `${progress}%`;
    }, 200);
}

/**
 * Animate hero elements
 */
function animateHeroElements() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroActions = document.querySelector('.hero-actions');
    const heroStats = document.querySelector('.hero-stats');
    const heroImage = document.querySelector('.hero-image');
    const floatingBadges = document.querySelectorAll('.floating-badge');
    
    // Advanced text animation for hero title
    if (heroTitle) {
        const words = heroTitle.textContent.split(' ');
        heroTitle.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'hero-word';
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(40px)';
            span.style.display = 'inline-block';
            span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            span.style.transitionDelay = `${0.1 * index}s`;
            
            heroTitle.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    // Animate description with typewriter effect
    if (heroDescription) {
        const text = heroDescription.textContent;
        heroDescription.textContent = '';
        heroDescription.style.opacity = '1';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                heroDescription.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 20);
    }
    
    // Animate other hero elements
    if (heroActions) {
        setTimeout(() => {
            heroActions.style.opacity = '1';
            heroActions.style.transform = 'translateY(0)';
        }, 800);
    }
    
    if (heroStats) {
        setTimeout(() => {
            heroStats.style.opacity = '1';
            heroStats.style.transform = 'translateY(0)';
            
            // Start counting animations
            initCounters();
        }, 1000);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1)';
        }, 600);
    }
    
    // Animate floating badges with staggered delays
    if (floatingBadges.length > 0) {
        floatingBadges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
            }, 1200 + (index * 200));
        });
    }
}

/**
 * Initialize custom cursor
 */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    // Check if device has touch capability (mobile)
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        return;
    }
    
    // Make cursor visible
    setTimeout(() => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    }, 1000);
    
    // Update cursor position on mouse move with smoothing
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Create trail elements - optimized with fewer elements
    const trailCount = 6;
    const trails = [];
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.position = 'fixed';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.borderRadius = '50%';
        trail.style.backgroundColor = CONFIG.isDarkMode ? 'rgba(112, 56, 255, 0.3)' : 'rgba(112, 56, 255, 0.3)';
        trail.style.zIndex = '9999';
        trail.style.pointerEvents = 'none';
        trail.style.opacity = '0';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update dot position immediately for more responsive feel
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });
    
    // Cursor animation loop with optimization
    function updateCursor() {
        if (!document.hidden) {
            const speed = 0.2;
            
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            
            // Update trail positions with delay and varying opacities
            trails.forEach((trail, index) => {
                const trailSpeed = 0.1 - (index * 0.01);
                
                trail.x += (mouseX - trail.x) * trailSpeed;
                trail.y += (mouseY - trail.y) * trailSpeed;
                
                // Simplified color handling for better performance
                const opacity = 0.5 - (index * 0.1);
                trail.element.style.opacity = opacity;
                trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%)`;
            });
        }
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .btn, .panel-tilt, [class*="card"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            
            // Increase trail size on hover
            trails.forEach(trail => {
                trail.element.style.width = '8px';
                trail.element.style.height = '8px';
                trail.element.style.backgroundColor = CONFIG.isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(112, 56, 255, 0.5)';
            });
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            
            // Reset trail size
            trails.forEach(trail => {
                trail.element.style.width = '5px';
                trail.element.style.height = '5px';
                trail.element.style.backgroundColor = CONFIG.isDarkMode ? 'rgba(112, 56, 255, 0.3)' : 'rgba(112, 56, 255, 0.3)';
            });
        });
    });
}

/**
 * Initialize mega navigation
 */
function initMegaNavigation() {
    const megaHeader = document.querySelector('.mega-header');
    const megaNavTabs = document.querySelectorAll('.mega-nav-tab');
    const megaNavLinks = document.querySelectorAll('.mega-nav-link');
    const megaDropdowns = document.querySelectorAll('.mega-dropdown');
    
    if (!megaHeader) return;
    
    // Optimize scroll handler with debounce
    const handleScroll = debounce(() => {
        // Header visibility
        if (window.scrollY > 50) {
            megaHeader.classList.add('scrolled');
        } else {
            megaHeader.classList.remove('scrolled');
        }
        
        // Auto-hide for mobile (performance optimization)
        if (window.innerWidth < 992) {
            if (window.scrollY > 200) {
                if (window.scrollY > window.lastScrollY) {
                    megaHeader.classList.add('header-hidden');
                } else {
                    megaHeader.classList.remove('header-hidden');
                }
            } else {
                megaHeader.classList.remove('header-hidden');
            }
            window.lastScrollY = window.scrollY;
        }
        
        // Active link highlighting based on scroll position
        const scrollPosition = window.scrollY + 150;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                megaNavLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle dropdown interactions
    megaNavTabs.forEach(tab => {
        const hasDropdown = tab.querySelector('.mega-dropdown');
        
        if (hasDropdown) {
            // Show dropdown on mouse enter
            tab.addEventListener('mouseenter', () => {
                // Hide all other dropdowns
                megaDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                
                // Show this dropdown
                hasDropdown.classList.add('active');
            });
            
            // Hide dropdown on mouse leave
            tab.addEventListener('mouseleave', () => {
                hasDropdown.classList.remove('active');
            });
        }
    });
    
    // Add hover effect to nav links
    megaNavLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!link.closest('.mega-nav-tab').querySelector('.mega-dropdown')) {
                link.style.transform = 'translateY(-3px)';
                link.style.textShadow = '0 0 8px rgba(112, 56, 255, 0.5)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
            link.style.textShadow = '';
        });
    });
}

/**
 * Initialize explorer panel
 */
function initExplorerPanel() {
    const explorerPanel = document.querySelector('.explorer-panel');
    const explorerToggle = document.querySelector('.explorer-toggle');
    const explorerClose = document.querySelector('.explorer-close');
    const explorerThemeToggle = document.querySelector('.explorer-theme-toggle');
    const treeFolders = document.querySelectorAll('.explorer-tree-folder');
    const treeToggles = document.querySelectorAll('.explorer-tree-toggle');
    const treeItems = document.querySelectorAll('.explorer-tree-file');
    
    if (!explorerPanel || !explorerToggle) return;
    
    // Toggle explorer panel
    explorerToggle.addEventListener('click', () => {
        explorerPanel.classList.toggle('active');
        explorerToggle.classList.toggle('active');
        
        // Animate tree items if panel is active
        if (explorerPanel.classList.contains('active')) {
            animateTreeItems();
        }
    });
    
    // Close explorer panel
    if (explorerClose) {
        explorerClose.addEventListener('click', () => {
            explorerPanel.classList.remove('active');
            explorerToggle.classList.remove('active');
        });
    }
    
    // Toggle explorer theme
    if (explorerThemeToggle) {
        explorerThemeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            CONFIG.isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', CONFIG.isDarkMode);
            
            // Update particle colors
            if (document.querySelector('.particles-canvas')) {
                initParticleEffects(true);
            }
        });
    }
    
    // Function to animate tree items
    function animateTreeItems() {
        document.querySelectorAll('.explorer-tree-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 + (index * 30));
        });
    }
    
    // Toggle tree folders
    treeFolders.forEach(folder => {
        folder.addEventListener('click', (e) => {
            const item = folder.closest('.explorer-tree-item');
            const children = item.querySelector('.explorer-tree-children');
            const toggle = item.querySelector('.explorer-tree-toggle i');
            
            if (children) {
                // Toggle expanded state
                item.classList.toggle('expanded');
                
                if (item.classList.contains('expanded')) {
                    toggle.style.transform = 'rotate(90deg)';
                    
                    // Animate children
                    const childItems = children.querySelectorAll('.explorer-tree-item');
                    childItems.forEach((child, index) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateX(-10px)';
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateX(0)';
                        }, 50 + (index * 30));
                    });
                } else {
                    toggle.style.transform = '';
                }
            }
        });
    });
    
    // Prevent toggle button from triggering folder toggle
    treeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const item = toggle.closest('.explorer-tree-item');
            const children = item.querySelector('.explorer-tree-children');
            const icon = toggle.querySelector('i');
            
            if (children) {
                // Toggle expanded state
                item.classList.toggle('expanded');
                
                if (item.classList.contains('expanded')) {
                    icon.style.transform = 'rotate(90deg)';
                    
                    // Animate children
                    const childItems = children.querySelectorAll('.explorer-tree-item');
                    childItems.forEach((child, index) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateX(-10px)';
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateX(0)';
                        }, 50 + (index * 30));
                    });
                } else {
                    icon.style.transform = '';
                }
            }
        });
    });
    
    // Active tree item based on scroll position (debounced)
    const updateActiveTreeItem = debounce(() => {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all tree items
                treeItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to current section tree item
                const activeItem = document.querySelector(`.explorer-tree-file[href="#${sectionId}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                    
                    // Expand parent folders if needed
                    expandParents(activeItem);
                }
            }
        });
    }, 100);
    
    window.addEventListener('scroll', updateActiveTreeItem);
    
    // Helper function to expand parent folders
    function expandParents(item) {
        let parent = item.closest('.explorer-tree-children');
        
        while (parent) {
            const parentItem = parent.closest('.explorer-tree-item');
            
            if (parentItem && !parentItem.classList.contains('expanded')) {
                parentItem.classList.add('expanded');
                
                const toggle = parentItem.querySelector('.explorer-tree-toggle i');
                if (toggle) {
                    toggle.style.transform = 'rotate(90deg)';
                }
            }
            
            parent = parentItem ? parentItem.closest('.explorer-tree-children') : null;
        }
    }
}

/**
 * Initialize dot navigation
 */
function initDotNavigation() {
    const dotNavItems = document.querySelectorAll('.dot-nav-item');
    
    if (dotNavItems.length === 0) return;
    
    // Add animation to dots
    dotNavItems.forEach((dot, index) => {
        dot.style.transform = 'scale(0)';
        dot.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
        dot.style.transitionDelay = `${0.1 * index}s`;
        
        setTimeout(() => {
            dot.style.transform = 'scale(1)';
        }, 1500 + (index * 100));
    });
    
    // Update active dot based on scroll position (debounced)
    const handleScroll = debounce(() => {
        const scrollPosition = window.scrollY + (window.innerHeight / 3);
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                dotNavItems.forEach(dot => {
                    dot.classList.remove('active');
                    
                    const href = dot.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        dot.classList.add('active');
                        
                        // Add pulse animation to active dot
                        dot.style.animation = 'pulse 2s infinite';
                    } else {
                        dot.style.animation = 'none';
                    }
                });
            }
        });
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
}

/**
 * Initialize scroll progress bar
 */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    if (!progressBar) return;
    
    // Optimized scroll handler with debounce
    const handleScroll = debounce(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
        
        // Simpler gradient for better performance
        const hue1 = 260; // Purple
        const hue2 = 210; // Blue
        const hue = hue1 + ((hue2 - hue1) * (scrolled / 100));
        
        progressBar.style.background = CONFIG.isDarkMode ?
            `linear-gradient(to right, hsl(${hue1}, 70%, 60%), hsl(${hue}, 70%, 60%))` :
            `linear-gradient(to right, hsl(${hue1}, 70%, 50%), hsl(${hue}, 70%, 50%))`;
    }, 50);
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize progress bar at 0%
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.3s ease';
}

/**
 * Initialize section jump buttons
 */
function initSectionJump() {
    const sectionJumps = document.querySelectorAll('.section-jump a');
    
    sectionJumps.forEach(jump => {
        // Add hover animation
        jump.addEventListener('mouseenter', () => {
            jump.style.animation = 'bounce 1s infinite';
        });
        
        jump.addEventListener('mouseleave', () => {
            jump.style.animation = 'none';
        });
        
        jump.addEventListener('click', e => {
            e.preventDefault();
            
            const href = jump.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = document.querySelector('.mega-header')?.offsetHeight || 0;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenu || !mobileMenuToggle) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        mobileNavLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, 100 + (index * 50));
        });
    });
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', e => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            e.target !== mobileMenuToggle) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialize cart sidebar
 */
function initCartSidebar() {
    const cartToggle = document.querySelector('.cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    if (!cartSidebar || !cartToggle) return;
    
    // Update cart count on page load
    updateCartCount();
    
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update cart items
        updateCartItems();
    });
    
    if (cartClose) {
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close cart sidebar when clicking outside
    document.addEventListener('click', e => {
        if (cartSidebar.classList.contains('active') && 
            !cartSidebar.contains(e.target) && 
            e.target !== cartToggle) {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Add event listeners to "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product');
            const price = parseFloat(button.getAttribute('data-price'));
            
            if (productId && price) {
                addToCart(productId, price);
                showToast(`${PRODUCTS[productId].name} added to cart!`);
            }
        });
    });
}

/**
 * Add a product to the cart
 */
function addToCart(productId, price) {
    const product = PRODUCTS[productId];
    if (!product) return;
    
    // Check if product already exists in cart
    const existingProductIndex = CONFIG.cart.findIndex(item => item.id === productId);
    
    if (existingProductIndex >= 0) {
        // Increase quantity if product exists
        CONFIG.cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart
        CONFIG.cart.push({
            id: productId,
            name: product.name,
            price: price,
            quantity: 1,
            image: product.image
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(CONFIG.cart));
    
    // Update cart count
    updateCartCount();
    
    // Play add to cart sound if WebAudio is supported
    if (hasWebAudioSupport()) {
        playCartSound('add');
    }
}

/**
 * Play cart sound
 */
function playCartSound(type) {
    // Create audio context if not exists
    if (!window.AudioContext && !window.webkitAudioContext) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillator for sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'add') {
        // Create a nice "ding" sound
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.1); // G5
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'remove') {
        // Create a "remove" sound
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime); // G5
        oscillator.frequency.exponentialRampToValueAtTime(523.25, audioContext.currentTime + 0.1); // C5
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

/**
 * Update cart count in header
 */
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (!cartCount) return;
    
    const totalItems = CONFIG.cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add animation to cart count
    cartCount.style.animation = 'pulse 0.5s';
    setTimeout(() => {
        cartCount.style.animation = 'none';
    }, 500);
}

/**
 * Update cart items in sidebar
 */
function updateCartItems() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span:last-child');
    
    if (!cartItems || !cartTotal) return;
    
    if (CONFIG.cart.length === 0) {
        // Show empty cart message
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="#products" class="btn btn-gradient">Browse Products</a>
            </div>
        `;
        
        cartTotal.textContent = '$0.00';
        return;
    }
    
    // Build cart items HTML
    let cartItemsHTML = '';
    let total = 0;
    
    CONFIG.cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItemsHTML += `
            <div class="cart-item" data-product="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="qty-btn decrease-qty" data-product="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn increase-qty" data-product="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="cart-item-remove" data-product="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartItemsHTML;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    const decreaseButtons = document.querySelectorAll('.decrease-qty');
    const increaseButtons = document.querySelectorAll('.increase-qty');
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product');
            decreaseQuantity(productId);
        });
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product');
            increaseQuantity(productId);
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product');
            removeFromCart(productId);
        });
    });
    
    // Add animations for cart items
    document.querySelectorAll('.cart-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 + (index * 50));
    });
}

/**
 * Decrease product quantity in cart
 */
function decreaseQuantity(productId) {
    const index = CONFIG.cart.findIndex(item => item.id === productId);
    if (index === -1) return;
    
    if (CONFIG.cart[index].quantity > 1) {
        CONFIG.cart[index].quantity -= 1;
        
        // Update cart items and display
        updateCartItem(productId);
        updateCartCount();
        updateCartTotal();
    } else {
        // Remove product if quantity becomes 0
        removeFromCart(productId);
    }
    
    localStorage.setItem('cart', JSON.stringify(CONFIG.cart));
}

/**
 * Increase product quantity in cart
 */
function increaseQuantity(productId) {
    const index = CONFIG.cart.findIndex(item => item.id === productId);
    if (index === -1) return;
    
    CONFIG.cart[index].quantity += 1;
    
    // Update cart items and display
    updateCartItem(productId);
    updateCartCount();
    updateCartTotal();
    
    localStorage.setItem('cart', JSON.stringify(CONFIG.cart));
    
    // Play add sound if WebAudio is supported
    if (hasWebAudioSupport()) {
        playCartSound('add');
    }
}

/**
 * Update single cart item
 */
function updateCartItem(productId) {
    const cartItem = document.querySelector(`.cart-item[data-product="${productId}"]`);
    if (!cartItem) return;
    
    const item = CONFIG.cart.find(item => item.id === productId);
    if (!item) return;
    
    const qtyValue = cartItem.querySelector('.qty-value');
    const itemPrice = cartItem.querySelector('.cart-item-price');
    const itemTotal = item.price * item.quantity;
    
    if (qtyValue) qtyValue.textContent = item.quantity;
    if (itemPrice) itemPrice.textContent = `$${item.price.toFixed(2)} × ${item.quantity} = $${itemTotal.toFixed(2)}`;
    
    // Animate updated item
    cartItem.style.backgroundColor = 'rgba(112, 56, 255, 0.1)';
    setTimeout(() => {
        cartItem.style.backgroundColor = '';
    }, 300);
}

/**
 * Update cart total
 */
function updateCartTotal() {
    const cartTotal = document.querySelector('.cart-total span:last-child');
    if (!cartTotal) return;
    
    const total = CONFIG.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Animate total update
    cartTotal.style.animation = 'pulse 0.5s';
    setTimeout(() => {
        cartTotal.style.animation = '';
    }, 500);
}

/**
 * Remove product from cart
 */
function removeFromCart(productId) {
    const index = CONFIG.cart.findIndex(item => item.id === productId);
    if (index === -1) return;
    
    // Animate item removal
    const cartItem = document.querySelector(`.cart-item[data-product="${productId}"]`);
    if (cartItem) {
        cartItem.style.transform = 'translateX(100%)';
        cartItem.style.opacity = '0';
        setTimeout(() => {
            // Remove from array
            CONFIG.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(CONFIG.cart));
            
            // Update display
            updateCartCount();
            updateCartItems();
            
            // Play remove sound if WebAudio is supported
            if (hasWebAudioSupport()) {
                playCartSound('remove');
            }
            
            showToast('Item removed from cart');
        }, 300);
    } else {
        // If no animation possible, just remove it
        CONFIG.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(CONFIG.cart));
        updateCartCount();
        updateCartItems();
        showToast('Item removed from cart');
    }
}

/**
 * Initialize dark mode functionality
 */
function initDarkMode() {
    const themeToggles = document.querySelectorAll('.theme-toggle, .explorer-theme-toggle');
    
    if (themeToggles.length === 0) return;
    
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            CONFIG.isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', CONFIG.isDarkMode);
            
            // Update particle colors if particles exist
            if (document.querySelector('.particles-canvas')) {
                initParticleEffects(true);
            }
        });
    });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    // Optimized scroll handler with debounce
    const handleScroll = debounce(() => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add particle effect to the button
    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.classList.add('particle-effect');
    });
    
    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.classList.remove('particle-effect');
    });
}

/**
 * Initialize solution tabs
 */
function initSolutionsTabs() {
    const tabControls = document.querySelectorAll('.tab-control');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabControls.length === 0 || tabContents.length === 0) return;
    
    tabControls.forEach(control => {
        control.addEventListener('click', () => {
            // Remove active class from all controls and contents
            tabControls.forEach(c => c.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.remove('active');
                c.style.opacity = '0';
                c.style.transform = 'translateY(20px)';
            });
            
            // Add active class to clicked control
            control.classList.add('active');
            
            // Show corresponding tab content with animation
            const tabId = control.getAttribute('data-tab');
            const targetContent = document.getElementById(`solutions-${tabId}`);
            
            if (targetContent) {
                targetContent.classList.add('active');
                
                setTimeout(() => {
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    });
    
    // Set initial tab content animation properties
    tabContents.forEach(content => {
        content.style.opacity = content.classList.contains('active') ? '1' : '0';
        content.style.transform = content.classList.contains('active') ? 'translateY(0)' : 'translateY(20px)';
        content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

/**
 * Initialize product details modals
 */
function initProductDetails() {
    const productDetailsButtons = document.querySelectorAll('.product-details-btn');
    const productModal = document.getElementById('productModal');
    
    if (productDetailsButtons.length === 0 || !productModal) return;
    
    productDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('[data-product]');
            const productId = productCard.getAttribute('data-product');
            
            if (PRODUCTS[productId]) {
                const product = PRODUCTS[productId];
                
                // Populate modal content
                const modalBody = productModal.querySelector('.modal-body');
                
                // Check if product has 3D model
                const viewerHtml = product.model3d ? 
                    `<div class="product-3d-viewer" data-product="${productId}">
                        <div class="viewer-placeholder">
                            <i class="fas fa-cube"></i>
                            <span>Click to view in 3D</span>
                        </div>
                    </div>` : '';
                
                modalBody.innerHTML = `
                    <div class="product-details">
                        <div class="product-info-container">
                            <div class="product-image">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                            ${viewerHtml}
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="product-price">$${product.price}</p>
                            <p class="product-description">${product.description}</p>
                            <div class="product-features">
                                <h4>Key Features</h4>
                                <ul>
                                    ${product.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                
                // Setup 3D viewer interaction if available
                if (product.model3d) {
                    const viewer = modalBody.querySelector('.product-3d-viewer');
                    viewer.addEventListener('click', () => {
                        init3DProductViewer(viewer, productId);
                    });
                }
                
                // Set add to cart button product data
                const addToCartBtn = productModal.querySelector('.add-to-cart-modal-btn');
                if (addToCartBtn) {
                    addToCartBtn.setAttribute('data-product', productId);
                    addToCartBtn.setAttribute('data-price', product.price);
                    
                    // Add click event handler
                    addToCartBtn.onclick = () => {
                        addToCart(productId, product.price);
                        closeModal(productModal);
                    };
                }
                
                // Show the modal
                openModal(productModal);
            }
        });
    });
}

/**
 * Initialize modals
 */
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    
    if (modals.length === 0) return;
    
    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.active');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

/**
 * Open modal
 */
function openModal(modal) {
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add animation to modal content
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 10);
    }
}

/**
 * Close modal
 */
function closeModal(modal) {
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset for next opening
            setTimeout(() => {
                modalContent.style.transform = 'scale(0.9)';
                modalContent.style.opacity = '0';
            }, 300);
        }, 200);
    } else {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // Simple form validation
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            showToast('Please fill in all required fields');
            return;
        }
        
        // Validate email format
        if (!isValidEmail(emailInput.value)) {
            showToast('Please enter a valid email address');
            return;
        }
        
        // Add submit animation
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
        }
        
        // Simulate form submission
        setTimeout(() => {
            contactForm.reset();
            
            if (submitButton) {
                submitButton.innerHTML = 'Send Message';
                submitButton.disabled = false;
            }
            
            if (successModal) {
                openModal(successModal);
            } else {
                showToast('Your message has been sent successfully!');
            }
        }, 1500);
    });
    
    // Add real-time validation
    const inputFields = contactForm.querySelectorAll('input, textarea');
    inputFields.forEach(field => {
        field.addEventListener('blur', () => {
            validateField(field);
        });
        
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    // Validate single field
    function validateField(field) {
        // Reset field state
        field.classList.remove('error');
        
        const errorMessage = field.nextElementSibling?.classList.contains('error-message') ? 
            field.nextElementSibling : null;
            
        if (errorMessage) {
            errorMessage.remove();
        }
        
        // Check if field is required and empty
        if (field.required && !field.value.trim()) {
            field.classList.add('error');
            const message = document.createElement('div');
            message.className = 'error-message';
            message.textContent = `${field.name || 'This field'} is required`;
            field.parentNode.insertBefore(message, field.nextSibling);
            return false;
        }
        
        // Check email format if field is email
        if (field.type === 'email' && field.value.trim() && !isValidEmail(field.value)) {
            field.classList.add('error');
            const message = document.createElement('div');
            message.className = 'error-message';
            message.textContent = 'Please enter a valid email address';
            field.parentNode.insertBefore(message, field.nextSibling);
            return false;
        }
        
        return true;
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Initialize number counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number, .about-stat-number');
    
    if (counters.length === 0) return;
    
    // Only animate counters that are in viewport
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        counters.forEach(counter => {
            animateCounter(counter);
        });
    }
    
    // Function to animate a counter
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        
        let count = 0;
        const step = Math.ceil(target / (duration / 30)); // Update every 30ms
        
        const interval = setInterval(() => {
            count += step;
            if (count >= target) {
                counter.textContent = target;
                clearInterval(interval);
                
                // Add animate-pulse class after counting
                setTimeout(() => {
                    counter.classList.add('animate-pulse');
                }, 500);
            } else {
                counter.textContent = count;
            }
        }, 30);
    }
}

/**
 * Initialize panel tilt effect (optimized for performance)
 */
function initPanelTilt() {
    const tiltPanels = document.querySelectorAll('.panel-tilt');
    
    // Don't apply on mobile or if no panels found
    if (tiltPanels.length === 0 || CONFIG.isMobile) return;
    
    tiltPanels.forEach(panel => {
        panel.addEventListener('mousemove', e => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X position relative to panel
            const y = e.clientY - rect.top;  // Mouse Y position relative to panel
            
            // Calculate rotation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / centerX * 5; // max 5deg
            const rotateX = (centerY - y) / centerY * 5; // max 5deg
            
            // Apply transformation with smooth transition
            panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Add shadow for better 3D appearance
            const shadowX = rotateY / 2;
            const shadowY = -rotateX / 2;
            panel.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.2)`;
            
            // Add 3D effect to inner content
            const content = panel.children;
            for (let i = 0; i < content.length; i++) {
                content[i].style.transform = `translateZ(20px)`;
            }
        });
        
        panel.addEventListener('mouseleave', () => {
            // Reset on mouse leave
            panel.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            panel.style.boxShadow = '';
            
            // Reset inner content
            const content = panel.children;
            for (let i = 0; i < content.length; i++) {
                content[i].style.transform = `translateZ(0)`;
            }
            
            // Add transition for smooth return
            panel.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            
            // Remove transition after a delay
            setTimeout(() => {
                panel.style.transition = '';
            }, 500);
        });
    });
}

/**
 * Initialize advanced particle effects (simplified for better performance)
 */
function initParticleEffects(forceReinit = false) {
    // Get the hero section
    const heroSection = document.querySelector('.hero-section');
    
    // Check if particles already initialized or section doesn't exist
    if ((!forceReinit && document.querySelector('.particles-canvas')) || !heroSection) return;
    
    // Remove existing canvas if reinitializing
    if (forceReinit) {
        const existingCanvas = document.querySelector('.particles-canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
    }
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    
    // Insert canvas as first child of hero section
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    // Set canvas size with higher resolution for retina displays
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Get context
    const ctx = canvas.getContext('2d');
    
    // Particle settings - reduced count for better performance
    const particleCount = 100;
    const particles = [];
    const maxRadius = 3;
    const maxSpeed = 0.5;
    
    // Choose colors based on theme
    const colors = CONFIG.isDarkMode 
        ? ['rgba(112, 56, 255, 0.4)', 'rgba(79, 141, 255, 0.4)', 'rgba(255, 75, 110, 0.3)']
        : ['rgba(112, 56, 255, 0.3)', 'rgba(79, 141, 255, 0.3)', 'rgba(255, 75, 110, 0.2)'];
    
    // Create particles with simplified properties
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
            radius: Math.random() * maxRadius + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * maxSpeed + 0.1,
            angle: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    // Track mouse position for interactive particles
    let mouseX = null;
    let mouseY = null;
    
    heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        mouseX = null;
        mouseY = null;
    });
    
    // Optimized animation function
    function animateParticles() {
        // Only run animation when page is visible
        if (!document.hidden) {
            // Clear canvas
            ctx.clearRect(0, 0, rect.width, rect.height);
            
            // Update and draw particles
            particles.forEach(particle => {
                // Move particle
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;
                
                // Mouse interaction
                if (mouseX !== null && mouseY !== null) {
                    const dx = mouseX - particle.x;
                    const dy = mouseY - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        // Repel particles from mouse
                        const angle = Math.atan2(dy, dx);
                        const force = (100 - distance) / 500;
                        
                        particle.x -= Math.cos(angle) * force;
                        particle.y -= Math.sin(angle) * force;
                    }
                }
                
                // Bounce off edges
                if (particle.x < 0) {
                    particle.x = 0;
                    particle.angle = Math.PI - particle.angle;
                } else if (particle.x > rect.width) {
                    particle.x = rect.width;
                    particle.angle = Math.PI - particle.angle;
                }
                
                if (particle.y < 0) {
                    particle.y = 0;
                    particle.angle = -particle.angle;
                } else if (particle.y > rect.height) {
                    particle.y = rect.height;
                    particle.angle = -particle.angle;
                }
                
                // Randomly change direction occasionally
                if (Math.random() < 0.01) {
                    particle.angle += (Math.random() - 0.5) * 0.2;
                }
                
                // Draw particle with pulsing effect
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            });
            
            // Draw connections with simplified logic
            for (let i = 0; i < particles.length; i += 2) { // Skip every other particle for performance
                for (let j = i + 1; j < particles.length; j += 2) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        const opacity = 0.1 * (1 - distance / 120);
                        
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(112, 56, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Request next frame
        requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    animateParticles();
    
    // Optimized resize handler with debounce
    window.addEventListener('resize', debounce(() => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Reposition particles to fit new size
        particles.forEach(particle => {
            if (particle.x > rect.width) particle.x = Math.random() * rect.width;
            if (particle.y > rect.height) particle.y = Math.random() * rect.height;
        });
    }, 250));
}

/**
 * Initialize scroll animations for elements
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('section, .products-grid > *, .services-grid > *, .game-card, .feature-card, .team-member, .value-card, .contact-info, .contact-form-container');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Apply animations
                    const element = entry.target;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
        
        // Set initial properties and observe
        animatedElements.forEach((element, index) => {
            // Basic fade-in effect for all elements
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.transitionDelay = `${0.1 * (index % 4)}s`; // Staggered animation
            
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

/**
 * Show toast notification
 */
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const toastMessage = toast.querySelector('.toast-message');
    if (toastMessage) {
        toastMessage.textContent = message;
    }
    
    // Add fancy animation to toast
    toast.style.animation = 'none';
    setTimeout(() => {
        toast.classList.add('active');
        toast.style.animation = 'toastBounce 0.5s ease';
    }, 10);
    
    // Auto hide after duration
    setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.5s ease forwards';
        setTimeout(() => {
            toast.classList.remove('active');
        }, 500);
    }, duration);
    
    // Close toast when close button is clicked
    const closeButton = toast.querySelector('.toast-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            toast.style.animation = 'toastFadeOut 0.5s ease forwards';
            setTimeout(() => {
                toast.classList.remove('active');
            }, 500);
        }, { once: true }); // Only add the event listener once
    }
}

/**
 * Scroll to section smoothly
 */
function scrollToSection(e) {
    e.preventDefault();
    
    const href = this.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const targetSection = document.querySelector(href);
    if (!targetSection) return;
    
    const headerHeight = document.querySelector('.mega-header')?.offsetHeight || 0;
    const targetPosition = targetSection.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // Update URL without scroll
    history.pushState(null, null, href);
    
    // Close mobile menu if open
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu?.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close explorer panel if open
    const explorerPanel = document.querySelector('.explorer-panel');
    if (explorerPanel?.classList.contains('active')) {
        explorerPanel.classList.remove('active');
        document.querySelector('.explorer-toggle')?.classList.remove('active');
    }
}

/**
 * Initialize advanced 3D elements for the website
 */
function init3DElements() {
    // Only initialize on newer browsers and non-mobile devices
    if (CONFIG.isMobile) return;
    
    // Apply 3D perspective to the hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        initParallaxEffects(heroSection);
    }
    
    // Apply 3D effect to cards
    const cards = document.querySelectorAll('.product-card, .service-card, .team-member, .game-card');
    if (cards.length > 0) {
        initParallaxCards(cards);
    }
}

/**
 * Initialize parallax effects for 3D section
 */
function initParallaxEffects(section) {
    // Elements to apply parallax to
    const targetElements = section.querySelectorAll('.hero-title, .hero-description, .hero-actions, .hero-stats, .hero-image, .floating-badge');
    
    section.style.perspective = '1000px';
    section.style.perspectiveOrigin = 'center';
    
    // Handle mouse movement for parallax with optimized handler
    section.addEventListener('mousemove', debounce(e => {
        if (document.hidden) return; // Don't process if page is not visible
        
        const sectionRect = section.getBoundingClientRect();
        const centerX = sectionRect.width / 2;
        const centerY = sectionRect.height / 2;
        
        // Calculate mouse position relative to center
        const mouseX = e.clientX - sectionRect.left - centerX;
        const mouseY = e.clientY - sectionRect.top - centerY;
        
        // Apply parallax effect to each element
        targetElements.forEach(element => {
            // Different intensity based on element type
            let intensity = 0.02;
            
            if (element.classList.contains('hero-image')) {
                intensity = 0.03;
            } else if (element.classList.contains('floating-badge')) {
                intensity = 0.05;
            }
            
            const moveX = mouseX * intensity;
            const moveY = mouseY * intensity;
            
            element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    }, 10));
    
    // Reset positions on mouse leave
    section.addEventListener('mouseleave', () => {
        targetElements.forEach(element => {
            element.style.transform = '';
            element.style.transition = 'transform 0.5s ease';
            
            // Remove transition after animation completes
            setTimeout(() => {
                element.style.transition = '';
            }, 500);
        });
    });
}

/**
 * Initialize parallax cards for 3D effect
 */
function initParallaxCards(cards) {
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            // Calculate mouse position relative to center
            const mouseX = e.clientX - cardRect.left - centerX;
            const mouseY = e.clientY - cardRect.top - centerY;
            
            // Calculate rotation and movement
            const rotateY = mouseX / centerX * 10; // max 10deg
            const rotateX = -mouseY / centerY * 10; // max 10deg
            
            // Apply transformation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            // Add dynamic lighting effect based on mouse position
            const lightX = (e.clientX - cardRect.left) / cardRect.width * 100;
            const lightY = (e.clientY - cardRect.top) / cardRect.height * 100;
            
            card.style.background = CONFIG.isDarkMode ? 
                `linear-gradient(rgba(15, 15, 30, 0.7), rgba(15, 15, 30, 0.7)), 
                 radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.2), transparent 50%)` :
                `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), 
                 radial-gradient(circle at ${lightX}% ${lightY}%, rgba(112, 56, 255, 0.1), transparent 50%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset transformations
            card.style.transform = '';
            card.style.background = '';
            
            // Add smooth transition for reset
            card.style.transition = 'transform 0.5s ease, background 0.5s ease';
            
            // Remove transitions after animation completes
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });
}

/**
 * Initialize 3D product viewer
 */
function init3DProductViewer(container, productId) {
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'viewer-loading';
    loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Loading 3D model...</span>';
    container.appendChild(loadingIndicator);
    
    // Replace placeholder with 3D viewer canvas (simulated)
    setTimeout(() => {
        // Create canvas for 3D viewer
        const canvas = document.createElement('canvas');
        canvas.className = 'product-3d-canvas';
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight || 300;
        container.innerHTML = '';
        container.appendChild(canvas);
        
        // Get 2D context for simulation
        const ctx = canvas.getContext('2d');
        
        // Product-specific colors
        let primaryColor, secondaryColor;
        
        switch (productId) {
            case 'connectx':
                primaryColor = '#7038ff';
                secondaryColor = '#4f8dff';
                break;
            case 'datalinx':
                primaryColor = '#4f8dff';
                secondaryColor = '#ff4b6e';
                break;
            case 'securelinx':
                primaryColor = '#ff4b6e';
                secondaryColor = '#7038ff';
                break;
            default:
                primaryColor = '#7038ff';
                secondaryColor = '#4f8dff';
        }
        
        // Create controls
        const controls = document.createElement('div');
        controls.className = 'viewer-controls';
        controls.innerHTML = `
            <button class="viewer-btn rotate-left"><i class="fas fa-undo"></i></button>
            <button class="viewer-btn rotate-right"><i class="fas fa-redo"></i></button>
            <button class="viewer-btn zoom-in"><i class="fas fa-search-plus"></i></button>
            <button class="viewer-btn zoom-out"><i class="fas fa-search-minus"></i></button>
            <button class="viewer-btn reset"><i class="fas fa-sync"></i></button>
        `;
        container.appendChild(controls);
        
        // Simulation state
        let angle = 0;
        let scale = 1;
        let isDragging = false;
        let lastX = 0;
        
        // Draw the simulated 3D model
        function drawModel() {
            if (document.hidden) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const size = Math.min(canvas.width, canvas.height) * 0.4 * scale;
            
            // Draw cube
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);
            
            // Create gradient
            const gradient = ctx.createLinearGradient(-size, -size, size, size);
            gradient.addColorStop(0, primaryColor);
            gradient.addColorStop(1, secondaryColor);
            
            // Front face
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.rect(-size / 2, -size / 2, size, size);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Side face (perspective)
            ctx.beginPath();
            ctx.moveTo(size / 2, -size / 2);
            ctx.lineTo(size / 2 + size / 4, -size / 2 - size / 4);
            ctx.lineTo(size / 2 + size / 4, size / 2 - size / 4);
            ctx.lineTo(size / 2, size / 2);
            ctx.closePath();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fill();
            ctx.stroke();
            
            // Top face (perspective)
            ctx.beginPath();
            ctx.moveTo(-size / 2, -size / 2);
            ctx.lineTo(size / 2, -size / 2);
            ctx.lineTo(size / 2 + size / 4, -size / 2 - size / 4);
            ctx.lineTo(-size / 2 + size / 4, -size / 2 - size / 4);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fill();
            ctx.stroke();
            
            // Product logo at center
            ctx.fillStyle = 'white';
            ctx.font = `${size/4}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Get product name from products object
            const name = PRODUCTS[productId]?.name || 'Product';
            ctx.fillText(name, 0, 0);
            
            ctx.restore();
            
            // Request next frame
            requestAnimationFrame(drawModel);
        }
        
        // Start drawing
        drawModel();
        
        // Control button handlers
        controls.querySelector('.rotate-left').addEventListener('click', () => {
            angle -= Math.PI / 8;
        });
        
        controls.querySelector('.rotate-right').addEventListener('click', () => {
            angle += Math.PI / 8;
        });
        
        controls.querySelector('.zoom-in').addEventListener('click', () => {
            scale = Math.min(scale * 1.2, 2.0);
        });
        
        controls.querySelector('.zoom-out').addEventListener('click', () => {
            scale = Math.max(scale * 0.8, 0.5);
        });
        
        controls.querySelector('.reset').addEventListener('click', () => {
            angle = 0;
            scale = 1;
        });
        
        // Handle mouse interactions
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            lastX = e.clientX;
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - lastX;
                angle += deltaX * 0.01;
                lastX = e.clientX;
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        canvas.addEventListener('mouseleave', () => {
            isDragging = false;
        });
        
        // Handle touch interactions
        canvas.addEventListener('touchstart', (e) => {
            isDragging = true;
            lastX = e.touches[0].clientX;
            e.preventDefault();
        });
        
        canvas.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const deltaX = e.touches[0].clientX - lastX;
                angle += deltaX * 0.01;
                lastX = e.touches[0].clientX;
            }
            e.preventDefault();
        });
        
        canvas.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        // Add instructions
        const instructions = document.createElement('div');
        instructions.className = 'viewer-instructions';
        instructions.innerHTML = '<p>Drag to rotate | Use controls to zoom</p>';
        container.appendChild(instructions);
    }, 1500);
}

/**
 * Initialize color theme generator
 */
function initColorThemeGenerator() {
    // Create theme customizer button if it doesn't exist
    if (!document.querySelector('.theme-customizer-btn')) {
        const themeButton = document.createElement('button');
        themeButton.className = 'theme-customizer-btn';
        themeButton.innerHTML = '<i class="fas fa-palette"></i>';
        themeButton.setAttribute('aria-label', 'Customize theme colors');
        themeButton.setAttribute('title', 'Customize theme colors');
        document.body.appendChild(themeButton);
        
        // Create theme customizer panel
        const themePanel = document.createElement('div');
        themePanel.className = 'theme-customizer-panel';
        themePanel.innerHTML = `
            <div class="theme-customizer-header">
                <h3>Customize Theme</h3>
                <button class="theme-customizer-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="theme-customizer-content">
                <div class="theme-color-option">
                    <label for="primary-color">Primary Color</label>
                    <input type="color" id="primary-color" value="${CONFIG.themeColors.primary}">
                </div>
                <div class="theme-color-option">
                    <label for="secondary-color">Secondary Color</label>
                    <input type="color" id="secondary-color" value="${CONFIG.themeColors.secondary}">
                </div>
                <div class="theme-color-option">
                    <label for="accent-color">Accent Color</label>
                    <input type="color" id="accent-color" value="${CONFIG.themeColors.accent}">
                </div>
                <div class="theme-preset-colors">
                    <h4>Quick Themes</h4>
                    <div class="theme-presets">
                        <button class="theme-preset" data-primary="#7038ff" data-secondary="#4f8dff" data-accent="#ff4b6e" style="background: linear-gradient(to right, #7038ff, #4f8dff)"></button>
                        <button class="theme-preset" data-primary="#ff4b6e" data-secondary="#ff8b3d" data-accent="#7038ff" style="background: linear-gradient(to right, #ff4b6e, #ff8b3d)"></button>
                        <button class="theme-preset" data-primary="#2ecc71" data-secondary="#3498db" data-accent="#e74c3c" style="background: linear-gradient(to right, #2ecc71, #3498db)"></button>
                        <button class="theme-preset" data-primary="#9b59b6" data-secondary="#3498db" data-accent="#e67e22" style="background: linear-gradient(to right, #9b59b6, #3498db)"></button>
                    </div>
                </div>
                <button class="btn btn-gradient reset-theme-btn">Reset to Default</button>
            </div>
        `;
        
        document.body.appendChild(themePanel);
        
        // Toggle theme panel
        themeButton.addEventListener('click', () => {
            themePanel.classList.toggle('active');
        });
        
        // Close theme panel
        const closeBtn = themePanel.querySelector('.theme-customizer-close');
        closeBtn.addEventListener('click', () => {
            themePanel.classList.remove('active');
        });
        
        // Update theme colors
        const primaryInput = document.getElementById('primary-color');
        const secondaryInput = document.getElementById('secondary-color');
        const accentInput = document.getElementById('accent-color');
        
        // Combined update function
        const updateThemeColors = debounce(() => {
            const primaryColor = primaryInput.value;
            const secondaryColor = secondaryInput.value;
            const accentColor = accentInput.value;
            
            // Update CSS variables
            document.documentElement.style.setProperty('--primary', primaryColor);
            document.documentElement.style.setProperty('--secondary', secondaryColor);
            document.documentElement.style.setProperty('--accent', accentColor);
            
            // Generate related colors
            const primaryDark = darkenColor(primaryColor, 20);
            const primaryLight = lightenColor(primaryColor, 20);
            const secondaryDark = darkenColor(secondaryColor, 20);
            const secondaryLight = lightenColor(secondaryColor, 20);
            const accentDark = darkenColor(accentColor, 20);
            const accentLight = lightenColor(accentColor, 20);
            
            // Update related CSS variables
            document.documentElement.style.setProperty('--primary-dark', primaryDark);
            document.documentElement.style.setProperty('--primary-light', primaryLight);
            document.documentElement.style.setProperty('--secondary-dark', secondaryDark);
            document.documentElement.style.setProperty('--secondary-light', secondaryLight);
            document.documentElement.style.setProperty('--accent-dark', accentDark);
            document.documentElement.style.setProperty('--accent-light', accentLight);
            
            // Update gradient
            const gradient = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
            document.documentElement.style.setProperty('--gradient-primary', gradient);
            
            // Save to localStorage
            CONFIG.themeColors = {
                primary: primaryColor,
                secondary: secondaryColor,
                accent: accentColor
            };
            
            localStorage.setItem('themeColors', JSON.stringify(CONFIG.themeColors));
        }, 100); // Debounce for performance
        
        // Handle color input changes
        primaryInput.addEventListener('input', updateThemeColors);
        secondaryInput.addEventListener('input', updateThemeColors);
        accentInput.addEventListener('input', updateThemeColors);
        
        // Theme presets
        const presetButtons = themePanel.querySelectorAll('.theme-preset');
        presetButtons.forEach(button => {
            button.addEventListener('click', () => {
                const primary = button.getAttribute('data-primary');
                const secondary = button.getAttribute('data-secondary');
                const accent = button.getAttribute('data-accent');
                
                primaryInput.value = primary;
                secondaryInput.value = secondary;
                accentInput.value = accent;
                
                updateThemeColors();
            });
        });
        
        // Reset theme
        const resetButton = themePanel.querySelector('.reset-theme-btn');
        resetButton.addEventListener('click', () => {
            primaryInput.value = '#7038ff';
            secondaryInput.value = '#4f8dff';
            accentInput.value = '#ff4b6e';
            
            updateThemeColors();
            
            // Remove inline styles to revert to CSS defaults
            document.documentElement.removeAttribute('style');
        });
        
        // Apply saved theme colors on load
        if (Object.keys(CONFIG.themeColors).length === 3) {
            primaryInput.value = CONFIG.themeColors.primary;
            secondaryInput.value = CONFIG.themeColors.secondary;
            accentInput.value = CONFIG.themeColors.accent;
            updateThemeColors();
        }
    }
    
    // Helper function to darken a color
    function darkenColor(color, percent) {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    }
    
    // Helper function to lighten a color
    function lightenColor(color, percent) {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    }
}

/**
 * Initialize voice commands
 */
function initVoiceCommands() {
    // Only initialize if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
    
    // Create voice control button if it doesn't exist
    if (!document.querySelector('.voice-control-btn')) {
        const voiceButton = document.createElement('button');
        voiceButton.className = 'voice-control-btn';
        voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceButton.setAttribute('aria-label', 'Voice navigation');
        voiceButton.setAttribute('title', 'Navigate with voice');
        document.body.appendChild(voiceButton);
        
        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        // Setup voice command system
        voiceButton.addEventListener('click', () => {
            if (CONFIG.voiceActive) {
                recognition.stop();
            } else {
                recognition.start();
                showToast('Voice navigation activated. Try saying "go to products"');
                voiceButton.classList.add('listening');
            }
            
            CONFIG.voiceActive = !CONFIG.voiceActive;
        });
        
        // Voice command result handling
        recognition.onresult = function(event) {
            const command = event.results[0][0].transcript.toLowerCase();
            console.log('Voice command:', command);
            
            // Show recognized command
            showToast(`Recognized: "${command}"`);
            
            // Extract section name from command
            let targetSection = null;
            
            if (command.includes('go to') || command.includes('navigate to') || command.includes('show')) {
                const sectionMap = {
                    'home': '#hero',
                    'hero': '#hero',
                    'solutions': '#solutions',
                    'products': '#products',
                    'services': '#services',
                    'games': '#games',
                    'team': '#team',
                    'about': '#about',
                    'contact': '#contact'
                };
                
                // Find the section mentioned in the command
                for (const [keyword, sectionId] of Object.entries(sectionMap)) {
                    if (command.includes(keyword)) {
                        targetSection = sectionId;
                        break;
                    }
                }
            } else if (command.includes('dark mode') || command.includes('light mode')) {
                // Toggle dark mode
                document.body.classList.toggle('dark-mode');
                CONFIG.isDarkMode = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', CONFIG.isDarkMode);
                showToast(CONFIG.isDarkMode ? 'Dark mode activated' : 'Light mode activated');
            } else if (command.includes('back to top') || command.includes('go top')) {
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showToast('Scrolling to top');
            }
            
            // Navigate to the target section
            if (targetSection) {
                const section = document.querySelector(targetSection);
                if (section) {
                    const headerHeight = document.querySelector('.mega-header')?.offsetHeight || 0;
                    const targetPosition = section.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    showToast(`Navigating to ${targetSection.substring(1)}`);
                }
            }
        };
        
        // Voice recognition status events
        recognition.onstart = function() {
            CONFIG.voiceActive = true;
            voiceButton.classList.add('listening');
        };
        
        recognition.onend = function() {
            CONFIG.voiceActive = false;
            voiceButton.classList.remove('listening');
        };
        
        recognition.onerror = function(event) {
            CONFIG.voiceActive = false;
            voiceButton.classList.remove('listening');
            showToast(`Voice recognition error: ${event.error}`);
        };
    }
}

/**
 * Initialize audio visualizer
 */
function initAudioVisualizer() {
    // Only initialize if Web Audio API is supported
    if (!hasWebAudioSupport()) return;
    
    // Create audio player button if it doesn't exist
    if (!document.querySelector('.audio-player-btn')) {
        const audioPlayerButton = document.createElement('button');
        audioPlayerButton.className = 'audio-player-btn';
        audioPlayerButton.innerHTML = '<i class="fas fa-music"></i>';
        audioPlayerButton.setAttribute('aria-label', 'Background music');
        audioPlayerButton.setAttribute('title', 'Play ambient music');
        document.body.appendChild(audioPlayerButton);
        
        // Create audio player panel
        const audioPanel = document.createElement('div');
        audioPanel.className = 'audio-player-panel';
        audioPanel.innerHTML = `
            <div class="audio-player-header">
                <h3>Audio Player</h3>
                <button class="audio-player-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="audio-player-content">
                <div class="audio-player-visualization">
                    <canvas class="audio-visualizer-canvas"></canvas>
                </div>
                <div class="audio-player-controls">
                    <button class="audio-play-btn">
                        <i class="fas fa-play"></i>
                    </button>
                    <div class="audio-progress-container">
                        <div class="audio-progress-bar"></div>
                    </div>
                    <button class="audio-mute-btn">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(audioPanel);
        
        // Toggle audio player
        audioPlayerButton.addEventListener('click', () => {
            audioPanel.classList.toggle('active');
            
            // Initialize audio context on first click
            if (!CONFIG.audioContext) {
                initAudioGeneration();
            }
        });
        
        // Close audio panel
        const closeBtn = audioPanel.querySelector('.audio-player-close');
        closeBtn.addEventListener('click', () => {
            audioPanel.classList.remove('active');
        });
    }
    
    // Initialize audio generation
    function initAudioGeneration() {
        // Create audio context
        CONFIG.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillators
        const oscillator1 = CONFIG.audioContext.createOscillator();
        const oscillator2 = CONFIG.audioContext.createOscillator();
        const oscillator3 = CONFIG.audioContext.createOscillator();
        
        oscillator1.type = 'sine';
        oscillator2.type = 'triangle';
        oscillator3.type = 'sine';
        
        oscillator1.frequency.value = 220; // A3
        oscillator2.frequency.value = 277.18; // C#4
        oscillator3.frequency.value = 329.63; // E4
        
        // Create gain nodes
        const gain1 = CONFIG.audioContext.createGain();
        const gain2 = CONFIG.audioContext.createGain();
        const gain3 = CONFIG.audioContext.createGain();
        const masterGain = CONFIG.audioContext.createGain();
        
        gain1.gain.value = 0.2;
        gain2.gain.value = 0.1;
        gain3.gain.value = 0.1;
        masterGain.gain.value = 0;
        
        // Connect oscillators to gains
        oscillator1.connect(gain1);
        oscillator2.connect(gain2);
        oscillator3.connect(gain3);
        
        // Connect gains to master gain
        gain1.connect(masterGain);
        gain2.connect(masterGain);
        gain3.connect(masterGain);
        
        // Connect master gain to destination
        masterGain.connect(CONFIG.audioContext.destination);
        
        // Create analyzer for visualization
        CONFIG.audioAnalyser = CONFIG.audioContext.createAnalyser();
        CONFIG.audioAnalyser.fftSize = 256;
        masterGain.connect(CONFIG.audioAnalyser);
        
        // Start oscillators
        oscillator1.start();
        oscillator2.start();
        oscillator3.start();
        
        // Store references
        CONFIG.audioSource = { oscillator1, oscillator2, oscillator3 };
        
        // Set up data array for visualization
        const bufferLength = CONFIG.audioAnalyser.frequencyBinCount;
        CONFIG.audioDataArray = new Uint8Array(bufferLength);
        
        // Start visualization
        visualizeAudio();
        
        // Set up player controls
        setupPlayerControls(masterGain);
    }
    
    // Setup audio player controls
    function setupPlayerControls(masterGain) {
        const audioPanel = document.querySelector('.audio-player-panel');
        const playButton = audioPanel.querySelector('.audio-play-btn');
        const muteButton = audioPanel.querySelector('.audio-mute-btn');
        const progressBar = audioPanel.querySelector('.audio-progress-bar');
        
        let isPlaying = false;
        let isMuted = false;
        
        // Play button handler
        playButton.addEventListener('click', () => {
            if (isPlaying) {
                // Pause - fade out audio
                masterGain.gain.setTargetAtTime(0, CONFIG.audioContext.currentTime, 0.1);
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                // Play - fade in audio
                CONFIG.audioContext.resume().then(() => {
                    masterGain.gain.setTargetAtTime(0.5, CONFIG.audioContext.currentTime, 0.5);
                });
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            }
            
            isPlaying = !isPlaying;
        });
        
        // Mute button handler
        muteButton.addEventListener('click', () => {
            if (isMuted) {
                // Unmute
                masterGain.gain.setTargetAtTime(isPlaying ? 0.5 : 0, CONFIG.audioContext.currentTime, 0.1);
                muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                // Mute
                masterGain.gain.setTargetAtTime(0, CONFIG.audioContext.currentTime, 0.1);
                muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
            
            isMuted = !isMuted;
        });
        
        // Simulate progress (since we're not playing actual audio files)
        let progress = 0;
        const progressInterval = setInterval(() => {
            if (isPlaying && !isMuted) {
                progress = (progress + 0.5) % 100;
                progressBar.style.width = `${progress}%`;
            }
        }, 1000);
    }
    
    // Audio visualization
    function visualizeAudio() {
        const canvas = document.querySelector('.audio-visualizer-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', debounce(resizeCanvas, 250));
        
        function render() {
            // Don't render if document is hidden or audio analyzer not available
            if (document.hidden || !CONFIG.audioAnalyser || !CONFIG.audioDataArray) {
                requestAnimationFrame(render);
                return;
            }
            
            requestAnimationFrame(render);
            
            // Get frequency data
            CONFIG.audioAnalyser.getByteFrequencyData(CONFIG.audioDataArray);
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Set bar width based on available data
            const barWidth = canvas.width / CONFIG.audioDataArray.length;
            let x = 0;
            
            // Draw bars
            CONFIG.audioDataArray.forEach(value => {
                const barHeight = (value / 255) * canvas.height;
                
                // Create gradient for bar
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
                gradient.addColorStop(0, '#7038ff');
                gradient.addColorStop(0.5, '#4f8dff');
                gradient.addColorStop(1, '#ff4b6e');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
                
                x += barWidth;
            });
        }
        
        render();
    }
}

/**
 * Initialize scroll-based animation sequences
 */
function initScrollSequences() {
    // Don't initialize on mobile
    if (CONFIG.isMobile) return;
    
    // Find sections with special animation sequences
    const sections = document.querySelectorAll('.products-section, .services-section');
    
    sections.forEach(section => {
        // Don't reinitialize if already present
        if (section.querySelector('.sequence-container')) return;
        
        // Create sequence container
        const sequenceContainer = document.createElement('div');
        sequenceContainer.className = 'sequence-container';
        
        // Create timeline indicators
        const timeline = document.createElement('div');
        timeline.className = 'scroll-timeline';
        
        // Add different indicators for each section
        if (section.classList.contains('products-section')) {
            timeline.innerHTML = `
                <div class="timeline-step" data-step="1">
                    <div class="timeline-indicator"></div>
                    <span>Discover</span>
                </div>
                <div class="timeline-step" data-step="2">
                    <div class="timeline-indicator"></div>
                    <span>Explore</span>
                </div>
                <div class="timeline-step" data-step="3">
                    <div class="timeline-indicator"></div>
                    <span>Choose</span>
                </div>
            `;
        } else {
            timeline.innerHTML = `
                <div class="timeline-step" data-step="1">
                    <div class="timeline-indicator"></div>
                    <span>Services</span>
                </div>
                <div class="timeline-step" data-step="2">
                    <div class="timeline-indicator"></div>
                    <span>Process</span>
                </div>
                <div class="timeline-step" data-step="3">
                    <div class="timeline-indicator"></div>
                    <span>Results</span>
                </div>
            `;
        }
        
        // Insert at top of section
        sequenceContainer.appendChild(timeline);
        section.prepend(sequenceContainer);
        
        // Track scroll in this section with IntersectionObserver for better performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateTimeline(entry.target);
                    }
                });
            }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
            
            observer.observe(section);
        } else {
            // Fallback with scroll event (less performant)
            window.addEventListener('scroll', debounce(() => {
                updateTimeline(section);
            }, 100));
        }
        
        // Function to update timeline based on scroll position
        function updateTimeline(section) {
            const rect = section.getBoundingClientRect();
            const totalHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Only update when section is visible
            if (rect.bottom > 0 && rect.top < viewportHeight) {
                // Calculate progress (0-1 range)
                const start = viewportHeight;
                const end = -totalHeight + viewportHeight;
                const current = Math.min(Math.max(rect.top, end), start);
                const progress = 1 - (current - end) / (start - end);
                
                // Update indicators
                const steps = timeline.querySelectorAll('.timeline-step');
                steps.forEach((step, index) => {
                    const stepProgress = (index + 1) / steps.length;
                    
                    if (progress >= stepProgress - 0.05) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
            }
        }
    });
}

/**
 * Initialize interactive timeline
 */
function initInteractiveTimeline() {
    // Add interactive timeline to about section if not already present
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection || aboutSection.querySelector('.interactive-timeline')) return;
    
    // Create timeline
    const timeline = document.createElement('div');
    timeline.className = 'interactive-timeline';
    timeline.innerHTML = `
        <h3 class="timeline-title">Our Journey</h3>
        <div class="timeline-track">
            <div class="timeline-line"></div>
            <div class="timeline-events">
                <div class="timeline-event" data-year="2012">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h4>2012</h4>
                        <h5>Company Founded</h5>
                        <p>JBLinx Studio was established with a vision to create innovative digital solutions.</p>
                    </div>
                </div>
                <div class="timeline-event" data-year="2015">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h4>2015</h4>
                        <h5>First Major Product</h5>
                        <p>Launched ConnectX, our flagship communication platform, to critical acclaim.</p>
                    </div>
                </div>
                <div class="timeline-event" data-year="2018">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h4>2018</h4>
                        <h5>Global Expansion</h5>
                        <p>Opened new offices in Europe and Asia, expanding our global reach.</p>
                    </div>
                </div>
                <div class="timeline-event" data-year="2023">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h4>2023</h4>
                        <h5>Innovation Award</h5>
                        <p>Received the prestigious Tech Innovation Award for our groundbreaking work.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert after about text
    const aboutText = aboutSection.querySelector('.about-text');
    if (aboutText) {
        aboutText.appendChild(timeline);
        
        // Animate timeline events using IntersectionObserver for better performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const event = entry.target;
                        event.classList.add('active');
                        
                        // Get all previous events
                        const year = parseInt(event.getAttribute('data-year'));
                        const timelineEvents = document.querySelectorAll('.timeline-event');
                        
                        // Activate previous events
                        timelineEvents.forEach(e => {
                            const eventYear = parseInt(e.getAttribute('data-year'));
                            if (eventYear <= year) {
                                e.classList.add('active');
                            }
                        });
                        
                        observer.unobserve(event);
                    }
                });
            }, { threshold: 0.5 });
            
            // Observe events
            const timelineEvents = timeline.querySelectorAll('.timeline-event');
            timelineEvents.forEach(event => {
                observer.observe(event);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            const timelineEvents = timeline.querySelectorAll('.timeline-event');
            timelineEvents.forEach(event => {
                event.classList.add('active');
            });
        }
    }
}

/**
 * Initialize cookie consent banner
 */
function initCookieConsent() {
    const cookiesConsent = document.getElementById('cookiesConsent');
    const acceptButton = document.querySelector('.btn-cookie-accept');
    const settingsButton = document.querySelector('.btn-cookie-settings');
    
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        // Show the banner with a slight delay
        setTimeout(() => {
            cookiesConsent.classList.add('active');
        }, 2000);
    }
    
    // Handle accept button click
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookiesConsent.classList.remove('active');
            
            // Add animation for smooth transition
            cookiesConsent.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            cookiesConsent.style.opacity = '0';
            
            setTimeout(() => {
                cookiesConsent.style.display = 'none';
            }, 500);
            
            showToast('Cookies preferences saved!');
        });
    }
    
    // Handle settings button click - could open a more detailed cookie modal
    if (settingsButton) {
        settingsButton.addEventListener('click', () => {
            // For now just accept cookies - in a real app, you'd show cookie preference settings
            localStorage.setItem('cookiesAccepted', 'true');
            cookiesConsent.classList.remove('active');
            
            showToast('Cookie preferences set to minimal!');
        });
    }
}

/**
 * Add cookie consent initialization to the list of initializations
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cookie consent banner
    initCookieConsent();
});

/**
 * Apply shimmer animation to gradient text elements
 */
function initShimmerEffects() {
    const gradientElements = document.querySelectorAll('.text-gradient');
    
    gradientElements.forEach(element => {
        element.classList.add('shimmer-animation');
    });
}

/**
 * Apply float animation to certain elements
 */
function initFloatAnimations() {
    // Apply to elements that should have a floating effect
    const floatElements = document.querySelectorAll('.floating-badge, .hero-image, .about-image img, .service-icon');
    
    floatElements.forEach(element => {
        // Add float animation with random delay for natural effect
        const delay = Math.random() * 2;
        element.style.animationDelay = `${delay}s`;
        element.classList.add('float-animation');
    });
}

/**
 * Add hover effect to the footer logo
 */
function initFooterInteractivity() {
    const footerLogo = document.querySelector('.footer-logo svg');
    const footerSocialIcons = document.querySelectorAll('.footer-social-icon');
    
    if (footerLogo) {
        footerLogo.addEventListener('mouseenter', () => {
            footerLogo.classList.add('rotate-animation');
        });
        
        footerLogo.addEventListener('mouseleave', () => {
            footerLogo.classList.remove('rotate-animation');
        });
    }
    
    // Add sequential hover effect to social icons
    if (footerSocialIcons.length) {
        footerSocialIcons.forEach((icon, index) => {
            icon.addEventListener('mouseenter', () => {
                // Create a wave effect through the icons
                footerSocialIcons.forEach((otherIcon, otherIndex) => {
                    const distance = Math.abs(index - otherIndex);
                    const delay = distance * 100;
                    
                    setTimeout(() => {
                        otherIcon.classList.add('animate-pulse');
                        
                        setTimeout(() => {
                            otherIcon.classList.remove('animate-pulse');
                        }, 500);
                    }, delay);
                });
            });
        });
    }
}

/**
 * Initialize performance improvements
 */
function initPerformanceOptimizations() {
    // Lazy load images that are below the fold
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports the loading attribute
        lazyImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    }
    
    // Debounce heavy event handlers like resize
    const debouncedResize = debounce(() => {
        // Handle window resize events efficiently
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }, 250);
    
    window.addEventListener('resize', debouncedResize);
    
    // Initial call
    debouncedResize();
}

/**
 * Add these enhanced functionalities to our initializations
 */
document.addEventListener('DOMContentLoaded', () => {
    // Add at the end of our existing DOM content loaded event
    
    // Initialize enhanced visual effects
    initShimmerEffects();
    initFloatAnimations();
    initFooterInteractivity();
    
    // Initialize performance improvements
    initPerformanceOptimizations();
});

/**
 * Initialize portfolio showcase functionality
 * Add dynamic filtering and animations to the portfolio section
 */
function initPortfolioShowcase() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');
    const loadMoreBtn = document.getElementById('loadMorePortfolio');
    
    // Initial items to show (add more hidden ones later)
    const initialItems = 6;
    let visibleItems = initialItems;
    
    // Apply initial staggered animations
    portfolioItems.forEach((item, index) => {
        // Set animation delay based on index
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Hide items beyond the initial count
        if (index >= initialItems) {
            item.style.display = 'none';
        }
    });
    
    // Handle filter clicks
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active state
            portfolioFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const category = filter.getAttribute('data-filter');
            
            // Filter items with smooth animations
            portfolioItems.forEach((item, index) => {
                const itemCategories = item.getAttribute('data-category');
                
                // Reset visibility for filtering
                item.style.display = '';
                
                setTimeout(() => {
                    // Show all if "all" is selected, otherwise filter by category
                    if (category === 'all' || itemCategories.includes(category)) {
                        // Show item with animation
                        item.style.animation = 'portfolioItemAppear 0.5s forwards';
                        item.style.animationDelay = `${index * 0.05}s`;
                        
                        // Only show initial items
                        if (index >= initialItems) {
                            item.style.display = 'none';
                        }
                    } else {
                        // Hide item with animation
                        item.style.animation = 'none';
                        item.style.opacity = 0;
                        // After animation completes, hide the element
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                }, 50); // Small delay for better visual transition
            });
            
            // Reset visible count
            visibleItems = initialItems;
            
            // Show load more button only if there are more items to show
            const currentFilter = filter.getAttribute('data-filter');
            let totalItems;
            
            if (currentFilter === 'all') {
                totalItems = portfolioItems.length;
            } else {
                totalItems = Array.from(portfolioItems).filter(item => {
                    return item.getAttribute('data-category').includes(currentFilter);
                }).length;
            }
            
            if (totalItems > initialItems) {
                loadMoreBtn.style.display = '';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        });
    });
    
    // Handle load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Get current filter
            const activeFilter = document.querySelector('.portfolio-filter.active');
            const currentFilter = activeFilter.getAttribute('data-filter');
            
            // Get filtered items
            let filteredItems;
            if (currentFilter === 'all') {
                filteredItems = Array.from(portfolioItems);
            } else {
                filteredItems = Array.from(portfolioItems).filter(item => {
                    return item.getAttribute('data-category').includes(currentFilter);
                });
            }
            
            // Show next batch of items with animation
            let newlyVisibleCount = 0;
            for (let i = visibleItems; i < filteredItems.length && newlyVisibleCount < 3; i++) {
                filteredItems[i].style.display = '';
                filteredItems[i].style.animation = 'portfolioItemAppear 0.5s forwards';
                filteredItems[i].style.animationDelay = `${newlyVisibleCount * 0.1}s`;
                newlyVisibleCount++;
            }
            
            // Update visible count
            visibleItems += newlyVisibleCount;
            
            // Hide button if all items are shown
            if (visibleItems >= filteredItems.length) {
                loadMoreBtn.style.display = 'none';
            }
            
            // Add loading animation to button
            loadMoreBtn.classList.add('is-loading');
            loadMoreBtn.innerText = 'Loading...';
            
            // Reset button after animation
            setTimeout(() => {
                loadMoreBtn.classList.remove('is-loading');
                loadMoreBtn.innerText = 'Load More Projects';
            }, 1000);
        });
    }
    
    // Initialize hover effects for portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Create a ripple effect across nearby items
            const centerX = item.getBoundingClientRect().left + (item.offsetWidth / 2);
            const centerY = item.getBoundingClientRect().top + (item.offsetHeight / 2);
            
            portfolioItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherX = otherItem.getBoundingClientRect().left + (otherItem.offsetWidth / 2);
                    const otherY = otherItem.getBoundingClientRect().top + (otherItem.offsetHeight / 2);
                    
                    // Calculate distance between items
                    const distance = Math.sqrt(Math.pow(centerX - otherX, 2) + Math.pow(centerY - otherY, 2));
                    
                    // Apply subtle effect to nearby items
                    if (distance < 500) {
                        const intensity = 1 - (distance / 500);
                        otherItem.style.transform = `scale(${0.98 + (intensity * 0.02)})`;
                        otherItem.style.filter = `brightness(${1 - (intensity * 0.1)})`;
                    }
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            // Reset effects
            portfolioItems.forEach(otherItem => {
                if (otherItem !== item && !otherItem.matches(':hover')) {
                    otherItem.style.transform = 'scale(0.98)';
                    otherItem.style.filter = 'brightness(1)';
                }
            });
        });
    });
}

// Initialize the portfolio showcase when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize portfolio showcase
    initPortfolioShowcase();
});

/**
 * Add portfolio item to navigation
 */
function updateNavigation() {
    // Add Portfolio to mega nav
    const solutionsNavItem = document.querySelector('.mega-nav-tab a[href="#solutions"]').parentElement;
    if (solutionsNavItem) {
        const portfolioNavItem = document.createElement('li');
        portfolioNavItem.className = 'mega-nav-tab';
        portfolioNavItem.innerHTML = `<a href="#portfolio" class="mega-nav-link">Portfolio</a>`;
        solutionsNavItem.parentNode.insertBefore(portfolioNavItem, solutionsNavItem.nextSibling);
    }
    
    // Add to mobile menu
    const mobileNavSolutions = document.querySelector('.mobile-nav-link[href="#solutions"]').parentElement;
    if (mobileNavSolutions) {
        const mobilePortfolioItem = document.createElement('li');
        mobilePortfolioItem.innerHTML = `<a href="#portfolio" class="mobile-nav-link" style="--i: 1.5;"><i class="fas fa-briefcase"></i> Portfolio</a>`;
        mobileNavSolutions.parentNode.insertBefore(mobilePortfolioItem, mobileNavSolutions.nextSibling);
    }
    
    // Add to dot navigation
    const dotNavSolutions = document.querySelector('.dot-nav-item[href="#solutions"]');
    if (dotNavSolutions) {
        const dotPortfolioItem = document.createElement('a');
        dotPortfolioItem.href = '#portfolio';
        dotPortfolioItem.className = 'dot-nav-item';
        dotPortfolioItem.setAttribute('data-tooltip', 'Portfolio');
        dotPortfolioItem.innerHTML = `<i class="fas fa-briefcase dot-nav-icon"></i>`;
        dotNavSolutions.parentNode.insertBefore(dotPortfolioItem, dotNavSolutions.nextSibling);
    }
    
    // Add to explorer tree
    const explorerSolutions = document.querySelector('.explorer-tree-file[href="#solutions"]');
    if (explorerSolutions && explorerSolutions.parentElement) {
        const explorerPortfolioItem = document.createElement('li');
        explorerPortfolioItem.className = 'explorer-tree-item';
        explorerPortfolioItem.innerHTML = `
            <a href="#portfolio" class="explorer-tree-file">
                <i class="fas fa-briefcase file-icon"></i>
                <span>Portfolio</span>
            </a>
        `;
        explorerSolutions.parentElement.parentNode.insertBefore(explorerPortfolioItem, explorerSolutions.parentElement.nextSibling);
    }
}

// Update navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});
