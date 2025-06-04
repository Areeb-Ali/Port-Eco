document.addEventListener('DOMContentLoaded', function () {
  // ==================== DOM Elements ====================
  const body = document.body;
  const toggleBtn = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const tradeGrid = document.getElementById("tradeLogs");
  const contactForm = document.getElementById("contactForm");
  const navAnchors = document.querySelectorAll('nav a[href^="#"]');
  const tradingViewContainer = document.getElementById("tradingview-chart");

  // ==================== Theme Switcher ====================
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    const isLight = savedTheme === 'light';
    body.classList.toggle('light-mode', isLight);
    toggleBtn.innerHTML = isLight
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }

  // function updateChartTheme(isLight) {
  //   const iframe = tradingViewContainer?.querySelector('iframe');
  //   if (iframe && iframe.src) {
  //     iframe.src = iframe.src.replace(/(theme=)(light|dark)/, `theme=${isLight ? 'light' : 'dark'}`);
  //   }
  // }

  if (toggleBtn) {
    initTheme();
    toggleBtn.addEventListener("click", () => {
      const isLight = body.classList.toggle("light-mode");
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggleBtn.innerHTML = isLight
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
      updateChartTheme(isLight);
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
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== Trade Setups Loader ====================
  function loadTradeSetups() {
    const trades = [
      {
        title: "PRAIUSDT Long",
        desc: "Entry at 0.08 | TP: 0.1115 | SL: 0.06789",
        date: "2024-05-14",
        outcome: "win"
      },
      {
        title: "BTCUSDT Long",
        desc: "Entry at 103,055 | TP: 104,077 | SL: 00",
        date: "2024-05-09",
        outcome: "win"
      },
      {
        title: "BTCUSDT Long",
        desc: "Entry at 99,380 | TP: 100,422 | SL: 00",
        date: "2024-05-08",
        outcome: "win"
      },
      {
        title: "BTCUSDT Long",
        desc: "Entry at 96,448 | TP: 97,417 | SL: 00",
        date: "2024-05-07",
        outcome: "win"
      },
      {
        title: "BTCUSDT Long",
        desc: "Entry at 94,258 | TP: 95,210 | SL: 00",
        date: "2024-05-05",
        outcome: "win"
      },
      {
        title: "BTCUSDT Long",
        desc: "Entry at 96,856 | TP: 97,829 | SL: 00",
        date: "2024-05-02",
        outcome: "win"
      },
      {
        title: "BTCUSDT Long",
        desc: "Entry at 96,070 | TP: 97,096 | SL: 00",
        date: "2024-05-01",
        outcome: "win"
      },
      {
        title: "BTCUSDT Long",
        desc: "Entry at 94,276 | TP: 95,221 | SL: 00",
        date: "2024-04-28",
        outcome: "win"
      },
      {
        title: "MANAUSDT Short",
        desc: "Entry at 0.2773 | TP: 0.276 | SL: 00",
        date: "2024-04-15",
        outcome: "win"
      }
    ];

    if (tradeGrid) {
      tradeGrid.innerHTML = '';
      trades.forEach((trade) => {
        const card = document.createElement("div");
        card.className = `trade-card ${trade.outcome}`;
        card.innerHTML = `
          <div class="trade-header">
            <h3>${trade.title}</h3>
            <span class="trade-date">${trade.date}</span>
          </div>
          <p>${trade.desc}</p>
          <div class="trade-outcome ${trade.outcome}">${trade.outcome.toUpperCase()}</div>
        `;
        tradeGrid.appendChild(card);
      });
    }
  }

  loadTradeSetups();

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
});

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = 80; // Same as navbar height
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  });
});


// Update the TradingView widget initialization in your JS
// function initializeChart() {
//   new TradingView.widget({
//     "autosize": true,
//     "symbol": "NASDAQ:AAPL",
//     "interval": "D",
//     "timezone": "Etc/UTC",
//     "theme": document.body.classList.contains('light-mode') ? 'light' : 'dark',
//     "style": "1",
//     "locale": "en",
//     "enable_publishing": false,
//     "hide_side_toolbar": false,
//     "allow_symbol_change": true,
//     "container_id": "tradingview-chart"
//   });

// }

// Update theme toggle handler
// toggleBtn.addEventListener("click", () => {
//   const isLight = body.classList.toggle("light-mode");
//   localStorage.setItem('theme', isLight ? 'light' : 'dark');
//   toggleBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
//   initializeChart(); // Reinitialize chart on theme change
// });

// Initialize chart on load
// document.addEventListener('DOMContentLoaded', initializeChart);
