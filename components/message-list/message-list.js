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
        messageType: "incoming",
      },
      {
        id: 2,
        name: "Mehmet Kaya",
        message: "Fiyat bilgisi alabilir miyim?",
        time: "15:30",
        image: "assets/avatar.jpeg",
        isRead: false,
        date: "yesterday",
        messageType: "incoming",
      },
      {
        id: 3,
        name: "Ayşe Demir",
        message: "Teşekkür ederim, görüşmek üzere",
        time: "12:45",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "yesterday",
        messageType: "incoming",
      },
      {
        id: 4,
        name: "Fatma Şahin",
        message: "Hafta sonu müsait misiniz?",
        time: "18:20",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "lastweek",
        messageType: "incoming",
      },
      {
        id: 1,
        name: "Ahmet Yılmaz",
        message: "Merhaba, ev temizliği için...",
        time: "7:09",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "today",
        messageType: "outgoing",
      },
      {
        id: 2,
        name: "Mehmet Kaya",
        message: "Fiyat bilgisi alabilir miyim?",
        time: "15:30",
        image: "assets/avatar.jpeg",
        isRead: false,
        date: "yesterday",
        messageType: "outgoing",
      },
      {
        id: 3,
        name: "Ayşe Demir",
        message: "Teşekkür ederim, görüşmek üzere",
        time: "12:45",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "yesterday",
        messageType: "outgoing",
      },
      {
        id: 4,
        name: "Fatma Şahin",
        message: "Hafta sonu müsait misiniz?",
        time: "18:20",
        image: "assets/avatar.jpeg",
        isRead: true,
        date: "lastweek",
        messageType: "outgoing",
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
          <p class="${message.messageType === "outgoing" ? 'text-[#9095A0]' : 'text-[#575757]'} text-[14px] font-semibold mt-1 flex items-center gap-2">
            ${message.messageType === "incoming" ? `<img src="assets/icons/incoming.svg" alt="incoming" class="w-[14px] h-[14px]">` : `<img src="assets/icons/sent.svg" alt="sent" class="w-[14px] h-[14px]">`}
            ${message.message}
          </p>  
          <!-- Okundu/Okunmadı İkonu -->
        ${
          message.isRead
            ? `
          <img src="assets/icons/readed.svg" alt="readed" class="w-[14px] h-[14px]">
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
