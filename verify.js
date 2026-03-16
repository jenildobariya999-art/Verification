function canvasFingerprint(){
 let canvas=document.createElement("canvas")
 let ctx=canvas.getContext("2d")
 ctx.font="14px Arial"
 ctx.fillText("verify",2,2)
 return canvas.toDataURL()
}

function verify(){

 let params=new URLSearchParams(window.location.search)

 let uid=params.get("uid")

 let fingerprint=
 navigator.userAgent+
 screen.width+
 screen.height+
 navigator.language+
 canvasFingerprint()

 fetch("http://YOUR_SERVER_IP:8000/api_verify",{

 method:"POST",

 headers:{
 "Content-Type":"application/json"
 },

 body:JSON.stringify({
 uid:uid,
 fingerprint:fingerprint
 })

 })
 .then(r=>r.text())
 .then(data=>{
 document.body.innerHTML=data
 })

}
