export function analyzeURL(url) {

  let score = 0;
  let reasons = [];

  if (!url.trim()) {
    return {
      status: "Invalid",
      score: 100,
      reasons: ["Please enter a URL."]
    };
  }

  try {
    new URL(url);
  } catch {
    return {
      status: "Invalid",
      score: 100,
      reasons: ["Invalid URL format."]
    };
  }

  const lower = url.toLowerCase();

  // HTTP
  if (lower.startsWith("http://")) {
    score += 20;
    reasons.push("Uses HTTP instead of HTTPS");
  }

  // Long URL
  if (lower.length > 60) {
    score += 10;
    reasons.push("Very long URL");
  }

  // Hyphens
  if (lower.includes("-")) {
    score += 10;
    reasons.push("Contains hyphens");
  }

  // @ symbol
  if (lower.includes("@")) {
    score += 20;
    reasons.push("Contains '@' symbol");
  }

  // Multiple subdomains
  const dots = (lower.match(/\./g) || []).length;

  if (dots > 3) {
    score += 15;
    reasons.push("Too many subdomains");
  }

  // Suspicious keywords

  const keywords = [
    "login",
    "signin",
    "verify",
    "secure",
    "update",
    "payment",
    "wallet",
    "bank",
    "account",
    "confirm",
    "password",
    "reset",
    "otp"
  ];

  keywords.forEach(word => {
    if (lower.includes(word)) {
      score += 10;
      reasons.push(`Suspicious keyword: ${word}`);
    }
  });

  // Fake domains

  const fakeDomains = [
    ".xyz",
    ".tk",
    ".ml",
    ".cf",
    ".gq",
    ".top",
    ".click"
  ];

  fakeDomains.forEach(domain => {
    if (lower.endsWith(domain)) {
      score += 20;
      reasons.push(`Suspicious domain: ${domain}`);
    }
  });

  // IP Address

  const ipPattern = /^https?:\/\/(\d{1,3}\.){3}\d{1,3}/;

  if (ipPattern.test(lower)) {
    score += 20;
    reasons.push("Uses IP Address instead of domain");
  }

  // URL Shorteners

  const shorteners = [
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl",
    "rb.gy",
    "is.gd",
    "ow.ly"
  ];

  shorteners.forEach(site => {
    if (lower.includes(site)) {
      score += 20;
      reasons.push("Uses URL Shortener");
    }
  });

  // Encoded URL

  if (
    lower.includes("%20") ||
    lower.includes("%2f") ||
    lower.includes("%3a") ||
    lower.includes("%40")
  ) {
    score += 15;
    reasons.push("Contains encoded characters");
  }

  // Custom Port

  if (/:\d+/.test(lower)) {
    score += 15;
    reasons.push("Uses custom port");
  }

  // Excessive digits

  const digitCount = (lower.match(/\d/g) || []).length;

  if (digitCount > 8) {
    score += 10;
    reasons.push("Contains excessive numeric characters");
  }

  if (score > 100) score = 100;

  let status = "Safe";

  if (score >= 70) {
    status = "Dangerous";
  } else if (score >= 40) {
    status = "Suspicious";
  }

  if (reasons.length === 0) {
    reasons.push("No suspicious indicators detected.");
  }

  return {
    status,
    score,
    reasons
  };
}