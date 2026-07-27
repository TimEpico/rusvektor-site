"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { calculateEstimate, servicesByDirection, type Direction } from "./lib/estimate";

const services = [
  ["01", "Строительные работы", "Бетон, асфальт, плитка, кровля, окна и благоустройство."],
  ["02", "Пожарная безопасность", "Проектирование, монтаж и обслуживание систем защиты."],
  ["03", "Проектирование", "Рабочая документация, AutoCAD и инженерные решения."],
  ["04", "Технический надзор", "Контроль сроков, качества и исполнения на объекте."],
];

const projects = [
  ["Леруа Мерлен Ижевск", "Проектирование и монтаж систем пожарной безопасности", "Ижевск · 2018–2019"],
  ["Фабрика-кухня X5 Retail Group", "Инженерные системы, обследование и проектирование", "Долгопрудный · 2017–2019"],
  ["Технопарки в Саларьево", "Проектные работы и специальные технические условия", "Москва · 2015–2018"],
];

export default function Home() {
  const [direction, setDirection] = useState<Direction>("build");
  const [service, setService] = useState("Асфальтирование");
  const [size, setSize] = useState(100);
  const [depth, setDepth] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const estimate = useMemo(() => {
    return calculateEstimate(direction, service, size, depth);
  }, [depth, direction, service, size]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          direction,
          service,
          area: size,
          detail: depth,
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          message: form.get("message"),
          website: form.get("website"),
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку");
      setSubmitted(true);
      setStatus("success");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось отправить заявку");
      setStatus("error");
    }
  }

  function chooseDirection(next: "build" | "fire") {
    setDirection(next);
    setService(next === "build" ? "Асфальтирование" : "Пожарная сигнализация");
  }

  return (
    <main>
      <section className="hero" id="top">
        <header className="header shell">
          <a className="brand" href="#top" aria-label="РУСВЕКТОР — на главную">
            <span className="brand-mark">RV</span>
            <span>РУСВЕКТОР<small>строительство · безопасность</small></span>
          </a>
          <nav aria-label="Основная навигация">
            <a href="/services">Услуги</a><a href="#calculator">Калькулятор</a><a href="#projects">Объекты</a><a href="/licenses">Лицензии</a><a href="#contacts">Контакты</a>
          </nav>
          <a className="phone" href="tel:+74951339013">+7 (495) 133-90-13</a>
        </header>
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="shell hero-content">
          <p className="hero-lead">Строим объекты. Защищаем людей.</p>
          <h1>Строительство и пожарная безопасность <em>под ключ</em></h1>
          <p className="hero-copy">От проекта в AutoCAD до сдачи работ: берём на себя строительные, инженерные и противопожарные задачи.</p>
          <div className="hero-actions"><a className="button" href="#calculator">Рассчитать проект</a><a className="text-link" href="#projects">Смотреть объекты <span>→</span></a></div>
        </div>
      </section>

      <section className="services shell" id="services">
        <div className="section-head"><p>Возможности компании</p><h2>Один подрядчик для <em>сложных объектов</em></h2></div>
        <div className="service-grid">
          {services.map(([number, title, text]) => <article className="service" key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p><a href="/services" aria-label={`Смотреть услуги ${title}`}>→</a></article>)}
        </div>
      </section>

      <section className="calculator" id="calculator">
        <div className="shell calculator-layout">
          <div><p className="eyebrow">Предварительный расчёт</p><h2>Конфигуратор <em>заявки</em></h2><p>Укажите исходные параметры — специалист подготовит точную смету и свяжется с вами.</p><div className="technical-line" /></div>
          <form onSubmit={submit} className="calc-form">
            <div className="tabs" role="tablist"><button className={direction === "build" ? "active" : ""} type="button" onClick={() => chooseDirection("build")}>Строительные работы</button><button className={direction === "fire" ? "active" : ""} type="button" onClick={() => chooseDirection("fire")}>Пожарная безопасность</button></div>
            <label>Вид работ<select value={service} onChange={(event) => setService(event.target.value)}>{servicesByDirection[direction].map((item) => <option key={item}>{item}</option>)}</select></label>
            <div className="fields"><label>Площадь, м²<input min="1" type="number" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label><label>{direction === "build" ? "Толщина, см" : "Этажность"}<input min="1" type="number" value={depth} onChange={(event) => setDepth(Number(event.target.value))} /></label></div>
            <div className="estimate"><span>Ориентир по работам</span><strong>от {estimate.toLocaleString("ru-RU")} ₽</strong></div>
            <div className="fields"><label>Ваше имя<input name="name" minLength={2} required placeholder="Иван" /></label><label>Телефон<input name="phone" required inputMode="tel" placeholder="+7 999 000-00-00" /></label></div>
            <label>Электронная почта<input name="email" type="email" placeholder="mail@example.ru" /></label>
            <label>Комментарий<textarea name="message" rows={3} placeholder="Адрес, сроки, особенности объекта" /></label>
            <label className="honeypot" aria-hidden="true">Сайт<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <button className="button button-full" disabled={status === "sending"} type="submit">{status === "sending" ? "Отправляем…" : "Получить точный расчёт"}</button>
            {submitted && <p className="success" role="status">Заявка отправлена. Специалист свяжется с вами и уточнит детали.</p>}
            {error && <p className="form-error" role="alert">{error}</p>}
          </form>
        </div>
      </section>

      <section className="projects shell" id="projects">
        <div className="section-head section-head-row"><div><p>Практика</p><h2>Реализованные <em>объекты</em></h2></div><a className="text-link" href="#contacts">Запросить портфолио <span>→</span></a></div>
        <div className="project-list">{projects.map(([title, work, place], index) => <article key={title} className={`project project-${index + 1}`}><div><p>{work}</p><h3>{title}</h3><span>{place}</span></div></article>)}</div>
      </section>

      <section className="safety-band"><div className="shell safety-content"><p className="eyebrow">Пожарная безопасность</p><h2>Проектируем защиту, которая работает <em>в критический момент.</em></h2><a className="text-link" href="#contacts">Обсудить систему <span>→</span></a></div></section>

      <section className="contacts" id="contacts"><div className="shell contact-grid"><div><p className="eyebrow">Начнём с задачи</p><h2>Нужен расчёт или консультация?</h2><p>Расскажите, что требуется на объекте. Секретарь передаст заявку профильному специалисту.</p></div><div className="contact-links"><a href="tel:+74951339013">+7 (495) 133-90-13</a><a href="mailto:info@rusvektor.ru">info@rusvektor.ru</a><span>Москва, Полесский проезд, 16, стр. 1</span></div></div></section>
    </main>
  );
}
