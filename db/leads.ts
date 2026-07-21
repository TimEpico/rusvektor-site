import { env } from "cloudflare:workers";

export interface NewLead {
  direction: string;
  service: string;
  area: number;
  detail: number;
  estimate: number;
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

export async function saveLead(lead: NewLead) {
  if (!env.DB) throw new Error("D1 binding `DB` is unavailable");

  return env.DB.prepare(`
    INSERT INTO leads (direction, service, area, detail, estimate, name, phone, email, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    lead.direction,
    lead.service,
    lead.area,
    lead.detail,
    lead.estimate,
    lead.name,
    lead.phone,
    lead.email ?? null,
    lead.message ?? null,
  ).run();
}
