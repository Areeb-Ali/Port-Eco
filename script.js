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
    //   id: "RUN-001", title: "XRPUSDT Short",
    //   symbol: "XRPUSDT",
    //   entry: 3.067, tp: 3.0173, sl: 0,
    //   date: "2025-09-12", outcome: "running",
    //   proof: "https://x.com/areebithink/status/1966384149473759691"
    // },
    // {
    //   id: "RUN-002", title: "ETHUSDT Short",
    //   symbol: "ETHUSDT",
    //   entry: 4635, tp: 4614.72, sl: 0,
    //   date: "2025-09-12", outcome: "running",
    //   proof: "https://x.com/areebithink/status/1966384149473759691"
    // },
    // {
    //   id: "RUN-003", title: "FETSDT Long",
    //   symbol: "FETUSDT",
    //   entry: 0.6463, tp: 0.6619, sl: 0,
    //   date: "2025-09-09", outcome: "running",
    //   proof: "https://x.com/areebithink/status/1965446861231456491"
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
    },
    {
      id: "REC-047",
      title: "LISTA Long",
      symbol: "LISTAUSDT",
      entry: 0.243, tp: 0.2529, sl: 0.2372,
      date: "2025-09-5",
      outcome: "breakeven",
      proof: "https://x.com/areebithink/status/1963576051834991042"
    },
    {
      id: "REC-048",
      title: "FET Long",
      symbol: "FETUSDT",
      entry: 0.6093, tp: 0.6299, sl: 0,
      date: "2025-09-5",
      outcome: "breakeven",
      proof: "https://x.com/areebithink/status/1963976197798572137"
    },
    {
      id: "REC-049",
      title: "SUI Long",
      symbol: "SUIUSDT",
      entry: 3.3778, tp: 3.3999, sl: 0,
      date: "2025-09-6",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1963976197798572137"
    },
    {
      id: "REC-050",
      title: "BTC Long",
      symbol: "BTCUSDT",
      entry: 110588.7, tp: 112147, sl: 0,
      date: "2025-09-8",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1964090883810480300"
    },
    {
      id: "REC-051",
      title: "BEAMX Long",
      symbol: "BEAMXUSDT",
      entry: 0.007051, tp: 0.00706, sl: 0,
      date: "2025-09-8",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1964090883810480300"
    },
    {
      id: "REC-052",
      title: "ADA Short",
      symbol: "ADAUSDT",
      entry: 0.8589, tp: 0.8063, sl: 0,
      date: "2025-09-9",
      outcome: "breakeven",
      proof: "https://x.com/areebithink/status/1964987409134977117"
    },
    {
      id: "REC-053",
      title: "BTC Short",
      symbol: "BTCUSDT",
      entry: 112034, tp: 111501, sl: 0,
      date: "2025-09-9",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1965028612454953363"
    },
    {
      id: "REC-054",
      title: "XRP Short",
      symbol: "XRPUSDT",
      entry: 2.9722, tp: 2.8754, sl: 0,
      date: "2025-09-9",
      outcome: "breakeven",
      proof: "https://x.com/areebithink/status/1965030926938984616"
    },
    {
      id: "REC-055",
      title: "ADA Long",
      symbol: "ADAUSDT",
      entry: 0.8591, tp: 0.8724, sl: 0,
      date: "2025-09-10",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1965446861231456491"
    },
    {
      id: "REC-056",
      title: "XRP Long",
      symbol: "XRPUSDT",
      entry: 2.952, tp: 3.002, sl: 0,
      date: "2025-09-10",
      outcome: "breakeven",
      proof: "https://x.com/areebithink/status/1965446861231456491"
    },
    {
      id: "REC-057",
      title: "FET Long",
      symbol: "FETUSDT",
      entry: 0.6463, tp: 0.6619, sl: 0,
      date: "2025-09-10",
      outcome: "breakeven",
      proof: "https://x.com/areebithink/status/1965446861231456491"
    },
    {
      id: "REC-058",
      title: "ETH Short",
      symbol: "ETHUSDT",
      entry: 4408.43, tp: 4200, sl: 4451.46,
      date: "2025-09-11",
      outcome: "loss",
      proof: "https://x.com/areebithink/status/1965756712868298757"
    },
    {
      id: "REC-059",
      title: "BTC Short",
      symbol: "BTCUSDT",
      entry: 113298, tp: 112001, sl: 114212,
      date: "2025-09-11",
      outcome: "loss",
      proof: "https://x.com/areebithink/status/1965756712868298757"
    },
    {
      id: "REC-060",
      title: "ADA Long",
      symbol: "ADAUSDT",
      entry: 0.8767, tp: 0.892, sl: 0.8724,
      date: "2025-09-12",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1966171474009665739"
    },
    {
      id: "REC-061",
      title: "NEAR Long",
      symbol: "NEARUSDT",
      entry: 2.703, tp: 2.764, sl: 2.687,
      date: "2025-09-12",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1966173458548899894"
    }, ,
    {
      id: "REC-062",
      title: "ETH Short",
      symbol: "ETHUSDT",
      entry: 4635, tp: 4614.72, sl: 0,
      date: "2025-09-13",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1966384149473759691"
    },
    {
      id: "REC-063",
      title: "XRP Short",
      symbol: "XRPUSDT",
      entry: 3.067, tp: 3.0173, sl: 3.079,
      date: "2025-09-12",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1966384149473759691"
    },
    {
      id: "REC-064",
      title: "ENS Long",
      symbol: "ENSUSDT",
      entry: 24.449, tp: 24.71, sl: 24.21,
      date: "2025-09-14",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1966957158274101606"
    },
    {
      id: "REC-065",
      title: "AUCTION Long",
      symbol: "AUCTIONUSDT",
      entry: 9.833, tp: 10, sl: 9.708,
      date: "2025-09-15",
      outcome: "loss",
      proof: "https://x.com/areebithink/status/1966957158274101606"
    },
    {
      id: "REC-066",
      title: "FET Short",
      symbol: "FETUSDT",
      entry: 0.6638, tp: 0.6515, sl: 0.6685,
      date: "2025-09-15",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1967434393133384135"
    },
    {
      id: "REC-067",
      title: "ENS Short",
      symbol: "ENSUSDT",
      entry: 24.073, tp: 23.598, sl: 24.237,
      date: "2025-09-15",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1967434393133384135"
    },
    {
      id: "REC-068",
      title: "SOL Long",
      symbol: "SOLUSDT",
      entry: 235.8, tp: 242, sl: 228,
      date: "2025-09-16",
      outcome: "breakeven",
      proof: "https://x.com/areebithink/status/1967508614538817589"
    },
    {
      id: "REC-068",
      title: "LINK Long",
      symbol: "LINKUSDT",
      entry: 23.446, tp: 23.681, sl: 22.93,
      date: "2025-09-16",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1967508614538817589"
    },
    {
      id: "REC-069",
      title: "XRP Long",
      symbol: "XRPUSDT",
      entry: 3.01, tp: 3.046, sl: 3,
      date: "2025-09-17",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1967984965242720551"
    },
    {
      id: "REC-070",
      title: "ADA Long",
      symbol: "ADAUSDT",
      entry: 0.86, tp: 0.8762, sl: 0.8559,
      date: "2025-09-17",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1967984965242720551"
    },
    {
      id: "REC-071",
      title: "BEAMX Long",
      symbol: "BEAMXUSDT",
      entry: 0.007464, tp: 0.007543, sl: 0.007428,
      date: "2025-09-17",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1967984965242720551"
    },
    {
      id: "REC-072",
      title: "SUI Short",
      symbol: "SUIUSDT",
      entry: 3.6144, tp: 3.5616, sl: 3.6521,
      date: "2025-09-17",
      outcome: "win",
      proof: "#"
    },
    {
      id: "REC-073",
      title: "BTC Short",
      symbol: "BTCUSDT",
      entry: 117116.4, tp: 115579.4, sl: 117200,
      date: "2025-09-17",
      outcome: "win",
      proof: "#"
    },
    {
      id: "REC-074",
      title: "FET Long",
      symbol: "FETUSDT",
      entry: 0.6319, tp: 0.6401, sl: 0.6299,
      date: "2025-09-17",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1968324220687208880"
    },
    {
      id: "REC-075",
      title: "BTC Long",
      symbol: "BTCUSDT",
      entry: 115485.3, tp: 117500, sl: 115121,
      date: "2025-09-17",
      outcome: "loss",
      proof: "https://x.com/areebithink/status/1968324220687208880"
    },
    {
      id: "REC-076",
      title: "LINK Long",
      symbol: "LINKUSDT",
      entry: 22.848, tp: 22.933, sl: 22.5,
      date: "2025-09-17",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1968324220687208880"
    },
    {
      id: "REC-077",
      title: "BTC Short",
      symbol: "BTCUSDT",
      entry: 117530, tp: 116562, sl: 117662,
      date: "2025-09-19",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1968707915373576221"
    },
    {
      id: "REC-078",
      title: "ENS Short",
      symbol: "ENSUSDT",
      entry: 24.342, tp: 24.07, sl: 24.622,
      date: "2025-09-19",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1968707915373576221"
    },
    {
      id: "REC-078",
      title: "ADA Short",
      symbol: "ADAUSDT",
      entry: 0.927, tp: 0.8956, sl: 0.9296,
      date: "2025-09-19",
      outcome: "win",
      proof: "https://x.com/areebithink/status/1968707915373576221"
    },
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

