// ======================================
// GKICT Ai Assistant - Daily Search Limit
// Author: Gayan Karunathilaka
// ======================================

// 🧩 Settings
const DAILY_LIMIT = 4;
const STORAGE_KEY = "gkict_search_count";
const DATE_KEY = "gkict_search_date";

// 🕓 අද දිනය ලබාගන්න
function getToday() {
  return new Date().toISOString().slice(0, 10);
}

// 🔄 නව දිනක් ආවම reset කරන්න
function resetIfNewDay() {
  const today = getToday();
  const storedDate = localStorage.getItem(DATE_KEY);
  if (storedDate !== today) {
    localStorage.setItem(DATE_KEY, today);
    localStorage.setItem(STORAGE_KEY, "0");
  }
}

// 🔢 දැනට count එක ලබාගන්න
function getSearchCount() {
  resetIfNewDay();
  return parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
}

// 🧮 සෙවුම් අංකය වැඩි කරන්න
function recordSearch() {
  const current = getSearchCount() + 1;
  localStorage.setItem(STORAGE_KEY, String(current));
  updateLimitDisplay();
}

// 🚫 සෙවුම් සීමාව පරීක්ෂා කරන්න
function canSearch() {
  return getSearchCount() < DAILY_LIMIT;
}

// 🧾 UI එකේ ඉතිරි සෙවුම් පෙන්වන්න
function updateLimitDisplay() {
  const remaining = DAILY_LIMIT - getSearchCount();
  let limitEl = document.getElementById("daily-limit-display");

  // Element එකක් නැත්නම් එකක් සාදන්න
  if (!limitEl) {
    const container = document.querySelector(".prompt-container");
    if (container) {
      limitEl = document.createElement("div");
      limitEl.id = "daily-limit-display";
      limitEl.className = "daily-limit-text";
      limitEl.style.cssText = `
        color: #444;
        font-size: 13px;
        text-align: center;
        margin-top: 8px;
      `;
      container.appendChild(limitEl);

      // Reset button එකත් එක්ක එකතු කරන්න
      const resetBtn = document.createElement("button");
      resetBtn.id = "reset-limit-btn";
      resetBtn.textContent = "Reset Daily Limit";
      resetBtn.style.cssText = `
        display: block;
        margin: 6px auto 10px auto;
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 6px 14px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
      `;
      resetBtn.addEventListener("click", resetDailyLimit);
      container.appendChild(resetBtn);
    }
  }

  // Text එක update කරන්න
  limitEl.textContent = `අදට ඉතිරි සෙවුම්: ${remaining} / ${DAILY_LIMIT}`;
}

// 🧹 Daily Limit Reset කිරීම
function resetDailyLimit() {
  localStorage.setItem(STORAGE_KEY, "0");
  localStorage.setItem(DATE_KEY, getToday());
  updateLimitDisplay();

  Swal.fire({
    title: "සාර්ථකයි!",
    text: "Daily search limit එක reset වී ඇත.",
    icon: "success",
    confirmButtonText: "OK"
  });
}

// 🚀 Initialization
document.addEventListener("DOMContentLoaded", () => {
  resetIfNewDay();
  updateLimitDisplay();

  // Send button එකක් තියෙනවාද බලන්න
  const sendBtn = document.getElementById("send-prompt-btn");
  if (sendBtn) {
    sendBtn.addEventListener("click", (e) => {
      if (!canSearch()) {
        e.preventDefault();
        Swal.fire({
          title: "සෙවුම් සීමාව ළඟා වී ඇත!",
          text: "ඔබ අද දින සඳහා ලබා ඇති සෙවුම් සීමාව අවසන් වී ඇත. කරුණාකර හෙට නැවත උත්සාහ කරන්න.",
          icon: "warning",
          confirmButtonText: "OK"
        });
        return;
      }

      // සාර්ථක search එකක් ලෙස record කරන්න
      recordSearch();
    });
  }
});
