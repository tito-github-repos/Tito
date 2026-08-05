import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendContactAcknowledgement,
  sendAdminNotification,
} from "@/lib/email";

/** Verifies the Turnstile token with Cloudflare's siteverify endpoint. */
async function verifyTurnstile(token: string, ip: string | null) {
  const formData = new URLSearchParams();
  formData.append("secret", process.env.TURNSTILE_SECRET_KEY!);
  formData.append("response", token);
  if (ip) formData.append("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();
  return data.success === true;
}

/** Minimal HTML escape — enough to stop stored XSS from free-text input. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, note, honeypot, turnstileToken } = body;

    // 1. Honeypot check — real users never fill this field.
    //    Respond with a fake success so bots don't learn to skip it.
    if (honeypot) {
      return NextResponse.json(
        {
          success: true,
          message: "Your enquiry has been submitted successfully.",
        },
        { status: 200 },
      );
    }

    // 2. Required fields
    if (!name || !email || !mobile || !note) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 },
      );
    }

    // 3. Turnstile verification (never trust the client on this)
    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification token missing.",
        },
        { status: 400 },
      );
    }

    const ip = req.headers.get("x-forwarded-for");
    const isHuman = await verifyTurnstile(turnstileToken, ip);

    if (!isHuman) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification failed. Please try again.",
        },
        { status: 403 },
      );
    }

    // 4. Sanitize input before persisting.
    //    name/email/mobile are already format-restricted by the frontend
    //    Yup schema (letters only, valid email shape, 10 digits), so a trim
    //    (+ lowercase for email) is sufficient here. `note` is free text, so
    //    it gets HTML-escaped too, in case it's ever rendered as HTML later
    //    (admin dashboard, email template, etc).
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMobile = mobile.trim();
    const sanitizedNote = escapeHtml(note.trim());

    // Save enquiry
    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        mobile: sanitizedMobile,
        note: sanitizedNote,
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
      console.error(
        "Email Sending Error:",
        JSON.stringify(emailError, null, 2),
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
        data: enquiry,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Enquiry API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}