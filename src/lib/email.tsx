import StudentConfirmation from "@/templates/contactAcknowledgement";
import { resend } from "./resend";
import AdminNotification from "@/templates/adminNotification";



interface StudentConfirmationData {
  name: string;
  email: string;
  course: string;
  workshopDate: string;
}

interface AdminNotificationData {
  name: string;
  email: string;
  phone: string;
  course: string;
  workshopDate: string;
  message?: string;
}

export async function sendStudentConfirmation(
  data: StudentConfirmationData
) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: data.email,
    subject: "Workshop Registration Confirmation",
    react: <StudentConfirmation {...data} />,
  });
}

export async function sendAdminNotification(
  data: AdminNotificationData
) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: "New Workshop Registration",
    react: <AdminNotification {...data} />,
  });
}