"use client";

import { useEffect, useState } from "react";

export function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const prefix = home ? "" : "/";

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`header shell${open ? " menu-open" : ""}`}>
      <a className="brand" href={home ? "#top" : "/"} aria-label="РУСВЕКТОР — на главную" onClick={closeMenu}>
        <span className="brand-mark">RV</span>
        <span>РУСВЕКТОР<small>строительство · безопасность</small></span>
      </a>
      <nav id="site-navigation" aria-label="Основная навигация">
        <a href="/services" onClick={closeMenu}>Услуги</a>
        <a href={`${prefix}#calculator`} onClick={closeMenu}>Калькулятор</a>
        <a href={`${prefix}#projects`} onClick={closeMenu}>Объекты</a>
        <a href="/licenses" onClick={closeMenu}>Лицензии</a>
        <a href={`${prefix}#contacts`} onClick={closeMenu}>Контакты</a>
        <a className="mobile-call" href="tel:+74951339013" onClick={closeMenu}>Позвонить: +7 (495) 133-90-13</a>
      </nav>
      <a className="phone" href="tel:+74951339013">+7 (495) 133-90-13</a>
      <button
        className="menu-toggle"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={open}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}
