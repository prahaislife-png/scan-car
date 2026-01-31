import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ error: "Missing data" });
  }

  const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
  );

  try {
    await client.messages.create({
      from: process.env.TWILIO_PHONE,
      to: phone,
      body: message,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
