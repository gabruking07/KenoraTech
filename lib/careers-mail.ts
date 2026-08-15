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
<<<<<<< HEAD

export async function sendDemoApprovalEmail({ to, name, projectTitle, accessUrl, durationLabel }: { to: string; name?: string; projectTitle: string; accessUrl: string; durationLabel: string }) {
  const mailer = transport();
  const from = process.env.MAIL_FROM;
  if (!mailer || !from) return false;
  const greeting = name ? `Hi ${name},` : "Hello,";
  await mailer.sendMail({ from, to, subject: `Your demo access for ${projectTitle}`, text: `${greeting}\n\nYour demo access has been approved. Use this private link to open ${projectTitle}:\n${accessUrl}\n\nYour access is available for ${durationLabel} after you first open the demo. Please do not share this link.\n\nKenoraTech` });
  return true;
}
=======
>>>>>>> 9942a407379644f05b0b211c7550e4b05ba5d461