// Add this to a new or existing script.js file

// const weeklyReports = [
//   {
//     dateRange: "September 2–9, 2025",
//     summary: {
//       totalTrades: 6,
//       winRate: "67%",
//       avgRR: 2.3,
//       netPnL: "+7%",
//       highlight: "The best performing setup was a BTC long breakout (+15%), which captured a significant move after the market consolidated."
//     },
//     performance: [
//       {
//         category: "BTC/ETH",
//         details: "Our setups on Bitcoin and Ethereum performed well this week, with two successful long positions on BTC. Both trades aligned with our strategy of waiting for retests on key support levels, which paid off in higher conviction entries."
//       },
//       {
//         category: "Altcoins",
//         details: "This week's standout altcoin was SOL, which saw a strong breakout after consolidating for several weeks. The worst performer was AVAX, which failed to hold its support level and was a losing short trade."
//       },
//       {
//         category: "Indices/Gold",
//         details: "We didn't take any trades in these markets this week, but we observed continued strength in the dollar index (DXY), which influenced some of the crypto movements."
//       }
//     ],
//     outlook: [
//       {
//         asset: "BTC",
//         details: "Neutral/Bullish. We’ll be watching the $29,500 level as a potential breakout point. A clear break and retest above this level could lead to a continuation toward $32,000. On the flip side, a rejection here could bring us back to the $28,000 support."
//       },
//       {
//         asset: "ETH",
//         details: "We're watching the $1,900 level closely. A sustained move above it could signal bullish momentum, while a rejection could offer short opportunities."
//       },
//       {
//         asset: "Altcoins",
//         details: "Opportunities are likely to be found in altcoins that have shown relative strength while BTC consolidates. We’ll be looking at potential setups in LINK and DOT if they can break their recent resistance levels."
//       },
//       {
//         asset: "Macro",
//         details: "This week's upcoming CPI data release is a major macro event. A higher-than-expected number could lead to market volatility and a potential pullback in risk assets like crypto."
//       }
//     ],
//     conclusion: "Discipline and patience remain key. The most profitable setups were a result of waiting for high-conviction entries, and our losing trade was a good reminder to always respect our stop-losses. Next week, we’ll be watching the $29,500 level on BTC as a key breakout point."
//   },
//   // You can add more report objects here as you create new reports
//   // {
//   //     dateRange: "September 10–17, 2025",
//   //     ...
//   // }
// ];

