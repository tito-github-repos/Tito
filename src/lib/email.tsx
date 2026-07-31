import ContactAcknowledgement from "@/templates/contactAcknowledgement";
import AdminNotification from "@/templates/adminNotification";
import { resend } from "./resend";

interface ContactAcknowledgementData {
  name: string;
  email: string;
}

interface AdminNotificationData {
  name: string;
  email: string;
  mobile: string;
  note: string;
}

// Send acknowledgement email to the customer
export async function sendContactAcknowledgement(
  data: ContactAcknowledgementData
) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: data.email,
    subject: "We've Received Your Enquiry",
    react: <ContactAcknowledgement {...data} />,
  });
}

// Send notification email to the admin
export async function sendAdminNotification(
  data: AdminNotificationData
) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: "New Contact Enquiry",
    react: <AdminNotification {...data} />,
  });
}