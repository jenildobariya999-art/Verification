const status = document.getElementById("status")

function getUserId() {
    return new URLSearchParams(window.location.search).get("id")
}

// 🔥 SIMPLE BUT STABLE FINGERPRINT
function getFingerprint() {
    return navigator.userAgent + screen.width + screen.height
}

// 🌐 IP
async function getIP() {
    let res = await fetch("https://api.ipify.org?format=json")
    let data = await res.json()
    return data.ip
}

async function verify() {
    try {
        let user_id = getUserId()
        if (!user_id) {
            status.innerHTML = "❌ Invalid Access"
            return
        }

        let fingerprint = getFingerprint()
        let ip = await getIP()

        let res = await fetch("https://web-production-155.up.railway.app/verify", {
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
