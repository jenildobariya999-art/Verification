const params = new URLSearchParams(window.location.search);

const user_id = params.get("id");
const token = params.get("token");

// ✅ Stable fingerprint
function getFingerprint() {
    return navigator.userAgent +
           navigator.platform +
           screen.width +
           screen.height;
}

const fingerprint = getFingerprint();

fetch("https://web-production-155.up.railway.app/verify", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        user_id: user_id,
        token: token,
        fingerprint: fingerprint
    })
})
.then(res => res.json())
.then(data => {
    const status = document.getElementById("status");

    if(data.status === "success"){
        status.innerHTML = "✅ Verification Successful!";
    } else {
        status.innerHTML = "❌ " + data.reason;
    }
})
.catch(() => {
    document.getElementById("status").innerHTML = "❌ Verification Failed";
});
