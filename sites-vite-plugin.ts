@import "tailwindcss";

:root {
  --ivory: #f6f1e7;
  --paper: #fffdf8;
  --paper-deep: #eee6d8;
  --navy: #102d47;
  --navy-soft: #25465f;
  --burgundy: #8c263b;
  --burgundy-dark: #67192b;
  --brass: #aa8750;
  --brass-light: #d5c09a;
  --ink: #172c3d;
  --muted: #756f66;
  --line: #d7cdbd;
  --success: #2f7256;
  --warning: #9a5a1e;
  --shadow: 0 20px 50px rgba(35, 35, 28, 0.12), 0 3px 9px rgba(35, 35, 28, 0.08);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background:
    radial-gradient(circle at 10% 20%, rgba(170, 135, 80, 0.07), transparent 24rem),
    radial-gradient(circle at 88% 8%, rgba(140, 38, 59, 0.045), transparent 26rem),
    var(--ivory);
  color: var(--ink);
  font-family: Inter, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  text-rendering: optimizeLegibility;
}

body::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  content: "";
  opacity: 0.28;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(16, 45, 71, 0.015) 4px),
    repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(16, 45, 71, 0.012) 6px);
}

button,
select,
textarea {
  font: inherit;
}

button {
  color: inherit;
}

button:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid rgba(170, 135, 80, 0.34);
  outline-offset: 3px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.site-shell {
  min-height: 100vh;
  overflow: hidden;
}

.site-header {
  position: relative;
  z-index: 20;
  display: grid;
  grid-template-columns: minmax(300px, 1fr) auto auto auto;
  align-items: center;
  min-height: 108px;
  padding: 18px clamp(28px, 5.2vw, 78px);
  border-bottom: 1px solid rgba(170, 135, 80, 0.72);
  background: rgba(250, 247, 240, 0.93);
  backdrop-filter: blur(16px);
}

.language-toggle {
  display: inline-flex;
  min-height: 42px;
  padding: 7px 12px;
  border: 1px solid var(--brass-light);
  border-radius: 999px;
  background: var(--paper);
  color: var(--muted);
  cursor: pointer;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 800;
}

.language-toggle i {
  color: var(--brass-light);
  font-style: normal;
}

.language-toggle .active {
  color: var(--burgundy);
}

.brand {
  display: inline-flex;
  width: fit-content;
  padding: 0 50px 0 0;
  border: 0;
  border-right: 1px solid var(--brass-light);
  background: transparent;
  cursor: pointer;
  flex-direction: column;
  align-items: flex-start;
}

.brand-name {
  color: var(--navy);
  font-family: Georgia, "Times New Roman", "Songti SC", serif;
  font-size: clamp(22px, 2.05vw, 34px);
  line-height: 1.06;
  letter-spacing: -0.035em;
}

.brand-subtitle {
  margin-top: 8px;
  color: var(--brass);
  font-family: Georgia, "Songti SC", serif;
  font-size: 14px;
  letter-spacing: 0.22em;
}

.main-nav {
  display: flex;
  gap: 58px;
  padding: 0 42px;
}

.nav-link {
  position: relative;
  padding: 14px 0;
  border: 0;
  background: transparent;
  color: var(--navy);
  cursor: pointer;
  font-size: 17px;
  font-weight: 600;
}

.nav-link::after {
  position: absolute;
  right: 50%;
  bottom: 5px;
  left: 50%;
  height: 2px;
  content: "";
  background: var(--burgundy);
  transition: left 180ms ease, right 180ms ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  right: 0;
  left: 0;
}

.header-mark {
  justify-self: end;
  display: grid;
  width: 44px;
  height: 44px;
  border: 1px solid var(--brass-light);
  border-radius: 50%;
  place-items: center;
  color: var(--brass);
  font-family: Georgia, serif;
  font-size: 11px;
  letter-spacing: 0.08em;
}

.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(500px, 1.1fr);
  gap: clamp(46px, 6vw, 94px);
  min-height: 720px;
  padding: clamp(80px, 8vw, 122px) clamp(44px, 8.7vw, 132px) 96px;
}

.hero-copy {
  position: relative;
  z-index: 2;
  align-self: center;
  max-width: 620px;
}

.eyebrow,
.section-kicker {
  margin: 0 0 30px;
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.19em;
}

.eyebrow::after {
  display: block;
  width: 88px;
  height: 1px;
  margin-top: 18px;
  content: "";
  background: var(--brass);
}

.hero h1 {
  margin: 0;
  color: var(--navy);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(72px, 7.25vw, 116px);
  font-weight: 400;
  line-height: 0.89;
  letter-spacing: -0.065em;
}

.hero-cn {
  margin: 32px 0 0;
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: clamp(23px, 2vw, 31px);
  letter-spacing: 0.04em;
}

.ornament-line {
  display: flex;
  align-items: center;
  width: min(350px, 90%);
  height: 14px;
  margin: 28px 0 22px;
}

.ornament-line::before,
.ornament-line::after {
  height: 1px;
  content: "";
  background: var(--brass-light);
  flex: 1;
}

.ornament-line span {
  width: 7px;
  height: 7px;
  margin: 0 10px;
  background: var(--brass);
  transform: rotate(45deg);
}

.hero-description {
  max-width: 570px;
  margin: 0 0 34px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.9;
}

