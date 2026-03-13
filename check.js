let devices = {}

export default function handler(req,res){

const uid = req.query.uid

if(devices[uid] === "blocked"){

res.json({status:"blocked"})
return

}

if(devices[uid]){

res.json({status:"verified"})

}
else{

res.json({status:"not_verified"})

}

}
