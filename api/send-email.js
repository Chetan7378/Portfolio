import sgMail from "@sendgrid/mail";

// Initialize SendGrid with API key from environment
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error("SENDGRID_API_KEY not set");
    return res.status(500).json({ error: "Email provider not configured" });
  }

  const msg = {
    to: process.env.CONTACT_RECEIVER,
    from: process.env.SENDGRID_FROM || process.env.CONTACT_RECEIVER,
    subject: `New contact from ${name}`,
    text: `${message}\n\nFrom: ${name} <${email}>`,
    html: `<p>${message}</p><hr/><p>From: ${name} &lt;${email}&gt;</p>`,
    replyTo: email,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("SendGrid send error:", err?.response?.body || err);
    const details = err?.response?.body?.errors || err.message || "Send failed";
    return res.status(500).json({ error: details });
  }
}