.primary-button {
  display: inline-flex;
  min-height: 58px;
  padding: 0 30px;
  border: 1px solid var(--burgundy);
  border-radius: 8px;
  background: linear-gradient(135deg, var(--burgundy), var(--burgundy-dark));
  box-shadow: 0 10px 24px rgba(103, 25, 43, 0.18);
  color: #fffaf0;
  cursor: pointer;
  transition: transform 170ms ease, box-shadow 170ms ease, background 170ms ease;
  align-items: center;
  justify-content: center;
  gap: 22px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.primary-button:hover {
  box-shadow: 0 13px 28px rgba(103, 25, 43, 0.25);
  transform: translateY(-2px);
}

.hero-cta {
  min-width: 280px;
  font-family: Georgia, "Songti SC", serif;
  font-size: 20px;
  font-weight: 500;
}

.primary-button.compact {
  min-height: 48px;
  padding: 0 24px;
  font-size: 14px;
}

.micro-copy {
  margin: 20px 0 0;
  color: #968b7a;
  font-family: Georgia, serif;
  font-size: 13px;
  letter-spacing: 0.04em;
}

.hero-practice-card {
  position: relative;
  z-index: 3;
  align-self: center;
  min-height: 530px;
  padding: 30px 32px;
  border: 1px solid #cfc3b2;
  border-radius: 20px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(251, 247, 239, 0.94)),
    var(--paper);
  box-shadow: var(--shadow);
}

.hero-practice-card::before {
  position: absolute;
  top: 12px;
  right: 12px;
  bottom: -12px;
  left: -12px;
  z-index: -1;
  border: 1px solid rgba(170, 135, 80, 0.22);
  border-radius: 20px;
  content: "";
}

.card-topline,
.question-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.subject-pill {
  display: inline-flex;
  min-height: 34px;
  padding: 0 16px;
  border-radius: 99px;
  background: var(--navy);
  color: white;
  align-items: center;
  font-family: Georgia, serif;
  font-size: 14px;
}

.source-tag,
.difficulty-tag {
  padding: 8px 12px;
  border: 1px solid var(--line);
  border-radius: 99px;
  background: #f5f0e8;
  color: var(--muted);
  font-family: Georgia, serif;
  font-size: 12px;
}

.question-number {
  margin-top: 30px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  color: var(--brass);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.18em;
}

.hero-practice-card h2 {
  min-height: 112px;
  margin: 18px 0 22px;
  color: var(--navy);
  font-family: Georgia, serif;
  font-size: clamp(24px, 2vw, 31px);
  font-weight: 400;
  line-height: 1.3;
}

.preview-answer {
  display: flex;
  min-height: 108px;
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.58);
  color: #8d887f;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.7;
  transition: border 180ms ease, background 180ms ease;
}

.preview-answer.revealed {
  border-color: var(--brass-light);
  background: #faf2df;
  color: var(--ink);
}

.hint-preview {
  margin-top: 23px;
}

.hint-preview-label,
.guidance-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--navy);
  font-size: 14px;
  font-weight: 700;
}

.bulb {
  display: inline-grid;
  width: 28px;
  height: 28px;
  border: 1px solid var(--brass);
  border-radius: 50%;
  background: #f5ead2;
  color: #8f6d35;
  place-items: center;
  font-family: Georgia, serif;
  font-weight: 700;
}

.hint-rail,
.hint-progress {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 16px;
}

.hint-rail span,
.hint-progress span {
  position: relative;
  z-index: 1;
  display: grid;
  width: 36px;
  height: 36px;
  border: 1px solid #cbbda7;
  border-radius: 50%;
  background: var(--paper);
  color: var(--muted);
  place-items: center;
  font-family: Georgia, serif;
}

.hint-rail span:not(:last-child)::after,
.hint-progress span:not(:last-child)::after {
  position: absolute;
  top: 17px;
  left: 35px;
  z-index: -1;
  width: calc(300% - 35px);
  height: 1px;
  content: "";
  background: #d8ccba;
}

.hint-rail span:nth-child(2),
.hint-progress span:nth-child(2) {
  justify-self: center;
}

.hint-rail span:nth-child(3),
.hint-progress span:nth-child(3) {
  justify-self: end;
}

.hint-rail span.active,
.hint-progress span.active {
  border-color: var(--burgundy);
  background: var(--burgundy);
  color: white;
}

.preview-actions {
  display: flex;
  margin-top: 26px;
  align-items: center;
  justify-content: space-between;
}

.text-button {
  border: 0;
  background: transparent;
  color: var(--burgundy);
  cursor: pointer;
  font-weight: 700;
}

.outline-button,
.quiet-button {
  display: inline-flex;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid var(--navy);
  border-radius: 7px;
  background: transparent;
  color: var(--navy);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 18px;
  font-weight: 650;
  transition: background 160ms ease, color 160ms ease;
}

.outline-button:hover,
.quiet-button:hover {
  background: var(--navy);
  color: white;
}

.hero-grid-decoration {
  position: absolute;
  top: 50px;
  right: 28px;
  width: 92px;
  height: 150px;
  opacity: 0.35;
  background-image:
    linear-gradient(var(--brass-light) 1px, transparent 1px),
    linear-gradient(90deg, var(--brass-light) 1px, transparent 1px);
  background-size: 24px 24px;
}

.margin-ruler {
  position: absolute;
  top: 70px;
  bottom: 70px;
  left: 42px;
  width: 1px;
  background: var(--brass-light);
}

.margin-ruler::before {
  position: absolute;
  top: 0;
  right: -10px;
  width: 20px;
  height: 1px;
  content: "";
  background: var(--brass);
  box-shadow: 0 120px 0 var(--brass), 0 240px 0 var(--brass), 0 360px 0 var(--brass), 0 480px 0 var(--brass);
}

