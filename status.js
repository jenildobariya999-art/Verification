let verified = {}

export default function handler(req,res){

 const uid = req.query.uid

 if(verified[uid] === "blocked"){
  res.json({status:"blocked"})
  return
 }

 if(verified[uid]){
  res.json({status:"verified"})
 }
 else{
  res.json({status:"not_verified"})
 }

}
