class Header extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    try {
      const response = await fetch('components/header/header.html');
      const html = await response.text();
      this.innerHTML = html;
      this.setupSearch();
    } catch (error) {
      console.error('Header template yüklenemedi:', error);
      this.innerHTML = '<div>Header yüklenemedi</div>';
    }
  }

  // Search işlevselliği için metod
  setupSearch() {
    const searchInput = this.querySelector('input[type="text"]');
    const filterButton = this.querySelector('.filter-button');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        document.dispatchEvent(new CustomEvent('search', {
          detail: { searchTerm },
          bubbles: true
        }));
      });
    }

    if (filterButton) {
      filterButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('filter', {
          bubbles: true
        }));
      });
    }
  }
}

// Web component'i kaydet
customElements.define("app-header", Header);