.margin-ruler span {
  position: absolute;
  bottom: -25px;
  left: -7px;
  color: var(--brass);
  font-family: Georgia, serif;
  font-size: 11px;
}

.method-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 clamp(28px, 6vw, 90px);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.method-strip div {
  display: flex;
  min-height: 120px;
  padding: 24px;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.method-strip div + div {
  border-left: 1px solid var(--line);
}

.method-strip strong {
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: 400;
}

.method-strip span {
  color: var(--muted);
  font-size: 13px;
}

.how-it-works,
.final-cta {
  width: min(1220px, calc(100% - 56px));
  margin: 0 auto;
}

.how-it-works {
  padding: 112px 0;
  text-align: center;
}

.section-kicker {
  margin-bottom: 16px;
  font-size: 11px;
}

.how-it-works > h2,
.final-cta h2,
.section-heading-row h2 {
  margin: 0;
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: clamp(34px, 4vw, 56px);
  font-weight: 400;
  letter-spacing: -0.035em;
}

.method-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 56px;
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 253, 248, 0.55);
  text-align: left;
}

.method-cards article {
  min-height: 250px;
  padding: 34px;
}

.method-cards article + article {
  border-left: 1px solid var(--line);
}

.method-cards article > span {
  color: var(--brass);
  font-family: Georgia, serif;
  font-size: 15px;
}

.method-cards h3 {
  margin: 38px 0 14px;
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: 23px;
  font-weight: 500;
}

.method-cards p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.8;
}

