let bar = document.getElementById("bar")
let percent = 0

let interval = setInterval(()=>{

percent += 4
bar.style.width = percent + "%"

if(percent >= 100){
clearInterval(interval)
verify()
}

},120)

function getFingerprint(){

let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")

ctx.textBaseline = "top"
ctx.font = "14px Arial"
ctx.fillText("device-check", 2, 2)

let canvasFingerprint = canvas.toDataURL()

return navigator.userAgent +
navigator.language +
navigator.platform +
screen.width +
screen.height +
screen.colorDepth +
canvasFingerprint

}

function detectEmulator(){

let ua = navigator.userAgent.toLowerCase()

if(
ua.includes("android sdk") ||
ua.includes("emulator") ||
ua.includes("genymotion")
){
return true
}

return false

}

function verify(){

let params = new URLSearchParams(window.location.search)
let uid = params.get("uid")

if(detectEmulator()){

document.body.innerHTML = `
<h2>Verification Failed</h2>
<p>Emulator detected</p>
<a href="https://t.me/Testing0011_ibot">
<button>Back to Bot</button>
</a>
`

return

}

fetch("http://192.0.0.2:8000/verify",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
uid:uid,
fingerprint:getFingerprint()
})

})

.then(res=>res.json())
.then(data=>{

if(data.status=="success"){

document.body.innerHTML = `
<h2>Verification Successful</h2>
<p>Your device verified successfully</p>
<a href="https://t.me/Testing0011_ibot">
<button>Back to Bot</button>
</a>
`

}else{

document.body.innerHTML = `
<h2>Verification Failed</h2>
<p>Duplicate device detected</p>
<a href="https://t.me/Testing0011_ibot">
<button>Back to Bot</button>
</a>
`

}

})

}
