# Mohave Integrity voice agent setup

The website includes a secure inbound-call webhook at:

`https://YOUR-DOMAIN/api/openai/realtime-call`

## 1. Configure OpenAI

1. Create or select an OpenAI API project and create an API key.
2. In the project's **Webhooks** settings, create an endpoint using the URL above.
3. Subscribe it to `realtime.call.incoming` and copy the webhook signing secret.
4. Add `OPENAI_API_KEY` and `OPENAI_WEBHOOK_SECRET` to the Netlify project's environment variables.

## 2. Configure the phone number

1. Purchase or use a phone number with a SIP trunking provider such as Twilio.
2. Create an inbound SIP trunk for that number.
3. Route the trunk to `sip:YOUR_OPENAI_PROJECT_ID@sip.api.openai.com;transport=tls`.
4. Add `NEXT_PUBLIC_PHONE_NUMBER` in Netlify using the formatted number visitors should see.

## 3. Deploy and test

Redeploy after adding the environment variables. Call the number and confirm that Sage identifies itself as an AI receptionist, answers general service questions, and gives the emergency and fair-housing-safe responses described in the route's instructions.

This first version answers calls and handles FAQs. It intentionally does not persist caller notes, create maintenance requests, take payments, or promise that a message was delivered.
