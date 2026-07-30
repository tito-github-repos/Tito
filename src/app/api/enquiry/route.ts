import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import adminNotification from "@/templates/adminNotification";
import contactAcknowledgement from "@/templates/contactAcknowledgement";


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
        contactAcknowledgement({
          name: enquiry.name,

        }),

        adminNotification({
          name: enquiry.name,
          email: enquiry.email,
          mobile: enquiry.mobile,
          note: enquiry.note,
        }),
      ]);
    } catch (emailError) {
      console.error("Email Sending Error:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
        data: enquiry,
      },
      { status: 201 }
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