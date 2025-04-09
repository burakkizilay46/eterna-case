class Router {
  constructor() {
    this.routes = {
      "/": "pages/home.html",
      "/service": "pages/service.html",
      "/category": "pages/category.html",
      "/messages": "pages/messages.html",
      "/settings": "pages/settings.html",
      "/item-detail": "pages/item-detail.html"
    };
    this.currentPath = window.location.pathname;
    this.mainContent = document.getElementById("main-content");
    this.init();
  }

  async init() {
    window.addEventListener("popstate", () => this.handleRoute());
    document.addEventListener("navigate", (e) => {
      const { path } = e.detail;
      this.navigate(path);
    });
    await this.handleRoute();
  }

  async navigate(path) {
    if (path === this.currentPath && !path.includes('?')) return;
    window.history.pushState({}, "", path);
    await this.handleRoute();
  }

  async handleRoute() {
    const path = window.location.pathname === "/" ? "/" : window.location.pathname;
    const basePath = path.split('?')[0];
    const route = this.routes[basePath] || this.routes["/"];

    // Show loading state
    this.mainContent.innerHTML = `
            <div class="flex items-center justify-center min-h-screen">
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p class="mt-2 text-gray-600">Yükleniyor...</p>
                </div>
            </div>
        `;

    try {
      const response = await fetch(route);
      if (!response.ok) throw new Error("Page not found");

      const html = await response.text();
      this.mainContent.innerHTML = html;

      // Execute scripts after content is loaded
      const scripts = this.mainContent.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        Array.from(script.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = script.textContent;
        script.parentNode.replaceChild(newScript, script);
      });

      this.currentPath = path;

      // Update page title
      const titles = {
        "/": "Anasayfa",
        "/service": "Hizmetler",
        "/category": "Kategoriler",
        "/messages": "Mesajlar",
        "/settings": "Ayarlar",
        "/item-detail": "Hizmet Detayı"
      };
      document.title = `${titles[basePath] || "Anasayfa"} | Eterna`;

      // Update active nav item
      this.updateActiveNavItem(basePath);
    } catch (error) {
      console.error("Error loading page:", error);
      this.mainContent.innerHTML = `
                <div class="flex flex-col items-center justify-center min-h-screen">
                    <h1 class="text-2xl font-bold text-gray-800 mb-4">Sayfa Bulunamadı</h1>
                    <p class="text-gray-600">İstediğiniz sayfa bulunamadı veya bir hata oluştu.</p>
                </div>
            `;
    }
  }

  updateActiveNavItem(path) {
    const navItems = document.querySelectorAll("app-navbar .nav-item");
    navItems.forEach((item) => {
      const itemPath = item.dataset.route;
      if (
        itemPath &&
        ("/" + itemPath === path || (itemPath === "home" && path === "/"))
      ) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
}

export default new Router();
