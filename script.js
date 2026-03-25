let tg = window.Telegram.WebApp;
let user = tg.initDataUnsafe.user;

let progress = 0;
let bar = document.getElementById("bar");
let percent = document.getElementById("percent");
let status = document.getElementById("status");
let step = document.getElementById("step");

// user name
if (user) {
  document.getElementById("name").innerText = user.first_name;
}

// progress animation
let steps = [
  "Initializing...",
  "Checking device...",
  "Scanning system...",
  "Validating..."
];

let i = 0;

let interval = setInterval(() => {
  progress += 5;
  bar.style.width = progress + "%";
  percent.innerText = progress + "%";

  if (i < steps.length) {
    step.innerText = steps[i];
    i++;
  }

  if (progress >= 100) {
    clearInterval(interval);
    verifyDevice();
  }
}, 150);

// fingerprint
function getDevice() {
  return JSON.stringify({
    ua: navigator.userAgent,
    screen: screen.width + "x" + screen.height,
    platform: navigator.platform,
    lang: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
}

// 🔥 REAL VERIFY
function verifyDevice() {
  fetch("https://yourdomain.com/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: user.id,
      device: getDevice()
    })
  })
  .then(res => res.json())
  .then(res => {

    document.getElementById("scanBox").classList.add("hidden");
    document.getElementById("resultBox").classList.remove("hidden");

    if (res.status === "success") {
      status.className = "badge success";
      status.innerText = "VERIFIED";

      document.getElementById("icon").innerText = "✅";
      document.getElementById("title").innerText = "Verified Successfully";
      document.getElementById("desc").innerText = "Your device is secure. You can continue.";
    } else {
      status.className = "badge failed";
      status.innerText = "FAILED";

      document.getElementById("icon").innerText = "❌";
      document.getElementById("title").innerText = "Verification Failed";
      document.getElementById("desc").innerText = "This device has already been used.";
    }
  });
}

function closeApp() {
  tg.close();
  }
