let devices = {}

export default function handler(req, res){

const uid = req.query.uid
const fp = req.query.fp

if(!uid || !fp){
res.json({status:"error"})
return
}

for(let user in devices){

if(devices[user] === fp && user !== uid){

devices[uid] = "blocked"
res.json({status:"blocked"})
return

}

}

devices[uid] = fp

res.json({status:"verified"})

}
