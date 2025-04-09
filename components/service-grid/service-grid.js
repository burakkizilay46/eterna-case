class ServiceGrid extends HTMLElement {
    constructor() {
        super();
        this.services = [
            { id: 1, name: 'Ev Temizliği', icon: 'M3 3v18h18M3 15h6v3h6v-6h6' },
            { id: 2, name: 'Ofis Temizliği', icon: 'M3 3v18h18M3 15h6v3h6v-6h6' },
            { id: 3, name: 'Koltuk Temizliği', icon: 'M3 3v18h18M3 15h6v3h6v-6h6' },
            { id: 4, name: 'Halı Temizliği', icon: 'M3 3v18h18M3 15h6v3h6v-6h6' },
            { id: 5, name: 'Cam Temizliği', icon: 'M3 3v18h18M3 15h6v3h6v-6h6' },
            { id: 6, name: 'Banyo Temizliği', icon: 'M3 3v18h18M3 15h6v3h6v-6h6' },
            { id: 7, name: 'Mutfak Temizliği', icon: 'M3 3v18h18M3 15h6v3h6v-6h6' },
            { id: 8, name: 'Zemin Temizliği', icon: 'M3 3v18h18M3 15h6v3h6v-6h6' },
            { id: 9, name: 'Genel Temizlik', icon: 'M3 3v18h18M3 15h6v3h6v-6h6' }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    createServiceCard(service) {
        return `
            <div class="w-fit flex gap-3 items-center border-[1px] rounded-[10px] px-[10px] py-2 border-[#E9EAEC] hover:border-blue-500 transition-colors duration-200 cursor-pointer" data-service-id="${service.id}">
                <div class="size-[40px] bg-blue-50 rounded-[10px] bg-[#E5EEFF] flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="black" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${service.icon}"/>
                    </svg>
                </div>
                <span class="text-[#3B3E45] font-normal text-[14px] leading-[24px] whitespace-nowrap">${service.name}</span>
            </div>
        `;
    }

    splitIntoRows(services, rowCount = 3) {
        const itemsPerRow = Math.ceil(services.length / rowCount);
        return Array.from({ length: rowCount }, (_, i) => 
            services.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
        );
    }

    render() {
        const rows = this.splitIntoRows(this.services);
        this.innerHTML = `
            <div class="flex flex-col gap-3">
                ${rows.map(row => `
                    <div class="overflow-x-auto hide-scrollbar">
                        <div class="flex gap-3 pb-3">
                            ${row.map(service => this.createServiceCard(service)).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <style>
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            </style>
        `;
    }

    setupEventListeners() {
        const serviceCards = this.querySelectorAll('[data-service-id]');
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceId = card.dataset.serviceId;
                const service = this.services.find(s => s.id === parseInt(serviceId));
                if (service) {
                    this.dispatchEvent(new CustomEvent('service-selected', {
                        detail: service,
                        bubbles: true
                    }));
                }
            });
        });
    }
}

customElements.define('service-grid', ServiceGrid); 