
/**
 * MUSEO V2
 * 룸서비스 주문관리 - 데모 기능
 *
 * 실제 Supabase 연결 전 테스트용 코드
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const orderGrid = document.getElementById("orderGrid");
  const filterButtons = document.querySelectorAll(
    ".order-tab[data-filter]"
  );

  if (!orderGrid) {
    console.error("주문 목록을 찾을 수 없습니다.");
    return;
  }

  // 주문 상태별 필터
  function filterOrders(status) {
    const cards = orderGrid.querySelectorAll(".order-card");

    cards.forEach((card) => {
      const visible =
        status === "all" || card.dataset.status === status;

      card.hidden = !visible;
      card.style.display = visible ? "" : "none";
    });

    filterButtons.forEach((button) => {
      const active = button.dataset.filter === status;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  // 주문 카드 상태 표시
  function updateOrderCard(card, status) {
    const badge = card.querySelector(".badge");
    const footer = card.querySelector(".order-card-footer");

    const statusInfo = {
      new: {
        label: "신규 주문",
        badgeClass: "new"
      },
      cooking: {
        label: "조리 중",
        badgeClass: "cooking"
      },
      done: {
        label: "완료",
        badgeClass: "done"
      },
      rejected: {
        label: "거절",
        badgeClass: "rejected"
      }
    };

    const info = statusInfo[status];
    if (!info) return;

    card.dataset.status = status;

    if (badge) {
      badge.className = `badge ${info.badgeClass}`;
      badge.textContent = info.label;
    }

    if (footer) {
      if (status === "cooking") {
        footer.innerHTML = `
          <button class="action-btn btn-primary"
                  data-action="complete">완료</button>
          <button class="action-btn btn-secondary"
                  data-action="print">인쇄</button>
        `;
      } else if (status === "done" || status === "rejected") {
        footer.innerHTML = `
          <button class="action-btn btn-secondary"
                  data-action="print">인쇄</button>
        `;
      }
    }

    const selectedFilter = document.querySelector(
      ".order-tab.active[data-filter]"
    );

    filterOrders(selectedFilter?.dataset.filter || "all");
  }

  // 필터 버튼 연결
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterOrders(button.dataset.filter);
    });
  });

  // 주문 버튼 연결
  orderGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const card = button.closest(".order-card");
    if (!card) return;

    const action = button.dataset.action;
    const orderNumber =
      card.querySelector(".order-number")?.textContent || "주문";

    if (action === "accept") {
      updateOrderCard(card, "cooking");
      alert(`${orderNumber} 접수 처리되었습니다. (데모)`);
    }

    if (action === "reject") {
      if (confirm(`${orderNumber} 주문을 거절하시겠습니까?`)) {
        updateOrderCard(card, "rejected");
        alert("주문이 거절되었습니다. (데모)");
      }
    }

    if (action === "complete") {
      updateOrderCard(card, "done");
      alert(`${orderNumber} 완료 처리되었습니다. (데모)`);
    }

    if (action === "print") {
      alert("인쇄 기능은 별도 페이지로 연결할 예정입니다.");
    }
  });

  // 초기 필터 설정
  filterOrders("all");

  console.log("MUSEO V2 주문관리 데모 준비 완료");
});
