import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { calculateEstimate, servicesByDirection } from "../app/lib/estimate.ts";

const root = new URL("../", import.meta.url);

test("keeps the complete Русвектор landing page and contact flow", async () => {
  const [page, layout, css, services, licenses] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("app/services/page.tsx", root), "utf8"),
    readFile(new URL("app/licenses/page.tsx", root), "utf8"),
  ]);

  assert.match(layout, /РУСВЕКТОР — строительство и пожарная безопасность/);
  assert.match(page, /Строим объекты\. Защищаем людей\./);
  assert.match(page, /Конфигуратор/);
  assert.match(page, /Леруа Мерлен Ижевск/);
  assert.match(page, /Фабрика-кухня X5 Retail Group/);
  assert.match(page, /fetch\("\/api\/leads"/);
  assert.match(css, /hero-construction-fire\.png/);
  assert.match(services, /Расчёт пожарных рисков/);
  assert.match(services, /Техническое обслуживание и перезарядка огнетушителей/);
  assert.match(licenses, /Лицензия МЧС/);
  assert.match(licenses, /sro-design\.png/);
  assert.doesNotMatch(page, /Your site is taking shape|Building your site/);
});

test("calculates construction and fire estimates from trusted rates", () => {
  assert.deepEqual(servicesByDirection.build, [
    "Асфальтирование",
    "Бетонные работы",
    "Укладка плитки",
    "Кровля",
  ]);
  assert.equal(calculateEstimate("build", "Асфальтирование", 100, 5), 290000);
  assert.equal(calculateEstimate("build", "Бетонные работы", 100, 10), 672000);
  assert.equal(calculateEstimate("fire", "Пожарная сигнализация", 100, 5), 185000);
});

test("validates leads server-side and persists only recalculated estimates", async () => {
  const [route, repository, migration, hosting] = await Promise.all([
    readFile(new URL("app/api/leads/route.ts", root), "utf8"),
    readFile(new URL("db/leads.ts", root), "utf8"),
    readFile(new URL("drizzle/0000_dashing_donald_blake.sql", root), "utf8"),
    readFile(new URL(".openai/hosting.json", root), "utf8"),
  ]);

  assert.match(route, /calculateEstimate\(direction as Direction, service, area, detail\)/);
  assert.match(route, /body\.website/);
  assert.match(route, /phone\.replace\(\/\\D\/g/);
  assert.match(repository, /INSERT INTO leads/);
  assert.match(migration, /CREATE TABLE `leads`/);
  assert.equal(JSON.parse(hosting).d1, "DB");
});
