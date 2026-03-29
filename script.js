const status = document.getElementById("status")

// ✅ TELEGRAM USER ID
function getUserId() {
    if (window.Telegram && Telegram.WebApp) {
        return Telegram.WebApp.initDataUnsafe.user.id
    }
    return null
}

// 🔥 ADVANCED FINGERPRINT
function getFingerprint() {
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")
    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillText("device-fingerprint", 2, 2)

    let canvasData = canvas.toDataURL()

    return navigator.userAgent + screen.width + screen.height + canvasData
}

async function verify() {
    try {
        let user_id = getUserId()

        if (!user_id) {
            status.innerHTML = "❌ Open inside Telegram"
            return
        }

        let fingerprint = getFingerprint()

        let res = await fetch("https://web-production-155.up.railway.app/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id,
                fingerprint
            })
        })

        let data = await res.json()

        if (data.status === "success") {
            status.innerHTML = "✅ Verification Successful"
        } else {
            status.innerHTML = "❌ Verification Failed"
        }

    } catch {
        status.innerHTML = "❌ Verification Failed"
    }
}

verify()
