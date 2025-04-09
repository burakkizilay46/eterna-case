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
                                <img src="assets/icons/home.svg" alt="Anasayfa" class="w-6 h-6 mx-auto">
                                <span class="text-[12px] font-semibold mt-1">Anasayfa</span>
                            </a>

                            <!-- Hizmet -->
                            <a href="#" class="nav-item flex-1 flex flex-col items-center justify-center py-3" data-route="service">
                                 <img src="assets/icons/services.svg" alt="Service" class="w-6 h-6 mx-auto">
                               <span class="text-[12px] font-semibold mt-1">Hizmet</span>
                            </a>

                            <!-- Kategori -->
                            <a href="#" class="nav-item flex-1 flex flex-col items-center justify-center py-3" data-route="category">
                                <img src="assets/icons/star.svg" alt="Kategori" class="w-6 h-6 mx-auto">
                               <span class="text-[12px] font-semibold mt-1">Kategori</span>
                            </a>

                            <!-- Mesajlar -->
                            <a href="#" class="nav-item flex-1 flex flex-col items-center justify-center py-3" data-route="messages">
                                 <img src="assets/icons/message.svg" alt="message" class="w-6 h-6 mx-auto">
                                <span class="text-[12px] font-semibold mt-1">Mesajlar</span>
                            </a>

                            <!-- Ayarlar -->
                            <a href="#" class="nav-item flex-1 flex flex-col items-center justify-center py-3" data-route="settings">
                                <img src="assets/icons/settings.svg" alt="settings" class="w-6 h-6 mx-auto">
                                <span class="text-[12px] font-semibold mt-1">Ayarlar</span>
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
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .nav-item img {
                display: block;
                margin: 0 auto;
                filter: brightness(0) saturate(100%) invert(40%) sepia(8%) saturate(1017%) hue-rotate(185deg) brightness(94%) contrast(86%);
                transition: all 0.3s ease;
            }
            .nav-item.active {
                color: #2483F0;
            }
            .nav-item.active img {
                filter: brightness(0) saturate(100%) invert(40%) sepia(95%) saturate(2476%) hue-rotate(202deg) brightness(98%) contrast(101%);
            }
            .nav-item svg {
                color: #6B7280;
                transition: all 0.3s ease;
            }
            .nav-item.active::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 24px;
                height: 2px;
                background-color: #2483F0;
            }
            .active-indicator {
                position: absolute;
                bottom: 0;
                height: 2px;
                background-color: #2483F0;
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