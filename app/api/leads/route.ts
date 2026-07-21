import { calculateEstimate, servicesByDirection, type Direction } from "@/app/lib/estimate";
import { saveLead } from "@/db/leads";

const text = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const direction = body.direction === "fire" ? "fire" : body.direction === "build" ? "build" : null;
    const service = text(body.service, 100);
    const area = Number(body.area);
    const detail = Number(body.detail);
    const name = text(body.name, 100);
    const phone = text(body.phone, 30);
    const email = text(body.email, 254);
    const message = text(body.message, 2000);

    if (body.website || !direction || !(servicesByDirection[direction] as readonly string[]).includes(service)) {
      return Response.json({ error: "Некорректные параметры услуги" }, { status: 400 });
    }
    if (!Number.isFinite(area) || area < 1 || area > 1_000_000 || !Number.isFinite(detail) || detail < 1 || detail > 1_000) {
      return Response.json({ error: "Проверьте площадь и параметры объекта" }, { status: 400 });
    }
    if (name.length < 2 || phone.replace(/\D/g, "").length < 7 || (email && !/^\S+@\S+\.\S+$/.test(email))) {
      return Response.json({ error: "Укажите имя, телефон и корректную почту" }, { status: 400 });
    }

    const estimate = calculateEstimate(direction as Direction, service, area, detail);
    await saveLead({ direction, service, area, detail, estimate, name, phone, email: email || undefined, message: message || undefined });
    return Response.json({ ok: true, estimate }, { status: 201 });
  } catch (error) {
    console.error("Lead submission failed", error);
    return Response.json({ error: "Не удалось отправить заявку. Позвоните нам по телефону." }, { status: 500 });
  }
}
