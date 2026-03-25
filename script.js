let tg = window.Telegram.WebApp;
let user = tg.initDataUnsafe.user;

let bar = document.getElementById("bar");
let percent = document.getElementById("percent");
let status = document.getElementById("status");

let progress = 0;

let interval = setInterval(() => {
  progress += 10;
  bar.style.width = progress + "%";
  percent.innerText = progress + "%";

  if (progress >= 100) {
    clearInterval(interval);
    verify();
  }
}, 150);

// device data
function getDevice() {
  return JSON.stringify({
    ua: navigator.userAgent,
    screen: screen.width + "x" + screen.height,
    platform: navigator.platform,
    lang: navigator.language
  });
}

// 🔥 REAL VERIFY FUNCTION
function verify() {
  percent.innerText = "Checking...";

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

    // hide scan
    document.getElementById("scanBox").style.display = "none";
    document.getElementById("resultBox").style.display = "block";

    if (res.status === "success") {
      status.className = "badge success";
      status.innerText = "VERIFIED";

      document.getElementById("title").innerText = "✅ Verified Successfully";
      document.getElementById("desc").innerText = "Your device is approved.";
    }

    else if (res.status === "failed") {
      status.className = "badge failed";
      status.innerText = "FAILED";

      document.getElementById("title").innerText = "❌ Verification Failed";
      document.getElementById("desc").innerText = "Device already used.";
    }

    else {
      status.className = "badge failed";
      status.innerText = "ERROR";

      document.getElementById("title").innerText = "⚠️ Error";
      document.getElementById("desc").innerText = "Try again later.";
    }

  })
  .catch(err => {
    console.log(err);

    document.getElementById("title").innerText = "⚠️ Server Error";
    document.getElementById("desc").innerText = "Backend not connected.";
  });
}
