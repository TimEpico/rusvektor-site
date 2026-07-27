import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Лицензии — РУСВЕКТОР",
  description: "Лицензии, сертификаты и выписки РУСВЕКТОР.",
};

const licenses = [
  ["mchs.jpg", "Лицензия МЧС", "№ 8-Б.0356 от 02.12.2013"],
  ["iso-9001.jpg", "Сертификат ISO 9001", "ISO 9001-2015 от 10.06.2019"],
  ["fsb.jpg", "Лицензия УФСБ", "№ 32527 от 30.11.2018"],
  ["sro-insurance.jpg", "Полис страхования гражданской ответственности", "СРО-П № 0483-507-20 от 12.08.2020"],
  ["sro-installation.jpg", "Выписка СРО — монтаж", "от 17.09.2020"],
  ["sro-design.jpg", "Выписка СРО — проектирование", "от 16.09.2020"],
];

export default function LicensesPage() {
  return <main className="inner-page">
    <SiteHeader />
    <section className="inner-hero shell"><p>ДОКУМЕНТЫ</p><h1>Лицензии, сертификаты и <em>допуски</em></h1><span>Документы подтверждают право выполнять профильные работы.</span></section>
    <section className="license-grid shell">{licenses.map(([image, title, number]) => <article className="license-card" key={image}><a href={`/licenses/${image}`} target="_blank" rel="noreferrer"><img src={`/licenses/${image}`} alt={`${title}, ${number}`} /></a><h2>{title}</h2><p>{number}</p><a className="text-link" href={`/licenses/${image}`} target="_blank" rel="noreferrer">Открыть документ <span>→</span></a></article>)}</section>
    <section className="contacts"><div className="shell contact-grid"><div><p className="eyebrow">Нужны документы?</p><h2>Отправим по запросу</h2></div><div className="contact-links"><a href="mailto:info@rusvektor.ru">info@rusvektor.ru</a><a href="tel:+74951339013">+7 (495) 133-90-13</a></div></div></section>
  </main>;
}
