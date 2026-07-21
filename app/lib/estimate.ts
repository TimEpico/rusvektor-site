export const servicesByDirection = {
  build: ["Асфальтирование", "Бетонные работы", "Укладка плитки", "Кровля"],
  fire: ["Пожарная сигнализация", "Система пожаротушения", "Дымоудаление"],
} as const;

export type Direction = keyof typeof servicesByDirection;

export function calculateEstimate(direction: Direction, service: string, area: number, detail: number) {
  const rate = direction === "fire" ? 1_850 : service === "Бетонные работы" ? 6_400 : 2_900;
  return Math.round(area * rate * (1 + Math.max(detail - 5, 0) / 100));
}
