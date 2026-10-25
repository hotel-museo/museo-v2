
/**
 * MUSEO V2
 * 공통 관리자 사이드바
 *
 * 관리자 메뉴를 이 파일 하나에서 관리합니다.
 */

"use strict";

(() => {
  const menus = [
    {
      title: "OVERVIEW",
      items: [
        {
          label: "대시보드",
          path: "index.html"
        }
      ]
    },
    {
      title: "F&B MANAGEMENT",
      items: [
        {
          label: "주문관리",
          path: "pages/orders.html"
        },
        {
          label: "메뉴관리",
          path: "pages/menus.html"
        },
        {
          label: "세트메뉴 관리",
          path: "pages/sets.html"
        },
        {
          label: "번역관리",
          path: "pages/translations.html"
        },
        {
          label: "매출관리",
          path: "pages/sales.html"
        }
      ]
    },
    {
      title: "HOTEL MANAGEMENT",
      items: [
        {
          label: "객실 서비스 (예정)",
          path: null
        },
        {
          label: "하우스키핑 (예정)",
          path: null
        },
        {
          label: "시설관리 (예정)",
          path: null
        }
      ]
    },
    {
      title: "SYSTEM",
      items: [
        {
          label: "설정 (예정)",
          path: null
        }
      ]
    }
  ];

  function getRootPath() {
    const script = document.querySelector(
      'script[src*="js/shared/sidebar.js"]'
    );

    if (!script) return "./";

    const url = new URL(script.src, window.location.href);

    return url.pathname.replace(
      /js\/shared\/sidebar\.js$/,
      ""
    );
  }

  function renderSidebar() {
    const sidebar = document.querySelector(".sidebar");

    if (!sidebar) return;

    const rootPath = getRootPath();

    sidebar.replaceChildren();

    const brand = document.createElement("div");
    brand.className = "brand";
    brand.append(document.createTextNode("MUSEO"));

    const subtitle = document.createElement("small");
    subtitle.textContent = "HOTEL OPERATIONS V2";
    brand.appendChild(subtitle);

    sidebar.appendChild(brand);

    menus.forEach((group) => {
      const title = document.createElement("div");
      title.className = "nav-title";
      title.textContent = group.title;
      sidebar.appendChild(title);

      group.items.forEach((item) => {
        const link = document.createElement("a");
        link.className = "nav-item";
        link.textContent = item.label;

        if (item.path) {
          const target = new URL(
            rootPath + item.path,
            window.location.origin
          );

          link.href = target.href;

          if (
            window.location.pathname.replace(/\/$/, "/index.html") ===
            target.pathname
          ) {
            link.classList.add("active");
          }
        } else {
          link.removeAttribute("href");
          link.setAttribute("aria-disabled", "true");
          link.style.opacity = "0.55";
          link.style.cursor = "default";
        }

        sidebar.appendChild(link);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      renderSidebar
    );
  } else {
    renderSidebar();
  }
})();
