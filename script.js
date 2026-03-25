let tg = window.Telegram.WebApp;
let user = tg.initDataUnsafe.user;

document.getElementById("name").innerText = user.first_name;

let progress = 0;
let bar = document.getElementById("bar");
let percent = document.getElementById("percent");
let status = document.getElementById("status");

let steps = [
  "Initializing...",
  "Checking hardware...",
  "Analyzing device...",
  "Validating security..."
];

let i = 0;

let interval = setInterval(() => {
  progress += 5;
  bar.style.width = progress + "%";
  percent.innerText = progress + "%";

  if (i < steps.length) {
    document.getElementById("step").innerText = steps[i];
    i++;
  }

  if (progress >= 100) {
    clearInterval(interval);
    verify();
  }
}, 150);

// strong fingerprint
function getDevice() {
  return JSON.stringify({
    ua: navigator.userAgent,
    screen: screen.width + "x" + screen.height,
    platform: navigator.platform,
    lang: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cpu: navigator.hardwareConcurrency,
    memory: navigator.deviceMemory,
    touch: navigator.maxTouchPoints
  });
}

// verify
function verify() {
  percent.innerText = "Checking...";

  fetch("https://verification-bot-apjv.onrender.com/verify", {
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

    document.getElementById("scanBox").style.display = "none";
    document.getElementById("resultBox").style.display = "block";

    if (res.status === "success") {
      status.className = "badge success";
      status.innerText = "VERIFIED";

      document.getElementById("icon").innerText = "✅";
      document.getElementById("title").innerText = "Verification Successful";
      document.getElementById("desc").innerText = "Your device is secure.";
    } else {
      status.className = "badge failed";
      status.innerText = "FAILED";

      document.getElementById("icon").innerText = "❌";
      document.getElementById("title").innerText = "Verification Failed";
      document.getElementById("desc").innerText = "Device already used.";
    }
  });
}

function closeApp() {
  tg.close();
}
