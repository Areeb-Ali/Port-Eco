/* script.js - Full Updated: Sample trades, Trade History fix, EmailJS, theme-synced ticker */

document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const toggleBtn = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const tradeGrid = document.getElementById("tradeLogs");
  const runningGrid = document.getElementById("runningTradeLogs");
  const contactForm = document.getElementById("contactForm");
  const navAnchors = document.querySelectorAll('nav a[href^="#"]');
  const tickerContainer = document.getElementById("ticker-tape");

  // ===== Sample Trades =====
  const runningTrades = [
    {
      id: "RUN-001", title: "ETHUSDT Long",
      symbol: "ETHUSDT",
      entry: 2500, tp: 2650, sl: 2420,
      date: "2025-08-15", outcome: "running",
      proof: "https://x.com/sample_running_trade"
    },
    {
      id: "RUN-002", title: "SOLUSDT Short", symbol: "SOLUSDT",
      entry: 80.5, tp: 74.2, sl: 83.0, date: "2025-08-20",
      outcome: "running", proof: "https://x.com/sample_running_sol"
    }
  ];
  const recentTrades = [
    {
      id: "T-20240514",
      title: "PRAIUSDT Long",
      symbol: "PRAIUSDT",
      entry: 0.08, tp: 0.1115, sl: 0.06789,
      date: "2024-05-14", outcome: "win",
      proof: "https://x.com/sample_prai"
    },
    {
      id: "T-20240509",
      title: "BTCUSDT Long",
      symbol: "BTCUSDT",
      entry: 103055, tp: 104077, sl: 102500,
      date: "2024-05-09",
      outcome: "win",
      proof: "https://x.com/sample_btc_0509"
    }
  ];

  function getAllTrades() { return [...recentTrades, ...runningTrades]; }

  // ===== Theme Switcher + Ticker =====
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const isLight = savedTheme === 'light';
    body.classList.toggle('light-mode', isLight);
    toggleBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    initializeTicker(isLight);
  }
  if (toggleBtn) {
    initTheme();
    toggleBtn.addEventListener("click", () => {
      const isLight = body.classList.toggle("light-mode");
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggleBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      initializeTicker(isLight);
    });
  }

  // ===== Mobile Nav =====
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = navLinks.classList.toggle("show");
      navLinks.style.maxHeight = isExpanded ? navLinks.scrollHeight + "px" : "0";
      menuToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }

  // ===== Smooth Scroll =====
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    });
  });

  // ===== Trade Card Renderer =====
  function createTradeCard(trade) {
    const card = document.createElement("div");
    card.className = `trade-card ${trade.outcome || ''}`;
    const formatNum = (n) => (!n && n !== 0) ? '—' : (Math.abs(n) >= 1000 ? Number(n).toLocaleString() : n);
    card.innerHTML = `
      <div class="trade-header">
        <h3>${trade.title}</h3>
        <span class="trade-date">${trade.date}</span>
      </div>
      <p>${trade.symbol} • Entry: ${formatNum(trade.entry)} | TP: ${formatNum(trade.tp)} | SL: ${formatNum(trade.sl)}</p>
      <div style="display:flex;gap:.5rem;align-items:center;margin-top:.5rem;">
        <div class="trade-outcome ${trade.outcome || ''}">${(trade.outcome || 'running').toUpperCase()}</div>
        <a href="${trade.proof || '#'}" target="_blank" rel="noopener" class="btn btn-outline proof-btn">Proof</a>
      </div>
    `;
    return card;
  }
  function renderTrades(data, container) {
    if (!container) return;
    container.innerHTML = '';
    data.forEach(t => container.appendChild(createTradeCard(t)));
  }
  renderTrades(runningTrades, runningGrid);
  renderTrades(recentTrades, tradeGrid);

  // ===== Performance Stats =====
  function calculateWinRate(trades) {
    const evaluable = trades.filter(t => ['win', 'loss'].includes(t.outcome));
    const wins = evaluable.filter(t => t.outcome === 'win').length;
    return { winRate: evaluable.length ? Math.round((wins / evaluable.length) * 100) : 0, total: evaluable.length };
  }
  function calculateAvgRiskReward(trades) {
    const ratios = [];
    trades.forEach(t => {
      if (typeof t.entry !== 'number' || typeof t.tp !== 'number' || typeof t.sl !== 'number') return;
      let reward, risk;
      if (t.tp > t.entry) { reward = t.tp - t.entry; risk = t.entry - t.sl; }
      else { reward = t.entry - t.tp; risk = t.sl - t.entry; }
      if (risk > 0) ratios.push(reward / risk);
    });
    if (!ratios.length) return '—';
    return (Math.round((ratios.reduce((a, b) => a + b, 0) / ratios.length) * 10) / 10) + " : 1";
  }
  function updatePerformanceUI() {
    const stats = calculateWinRate(recentTrades);
    const winrateText = document.querySelector(".winrate-text");
    const winrateSub = document.querySelector(".winrate-sub");
    const rrText = document.querySelector(".rr-text");
    if (winrateText) winrateText.textContent = `${stats.winRate}% Win Rate`;
    if (winrateSub) winrateSub.textContent = `Last ${stats.total} Trades`;
    if (rrText) rrText.textContent = calculateAvgRiskReward(recentTrades);
  }
  updatePerformanceUI();

  // ===== TradingView Ticker =====
  function initializeTicker(isLight) {
    if (!tickerContainer) return;
    tickerContainer.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
        { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
        { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
        { "proName": "NASDAQ:TSLA", "title": "Tesla" },
        { "proName": "OANDA:XAUUSD", "title": "Gold" },
        { "proName": "MARKETSCOM:OIL", "title": "Crude Oil" }
      ],
      "colorTheme": isLight ? "light" : "dark",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    });
    tickerContainer.appendChild(script);
  }

  // ===== Trade History Page Support =====
  window.renderHistoryToContainer = function (containerId, trades) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    (trades || getAllTrades()).forEach(t => container.appendChild(createTradeCard(t)));
  };
  window.filterTradesForHistory = function (days, from, to) {
    let trades = getAllTrades();
    if (days) {
      const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - days);
      trades = trades.filter(t => new Date(t.date) >= cutoff);
    }
    if (from) trades = trades.filter(t => new Date(t.date) >= new Date(from));
    if (to) trades = trades.filter(t => new Date(t.date) <= new Date(to));
    return trades.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // ===== EmailJS =====
  function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  if (contactForm) {
    emailjs.init("W4uW5W1uxMSppo-Ax");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.send("service_skahe8c", "template_apf9avc", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        service: document.getElementById("service").value,
        message: document.getElementById("message").value
      }).then(() => {
        showToast("✅ Message sent successfully!", "success");
        contactForm.reset();
      }, (error) => {
        console.error("EmailJS error:", error);
        showToast("❌ Failed to send message. Try again.", "error");
      });
    });
  }


  // ===== Expose Portfolio =====
  window.__trading_portfolio = { getAllTrades, recentTrades, runningTrades, renderTrades, createTradeCard };
});