// Data for all weekly reports
const weeklyReports = [
  {
    dateRange: "August to September 31–6, 2025",
    summary: {
      totalTrades: 23,
      winRate: "90%",
      avgRR: 1.8,
      netPnL: "+54%",
      highlight: "The best performing setup was a +232% gain on an ENS short using 75x leverage, showcasing the potential of identifying high-conviction setups."
    },
    performance: [
      { category: "BTC/ETH", details: "Our setups on Bitcoin and Ethereum performed well this week, with two successful long positions on BTC. Both trades aligned with our strategy, which paid off in higher conviction entries." },
      { category: "ETH", details: "Our setups on Ethereum performed well this week, with successful short positions on ETH. Trades aligned with our strategy, which paid off in higher conviction entries." },
      { category: "BTC/ETH", details: "Our setups on Bitcoin and Ethereum performed well this week, with two successful short positions on BTC. Both trades aligned with our strategy, which paid off in higher conviction entries." },
      { category: "BTC", details: "Our setups on Bitcoin performed well this week, with successful long positions on BTC. Trades aligned with our strategy, which paid off in higher conviction entries." },
      { category: "ETH", details: "Our setups on Ethereum performed well this week, with successful short positions on ETH. Trades aligned with our strategy, which paid off in higher conviction entries." },
      { category: "BTC/ETH", details: "Our setups on Bitcoin and Ethereum performed well this week, with two successful long positions on BTC. Both trades aligned with our strategy, which paid off in higher conviction entries." },
      { category: "Main Caps", details: "This week's standout main cap was XRP, which saw a strong breakout after consolidating for several Hours and we get 184% Long. The worst performer was SOL, which failed to hold its resistance level with low volume and was a almost breakeven trade Short trade 63% profit." },
      { category: "High Caps", details: "This week's standout main cap was ENS, which saw a strong breakdown after consolidating for several Hours and we get 232% Short. The worst performer was FET, which failed to hold its Support level with low volume and was a almost breakeven trade Long trade 20% profit." }
    ],
    outlook: [
      { asset: "BTC", details: "Neutral/Bullish. We’ll be watching the $113,600 level as a potential breakout point." },
      { asset: "ETH", details: "We're watching the $4,380 level closely." }
    ],
    conclusion: "Discipline and patience remain key."
  },
  {
    dateRange: "September 7–13, 2025",
    summary: {
      totalTrades: 14,
      winRate: "80%",
      avgRR: 1.28,
      netPnL: "+10%",
      highlight: "The strongest performance this week was achieved on a NEAR long position, delivering a +208% return utilizing 100x leverage, entered on September 12, 2025"
    },
    performance: [
      {
        category: "BTC",
        details: "Our Bitcoin setups delivered mixed results this week. We secured profitable trades on both the long (Sept 8) and short (Sept 9) side, while subsequent shorts (Sept 11) underperformed. The results highlight the importance of timing entries in high-volatility environments."
      },
      {
        category: "ETH",
        details: "Ethereum trading activity produced a contrasting performance. While the Sept 13 short trade closed successfully, the Sept 11 short was the weakest of the week, registering a -98% loss. This divergence underscores the need for precision in execution around major resistance levels."
      },
      {
        category: "ADA",
        details: "Cardano proved to be the strongest main-cap performer. The Sept 12 long position returned +160% at 100x leverage, driven by strong momentum following earlier consolidation. Other ADA trades produced wins and breakevens, but this setup was the standout."
      },
      {
        category: "XRP",
        details: "XRP trades were mixed. Several attempts resulted in breakeven exits due to muted follow-through, though the Sept 12 short provided a profitable outcome. Overall, XRP reflected a consolidating market with limited conviction moves."
      },
      {
        category: "Main Caps",
        details: "Among main caps, the best performer was ADA with a +160% long position on Sept 12 at 100x leverage. The weakest was ETH, with a -98% short on Sept 11. These contrasting results highlight the selective nature of opportunity capture in high-liquidity assets."
      },
      {
        category: "High Caps",
        details: "Within high caps, NEAR led performance with a +208% long trade on Sept 12 at 100x leverage. Conversely, FET was the weakest, closing at near-breakeven (-1%) on Sept 10. The data reflects both the outsized opportunity and risk management challenges present in lower-liquidity markets."
      }
    ],

    outlook: [
      { asset: "BTC", details: "Neutral to bullish bias remains intact. We are monitoring the $117,300 level as the primary breakout threshold. While a clean breakout this week appears unlikely, a weekly close below $117,300 could open the path toward $114,200 before a potential recovery leg higher. Macroeconomic data and broader market sentiment will remain key catalysts for confirmation." },
      { asset: "ETH", details: "Ethereum maintains a neutral to bullish posture, with $4,800 as the key breakout level to watch. A close below $4,790 would likely trigger a retest of $4,600–$4,500, before conditions set up for a potential rebound. As with BTC, external macroeconomic factors and news flow will play a significant role in shaping near-term price action." },
      { asset: "Note", details: "This report has been published by Beeralia on September 14, 2025 at 7:35 AM EST, ahead of the current weekly close. The outlook and levels discussed herein are based on market conditions observed at the time of publication. Should any of the identified breakout or breakdown levels be triggered prior to the weekly close, the report will be updated accordingly. In the absence of such developments, this outlook will remain valid and serve as the basis for the following week’s analysis." }
    ],
    conclusion: "Discipline and patience remain key."
  },
  // {
  //     dateRange: "September 21-30, 2025",
  //     summary: {
  //         totalTrades: 6,
  //         winRate: "67%",
  //         avgRR: 2.3,
  //         netPnL: "+7%",
  //         highlight: "The best performing setup was a BTC long breakout (+15%), which captured a significant move after the market consolidated."
  //     },
  //     performance: [
  //         { category: "BTC/ETH", details: "Our setups on Bitcoin and Ethereum performed well this week, with two successful long positions on BTC. Both trades aligned with our strategy of waiting for retests on key support levels, which paid off in higher conviction entries." },
  //         { category: "Altcoins", details: "This week's standout altcoin was SOL, which saw a strong breakout after consolidating for several weeks. The worst performer was AVAX, which failed to hold its support level and was a losing short trade." }
  //     ],
  //     outlook: [
  //         { asset: "BTC", details: "Neutral/Bullish. We’ll be watching the $29,500 level as a potential breakout point." },
  //         { asset: "ETH", details: "We're watching the $1,900 level closely." }
  //     ],
  //     conclusion: "Discipline and patience remain key."
  // },
  // {
  //     dateRange: "October 2–9, 2025",
  //     summary: {
  //         totalTrades: 6,
  //         winRate: "67%",
  //         avgRR: 2.3,
  //         netPnL: "+7%",
  //         highlight: "The best performing setup was a BTC long breakout (+15%), which captured a significant move after the market consolidated."
  //     },
  //     performance: [
  //         { category: "BTC/ETH", details: "Our setups on Bitcoin and Ethereum performed well this week, with two successful long positions on BTC. Both trades aligned with our strategy of waiting for retests on key support levels, which paid off in higher conviction entries." },
  //         { category: "Altcoins", details: "This week's standout altcoin was SOL, which saw a strong breakout after consolidating for several weeks. The worst performer was AVAX, which failed to hold its support level and was a losing short trade." }
  //     ],
  //     outlook: [
  //         { asset: "BTC", details: "Neutral/Bullish. We’ll be watching the $29,500 level as a potential breakout point." },
  //         { asset: "ETH", details: "We're watching the $1,900 level closely." }
  //     ],
  //     conclusion: "Discipline and patience remain key."
  // },
  // {
  //     dateRange: "Octuber 10–20, 2025",
  //     summary: {
  //         totalTrades: 6,
  //         winRate: "67%",
  //         avgRR: 2.3,
  //         netPnL: "+7%",
  //         highlight: "The best performing setup was a BTC long breakout (+15%), which captured a significant move after the market consolidated."
  //     },
  //     performance: [
  //         { category: "BTC/ETH", details: "Our setups on Bitcoin and Ethereum performed well this week, with two successful long positions on BTC. Both trades aligned with our strategy of waiting for retests on key support levels, which paid off in higher conviction entries." },
  //         { category: "Altcoins", details: "This week's standout altcoin was SOL, which saw a strong breakout after consolidating for several weeks. The worst performer was AVAX, which failed to hold its support level and was a losing short trade." }
  //     ],
  //     outlook: [
  //         { asset: "BTC", details: "Neutral/Bullish. We’ll be watching the $29,500 level as a potential breakout point." },
  //         { asset: "ETH", details: "We're watching the $1,900 level closely." }
  //     ],
  //     conclusion: "Discipline and patience remain key."
  // }
];

