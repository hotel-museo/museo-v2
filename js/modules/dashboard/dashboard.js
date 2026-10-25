
/**
 * MUSEO V2
 * 프리미엄 호텔 관리자 대시보드
 *
 * 현재는 데모 데이터 사용
 * 실제 Supabase 연결은 추후 진행
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // 1. 오늘 날짜 표시
  // =====================================

  const dateElement = document.getElementById("todayDate");

  if (dateElement) {
    const today = new Date();

    dateElement.textContent = new Intl.DateTimeFormat(
      "ko-KR",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short"
      }
    ).format(today);
  }

  // Chart.js가 로드되지 않은 경우
  if (typeof Chart === "undefined") {
    console.error("Chart.js 라이브러리를 불러오지 못했습니다.");
    return;
  }

  // =====================================
  // 2. 공통 차트 설정
  // =====================================

  Chart.defaults.font.family =
    "'Malgun Gothic', Arial, sans-serif";

  Chart.defaults.color = "#817e75";

  // =====================================
  // 3. 시간대별 주문 현황
  // =====================================

  const ordersCanvas = document.getElementById("ordersChart");

  if (ordersCanvas) {
    new Chart(ordersCanvas, {
      type: "bar",

      data: {
        labels: [
          "07시", "09시", "11시",
          "13시", "15시", "17시",
          "19시", "21시", "23시"
        ],

        datasets: [
          {
            label: "어제",
            data: [0, 1, 2, 3, 2, 4, 6, 5, 1],
            backgroundColor: "#dfcba7",
            borderRadius: 5,
            maxBarThickness: 17
          },
          {
            label: "오늘",
            data: [0, 0, 2, 4, 3, 5, 9, 7, 2],
            backgroundColor: "#174735",
            borderRadius: 5,
            maxBarThickness: 17
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false
          },

          tooltip: {
            backgroundColor: "#173b2d",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            padding: 12,
            cornerRadius: 8
          }
        },

        scales: {
          x: {
            grid: {
              display: false
            },

            ticks: {
              font: {
                size: 10
              }
            }
          },

          y: {
            beginAtZero: true,

            ticks: {
              stepSize: 2,
              precision: 0
            },

            grid: {
              color: "#f0ebe4"
            },

            border: {
              display: false
            }
          }
        }
      }
    });
  }

  // =====================================
  // 4. 주문 카테고리 도넛 차트
  // =====================================

  const categoryCanvas = document.getElementById("categoryChart");

  if (categoryCanvas) {
    new Chart(categoryCanvas, {
      type: "doughnut",

      data: {
        labels: [
          "파스타",
          "피자",
          "세트메뉴",
          "샐러드",
          "기타"
        ],

        datasets: [
          {
            data: [33, 22, 17, 11, 17],

            backgroundColor: [
              "#174735",
              "#2c6049",
              "#c5a46f",
              "#dfcba7",
              "#e8e2d7"
            ],

            borderWidth: 0,
            hoverOffset: 5
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "73%",

        plugins: {
          legend: {
            display: false
          },

          tooltip: {
            backgroundColor: "#173b2d",
            callbacks: {
              label(context) {
                return `${context.label}: ${context.parsed}%`;
              }
            }
          }
        }
      }
    });
  }

  console.log("MUSEO V2 대시보드 데모 차트 로드 완료");
});
