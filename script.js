const status = document.getElementById("status")

function getFingerprint() {
    return navigator.userAgent + screen.width + screen.height
}

function getIP() {
    return fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => data.ip)
}

async function verify() {
    try {
        let fp = getFingerprint()
        let ip = await getIP()

        let stored = localStorage.getItem("verified_device")

        let current = fp + "_" + ip

        if (!stored) {
            localStorage.setItem("verified_device", current)
            status.innerHTML = "✅ Verification Successful"
        } else {
            if (stored === current) {
                status.innerHTML = "✅ Already Verified"
            } else {
                status.innerHTML = "❌ Verification Failed"
            }
        }

    } catch (e) {
        status.innerHTML = "❌ Verification Failed"
    }
}

verify()
