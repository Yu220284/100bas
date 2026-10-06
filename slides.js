(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sparkleRoot = document.getElementById("sparkles");
  if (sparkleRoot && !reduce) {
    for (let i = 0; i < 32; i++) {
      const s = document.createElement("span");
      s.className = "sparkle" + (i % 4 === 0 ? " is-star" : "");
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 100}%`;
      s.style.setProperty("--delay", `${Math.random() * 4.5}s`);
      s.style.setProperty("--dur", `${2.2 + Math.random() * 3.2}s`);
      s.style.setProperty("--drift", `${10 + Math.random() * 22}px`);
      sparkleRoot.appendChild(s);
    }
  }

  const screens = [...document.querySelectorAll(".screen")];
  const chaptersEl = document.getElementById("chapters");
  const dotsEl = document.getElementById("dots");
  const count = document.getElementById("count");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const hitPrev = document.getElementById("hitPrev");
  const hitNext = document.getElementById("hitNext");
  const labels = { world: "世界観", how: "使い方", use: "ユースケース" };
  let index = 0;
  let started = false;

  function chapterOf(i) {
    return screens[i]?.dataset.chapter || "welcome";
  }

  function sync() {
    const welcome = !started;
    document.body.classList.toggle("is-welcome", welcome);
    screens.forEach((el, i) => {
      const on = started ? i === index : i === 0;
      el.classList.toggle("is-on", on);
      el.hidden = !on;
    });
    const chapter = chapterOf(index);
    chaptersEl?.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("is-on", started && b.dataset.chapter === chapter);
    });
    const tutorial = screens
      .map((el, i) => ({ el, i }))
      .filter(({ el }) => el.dataset.chapter !== "welcome");
    if (dotsEl) {
      dotsEl.innerHTML = "";
      tutorial.forEach(({ el, i }) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = i === index ? "is-on" : "";
        btn.setAttribute("aria-label", el.querySelector("h2")?.textContent || `${i}`);
        btn.addEventListener("click", () => go(i));
        dotsEl.appendChild(btn);
      });
    }
    if (count) {
      const tIndex = tutorial.findIndex(({ i }) => i === index);
      count.textContent = started ? `${labels[chapter] || ""}  ${tIndex + 1} / ${tutorial.length}` : "";
    }
    const atStart = !started || index <= 1;
    const atEnd = started && index === screens.length - 1;
    [prevBtn, hitPrev].forEach((el) => {
      if (el) el.disabled = atStart;
    });
    [nextBtn, hitNext].forEach((el) => {
      if (el) el.disabled = !started || atEnd;
    });
    if (started) {
      const hash = screens[index]?.dataset.screen || "";
      history.replaceState(null, "", hash ? `#${hash}` : " ");
    }
  }

  function go(i) {
    if (!started) return;
    index = Math.max(1, Math.min(screens.length - 1, i));
    sync();
  }

  function next() {
    if (!started) return;
    if (index < screens.length - 1) go(index + 1);
  }

  function prev() {
    if (!started) return;
    if (index > 1) go(index - 1);
  }

  function start() {
    started = true;
    index = 1;
    sync();
  }

  document.getElementById("start")?.addEventListener("click", start);
  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);
  hitPrev?.addEventListener("click", prev);
  hitNext?.addEventListener("click", next);
  chaptersEl?.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      if (!started) start();
      const i = screens.findIndex((el) => el.dataset.chapter === b.dataset.chapter);
      if (i >= 0) go(i);
    });
  });

  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
    if (!started && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      start();
      return;
    }
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      prev();
    }
  });

  let touchX = null;
  window.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.changedTouches[0]?.clientX ?? null;
    },
    { passive: true }
  );
  window.addEventListener(
    "touchend",
    (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) < 48) return;
      if (!started) return;
      if (dx < 0) next();
      else prev();
    },
    { passive: true }
  );

  const fromHash = location.hash.replace(/^#/, "");
  const hashIndex = screens.findIndex((el) => el.dataset.screen === fromHash);
  if (hashIndex > 0) {
    started = true;
    index = hashIndex;
  }
  sync();
})();
