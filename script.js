let tg = window.Telegram.WebApp;
let user = tg.initDataUnsafe.user;

document.getElementById("name").innerText = "👋 " + user.first_name;

let steps = [
  "Initializing...",
  "Checking device...",
  "Analyzing fingerprint...",
  "Validating request...",
  "Finalizing..."
];

let progress = 0;
let bar = document.getElementById("bar");
let percent = document.getElementById("percent");
let status = document.getElementById("status");
let stepText = document.getElementById("step");

let i = 0;

let interval = setInterval(() => {

  if (progress >= 100) {
    progress = 100;
    bar.style.width = "100%";
    percent.innerText = "100%";

    clearInterval(interval);
    verify();
    return;
  }

  progress += 4;

  if (progress > 100) progress = 100;

  bar.style.width = progress + "%";
  percent.innerText = progress + "%";

  if (i < steps.length) {
    stepText.innerText = steps[i];
    i++;
  }

}, 180);

function getDevice() {
  return JSON.stringify({
    ua: navigator.userAgent,
    screen: screen.width + "x" + screen.height,
    platform: navigator.platform,
    lang: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
}

function verify() {
  percent.innerText = "Checking...";

  fetch("https://web-production-155.up.railway.app/verify", {
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
    document.getElementById("resultBox").classList.remove("hidden");

    if (res.status === "success") {
      status.className = "badge success";
      status.innerText = "VERIFIED";

      document.getElementById("icon").innerText = "🎉";
      document.getElementById("title").innerText = "Verification Successful";
      document.getElementById("desc").innerText = "Your device is approved";

    } else {
      status.className = "badge failed";
      status.innerText = "FAILED";

      document.getElementById("icon").innerText = "🚫";
      document.getElementById("title").innerText = "Verification Failed";
      document.getElementById("desc").innerText = "Device already used";
    }
  });
}

function closeApp() {
  tg.close();
}
