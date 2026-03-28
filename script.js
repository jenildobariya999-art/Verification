function getCanvasFingerprint() {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  ctx.fillText("secure", 10, 10);
  return canvas.toDataURL();
}

function getFingerprint() {
  return navigator.userAgent + screen.width + screen.height + getCanvasFingerprint();
}

async function verify() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  let token = params.get("token");

  if (!id || !token) {
    document.getElementById("status").innerText = "❌ Invalid Link";
    return;
  }

  let fingerprint = getFingerprint();

  let res = await fetch("https://web-production-0df8e.up.railway.app/verify", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      user_id: id,
      token: token,
      fingerprint: fingerprint
    })
  });

  let data = await res.json();

  if (data.status === "ok") {
    document.getElementById("status").innerText = "✅ Verified!";
  } else {
    document.getElementById("status").innerText = "❌ " + data.reason;
  }
}

verify();
