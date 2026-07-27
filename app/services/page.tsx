import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Услуги — РУСВЕКТОР",
  description: "Строительные, инженерные и противопожарные работы РУСВЕКТОР.",
};

const groups = [
  {
    title: "Строительные работы",
    items: ["Асфальтирование", "Бетонные работы", "Укладка плитки", "Кровельные работы", "Монтаж окон", "Благоустройство", "Общестроительные работы"],
  },
  {
    title: "Проектирование и пожарная документация",
    items: ["Генеральное проектирование", "Работы, связанные с гостайной", "Разработка СТУ", "Расчёт пожарных рисков", "Разработка МОПБ", "Разработка планов эвакуации", "Обучение пожарно-техническому минимуму"],
  },
  {
    title: "Проектирование и монтаж инженерных систем",
    items: ["АПС", "СОУЭ", "АУПТ", "Водяное пожаротушение", "Порошковое пожаротушение", "Газовое пожаротушение", "Пенное пожаротушение", "Внутренний противопожарный водопровод", "Вентиляция и дымоудаление", "Видеонаблюдение", "СКУД", "Электроснабжение", "Сети связи"],
  },
  {
    title: "Обслуживание и испытания",
    items: ["Техническое обслуживание пожарных систем", "Испытание пожарных лестниц и ограждений кровли", "Испытание пожарных кранов", "Испытание огнезащиты деревянных и металлических поверхностей", "Техническое обслуживание и перезарядка огнетушителей"],
  },
];

export default function ServicesPage() {
  return <main className="inner-page">
    <header className="header shell"><Link className="brand" href="/"><span className="brand-mark">RV</span><span>РУСВЕКТОР<small>строительство · безопасность</small></span></Link><nav aria-label="Основная навигация"><Link href="/services">Услуги</Link><Link href="/licenses">Лицензии</Link><Link href="/#projects">Объекты</Link><Link href="/#contacts">Контакты</Link></nav><a className="phone" href="tel:+74951339013">+7 (495) 133-90-13</a></header>
    <section className="inner-hero shell"><p>УСЛУГИ</p><h1>Работы для строительства, инженерии и <em>пожарной безопасности</em></h1><span>Выберите направление — подготовим состав работ и предварительный расчёт.</span></section>
    <section className="service-directory shell">
      {groups.map((group, index) => <article className="service-group" key={group.title}><b>0{index + 1}</b><h2>{group.title}</h2><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul><Link className="text-link" href="/#calculator">Рассчитать задачу <span>→</span></Link></article>)}
    </section>
    <section className="contacts"><div className="shell contact-grid"><div><p className="eyebrow">Начнём с задачи</p><h2>Нужен расчёт или консультация?</h2><p>Фиксированных цен на официальном сайте нет: состав работ и смету формируем после изучения объекта.</p></div><div className="contact-links"><a href="tel:+74951339013">+7 (495) 133-90-13</a><a href="mailto:info@rusvektor.ru">info@rusvektor.ru</a><span>125367, Москва, Полесский проезд, д. 16, стр. 1, подъезд 2, этаж 2, офис 229<br />м. Щукинская</span></div></div></section>
  </main>;
}