function generateReportHTML(report, index) {
  let performanceHTML = report.performance.map(p => `<p><strong>${p.category}:</strong> ${p.details}</p>`).join('');
  let outlookHTML = report.outlook.map(o => `<p><strong>${o.asset}:</strong> ${o.details}</p>`).join('');

  return `
        <div class="report-card" data-index="${index}" id="report-${index}">
            <button class="report-toggle-button">
                <span>Weekly Market Report – ${report.dateRange}</span>
                <i class="fas fa-chevron-down report-toggle-icon"></i>
            </button>
            <div class="report-content">
                <h3>📌 Weekly Summary</h3>
                <div class="summary-metrics">
                    <div class="metric-item"><strong>${report.summary.totalTrades}</strong> Total Trades Taken</div>
                    <div class="metric-item"><strong>${report.summary.winRate}</strong> Win Rate</div>
                    <div class="metric-item"><strong>${report.summary.avgRR}</strong> Avg R/R</div>
                    <div class="metric-item"><strong>${report.summary.netPnL}</strong> Net Weekly PnL</div>
                </div>
                <p class="tagline">${report.summary.highlight}</p>
                <h3>📈 Performance Overview</h3>
                ${performanceHTML}
                <h3>🗓️ Market Outlook (Next Week)</h3>
                ${outlookHTML}
                <p>${report.conclusion}</p>
                <div class="report-actions">
                    <button class="btn btn-outline download-report-btn" data-index="${index}">
                        <i class="fas fa-download"></i> Download Report
                    </button>
                    <button class="btn btn-outline share-report-btn" data-index="${index}">
                        <i class="fas fa-share-alt"></i> Share Report
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderReports() {
  const reportContainer = document.getElementById('report-container');
  if (reportContainer) {
    const sortedReports = [...weeklyReports].reverse();
    const allReportsHTML = sortedReports.map((report, index) => generateReportHTML(report, index)).join('');
    reportContainer.innerHTML = allReportsHTML;

    // Attach event listeners to all toggle and download buttons
    document.querySelectorAll('.report-toggle-button').forEach(button => {
      button.addEventListener('click', () => {
        toggleReport(button);
      });
    });

    document.querySelectorAll('.download-report-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const reportIndex = button.dataset.index;
        downloadReport(weeklyReports[reportIndex]);
      });
    });

    document.querySelectorAll('.share-report-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const reportIndex = button.dataset.index;
        shareReport(reportIndex);
      });
    });
  }
}

function toggleReport(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.report-toggle-icon');

  if (content.style.display === "block") {
    content.style.display = "none";
    icon.classList.remove('active');
  } else {
    document.querySelectorAll('.report-content').forEach(c => c.style.display = "none");
    document.querySelectorAll('.report-toggle-icon').forEach(i => i.classList.remove('active'));

    content.style.display = "block";
    icon.classList.add('active');
  }
}

function filterReports() {
  const searchTerm = document.getElementById('reportSearch').value.toLowerCase();
  const cards = document.querySelectorAll('.report-card');
  cards.forEach(card => {
    const dateRange = card.querySelector('span').textContent.toLowerCase();
    if (dateRange.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function shareReport(index) {
  const report = weeklyReports[index];
  const reportTitle = encodeURIComponent(`Weekly Market Report – ${report.dateRange}`);
  const reportDescription = encodeURIComponent(report.summary.highlight);
  const pageUrl = window.location.href.split('#')[0]; // Get the URL without any existing hash

  // Construct the URL with the unique fragment identifier
  const shareUrlWithFragment = `${pageUrl}#report-${index}`;

  // Use the Web Share API or the fallback
  if (navigator.share) {
    navigator.share({
      title: reportTitle,
      text: `Check out this weekly market report from BeeraLia: ${reportDescription}`,
      url: shareUrlWithFragment
    }).then(() => {
      console.log('Successfully shared!');
    }).catch((error) => {
      console.error('Error sharing:', error);
      // Fallback
      window.location.href = `mailto:?subject=${reportTitle}&body=Check out this weekly market report from BeeraLia: ${shareUrlWithFragment}%0A%0A${reportDescription}`;
    });
  } else {
    // Fallback for browsers that don't support the Web Share API
    window.location.href = `mailto:?subject=${reportTitle}&body=Check out this weekly market report from BeeraLia: ${shareUrlWithFragment}%0A%0A${reportDescription}`;
  }
}

