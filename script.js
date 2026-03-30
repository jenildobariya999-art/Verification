let tg = window.Telegram.WebApp;
let user = tg.initDataUnsafe.user;

document.getElementById("name").innerText = "👋 " + user.first_name;

let progress = 0;
let bar = document.getElementById("bar");
let percent = document.getElementById("percent");
let status = document.getElementById("status");

let interval = setInterval(() => {

  if (progress >= 100) {
    progress = 100;
    bar.style.width = "100%";
    percent.innerText = "100%";

    clearInterval(interval);
    verify();
    return;
  }

  progress += 5;
  if (progress > 100) progress = 100;

  bar.style.width = progress + "%";
  percent.innerText = progress + "%";

}, 150);


// 🔥 IMPORTANT — CHANGE THIS URL
const API_URL = "https://web-production-155.up.railway.app/verify";
// 👆 apna REAL Railway URL daal

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

  // ⏱ timeout system (5 sec max)
  let timeout = setTimeout(() => {
    showFailed("Server not responding");
  }, 5000);

  fetch(API_URL, {
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
    clearTimeout(timeout);

    if (res.status === "success") {
      showSuccess();
    } else {
      showFailed("Device already used");
    }
  })
  .catch(() => {
    clearTimeout(timeout);
    showFailed("Network error");
  });
}


function showSuccess() {
  document.getElementById("scanBox").style.display = "none";
  document.getElementById("resultBox").classList.remove("hidden");

  status.className = "badge success";
  status.innerText = "VERIFIED";

  document.getElementById("icon").innerText = "🎉";
  document.getElementById("title").innerText = "Verification Successful";
  document.getElementById("desc").innerText = "Device approved";
}

function showFailed(msg) {
  document.getElementById("scanBox").style.display = "none";
  document.getElementById("resultBox").classList.remove("hidden");

  status.className = "badge failed";
  status.innerText = "FAILED";

  document.getElementById("icon").innerText = "❌";
  document.getElementById("title").innerText = "Verification Failed";
  document.getElementById("desc").innerText = msg;
}

function closeApp() {
  tg.close();
}
