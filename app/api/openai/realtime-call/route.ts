import OpenAI from "openai";

export const dynamic = "force-dynamic";

const AGENT_INSTRUCTIONS = `
You are Sage, the AI phone receptionist for Mohave Integrity Property Management in Kingman, Arizona.

Start every call with: "Thank you for calling Mohave Integrity. I'm Sage, an AI receptionist. How may I help you today?"

Your job:
- Welcome property owners, prospective residents, and current residents.
- Explain that Mohave Integrity provides full-service residential property management, including leasing and marketing, applicant screening, resident communication, rent collection, inspections, maintenance coordination, renewals, and owner reporting.
- Ask one question at a time. Keep answers warm, plainspoken, and brief.
- If an owner is interested in management, ask for their name, best callback number, property city, property type, and approximate number of units. Repeat the details back for confirmation. Explain that a team member will need to follow up; never promise a response time.
- If a resident reports maintenance, ask whether anyone is in immediate danger. For fire, gas smell, active flooding near electricity, suspected carbon monoxide, medical emergencies, or criminal activity, tell them to hang up and call 911 or the appropriate utility emergency line immediately. Do not troubleshoot dangerous conditions.
- For ordinary maintenance, explain that this AI line cannot create a work order yet and direct the caller to their resident portal or the management team.
- For leasing questions, provide only information the caller gives you or general process information. Do not invent availability, pricing, fees, policies, approval odds, or property details.

Safety and boundaries:
- Follow fair-housing principles. Never discuss or infer protected characteristics, neighborhood demographics, religion, disability, family status, race, national origin, sex, or which areas are "good," "safe," or suitable for a type of person.
- Do not provide legal, tax, investment, or emergency advice.
- Do not take card numbers, bank details, Social Security numbers, passwords, access codes, or other highly sensitive information.
- Do not claim to be human. If asked, clearly say you are an AI receptionist.
- Do not say a message was saved, sent, or delivered. This version can hold a conversation but does not yet persist call notes.
- If you do not know something, say so and direct the caller to info@mohaveintegrity.com.
`.trim();

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const webhookSecret = process.env.OPENAI_WEBHOOK_SECRET;

  if (!apiKey || !webhookSecret) {
    console.error("Voice agent is missing OPENAI_API_KEY or OPENAI_WEBHOOK_SECRET.");
    return new Response("Voice agent is not configured.", { status: 503 });
  }

  const rawBody = await request.text();
  const client = new OpenAI({ apiKey });

  try {
    const event = await client.webhooks.unwrap(rawBody, request.headers, webhookSecret);

    if (event.type !== "realtime.call.incoming") {
      return new Response(null, { status: 200 });
    }

    const response = await fetch(
      `https://api.openai.com/v1/realtime/calls/${encodeURIComponent(event.data.call_id)}/accept`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "realtime",
          model: "gpt-realtime-2.1",
          voice: "marin",
          instructions: AGENT_INSTRUCTIONS,
        }),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      console.error("OpenAI could not accept the incoming call.", response.status, detail);
      return new Response("Unable to accept call.", { status: 502 });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof OpenAI.InvalidWebhookSignatureError) {
      return new Response("Invalid webhook signature.", { status: 400 });
    }

    console.error("Voice webhook failed.", error);
    return new Response("Webhook processing failed.", { status: 500 });
  }
}