// Replace the existing downloadReport function with this corrected version
function downloadReport(reportIndex) {
  const report = weeklyReports[reportIndex];
  const element = document.createElement('div');
  element.innerHTML = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; position: relative; padding: 2rem; color: #333; line-height: 1.6;">
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-45deg);
                color: rgba(0, 0, 0, 0.1);
                font-size: 5rem;
                font-weight: 700;
                pointer-events: none;
                user-select: none;
                white-space: nowrap;
                z-index: 99;
            ">
                BEERALIA
            </div>
            <header style="text-align: center; margin-bottom: 2rem;">
                <h1 style="font-size: 2.5rem; color: #0077b6; margin-bottom: 0.5rem; font-weight: 600;">Official Weekly Report</h1>
                <h2 style="font-size: 1.5rem; color: #555; font-weight: 400;">${report.dateRange}</h2>
            </header>
            <hr style="border: none; border-top: 2px solid #ddd; margin: 2rem 0;">
            <section style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.5rem; color: #0077b6; margin-bottom: 1rem; border-left: 4px solid #0077b6; padding-left: 10px;">Summary</h3>
                <p style="font-style: italic; color: #666; font-size: 1rem;">${report.summary.highlight}</p>
                <ul style="list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1.5rem;">
                    <li style="flex: 1 1 200px; padding: 1rem; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;"><strong>Total Trades:</strong> ${report.summary.totalTrades}</li>
                    <li style="flex: 1 1 200px; padding: 1rem; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;"><strong>Win Rate:</strong> ${report.summary.winRate}</li>
                    <li style="flex: 1 1 200px; padding: 1rem; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;"><strong>Avg R/R:</strong> ${report.summary.avgRR}</li>
                    <li style="flex: 1 1 200px; padding: 1rem; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;"><strong>Net PnL:</strong> ${report.summary.netPnL}</li>
                </ul>
            </section>
            <section style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.5rem; color: #0077b6; margin-bottom: 1rem; border-left: 4px solid #0077b6; padding-left: 10px;">Performance Overview</h3>
                ${report.performance.map(p => `<p style="margin-bottom: 1rem;"><strong>${p.category}:</strong> ${p.details}</p>`).join('')}
            </section>
            <section style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.5rem; color: #0077b6; margin-bottom: 1rem; border-left: 4px solid #0077b6; padding-left: 10px;">Market Outlook (Next Week)</h3>
                ${report.outlook.map(o => `<p style="margin-bottom: 1rem;"><strong>${o.asset}:</strong> ${o.details}</p>`).join('')}
            </section>
            <footer style="text-align: center; font-size: 0.9rem; color: #888; margin-top: 3rem;">
                <p>${report.conclusion}</p>
                <p>&copy; 2025 BeeraLia. All rights reserved.</p>
            </footer>
        </div>
    `;
  const opt = {
    margin: 1,
    filename: `Official_Report_${report.dateRange.replace(/\s+/g, '_')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
}

