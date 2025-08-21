/* script.js - Updated: theme-synced ticker, running trades, recent trades, proof links,
   trade history filtering, auto winrate & risk/reward calculation. */

document.addEventListener('DOMContentLoaded', function () {
  // ==================== DOM Elements ====================
  const body = document.body;
  const toggleBtn = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const tradeGrid = document.getElementById("tradeLogs");
  const runningGrid = document.getElementById("runningTradeLogs");
  const contactForm = document.getElementById("contactForm");
  const navAnchors = document.querySelectorAll('nav a[href^="#"]');
  const tickerContainer = document.getElementById("ticker-tape");

  // ==================== Sample Data (structured) ====================
  // Use these arrays for rendering and calculations. Replace/add your real trades here.
  const runningTrades = [
    {
      id: "RUN-001",
      title: "ETHUSDT Long",
      symbol: "ETHUSDT",
      entry: 2500,
      tp: 2650,
      sl: 2420,
      date: "2025-08-15",
      outcome: "running",
      proof: "https://x.com/sample_running_trade"
    },
    {
      id: "RUN-002",
      title: "SOLUSDT Short",
      symbol: "SOLUSDT",
      entry: 80.5,
      tp: 74.2,
      sl: 83.0,
      date: "2025-08-20",
      outcome: "running",
      proof: "https://x.com/sample_running_sol"
    }
  ];

  const recentTrades = [
    {
      id: "T-20240514",
      title: "PRAIUSDT Long",
      symbol: "PRAIUSDT",
      entry: 0.08,
      tp: 0.1115,
      sl: 0.06789,
      date: "2024-05-14",
      outcome: "win",
      proof: "https://x.com/sample_prai"
    },
    {
      id: "T-20240509",
      title: "BTCUSDT Long",
      symbol: "BTCUSDT",
      entry: 103055,
      tp: 104077,
      sl: 102500,
      date: "2024-05-09",
      outcome: "win",
      proof: "https://x.com/sample_btc_0509"
    },
    {
      id: "T-20240415",
      title: "MANAUSDT Short",
      symbol: "MANAUSDT",
      entry: 0.2773,
      tp: 0.2760,
      sl: 0.2830,
      date: "2024-04-15",
      outcome: "win",
      proof: "https://x.com/sample_mana"
    },
    // Add additional historical trades here. The tradehistory page will show these.
  ];

  // Merge recentTrades + runningTrades for stats / full history
  function getAllTrades() {
    // For history we consider running + recent
    return [...recentTrades, ...runningTrades];
  }

  // ==================== Theme Switcher ====================
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    const isLight = savedTheme === 'light';
    body.classList.toggle('light-mode', isLight);
    toggleBtn.innerHTML = isLight
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';

    // initialize ticker with same theme
    initializeTicker(isLight);
  }

  function updateTickerTheme(isLight) {
    // Recreate the widget script block inside #ticker-tape
    initializeTicker(isLight);
  }

  if (toggleBtn) {
    initTheme();
    toggleBtn.addEventListener("click", () => {
      const isLight = body.classList.toggle("light-mode");
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggleBtn.innerHTML = isLight
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
      updateTickerTheme(isLight);
    });
  }

  // ==================== Mobile Navigation ====================
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = navLinks.classList.toggle("show");
      navLinks.style.maxHeight = isExpanded ? navLinks.scrollHeight + "px" : "0";
      navLinks.style.overflow = "hidden";
      navLinks.style.transition = "max-height 0.3s ease-in-out";
      menuToggle.innerHTML = isExpanded
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove("show");
        navLinks.style.maxHeight = "0";
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // ==================== Smooth Scrolling ====================
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 80; // Same as navbar height approximation
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== Render Trades ====================
  function createTradeCard(trade) {
    const card = document.createElement("div");
    card.className = `trade-card ${trade.outcome || ''}`;
    // friendly numbers for display
    const formatNum = (n) => {
      if (n === null || n === undefined) return '—';
      if (Math.abs(n) >= 1000) return Number(n).toLocaleString();
      return Number(n).toString();
    };

    card.innerHTML = `
      <div class="trade-header">
        <h3>${trade.title}</h3>
        <span class="trade-date">${trade.date}</span>
      </div>
      <p>${trade.symbol ? trade.symbol + ' • ' : ''}Entry: ${formatNum(trade.entry)} &nbsp;&nbsp; TP: ${formatNum(trade.tp)} &nbsp;&nbsp; SL: ${formatNum(trade.sl)}</p>
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
    data.forEach(t => {
      container.appendChild(createTradeCard(t));
    });
  }

  // initial render
  renderTrades(runningTrades, runningGrid);
  renderTrades(recentTrades, tradeGrid);

  // ==================== Performance Stats: Win Rate & Avg Risk/Reward ====================
  function calculateWinRate(trades) {
    // Count only trades with outcome 'win' or 'loss' in the recentTrades array (not running)
    const evaluable = trades.filter(t => t.outcome === 'win' || t.outcome === 'loss');
    const wins = evaluable.filter(t => t.outcome === 'win').length;
    const total = evaluable.length;
    if (total === 0) return { winRate: 0, total: 0 };
    return { winRate: Math.round((wins / total) * 100), total };
  }

  function calculateAvgRiskReward(trades) {
    // For entries where entry, tp, sl are numbers, compute reward/risk for that trade:
    // For long: reward = (tp - entry), risk = (entry - sl)
    // For short: reward = (entry - tp), risk = (sl - entry)
    // If risk <= 0 or missing, skip
    const ratios = [];
    trades.forEach(t => {
      if (typeof t.entry !== 'number' || typeof t.tp !== 'number' || typeof t.sl !== 'number') return;
      let reward = null;
      let risk = null;
      // detect long/short by comparing tp to entry
      if (t.tp > t.entry) {
        // long
        reward = Math.abs(t.tp - t.entry);
        risk = Math.abs(t.entry - t.sl);
      } else if (t.tp < t.entry) {
        // short
        reward = Math.abs(t.entry - t.tp);
        risk = Math.abs(t.sl - t.entry);
      } else {
        return;
      }
      if (risk <= 0) return;
      ratios.push(reward / risk);
    });

    if (ratios.length === 0) return '—';
    // average ratio
    const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length;
    // round to one decimal for display
    return (Math.round(avg * 10) / 10) + " : 1";
  }

  function updatePerformanceUI() {
    const all = getAllTrades();
    const stats = calculateWinRate(recentTrades); // only completed trades considered for winrate
    const rr = calculateAvgRiskReward(recentTrades);

    const winrateText = document.querySelector(".winrate-text");
    const winrateSub = document.querySelector(".winrate-sub");
    const rrText = document.querySelector(".rr-text");

    if (winrateText) winrateText.textContent = `${stats.winRate}% Win Rate`;
    if (winrateSub) winrateSub.textContent = `Last ${stats.total} Trades`;
    if (rrText) rrText.textContent = rr;
  }

  updatePerformanceUI();

  // ==================== EmailJS Integration ====================
  if (contactForm) {
    (function () {
      emailjs.init("W4uW5W1uxMSppo-Ax");
    })();

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const form = this;
      const submitBtn = form.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        const response = await emailjs.sendForm(
          "service_skahe8c",
          "template_apf9avc",
          form
        );
        console.log("EmailJS Success:", response);
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.textContent = 'Message sent successfully!';
        form.parentNode.insertBefore(successMsg, form.nextSibling);
        form.reset();
        setTimeout(() => successMsg.remove(), 5000);
      } catch (error) {
        console.error("EmailJS Error:", error);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'form-error';
        errorMsg.textContent = 'Failed to send message. Please try again later.';
        form.parentNode.insertBefore(errorMsg, form.nextSibling);
        setTimeout(() => errorMsg.remove(), 5000);
      } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  console.log("Beera Lia Trading Portfolio initialized");

  // ==================== TradingView Ticker Initialization (theme synced) ====================
  // We'll inject the embed-widget-ticker-tape.js with JSON text content to tick the widget.
  function initializeTicker(isLight) {
    if (!tickerContainer) return;

    // Remove any existing widget children
    tickerContainer.innerHTML = '<div class="tradingview-widget-container__widget"></div>';

    // Create script tag and inject JSON config as innerText (the widget reads it)
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';

    // Create a small config element that some browsers will process; safer to add a script tag with text content as fallback
    const config = {
      "symbols": [
        { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500 Index" },
        { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
        { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
        { "proName": "NASDAQ:TSLA", "title": "Tesla" },
        { "proName": "OANDA:XAUUSD", "title": "Gold" },
        { "proName": "MARKETSCOM:OIL", "title": "Crude Oil" }
      ],
      "colorTheme": isLight ? "light" : "dark",
      "locale": "en",
      "isTransparent": true,
      "showSymbolLogo": true,
      "displayMode": "adaptive"
    };

    // Some embed widgets read the JSON from the script element's innerHTML. We'll create that way:
    const inline = document.createElement('script');
    inline.type = 'text/javascript';
    inline.async = true;
    inline.text = JSON.stringify(config);

    // Append inline config first, then load the external script (both used by TradingView embed)
    tickerContainer.appendChild(inline);
    tickerContainer.appendChild(script);
  }

  // Initialize ticker to current theme
  // call already handled in initTheme()

  // Expose small helper for other pages (tradehistory.html) via window
  window.__trading_portfolio = {
    getAllTrades: getAllTrades,
    recentTrades: recentTrades,
    runningTrades: runningTrades,
    renderTrades: renderTrades,
    createTradeCard: createTradeCard
  };
});

/* ========== BELOW: code for tradehistory.html usage ========== */

/* tradehistory functions are available via window.__trading_portfolio when this file is loaded on tradehistory.html */
if (typeof window !== 'undefined') {
  // add helper functions to window for tradehistory page
  window.filterTradesForHistory = function filterTradesForHistory(days, fromDate, toDate) {
    const ds = window.__trading_portfolio ? window.__trading_portfolio.getAllTrades() : [];
    if (typeof days === 'number') {
      // filter last 'days' days (inclusive)
      const now = new Date();
      const past = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days - 1)); // include today
      return ds.filter(d => {
        const dt = new Date(d.date);
        return dt >= past && dt <= now;
      }).sort((a,b) => new Date(b.date) - new Date(a.date));
    } else if (fromDate || toDate) {
      const from = fromDate ? new Date(fromDate) : new Date('1970-01-01');
      const to = toDate ? new Date(toDate) : new Date();
      return ds.filter(d => {
        const dt = new Date(d.date);
        return dt >= from && dt <= to;
      }).sort((a,b) => new Date(b.date) - new Date(a.date));
    } else {
      return ds.sort((a,b) => new Date(b.date) - new Date(a.date));
    }
  };

  // helper to render history table (used by tradehistory page)
  window.renderHistoryToContainer = function renderHistoryToContainer(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!data || data.length === 0) {
      container.innerHTML = '<p>No trades found for selected range.</p>';
      return;
    }
    // make a table-like grid using cards
    data.forEach(tr => {
      const card = window.__trading_portfolio.createTradeCard(tr);
      // add a "View on Twitter" small link already included in card as Proof button
      container.appendChild(card);
    });
  };
}
