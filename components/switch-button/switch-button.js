class SwitchButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="bg-[#E6F0FA] p-1 rounded-lg inline-flex">
                <button id="bireysel" class="px-4 py-2 rounded-lg bg-white text-sm font-medium transition-all duration-200">
                    Bireysel
                </button>
                <button id="kurumsal" class="px-4 py-2 rounded-lg bg-[#E6F0FA] text-sm font-medium transition-all duration-200">
                    Kurumsal
                </button>
            </div>
        `;
    }

    setupEventListeners() {
        const bireyselBtn = this.querySelector('#bireysel');
        const kurumsalBtn = this.querySelector('#kurumsal');

        bireyselBtn.addEventListener('click', () => {
            bireyselBtn.classList.add('bg-white');
            bireyselBtn.classList.remove('bg-[#E6F0FA]');
            kurumsalBtn.classList.add('bg-[#E6F0FA]');
            kurumsalBtn.classList.remove('bg-white');

            this.dispatchEvent(new CustomEvent('switch-change', {
                detail: { type: 'bireysel' },
                bubbles: true
            }));
        });

        kurumsalBtn.addEventListener('click', () => {
            kurumsalBtn.classList.add('bg-white');
            kurumsalBtn.classList.remove('bg-[#E6F0FA]');
            bireyselBtn.classList.add('bg-[#E6F0FA]');
            bireyselBtn.classList.remove('bg-white');

            this.dispatchEvent(new CustomEvent('switch-change', {
                detail: { type: 'kurumsal' },
                bubbles: true
            }));
        });
    }
}

customElements.define('switch-button', SwitchButton); 