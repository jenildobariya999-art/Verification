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

function verify(){

let params=new URLSearchParams(window.location.search)
let uid=params.get("uid")

fetch("http://YOUR_SERVER_IP:8000/api_verify",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
uid:uid
})

})
.then(r=>r.text())
.then(result=>{

if(result=="success"){

document.body.innerHTML=`
<h2>Verification Successful</h2>
<a href="https://t.me/YOUR_BOT_USERNAME">
<button>Back To Bot</button>
</a>
`

}else{

document.body.innerHTML=`
<h2>Verification Failed</h2>
<a href="https://t.me/YOUR_BOT_USERNAME">
<button>Back To Bot</button>
</a>
`

}

})

}
