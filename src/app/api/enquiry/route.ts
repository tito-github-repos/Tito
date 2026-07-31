import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendContactAcknowledgement,
  sendAdminNotification,
} from "@/lib/email";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, mobile, note } = body;

    // Validate required fields
    if (!name || !email || !mobile || !note) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // Save enquiry
    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name,
        email,
        mobile,
        note,
      },
    });

    // Send emails (Don't fail API if email sending fails)
    try {
      await Promise.all([
        sendContactAcknowledgement({
           name: enquiry.name,
           email: enquiry.email,


        }),

        sendAdminNotification({
          name: enquiry.name,
          email: enquiry.email,
          mobile: enquiry.mobile,
          note: enquiry.note,
        }),
      ]);
    } catch (emailError) {
      console.error("Email Sending Error:", JSON.stringify(emailError, null, 2));
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
        data: enquiry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}