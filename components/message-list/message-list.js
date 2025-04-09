class MessageList extends HTMLElement {
  constructor() {
    super();
    this.messages = [
      {
        id: 1,
        name: "Ahmet Yılmaz",
        message: "Merhaba, ev temizliği için...",
        time: "7:09",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "today",
      },
      {
        id: 2,
        name: "Mehmet Kaya",
        message: "Fiyat bilgisi alabilir miyim?",
        time: "15:30",
        image: "assets/avatar.jpeg",
        isRead: false,
        date: "yesterday",
      },
      {
        id: 3,
        name: "Ayşe Demir",
        message: "Teşekkür ederim, görüşmek üzere",
        time: "12:45",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "yesterday",
      },
      {
        id: 4,
        name: "Fatma Şahin",
        message: "Hafta sonu müsait misiniz?",
        time: "18:20",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "lastweek",
      },
      {
        id: 1,
        name: "Ahmet Yılmaz",
        message: "Merhaba, ev temizliği için...",
        time: "7:09",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "today",
      },
      {
        id: 2,
        name: "Mehmet Kaya",
        message: "Fiyat bilgisi alabilir miyim?",
        time: "15:30",
        image: "assets/avatar.jpeg",
        isRead: false,
        date: "yesterday",
      },
      {
        id: 3,
        name: "Ayşe Demir",
        message: "Teşekkür ederim, görüşmek üzere",
        time: "12:45",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "yesterday",
      },
      {
        id: 4,
        name: "Fatma Şahin",
        message: "Hafta sonu müsait misiniz?",
        time: "18:20",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "lastweek",
      },
    ];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  createMessageCard(message) {
    return `
      <div class="flex items-center bg-white  cursor-pointer mt-[8px]" data-message-id="${
        message.id
      }">
        <!-- Profil Resmi -->
        <img src="${message.image}" alt="${
      message.name
    }" class="w-[56px] h-[56px] rounded-full mr-2 object-cover">
        
        <!-- İçerik -->
        <div class="flex-1">
          <div class="flex justify-between items-center w-full">
            <!-- Kullanıcı Adı -->
            <h3 class="text-[#3B3E45] text-[16px] font-semibold">${
              message.name
            }</h3>
            <!-- Zaman -->
            <span class="text-[#A5A5A5] text-[12px] font-semibold">${
              message.time
            }</span>
          </div>
          <!-- Mesaj -->

          <div class="flex justify-between items-center w-full">
          <p class="text-[#9095A0] text-[14px] font-semibold mt-1 flex items-center">
            <svg class="w-4 h-4 text-[#9095A0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v16l4-4h12V4H4zm8 6h.01M8 10h.01M16 10h.01"></path>
            </svg>
            ${message.message}
          </p>  
          <!-- Okundu/Okunmadı İkonu -->
        ${
          message.isRead
            ? `
          <svg class="w-4 h-4 text-[#0052F1] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        `
            : `
          <div class="w-2 h-2 rounded-full bg-[#0052F1] ml-2"></div>
        `
        }
          </div>
        </div>
      </div>
    `;
  }

  groupMessagesByDate() {
    const groups = {
      today: {
        title: "Bugün",
        messages: [],
      },
      yesterday: {
        title: "Dün",
        messages: [],
      },
      lastweek: {
        title: "Geçen Hafta",
        messages: [],
      },
    };

    this.messages.forEach((message) => {
      if (groups[message.date]) {
        groups[message.date].messages.push(message);
      }
    });

    return groups;
  }

  render() {
    const messageGroups = this.groupMessagesByDate();

    this.innerHTML = `
      <div class="flex flex-col gap-6">
        ${Object.values(messageGroups)
          .filter((group) => group.messages.length > 0)
          .map(
            (group) => `
            <div class="flex flex-col gap-2">
              <h2 class="text-[#161616] text-[20px] font-semibold leading-[20px]">${
                group.title
              }</h2>
              ${group.messages
                .map((message) => this.createMessageCard(message))
                .join("")}
            </div>
          `
          )
          .join("")}
      </div>
    `;
  }

  setupEventListeners() {
    const messageCards = this.querySelectorAll("[data-message-id]");
    messageCards.forEach((card) => {
      card.addEventListener("click", () => {
        const messageId = card.dataset.messageId;
        const message = this.messages.find((m) => m.id === parseInt(messageId));
        if (message) {
          this.dispatchEvent(
            new CustomEvent("message-selected", {
              detail: message,
              bubbles: true,
            })
          );
        }
      });
    });
  }
}

customElements.define("message-list", MessageList);
