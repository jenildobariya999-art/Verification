let tg = window.Telegram.WebApp;

let progress = 0;
let bar = document.getElementById("bar");
let percent = document.getElementById("percent");

let interval = setInterval(() => {
  progress += 10;
  bar.style.width = progress + "%";
  percent.innerText = progress + "%";

  if (progress >= 100) {
    clearInterval(interval);
    sendData();
  }
}, 300);

// Device fingerprint
function getDevice() {
  return JSON.stringify({
    ua: navigator.userAgent,
    screen: screen.width + "x" + screen.height,
    lang: navigator.language
  });
}

function sendData() {
  let data = getDevice();
  tg.sendData(data);

  // Fake logic for UI (real result comes from bot)
  setTimeout(() => {
    document.getElementById("scan").classList.add("hidden");

    // Change this condition if needed
    if (Math.random() > 0.5) {
      document.getElementById("success").classList.remove("hidden");
    } else {
      document.getElementById("fail").classList.remove("hidden");
    }
  }, 1000);
}

function closeApp() {
  tg.close();
}
