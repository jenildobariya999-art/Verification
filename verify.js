import crypto from "crypto";

// Store device hashes in memory (resets on cold start)
let usedDevices = {};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { user_id, device } = req.body;

  if (!user_id || !device)
    return res.status(400).json({ status: "fail", message: "Missing user or device" });

  // Hash device info
  const deviceHash = crypto.createHash("sha256").update(JSON.stringify(device)).digest("hex");

  if (usedDevices[deviceHash]) {
    return res.json({ status: "fail", message: "Device already used" });
  }

  // First-time verification
  usedDevices[deviceHash] = user_id;

  return res.json({ status: "success", message: "Device verified" });
}
