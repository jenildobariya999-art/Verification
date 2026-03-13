let verified = {}

export default function handler(req, res) {

 const uid = req.query.uid
 const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
 const agent = req.headers['user-agent']

 const device = ip + "_" + agent

 if(!uid){
  res.status(400).send("UID missing")
  return
 }

 for (let u in verified){
  if(verified[u] === device && u !== uid){
   verified[uid] = "blocked"
   res.json({status:"blocked"})
   return
  }
 }

 verified[uid] = device

 res.json({status:"ok"})
}
