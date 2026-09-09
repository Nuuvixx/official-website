import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honey } = body;

    // Honeypot check - if filled, silently succeed without sending
    if (honey) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const referer = request.headers.get("referer") || "http://localhost:3000/contact";
    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Forward to FormSubmit.co using secure token to keep email address private
    const response = await fetch("https://formsubmit.co/ajax/a3c37453dab00c97742f6c64dbfdce28", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: referer,
        Origin: origin,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `New Contact Submission from ${name} - Nuuvixx`,
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to deliver message via mail service." },
        { status: response.status || 500 }
      );
    }

    if (data.success === "false" || data.success === false) {
      if (data.message && data.message.toLowerCase().includes("activation")) {
        return NextResponse.json({
          success: true,
          needsActivation: true,
          message: data.message,
        });
      }
      return NextResponse.json(
        { error: data.message || "Failed to send message via mail service." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again or email nuuvixx@gmail.com directly." },
      { status: 500 }
    );
  }
}
