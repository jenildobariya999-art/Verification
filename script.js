let tg = window.Telegram.WebApp;
let user = tg.initDataUnsafe.user;

document.getElementById("name").innerText = user.first_name;

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
    verify();
  }
}, 150);

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

  fetch("https://web-production-0df8e.up.railway.app/verify", {
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

      document.getElementById("icon").innerText = "✅";
      document.getElementById("title").innerText = "Verification Successful";
      document.getElementById("desc").innerText = "Device approved";
    } else {
      status.className = "badge failed";
      status.innerText = "FAILED";

      document.getElementById("icon").innerText = "❌";
      document.getElementById("title").innerText = "Verification Failed";
      document.getElementById("desc").innerText = "Already used device/IP";
    }

  })
  .catch(err => {
    console.log(err);

    document.getElementById("scanBox").style.display = "none";
    document.getElementById("resultBox").classList.remove("hidden");

    status.className = "badge failed";
    status.innerText = "ERROR";

    document.getElementById("icon").innerText = "⚠️";
    document.getElementById("title").innerText = "Server Error";
    document.getElementById("desc").innerText = "Try again later";
  });
}

function closeApp() {
  tg.close();
}
