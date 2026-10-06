(() => {
  const splash = document.getElementById("splash");
  const canvas = document.getElementById("stars");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const I18N = {
    ja: {
      "hero.chip": "SF × Fieldwork · Electric Sheep",
      "hero.title": "あえて、地道に。",
      "hero.lead": "100つの〇〇を達成する。<br />検証から問題を洗い出す。",
      "hero.m1": "01 // 100を積む",
      "hero.m2": "02 // 検証する",
      "hero.m3": "03 // 地道に行く",
      "hero.cta1": "テーマ",
      "hero.cta2": "TODOを見る",
      "theme.h2": "チームの方針",
      "theme.1.t": "100つの〇〇を達成する",
      "theme.1.p":
        "資料100・映画100・施設100・ヒアリング100——数字を目標にして、量から質へつなぐ。",
      "theme.2.t": "検証から問題を洗い出す",
      "theme.2.p": "仮説より先に現場と記録。読んで、聞いて、回って、ずれを見つける。",
      "theme.3.t": "あえて、地道に",
      "theme.3.p": "近道のアイデアより、積み上げ。派手さより再現できる手数を選ぶ。",
      "insight.axis": "MTG Insight",
      "insight.1.t": "今の課題 × 100歳の未来",
      "insight.1.p": "時間軸を二層で整理する。いま解く課題と、未来の課題を分けて見る。",
      "insight.2.t": "実在課題を、SFへ拡大する",
      "insight.2.p": "現場の痛みを起点に、SFのスケールへ伸ばす。空想だけの未来にしない。",
      "insight.3.t": "終わりの地を、ここにした理由",
      "insight.3.p": "都市と老いを結びつける問い。住み続ける理由から課題を掘る。",
      "policy.eyebrow": "全体方針 · Mission Log",
      "policy.line": "データを残そう！",
      "policy.sf": "地道な検証の痕跡を、すべてログに残す。",
      "hours.h2": "稼働時間の宣言！",
      "hours.total4": "合計 <strong>4</strong> 時間",
      "hours.total3": "合計 <strong>3</strong> 時間",
      "hours.tue2": "火曜日：2時間",
      "hours.sat2": "土曜日：2時間",
      "hours.tue1": "火曜日：1時間",
      "hours.thu1": "木曜日：1時間",
      "hours.sat1": "土曜日：1時間",
      "hours.sun2": "日曜日：2時間",
      "hours.wed1": "水曜日：1時間",
      "hours.mon1": "月曜日：1時間",
      "hours.fri1": "金曜日：1時間",
      "todo.done": "やったこと",
      "todo.learned": "わかったこと · 時間軸",
      "todo.a1": "100資料を調査",
      "todo.a2": "for-aに連絡した",
      "todo.a3": "14個まで読み終えた",
      "todo.a4": "今の課題にするのか",
      "todo.a5": "100歳になった時の未来を予測する",
      "todo.f1": "高齢者100人にヒアリング（介護施設経由 · 70〜100歳）",
      "todo.f2": "8/15 何件できたか",
      "todo.h.label": "100施設 · 都市回ってみた",
      "todo.h1": "過去のやつを書き出した",
      "todo.h2": "各都市の50〜60歳にヒアリング（ここにずっと住んでいる理由）",
      "todo.h3": "チラシ・HPの住民の声をFableで取得（イベント、住民の声）",
      "todo.i.label": "SF小説100作品読む",
      "todo.i1":
        "既読200から世界観・課題・プロダクトをリスト化 → #sec-sf",
      "todo.k.label": "SF映画を100作品",
      "todo.k1": "100作品をリストアップ",
      "todo.k2": "クラスタリング（不老不死、ロボット など）をAIでやる",
      "todo.k3":
        "クラスから気になった1本を視聴（例：ロボット、高齢化、不老不死、宇宙旅行）",
      "todo.phys": "フィジカル",
      "todo.p1": "for-aに工場見学",
      "todo.p2": "100枚名刺交換 → 秋穂",
      "todo.p3": "1日100回感謝を伝える",
      "todo.p4": "100人に土下座",
      "todo.p5": "幸福学・well-beingの本を100冊",
      "todo.p6": "100枚ハガキを書く",
      "todo.dig": "デジタル",
      "todo.d1": "100個資料を読む → 秋穂",
      "todo.d2": "高齢者に関連する論文を100本読む",
      "sched.h2": "スケジュール",
      "sched.1": "メンター面談",
      "sched.1p": "テレビ取材あり。作戦と進捗の現状報告（プロダクト確定は急がない）",
      "sched.aug": "8月",
      "sched.2": "探索期間",
      "sched.2p": "ヒアリング・資料収集。カスタマープロブレムフィットの検証。8月中に各タスク完了を目標",
      "sched.815": "ヒアリング進捗チェック",
      "sched.815p": "古川：介護施設テレアポの件数・アポイント状況",
      "sched.3": "ハッカソン本番",
      "sched.3p": "9/12〜13 実装期間を含む",
      "dinner.title": "ご飯いこう！",
      "dinner.1": "候補：土日ランチ（13時過ぎ〜）",
      "dinner.2": "はまが東京・午後（都内・場所調整中）",
      "dinner.3": "候補例：しゃぶ葉 ／ ハウステンボス願望もあり",
      "ideas.h2": "アイデア",
      "ideas.1": "国際宇宙ステーションでの遠隔操作研究実験",
      "ideas.2": "遠隔操作によるスペースデブリ回収",
      "ideas.3": "AI遺言執行人（仮）",
      "ideas.4": "高齢化 · 健康面の課題",
      "ideas.4p": "データを探す · 実在課題をSFスケールへ",
      "research.h2": "調査",
      "research.1": "SF映画100本",
      "research.2": "100施設 · 都市回ってみた",
      "research.3": "SF小説 · クラスタリング",
      "research.3a": "リストを見る",
      "research.4": "介護施設ヒアリング",
      "sf.h2": "SFクラスタリング",
      "sf.lead":
        "テーマ「100歳の幸せ」に向け、既読SFから世界観・課題・プロダクトをシンプルに洗い出した。",
      "sf.world.label": "世界観タイプ · 7",
      "sf.w1": "管理・幸福強制 — 正しさ／幸福を制度が先回りする",
      "sf.w2": "監視・データ身体 — 記録が現実を上書きする",
      "sf.w3": "身体改変・寿命拡張 — 生が技術で書き換えられる",
      "sf.w4": "閉鎖空間・孤立 — 箱（施設・船・カプセル）の中で生きる",
      "sf.w5": "環境崩壊・移住 — 家・土地の前提が崩れる",
      "sf.w6": "異他者・共生 — AI・異星・非人間と暮らす",
      "sf.w7": "意味・物語崩壊 — 自分語り／生きがいが作れなくなる",
      "sf.issue.label": "生まれる課題 · 100歳と衝突しやすいもの",
      "sf.i1": "世話と支配の境界が消える（ケアが監視になる）",
      "sf.i2": "安全・長寿の代わりに、選ばない自由が消える",
      "sf.i3": "記録はあるが意味がない／意味はあるが記録が消える",
      "sf.i4": "延びた寿命の「誰のために残るか」が空白になる",
      "sf.i5": "施設・居室が守る箱にも檻にもなる",
      "sf.i6": "人間以外の他者（AI・ロボット）への依存と寂しさ",
      "sf.i7": "楽しみ・生きがいがコンテンツ消費に回収される",
      "sf.prod.label": "SFプロダクト／技術 · 例",
      "sf.next.label": "次にやること",
      "sf.n1": "優先する世界観を1〜2個に絞る",
      "sf.n2": "解決する課題を1文で書く",
      "sf.n3": "ヒアリング・都市調査と突合する",
      "mtg.h2": "MTGログ",
      "mtg.lead": "議事録から、方針とアクションを補足。",
      "mtg.first.t": "キックオフ · 100チャレンジ分担",
      "mtg.first.p": "宇宙アイデア／AI遺言執行人の種出し。探索期間と役割分担を確定。",
      "mtg.reg.t": "進捗共有 · 軸の議論",
      "mtg.reg.p": "タスク整理と、「今／未来」の二軸。メンター面談の資料方針を決定。",
      "mtg.open": "議事録を開く",
      "mtg.0": "初回MTG",
      "mtg.1": "定例MTG",
      "mtg.2": "定例MTG · 議事録収録",
      "ws.title": "ワークスペース",
      "close.lead": "100を積み、検証し、地道に。",
      "modal.empty": "まだデータがありません",
      "modal.detail": "詳細",
      "modal.hint": "詳細を見る",
      "modal.panel": "Panel",
    },
    en: {
      "hero.chip": "SF × Fieldwork · Electric Sheep",
      "hero.title": "Slow by design.",
      "hero.lead": "Hit 100 of something.<br />Find problems through verification.",
      "hero.m1": "01 // Stack 100",
      "hero.m2": "02 // Verify",
      "hero.m3": "03 // Stay grounded",
      "hero.cta1": "Theme",
      "hero.cta2": "See TODO",
      "theme.h2": "Team principles",
      "theme.1.t": "Achieve 100 of ○○",
      "theme.1.p":
        "100 docs, films, sites, interviews — use volume as a bridge to quality.",
      "theme.2.t": "Surface problems through verification",
      "theme.2.p":
        "Field and records before hypotheses. Read, listen, walk, find the gaps.",
      "theme.3.t": "Slow by design",
      "theme.3.p":
        "Prefer accumulation over shortcuts. Choose reproducible effort over spectacle.",
      "insight.axis": "MTG Insight",
      "insight.1.t": "Present problems × life at 100",
      "insight.1.p":
        "Split the timeline: what we solve now vs. challenges at age 100.",
      "insight.2.t": "Scale real pain into SF",
      "insight.2.p":
        "Start from field problems, then stretch them to SF scale — not fiction alone.",
      "insight.3.t": "Why this place as the last home",
      "insight.3.p":
        "A question that ties cities to aging. Dig into why people stay.",
      "policy.eyebrow": "Mission Log",
      "policy.line": "Keep the data!",
      "policy.sf": "Log every trace of steady verification.",
      "hours.h2": "Weekly hours",
      "hours.total4": "Total <strong>4</strong> hrs",
      "hours.total3": "Total <strong>3</strong> hrs",
      "hours.tue2": "Tue · 2 hrs",
      "hours.sat2": "Sat · 2 hrs",
      "hours.tue1": "Tue · 1 hr",
      "hours.thu1": "Thu · 1 hr",
      "hours.sat1": "Sat · 1 hr",
      "hours.sun2": "Sun · 2 hrs",
      "hours.wed1": "Wed · 1 hr",
      "hours.mon1": "Mon · 1 hr",
      "hours.fri1": "Fri · 1 hr",
      "todo.done": "Done",
      "todo.learned": "Learnings · Timeline",
      "todo.a1": "Surveyed 100 materials",
      "todo.a2": "Contacted for-a",
      "todo.a3": "Finished reading 14",
      "todo.a4": "Frame as a present-day problem?",
      "todo.a5": "Forecast life at age 100",
      "todo.f1": "Interview 100 elders (care facilities · ages 70–100)",
      "todo.f2": "Report count by 8/15",
      "todo.h.label": "100 facilities · city visits",
      "todo.h1": "Listed past visits",
      "todo.h2": "Interview residents 50–60 (why stay here)",
      "todo.h3": "Pull flyer/HP voices via Fable (events, resident notes)",
      "todo.i.label": "Read 100 SF novels",
      "todo.i1":
        "Listed worldviews, issues & products from ~200 reads → #sec-sf",
      "todo.k.label": "100 SF films",
      "todo.k1": "Listed 100 titles",
      "todo.k2": "AI-cluster by keywords (immortality, robots, …)",
      "todo.k3":
        "Watch one pick per cluster (robots, aging, immortality, space travel)",
      "todo.phys": "Physical",
      "todo.p1": "for-a factory tour",
      "todo.p2": "Exchange 100 business cards → Akiho",
      "todo.p3": "Say thanks 100 times a day",
      "todo.p4": "100 dogeza challenge",
      "todo.p5": "100 well-being / happiness books",
      "todo.p6": "Write 100 postcards",
      "todo.dig": "Digital",
      "todo.d1": "Read 100 materials → Akiho",
      "todo.d2": "Read 100 papers on aging",
      "sched.h2": "Schedule",
      "sched.1": "Mentor check-in",
      "sched.1p":
        "TV coverage. Share strategy & progress — don't rush a product decision.",
      "sched.aug": "August",
      "sched.2": "Exploration",
      "sched.2p":
        "Hearings & research. Validate customer–problem fit. Aim to finish tasks in August.",
      "sched.815": "Hearing progress check",
      "sched.815p": "Furukawa: care-facility outreach counts & appointments",
      "sched.3": "Hackathon day",
      "sched.3p": "Includes 9/12–13 build window",
      "dinner.title": "Let's eat!",
      "dinner.1": "Candidates: weekend lunch (after 1pm)",
      "dinner.2": "Hama in Tokyo afternoon (location TBD)",
      "dinner.3": "e.g. Shabuyo · also want Huis Ten Bosch",
      "ideas.h2": "Ideas",
      "ideas.1": "Remote-operation research on the ISS",
      "ideas.2": "Remote space-debris retrieval",
      "ideas.3": "AI estate executor (working title)",
      "ideas.4": "Aging · health challenges",
      "ideas.4p": "Find data · scale real issues into SF",
      "research.h2": "Research",
      "research.1": "100 SF films",
      "research.2": "100 facilities · cities visited",
      "research.3": "SF novels · clustering",
      "research.3a": "See list",
      "research.4": "Care-facility hearings",
      "sf.h2": "SF clustering",
      "sf.lead":
        "For “happiness at 100”: simple lists of worldviews, issues, and SF products from what we read.",
      "sf.world.label": "Worldviews · 7",
      "sf.w1": "Managed happiness — systems decide what is good for you",
      "sf.w2": "Surveilled / data body — records overwrite reality",
      "sf.w3": "Body & lifespan rewrite — life is engineered",
      "sf.w4": "Closed / isolated — living inside a box (facility, ship, capsule)",
      "sf.w5": "Collapse & migration — home and land stop holding",
      "sf.w6": "Otherness & coexistence — living with AI / nonhumans",
      "sf.w7": "Meaning collapse — you can no longer narrate a life worth living",
      "sf.issue.label": "Issues that clash with life at 100",
      "sf.i1": "Care blurs into control (care becomes surveillance)",
      "sf.i2": "Safety/longevity trade away the freedom not to choose",
      "sf.i3": "Records without meaning / meaning without records",
      "sf.i4": "Longer life leaves “who am I staying for?” blank",
      "sf.i5": "Rooms that protect can also cage",
      "sf.i6": "Dependence on AI/robots — and the loneliness under it",
      "sf.i7": "Joy gets swallowed by content consumption",
      "sf.prod.label": "SF products / tech · samples",
      "sf.next.label": "Next",
      "sf.n1": "Pick 1–2 worldviews to prioritize",
      "sf.n2": "Write the problem to solve in one sentence",
      "sf.n3": "Cross-check with hearings & city research",
      "mtg.h2": "MTG log",
      "mtg.lead": "From meeting notes — decisions & actions.",
      "mtg.first.t": "Kickoff · 100-challenge split",
      "mtg.first.p":
        "Seeded space ideas / AI executor. Locked exploration window & roles.",
      "mtg.reg.t": "Progress · framing debate",
      "mtg.reg.p":
        "Task sync + present/future axes. Mentor deck = status report.",
      "mtg.open": "Open notes",
      "mtg.0": "Kickoff MTG",
      "mtg.1": "Weekly MTG",
      "mtg.2": "Weekly MTG · minutes recorded",
      "ws.title": "Workspace",
      "close.lead": "Stack 100. Verify. Stay grounded.",
      "modal.empty": "No data yet",
      "modal.detail": "Detail",
      "modal.hint": "View detail",
      "modal.panel": "Panel",
    },
  };

  let lang = localStorage.getItem("100bus-lang") || "ja";

  const t = (key) => I18N[lang]?.[key] ?? I18N.ja[key] ?? key;

  const applyLang = (next) => {
    lang = next === "en" ? "en" : "ja";
    localStorage.setItem("100bus-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && I18N[lang][key] != null) el.textContent = I18N[lang][key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (key && I18N[lang][key] != null) el.innerHTML = I18N[lang][key];
    });

    document.querySelectorAll("[data-lang-set]").forEach((btn) => {
      const active = btn.getAttribute("data-lang-set") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    document.querySelectorAll(".panel-hint").forEach((el) => {
      el.textContent = t("modal.hint");
    });
  };

  document.querySelectorAll("[data-lang-set]").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang-set")));
  });

  const markFontsReady = () => {
    document.body.classList.remove("fonts-pending");
    document.body.classList.add("fonts-ready");
    document.documentElement.classList.add("fonts-ready");
  };

  const waitFonts = () => {
    if (!document.fonts?.ready) {
      markFontsReady();
      return Promise.resolve();
    }
    const loaded = Promise.all([
      document.fonts.load('600 48px "Shippori Mincho"'),
      document.fonts.load('700 48px "Shippori Mincho"'),
      document.fonts.load('700 32px "Syne"'),
      document.fonts.load('800 32px "Syne"'),
      document.fonts.load('400 16px "Zen Kaku Gothic New"'),
      document.fonts.load('500 16px "Zen Kaku Gothic New"'),
      document.fonts.load('700 16px "Zen Kaku Gothic New"'),
    ]).then(() => document.fonts.ready);
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 2000));
    return Promise.race([loaded, timeout]).then(markFontsReady);
  };

  applyLang(lang);

  waitFonts().then(() => {
    if (!splash || new URLSearchParams(location.search).has("clean")) {
      splash?.remove();
      document.body.classList.remove("is-splash");
      return;
    }

    const canvas = document.getElementById("splashCanvas");
    let raf = 0;
    let finishTimer = null;
    let alive = true;

    const finishSplash = () => {
      if (!alive || splash.classList.contains("is-done")) return;
      alive = false;
      cancelAnimationFrame(raf);
      if (finishTimer) {
        clearTimeout(finishTimer);
        finishTimer = null;
      }
      splash.classList.add("is-done");
      document.body.classList.remove("is-splash");
      window.setTimeout(() => splash.remove(), 800);
    };

    const sampleDigitPoints = (w, h) => {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d");
      const size = Math.min(w * 0.48, h * 0.5, 320);
      octx.fillStyle = "#fff";
      octx.font = `700 ${size}px "Shippori Mincho", "Hiragino Mincho ProN", serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText("100", w / 2, h * 0.42);
      const data = octx.getImageData(0, 0, w, h).data;
      const pts = [];
      // denser grid so the digit silhouette reads as "100"
      const step = Math.max(4, Math.floor(Math.min(w, h) / 110));
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          if (data[(y * w + x) * 4 + 3] > 90 && Math.random() > 0.12) {
            pts.push({ tx: x, ty: y });
          }
        }
      }
      pts.sort((a, b) => b.ty - a.ty || a.tx - b.tx);
      return pts;
    };

    const drawStar = (ctx, p) => {
      if (p.a < 0.02) return;
      const scale = p.scale || 1;
      const a = p.a;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(scale, scale);

      // quiet soft core — no rays, almost no glitter
      const halo = p.r * 2.4;
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, halo);
      g.addColorStop(0, `rgba(255,248,231,${0.7 * a})`);
      g.addColorStop(0.55, `rgba(198,166,97,${0.28 * a})`);
      g.addColorStop(1, "rgba(198,166,97,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, halo, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(243,230,184,${0.92 * a})`;
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const runSplash = () => {
      if (!canvas) {
        splash.classList.add("is-title");
        finishTimer = window.setTimeout(finishSplash, reduce ? 400 : 1800);
        return;
      }

      if (reduce) {
        splash.classList.add("is-title");
        finishTimer = window.setTimeout(finishSplash, 500);
        return;
      }

      const ctx = canvas.getContext("2d");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const resize = () => {
        const w = splash.clientWidth;
        const h = splash.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { w, h };
      };
      let { w, h } = resize();

      const targets = sampleDigitPoints(w, h);
      const particles = targets.map((t) => ({
        x: t.tx,
        y: t.ty,
        tx: t.tx,
        ty: t.ty,
        r: 1.15 + Math.random() * 0.45,
        a: 0,
        scale: 0.35,
        vx: 0,
        vy: 0,
        t: 0,
        started: false,
      }));

      let phase = "appear";
      let phaseT = 0;
      let revealed = 0;
      let tPrev = performance.now();
      let titleShown = false;

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
              phase = "hold";
              phaseT = 0;
            }
          }
        } else if (phase === "hold" && phaseT > 0.22) {
          phase = "dissolve";
          phaseT = 0;
          particles.forEach((p) => {
            p.vx = (Math.random() - 0.5) * 140;
            p.vy = -20 + Math.random() * 60;
          });
          if (!titleShown) {
            titleShown = true;
            splash.classList.add("is-title");
            finishTimer = window.setTimeout(finishSplash, 1400);
          }
        }

        if (phase === "dissolve" && phaseT > 0.65) {
          phase = "gone";
          phaseT = 0;
        }

        if (phase !== "gone") {
          const showN = phase === "appear" ? Math.floor(revealed) : particles.length;
          for (let i = 0; i < showN; i++) {
            const p = particles[i];
            if (!p.started) {
              p.started = true;
              p.t = 0;
              p.x = p.tx;
              p.y = p.ty;
            }
            p.t += dt;

            if (phase === "appear" || phase === "hold") {
              const u = Math.min(1, p.t / 0.28);
              const e = 1 - Math.pow(1 - u, 3);
              p.x = p.tx;
              p.y = p.ty;
              p.a = Math.min(1, e * 1.1);
              p.scale = 0.45 + 0.55 * e;
            } else if (phase === "dissolve") {
              p.x += p.vx * dt;
              p.y += p.vy * dt;
              p.vy += 200 * dt;
              p.a = Math.max(0, 1 - phaseT * 1.9);
              p.scale = Math.max(0.25, 1 - phaseT * 0.55);
              if (p.a <= 0.01) continue;
            }

            drawStar(ctx, p);
          }
        }

        raf = requestAnimationFrame(draw);
      };

      raf = requestAnimationFrame(draw);
    };

    document.getElementById("splashSkip")?.addEventListener("click", finishSplash);
    splash.addEventListener("click", (e) => {
      if (e.target?.id === "splashSkip") return;
      finishSplash();
    });
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finishSplash();
      },
      { once: true }
    );

    runSplash();
  });

  /* Parallax sky */
  const sky = document.getElementById("skyDeck");
  if (sky && !reduce) {
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    window.addEventListener(
      "pointermove",
      (e) => {
        tx = (e.clientX / window.innerWidth - 0.5) * 28;
        ty = (e.clientY / window.innerHeight - 0.5) * 16;
      },
      { passive: true }
    );
    const tick = () => {
      px += (tx - px) * 0.06;
      py += (ty - py) * 0.06;
      sky.style.transform = `translate3d(calc(-50% + ${px}px), ${py}px, 0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* Starfield + shooting stars */
  if (canvas?.getContext) {
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let stars = [];
    let meteors = [];
    let raf = 0;
    let nextMeteor = 0;

    const spawnMeteor = () => {
      const fromRight = Math.random() > 0.35;
      const x = fromRight ? w * (0.35 + Math.random() * 0.65) : Math.random() * w * 0.5;
      const y = Math.random() * h * 0.35;
      const len = 80 + Math.random() * 120;
      const speed = 10 + Math.random() * 14;
      const angle = (fromRight ? 0.65 : 0.45) + Math.random() * 0.25;
      meteors.push({
        x,
        y,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len,
        life: 1,
        decay: 0.018 + Math.random() * 0.012,
      });
    };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(160, Math.floor((w * h) / 14000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random() * 0.55 + 0.2,
        tw: Math.random() * Math.PI * 2,
        sp: 0.008 + Math.random() * 0.02,
      }));
      nextMeteor = performance.now() + 900;
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.tw += s.sp;
        const alpha = s.a * (0.55 + 0.45 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.fillStyle =
          s.tw % 3 > 2.2
            ? `rgba(243, 230, 184, ${alpha})`
            : `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (now > nextMeteor && meteors.length < 3) {
        spawnMeteor();
        nextMeteor = now + 1800 + Math.random() * 4200;
      }

      meteors = meteors.filter((m) => m.life > 0.02);
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;
        const tx = m.x - m.vx * (m.len / 14);
        const ty = m.y - m.vy * (m.len / 14);
        const grad = ctx.createLinearGradient(tx, ty, m.x, m.y);
        grad.addColorStop(0, "rgba(243, 230, 184, 0)");
        grad.addColorStop(0.55, `rgba(243, 230, 184, ${0.35 * m.life})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${0.95 * m.life})`);
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.moveTo(tx, ty);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 248, 231, ${m.life})`;
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduce) requestAnimationFrame(draw);
    else {
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(243, 230, 184, ${s.a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(draw);
    });
  }

  const nodes = [...document.querySelectorAll("[data-reveal]")];
  if (nodes.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
      );
      nodes.forEach((n, i) => {
        n.style.transitionDelay = `${(i % 4) * 50}ms`;
        io.observe(n);
      });
    }
  }

  /* Panel detail modal */
  const modal = document.getElementById("panelModal");
  const modalTitle = document.getElementById("panelModalTitle");
  const modalBody = document.getElementById("panelModalBody");
  const modalKicker = document.getElementById("panelModalKicker");

  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.removeProperty("overflow");
  };

  const openModal = (el) => {
    if (!modal) return;
    const titleEl = el.querySelector("h3, .eyebrow, strong");
    const kickerEl = el.querySelector(".theme-num, .todo-label, .total, time");
    const title =
      (el.dataset.title || titleEl?.textContent || t("modal.detail")).trim() ||
      t("modal.detail");
    const kicker =
      (el.dataset.kicker || kickerEl?.textContent || t("modal.panel")).trim();
    const detail = (el.dataset.detail || "").trim() || t("modal.empty");

    modalTitle.textContent = title;
    modalKicker.textContent = kicker;
    modalBody.textContent = detail;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  document.querySelectorAll(".panel").forEach((el) => {
    el.classList.add("panel-open");
    el.setAttribute("role", "button");
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    if (!el.querySelector(".panel-hint")) {
      const hint = document.createElement("span");
      hint.className = "panel-hint";
      hint.textContent = t("modal.hint");
      el.appendChild(hint);
    }

    el.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      openModal(el);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(el);
      }
    });
  });

  modal?.querySelectorAll("[data-close]").forEach((node) => {
    node.addEventListener("click", closeModal);
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });
})();
