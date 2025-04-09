class SearchResults extends HTMLElement {
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
    this.filteredResults = [];
  }

  connectedCallback() {
    this.setupSearchListener();
    this.render();
  }

  setupSearchListener() {
    document.addEventListener("search", (e) => {
      const { searchTerm } = e.detail;
      this.filterResults(searchTerm);
    });
  }

  filterResults(searchTerm) {
    if (!searchTerm) {
      this.filteredResults = [];
    } else {
      this.filteredResults = this.highlights.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    this.render();
  }

  createResultCard(item) {
    return `
    <div class="w-full h-[116px] justify-between border-[1px] rounded-[10px] px-[10px] pt-[5px] pb-[10px] flex flex-col gap-2 cursor-pointer hover:border-blue-500 transition-colors" data-result-id="${item.id}">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-[42px] h-[42px]">
            <img src="assets/highlight.png" alt="highlight" class="w-full h-full object-cover rounded-full"/>
          </div>
          <div class="flex flex-col gap-[6px] h-[42px]">
            <p class="text-[20px] font-semibold text-[#27272E]">${item.title}</p>
            <div class="flex gap-2">
              <p class="text-[12px] font-normal text-[#667085]">4.0</p>
              <p class="text-[14px] font-semibold text-[#363A33] leading-[20px]">*****</p>
              <p class="text-[12px] font-normal text-[#2483F0]">(200 değerlendirme)</p>
            </div>
          </div>
        </div>
        <div>
          <img src="assets/icons/options.svg" alt="options" class="w-[14px] h-[14px]">
        </div>
      </div>
      <div class="w-full flex justify-between items-center">
        <div class="w-[103px] h-[40px] border-[1px] border-[#1570EF] rounded-[8px] items-center bg-[#EFF8FF] flex justify-center items-center gap-1" >
          <img src="assets/icons/send-message.svg" alt="send-message" class="w-[14px] h-[14px]">
          <p class="text-[12px] font-semibold text-[#1570EF] leading-[18px]">Mesaj At</p>
        </div>
        <p class="text-[12px] font-normal text-[#363A33]">
          <span class="font-semibold text-[24px]">₺ 500</span>
          'den başlayan fiyatlarla
        </p>
      </div>
    </div>
    `;
  }

  render() {
    if (this.filteredResults.length === 0) {
      this.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-500">Arama kriterlerinize uygun sonuç bulunamadı.</p>
        </div>
      `;
      return;
    }

    this.innerHTML = `
      <div class="grid grid-cols-1 gap-4">
        ${this.filteredResults.map((item) => this.createResultCard(item)).join("")}
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const resultCards = this.querySelectorAll("[data-result-id]");
    resultCards.forEach((card) => {
      card.addEventListener("click", () => {
        const resultId = card.dataset.resultId;
        document.dispatchEvent(
          new CustomEvent("navigate", {
            detail: {
              path: `/item-detail?id=${resultId}`
            },
            bubbles: true
          })
        );
      });
    });
  }
}

customElements.define("search-results", SearchResults);
