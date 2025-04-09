class Navbar extends HTMLElement {
    constructor() {
        super();
        this.routes = {
            'home': '/',
            'service': '/service',
            'category': '/category',
            'messages': '/messages',
            'settings': '/settings'
        };
        this.activeRoute = 'home';
    }

    connectedCallback() {
        this.render();
        this.addStyles();
        this.setupNavigation();
        this.highlightCurrentRoute();
    }

    render() {
        this.innerHTML = `
            <div class="fixed bottom-0 left-0 right-0 z-40">
                <!-- Background element -->
                <div class="h-[58px] bg-[#E5EEFF] w-full"></div>
                <!-- Navbar with padding -->
                <div class="fixed bottom-0 left-0 right-0 z-50 p-3">
                    <nav class="bg-white rounded-[10px] shadow-lg overflow-hidden">
                        <div class="flex items-center justify-between w-full">
                            <!-- Anasayfa -->
                            <a href="#" class="nav-item flex-1 flex flex-col items-center justify-center py-3 relative" data-route="home">
                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke-width="1.5"/>
                                </svg>
                                <span class="text-xs mt-1">Anasayfa</span>
                            </a>

                            <!-- Hizmet -->
                            <a href="#" class="nav-item flex-1 flex flex-col items-center justify-center py-3" data-route="service">
                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M20 7h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" stroke-width="1.5"/>
                                </svg>
                                <span class="text-xs mt-1">Hizmet</span>
                            </a>

                            <!-- Kategori -->
                            <a href="#" class="nav-item flex-1 flex flex-col items-center justify-center py-3" data-route="category">
                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="1.5"/>
                                </svg>
                                <span class="text-xs mt-1">Kategori</span>
                            </a>

                            <!-- Mesajlar -->
                            <a href="#" class="nav-item flex-1 flex flex-col items-center justify-center py-3" data-route="messages">
                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke-width="1.5"/>
                                </svg>
                                <span class="text-xs mt-1">Mesajlar</span>
                            </a>

                            <!-- Ayarlar -->
                            <a href="#" class="nav-item flex-1 flex flex-col items-center justify-center py-3" data-route="settings">
                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke-width="1.5"/>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke-width="1.5"/>
                                </svg>
                                <span class="text-xs mt-1">Ayarlar</span>
                            </a>
                        </div>
                        <div class="active-indicator"></div>
                    </nav>
                </div>
            </div>
        `;
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            nav {
                border-top: 1px solid #F3F4F6;
            }
            .nav-item {
                color: #6B7280;
                transition: all 0.3s ease;
                position: relative;
            }
            .nav-item.active {
                color: #2563EB;
            }
            .nav-item.active svg {
                color: #2563EB;
            }
            .nav-item svg {
                color: #6B7280;
                transition: all 0.3s ease;
            }
            .nav-item.active::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: #2563EB;
            }
            .active-indicator {
                position: absolute;
                bottom: 0;
                height: 2px;
                background-color: #2563EB;
                transition: all 0.3s ease;
            }
        `;
        this.appendChild(style);
    }

    setupNavigation() {
        const navItems = this.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const route = item.dataset.route;
                
                if (route) {
                    this.updateActiveItem(route);
                    this.dispatchEvent(new CustomEvent('navigate', {
                        detail: { 
                            route: route,
                            path: this.routes[route]
                        },
                        bubbles: true
                    }));
                }
            });
        });
    }

    updateActiveItem(route) {
        const navItems = this.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        const activeItem = this.querySelector(`[data-route="${route}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        this.activeRoute = route;
    }

    highlightCurrentRoute() {
        const path = window.location.pathname;
        const route = Object.entries(this.routes).find(([key, value]) => value === path)?.[0] || 'home';
        this.updateActiveItem(route);
    }
}

customElements.define('app-navbar', Navbar); 