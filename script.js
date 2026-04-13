const translations = {
  ru: {
    pageTitle: "Приглашение на день рождения",
    heroEyebrow: "С любовью приглашаем",
    heroTitle: "На день рождения",
    grandmaName: "Қадиша әже",
    heroSubtitle: "Праздник, где за одним дастарханом соберутся близкие сердца.",
    ctaText: "Посмотреть детали",
    detailsTitle: "Детали вечера",
    dateLabel: "Дата",
    dateValue: "20.06.2026",
    timeLabel: "Время",
    timeValue: "17:00",
    placeLabel: "Место",
    placeValue: "г. Ақтөбе",
    inviteText:
      "Будет особенно радостно разделить этот вечер в кругу родных и друзей, с теплом, добрыми словами и искренними улыбками.",
    footerWish: "Пусть этот вечер станет светлой памятью для каждого гостя."
  },
  kz: {
    pageTitle: "Туған күнге шақыру",
    heroEyebrow: "Ізгі тілекпен шақырамыз",
    heroTitle: "Туған күн кешіне",
    grandmaName: "Қадиша әже",
    heroSubtitle: "Бір дастархан басында жақын жандар бас қосатын мерейлі кеш.",
    ctaText: "Толық ақпарат",
    detailsTitle: "Кеш туралы мәлімет",
    dateLabel: "Күні",
    dateValue: "20.06.2026",
    timeLabel: "Уақыты",
    timeValue: "17:00",
    placeLabel: "Өтетін жері",
    placeValue: "Ақтөбе қ.",
    inviteText:
      "Осы мерекелік кешті туыстар мен достардың ортасында, ақжарма тілектер мен жылы жүзбен бірге өткізсек, біз үшін үлкен қуаныш болады.",
    footerWish: "Бұл кеш әр қонақтың жүрегінде жарқын естелік болып қалсын."
  }
};

const langButtons = document.querySelectorAll(".lang-btn");
const translatableElements = document.querySelectorAll("[data-i18n]");
const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.classList.add("js");

function applyLanguage(lang) {
  const dictionary = translations[lang] || translations.ru;

  translatableElements.forEach((element) => {
    const key = element.dataset.i18n;

    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.documentElement.lang = lang === "kz" ? "kk" : "ru";
  document.title = dictionary.pageTitle;
  localStorage.setItem("invite-language", lang);

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
    button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
  });
}

function setupRevealAnimations() {
  if (prefersReducedMotion) {
    revealElements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function setupInteractions() {
  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.lang);
    });
  });

  const ctaButton = document.querySelector("[data-scroll-target]");

  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      const target = document.querySelector(ctaButton.dataset.scrollTarget);

      target?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  }
}

function init() {
  const savedLanguage = localStorage.getItem("invite-language");
  const initialLanguage = savedLanguage && translations[savedLanguage] ? savedLanguage : "ru";

  applyLanguage(initialLanguage);
  setupInteractions();
  setupRevealAnimations();

  if (prefersReducedMotion) {
    document.body.classList.add("page-ready");
    return;
  }

  requestAnimationFrame(() => {
    document.body.classList.add("page-ready");
  });
}

init();
