(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stories = {
    a: [
      "20歳の自分は、<br>まだ100歳を想像できない。",
      "100歳の自分を、<br>身近に感じられたら。",
      "",
    ],
    b: [
      "未来の自分が、<br>近づいてくる。",
      "",
    ],
    c: [
      "20歳と100歳は、<br>まだ離れている。",
      "",
    ],
  };

  const panes = {
    a: document.getElementById("splashA"),
    b: document.getElementById("splashB"),
    c: document.getElementById("splashC"),
  };
  const noteEl = document.getElementById("chooserNote");
  const explainEl = document.getElementById("explain");
  const explainCount = document.getElementById("explainCount");
  const explainText = document.getElementById("explainText");
  const explainDots = document.getElementById("explainDots");
  const hitPrev = document.getElementById("hitPrev");
  const hitNext = document.getElementById("hitNext");
  const morphBtns = [...document.querySelectorAll("[data-morph]")];
  const playBtns = [...document.querySelectorAll("[data-play]")];
  let currentSplash = "a";
  let currentMorph = "sweepL";
  let storyCtrl = null;

  function setExplain(kind, beat) {
    const lines = stories[kind] || [];
    const n = lines.length;
    const text = lines[beat] || "";
    if (!explainEl) return;
    explainEl.hidden = false;
    explainEl.classList.toggle("is-titlebeat", !text);
    if (explainCount) explainCount.textContent = `${beat + 1}/${n}`;
    if (explainText) {
      explainText.innerHTML = text;
      explainText.classList.remove("is-in");
      void explainText.offsetWidth;
      explainText.classList.add("is-in");
    }
    if (explainDots) {
      explainDots.innerHTML = "";
      for (let i = 0; i < n; i++) {
        const dot = document.createElement("span");
        if (i === beat) dot.className = "is-on";
        explainDots.appendChild(dot);
      }
    }
  }

  function setHits(canPrev, canNext) {
    if (hitPrev) hitPrev.disabled = !canPrev;
    if (hitNext) hitNext.disabled = !canNext;
  }

  function sampleDigitPoints(w, h, text) {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const octx = off.getContext("2d");
    const size = Math.min(w * 0.36, h * 0.3, 240);
    octx.fillStyle = "#fff";
    octx.font = `700 ${size}px "Shippori Mincho", "Hiragino Mincho ProN", serif`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText(text, w / 2, h * 0.62);
    const data = octx.getImageData(0, 0, w, h).data;
    const pts = [];
    const step = Math.max(4, Math.floor(Math.min(w, h) / 110));
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        if (data[(y * w + x) * 4 + 3] > 90 && Math.random() > 0.12) {
          pts.push({ tx: x, ty: y });
        }
      }
    }
    pts.sort((a, b) => a.tx - b.tx || a.ty - b.ty);
    return pts;
  }

  function pickPoint(pts, i, n) {
    if (!pts.length) return { tx: 0, ty: 0 };
    const idx = Math.min(pts.length - 1, Math.floor((i * pts.length) / n));
    return pts[idx];
  }

  function easeOut(t) {
    return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
  }

  function sweepDelay(p, w, h, kind) {
    const nx = p.s20x / Math.max(1, w);
    const ny = p.s20y / Math.max(1, h);
    if (kind === "sweepR") return (1 - nx) * 0.55;
    if (kind === "sweepV") return ny * 0.55;
    if (kind === "sweepC") return Math.abs(nx - 0.5) * 1.1;
    if (kind === "sweepA") {
      const ang = Math.atan2(p.s20y - h * 0.62, p.s20x - w / 2);
      return ((ang + Math.PI) / (Math.PI * 2)) * 0.55;
    }
    return nx * 0.55;
  }

  function applyMorph(p, phaseT, morphDur) {
    const span = Math.max(0.4, morphDur - 0.55);
    const local = easeOut((phaseT - (p.delay || 0)) / span);
    p.x = p.s20x + (p.s100x - p.s20x) * local;
    p.y = p.s20y + (p.s100y - p.s20y) * local;
    p.a = 1;
    p.scale = 0.88 + 0.12 * local;
  }

  function playA(pane, morph) {
    const canvas = document.getElementById("canvasA");
    pane.classList.remove("is-title");
    if (explainEl) explainEl.hidden = true;
    if (!canvas || reduce) {
      pane.classList.add("is-title");
      setExplain("a", 2);
      setHits(false, false);
      return { stop() {}, next() {}, prev() {} };
    }

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let alive = true;
    let raf = 0;

    const resize = () => {
      const w = pane.clientWidth;
      const h = pane.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };
    let { w, h } = resize();
    const pts20 = sampleDigitPoints(w, h, "20");
    const pts100 = sampleDigitPoints(w, h, "100");
    const n = Math.max(pts20.length, pts100.length, 1);
    const particles = Array.from({ length: n }, (_, i) => {
      const a = pickPoint(pts20, i, n);
      const b = pickPoint(pts100, i, n);
      const proto = { s20x: a.tx, s20y: a.ty };
      return {
        x: a.tx,
        y: a.ty,
        s20x: a.tx,
        s20y: a.ty,
        s100x: b.tx,
        s100y: b.ty,
        delay: sweepDelay(proto, w, h, morph),
        r: 1.15 + Math.random() * 0.45,
        a: 0,
        scale: 0.35,
        vx: 0,
        vy: 0,
        t: 0,
        started: false,
      };
    });

    let phase = "appear";
    let phaseT = 0;
    let revealed = 0;
    let tPrev = performance.now();
    let titleShown = false;
    let queuedNext = false;
    const morphDur = 1.25;

    const snap = (to100) => {
      particles.forEach((p) => {
        p.x = to100 ? p.s100x : p.s20x;
        p.y = to100 ? p.s100y : p.s20y;
        p.a = 1;
        p.scale = 1;
        p.vx = 0;
        p.vy = 0;
        p.started = true;
        p.t = 1;
      });
      revealed = particles.length;
    };

    const enterWait20 = () => {
      phase = "wait20";
      phaseT = 0;
      pane.classList.remove("is-title");
      titleShown = false;
      setExplain("a", 0);
      setHits(false, true);
      if (queuedNext) {
        queuedNext = false;
        enterMorph();
      }
    };

    const enterMorph = () => {
      phase = "morph";
      phaseT = 0;
      setExplain("a", 1);
      setHits(false, false);
    };

    const enterWait100 = () => {
      phase = "wait100";
      phaseT = 0;
      snap(true);
      pane.classList.remove("is-title");
      titleShown = false;
      setExplain("a", 1);
      setHits(true, true);
      if (queuedNext) {
        queuedNext = false;
        enterDissolve();
      }
    };

    const enterDissolve = () => {
      phase = "dissolve";
      phaseT = 0;
      particles.forEach((p) => {
        p.vx = (Math.random() - 0.5) * 140;
        p.vy = -20 + Math.random() * 60;
      });
      if (!titleShown) {
        titleShown = true;
        pane.classList.add("is-title");
      }
      setExplain("a", 2);
      setHits(false, false);
    };

    const enterWaitTitle = () => {
      phase = "waitTitle";
      phaseT = 1;
      setExplain("a", 2);
      setHits(true, false);
    };

    const drawStar = (p) => {
      if (p.a < 0.02) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(p.scale || 1, p.scale || 1);
      const halo = p.r * 2.4;
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, halo);
      g.addColorStop(0, `rgba(255,248,231,${0.7 * p.a})`);
      g.addColorStop(0.55, `rgba(198,166,97,${0.28 * p.a})`);
      g.addColorStop(1, "rgba(198,166,97,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, halo, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = `rgba(243,230,184,${0.92 * p.a})`;
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const draw = (now) => {
      if (!alive) return;
      const dt = Math.min(0.05, (now - tPrev) / 1000);
      tPrev = now;
      phaseT += dt;
      ctx.clearRect(0, 0, w, h);

      if (phase === "appear") {
        const rate = Math.max(36, particles.length / 0.7);
        revealed = Math.min(particles.length, revealed + rate * dt);
        if (revealed >= particles.length) {
          const last = particles[particles.length - 1];
          if (last && last.t > 0.28) {
            phase = "hold20";
            phaseT = 0;
          }
        }
      } else if (phase === "hold20" && phaseT > 0.35) {
        enterWait20();
      } else if (phase === "morph" && phaseT >= morphDur) {
        enterWait100();
      } else if (phase === "dissolve" && phaseT > 0.9) {
        enterWaitTitle();
      }

      if (phase !== "gone") {
        const showN = phase === "appear" ? Math.floor(revealed) : particles.length;
        for (let i = 0; i < showN; i++) {
          const p = particles[i];
          if (!p.started) {
            p.started = true;
            p.t = 0;
            p.x = p.s20x;
            p.y = p.s20y;
          }
          p.t += dt;
          if (phase === "appear" || phase === "hold20" || phase === "wait20") {
            const u = Math.min(1, p.t / 0.28);
            const e = 1 - Math.pow(1 - u, 3);
            p.x = p.s20x;
            p.y = p.s20y;
            p.a = Math.min(1, e * 1.1);
            p.scale = 0.45 + 0.55 * e;
          } else if (phase === "morph") {
            applyMorph(p, phaseT, morphDur);
          } else if (phase === "hold100" || phase === "wait100") {
            p.x = p.s100x;
            p.y = p.s100y;
            p.a = 1;
            p.scale = 1;
          } else if (phase === "waitTitle") {
            p.a = 0;
          } else {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 200 * dt;
            p.a = Math.max(0, 1 - phaseT * 1.9);
            p.scale = Math.max(0.25, 1 - phaseT * 0.55);
          }
          drawStar(p);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    setHits(false, false);
    raf = requestAnimationFrame(draw);
    return {
      stop() {
        alive = false;
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, w, h);
      },
      next() {
        if (phase === "wait20") enterMorph();
        else if (phase === "wait100") enterDissolve();
        else if (phase === "morph") queuedNext = true;
      },
      prev() {
        queuedNext = false;
        if (phase === "wait100" || phase === "morph") {
          snap(false);
          enterWait20();
        } else if (phase === "waitTitle" || phase === "dissolve") {
          snap(true);
          enterWait100();
        }
      },
    };
  }

  function playCss(pane, kind) {
    pane.classList.remove("is-play", "is-title");
    void pane.offsetWidth;
    pane.classList.add("is-play");
    let beat = 0;
    const n = stories[kind].length;
    setExplain(kind, 0);
    setHits(false, true);
    let titleTimer = 0;
    if (reduce) {
      pane.classList.add("is-title");
      beat = n - 1;
      setExplain(kind, beat);
      setHits(true, false);
    }
    return {
      stop() {
        window.clearTimeout(titleTimer);
      },
      next() {
        if (beat >= n - 1) return;
        beat += 1;
        pane.classList.add("is-title");
        setExplain(kind, beat);
        setHits(true, false);
      },
      prev() {
        if (beat <= 0) return;
        beat = 0;
        pane.classList.remove("is-title");
        void pane.offsetWidth;
        pane.classList.add("is-play");
        setExplain(kind, 0);
        setHits(false, true);
      },
    };
  }

  function show(splash, morph) {
    currentSplash = splash;
    if (morph) currentMorph = morph;
    storyCtrl?.stop();
    storyCtrl = null;
    Object.entries(panes).forEach(([key, el]) => {
      const on = key === splash;
      el.hidden = !on;
      el.classList.toggle("is-on", on);
      el.classList.remove("is-play", "is-title");
    });
    morphBtns.forEach((b) => {
      b.classList.toggle("is-active", splash === "a" && b.dataset.morph === currentMorph);
    });
    playBtns.forEach((b) => {
      b.classList.toggle("is-active", b.dataset.play === splash);
    });
    if (noteEl) noteEl.textContent = "右側をクリックして進む";
    history.replaceState(null, "", `#${splash === "a" ? currentMorph : splash}`);

    const pane = panes[splash];
    if (splash === "a") {
      if (reduce) {
        pane.classList.add("is-title");
        setExplain("a", 2);
        setHits(false, false);
        storyCtrl = { stop() {}, next() {}, prev() {} };
      } else {
        storyCtrl = playA(pane, currentMorph);
      }
    } else if (splash === "b") storyCtrl = playCss(pane, "b");
    else storyCtrl = playCss(pane, "c");
  }

  function nextBeat() {
    storyCtrl?.next();
  }
  function prevBeat() {
    storyCtrl?.prev();
  }

  morphBtns.forEach((b) =>
    b.addEventListener("click", () => show("a", b.dataset.morph))
  );
  playBtns.forEach((b) => b.addEventListener("click", () => show(b.dataset.play)));
  document.getElementById("replay")?.addEventListener("click", () =>
    show(currentSplash, currentMorph)
  );
  hitNext?.addEventListener("click", nextBeat);
  hitPrev?.addEventListener("click", prevBeat);
  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      e.preventDefault();
      nextBeat();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      prevBeat();
    }
  });

  const morphIds = new Set(["sweepL", "sweepR", "sweepV", "sweepC", "sweepA"]);
  const fromHash = location.hash.replace(/^#/, "");
  if (fromHash === "sweep") {
    show("a", "sweepL");
  } else if (morphIds.has(fromHash)) {
    show("a", fromHash);
  } else if (fromHash === "b" || fromHash === "c") {
    show(fromHash);
  } else {
    show("a", "sweepL");
  }
})();
