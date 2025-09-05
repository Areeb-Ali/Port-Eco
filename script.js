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
    // {
    //   id: "RUN-001", title: "ETHUSDT Long",
    //   symbol: "ETHUSDT",
    //   entry: 4468.24, tp: 4456.67, sl: 0,
    //   date: "2025-09-04", outcome: "running",
    //   proof: "https://x.com/areebithink/status/1963514457944199245"
    // },
    {
      id: "RUN-002", title: "LISTAUSDT Long",
      symbol: "LISTAUSDT",
      entry: 0.243, tp: 0.257, sl: 0.2330,
      date: "2025-09-4", outcome: "running",
      proof: "https://x.com/areebithink/status/1963576051834991042"
    },
    // {
    //   id: "RUN-003", title: "ADAUSDT Long",
    //   symbol: "ADAUSDT",
    //   entry: 0.6159, tp: 0.601, sl: 0.6214,
    //   date: "2025-08-27", outcome: "running",
    //   proof: "https://x.com/areebithink/status/1963514457944199245"
    // },
    // {
    //   id: "RUN-004", title: "ARKMUSDT Long", symbol: "ARKNUSDT",
    //   entry: 0.5037, tp: 0.5098, sl: 0.0, date: "2025-08-27",
    //   outcome: "running", proof: "https://x.com/areebithink/status/1960614177262715337"
    // },
    // {
    //   id: "RUN-005", title: "FETUSDT Long", symbol: "FETUSDT",
    //   entry: 0.6682, tp: 0.6827, sl: 0.6482, date: "2025-08-22",
    //   outcome: "running", proof: "https://x.com/areebithink/status/1958622846210785384"
    // },
    // {
    //   id: "RUN-002", title: "PLUMEUSDT Long", symbol: "PLUMEUSDT",
    //   entry: 0.08387, tp: 0.08899, sl: 0.07972, date: "2025-08-22",
    //   outcome: "running", proof: "https://x.com/areebithink/status/1958622846210785384"
    // }
  ];
  const recentTrades = [
    {
      id: "REC-001",
      title: "BTCUSDT Short",
      symbol: "BTCUSDT",
      entry: 113845, tp: 112365.4, sl: 114166,
      date: "2025-08-20", outcome: "win",
      proof: "https://x.com/areebithink/status/1957904824881844492"
    },
    {
      id: "REC-002",
      title: "ETHUSDT Short",
      symbol: "ETHUSDT",
      entry: 4200.05, tp: 4117, sl: 4229.47,
      date: "2025-08-20",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958153116358246578"
    },
    {
      id: "REC-003",
      title: "ADAUSDT Short",
      symbol: "ADAUSDT",
      entry: 0.8562, tp: 0.8391, sl: 0.8662,
      date: "2025-08-20",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958157233235325301"
    },
    {
      id: "REC-004",
      title: "SOLUSDT Short",
      symbol: "SOLUSDT",
      entry: 183.82, tp: 180.2, sl: 186.98,
      date: "2025-08-20",
      outcome: "loss",
      proof: "https://x.com/areebithink/status/1958240753899159684"
    },
    {
      id: "REC-005",
      title: "FETUSDT Short",
      symbol: "FETUSDT",
      entry: 0.6859, tp: 0.6706, sl: 0.6899,
      date: "2025-08-21",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958312286512435214"
    },
    {
      id: "REC-006",
      title: "BTCUSDT Short",
      symbol: "BTCUSDT",
      entry: 114430, tp: 113658.8, sl: 114750,
      date: "2025-08-21",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1957904824881844492"
    },
    {
      id: "REC-007",
      title: "BBUSDT Long",
      symbol: "BBUSDT",
      entry: 0.125262, tp: 0.13284, sl: 0.12126,
      date: "2025-08-22",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958622846210785384"
    },
    {
      id: "REC-008",
      title: "ETHUSDT Long",
      symbol: "ETHUSDT",
      entry: 4226.16, tp: 4341.29, sl: 4176,
      date: "2025-08-22",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958622450591440964"
    },
    {
      id: "REC-009",
      title: "PLUMEUSDT Long",
      symbol: "PLUMEUSDT",
      entry: 0.08382, tp: 0.09042, sl: 0.08097,
      date: "2025-08-22",
      outcome: "breakeven",
      proof: "https://x.com/areebithink/status/1958866435247329744"
    },
    {
      id: "REC-010",
      title: "FETUSDT Long",
      symbol: "FETUSDT",
      entry: 0.6682, tp: 0.6827, sl: 0.6482,
      date: "2025-08-22",
      outcome: "loss",
      proof: "https://x.com/areebithink/status/1958622846210785384"
    },
    {
      id: "REC-011",
      title: "BTCUSDT Long",
      symbol: "BTCUSDT",
      entry: 112156, tp: 113761, sl: 111400,
      date: "2025-08-22",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958622382022885496"
    },
    {
      id: "REC-012",
      title: "ENSUSDT Long",
      symbol: "ENSUSDT",
      entry: 24.453, tp: 25.234, sl: 24.067,
      date: "2025-08-22",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958622846210785384"
    },
    {
      id: "REC-013",
      title: "ADA Short",
      symbol: "ADAUSDT",
      entry: 0.9241, tp: 0.9124, sl: 0.9349,
      date: "2025-08-23",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958923725044425125"
    },
    {
      id: "REC-014",
      title: "SOL Short",
      symbol: "SOLUSDT",
      entry: 195.33, tp: 183.17, sl: 200.98,
      date: "2025-08-23",
      outcome: "loss",
      proof: "https://x.com/areebithink/status/1958923725044425125"
    },
    {
      id: "REC-015",
      title: "AVAX Short",
      symbol: "AVAXUSDT",
      entry: 24.732, tp: 24.595, sl: 0.0,
      date: "2025-08-23",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958923725044425125"
    },
    {
      id: "REC-016",
      title: "NEAR Short",
      symbol: "NEARUSDT",
      entry: 2.638, tp: 2.63, sl: 0.0,
      date: "2025-08-23",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958923725044425125"
    },
    {
      id: "REC-017",
      title: "SUI Short",
      symbol: "SUIUSDT",
      entry: 3.696, tp: 3.6716, sl: 0.0,
      date: "2025-08-23",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1958923725044425125"
    },
    {
      id: "REC-018",
      title: "LINK Short",
      symbol: "LINKUSDT",
      entry: 26.923, tp: 24.7, sl: 27.5,
      date: "2025-08-23",
      outcome: "breakeven",
      proof: "https://x.com/areebithink/status/1958923725044425125"
    },
    {
      id: "REC-019",
      title: "BEAMX Long",
      symbol: "BEAMXUSDT",
      entry: 0.007918, tp: 0.008161, sl: 0.007834,
      date: "2025-08-24",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1959261474670666229"
    },
    {
      id: "REC-020",
      title: "ENS Long",
      symbol: "ENSUSDT",
      entry: 26.584, tp: 26.984, sl: 0.0,
      date: "2025-08-24",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1959260597398446132"
    },
    {
      id: "REC-021",
      title: "ETH Long",
      symbol: "ETHUSDT",
      entry: 4589.45, tp: 4624.06, sl: 4534.39,
      date: "2025-08-25",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1959892663001571568"
    },
    {
      id: "REC-022",
      title: "NMR Long",
      symbol: "NMRUSDT",
      entry: 8.149, tp: 9.158, sl: 7.817,
      date: "2025-08-26",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1959892663001571568"
    },
    {
      id: "REC-023",
      title: "PHA Long",
      symbol: "PHAUSDT",
      entry: 0.11327, tp: 0.11741, sl: 0.0,
      date: "2025-08-27",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1959894587734106548"
    },
    {
      id: "REC-024",
      title: "BB Long",
      symbol: "BBUSDT",
      entry: 0.13948, tp: 0.14105, sl: 0.0,
      date: "2025-08-27",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1959899551185432599"
    },
    {
      id: "REC-025",
      title: "ARKM Long",
      symbol: "ARKMUSDT",
      entry: 0.5037, tp: 0.5098, sl: 0.4986,
      date: "2025-08-27",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1960614177262715337"
    },
    {
      id: "REC-025",
      title: "BEAMX Long",
      symbol: "BEAMXUSDT",
      entry: 0.11327, tp: 0.11741, sl: 0.0,
      date: "2025-08-28",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1960614177262715337"
    },
    {
      id: "REC-026",
      title: "ADA Long",
      symbol: "ADAUSDT",
      entry: 0.8576, tp: 0.8724, sl: 0.0,
      date: "2025-08-28",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1960614177262715337"
    },
    {
      id: "REC-027",
      title: "ENS Long",
      symbol: "ENSUSDT",
      entry: 23.812, tp: 23.987, sl: 0.0,
      date: "2025-08-29",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1959969447919378629"
    },
    {
      id: "REC-028",
      title: "SOL Long",
      symbol: "SOLUSDT",
      entry: 208.98, tp: 214.48, sl: 206.67,
      date: "2025-08-29",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1961338488025985430"
    },
    {
      id: "REC-029",
      title: "ETH Long",
      symbol: "ETHUSDT",
      entry: 4446.39, tp: 4454.74, sl: 0.0,
      date: "2025-08-31",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1961067451783024896"
    },
    {
      id: "REC-030",
      title: "BTC Long",
      symbol: "BTCUSDT",
      entry: 107856, tp: 109515.9, sl: 0.0,
      date: "2025-08-31",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1961524742688838009"
    },
    {
      id: "REC-031",
      title: "ETH Short",
      symbol: "ETHUSDT",
      entry: 4475.99, tp: 4376.66, sl: 4497.57,
      date: "2025-09-1",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1962431641768378506"
    },
    {
      id: "REC-032",
      title: "FET Short",
      symbol: "FETUSDT",
      entry: 0.6159, tp: 0.601, sl: 0.6214,
      date: "2025-09-1",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1962433602597060975"
    },
    {
      id: "REC-033",
      title: "BTC Short",
      symbol: "BTCUSDT",
      entry: 109599.9, tp: 107856.3, sl: 110085.6,
      date: "2025-09-2",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1962431641768378506"
    },
    {
      id: "REC-034",
      title: "ETH Short",
      symbol: "ETHUSDT",
      entry: 4328.99, tp: 4289.53, sl: 4358.13,
      date: "2025-09-2",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1962857264072581575"
    },
    {
      id: "REC-035",
      title: "SOL Short",
      symbol: "SOLUSDT",
      entry: 200.46, tp: 198.98, sl: 203.6,
      date: "2025-09-2",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1962857743867342879"
    },
    {
      id: "REC-036",
      title: "ADA Short",
      symbol: "ADAUSDT",
      entry: 0.8129, tp: 0.8052, sl: 0.8197,
      date: "2025-09-2",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1962858494664618458"
    },
    {
      id: "REC-037",
      title: "XRP Long",
      symbol: "XRPUSDT",
      entry: 2.7979, tp: 2.8536, sl: 2.78,
      date: "2025-09-3",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1962926852655169695"
    },
    {
      id: "REC-038",
      title: "FET Long",
      symbol: "FETUSDT",
      entry: 0.6, tp: 0.6111, sl: 0.5955,
      date: "2025-09-3",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1962926852655169695"
    },
    {
      id: "REC-039",
      title: "BTC Long",
      symbol: "BTCUSDT",
      entry: 110470, tp: 112031, sl: 110085.6,
      date: "2025-09-3",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1962951365401227652"
    },
    {
      id: "REC-040",
      title: "NEAR Long",
      symbol: "NEARUSDT",
      entry: 2.431, tp: 2.473, sl: 2.417,
      date: "2025-09-3",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1963132384318218590"
    },
    {
      id: "REC-041",
      title: "FET Long",
      symbol: "FETUSDT",
      entry: 0.6162, tp: 0.6256, sl: 0.6125,
      date: "2025-09-3",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1963147566872461319"
    },
    {
      id: "REC-042",
      title: "ETH Short",
      symbol: "ETHUSDT",
      entry: 4463.72, tp: 4377.99, sl: 4497.12,
      date: "2025-09-4",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1963257724323708986"
    },
    {
      id: "REC-043",
      title: "ENS Short",
      symbol: "ENSUSDT",
      entry: 23.183, tp: 22.428, sl: 23.397,
      date: "2025-09-4",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1963256644911124896"
    },
    {
      id: "REC-044",
      title: "ADA Long",
      symbol: "ADAUSDT",
      entry: 0.8115, tp: 0.8161, sl: 0,
      date: "2025-09-5",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1963514457944199245"
    },
    {
      id: "REC-045",
      title: "BTC Long",
      symbol: "BTCUSDT",
      entry: 110425, tp: 112150, sl: 109600,
      date: "2025-09-5",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1963514457944199245"
    },
    {
      id: "REC-046",
      title: "ETH Long",
      symbol: "ETHUSDT",
      entry: 4468.24, tp: 4456.67, sl: 4250,      
      date: "2025-09-5",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1963514457944199245"
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
  // Find this function in your script.js
  function createTradeCard(trade) {
    const card = document.createElement("div");
    card.className = `trade-card ${trade.outcome || ''}`;
    const formatNum = (n) => (!n && n !== 0) ? '—' : (Math.abs(n) >= 1000 ? Number(n).toLocaleString() : n);

    // Add breakeven class handling
    let outcomeText = (trade.outcome || 'running').toUpperCase();
    if (trade.outcome === 'breakeven') {
      outcomeText = 'BREAKEVEN';
    }

    card.innerHTML = `
    <div class="trade-header">
      <h3>${trade.title}</h3>
      <span class="trade-date">${trade.date}</span>
    </div>
    <p>${trade.symbol} • Entry: ${formatNum(trade.entry)} | TP: ${formatNum(trade.tp)} | SL: ${formatNum(trade.sl)}</p>
    <div style="display:flex;gap:.5rem;align-items:center;margin-top:.5rem;">
      <div class="trade-outcome ${trade.outcome || ''}">${outcomeText}</div>
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

  // Show only last 6 trades on homepage
  const lastSixTrades = recentTrades.slice(-6).reverse();
  renderTrades(lastSixTrades, tradeGrid);


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
  // Replace the existing filterTradesForHistory function with this one
  window.filterTradesForHistory = function (days, from, to) {
    let trades = getAllTrades();

    if (days) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      trades = trades.filter(t => new Date(t.date) >= cutoff);
    }

    // Fix date filtering to handle the date string format properly
    if (from) {
      const fromDate = new Date(from);
      trades = trades.filter(t => new Date(t.date) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // Include the entire end day
      trades = trades.filter(t => new Date(t.date) <= toDate);
    }

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

  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const toast = document.getElementById("toast");

    // Initialize EmailJS
    // ===== EmailJS Contact Form =====
    // if (contactForm) {
    //   emailjs.init("W4uW5W1uxMSppo-Ax"); // Replace with your EmailJS Public Key

    //   contactForm.addEventListener("submit", function (e) {
    //     e.preventDefault();

    //     const serviceID = "service_skahe8c";  // Replace with EmailJS Service ID
    //     const templateID = "template_apf9avc"; // Replace with EmailJS Template ID

    //     // Collect form data
    //     const templateParams = {
    //       name: document.getElementById("name").value,
    //       email: document.getElementById("email").value,
    //       service: document.getElementById("service").value,
    //       message: document.getElementById("message").value,
    //     };

    //     emailjs.send(serviceID, templateID, templateParams)
    //       .then(() => {
    //         showToast("✅ Message sent successfully!");
    //         contactForm.reset();
    //       })
    //       .catch((err) => {
    //         console.error("EmailJS Error:", err);
    //         showToast("❌ Failed to send message. Try again later.");
    //       });
    //   });
    // }

    // // ===== Toast Notifications =====
    // function showToast(message) {
    //   const toast = document.getElementById("toast");
    //   toast.textContent = message;
    //   toast.classList.remove("hidden");
    //   toast.classList.add("show");

    //   setTimeout(() => {
    //     toast.classList.remove("show");
    //     toast.classList.add("hidden");
    //   }, 3000);
    // }


    function showToast(message, type) {
      toast.textContent = message;
      toast.className = `toast show ${type}`;
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }

    // Additional functionality can go here (e.g., theme toggle, mobile menu)
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }

    // Theme toggle
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        // Optionally save the preference to localStorage
        const isLightMode = document.body.classList.contains("light-mode");
        localStorage.setItem("theme", isLightMode ? "light" : "dark");
      });
    }

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
    }
  });


  // ===== Expose Portfolio =====
  window.__trading_portfolio = { getAllTrades, recentTrades, runningTrades, renderTrades, createTradeCard };
});

const blogPosts = [
  {
    id: '001',
    title: 'Market Dump is Coming?',
    description: 'I’m hunting a BIG short on $BTC?',
    link: 'https://x.com/areebithink/status/1957904824881844492',
    date: '2025-08-20'
  }, {
    id: '002',
    title: 'What are interest rates?',
    description: 'Why rate cuts pump markets?',
    link: 'https://x.com/areebithink/status/1958912818545312010',
    date: '2025-08-22'
  },
  {
    id: '003',
    title: 'Why did markets pump?',
    description: 'Mainly 2 news - Chair Powell Speech - Canada: Removing tariffs.',
    link: 'https://x.com/areebithink/status/1958911930992926934',
    date: '2025-08-22'
  },
  {
    id: '004',
    title: 'Before Powell Speech Analysis',
    description: 'Why Powell Speech can impact markets.',
    link: 'https://x.com/areebithink/status/1958859104442777896',
    date: '2025-08-22'
  },
  {
    id: '005',
    title: 'Market Analysis: What Traders Need to Know',
    description: 'Market Trend and What i am doing now.',
    link: 'https://x.com/areebithink/status/1958618691823600126',
    date: '2025-08-22'
  },
  {
    id: '006',
    title: 'Next Week Market Plan',
    description: 'Most likely case: A strong pump continue.',
    link: 'https://x.com/areebithink/status/1959692233403408702',
    date: '2025-08-25'
  },
  {
    id: '007',
    title: 'Bitcoin Market Update',
    description: 'Deeper dump possible but Longs still play out?',
    link: 'https://x.com/areebithink/status/1959710183757852908',
    date: '2025-08-25'
  },
  {
    id: '008',
    title: 'Alarming BITCOIN Update',
    description: 'BTC closes below $110K, then it’s alarming?',
    link: 'https://x.com/areebithink/status/1959823666155548743',
    date: '2025-08-25'
  },
  {
    id: '009',
    title: 'BTC Levels & Trend',
    description: 'BTC facing resistance? Bitcoin may dip to $110,452?.',
    link: 'https://x.com/areebithink/status/1960538888319152282',
    date: '2025-08-27'
  },
  {
    id: '010',
    title: '🇵🇰 Biggest Crypto News',
    description: 'PVARA held its 1st board meeting with FM, SBP, SECP, FBR & PCC.',
    link: 'https://x.com/areebithink/status/1960546781818921383',
    date: '2025-08-27'
  },
  {
    id: '011',
    title: 'NVIDIA earnings Report',
    description: 'Growth is booming without China.',
    link: 'https://x.com/areebithink/status/1960818698765394275',
    date: '2025-08-28'
  },
  {
    id: '012',
    title: 'The reason for the market pump',
    description: 'A significant miss like this signals a slowing job market, which increases the likelihood of a more dovish stance from the Fed.',
    link: 'https://x.com/areebithink/status/1963962226458382683',
    date: '2025-09-05'
  }
];

function createBlogPostCard(post) {
  return `
        <div class="blog-card">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <span class="trade-date">${post.date}</span>
            <a href="${post.link}" target="_blank" rel="noopener">Read More</a>
        </div>
    `;
}

function loadBlogPosts() {
  const latestBlogContainer = document.getElementById('latestBlogPosts');
  const fullBlogContainer = document.getElementById('fullBlogLogs');

  // Check if we are on the main page
  if (latestBlogContainer) {
    // Sort to show newest first for the main page preview
    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestSix = sortedPosts.slice(0, 6);
    latestBlogContainer.innerHTML = latestSix.map(createBlogPostCard).join('');
  }

  // Check if we are on the market history page
  if (fullBlogContainer) {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const noResultsMessage = document.getElementById('noResults');

    let currentPosts = [...blogPosts];

    function renderPosts() {
      const query = searchInput.value.toLowerCase();
      const sortValue = sortSelect.value;

      let filteredPosts = currentPosts.filter(post =>
        post.title.toLowerCase().includes(query)
      );

      if (sortValue === 'newest') {
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortValue === 'oldest') {
        filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      if (filteredPosts.length === 0) {
        fullBlogContainer.innerHTML = '';
        noResultsMessage.classList.remove('hidden');
      } else {
        fullBlogContainer.innerHTML = filteredPosts.map(createBlogPostCard).join('');
        noResultsMessage.classList.add('hidden');
      }
    }

    // Initial render
    renderPosts();

    // Event listeners for search and sort
    searchInput.addEventListener('input', renderPosts);
    sortSelect.addEventListener('change', renderPosts);
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', loadBlogPosts);