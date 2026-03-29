const status = document.getElementById("status")

function getUserId() {
    return new URLSearchParams(window.location.search).get("id")
}

// 🔥 REAL FINGERPRINT
async function getFingerprint() {
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")

    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillText("GH_VERIFICATION", 2, 2)

    let canvasData = canvas.toDataURL()

    let gl = document.createElement("canvas").getContext("webgl")
    let debugInfo = gl.getExtension("WEBGL_debug_renderer_info")

    let renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    let vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)

    return canvasData + renderer + vendor + navigator.userAgent
}

// 🌐 GET IP
async function getIP() {
    let res = await fetch("https://api.ipify.org?format=json")
    let data = await res.json()
    return data.ip
}

// 🔥 VPN CHECK
async function checkVPN(ip) {
    try {
        let res = await fetch(`https://ipapi.co/${ip}/json/`)
        let data = await res.json()

        if (data.security && data.security.vpn) {
            return true
        }
        return false
    } catch {
        return false
    }
}

// 🚀 VERIFY FUNCTION
async function verify() {
    try {
        let user_id = getUserId()
        let fingerprint = await getFingerprint()
        let ip = await getIP()
        let vpn = await checkVPN(ip)

        if (vpn) {
            status.innerHTML = "❌ VPN Detected"
            return
        }

        let res = await fetch("https://YOUR_RAILWAY_URL/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id,
                fingerprint,
                ip
            })
        })

        let data = await res.json()

        if (data.status === "success") {
            status.innerHTML = "✅ Verification Successful"
        } else {
            status.innerHTML = "❌ Verification Failed"
        }

    } catch (e) {
        status.innerHTML = "❌ Verification Failed"
    }
}

verify()
