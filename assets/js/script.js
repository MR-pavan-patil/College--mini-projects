// ===== TOOL DATA =====
const tools = [{
        name: "Notes Sharing Website",
        category: "Study",
        description: "Subject-wise notes upload/download for your classmates and juniors.",
        url: "../notes_web/index.html",
        tag: "Notes",
        icon: "fa-solid fa-book-open",
    },
    {
        name: "Online Chat App",
        category: "Communication",
        description: "Real-time class group chat and private conversation system.",
        url: "../web-chat-app/index.html",
        tag: "Chat",
        icon: "fa-solid fa-comments",
    },
    {
        name: "Online Compiler",
        category: "Coding",
        description: "Run and test programming code directly inside your browser.",
        url: "projects/compiler-site/index.html",
        tag: "Programming",
        icon: "fa-solid fa-code",
    },
    {
        name: "AI Tools Lab",
        category: "AI",
        description: "Future space for AI, ML and automation experiments (coming soon).",
        url: "projects/ai-tools/index.html",
        tag: "Coming Soon",
        icon: "fa-solid fa-robot",
    },
    {
        name: "Attendance / Utility Tool",
        category: "Misc",
        description: "Any extra utility or experiment project you want to add.",
        url: "projects/utility-tool/index.html",
        tag: "Utility",
        icon: "fa-solid fa-wrench",
    },
];

// ===== DOM ELEMENTS =====
const toolsGrid = document.getElementById("toolsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const noResultsEl = document.getElementById("noResults");

// ===== RENDER TOOLS =====
function renderTools(list) {
    toolsGrid.innerHTML = "";

    if (!list.length) {
        noResultsEl.style.display = "block";
        return;
    } else {
        noResultsEl.style.display = "none";
    }

    list.forEach((tool) => {
        const card = document.createElement("div");
        card.className = "tool-card";
        card.setAttribute("data-aos", "fade-up");

        card.innerHTML = `
      <div>
        <div class="tool-icon">
          <i class="${tool.icon}"></i>
        </div>
        <div class="tool-title">${tool.name}</div>
        <div class="tool-category">${tool.category}</div>
        <p class="tool-desc">${tool.description}</p>
      </div>
      <div class="tool-footer">
        <span class="tool-tag">${tool.tag}</span>
        <button class="tool-btn" type="button">
          <span>Open Tool</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `;

        // 🔥 Poora card clickable:
        card.addEventListener("click", () => openTool(tool.url));

        toolsGrid.appendChild(card);
    });

    // AOS ko refresh karo jab naye elements aaye
    if (window.AOS) {
        AOS.refresh();
    }
}

// ===== FILTER LOGIC =====
function applyFilters() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const categoryValue = categoryFilter.value;

    const filtered = tools.filter((tool) => {
        const matchesCategory =
            categoryValue === "All" || tool.category === categoryValue;

        const textToSearch = `${tool.name} ${tool.description} ${tool.tag}`.toLowerCase();
        const matchesSearch = textToSearch.includes(searchValue);

        return matchesCategory && matchesSearch;
    });

    renderTools(filtered);
}

// ===== OPEN TOOL =====
function openTool(url) {
    // same tab
    window.location.href = url;
    // new tab ke liye:
    // window.open(url, "_blank");
}

// ===== SMOOTH SCROLL HELPER =====
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ===== EVENT LISTENERS =====
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

// Initial render
renderTools(tools);