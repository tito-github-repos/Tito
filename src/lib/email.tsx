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
  const response = await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: data.email,
    subject: "We've Received Your Enquiry",
    react: <ContactAcknowledgement {...data} />,
  });

  console.log("Customer Email:", response);
}

// Send notification email to the admin
export async function sendAdminNotification(
  data: AdminNotificationData
) {
  const response = await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: "New Contact Enquiry",
    react: <AdminNotification {...data} />,
  });

  console.log("Admin Email:", response);
}