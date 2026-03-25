let tg = window.Telegram.WebApp;

let progress = 0;
let bar = document.getElementById("bar");
let percent = document.getElementById("percent");

// progress animation
let interval = setInterval(() => {
  progress += 10;
  bar.style.width = progress + "%";
  percent.innerText = progress + "%";

  if (progress >= 100) {
    clearInterval(interval);
    sendData();
  }
}, 200);

// strong device fingerprint
function getDevice() {
  return JSON.stringify({
    ua: navigator.userAgent,
    screen: screen.width + "x" + screen.height,
    platform: navigator.platform,
    lang: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
}

// send to bot
function sendData() {
  let data = getDevice();

  tg.sendData(data);

  percent.innerText = "🔎 Checking with server...";
}
