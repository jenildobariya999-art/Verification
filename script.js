let tg = window.Telegram.WebApp;

// user info
let user = tg.initDataUnsafe.user;
if (user) {
  document.getElementById("name").innerText = user.first_name;
  document.getElementById("uid").innerText = "ID: " + user.id;
}

let progress = 0;
let bar = document.getElementById("bar");
let percent = document.getElementById("percent");
let status = document.getElementById("status");

let interval = setInterval(() => {
  progress += 5;
  bar.style.width = progress + "%";
  percent.innerText = progress + "%";

  if (progress >= 100) {
    clearInterval(interval);
    verifyDevice();
  }
}, 120);

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

// VERIFY + SHOW RESULT
function verifyDevice() {
  percent.innerText = "Checking...";

  tg.sendData(getDevice());

  // ⚠️ UI DEMO (replace later with backend response)
  setTimeout(() => {

    document.getElementById("scanBox").classList.add("hidden");
    document.getElementById("resultBox").classList.remove("hidden");

    let success = Math.random() > 0.5;

    if (success) {
      status.className = "badge success";
      status.innerText = "VERIFIED";

      document.getElementById("icon").innerText = "✅";
      document.getElementById("title").innerText = "Verification Successful";
      document.getElementById("desc").innerText = "Your device is secure and verified.";
    } else {
      status.className = "badge failed";
      status.innerText = "FAILED";

      document.getElementById("icon").innerText = "❌";
      document.getElementById("title").innerText = "Verification Failed";
      document.getElementById("desc").innerText = "Multiple devices detected.";
    }

  }, 1200);
}

function closeApp() {
  tg.close();
}
