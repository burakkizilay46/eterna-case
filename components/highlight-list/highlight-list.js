class HighlightList extends HTMLElement {
  constructor() {
    super();
    this.highlights = [
      {
        id: 1,
        title: "Tamirat Servisi",
        price: "200 TL'den başlayan fiyatlar...",
        image: "/assets/highlight.png",
      },
      {
        id: 2,
        title: "Temizlik Servisi",
        price: "150 TL'den başlayan fiyatlar...",
        image: "/assets/highlight.png",
      },
      {
        id: 3,
        title: "Nakliyat Servisi",
        price: "300 TL'den başlayan fiyatlar...",
        image: "/assets/highlight.png",
      },
      {
        id: 4,
        title: "Boyacı Servisi",
        price: "250 TL'den başlayan fiyatlar...",
        image: "/assets/highlight.png",
      },
    ];
    this.filteredHighlights = [...this.highlights];
  }
  

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.setupSearchListener();
  }

  setupSearchListener() {
    document.addEventListener('search', (e) => {
      const { searchTerm } = e.detail;
      this.filterHighlights(searchTerm);
    });
  }

  filterHighlights(searchTerm) {
    if (!searchTerm) {
      this.filteredHighlights = [...this.highlights];
    } else {
      this.filteredHighlights = this.highlights.filter(highlight =>
        highlight.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    this.render();
  }

  setupEventListeners() {
    const highlightCards = this.querySelectorAll("[data-highlight-id]");
    highlightCards.forEach((card) => {
      card.addEventListener("click", () => {
        const highlightId = card.dataset.highlightId;
        const highlight = this.highlights.find(
          (h) => h.id === parseInt(highlightId)
        );
        if (highlight) {
          document.dispatchEvent(
            new CustomEvent("navigate", {
              detail: {
                path: `/highlight/${highlight.id}`
              },
              bubbles: true
            })
          );
        }
      });
    });
  }

  createHighlightCard(highlight) {
    return `
    <div class="min-w-[250px] h-[160px] relative rounded-[10px] overflow-hidden cursor-pointer group" data-highlight-id="${highlight.id}">
       <!-- Background Image -->
       <div class="absolute inset-0 w-full h-full">
          <img src="${highlight.image}" alt="${highlight.title}" class="w-full h-full object-cover">
       </div>
       <!-- Gradient Overlay -->
       <div class="absolute inset-0 "></div>
       <!-- Content -->
       <div class="absolute inset-0 mx-1 mb-1 flex flex-col justify-between">
          <!-- Arrow Icon -->
          <div class="self-end">
          </div>
          <!-- Text Content -->
          <div class="text-white p-2 bg-white/30 backdrop-blur-sm rounded-[10px] h-[74px] flex flex-col justify-between">
             <div class="flex justify-end">
                <div class="w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-all duration-300 bg-white">
                   <svg class="w-4 h-4 text-[#0052F1] -rotate-45" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                </div>
             </div>
             <div>
                <p class="text-[12px] font-normal text-white">${highlight.price}</p>
                <h3 class="text-[16px] font-semibold">${highlight.title}</h3>
             </div>
          </div>
       </div>
    </div>
    `;
  }

  render() {
    this.innerHTML = `
            <div class="overflow-x-auto hide-scrollbar">
                <div class="flex gap-4 pb-4">
                    ${this.filteredHighlights
                      .map((highlight) => this.createHighlightCard(highlight))
                      .join("")}
                </div>
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
    const highlightCards = this.querySelectorAll("[data-highlight-id]");
    highlightCards.forEach((card) => {
      card.addEventListener("click", () => {
        const highlightId = card.dataset.highlightId;
        const highlight = this.highlights.find(
          (h) => h.id === parseInt(highlightId)
        );
        if (highlight) {
          this.dispatchEvent(
            new CustomEvent("highlight-selected", {
              detail: highlight,
              bubbles: true,
            })
          );
        }
      });
    });
  }
}

customElements.define("highlight-list", HighlightList);
