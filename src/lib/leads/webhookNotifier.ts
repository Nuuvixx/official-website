import { CommercialInquiryRecord } from "./types";
import { signWebhookPayload } from "./security";

export interface WebhookResult {
  delivered: boolean;
  attempts: number;
  statusCode?: number;
  error?: string;
}

function formatPayload(webhookUrl: string, record: CommercialInquiryRecord): { body: string; headers: Record<string, string> } {
  const isDiscord = webhookUrl.includes("discord.com/api/webhooks/");
  const isSlack = webhookUrl.includes("hooks.slack.com/");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "Nuuvixx-Lead-Notifier/2.0",
  };

  if (isDiscord) {
    const discordPayload = {
      username: "Nuuvixx Commercial Desk",
      embeds: [
        {
          title: `New Commercial Brief: ${record.service}`,
          color: record.service === "nuuvixx-secure" ? 0xe5252a : 0xccff00,
          fields: [
            { name: "Client", value: `${record.name} (${record.companyOrWebsite})`, inline: true },
            { name: "Email", value: record.email, inline: true },
            { name: "Budget", value: record.budget, inline: true },
            { name: "Timeline", value: record.timeline, inline: true },
            { name: "Ref ID", value: `\`${record.inquiryRef}\``, inline: true },
            { name: "Source", value: record.sourceContext, inline: true },
            { name: "Scope Summary", value: record.problem.slice(0, 350) + (record.problem.length > 350 ? "..." : "") },
          ],
          footer: { text: "Nuuvixx Studio Commercial Ingestion" },
          timestamp: record.createdAt,
        },
      ],
    };
    return { body: JSON.stringify(discordPayload), headers };
  }

  if (isSlack) {
    const slackPayload = {
      text: `🚨 New Nuuvixx Commercial Brief: ${record.service} from ${record.name} (${record.companyOrWebsite})`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `🚨 New Commercial Brief: ${record.service}`,
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Client:*\n${record.name}` },
            { type: "mrkdwn", text: `*Company:*\n${record.companyOrWebsite}` },
            { type: "mrkdwn", text: `*Email:*\n${record.email}` },
            { type: "mrkdwn", text: `*Budget:*\n${record.budget}` },
            { type: "mrkdwn", text: `*Ref ID:*\n\`${record.inquiryRef}\`` },
            { type: "mrkdwn", text: `*Timeline:*\n${record.timeline}` },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Scope Description:*\n>${record.problem.slice(0, 400)}`,
          },
        },
      ],
    };
    return { body: JSON.stringify(slackPayload), headers };
  }

  // Generic Webhook Payload
  const genericPayload = {
    event: "lead.created",
    timestamp: record.createdAt,
    inquiryRef: record.inquiryRef,
    id: record.id,
    service: record.service,
    name: record.name,
    email: record.email,
    companyOrWebsite: record.companyOrWebsite,
    client: {
      name: record.name,
      email: record.email,
      companyOrWebsite: record.companyOrWebsite,
    },
    scope: {
      problem: record.problem,
      budget: record.budget,
      timeline: record.timeline,
      sourceContext: record.sourceContext,
    },
  };
  return { body: JSON.stringify(genericPayload), headers };
}

/**
 * Dispatches an asynchronous notification to configured webhook.
 * - Enforces a 4,000ms timeout.
 * - Implements 1 automatic retry on transient failures.
 * - Logs without leaking sensitive customer PII.
 * - Never throws; failures do not disrupt stored leads.
 */
export async function dispatchLeadNotification(
  record: CommercialInquiryRecord
): Promise<WebhookResult> {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    return { delivered: false, attempts: 0 };
  }

  const { body, headers } = formatPayload(webhookUrl, record);

  const secret = process.env.LEADS_WEBHOOK_SECRET;
  if (secret) {
    headers["X-Nuuvixx-Signature-256"] = signWebhookPayload(body, secret);
    headers["X-Nuuvixx-Timestamp"] = String(Date.now());
  }

  let attempts = 0;
  const maxAttempts = 2; // 1 initial + 1 retry

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return { delivered: true, attempts, statusCode: response.status };
      }

      // Non-2xx response: only retry on 5xx server errors
      if (response.status < 500) {
        console.warn(`[Webhook Notification] Remote rejected with status ${response.status} (no retry). Ref: ${record.inquiryRef}`);
        return { delivered: false, attempts, statusCode: response.status };
      }
    } catch (err: unknown) {
      console.warn(`[Webhook Notification] Attempt ${attempts} error for ref ${record.inquiryRef}:`, (err as Error).message);
    }

    if (attempts < maxAttempts) {
      // Short backoff before retry (1000ms)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.error(`[Webhook Notification] All ${maxAttempts} notification attempts failed for ref ${record.inquiryRef}. Lead is preserved.`);
  return { delivered: false, attempts };
}
