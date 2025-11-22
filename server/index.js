import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve built frontend (if present)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = join(__dirname, "..", "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Basic health
app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body || {};

  // basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_RECEIVER,
    subject: `New contact message from ${name}`,
    text: `${message}\n\nFrom: ${name} <${email}>`,
    html: `<p>${message}</p><hr/><p>From: ${name} &lt;${email}&gt;</p>`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ ok: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

// For SPA client-side routing, serve index.html for unmatched GET routes
app.get("/*", (req, res) => {
  if (fs.existsSync(distPath)) {
    return res.sendFile(join(distPath, "index.html"));
  }
  return res.status(404).send("Not found");
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Email server listening on http://localhost:${PORT}`);
});
