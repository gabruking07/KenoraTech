import nodemailer from "nodemailer";
import type { Application } from "@/lib/applications";

function transport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
}

export async function sendApplicationEmails(application: Application) {
  const mailer = transport();
  const from = process.env.MAIL_FROM;
  if (!mailer || !from) return false;
  await mailer.sendMail({ from, to: application.email, subject: `Application received — ${application.jobTitle}`, text: `Hi ${application.fullName},\n\nThank you for applying for ${application.jobTitle} at KenoraTech. Our team will review your application and contact you if there is a match.\n\nKenoraTech` });
  if (process.env.CAREERS_ADMIN_EMAIL) await mailer.sendMail({ from, to: process.env.CAREERS_ADMIN_EMAIL, subject: `New application — ${application.jobTitle}`, text: `${application.fullName} (${application.email}) applied for ${application.jobTitle}.\n\nReview it in the Careers admin panel.` });
  return true;
}

export async function sendMaintenanceSubscriptionEmail(email: string) {
  const mailer = transport();
  const from = process.env.MAIL_FROM;
  if (!mailer || !from) return false;
  await mailer.sendMail({ from, to: email, subject: "You're on the KenoraTech maintenance update list", text: "Thanks for subscribing. We'll email you when KenoraTech is back online." });
  return true;
}
