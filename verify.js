let bar=document.getElementById("bar")
let percent=0

let interval=setInterval(()=>{

percent+=5
bar.style.width=percent+"%"

if(percent>=100){

clearInterval(interval)
verify()

}

},150)

function fingerprint(){

return navigator.userAgent +
screen.width +
screen.height +
navigator.language +
navigator.platform

}

function verify(){

let params=new URLSearchParams(window.location.search)
let uid=params.get("uid")

fetch("http://127.0.0.1:8000/verify",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
uid:uid,
fingerprint:fingerprint()
})

})

.then(r=>r.json())
.then(data=>{

if(data.status=="success"){

document.body.innerHTML=`
<h2>Verification Successful</h2>
<a href="https://t.me/Testing0011_ibot">
<button>Back to Bot</button>
</a>
`

}else{

document.body.innerHTML=`
<h2>Verification Failed</h2>
<a href="https://t.me/Testing0011_ibot">
<button>Back to Bot</button>
</a>
`

}

})

}
