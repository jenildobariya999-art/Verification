let bar=document.getElementById("bar")

let percent=0

let interval=setInterval(()=>{

percent+=5

bar.style.width=percent+"%"

if(percent>=100){

clearInterval(interval)

verify()

}

},200)

function fingerprint(){

return navigator.userAgent+
screen.width+
screen.height+
navigator.language

}

function verify(){

let params=new URLSearchParams(window.location.search)

let uid=params.get("uid")

fetch("http://YOUR_SERVER_IP:8000/api_verify",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

uid:uid,

fingerprint:fingerprint()

})

})

.then(r=>r.text())
.then(data=>{

document.getElementById("status").innerHTML=data

})

}
