const status = document.getElementById("status")

// ✅ GET TELEGRAM USER
function getUserId() {
    try {
        if (window.Telegram && Telegram.WebApp) {
            return Telegram.WebApp.initDataUnsafe.user.id
        }
    } catch {}
    return null
}

// 🔥 FINGERPRINT
function getFingerprint() {
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")
    ctx.fillText("fingerprint", 10, 10)

    return navigator.userAgent +
           screen.width +
           screen.height +
           canvas.toDataURL()
}

// 🚀 VERIFY
async function verify() {

    let user_id = getUserId()

    if (!user_id) {
        status.innerHTML = "❌ Open inside Telegram"
        return
    }

    let fingerprint = getFingerprint()

    try {
        let res = await fetch("https://web-production-155.up.railway.app/verify", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: user_id,
                fingerprint: fingerprint
            })
        })

        let data = await res.json()

        if (data.status === "success") {
            status.innerHTML = "✅ Verification Successful"
        } else {
            status.innerHTML = "❌ Verification Failed"
        }

    } catch {
        status.innerHTML = "❌ Server Error"
    }
}

verify()
