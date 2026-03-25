let tg = window.Telegram.WebApp;

// user info show
let user = tg.initDataUnsafe.user;
if (user) {
  document.getElementById("name").innerText = user.first_name;
  document.getElementById("uid").innerText = "ID: " + user.id;
}

let progress = 0;
let bar = document.getElementById("bar");
let percent = document.getElementById("percent");

let interval = setInterval(() => {
  progress += 5;
  bar.style.width = progress + "%";
  percent.innerText = progress + "%";

  if (progress >= 100) {
    clearInterval(interval);
    sendData();
  }
}, 150);

// device fingerprint
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
  tg.sendData(getDevice());

  percent.innerText = "Checking...";

  // wait then close (bot reply will show result)
  setTimeout(() => {
    tg.close();
  }, 2000);
}

function closeApp() {
  tg.close();
}