// Also update the event listener setup in the renderReports function
function renderReports() {
  const reportContainer = document.getElementById('report-container');
  if (reportContainer) {
    const sortedReports = [...weeklyReports].reverse();
    const allReportsHTML = sortedReports.map((report, index) => generateReportHTML(report, index)).join('');
    reportContainer.innerHTML = allReportsHTML;

    // Attach event listeners to all toggle and download buttons
    document.querySelectorAll('.report-toggle-button').forEach(button => {
      button.addEventListener('click', () => {
        toggleReport(button);
      });
    });

    document.querySelectorAll('.download-report-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const reportIndex = parseInt(button.dataset.index);
        // Get the correct report index from the sorted array
        const originalIndex = weeklyReports.length - 1 - reportIndex;
        downloadReport(originalIndex);
      });
    });

    document.querySelectorAll('.share-report-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const reportIndex = button.dataset.index;
        shareReport(reportIndex);
      });
    });
  }
}

// Also update the generateReportHTML function to use the correct index
function generateReportHTML(report, index) {
  let performanceHTML = report.performance.map(p => `<p><strong>${p.category}:</strong> ${p.details}</p>`).join('');
  let outlookHTML = report.outlook.map(o => `<p><strong>${o.asset}:</strong> ${o.details}</p>`).join('');

  return `
        <div class="report-card" data-index="${index}" id="report-${index}">
            <button class="report-toggle-button">
                <span>Weekly Market Report – ${report.dateRange}</span>
                <i class="fas fa-chevron-down report-toggle-icon"></i>
            </button>
            <div class="report-content">
                <h3>📌 Weekly Summary</h3>
                <div class="summary-metrics">
                    <div class="metric-item"><strong>${report.summary.totalTrades}</strong> Total Trades Taken</div>
                    <div class="metric-item"><strong>${report.summary.winRate}</strong> Win Rate</div>
                    <div class="metric-item"><strong>${report.summary.avgRR}</strong> Avg R/R</div>
                    <div class="metric-item"><strong>${report.summary.netPnL}</strong> Net Weekly PnL</div>
                </div>
                <p class="tagline">${report.summary.highlight}</p>
                <h3>📈 Performance Overview</h3>
                ${performanceHTML}
                <h3>🗓️ Market Outlook (Next Week)</h3>
                ${outlookHTML}
                <p>${report.conclusion}</p>
                <div class="report-actions">
                    <button class="btn btn-outline download-report-btn" data-index="${index}">
                        <i class="fas fa-download"></i> Download Report
                    </button>
                    <button class="btn btn-outline share-report-btn" data-index="${index}">
                        <i class="fas fa-share-alt"></i> Share Report
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', renderReports);
function handleUrlFragment() {
  const hash = window.location.hash;
  if (hash) {
    const reportId = hash.substring(1); // Remove the '#'
    const targetReportCard = document.getElementById(reportId);

    if (targetReportCard) {
      // Find the correct button and toggle the report content
      const toggleButton = targetReportCard.querySelector('.report-toggle-button');
      toggleReport(toggleButton);

      // Scroll the report card into view
      targetReportCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Call this function after rendering reports to handle direct links
window.addEventListener('DOMContentLoaded', () => {
  renderReports();
  handleUrlFragment();
});