.final-cta {
  display: flex;
  margin-bottom: 110px;
  padding: 52px 58px;
  border: 1px solid var(--brass-light);
  border-radius: 14px;
  background: var(--paper);
  box-shadow: 8px 8px 0 rgba(170, 135, 80, 0.12);
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.final-cta h2 {
  max-width: 720px;
  font-size: clamp(30px, 3vw, 44px);
}

.workspace-page {
  width: min(1260px, calc(100% - 56px));
  min-height: 720px;
  margin: 0 auto;
  padding: 72px 0 100px;
}

.page-heading {
  display: flex;
  margin-bottom: 54px;
  padding-bottom: 34px;
  border-bottom: 1px solid var(--line);
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.page-heading h1 {
  margin: 0;
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: clamp(42px, 5vw, 70px);
  font-weight: 400;
  letter-spacing: -0.05em;
}

.page-heading p:not(.section-kicker) {
  max-width: 700px;
  margin: 16px 0 0;
  color: var(--muted);
  line-height: 1.75;
}

.setup-block {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 48px;
  padding: 42px 0;
  border-bottom: 1px solid var(--line);
}

.setup-step {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

.setup-step > span {
  color: var(--brass);
  font-family: Georgia, serif;
  font-size: 15px;
}

.setup-step h2 {
  margin: 0;
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: 24px;
  font-weight: 500;
}

.setup-step p {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.subject-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.subject-choice {
  position: relative;
  display: flex;
  min-height: 92px;
  padding: 16px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(255, 253, 248, 0.65);
  cursor: pointer;
  align-items: center;
  text-align: left;
  gap: 13px;
  transition: border 170ms ease, background 170ms ease, transform 170ms ease;
}

.subject-choice:hover {
  border-color: var(--brass);
  transform: translateY(-1px);
}

.subject-choice.selected {
  border-color: var(--navy);
  background: #eef0ec;
  box-shadow: inset 3px 0 0 var(--burgundy);
}

.subject-icon {
  display: grid;
  width: 42px;
  height: 42px;
  border: 1px solid var(--brass-light);
  border-radius: 50%;
  color: var(--burgundy);
  place-items: center;
  font-family: Georgia, serif;
  font-size: 16px;
  flex: 0 0 auto;
}

.subject-choice > span:nth-child(2) {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.subject-choice strong {
  color: var(--navy);
  font-size: 14px;
}

.subject-choice small {
  margin-top: 4px;
  overflow: hidden;
  color: var(--muted);
  font-family: Georgia, serif;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.choice-check {
  margin-left: auto;
  color: var(--burgundy);
  font-size: 15px;
  font-weight: 800;
}

.source-choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.source-choice {
  display: flex;
  min-height: 116px;
  padding: 23px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--paper);
  cursor: pointer;
  align-items: flex-start;
  text-align: left;
  gap: 15px;
}

.source-choice.selected {
  border-color: var(--burgundy);
  box-shadow: 0 10px 26px rgba(103, 25, 43, 0.08);
}

.radio-dot {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  border: 1px solid var(--brass);
  border-radius: 50%;
  box-shadow: inset 0 0 0 4px var(--paper);
  flex: 0 0 auto;
}

.source-choice.selected .radio-dot {
  background: var(--burgundy);
}

.source-choice > span:last-child {
  display: flex;
  flex-direction: column;
}

.source-choice strong {
  color: var(--navy);
}

.source-choice small {
  margin-top: 9px;
  color: var(--muted);
  line-height: 1.6;
}

.compact-options {
  align-items: center;
}

.count-picker {
  display: flex;
  gap: 12px;
}

.count-picker button {
  display: flex;
  min-width: 168px;
  min-height: 82px;
  padding: 14px 18px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper);
  cursor: pointer;
  align-items: center;
  gap: 16px;
}

.count-picker button.selected {
  border-color: var(--navy);
  background: #eef0ec;
}

.count-picker strong {
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 34px;
  font-weight: 400;
}

.count-picker span {
  color: var(--navy);
  font-weight: 700;
}

.setup-summary {
  position: sticky;
  bottom: 20px;
  z-index: 10;
  display: flex;
  margin-top: 44px;
  padding: 20px 22px 20px 28px;
  border: 1px solid var(--brass-light);
  border-radius: 12px;
  background: rgba(255, 253, 248, 0.95);
  box-shadow: var(--shadow);
  backdrop-filter: blur(12px);
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.setup-summary > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.setup-summary span {
  color: var(--brass);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.setup-summary strong {
  color: var(--navy);
}

.interview-page {
  display: grid;
  grid-template-columns: 270px minmax(0, 1fr);
  min-height: calc(100vh - 108px);
}

.session-sidebar {
  display: flex;
  padding: 42px 26px;
  border-right: 1px solid var(--line);
  background: rgba(239, 232, 220, 0.64);
  flex-direction: column;
}

.session-brand {
  display: flex;
  padding-bottom: 26px;
  border-bottom: 1px solid var(--line);
  flex-direction: column;
  gap: 8px;
}

.session-brand span,
.session-clock small {
  color: var(--burgundy);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.session-brand strong {
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: 23px;
  font-weight: 500;
}

.session-clock {
  display: flex;
  padding: 25px 0;
  border-bottom: 1px solid var(--line);
  flex-direction: column;
  gap: 6px;
}

.session-clock strong {
  color: var(--navy);
  font-family: Georgia, serif;
  font-size: 34px;
  font-weight: 400;
  letter-spacing: 0.04em;
}

.question-nav {
  margin: 22px 0;
  padding: 0;
  list-style: none;
}

.question-nav button {
  display: grid;
  grid-template-columns: 34px 1fr 10px;
  width: 100%;
  padding: 15px 11px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  align-items: center;
  text-align: left;
  gap: 9px;
}

.question-nav button.active {
  background: var(--paper);
  box-shadow: 0 5px 16px rgba(16, 45, 71, 0.07);
}

.question-nav button > span:first-child {
  color: var(--brass);
  font-family: Georgia, serif;
  font-size: 13px;
}

.question-nav button > span:nth-child(2) {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.question-nav strong {
  color: var(--navy);
  font-size: 12px;
}

.question-nav small {
  color: var(--muted);
  font-size: 10px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border: 1px solid var(--brass);
  border-radius: 50%;
}

.status-dot.complete {
  border-color: var(--success);
  background: var(--success);
}

.sidebar-note {
  margin-top: auto;
  padding: 18px;
  border: 1px solid var(--brass-light);
  border-radius: 10px;
  background: rgba(255, 253, 248, 0.6);
}

.sidebar-note strong {
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: 14px;
}

.sidebar-note p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.7;
}

.quiet-button.full {
  width: 100%;
  margin-top: 14px;
}

.interview-workspace {
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  padding: 48px 0 64px;
}

.question-meta {
  margin-bottom: 18px;
}

.question-meta > div {
  display: flex;
  gap: 10px;
}

.session-progress {
  color: var(--brass);
  font-family: Georgia, serif;
  font-size: 16px;
}

.question-panel {
  padding: 34px 38px;
  border: 1px solid var(--line);
  border-radius: 15px;
  background: var(--paper);
  box-shadow: 7px 7px 0 rgba(170, 135, 80, 0.11);
}

.question-source {
  margin: 0 0 16px;
  color: var(--burgundy);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.question-panel h1 {
  max-width: 940px;
  margin: 0;
  color: var(--navy);
  font-family: Georgia, serif;
  font-size: clamp(27px, 3.1vw, 43px);
  font-weight: 400;
  line-height: 1.22;
  letter-spacing: -0.025em;
}

.question-guide {
  margin: 20px 0 0;
  padding-left: 15px;
  border-left: 2px solid var(--brass);
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.anchor-row {
  display: flex;
  margin-top: 24px;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
}

.anchor-row > span {
  margin-right: 4px;
  color: var(--brass);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.anchor-row em,
.bank-anchors span {
  padding: 6px 9px;
  border: 1px solid var(--line);
  border-radius: 99px;
  color: var(--navy-soft);
  font-size: 10px;
  font-style: normal;
}

.response-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(390px, 0.85fr);
  gap: 18px;
  margin-top: 20px;
}

.answer-panel,
.guidance-panel {
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255, 253, 248, 0.7);
}

.answer-panel {
  align-self: start;
}

.answer-panel label {
  display: flex;
  margin-bottom: 10px;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.answer-panel label:not(:first-child) {
  margin-top: 24px;
}

.answer-panel label > span:first-child {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.answer-panel label strong {
  color: var(--navy);
  font-size: 14px;
}

.answer-panel label small,
.answer-panel label > span:last-child {
  color: var(--muted);
  font-size: 10px;
}

.answer-panel textarea {
  width: 100%;
  min-height: 120px;
  padding: 16px;
  resize: vertical;
  border: 1px solid #cec4b5;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.62);
  color: var(--ink);
  line-height: 1.75;
}

.answer-panel textarea.main-answer {
  min-height: 230px;
}

.answer-panel textarea:focus {
  border-color: var(--brass);
  background: white;
}

.guidance-panel {
  align-self: start;
}

.guidance-heading > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.guidance-heading > span:last-child {
  margin-left: auto;
  color: var(--burgundy);
  font-family: Georgia, serif;
}

.guidance-heading small {
  color: var(--muted);
  font-size: 9px;
  font-weight: 500;
}

.hint-progress {
  margin: 24px 0;
}

.hint-progress span {
  width: 30px;
  height: 30px;
  font-size: 12px;
}

.hint-progress span:not(:last-child)::after {
  top: 14px;
  left: 29px;
  width: calc(300% - 29px);
}

.revealed-hints {
  display: flex;
  max-height: 520px;
  overflow: auto;
  flex-direction: column;
  gap: 10px;
}

.hint-placeholder,
.hint-item {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.55);
}

.hint-placeholder p,
.hint-item p {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.75;
}

.hint-item {
  border-color: var(--brass-light);
  background: #fbf3e3;
}

.hint-item > span {
  display: block;
  margin-bottom: 7px;
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hint-button {
  width: 100%;
  min-height: 46px;
  margin-top: 15px;
  padding: 10px 14px;
  border: 1px solid var(--burgundy);
  border-radius: 8px;
  background: transparent;
  color: var(--burgundy);
  cursor: pointer;
  font-size: 12px;
  font-weight: 750;
}

.hint-button:hover {
  background: var(--burgundy);
  color: white;
}

.model-answer {
  margin-top: 15px;
  padding: 18px;
  border: 1px solid var(--navy);
  border-radius: 9px;
  background: #edf0ef;
}

.model-answer > span {
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.model-answer p {
  margin: 10px 0;
  color: var(--ink);
  font-family: Georgia, serif;
  font-size: 13px;
  line-height: 1.7;
}

.model-answer small {
  display: block;
  padding-top: 9px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 9px;
  line-height: 1.55;
}

.validation-message {
  margin-top: 16px;
  padding: 13px 16px;
  border-left: 3px solid var(--burgundy);
  border-radius: 5px;
  background: #f5e5e5;
  color: var(--burgundy-dark);
  font-size: 12px;
}

.session-actions {
  display: flex;
  margin-top: 24px;
  justify-content: flex-end;
  gap: 12px;
}

.results-hero {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 42px;
  padding: 46px;
  border: 1px solid var(--brass-light);
  border-radius: 16px;
  background: var(--paper);
  box-shadow: var(--shadow);
  align-items: center;
}

.score-seal {
  display: grid;
  width: 160px;
  height: 160px;
  border: 1px solid var(--brass);
  border-radius: 50%;
  box-shadow: inset 0 0 0 8px var(--paper), inset 0 0 0 9px var(--brass-light);
  place-items: center;
  align-content: center;
}

.score-seal span {
  color: var(--burgundy);
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.score-seal strong {
  color: var(--navy);
  font-family: Georgia, serif;
  font-size: 58px;
  font-weight: 400;
  line-height: 0.95;
}

.score-seal small {
  color: var(--muted);
  font-family: Georgia, serif;
}

.results-hero h1 {
  max-width: 820px;
  margin: 0;
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: clamp(32px, 4vw, 54px);
  font-weight: 400;
  letter-spacing: -0.04em;
}

.results-hero p:not(.section-kicker) {
  max-width: 780px;
  margin: 17px 0 0;
  color: var(--muted);
  line-height: 1.8;
}

.dimension-card {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 50px;
  margin-top: 26px;
  padding: 34px 40px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255, 253, 248, 0.65);
}

.dimension-intro span {
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: 22px;
}

.dimension-intro p {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.7;
}

.score-bars {
  display: grid;
  gap: 13px;
}

.score-row {
  display: grid;
  grid-template-columns: 90px 1fr 30px;
  align-items: center;
  gap: 14px;
}

.score-row > span {
  color: var(--navy);
  font-size: 12px;
  font-weight: 650;
}

.score-row > div {
  height: 7px;
  overflow: hidden;
  border-radius: 99px;
  background: #ded7cc;
}

.score-row i {
  display: block;
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, var(--burgundy), var(--brass));
  transition: width 600ms ease;
}

.score-row strong {
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 15px;
}

.question-diagnostics {
  margin-top: 70px;
}

.section-heading-row {
  display: flex;
  margin-bottom: 28px;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
}

.section-heading-row h2 {
  font-size: 39px;
}

.section-heading-row > span {
  color: var(--muted);
  font-size: 11px;
}

.diagnostic-item {
  border-top: 1px solid var(--line);
}

.diagnostic-item:last-child {
  border-bottom: 1px solid var(--line);
}

.diagnostic-item summary {
  display: grid;
  grid-template-columns: 54px 1fr 60px;
  min-height: 100px;
  padding: 22px 12px;
  cursor: pointer;
  align-items: center;
  gap: 20px;
  list-style: none;
}

.diagnostic-item summary::-webkit-details-marker {
  display: none;
}

.diagnostic-number {
  color: var(--brass);
  font-family: Georgia, serif;
  font-size: 18px;
}

.diagnostic-item summary > span:nth-child(2) {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.diagnostic-item summary strong {
  color: var(--navy);
  font-family: Georgia, serif;
  font-size: 18px;
  font-weight: 500;
}

.diagnostic-item summary small {
  color: var(--muted);
  font-size: 10px;
}

.diagnostic-score {
  display: grid;
  width: 48px;
  height: 48px;
  border: 1px solid var(--burgundy);
  border-radius: 50%;
  color: var(--burgundy);
  place-items: center;
  font-family: Georgia, serif;
  font-size: 20px;
}

.diagnostic-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 0 12px 30px 86px;
}

.feedback-column {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper);
}

.feedback-column h3 {
  margin: 0;
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: 17px;
  font-weight: 500;
}

.feedback-column ul {
  margin: 14px 0 0;
  padding-left: 18px;
}

.feedback-column li {
  margin: 7px 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.7;
}

.positive {
  box-shadow: inset 3px 0 0 var(--success);
}

.improve {
  box-shadow: inset 3px 0 0 var(--brass);
}

.follow-up-box {
  display: flex;
  grid-column: 1 / -1;
  padding: 20px 22px;
  border: 1px solid var(--navy);
  border-radius: 10px;
  background: #eef0ed;
  flex-direction: column;
  gap: 8px;
}

.follow-up-box span {
  color: var(--burgundy);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.follow-up-box strong {
  color: var(--navy);
  font-family: Georgia, serif;
  font-size: 18px;
  font-weight: 500;
}

.results-actions {
  display: flex;
  margin-top: 44px;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--paper);
  align-items: center;
  gap: 12px;
}

.results-actions > div {
  display: flex;
  margin-right: auto;
  flex-direction: column;
  gap: 5px;
}

.results-actions strong {
  color: var(--navy);
}

.results-actions span {
  color: var(--muted);
  font-size: 11px;
}

.bank-count {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.bank-count strong {
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 48px;
  font-weight: 400;
}

.bank-count span {
  color: var(--muted);
  font-family: Georgia, serif;
  font-size: 13px;
}

.bank-filters {
  display: flex;
  margin-bottom: 34px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(255, 253, 248, 0.7);
  gap: 18px;
}

.bank-filters label {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
}

.bank-filters label > span {
  color: var(--brass);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.bank-filters select {
  width: 100%;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: var(--paper);
  color: var(--navy);
}

.bank-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.bank-card {
  position: relative;
  display: flex;
  min-height: 390px;
  padding: 28px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 13px;
  background: var(--paper);
  flex-direction: column;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.bank-card:hover {
  box-shadow: 8px 8px 0 rgba(170, 135, 80, 0.12);
  transform: translateY(-2px);
}

.bank-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bank-card-top > span:first-child {
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 12px;
  font-weight: 700;
}

.bank-card-top > span:last-child {
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.11em;
}

.bank-card-top .past {
  background: var(--navy);
  color: white;
}

.bank-card-top .mock {
  background: #ead6a9;
  color: var(--burgundy-dark);
}

.bank-index {
  position: absolute;
  top: 52px;
  right: 20px;
  color: rgba(170, 135, 80, 0.12);
  font-family: Georgia, serif;
  font-size: 76px;
}

.bank-card h2 {
  position: relative;
  max-width: 90%;
  margin: 40px 0 16px;
  color: var(--navy);
  font-family: Georgia, serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.34;
}

.bank-card > p {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.75;
}

.bank-anchors {
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 7px;
}

.bank-card-footer {
  display: flex;
  margin-top: auto;
  padding-top: 23px;
  border-top: 1px solid var(--line);
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.bank-card-footer small {
  color: var(--muted);
  font-size: 9px;
}

.bank-card-footer button {
  border: 0;
  background: transparent;
  color: var(--burgundy);
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
}

.empty-history {
  display: flex;
  min-height: 430px;
  padding: 50px;
  border: 1px dashed var(--brass-light);
  border-radius: 14px;
  background: rgba(255, 253, 248, 0.55);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.empty-mark {
  color: var(--brass);
  font-family: Georgia, serif;
  font-size: 58px;
}

.empty-history h2 {
  margin: 12px 0 8px;
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: 30px;
  font-weight: 400;
}

.empty-history p {
  margin: 0 0 25px;
  color: var(--muted);
}

.history-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 38px;
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  background: var(--paper);
}

.history-summary div {
  display: flex;
  min-height: 122px;
  padding: 28px;
  align-items: center;
  justify-content: space-between;
}

.history-summary div + div {
  border-left: 1px solid var(--line);
}

.history-summary span {
  color: var(--muted);
  font-size: 12px;
}

.history-summary strong {
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 42px;
  font-weight: 400;
}

.history-list {
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  background: var(--paper);
}

.history-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr 1.2fr 0.7fr 0.6fr;
  min-height: 72px;
  padding: 0 22px;
  border-top: 1px solid var(--line);
  align-items: center;
  gap: 14px;
  font-size: 12px;
}

.history-row:first-child {
  border-top: 0;
}

.history-head {
  min-height: 48px;
  background: #eee9df;
  color: var(--muted);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.history-row strong {
  color: var(--navy);
}

.history-score {
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 24px;
}

.site-footer {
  display: flex;
  min-height: 140px;
  padding: 36px clamp(28px, 6vw, 90px);
  border-top: 1px solid var(--brass-light);
  background: #eae3d7;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.site-footer > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.site-footer strong {
  color: var(--navy);
  font-family: Georgia, serif;
  font-size: 18px;
  font-weight: 500;
}

.site-footer span {
  color: var(--burgundy);
  font-family: Georgia, serif;
  font-size: 11px;
}

.site-footer p {
  max-width: 710px;
  margin: 0;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.7;
  text-align: right;
}

/* Readability and interactive-answer upgrades */
.question-source {
  font-size: 13px;
  line-height: 1.5;
}

.question-guide {
  font-size: 16px;
}

.anchor-row > span,
.anchor-row em,
.bank-anchors span {
  font-size: 13px;
  line-height: 1.35;
}

.answer-field + .answer-field {
  margin-top: 28px;
}

.answer-field-heading {
  display: flex;
  margin-bottom: 12px;
  align-items: flex-end;
  gap: 14px;
}

.answer-field-heading label {
  flex: 1;
  margin: 0;
}

.answer-panel label strong {
  font-size: 17px;
}

.answer-panel label small,
.answer-panel label > span:last-child {
  font-size: 14px;
  line-height: 1.45;
}

.answer-panel textarea {
  font-size: 17px;
}

.voice-button {
  display: inline-flex;
  min-height: 44px;
  padding: 9px 13px;
  border: 1px solid var(--burgundy);
  border-radius: 999px;
  background: var(--paper);
  color: var(--burgundy);
  cursor: pointer;
  white-space: nowrap;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
}

.voice-button > span {
  font-size: 10px;
}

.voice-button:hover,
.voice-button.listening {
  background: var(--burgundy);
  color: white;
}

.voice-button.listening {
  animation: listening-pulse 1.4s ease-in-out infinite;
}

.voice-button:disabled {
  border-color: var(--line);
  color: var(--muted);
  opacity: 0.65;
}

.speech-status {
  display: flex;
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  background: #f4efe5;
  color: var(--muted);
  align-items: flex-start;
  gap: 9px;
  font-size: 14px;
  line-height: 1.55;
}

.speech-status > span {
  margin-top: 3px;
  color: var(--brass);
  font-size: 10px;
}

.speech-status.active {
  background: #f4e3e5;
  color: var(--burgundy-dark);
}

@keyframes listening-pulse {
  50% {
    box-shadow: 0 0 0 6px rgba(122, 48, 65, 0.15);
  }
}

.sketch-pad {
  margin-top: 30px;
  overflow: hidden;
  border: 1px solid var(--brass-light);
  border-radius: 12px;
  background: #f8f2e7;
}

.sketch-toolbar {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid var(--line);
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.sketch-toolbar > div:first-child {
  display: flex;
  max-width: 48%;
  flex-direction: column;
  gap: 5px;
}

.sketch-toolbar strong {
  color: var(--navy);
  font-size: 17px;
}

.sketch-toolbar > div:first-child > span {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.45;
}

.sketch-tools {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 7px;
}

.sketch-tools button {
  min-height: 36px;
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--paper);
  color: var(--navy);
  cursor: pointer;
  font-size: 13px;
  font-weight: 750;
}

.sketch-tools button.active {
  border-color: var(--burgundy);
  background: var(--burgundy);
  color: white;
}

.sketch-tools label {
  display: inline-flex;
  margin: 0;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 13px;
}

.sketch-tools input[type="color"] {
  width: 34px;
  height: 34px;
  padding: 2px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: white;
}

.sketch-tools input[type="range"] {
  width: 72px;
}

.sketch-pad canvas {
  display: block;
  width: calc(100% - 24px);
  height: auto;
  margin: 12px;
  border: 1px solid #ddd4c4;
  border-radius: 7px;
  background: #fffdf8;
  cursor: crosshair;
  touch-action: none;
}

.sketch-footnote {
  margin: 0;
  padding: 0 16px 14px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
}

.guidance-heading small {
  font-size: 14px;
}

.hint-progress span {
  width: 36px;
  height: 36px;
  font-size: 15px;
}

.hint-placeholder p,
.hint-item p {
  font-size: 16px;
  line-height: 1.7;
}

.hint-item > span {
  font-size: 13px;
}

.hint-button {
  min-height: 52px;
  font-size: 15px;
}

.model-answer {
  padding: 20px;
}

.model-answer > span {
  display: block;
  font-size: 13px;
  line-height: 1.45;
}

.model-answer p {
  font-size: 16px;
  line-height: 1.75;
}

.model-answer small {
  font-size: 14px;
  line-height: 1.55;
}

.model-breakdown {
  display: grid;
  margin: 18px 0;
  gap: 10px;
}

.model-breakdown article {
  display: grid;
  grid-template-columns: 34px 1fr;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 253, 248, 0.75);
  gap: 11px;
}

.model-breakdown em {
  color: var(--brass);
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: normal;
}

.model-breakdown strong,
.full-model-response h4,
.model-quality h4 {
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: 17px;
}

.model-breakdown p {
  margin: 5px 0 0;
  font-family: inherit;
  font-size: 15px;
}

.full-model-response {
  padding: 17px;
  border-left: 4px solid var(--burgundy);
  background: var(--paper);
}

.full-model-response h4,
.model-quality h4 {
  margin: 0 0 9px;
}

.full-model-response > p {
  margin: 0 0 12px;
}

.model-diagram {
  margin: 18px 0;
  padding: 15px;
  border: 1px solid var(--brass-light);
  border-radius: 9px;
  background: #fffdf8;
}

.diagram-heading {
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  gap: 3px;
}

.diagram-heading span {
  color: var(--burgundy);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.diagram-heading strong {
  color: var(--navy);
  font-family: Georgia, "Songti SC", serif;
  font-size: 18px;
}

.model-diagram svg {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid #e4dccd;
  border-radius: 6px;
  background-image: linear-gradient(#ece7dd 1px, transparent 1px), linear-gradient(90deg, #ece7dd 1px, transparent 1px);
  background-size: 24px 24px;
}

.model-diagram svg text {
  fill: var(--navy);
  font-family: Arial, "Noto Sans SC", sans-serif;
  font-size: 16px;
}

.model-diagram figcaption {
  margin-top: 9px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.55;
}

.model-quality {
  margin-top: 18px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 253, 248, 0.75);
}

.model-quality ul {
  margin: 0;
  padding-left: 20px;
}

.model-quality li {
  margin: 7px 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.6;
}

.model-quality > div {
  display: flex;
  margin-top: 14px;
  padding-top: 13px;
  border-top: 1px solid var(--line);
  flex-direction: column;
  gap: 5px;
}

.model-quality > div span {
  color: var(--burgundy);
  font-size: 13px;
  font-weight: 800;
}

.model-quality > div strong {
  color: var(--navy);
  font-size: 16px;
  line-height: 1.55;
}

.validation-message,
.feedback-column li,
.results-actions span {
  font-size: 15px;
}

.follow-up-box span,
.bank-filters label > span,
.bank-card-footer small {
  font-size: 13px;
}

.diagnostic-sketch {
  grid-column: 1 / -1;
  padding: 18px;
  border: 1px solid var(--brass-light);
  border-radius: 10px;
  background: #f8f2e7;
}

.diagnostic-sketch span {
  display: block;
  margin-bottom: 10px;
  color: var(--burgundy);
  font-size: 14px;
  font-weight: 800;
}

.diagnostic-sketch img {
  display: block;
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: white;
}

.bank-card-top {
  gap: 12px;
}

.bank-card-top > span:first-child {
  font-size: 14px;
}

.bank-card-tags {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 6px;
}

.bank-card-tags span {
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.bank-card-tags .draw-badge {
  border: 1px solid var(--brass);
  background: transparent;
  color: var(--burgundy);
}

.bank-card > p {
  font-size: 15px;
}

.bank-card-footer button {
  font-size: 14px;
}

.site-footer p {
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 1100px) {
  .site-header {
    grid-template-columns: 1fr auto auto;
  }

  .main-nav {
    gap: 30px;
    padding: 0;
  }

  .header-mark {
    display: none;
  }

  .hero {
    grid-template-columns: 1fr;
    padding-left: 92px;
  }

  .hero-copy {
    max-width: 760px;
  }

  .hero-practice-card {
    width: min(720px, 100%);
  }

  .setup-block {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .response-layout {
    grid-template-columns: 1fr;
  }

  .guidance-panel {
    width: 100%;
  }

  .dimension-card {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 820px) {
  .site-header {
    display: flex;
    min-height: auto;
    padding: 18px 22px;
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }

  .brand {
    padding-right: 0;
    border-right: 0;
  }

  .main-nav {
    width: 100%;
    justify-content: space-between;
  }

  .nav-link {
    font-size: 14px;
  }

  .hero {
    padding: 68px 24px 68px 58px;
  }

  .margin-ruler {
    left: 25px;
  }

  .hero h1 {
    font-size: clamp(58px, 16vw, 86px);
  }

  .hero-practice-card {
    min-height: auto;
    padding: 24px;
  }

  .method-strip {
    grid-template-columns: 1fr 1fr;
    margin: 0 22px;
  }

  .method-strip div:nth-child(3) {
    border-left: 0;
    border-top: 1px solid var(--line);
  }

  .method-strip div:nth-child(4) {
    border-top: 1px solid var(--line);
  }

  .method-cards {
    grid-template-columns: 1fr;
  }

  .method-cards article + article {
    border-top: 1px solid var(--line);
    border-left: 0;
  }

  .final-cta,
  .page-heading,
  .results-actions,
  .site-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .subject-grid,
  .source-choices,
  .bank-grid {
    grid-template-columns: 1fr;
  }

  .setup-summary {
    position: static;
    align-items: stretch;
    flex-direction: column;
  }

  .interview-page {
    display: block;
  }

  .session-sidebar {
    padding: 22px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .session-clock,
  .sidebar-note,
  .session-sidebar > .quiet-button {
    display: none;
  }

  .question-nav {
    display: flex;
    margin-bottom: 0;
    gap: 8px;
  }

  .question-nav li {
    flex: 1;
  }

  .question-nav button {
    grid-template-columns: 30px 1fr;
  }

  .question-nav .status-dot {
    display: none;
  }

  .interview-workspace {
    width: calc(100% - 32px);
    padding-top: 28px;
  }

  .question-panel {
    padding: 26px 22px;
  }

  .answer-panel,
  .guidance-panel {
    padding: 20px;
  }

  .answer-field-heading,
  .sketch-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .sketch-toolbar > div:first-child {
    max-width: none;
  }

  .sketch-tools {
    justify-content: flex-start;
  }

  .voice-button {
    align-self: flex-start;
  }

  .results-hero {
    grid-template-columns: 1fr;
    padding: 30px;
  }

  .diagnostic-body {
    grid-template-columns: 1fr;
    padding-left: 12px;
  }

  .history-summary {
    grid-template-columns: 1fr;
  }

  .history-summary div + div {
    border-top: 1px solid var(--line);
    border-left: 0;
  }

  .history-list {
    overflow-x: auto;
  }

  .history-row {
    min-width: 820px;
  }

  .site-footer p {
    text-align: left;
  }
}

@media (max-width: 520px) {
  .workspace-page {
    width: calc(100% - 32px);
    padding-top: 48px;
  }

  .hero {
    padding-left: 44px;
  }

  .hero h1 {
    font-size: 54px;
  }

  .hero-cn {
    font-size: 20px;
  }

  .hero-practice-card h2 {
    min-height: auto;
    font-size: 23px;
  }

  .method-strip div {
    min-height: 94px;
    padding: 14px;
    flex-direction: column;
    gap: 3px;
  }

  .how-it-works,
  .final-cta {
    width: calc(100% - 32px);
  }

  .final-cta {
    padding: 30px 24px;
  }

  .count-picker {
    width: 100%;
  }

  .count-picker button {
    min-width: 0;
    flex: 1;
  }

  .bank-filters,
  .session-actions {
    flex-direction: column;
  }

  .bank-filters label,
  .session-actions button {
    width: 100%;
  }

  .diagnostic-item summary {
    grid-template-columns: 34px 1fr 50px;
    gap: 8px;
  }

  .diagnostic-item summary strong {
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
