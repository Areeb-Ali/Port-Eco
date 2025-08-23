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
    //   id: "RUN-001", title: "BTCUSDT Long",
    //   symbol: "BTCUSDT",
    //   entry: 112156, tp: 113761, sl: 0.0,
    //   date: "2025-08-22", outcome: "running",
    //   proof: "https://x.com/areebithink/status/1958622382022885496"
    // },
    // {
    //   id: "RUN-002", title: "ETHUSDT Long",
    //   symbol: "ETHUSDT",
    //   entry: 4226.16, tp: 4341.29, sl: 0.0, date: "2025-08-22",
    //   outcome: "running", proof: "https://x.com/areebithink/status/1958622450591440964"
    // },
    // {
    //   id: "RUN-003", title: "BBUSDT Long", symbol: "BBUSDT",
    //   entry: 0.125262, tp: 0.13284, sl: 0.0, date: "2025-08-22",
    //   outcome: "running", proof: "https://x.com/areebithink/status/1958622846210785384"
    // },
    // {
    //   id: "RUN-004", title: "ENSUSDT Long", symbol: "ENSUSDT",
    //   entry: 24.453, tp: 25.234, sl: 0.0, date: "2025-08-22",
    //   outcome: "running", proof: "https://x.com/areebithink/status/1958622846210785384"
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

const blogPosts = [
    {
        id: 'fed-rate-impact',
        title: 'Fed Rate Impact on Stock and Crypto',
        description: 'Analysis of how recent Fed decisions influence the market.',
        link: 'https://x.com/sample_fed_post',
        date: '2024-07-20'
    },
    {
        id: 'bitcoin-halving-2024',
        title: 'Bitcoin Halving 2024',
        description: 'Historical trends and future price projections.',
        link: 'https://x.com/sample_halving_post',
        date: '2024-04-20'
    },
    {
        id: 'inflation-report-june',
        title: 'June Inflation Report Analysis',
        description: 'A deep dive into the latest CPI data and its market implications.',
        link: 'https://x.com/sample_cpi_post',
        date: '2024-06-12'
    },
    {
        id: 'us-debt-ceiling-talks',
        title: 'The US Debt Ceiling: What Traders Need to Know',
        description: 'Understanding the risks and opportunities of government debt negotiations.',
        link: 'https://x.com/sample_debt_post',
        date: '2024-05-01'
    },
    {
        id: 'oil-price-forecast-2024',
        title: 'Oil Price Forecast for Late 2024',
        description: 'A look at geopolitical factors and their effect on crude oil prices.',
        link: 'https://x.com/sample_oil_post',
        date: '2024-01-20'
    },
    {
        id: 'nasdaq-100-technical-breakdown',
        title: 'NASDAQ 100 Technical Breakdown',
        description: 'A detailed analysis of key support and resistance levels for the QQQ.',
        link: 'https://x.com/sample_nasdaq_post',
        date: '2023-11-15'
    },
    {
        id: 'gold-and-silver-outlook',
        title: 'Gold and Silver Outlook for Q3',
        description: 'Why precious metals might be a key hedge against global instability.',
        link: 'https://x.com/sample_metals_post',
        date: '2023-09-01'
    },
    {
        id: 'ethereum-spot-etf-implications',
        title: 'Ethereum Spot ETF: Market Impact',
        description: 'The potential long-term effects of an approved Ethereum ETF.',
        link: 'https://x.com/sample_eth_etf_post',
        date: '2024-05-23'
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