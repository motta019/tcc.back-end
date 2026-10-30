const fs = require('fs');

// Read the original file to obtain the base64 assets
const origPath = 'C:/Users/Pichau/Downloads/Andermaq _ Mangueiras Hidráulicas.html';
let orig = '';
if (fs.existsSync(origPath)) {
  orig = fs.readFileSync(origPath, 'utf8');
}

let logoB64 = '';
let hoseB64 = '';

const logoIdx = orig.indexOf('data:image/png;base64,');
if (logoIdx !== -1) {
  const end = orig.indexOf('"', logoIdx);
  logoB64 = orig.substring(logoIdx, end);
}

const hoseIdx = orig.indexOf('data:image/jpeg;base64,');
if (hoseIdx !== -1) {
  const end = orig.indexOf('"', hoseIdx);
  hoseB64 = orig.substring(hoseIdx, end);
}

// Generate the unified complete HTML
const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Andermaq | Mangueiras Hidráulicas, Conexões e Equipamentos em Campinas</title>
<meta name="description" content="Andermaq Mangueiras Hidráulicas: mangueiras de 1 e 2 tramas, R6, conexões JIC, ORFS, NPT, adaptadores e componentes em Campinas - SP. Monte sua cotação online.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Great+Vibes&display=swap" rel="stylesheet">
<style>
:root {
  --blue: #0055aa;
  --blue-dark: #003b77;
  --blue-soft: #4f9cf9;
  --navy: #061633;
  --navy2: #0a2250;
  --navy3: #0d2c68;
  --gold: #f0a800;
  --gold-hover: #d38a00;
  --gold-light: #ffc928;
  --white: #ffffff;
  --ink: #0b1b3a;
  --bg: #f4f7fc;
  --card-bg: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 255, 255, 0.12);
  --text: #ffffff;
  --text-muted: #dbe6fa;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 85px;
  overflow-x: hidden;
  scrollbar-width: none;
}
html::-webkit-scrollbar {
  display: none;
}

body {
  font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
  background: var(--navy);
  color: var(--text);
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
  transition: all 0.2s ease;
}

button {
  font-family: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 2px;
}

/* HEADER & NAVBAR */
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--blue);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

header.scrolled {
  background: rgba(0, 68, 140, 0.98);
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
}

.bar {
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
}

.logo-link {
  display: flex;
  align-items: center;
}

.bar .logo-img {
  height: 52px;
  width: auto;
  background: #ffffff;
  padding: 6px 14px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.18);
  object-fit: contain;
  transition: transform 0.2s ease;
}

.bar .logo-link:hover .logo-img {
  transform: scale(1.03);
}

nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

nav a {
  padding: 9px 16px;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  border-radius: 8px;
  color: var(--white);
}

nav a:hover {
  background: rgba(255, 255, 255, 0.16);
}

nav a.act {
  background: rgba(255, 255, 255, 0.22);
  color: var(--gold);
}

nav a.cta-btn {
  background: var(--blue-soft);
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(79, 156, 249, 0.35);
}

nav a.cta-btn:hover {
  background: #6bb0ff;
  transform: translateY(-1px);
}

.progress {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, var(--gold), var(--gold-light));
  transform: scaleX(0);
  transform-origin: left;
}

/* MOBILE TOGGLE */
.nav-toggle {
  display: none;
  background: transparent;
  color: #fff;
  font-size: 1.6rem;
  padding: 6px;
}

/* HERO SECTION */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 130px 24px 70px;
  background: radial-gradient(900px 500px at 85% 65%, rgba(0, 85, 170, 0.55), transparent 70%),
              radial-gradient(600px 450px at 15% 45%, rgba(240, 168, 0, 0.18), transparent 70%),
              var(--navy);
  position: relative;
  overflow: hidden;
}

.hero-in {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 40px;
  align-items: center;
}

.script {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  line-height: 1;
  color: var(--gold);
}

h1 {
  font-size: clamp(2.3rem, 5.8vw, 4.6rem);
  line-height: 1.05;
  font-weight: 800;
  text-transform: uppercase;
  margin: 10px 0 20px;
  background: linear-gradient(180deg, #ffc928, #d38a00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero p {
  font-size: clamp(1.05rem, 1.8vw, 1.3rem);
  color: var(--text-muted);
  max-width: 38ch;
  line-height: 1.5;
}

.hero p b {
  color: var(--gold);
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 30px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.25s ease;
  text-align: center;
}

.btn-gold {
  background: var(--gold);
  color: var(--navy);
  box-shadow: 0 6px 20px rgba(240, 168, 0, 0.35);
}

.btn-gold:hover {
  background: #ffb71b;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(240, 168, 0, 0.45);
}

.btn-ghost {
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.7);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #ffffff;
  transform: translateY(-2px);
}

.hose-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hose {
  width: min(100%, 520px);
  -webkit-mask-image: radial-gradient(closest-side, #000 60%, transparent 100%);
  mask-image: radial-gradient(closest-side, #000 60%, transparent 100%);
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6));
  animation: floatHose 6s ease-in-out infinite alternate;
}

@keyframes floatHose {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-10px) rotate(-1deg); }
}

.hint {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  animation: bob 2s ease-in-out infinite;
}

@keyframes bob {
  50% { transform: translate(-50%, 8px); }
}

/* SECTION COMMONS */
section {
  padding: 100px 24px;
  position: relative;
}

.wrap {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 16px;
}

/* STRIP (HIGHLIGHTS) */
.strip {
  background: linear-gradient(180deg, var(--navy), var(--navy2));
  padding-top: 40px;
  padding-bottom: 80px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 30px;
}

.highlight-card {
  padding: 32px 28px;
  border-radius: 18px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.highlight-card:hover {
  transform: translateY(-6px);
  border-color: var(--gold);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
}

.highlight-card .icon-box {
  font-size: 2.2rem;
  margin-bottom: 4px;
}

.highlight-card h3 {
  font-size: 1.35rem;
  color: var(--gold);
  font-weight: 700;
}

.highlight-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* SOBRE */
.light {
  background: var(--bg);
  color: var(--ink);
}

.light h2 {
  color: var(--blue);
}

.sobre-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 50px;
  align-items: start;
}

.sobre-text p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #2b3954;
  margin-bottom: 16px;
}

.nums {
  display: grid;
  gap: 20px;
  border-left: 4px solid var(--gold);
  padding-left: 24px;
}

.num-item {
  background: #ffffff;
  padding: 18px 22px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2eaf5;
}

.num-item strong.big {
  display: block;
  font-size: 2.2rem;
  line-height: 1.1;
  color: var(--blue);
  font-weight: 800;
}

.num-item strong {
  display: block;
  font-size: 1.15rem;
  color: var(--blue);
  margin-bottom: 4px;
}

.num-item span {
  font-size: 0.9rem;
  color: #4b5874;
}

/* PRODUTOS */
.cat {
  background: var(--navy2);
}

.cat h2 {
  color: var(--gold);
}

.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 32px 0 16px;
  align-items: center;
}

.search {
  flex: 1 1 280px;
}

.search input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.search input::placeholder {
  color: rgba(255, 255, 255, 0.65);
}

.search input:focus {
  outline: none;
  border-color: var(--gold);
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 0 0 4px rgba(240, 168, 0, 0.2);
}

.tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tabs button {
  padding: 10px 18px;
  border-radius: 999px;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  color: #fff;
  font: 600 0.88rem 'Montserrat', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tabs button[aria-pressed="true"], .tabs button:hover {
  background: var(--gold);
  color: var(--navy);
  border-color: var(--gold);
}

#cc {
  font-size: 0.92rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 24px;
}

.plist {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 22px;
}

/* PRODUCT CARD */
.pc {
  background: #ffffff;
  color: var(--ink);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.pc:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
}

.ph {
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, #e9f0fc, #c5d7f5);
  display: grid;
  place-items: center;
  font-size: 3rem;
  position: relative;
  overflow: hidden;
}

.ph img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.pc:hover .ph img {
  transform: scale(1.06);
}

.pb {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.pb-cat {
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--blue);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: #eef4ff;
  padding: 4px 10px;
  border-radius: 999px;
  width: fit-content;
}

.pb h3 {
  font-size: 1.12rem;
  font-weight: 800;
  color: #082f66;
  line-height: 1.3;
}

.pb .code-badge {
  font-size: 0.78rem;
  color: #64748b;
  font-weight: 600;
}

.pd {
  font-size: 0.88rem;
  color: #33415f;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sz-label {
  font-weight: 700;
  font-size: 0.82rem;
  color: #082f66;
  margin-top: 4px;
}

.sz {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 110px;
  overflow-y: auto;
}

.sz button {
  padding: 6px 11px;
  border-radius: 8px;
  border: 1.5px solid #a8bfde;
  background: #f1f6fd;
  font: 700 0.82rem 'Montserrat', sans-serif;
  color: #0b1b3a;
  cursor: pointer;
  transition: all 0.18s ease;
}

.sz button[aria-pressed="true"] {
  background: var(--blue);
  color: #fff;
  border-color: var(--blue);
  box-shadow: 0 2px 6px rgba(0, 85, 170, 0.35);
}

.si {
  font-size: 0.82rem;
  color: var(--blue);
  font-weight: 700;
  min-height: 1.2em;
}

.acts {
  margin-top: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding-top: 10px;
}

.det {
  padding: 10px;
  border-radius: 10px;
  border: 2px solid var(--blue);
  background: transparent;
  color: var(--blue);
  font: 700 0.85rem 'Montserrat', sans-serif;
  cursor: pointer;
}

.det:hover {
  background: var(--blue);
  color: #fff;
}

.add {
  padding: 10px;
  border: 0;
  border-radius: 10px;
  background: var(--gold);
  color: var(--navy);
  font: 700 0.85rem 'Montserrat', sans-serif;
  cursor: pointer;
}

.add:hover {
  background: #ffb71b;
  transform: translateY(-1px);
}

.add.ok {
  background: #1f9d55 !important;
  color: #fff !important;
}

.more {
  display: block;
  margin: 36px auto 0;
  padding: 14px 32px;
  border-radius: 12px;
  border: 2px solid var(--gold);
  background: transparent;
  color: var(--gold);
  font: 700 1rem 'Montserrat', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.more:hover {
  background: var(--gold);
  color: var(--navy);
}

/* COTACAO & CONTATO */
.cota {
  background: var(--blue);
}

.cota-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 50px;
  align-items: start;
}

.cota h2 {
  color: #ffffff;
}

.cota-left p {
  color: #e5efff;
  font-size: 1.05rem;
}

.cota-steps {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 16px;
  margin: 28px 0;
}

.cota-steps li {
  display: flex;
  gap: 14px;
  align-items: center;
  font-size: 0.95rem;
  color: #f0f5ff;
}

.cota-steps li i {
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gold);
  color: var(--navy);
  display: grid;
  place-items: center;
  font-style: normal;
  font-weight: 800;
  font-size: 0.9rem;
}

.info-box {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: grid;
  gap: 12px;
  font-size: 0.95rem;
  margin-top: 24px;
}

.info-box a {
  text-decoration: underline;
  font-weight: 600;
}

.badge {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.2);
  width: fit-content;
}

.badge i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #cbd5e1;
}

.badge.on i {
  background: #3ddc84;
}

.map-embed {
  margin-top: 16px;
  border-radius: 12px;
  overflow: hidden;
  height: 180px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
}

.map-embed iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

/* FORM CARD */
.qf {
  background: #ffffff;
  color: var(--ink);
  border-radius: 20px;
  padding: 36px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.qf h3 {
  font-size: 1.4rem;
  color: #082f66;
  margin-bottom: 22px;
  font-weight: 800;
}

.fg {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.f {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.f.full {
  grid-column: 1 / -1;
}

fieldset.f {
  display: block;
  border: 0;
  padding: 0;
}

.f label, .f legend {
  font-size: 0.86rem;
  font-weight: 700;
  color: #082f66;
  margin-bottom: 4px;
}

.f label b {
  color: #d62839;
}

.f input, .f textarea, .f select {
  font: inherit;
  color: inherit;
  padding: 13px 16px;
  border: 1.5px solid #cfd8e6;
  border-radius: 10px;
  background: #f7f9fd;
  width: 100%;
  transition: all 0.2s ease;
}

.f textarea {
  resize: vertical;
  min-height: 100px;
}

.f input:focus, .f textarea:focus, .f select:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 4px rgba(0, 85, 170, 0.18);
  background: #ffffff;
}

.f.err input {
  border-color: #d62839;
}
.f.ok input {
  border-color: #1f9d55;
}

.msg {
  font-size: 0.78rem;
  color: #d62839;
  min-height: 1.1em;
  font-weight: 600;
}

.cnt {
  align-self: flex-end;
  font-size: 0.75rem;
  color: #6b7a99;
}

.step {
  display: flex;
  border: 1.5px solid #cfd8e6;
  border-radius: 10px;
  overflow: hidden;
  background: #f7f9fd;
}

.step:focus-within {
  border-color: var(--blue);
  box-shadow: 0 0 0 4px rgba(0, 85, 170, 0.18);
}

.step button {
  width: 48px;
  border: 0;
  background: transparent;
  font-size: 1.3rem;
  cursor: pointer;
  color: var(--blue);
  font-weight: bold;
}

.step button:hover {
  background: #e3ecfa;
}

.step input {
  border: 0;
  border-radius: 0;
  text-align: center;
  background: transparent;
  font-weight: 700;
  box-shadow: none !important;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  position: relative;
}

.chips input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.chips label {
  padding: 9px 16px;
  border: 1.5px solid #cfd8e6;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  background: #f7f9fd;
  color: #33415f;
  transition: all 0.2s ease;
}

.chips label:hover {
  border-color: var(--blue);
}

.chips input:checked + label {
  background: var(--blue);
  border-color: var(--blue);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 85, 170, 0.3);
}

.qnote {
  margin-top: 14px;
  font-size: 0.88rem;
  color: var(--blue);
  font-weight: 700;
  background: #eaf1fc;
  padding: 10px 14px;
  border-radius: 8px;
}

.go {
  margin-top: 22px;
  width: 100%;
  padding: 16px;
  border: 0;
  border-radius: 12px;
  background: var(--gold);
  color: var(--navy);
  font: 700 1.05rem 'Montserrat', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 6px 18px rgba(240, 168, 0, 0.35);
}

.go:hover {
  background: #ffb71b;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(240, 168, 0, 0.45);
}

.done {
  display: none;
  text-align: center;
  padding: 12px 0;
}

.done p {
  white-space: pre-line;
  text-align: left;
  background: #f3f6fb;
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  font-size: 0.92rem;
  border: 1px solid #e1e8f4;
  color: #1f2d4a;
}

.done .btn {
  margin-top: 8px;
  width: 100%;
}

.again {
  display: block;
  margin: 14px auto 0;
  background: none;
  border: 0;
  color: var(--blue);
  font: 700 0.9rem 'Montserrat', sans-serif;
  cursor: pointer;
  text-decoration: underline;
}

.qf.sent .fg, .qf.sent .go, .qf.sent > h3 {
  display: none;
}
.qf.sent .done {
  display: block;
}

/* LOGIN / ACCOUNT */
.login-section {
  background: var(--bg);
}

.lw {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: start;
}

.lt {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  background: #eaf1fc;
  padding: 6px;
  border-radius: 12px;
  margin-bottom: 22px;
}

.lt button {
  padding: 11px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  font: 700 0.92rem 'Montserrat', sans-serif;
  color: #082f66;
  cursor: pointer;
}

.lt button[aria-pressed="true"] {
  background: var(--blue);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 85, 170, 0.25);
}

.pw {
  position: relative;
}

.pw input {
  padding-right: 48px;
}

.eye {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.lr {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 0.88rem;
  margin-top: 4px;
}

.lr a {
  color: var(--blue);
  text-decoration: underline;
  font-weight: 600;
}

.ck {
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
}

.lmsg {
  font-size: 0.88rem;
  font-weight: 600;
  min-height: 1.2em;
  color: #d62839;
  margin-top: 8px;
}

.lmsg.ok {
  color: #1f9d55;
}

.note {
  margin-top: 18px;
  font-size: 0.8rem;
  color: #64748b;
  text-align: center;
}

.hist {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;
  margin: 14px 0;
}

.hist li {
  padding: 12px 14px;
  border: 1.5px solid #e1e8f4;
  border-radius: 10px;
  font-size: 0.88rem;
  background: #f7f9fd;
}

.hist small {
  color: #475569;
}

.bl {
  padding-left: 20px;
  margin-top: 18px;
  display: grid;
  gap: 10px;
  color: #33415f;
  font-size: 1rem;
}

/* MODAL DE DETALHES */
.modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(6, 22, 51, 0.75);
  backdrop-filter: blur(4px);
  display: none;
  place-items: center;
  padding: 16px;
  overflow-y: auto;
}

.modal.open {
  display: grid;
}

.mbox {
  position: relative;
  background: #fff;
  color: var(--ink);
  border-radius: 22px;
  max-width: 820px;
  width: 100%;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
  animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalPop {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.mph {
  background: linear-gradient(135deg, #e9f0fc, #c5d7f5);
  display: grid;
  place-items: center;
  font-size: 4.5rem;
  position: relative;
  min-height: 280px;
  overflow: hidden;
}

.mph img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mif {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 90vh;
  overflow-y: auto;
}

.mif h3 {
  font-size: 1.45rem;
  color: #082f66;
  padding-right: 30px;
  line-height: 1.25;
  font-weight: 800;
}

.mif p {
  color: #2b3954;
  font-size: 0.95rem;
  line-height: 1.5;
}

.mx {
  position: absolute;
  top: 14px;
  right: 14px;
  border: 0;
  background: #fff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  color: var(--ink);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: grid;
  place-items: center;
}

#mtb {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  margin: 6px 0;
}

#mtb th {
  text-align: left;
  padding: 8px 12px;
  background: #eaf1fc;
  color: #082f66;
  width: 36%;
  font-weight: 700;
  border-radius: 6px 0 0 6px;
}

#mtb td {
  padding: 8px 12px;
  border-bottom: 1px solid #e1e8f4;
  color: #1e293b;
}

.mq {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 6px;
}

.mq .step {
  width: 130px;
}

.mq .step span {
  flex: 1;
  text-align: center;
  align-self: center;
  font-weight: 700;
  font-size: 1rem;
}

.mq .add {
  padding: 13px 20px;
  margin: 0;
  flex: 1;
  font-size: 0.95rem;
}

.mwa {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  padding: 12px;
  border-radius: 10px;
  background: #25d366;
  color: #052e16;
  font-weight: 700;
  font-size: 0.92rem;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

.mwa:hover {
  background: #20bd5a;
}

/* FLOATING ACTIONS & DRAWER */
.fab {
  position: fixed;
  z-index: 1200;
  border: 0;
  cursor: pointer;
  font: 700 0.92rem 'Montserrat', sans-serif;
  border-radius: 999px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  padding: 14px 22px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.3s ease, background 0.2s ease;
}

#wa {
  right: 20px;
  background: #25d366;
  color: #052e16;
}

#wa:hover {
  background: #20bd5a;
  transform: translateY(-2px);
}

#cb {
  left: 20px;
  background: var(--gold);
  color: var(--navy);
  transform: translateY(140px);
}

#cb.show {
  transform: translateY(0);
}

#cb:hover {
  background: #ffb71b;
  transform: translateY(-2px);
}

.shade {
  position: fixed;
  inset: 0;
  background: rgba(6, 22, 51, 0.6);
  z-index: 1300;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.shade.open {
  opacity: 1;
  pointer-events: auto;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: min(100%, 420px);
  z-index: 1400;
  background: #fff;
  color: var(--ink);
  transform: translateX(100%);
  visibility: hidden;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.35s ease;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.25);
}

.drawer.open {
  transform: translateX(0);
  visibility: visible;
}

.dh {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e8f4;
  padding-bottom: 14px;
}

.dh h3 {
  font-size: 1.3rem;
  color: #082f66;
  font-weight: 800;
}

.dh button {
  border: 0;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--ink);
}

.dl {
  flex: 1;
  overflow-y: auto;
  display: grid;
  gap: 12px;
  align-content: start;
  margin: 16px 0;
}

.it {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  padding: 14px;
  border: 1.5px solid #e1e8f4;
  border-radius: 12px;
  font-size: 0.9rem;
  align-items: center;
  background: #f8fafc;
}

.it small {
  color: #475569;
}

.it .q {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
}

.it .q button {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1.5px solid #cfd8e6;
  background: #fff;
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--blue);
}

.drawer .btn {
  margin-top: 8px;
  text-align: center;
  padding: 14px;
}

.drawer #dgo {
  background: var(--gold);
  color: var(--navy);
}

.drawer #dwa {
  background: #25d366;
  color: #052e16;
}

/* FOOTER */
footer {
  background: #030e22;
  padding: 40px 24px 30px;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.fl {
  display: flex;
  gap: 22px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.fl a {
  color: #ffffff;
  font-weight: 600;
}

.fl a:hover {
  color: var(--gold);
}

/* REVEAL ANIMATIONS */
.rv {
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: var(--d, 0s);
}

.rv.in {
  opacity: 1;
  transform: none;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .hero-in, .grid-3, .sobre-grid, .cota-grid, .lw {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .hose {
    order: -1;
    width: min(80%, 340px);
    margin: 0 auto;
  }
  .bar .logo-img {
    height: 44px;
    padding: 4px 10px;
  }
  nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--blue-dark);
    flex-direction: column;
    padding: 16px 24px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
  }
  nav.open {
    display: flex;
  }
  nav a {
    width: 100%;
    text-align: center;
    padding: 12px;
  }
  .nav-toggle {
    display: block;
  }
  .mbox {
    grid-template-columns: 1fr;
  }
  .mph {
    min-height: 180px;
  }
  .fg {
    grid-template-columns: 1fr;
  }
  .qf {
    padding: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .rv { opacity: 1; transform: none; transition: none; }
  .hint { animation: none; }
  .hose { animation: none; }
}
</style>
</head>
<body>

<header id="top">
  <div class="bar">
    <a href="#inicio" class="logo-link" aria-label="Andermaq Mangueiras Hidráulicas">
      <img class="logo-img" src="img/geral/andermaq.png" alt="Andermaq" onerror="if(!this.dataset.tried){this.dataset.tried=1;this.src='${logoB64}';}">
    </a>
    <button class="nav-toggle" id="navToggle" aria-label="Abrir menu">☰</button>
    <nav id="navMenu" aria-label="Navegação principal">
      <a href="#inicio" class="act">Início</a>
      <a href="#sobre">Sobre</a>
      <a href="#produtos">Produtos</a>
      <a href="#contato" class="cta-btn">Cotação</a>
      <a href="#login" id="lg">Login</a>
    </nav>
  </div>
  <div class="progress" id="pg"></div>
</header>

<main>
  <!-- HERO -->
  <section class="hero" id="inicio">
    <div class="hero-in">
      <div class="rv">
        <div class="script">Lançamento</div>
        <h1>Linha de mangueiras hidráulicas</h1>
        <p>Mangueiras hidráulicas de alta pressão e <b>conexões de alta qualidade</b> para máquinas agrícolas, indústrias e linha pesada.</p>
        <div class="hero-actions">
          <a class="btn btn-gold" href="#produtos">Ver produtos</a>
          <a class="btn btn-ghost" href="#contato">Pedir cotação</a>
        </div>
      </div>
      <div class="hose-container rv" style="--d: .15s">
        <img class="hose" src="img/produtos/r6.webp" alt="Mangueira Hidráulica Andermaq" onerror="if(!this.dataset.tried){this.dataset.tried=1;this.src='${hoseB64}';}">
      </div>
    </div>
    <div class="hint">
      <span>role para ver mais</span>
      <span>↓</span>
    </div>
  </section>

  <!-- CATEGORIAS EM DESTAQUE -->
  <section class="strip">
    <div class="wrap">
      <h2 class="rv">O que você encontra aqui</h2>
      <p class="rv" style="color: var(--text-muted); max-width: 60ch;">Fornecemos a linha completa para montagem e reposição hidráulica com os mais altos padrões do setor.</p>
      <div class="grid-3">
        <a class="highlight-card rv" href="#produtos" data-c="m">
          <div class="icon-box">➰</div>
          <h3>Mangueiras</h3>
          <p>Linhas de 1 trama, 2 tramas, R6, R7, R12 e sucção com diâmetros de 1/4" a 1.1/2" e montagem sob medida.</p>
        </a>
        <a class="highlight-card rv" href="#produtos" data-c="c" style="--d: .12s">
          <div class="icon-box">🔩</div>
          <h3>Conexões & Adaptadores</h3>
          <p>Padrões JIC 37°, ORFS, NPT, BSP, flanges SAE, engates rápidos e conexões pneumáticas push-in.</p>
        </a>
        <a class="highlight-card rv" href="#produtos" data-c="e" style="--d: .24s">
          <div class="icon-box">⚙️</div>
          <h3>Componentes</h3>
          <p>Bombas hidráulicas, comandos manuais, válvulas de bloqueio, manômetros, filtros e cilindros.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- SOBRE -->
  <section class="light" id="sobre">
    <div class="wrap">
      <div class="sobre-grid">
        <div class="sobre-text rv">
          <h2>Sobre a Andermaq</h2>
          <p>Na correria do dia a dia, a manutenção preventiva e corretiva de máquinas e equipamentos exige agilidade, peças certificadas e quem realmente entenda do assunto.</p>
          <p>Fundada em <strong>19 de maio de 2017 em Campinas (SP)</strong>, a <strong>Andermaq</strong> consolidou-se como referência no fornecimento de mangueiras hidráulicas, conexões e componentes de alta performance.</p>
          <p>Nosso objetivo é facilitar a sua rotina: você confere as medidas e especificações técnicas de cada produto diretamente pelo site, monta sua lista e recebe a cotação rápida da nossa equipe por e-mail ou WhatsApp, sem perder tempo.</p>
          <div style="margin-top: 20px;">
            <span class="badge openb"><i></i><span>Verificando horário...</span></span>
          </div>
        </div>

        <div class="nums rv" style="--d: .15s">
          <div class="num-item">
            <strong class="big"><span data-n="9" id="yrs">9</span> anos</strong>
            <span>de excelência e atendimento especializado em Campinas e região.</span>
          </div>
          <div class="num-item">
            <strong class="big"><span data-n="33" id="pcn">33</span> produtos</strong>
            <span>no catálogo técnico entre mangueiras, conexões e componentes.</span>
          </div>
          <div class="num-item">
            <strong>Cotação sem sair de casa</strong>
            <span>Envie suas medidas online e receba o orçamento pronto para aprovação.</span>
          </div>
          <div class="num-item">
            <strong>Atendimento Técnico Especializado</strong>
            <span>Anderson e equipe técnica pronta para indicar a melhor peça para sua aplicação.</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PRODUTOS -->
  <section class="cat" id="produtos">
    <div class="wrap">
      <h2 class="rv">Nossos produtos</h2>
      <p class="rv" style="color: var(--text-muted);">Consulte códigos, especificações, selecione as medidas e monte sua cotação completa.</p>
      
      <div class="tools rv">
        <div class="search">
          <input id="sq" type="search" placeholder="Buscar por nome, código ou medida (ex.: 3/8, ORFS, MH-1T)" aria-label="Buscar produto">
        </div>
        <div class="tabs" id="tb">
          <button type="button" data-c="all" aria-pressed="true">Todos</button>
          <button type="button" data-c="m" aria-pressed="false">Mangueiras</button>
          <button type="button" data-c="c" aria-pressed="false">Conexões</button>
          <button type="button" data-c="a" aria-pressed="false">Adaptadores</button>
          <button type="button" data-c="e" aria-pressed="false">Componentes</button>
        </div>
      </div>
      
      <small id="cc" class="rv"></small>
      <div class="plist" id="pl"></div>
      <button type="button" class="more" id="more" hidden>Ver mais produtos</button>
    </div>
  </section>

  <!-- CONTATO & COTAÇÃO -->
  <section class="cota" id="contato">
    <div class="wrap">
      <div class="cota-grid">
        <div class="cota-left rv">
          <h2>Peça sua cotação</h2>
          <p>Envie as medidas e a lista de peças que você precisa. Nossa equipe entrará em contato para buscar o preço que cabe no seu bolso!</p>
          
          <ul class="cota-steps">
            <li><i>1</i><span>Escolha as peças no catálogo ou digite abaixo.</span></li>
            <li><i>2</i><span>Nossa equipe técnica valida as especificações.</span></li>
            <li><i>3</i><span>Você recebe o orçamento detalhado por WhatsApp ou E-mail.</span></li>
          </ul>

          <div class="info-box">
            <span class="badge openb"><i></i><span>Verificando...</span></span>
            <p><strong>Endereço:</strong> Av. Mirandópolis, 501 – Vila Pompéia, Campinas – SP, 13050-470</p>
            <p><strong>Telefone Fixo:</strong> <a href="tel:+551933969300">(19) 3396-9300</a></p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/5519981128608" target="_blank" rel="noopener">(19) 98112-8608</a></p>
            <p><strong>E-mail:</strong> <a href="mailto:anderson@andermaqmangueiras.com">anderson@andermaqmangueiras.com</a></p>
            <p><strong>Horário:</strong> Segunda a Sexta, das 08:00 às 18:00</p>
          </div>

          <div class="map-embed">
            <iframe 
              src="https://www.google.com/maps?q=Av.+Mirand%C3%B3polis,+501,+Campinas+SP&output=embed" 
              allowfullscreen="" 
              loading="lazy"
              title="Localização da Andermaq">
            </iframe>
          </div>
        </div>

        <!-- FORMULARIO -->
        <form class="qf rv" id="qf" novalidate style="--d: .15s">
          <h3>Preencha os dados do pedido</h3>
          <div class="fg">
            <div class="f">
              <label for="nome">Nome completo <b>*</b></label>
              <input id="nome" autocomplete="name" placeholder="Seu nome ou da empresa">
              <span class="msg"></span>
            </div>

            <div class="f">
              <label for="email">E-mail corporativo <b>*</b></label>
              <input id="email" type="email" autocomplete="email" placeholder="seu@email.com">
              <span class="msg"></span>
            </div>

            <div class="f">
              <label for="tel">Telefone / WhatsApp</label>
              <input id="tel" type="tel" inputmode="tel" maxlength="15" autocomplete="tel" placeholder="(19) 98112-8608">
              <span class="msg"></span>
            </div>

            <div class="f">
              <label for="qtd">Quantidade total estimada</label>
              <div class="step">
                <button type="button" data-d="-1" aria-label="Diminuir quantidade">−</button>
                <input id="qtd" inputmode="numeric" value="1">
                <button type="button" data-d="1" aria-label="Aumentar quantidade">+</button>
              </div>
              <span class="msg"></span>
            </div>

            <fieldset class="f full">
              <legend>Linha principal de interesse</legend>
              <div class="chips">
                <input type="radio" name="prod" id="p1" value="Mangueiras Hidráulicas" checked>
                <label for="p1">Mangueiras Hidráulicas</label>

                <input type="radio" name="prod" id="p2" value="Conexões Hidráulicas">
                <label for="p2">Conexões</label>

                <input type="radio" name="prod" id="p3" value="Adaptadores">
                <label for="p3">Adaptadores</label>

                <input type="radio" name="prod" id="p4" value="Componentes e Equipamentos">
                <label for="p4">Componentes</label>

                <input type="radio" name="prod" id="p5" value="Montagem sob Medida">
                <label for="p5">Montagem sob Medida</label>
              </div>
            </fieldset>

            <div class="f full">
              <label for="desc">Detalhes da cotação</label>
              <textarea id="desc" rows="4" maxlength="500" placeholder="Informe as medidas, conexões das pontas, tipo de fluido, comprimento da mangueira ou modelo da máquina..."></textarea>
              <span class="cnt" id="cnt">0/500</span>
            </div>
          </div>

          <p class="qnote" id="qnote" hidden></p>

          <button class="go" type="submit">Enviar Solicitação de Cotação</button>

          <div class="done" role="status" aria-live="polite">
            <h3 style="color: #1f9d55; margin-bottom: 8px;">✓ Solicitação Enviada!</h3>
            <p style="background: #eaf1fc; color: #082f66; font-size: 0.92rem; padding: 12px 14px; border-radius: 8px; margin: 10px 0;">
              Sua cotação foi enviada para <strong>anderson@andermaqmangueiras.com</strong>.<br>
              <small style="color: #4b5874;">Se for a primeira vez usando o serviço, um link de confirmação inicial é enviado para o e-mail de destino.</small>
            </p>
            <p id="sum"></p>
            <a class="btn" id="fwa" style="background: #25d366; color: #052e16; margin-top: 10px; width: 100%; font-weight: 700; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35);" href="#" target="_blank" rel="noopener">💬 Enviar Cópia Direta pelo WhatsApp</a>
            <a class="btn" id="mt" style="background: #f1f5f9; color: #082f66; border: 1.5px solid #cfd8e6; margin-top: 8px; width: 100%;" href="#">✉️ Abrir Cópia no Aplicativo de E-mail</a>
            <button type="button" class="again">Fazer outra cotação</button>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- LOGIN / CADASTRO -->
  <section class="login-section" id="login">
    <div class="wrap lw">
      <div class="rv lc">
        <div class="qf" id="auth">
          <div class="lt">
            <button type="button" data-t="fin" aria-pressed="true">Entrar</button>
            <button type="button" data-t="fup" aria-pressed="false">Criar conta</button>
          </div>

          <!-- FORM LOGIN -->
          <form id="fin" novalidate>
            <div class="f">
              <label for="lem">E-mail</label>
              <input id="lem" type="email" autocomplete="email" placeholder="seu@email.com">
              <span class="msg"></span>
            </div>
            <div class="f">
              <label for="lpw">Senha</label>
              <div class="pw">
                <input id="lpw" type="password" autocomplete="current-password" placeholder="Sua senha">
                <button type="button" class="eye" aria-label="Mostrar ou ocultar senha">👁</button>
              </div>
              <span class="msg"></span>
            </div>
            <div class="lr">
              <label class="ck"><input type="checkbox" id="lrm"> Lembrar-me</label>
              <a href="#login" id="forg">Esqueci minha senha</a>
            </div>
            <p class="lmsg" id="lm1" role="alert"></p>
            <button class="go" type="submit">Entrar no Sistema</button>
          </form>

          <!-- FORM CADASTRO -->
          <form id="fup" hidden novalidate>
            <div class="f">
              <label for="snm">Nome completo ou Empresa</label>
              <input id="snm" autocomplete="name" placeholder="Seu nome">
              <span class="msg"></span>
            </div>
            <div class="f">
              <label for="sem">E-mail de contato</label>
              <input id="sem" type="email" autocomplete="email" placeholder="seu@email.com">
              <span class="msg"></span>
            </div>
            <div class="f">
              <label for="spw">Criar Senha</label>
              <div class="pw">
                <input id="spw" type="password" autocomplete="new-password" placeholder="Mínimo de 6 caracteres">
                <button type="button" class="eye" aria-label="Mostrar ou ocultar senha">👁</button>
              </div>
              <span class="msg"></span>
            </div>
            <div class="f">
              <label for="spc">Confirmar Senha</label>
              <input id="spc" type="password" autocomplete="new-password" placeholder="Repita a senha">
              <span class="msg"></span>
            </div>
            <p class="lmsg" id="lm2" role="alert"></p>
            <button class="go" type="submit">Cadastrar Conta</button>
          </form>

          <!-- ESQUECI SENHA -->
          <form id="ffg" hidden novalidate>
            <div class="f">
              <label for="fem">E-mail cadastrado</label>
              <input id="fem" type="email" placeholder="seu@email.com">
              <span class="msg"></span>
            </div>
            <p class="lmsg" id="lm3" role="status"></p>
            <button class="go" type="submit">Enviar link de redefinição</button>
            <button type="button" class="again" id="fbk">Voltar para o Login</button>
          </form>

          <p class="note">Demonstração: as contas e histórico ficam salvos neste navegador.</p>
        </div>

        <!-- PAINEL CONTA LOGADA -->
        <div class="qf" id="acct" hidden>
          <h3 id="an"></h3>
          <p id="ae" style="color: #64748b; font-weight: 600;"></p>
          <h4 style="margin-top: 20px; color: #082f66; font-size: 1.1rem;">Suas últimas cotações enviadas:</h4>
          <ul class="hist" id="ah"></ul>
          <a class="btn btn-gold" href="#produtos" style="margin-top: 14px; width: 100%;">Explorar Catálogo de Produtos</a>
          <button type="button" class="again" id="alo">Sair da minha conta</button>
        </div>
      </div>

      <div class="rv" style="--d: .15s">
        <h2>Área do Cliente Andermaq</h2>
        <p style="color: #33415f; font-size: 1.05rem;">Acesse sua conta para agilizar pedidos e gerenciar orçamentos com a Andermaq.</p>
        <ul class="bl">
          <li><strong>Preenchimento automático:</strong> seus dados são carregados instantaneamente na cotação.</li>
          <li><strong>Histórico de orçamentos:</strong> acompanhe as peças e mangueiras que você já solicitou.</li>
          <li><strong>Canal prioritário:</strong> comunicação direta com a equipe técnica da Andermaq.</li>
        </ul>
      </div>
    </div>
  </section>
</main>

<!-- FLOATING ACTIONS -->
<a class="fab" id="wa" href="https://wa.me/5519981128608?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Andermaq%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o." target="_blank" rel="noopener">
  <span>💬</span> WhatsApp
</a>

<button class="fab" id="cb" type="button">
  <span>🛒</span> Minha cotação (<span id="cn">0</span>)
</button>

<div class="shade" id="sh"></div>

<!-- DRAWER DO CARRINHO -->
<aside class="drawer" id="dr" aria-label="Minha cotação de produtos">
  <div class="dh">
    <h3>Itens Selecionados</h3>
    <button type="button" id="dx" aria-label="Fechar">✕</button>
  </div>
  <div class="dl" id="dl"></div>
  <a class="btn" id="dgo" href="#contato">Concluir no Formulário</a>
  <a class="btn" id="dwa" href="#" target="_blank" rel="noopener">Enviar Itens pelo WhatsApp</a>
</aside>

<!-- MODAL DE DETALHES TÉCNICOS -->
<div class="modal" id="md" role="dialog" aria-modal="true" aria-labelledby="mt2">
  <div class="mbox">
    <button type="button" class="mx" id="mx" aria-label="Fechar janela">✕</button>
    <div class="mph" id="mph"></div>
    <div class="mif">
      <span class="pb-cat" id="mcat"></span>
      <h3 id="mt2"></h3>
      <p class="code-badge" id="mcode"></p>
      <p id="mds"></p>
      <table id="mtb"></table>
      <div id="msz"></div>
      <div class="mq">
        <div class="step">
          <button type="button" data-a="-1" aria-label="Diminuir">−</button>
          <span id="mqn">1</span>
          <button type="button" data-a="1" aria-label="Aumentar">+</button>
        </div>
        <button type="button" class="add" id="madd">Adicionar à cotação</button>
      </div>
      <a class="mwa" id="mwa" href="#" target="_blank" rel="noopener">Perguntar no WhatsApp</a>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="fl">
    <a href="#inicio">Início</a>
    <a href="#sobre">Sobre a Empresa</a>
    <a href="#produtos">Catálogo de Produtos</a>
    <a href="#contato">Solicitar Cotação</a>
    <a href="#login">Área do Cliente</a>
  </div>
  <p>© 2026 Andermaq Mangueiras Hidráulicas · Av. Mirandópolis, 501 – Campinas, SP · CNPJ Homologado</p>
</footer>

<script>
// REVEAL ON SCROLL
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.rv').forEach(el => io.observe(el));

// HEADER SCROLL & PROGRESS BAR
const header = document.querySelector('header');
const pg = document.getElementById('pg');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 20);
  
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  pg.style.transform = 'scaleX(' + (docHeight > 0 ? scrollY / docHeight : 0) + ')';

  // Highlight active nav item
  const sections = document.querySelectorAll('section[id], .hero[id]');
  let currentSection = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      currentSection = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('act');
    } else {
      link.classList.remove('act');
    }
  });
}, { passive: true });

// MOBILE MENU TOGGLE
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

// DATABASE OF PRODUCTS
const P = [
  ['Mangueira 1 trama', 'm', ['3/8', '1/4', '1/2', '5/8'], 'mangueira-1-trama.webp'],
  ['Mangueira 2 tramas', 'm', ['3/8', '1/4', '1/2', '5/8'], 'mangueira-2-tramas.webp'],
  ['Mangueira R6', 'm', ['1/4', '3/8', '1/2', '5/8'], 'r6.webp'],
  ['Adaptador conexão reta x NPTF 30° (macho x macho)', 'a', ['04-04 1/4 x 1/4', '06-06 3/8 x 3/8', '08-08 1/2 x 1/2', '12-10 3/4 x 5/8', '12-12 3/4 x 3/4', '16-16 1 x 1'], 'adaptador-conexao-reta.webp'],
  ['Fêmea ORFS', 'c', ['fo 04-04 9/16 x 1/4', 'fo 06-04 11/16 x 1/4', 'fo 06-06 11/16 x 3/8', 'fo 08-08 13/16 x 1/2', 'fo 10-10 1 x 5/8'], 'femea-orfs.webp'],
  ['Macho NPT', 'c', ['npt 02-04 1/8 x 1/4', 'npt 04-04 1/4 x 1/4', 'npt 06-06 3/8 x 3/8', 'npt 08-06 1/2 x 3/8', 'npt 08-08 1/2 x 1/2'], 'macho-npt.webp'],
  ['Fêmea JIC 37°', 'c', ['FJ 04-04 AC 7/16 X 1/4', 'FJ 05-04 AC 1/2 X 1/4', 'FJ 05-05 AC 1/2 X 5/16', 'FJ 05-06 AC 1/2 X 3/8', 'FJ 06-04 AC 9/16 X 1/4', 'FJ 06-06 AC 9/16 X 3/8', 'FJ 06-08 AC 9/16 X 1/2', 'FJ 07-04 AC 5/8 X 1/4', 'FJ 07-06 AC 5/8 X 3/8', 'FJ 08-04 AC 3/4 X 1/4'], 'femea-jic.jpg'],
  ['Engate rápido macho', 'c', ['1/4 NPT', '3/8 NPT', '1/2 NPT', '3/4 NPT', '1 NPT'], 'engate-rapido-macho.jpeg'],
  ['Conexões pneumáticas', 'c', ['4 mm', '6 mm', '8 mm', '10 mm', '12 mm'], 'conexoes-pneumaticas.jpeg'],
  ['Válvula macho', 'e', [], 'valvula-macho.jpeg'],
  ['Bomba hidráulica', 'e', [], 'bomba-hidraulica.jpeg'],
  ['Comando hidráulico', 'e', [], 'comando-hidraulico.jpeg'],
  // Complementares do catálogo da indústria
  ['Mangueira R7 termoplástica', 'm', ['1/4', '3/8', '1/2'], ''],
  ['Mangueira R12 (4 espirais)', 'm', ['1/2', '3/4', '1'], ''],
  ['Mangueira de sucção e retorno', 'm', ['3/4', '1', '1.1/4', '1.1/2'], ''],
  ['Conexão curva 90° JIC', 'c', ['1/4', '3/8', '1/2', '3/4'], ''],
  ['Conexão curva 45° JIC', 'c', ['1/4', '3/8', '1/2', '3/4'], ''],
  ['Macho BSP', 'c', ['1/4', '3/8', '1/2', '3/4'], ''],
  ['Fêmea BSP giratória', 'c', ['1/4', '3/8', '1/2', '3/4'], ''],
  ['Macho ORFS', 'c', ['1/4', '3/8', '1/2', '3/4'], ''],
  ['Flange SAE 3000', 'c', ['1/2', '3/4', '1', '1.1/4'], ''],
  ['Engate rápido fêmea', 'c', ['1/4 NPT', '3/8 NPT', '1/2 NPT', '3/4 NPT'], ''],
  ['Adaptador T macho', 'a', ['1/4', '3/8', '1/2', '3/4'], ''],
  ['Adaptador cotovelo 90° macho x fêmea', 'a', ['1/4', '3/8', '1/2', '3/4'], ''],
  ['Adaptador de redução', 'a', ['3/8 x 1/4', '1/2 x 3/8', '3/4 x 1/2', '1 x 3/4'], ''],
  ['Bujão macho NPT', 'a', ['1/4', '3/8', '1/2', '3/4'], ''],
  ['União reta fêmea x fêmea', 'a', ['1/4', '3/8', '1/2', '3/4'], ''],
  ['Cilindro hidráulico', 'e', [], ''],
  ['Filtro de linha', 'e', [], ''],
  ['Manômetro', 'e', ['0–250 bar', '0–400 bar', '0–600 bar'], ''],
  ['Válvula de retenção', 'e', [], ''],
  ['Válvula reguladora de pressão', 'e', [], ''],
  ['Mini central hidráulica', 'e', [], '']
];

const E = { m: '➰', c: '🔩', a: '🔁', e: '⚙️' };
const CN = { m: 'Mangueiras', c: 'Conexões', a: 'Adaptadores', e: 'Componentes' };
const ID = { '1/4': '6,3 mm', '3/8': '10 mm', '1/2': '12,5 mm', '5/8': '16 mm', '3/4': '19 mm', '1': '25 mm', '1.1/4': '31,5 mm', '1.1/2': '38 mm' };

// INFORMAÇÕES TÉCNICAS COMPLETAS DOS PRODUTOS
const D = {
  'Mangueira 1 trama': {
    k: 'id',
    c: 'MH-1T-2025',
    d: 'Mangueira hidráulica de alta resistência com reforço em uma trama de aço. Indicada para sistemas hidráulicos de média pressão, oferecendo excelente durabilidade, flexibilidade e segurança operacional.',
    r: [
      ['Aplicação', 'Sistemas Hidráulicos em Geral'],
      ['Pressão', 'Média Pressão'],
      ['Reforço', '1 Trama de Arame de Aço Trançado'],
      ['Material', 'Tubo e cobertura em borracha sintética resistente à abrasão'],
      ['Referência', 'Padrão SAE 100 R1 / EN 853 1SN']
    ],
    t: 'Escolha pelo diâmetro interno correto e confirme a pressão de trabalho necessária para seu circuito.'
  },
  'Mangueira 2 tramas': {
    k: 'id',
    c: 'MH-2T-2025',
    d: 'Mangueira hidráulica reforçada com duas tramas de aço, oferecendo maior resistência para aplicações de alta pressão. Indicada para equipamentos industriais, agrícolas e sistemas hidráulicos que exigem máxima durabilidade e segurança.',
    r: [
      ['Aplicação', 'Sistemas Hidráulicos de Alta Pressão'],
      ['Pressão', 'Alta Pressão'],
      ['Reforço', '2 Tramas de Arame de Aço de Alta Resistência'],
      ['Material', 'Borracha sintética resistente a intempéries e óleos'],
      ['Referência', 'Padrão SAE 100 R2 / EN 853 2SN']
    ],
    t: 'Indicada para linhas de alta pressão que exigem reforço e robustez superior à mangueira de 1 trama.'
  },
  'Mangueira R6': {
    k: 'id',
    c: 'R6-2025',
    d: 'Mangueira hidráulica flexível desenvolvida para linhas de baixa pressão, retorno de óleo e sistemas hidráulicos auxiliares. Possui excelente flexibilidade, resistência à abrasão e longa vida útil, sendo amplamente utilizada em aplicações industriais, agrícolas e automotivas.',
    r: [
      ['Aplicação', 'Retorno de Óleo e Circuitos de Baixa Pressão'],
      ['Pressão', 'Baixa Pressão'],
      ['Norma', 'SAE 100 R6'],
      ['Material', 'Borracha Sintética com Reforço Têxtil']
    ],
    t: 'Ideal para linhas de retorno de óleo e circuitos auxiliares. Não utilize em linhas de pressão principal da bomba.'
  },
  'Adaptador conexão reta x NPTF 30° (macho x macho)': {
    c: 'ACR-NPTF-30',
    d: 'Adaptador hidráulico desenvolvido para realizar a conexão entre diferentes padrões de rosca, proporcionando vedação eficiente, segurança operacional e excelente resistência mecânica. Ideal para sistemas hidráulicos que exigem alta confiabilidade e desempenho contínuo.',
    r: [
      ['Tipo', 'Adaptador Reto Macho x Macho'],
      ['Conexão', 'NPTF 30°'],
      ['Material', 'Aço Carbono Zincado Bicromatizado'],
      ['Aplicação', 'Sistemas Hidráulicos de Alta Resistência'],
      ['Aplicações Gerais', 'Máquinas Agrícolas, Equipamentos Industriais e Prensas']
    ],
    t: 'Confirme o diâmetro e padrão das roscas em ambas as pontas antes de comprar.'
  },
  'Fêmea ORFS': {
    k: 'th',
    c: 'ORFS-F-2025',
    d: 'Conexão hidráulica padrão ORFS (O-Ring Face Seal), projetada para proporcionar vedação superior sem vazamentos, mesmo em aplicações de alta pressão. Sua construção robusta garante excelente resistência mecânica, durabilidade e segurança em sistemas hidráulicos industriais, agrícolas e móveis.',
    r: [
      ['Tipo', 'Fêmea ORFS Giratória'],
      ['Vedação', 'O-Ring Face Seal (face plana com anel de vedação)'],
      ['Material', 'Aço Carbono Zincado'],
      ['Norma', 'SAE J1453 / ISO 8434-3'],
      ['Aplicação', 'Alta Pressão sem Vazamentos em Linhas Móveis e Industriais']
    ],
    t: 'No código, o primeiro número indica a rosca (porca) e o segundo o diâmetro da mangueira/tubo. Troque sempre o anel O-ring em manutenções.'
  },
  'Macho NPT': {
    k: 'th',
    c: 'NPT-M-2025',
    d: 'Conexão hidráulica com rosca padrão NPT (National Pipe Thread), amplamente utilizada em sistemas hidráulicos e pneumáticos. Desenvolvida para proporcionar excelente vedação, resistência mecânica e confiabilidade em aplicações industriais de média e alta pressão.',
    r: [
      ['Tipo', 'Macho Fixo NPT'],
      ['Padrão de Rosca', 'NPT Cônica de Tubo (ANSI B1.20.1)'],
      ['Material', 'Aço Carbono Zincado'],
      ['Aplicação', 'Sistemas Hidráulicos e Pneumáticos'],
      ['Vedação', 'Nos próprios filetes cônicos da rosca']
    ],
    t: 'A vedação cônica exige aplicação de vedante apropriado para conexões hidráulicas. Não misture com rosca BSP.'
  },
  'Fêmea JIC 37°': {
    k: 'th',
    c: 'JIC-F-37-2025',
    d: 'Conexão hidráulica padrão JIC 37°, amplamente utilizada em sistemas hidráulicos de alta performance. Possui vedação por assento metálico cônico de 37°, garantindo excelente resistência à pressão, segurança operacional e facilidade de montagem. Indicada para máquinas agrícolas, equipamentos industriais e diversos sistemas hidráulicos móveis.',
    r: [
      ['Tipo', 'Fêmea JIC Giratória'],
      ['Ângulo de Vedação', '37° (assento metálico cônico metal-metal)'],
      ['Material', 'Aço Carbono Zincado'],
      ['Norma', 'SAE J514 / ISO 8434-2'],
      ['Aplicação', 'Linhas de Alta Pressão em Tratores e Prensas']
    ],
    t: 'No código, o primeiro número é a rosca (UNF) e o segundo o diâmetro da mangueira. Só acopla em machos com assento cônico de 37°.'
  },
  'Engate rápido macho': {
    c: 'ERM-NPT-2025',
    d: 'Engate rápido macho utilizado para realizar conexões hidráulicas de forma prática e segura. Permite conectar e desconectar mangueiras com facilidade, facilitando manutenções e trocas de equipamentos.',
    r: [
      ['Tipo', 'Engate Rápido Macho com Válvula'],
      ['Rosca', 'NPT'],
      ['Material', 'Aço Carbono Zincado'],
      ['Aplicação', 'Sistemas Hidráulicos com Desacoplamento Frequente'],
      ['Uso Comum', 'Implementos agrícolas, ferramentas e bancadas de teste']
    ],
    t: 'Combine sempre com o corpo fêmea da mesma série e bitola para garantir acoplamento sem vazamento de óleo.'
  },
  'Válvula macho': {
    c: 'VM-2025',
    d: 'Válvula macho utilizada em sistemas hidráulicos para controlar a passagem do fluido. Possui construção resistente e pode ser utilizada em diferentes tipos de equipamentos e instalações hidráulicas.',
    r: [
      ['Tipo', 'Válvula de Bloqueio Macho'],
      ['Aplicação', 'Sistemas Hidráulicos e Industriais'],
      ['Função', 'Controle de Fluxo e Bloqueio'],
      ['Uso', 'Industrial e Agrícola']
    ],
    t: 'Informe a rosca e a pressão de trabalho ao solicitar sua cotação.'
  },
  'Bomba hidráulica': {
    c: 'BH-2026',
    d: 'Bomba hidráulica utilizada para gerar fluxo de óleo em sistemas hidráulicos, indicada para máquinas e equipamentos que necessitam de força e movimentação hidráulica.',
    r: [
      ['Tipo', 'Bomba Hidráulica de Deslocamento'],
      ['Aplicação', 'Sistemas Hidráulicos de Máquinas e Equipamentos'],
      ['Fluido', 'Óleo Hidráulico Mineral'],
      ['Uso', 'Industrial, Agrícola e Linha Móvel']
    ],
    t: 'Informe o deslocamento volumétrico (vazão em cm³/rev), sentido de giro, tipo de eixo e fixação da flange.'
  },
  'Comando hidráulico': {
    c: 'CH-2026',
    d: 'Comando hidráulico utilizado para controlar a direção e o fluxo do óleo no sistema, permitindo o acionamento de cilindros, motores e outros componentes hidráulicos.',
    r: [
      ['Tipo', 'Comando Hidráulico Direcional'],
      ['Acionamento', 'Manual por Alavanca'],
      ['Aplicação', 'Controle de Fluxo e Sentido dos Atuadores'],
      ['Uso', 'Máquinas Agrícolas, Tratores, Guinchos e Cilindros']
    ],
    t: 'Defina o número de estágios/alavancas (seções), vazão máxima e se o centro do circuito é aberto ou fechado.'
  },
  'Conexões pneumáticas': {
    k: 'pneu',
    c: 'CP-2026',
    d: 'Conexões pneumáticas utilizadas para unir mangueiras e tubos em sistemas de ar comprimido, facilitando a montagem e a manutenção das linhas pneumáticas.',
    r: [
      ['Tipo', 'Conexões Instantâneas Push-in'],
      ['Aplicação', 'Redes de Ar Comprimido e Automação'],
      ['Medidas', 'Tubos de 4 mm, 6 mm, 8 mm, 10 mm e 12 mm'],
      ['Uso', 'Sistemas Pneumáticos Industriais']
    ],
    t: 'Conexão prática tipo engate rápido para tubos de PU e Nylon. Exclusivo para circuitos de ar (não utilizar em circuitos de óleo).'
  },
  'Mangueira R7 termoplástica': {
    k: 'id',
    d: 'Mangueira leve e flexível com tubo e cobertura termoplásticos e reforço de fibra sintética trançada.',
    r: [
      ['Referência', 'Linha SAE 100 R7'],
      ['Estrutura', 'Tubo termoplástico, trama de fibra e cobertura termoplástica'],
      ['Aplicação', 'Máquinas e equipamentos que pedem leveza e boa flexibilidade']
    ],
    t: 'Verifique a compatibilidade do fluido com o tubo termoplástico.'
  },
  'Mangueira R12 (4 espirais)': {
    k: 'id',
    d: 'Mangueira de altíssima pressão com quatro espirais de arame de aço, feita para suportar pulsações constantes e ciclos severos.',
    r: [
      ['Referência', 'Linha SAE 100 R12'],
      ['Estrutura', 'Tubo de borracha sintética, 4 espirais de aço e cobertura reforçada'],
      ['Aplicação', 'Escavadeiras, carregadeiras, perfuratrizes e equipamentos pesados']
    ],
    t: 'Prefira para circuitos com picos constantes de pressão e ciclos dinâmicos frequentes.'
  },
  'Mangueira de sucção e retorno': {
    k: 'id',
    d: 'Mangueira de baixa pressão com espiral interna de aço para não colapsar sob vácuo, usada na sucção da bomba e no retorno ao tanque.',
    r: [
      ['Estrutura', 'Parede flexível com espiral de arame de reforço'],
      ['Aplicação', 'Linha de sucção de bombas hidráulicas e retorno de óleo ao reservatório']
    ],
    t: 'Utilize diâmetro generoso na sucção para evitar cavitação e danos irreparáveis à bomba.'
  },
  'Conexão curva 90° JIC': {
    d: 'Cotovelo de 90° com assento JIC 37°, que muda a direção da mangueira e evita dobras acentuadas.',
    r: [
      ['Norma', 'SAE J514 / ISO 8434-2 (JIC 37°)'],
      ['Aplicação', 'Espaços compactos e saídas de bombas, blocos e cilindros']
    ],
    t: 'Economiza espaço e protege a mangueira contra torções na montagem.'
  },
  'Conexão curva 45° JIC': {
    d: 'Cotovelo de 45° com assento JIC 37°, para desvios suaves da linha hidráulica.',
    r: [
      ['Norma', 'SAE J514 / ISO 8434-2 (JIC 37°)'],
      ['Aplicação', 'Ajuste de ângulo suave em montagens compactas']
    ],
    t: 'Excelente opção quando a curva de 90° deixa o raio de curvatura muito fechado.'
  },
  'Macho BSP': {
    d: 'Conexão com rosca macho BSP (padrão britânico de tubos), amplamente comum em equipamentos importados e tratores.',
    r: [
      ['Rosca', 'BSP: paralela (BSPP, ISO 228) ou cônica (BSPT, ISO 7)'],
      ['Aplicação', 'Equipamentos industriais e agrícolas com padrão britânico']
    ],
    t: 'Confirme se a rosca é paralela (com vedação por anel/arruela) ou cônica.'
  },
  'Fêmea BSP giratória': {
    d: 'Conexão fêmea BSP com porca giratória, que facilita a montagem sem torcer a mangueira durante o aperto.',
    r: [
      ['Rosca', 'BSP Cilíndrica'],
      ['Assento', 'Geralmente cônico de 60°'],
      ['Aplicação', 'Pontas de mangueiras conectadas a blocos ou motores BSP']
    ],
    t: 'Verifique o cone de vedação do componente que receberá a conexão.'
  },
  'Macho ORFS': {
    d: 'Conexão macho ORFS com assento plano e canal para anel O-ring na face.',
    r: [
      ['Norma', 'Padrão ORFS (SAE J1453 / ISO 8434-3)'],
      ['Vedação', 'O-ring na face']
    ],
    t: 'Combine sempre com a Fêmea ORFS da mesma medida.'
  },
  'Flange SAE 3000': {
    d: 'Flange de quatro parafusos com vedação por O-ring, ideal para linhas de grande diâmetro e alta vazão.',
    r: [
      ['Norma', 'SAE J518 série 3000 (Code 61)'],
      ['Vedação', 'O-ring na face do flange'],
      ['Aplicação', 'Bombas, motores e blocos de grande porte']
    ],
    t: 'Atenção às séries: Code 61 (3000 psi) e Code 62 (6000 psi) possuem furações diferentes.'
  },
  'Engate rápido fêmea': {
    d: 'Corpo fêmea de engate rápido com travamento por esferas e luva recuável.',
    r: [
      ['Rosca', 'NPT'],
      ['Aplicação', 'Linhas de engate e desengate rápido sem perda de fluido']
    ],
    t: 'Combine com o engate macho do mesmo tamanho e norma de acoplamento.'
  },
  'Adaptador T macho': {
    d: 'Adaptador em T com três pontas macho, que divide ou unifica linhas hidráulicas.',
    r: [
      ['Tipo', 'Derivação em T'],
      ['Aplicação', 'Ramificação de linhas e instalação de sensores ou manômetros']
    ],
    t: 'Confirme a bitola e rosca de cada uma das três vias.'
  },
  'Adaptador cotovelo 90° macho x fêmea': {
    d: 'Adaptador de 90° com uma ponta macho e uma fêmea giratória.',
    r: [
      ['Tipo', 'Macho x Fêmea 90°'],
      ['Aplicação', 'Saídas de válvulas, cilindros e bombas']
    ],
    t: 'Permite alterar a direção da porta sem forçar o raio da mangueira.'
  },
  'Adaptador de redução': {
    d: 'Adaptador de união para acoplar roscas de tamanhos diferentes.',
    r: [
      ['Tipo', 'Redução entre medidas'],
      ['Aplicação', 'Conversão de portas em blocos e componentes']
    ],
    t: 'A medida é sempre lida da rosca maior para a menor (ex.: 1/2 x 3/8).'
  },
  'Bujão macho NPT': {
    d: 'Bujão com sextavado para fechamento definitivo ou temporário de portas que não estão em uso.',
    r: [
      ['Rosca', 'NPT'],
      ['Aplicação', 'Vedação de portas em blocos, distribuidores e tanques']
    ],
    t: 'Use fita veda-rosca ou adesivo anaeróbico de vedação na instalação.'
  },
  'União reta fêmea x fêmea': {
    d: 'União reta com roscas fêmea nas duas extremidades, para união de dois terminais macho.',
    r: [
      ['Tipo', 'Fêmea x Fêmea'],
      ['Aplicação', 'Extensões de linhas e emendas seguras']
    ],
    t: 'Confirme o padrão de rosca dos dois lados antes de aplicar.'
  },
  'Cilindro hidráulico': {
    d: 'Atuador linear que transforma a potência hidráulica em força e movimento mecânico.',
    r: [
      ['Tipos comuns', 'Simples e Duplo Efeito'],
      ['Aplicação', 'Prensas, basculantes, braços articulados e elevação de cargas']
    ],
    t: 'Informe curso (deslocamento), diâmetro do êmbolo, diâmetro da haste e pressão de trabalho.'
  },
  'Filtro de linha': {
    d: 'Filtro para retenção contínua de partículas sólidas no fluido hidráulico, protegendo bombas e válvulas.',
    r: [
      ['Posições', 'Sucção, Pressão ou Retorno'],
      ['Aplicação', 'Circuitos hidráulicos em geral']
    ],
    t: 'Informe a vazão do sistema, micragem do elemento filtrante e a bitola de conexão.'
  },
  'Manômetro': {
    d: 'Instrumento analógico com visor de glicerina para medição precisa da pressão de trabalho.',
    r: [
      ['Escalas Disponíveis', '0 a 250 bar, 0 a 400 bar e 0 a 600 bar'],
      ['Preenchimento', 'Glicerina para amortecer vibrações de pulso'],
      ['Aplicação', 'Painéis, saídas de bomba e blocos de teste']
    ],
    t: 'Escolha um manômetro com escala de pico pelo menos 30% acima da pressão contínua de trabalho.'
  },
  'Válvula de retenção': {
    d: 'Válvula unidirecional que permite o fluxo de óleo em um sentido e bloqueia automaticamente no sentido oposto.',
    r: [
      ['Função', 'Bloqueio de Retorno Unidirecional'],
      ['Aplicação', 'Proteção de bombas e retenção de carga em cilindros']
    ],
    t: 'Informe a rosca de conexão, vazão máxima e a pressão de abertura da mola interna.'
  },
  'Válvula reguladora de pressão': {
    d: 'Válvula de alívio ou regulagem que limita a pressão máxima do circuito, prevenindo sobrecargas.',
    r: [
      ['Função', 'Alívio e Segurança do Circuito'],
      ['Aplicação', 'Centrais hidráulicas, prensas e unidades hidráulicas']
    ],
    t: 'Informe a faixa de regulagem de pressão e a vazão nominal do sistema.'
  },
  'Mini central hidráulica': {
    d: 'Conjunto compacto pronto para operação composto por motor elétrico, bomba, tanque de óleo e bloco de válvulas.',
    r: [
      ['Composição', 'Motor elétrico, bomba de engrenagens, reservatório e válvulas de retenção/alívio'],
      ['Aplicação', 'Plataformas de elevação, prensas de pequeno porte e mesas pantográficas']
    ],
    t: 'Informe a tensão do motor (12V, 24V, 220V ou 380V), volume do reservatório e pressão desejada.'
  }
};

const $$ = id => document.getElementById(id);
let cat = 'all', q = '', shown = 12;
const cart = [];

// ATUALIZAÇÃO DOS CONTADORES
$$('yrs').dataset.n = new Date().getFullYear() - 2017;
$$('pcn').dataset.n = P.length;

// RENDERIZADOR DO CATÁLOGO DE PRODUTOS
function render() {
  const s = q.trim().toLowerCase();
  const filtered = P.map((p, i) => [p, i]).filter(([p]) => {
    const matchCat = (cat === 'all' || p[1] === cat);
    const dObj = D[p[0]] || {};
    const code = (dObj.c || '').toLowerCase();
    const searchString = (p[0] + ' ' + code + ' ' + p[2].join(' ')).toLowerCase();
    const matchSearch = !s || searchString.includes(s);
    return matchCat && matchSearch;
  });

  const listEl = $$('pl');
  if (!filtered.length) {
    listEl.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-size: 1.05rem;">Nenhum produto encontrado para sua busca. Entre em contato pelo formulário ou WhatsApp que localizamos para você!</p>';
  } else {
    listEl.innerHTML = filtered.slice(0, shown).map(([p, i]) => {
      const dObj = D[p[0]] || {};
      const desc = dObj.d || 'Produto de alta confiabilidade para sistemas hidráulicos industriais e agrícolas.';
      const codeHtml = dObj.c ? \`<span class="code-badge">Cód: \${dObj.c}</span>\` : '';
      
      return \`
        <article class="pc" data-i="\${i}">
          <div class="ph" onclick="openD(\${i})">
            <span>\${E[p[1]]}</span>
            \${p[3] ? \`<img src="img/produtos/\${p[3]}" alt="\${p[0]}" loading="lazy" onerror="this.remove()">\` : ''}
          </div>
          <div class="pb">
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
              <span class="pb-cat">\${CN[p[1]]}</span>
              \${codeHtml}
            </div>
            <h3 onclick="openD(\${i})" style="cursor: pointer;">\${p[0]}</h3>
            <p class="pd">\${desc}</p>
            \${p[2].length ? \`
              <small class="sz-label">Escolha a medida:</small>
              <div class="sz">
                \${p[2].map(z => \`<button type="button" aria-pressed="false">\${z}</button>\`).join('')}
              </div>
              <p class="si"></p>
            \` : '<small style="color: #64748b; font-weight: 600; margin-top: 4px;">Medidas sob consulta / padrão técnico</small>'}
            <div class="acts">
              <button class="det" data-i="\${i}" type="button">Ver detalhes</button>
              <button class="add" data-i="\${i}" type="button">Adicionar</button>
            </div>
          </div>
        </article>
      \`;
    }).join('');
  }

  $$('cc').textContent = filtered.length + (filtered.length === 1 ? ' produto disponível' : ' produtos encontrados');
  const mb = $$('more');
  mb.hidden = filtered.length <= shown;
  mb.textContent = 'Ver mais produtos (' + (filtered.length - shown) + ' restantes)';
}

// FORMATADOR DE TEXTO PARA WHATSAPP
const getCartText = () => {
  return 'Olá, Andermaq! Gostaria de solicitar um orçamento:\\n' +
    cart.map(c => '• ' + c.q + 'x ' + c.n + (c.s ? ' (Medida: ' + c.s + ')' : '')).join('\\n') +
    '\\nAguardo o retorno da equipe técnica. Obrigado!';
};

// ATUALIZAÇÃO DO CARRINHO / MINHA COTAÇÃO
function upd() {
  const n = cart.reduce((acc, c) => acc + c.q, 0);
  $$('cn').textContent = n;
  $$('cb').classList.toggle('show', n > 0);

  const dl = $$('dl');
  if (!cart.length) {
    dl.innerHTML = '<p style="text-align: center; color: #64748b; padding: 20px 0;">Nenhum produto adicionado ainda.<br>Explore o catálogo acima e monte seu pedido!</p>';
  } else {
    dl.innerHTML = cart.map((c, i) => \`
      <div class="it">
        <div>
          <b>\${c.n}</b><br>
          <small>\${c.s ? 'Medida: ' + c.s : 'Medida a especificar'}</small>
        </div>
        <div class="q">
          <button type="button" data-a="-1" data-i="\${i}" aria-label="Diminuir">−</button>
          <span>\${c.q}</span>
          <button type="button" data-a="1" data-i="\${i}" aria-label="Aumentar">+</button>
        </div>
      </div>
    \`).join('');
  }

  $$('dwa').href = 'https://wa.me/5519981128608?text=' + encodeURIComponent(getCartText());
  const qn = $$('qnote');
  qn.hidden = !n;
  qn.textContent = '🛒 ' + n + (n === 1 ? ' item selecionado no catálogo será incluído' : ' itens selecionados no catálogo serão incluídos') + ' na sua mensagem de cotação.';
}

// EVENTOS DO CATÁLOGO DE PRODUTOS
$$('pl').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;

  if (b.classList.contains('det')) {
    openD(+b.dataset.i);
    return;
  }

  if (b.closest('.sz')) {
    const isPressed = b.getAttribute('aria-pressed') === 'true';
    b.parentNode.querySelectorAll('button').forEach(btn => btn.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', String(!isPressed));

    const siEl = b.closest('.pb').querySelector('.si');
    if (siEl) {
      if (isPressed) {
        siEl.textContent = '';
      } else {
        const pIndex = +b.closest('.pc').dataset.i;
        siEl.textContent = getMeasureDesc(P[pIndex][0], b.textContent);
      }
    }
    return;
  }

  if (b.classList.contains('add')) {
    const p = P[b.dataset.i];
    const sel = b.closest('.pb').querySelector('.sz button[aria-pressed="true"]');
    const s = sel ? sel.textContent : '';

    const existing = cart.find(c => c.n === p[0] && c.s === s);
    if (existing) {
      existing.q++;
    } else {
      cart.push({ n: p[0], s, q: 1 });
    }
    upd();

    b.textContent = 'Adicionado ✓';
    b.classList.add('ok');
    setTimeout(() => {
      b.textContent = 'Adicionar';
      b.classList.remove('ok');
    }, 1200);
  }
});

// EVENTOS DO DRAWER DO CARRINHO
$$('dl').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  const item = cart[b.dataset.i];
  item.q += Number(b.dataset.a);
  if (item.q < 1) {
    cart.splice(b.dataset.i, 1);
  }
  upd();
});

// ABAS DE CATEGORIA
$$('tb').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  cat = b.dataset.c;
  shown = 12;
  $$('tb').querySelectorAll('button').forEach(btn => btn.setAttribute('aria-pressed', String(btn === b)));
  render();
});

// BUSCA EM TEMPO REAL
$$('sq').addEventListener('input', e => {
  q = e.target.value;
  shown = 12;
  render();
});

// BOTÃO VER MAIS
$$('more').onclick = () => {
  shown += 12;
  render();
};

// DRAWER TOGGLE
const dr = $$('dr'), sh = $$('sh');
const toggleDrawer = open => {
  dr.classList.toggle('open', open);
  sh.classList.toggle('open', open);
  if (open) $$('dx').focus();
};
$$('cb').onclick = () => toggleDrawer(true);
$$('dx').onclick = $$('sh').onclick = $$('dgo').onclick = () => toggleDrawer(false);
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    toggleDrawer(false);
    closeD();
  }
});

// CATEGORY CLICKS NO HERO/STRIP
document.querySelectorAll('.highlight-card[data-c]').forEach(card => {
  card.addEventListener('click', () => {
    cat = card.dataset.c;
    shown = 12;
    $$('tb').querySelectorAll('button').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.c === cat)));
    render();
  });
});

// CÁLCULO DINÂMICO DE HORÁRIO DE FUNCIONAMENTO (HORÁRIO DE BRASÍLIA)
const brTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
const isOpen = brTime.getDay() > 0 && brTime.getDay() < 6 && brTime.getHours() >= 8 && brTime.getHours() < 18;
document.querySelectorAll('.openb').forEach(b => {
  b.classList.toggle('on', isOpen);
  b.lastChild.textContent = isOpen ? 'Aberto agora · Fechamos às 18:00' : 'Fechado agora · Atendemos de seg a sex, 8h às 18h';
});

// ANIMAÇÃO DOS NÚMEROS DO SOBRE
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-n]').forEach(el => {
  const targetNum = +el.dataset.n;
  el.textContent = reduceMotion ? targetNum : 0;
  if (reduceMotion) return;

  new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      let startTime = null;
      const animateCount = timestamp => {
        startTime = startTime || timestamp;
        const progress = Math.min((timestamp - startTime) / 1200, 1);
        el.textContent = Math.round(targetNum * progress);
        if (progress < 1) requestAnimationFrame(animateCount);
      };
      requestAnimationFrame(animateCount);
    }
  }).observe(el);
});

// FUNÇÃO EXPLICATIVA DE MEDIDAS
function getMeasureDesc(prodName, measure) {
  if (!measure) return '';
  const dObj = D[prodName] || {};
  if (dObj.k === 'id' && ID[measure]) {
    return 'Diâmetro interno nominal: ' + measure + '" ≈ ' + ID[measure];
  }
  if (dObj.k === 'th') {
    const match = measure.match(new RegExp('(\\\\d+(?:/\\\\d+)?)\\\\s*x\\\\s*(\\\\d+(?:/\\\\d+)?)', 'i'));
    if (match) {
      return 'Rosca/Porca: ' + match[1] + '" · Mangueira/Tubo: ' + match[2] + '"';
    }
  }
  if (dObj.k === 'pneu') {
    return 'Diâmetro externo do tubo de ar comprimido (PU/Nylon): ' + measure;
  }
  if (measure.includes('NPT')) {
    return 'Padrão de rosca cônica NPT: ' + measure;
  }
  return 'Medida selecionada: ' + measure;
}

// MODAL DE DETALHES TÉCNICOS
let modalProdIndex = 0, modalSelectedMeasure = '', modalQuantity = 1;

function updateModalWhatsAppLink() {
  const p = P[modalProdIndex];
  const msg = 'Olá, equipe Andermaq! Tenho interesse no item ' + p[0] +
    (modalSelectedMeasure ? ' (Medida: ' + modalSelectedMeasure + ')' : '') +
    '. Pode me informar disponibilidade e valor?';
  $$('mwa').href = 'https://wa.me/5519981128608?text=' + encodeURIComponent(msg);
}

function openD(index) {
  modalProdIndex = index;
  modalSelectedMeasure = '';
  modalQuantity = 1;
  const p = P[index];
  const dObj = D[p[0]] || {};

  $$('mt2').textContent = p[0];
  $$('mcat').textContent = CN[p[1]];
  $$('mcode').textContent = dObj.c ? 'Código: ' + dObj.c : 'Código técnico padrão Andermaq';
  $$('mds').textContent = dObj.d || 'Componente de alta qualidade e precisão dimensional para sistemas hidráulicos industriais, agrícolas e móveis.';

  // Tabela técnica
  const tableRows = [
    ['Categoria', CN[p[1]]],
    ...(dObj.c ? [['Código Oficial', dObj.c]] : []),
    ...(dObj.r || []),
    ['Medidas Disponíveis', p[2].length ? p[2].length + ' opções' : 'Sob consulta'],
    ...(dObj.t ? [['Dica de Escolha', dObj.t]] : [])
  ];

  $$('mtb').innerHTML = tableRows.map(r => \`<tr><th>\${r[0]}</th><td>\${r[1]}</td></tr>\`).join('');

  $$('mph').innerHTML = \`
    <span>\${E[p[1]]}</span>
    \${p[3] ? \`<img src="img/produtos/\${p[3]}" alt="\${p[0]}" onerror="this.remove()">\` : ''}
  \`;

  const msz = $$('msz');
  if (p[2].length) {
    msz.innerHTML = \`
      <small class="sz-label">Escolha a medida desejada:</small>
      <div class="sz">
        \${p[2].map(z => \`<button type="button" aria-pressed="false">\${z}</button>\`).join('')}
      </div>
      <p class="si" style="margin-top: 6px;"></p>
    \`;
  } else {
    msz.innerHTML = '';
  }

  $$('mqn').textContent = 1;
  updateModalWhatsAppLink();
  $$('md').classList.add('open');
  document.body.style.overflow = 'hidden';
  $$('mx').focus();
}

function closeD() {
  $$('md').classList.remove('open');
  document.body.style.overflow = '';
}

$$('md').addEventListener('click', e => {
  if (e.target === $$('md')) closeD();
});
$$('mx').onclick = closeD;

$$('msz').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  const isPressed = b.getAttribute('aria-pressed') === 'true';
  b.parentNode.querySelectorAll('button').forEach(btn => btn.setAttribute('aria-pressed', 'false'));
  b.setAttribute('aria-pressed', String(!isPressed));
  modalSelectedMeasure = isPressed ? '' : b.textContent;
  
  const siEl = $$('msz').querySelector('.si');
  if (siEl) {
    siEl.textContent = modalSelectedMeasure ? getMeasureDesc(P[modalProdIndex][0], modalSelectedMeasure) : '';
  }
  updateModalWhatsAppLink();
});

document.querySelectorAll('.mq .step button').forEach(b => {
  b.onclick = () => {
    modalQuantity = Math.max(1, modalQuantity + Number(b.dataset.a));
    $$('mqn').textContent = modalQuantity;
  };
});

$$('madd').onclick = () => {
  const p = P[modalProdIndex];
  const existing = cart.find(c => c.n === p[0] && c.s === modalSelectedMeasure);
  if (existing) {
    existing.q += modalQuantity;
  } else {
    cart.push({ n: p[0], s: modalSelectedMeasure, q: modalQuantity });
  }
  upd();
  closeD();
  toggleDrawer(true);
};

// ÁREA DO CLIENTE & HISTÓRICO LOCAL
const getStored = k => {
  try { return localStorage.getItem(k) || sessionStorage.getItem(k); } catch (e) { return null; }
};
const setStored = (k, v) => {
  try { localStorage.setItem(k, v); } catch (e) {}
};
const escapeHtml = str => String(str).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

let users = {};
try { users = JSON.parse(getStored('am_users') || '{}'); } catch (e) {}
let currentUser = getStored('am_me');
if (!users[currentUser]) currentUser = null;

const setCurrentUser = (email, remember) => {
  currentUser = email;
  try {
    localStorage.removeItem('am_me');
    sessionStorage.removeItem('am_me');
    if (email) {
      (remember ? localStorage : sessionStorage).setItem('am_me', email);
    }
  } catch (e) {}
};

const hashPw = async (email, pw) => {
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode('andermaq:' + email + ':' + pw)))]
    .map(b => b.toString(16).padStart(2, '0')).join('');
};

const isValidEmail = v => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v);

const fieldError = (el, msg) => {
  const f = el.closest('.f');
  f.classList.add('err');
  f.querySelector('.msg').textContent = msg;
  el.focus();
};

function switchAuthForm(formId) {
  ['fin', 'fup', 'ffg'].forEach(id => { $$(id).hidden = (id !== formId); });
  document.querySelectorAll('.lt button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.t === formId)));
  document.querySelectorAll('.lmsg').forEach(m => { m.textContent = ''; m.className = 'lmsg'; });
}

function updateAuthUI() {
  $$('auth').hidden = !!currentUser;
  $$('acct').hidden = !currentUser;
  $$('lg').textContent = currentUser ? 'Olá, ' + users[currentUser].n.split(' ')[0] : 'Login';

  if (currentUser) {
    $$('an').textContent = 'Bem-vindo(a), ' + users[currentUser].n;
    $$('ae').textContent = currentUser;

    let history = [];
    try { history = JSON.parse(getStored('am_q_' + currentUser) || '[]'); } catch (e) {}
    $$('ah').innerHTML = history.length ? history.map(x => \`
      <li>
        <b>\${escapeHtml(x.d)}</b><br>
        <small>\${escapeHtml(x.t)}</small>
      </li>
    \`).join('') : '<li style="color: #64748b;"><small>Nenhuma cotação salva ainda.</small></li>';

    if (!$$('nome').value) $$('nome').value = users[currentUser].n;
    if (!$$('email').value) $$('email').value = currentUser;
  }
}

function saveQuoteToHistory(lines) {
  if (!currentUser) return;
  let history = [];
  try { history = JSON.parse(getStored('am_q_' + currentUser) || '[]'); } catch (e) {}
  history.unshift({
    d: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    t: lines.slice(3).join(' · ').slice(0, 180)
  });
  setStored('am_q_' + currentUser, JSON.stringify(history.slice(0, 8)));
  updateAuthUI();
}

document.querySelectorAll('.lt button').forEach(b => b.onclick = () => switchAuthForm(b.dataset.t));
$$('forg').onclick = e => { e.preventDefault(); switchAuthForm('ffg'); };
$$('fbk').onclick = () => switchAuthForm('fin');

document.querySelectorAll('.eye').forEach(b => {
  b.onclick = () => {
    const input = b.previousElementSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
  };
});

$$('auth').addEventListener('input', e => {
  const f = e.target.closest('.f');
  if (f) {
    f.classList.remove('err');
    f.querySelector('.msg').textContent = '';
  }
});

$$('fin').addEventListener('submit', async e => {
  e.preventDefault();
  const em = $$('lem'), pw = $$('lpw'), k = em.value.trim().toLowerCase();
  if (!isValidEmail(k)) return fieldError(em, 'Informe um e-mail válido.');
  if (!pw.value) return fieldError(pw, 'Informe sua senha.');

  const u = users[k];
  if (!u || u.h !== await hashPw(k, pw.value)) {
    $$('lm1').textContent = 'E-mail ou senha incorretos.';
    return;
  }
  setCurrentUser(k, $$('lrm').checked);
  pw.value = '';
  updateAuthUI();
});

$$('fup').addEventListener('submit', async e => {
  e.preventDefault();
  const n = $$('snm'), e1 = $$('sem'), p1 = $$('spw'), p2 = $$('spc');
  const k = e1.value.trim().toLowerCase();

  if (n.value.trim().length < 2) return fieldError(n, 'Informe seu nome ou razão social.');
  if (!isValidEmail(k)) return fieldError(e1, 'Informe um e-mail válido.');
  if (p1.value.length < 6) return fieldError(p1, 'Use pelo menos 6 caracteres na senha.');
  if (p1.value !== p2.value) return fieldError(p2, 'As senhas digitadas não coincidem.');

  if (users[k]) {
    $$('lm2').textContent = 'Este e-mail já possui cadastro. Use a aba Entrar.';
    return;
  }

  users[k] = { n: n.value.trim(), h: await hashPw(k, p1.value) };
  setStored('am_users', JSON.stringify(users));
  setCurrentUser(k, true);
  [n, e1, p1, p2].forEach(x => { x.value = ''; });
  updateAuthUI();
});

$$('ffg').addEventListener('submit', e => {
  e.preventDefault();
  const f = $$('fem'), k = f.value.trim();
  if (!isValidEmail(k)) return fieldError(f, 'Informe um e-mail válido.');
  const m = $$('lm3');
  m.className = 'lmsg ok';
  m.textContent = 'Link de redefinição enviado com sucesso para ' + k + '.';
});

$$('alo').onclick = () => {
  setCurrentUser(null);
  updateAuthUI();
  switchAuthForm('fin');
};

updateAuthUI();
render();
upd();

// FORMULÁRIO DE COTAÇÃO
const qf = $$('qf');
if (qf) {
  const tel = $$('tel'), qtd = $$('qtd'), desc = $$('desc'), cnt = $$('cnt');

  // MÁSCARA AUTOMÁTICA DE TELEFONE
  tel.addEventListener('input', () => {
    const raw = tel.value.replace(/\\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 10) {
      formatted = '(' + raw.slice(0, 2) + ') ' + raw.slice(2, 7) + '-' + raw.slice(7);
    } else if (raw.length > 6) {
      formatted = '(' + raw.slice(0, 2) + ') ' + raw.slice(2, 6) + '-' + raw.slice(6);
    } else if (raw.length > 2) {
      formatted = '(' + raw.slice(0, 2) + ') ' + raw.slice(2);
    } else if (raw.length) {
      formatted = '(' + raw;
    }
    tel.value = formatted;
  });

  // STEPPER DE QUANTIDADE
  qf.querySelectorAll('.step button').forEach(b => {
    b.onclick = () => {
      qtd.value = Math.max(1, (parseInt(qtd.value) || 0) + Number(b.dataset.d));
    };
  });
  qtd.addEventListener('input', () => { qtd.value = qtd.value.replace(/\\D/g, ''); });
  qtd.addEventListener('blur', () => { if (!qtd.value || +qtd.value < 1) qtd.value = 1; });

  desc.addEventListener('input', () => { cnt.textContent = desc.value.length + '/500'; });

  const valRules = {
    nome: v => v.trim().length >= 2 || 'Por favor, informe seu nome.',
    email: v => isValidEmail(v) || 'Informe um e-mail válido.',
    tel: v => !v || v.replace(/\\D/g, '').length >= 10 || 'Telefone com DDD incompleto.'
  };

  const validateField = el => {
    const f = el.closest('.f');
    const res = valRules[el.id](el.value);
    const isValid = (res === true);
    f.classList.toggle('err', !isValid);
    f.classList.toggle('ok', isValid && !!el.value);
    f.querySelector('.msg').textContent = isValid ? '' : res;
    return isValid;
  };

  Object.keys(valRules).forEach(id => {
    const el = $$(id);
    if (el) {
      el.addEventListener('blur', () => validateField(el));
      el.addEventListener('input', () => {
        if (el.closest('.f').classList.contains('err')) validateField(el);
      });
    }
  });

  qf.addEventListener('submit', async e => {
    e.preventDefault();
    const invalidIds = Object.keys(valRules).filter(id => {
      const el = $$(id);
      return el && !validateField(el);
    });

    if (invalidIds.length) {
      $$(invalidIds[0]).focus();
      return;
    }

    const selectedCategory = qf.querySelector('input[name="prod"]:checked').value;
    const itemsList = cart.length ? cart.map(c => c.q + 'x ' + c.n + (c.s ? ' (' + c.s + ')' : '')).join('; ') : '';

    const lines = [
      'Nome / Razão: ' + $$('nome').value.trim(),
      'E-mail: ' + $$('email').value.trim(),
      'Telefone / WhatsApp: ' + ($$('tel').value || 'Não informado'),
      'Linha Principal: ' + selectedCategory,
      'Quantidade Estimada: ' + qtd.value,
      'Detalhes / Aplicação: ' + (desc.value.trim() || 'Conforme especificado no catálogo'),
      ...(itemsList ? ['Itens do Catálogo: ' + itemsList] : [])
    ];

    $$('sum').textContent = lines.join('\\n');

    const mailUrl = 'mailto:anderson@andermaqmangueiras.com?subject=' +
      encodeURIComponent('Cotação Andermaq - ' + selectedCategory) +
      '&body=' + encodeURIComponent(lines.join('\\n'));

    const waMsg = 'Olá, Andermaq! Gostaria de solicitar uma cotação:\\n\\n' + lines.join('\\n');
    const waUrl = 'https://wa.me/5519981128608?text=' + encodeURIComponent(waMsg);

    $$('mt').href = mailUrl;
    $$('fwa').href = waUrl;

    const submitBtn = qf.querySelector('button[type="submit"]');
    const origBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando cotação...';
    submitBtn.disabled = true;

    // Disparo automático em segundo plano via FormSubmit
    const payload = {
      _subject: 'Nova Cotação Andermaq - ' + selectedCategory,
      _template: 'table',
      _captcha: 'false',
      _replyto: $$('email').value.trim(),
      Nome_Cliente: $$('nome').value.trim(),
      Email_Contato: $$('email').value.trim(),
      Telefone: ($$('tel').value || 'Não informado'),
      Linha_Produto: selectedCategory,
      Quantidade_Estimada: qtd.value,
      Descricao_Pedido: (desc.value.trim() || 'Conforme especificado no catálogo'),
      Itens_Selecionados: itemsList || 'Nenhum item adicional selecionado no carrinho'
    };

    try {
      const resp = await fetch('https://formsubmit.co/ajax/anderson@andermaqmangueiras.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const resJson = await resp.json();
      console.log('Envio de cotação:', resJson);
    } catch (err) {
      console.warn('Tentativa de envio em segundo plano:', err);
    } finally {
      submitBtn.textContent = origBtnText;
      submitBtn.disabled = false;
      qf.classList.add('sent');
      saveQuoteToHistory(lines);
    }
  });

  qf.querySelector('.again').onclick = () => {
    qf.reset();
    qtd.value = 1;
    cnt.textContent = '0/500';
    qf.querySelectorAll('.f').forEach(f => f.classList.remove('err', 'ok'));
    qf.querySelectorAll('.msg').forEach(m => m.textContent = '');
    qf.classList.remove('sent');
  };
}
</script>
</body>
</html>
`;

// Write to both destinations
fs.writeFileSync('c:/Users/Pichau/Downloads/OneDrive/Documents/Desktop/tcc.front-end/index.html', html, 'utf8');
console.log('Updated workspace index.html successfully!');

fs.writeFileSync('C:/Users/Pichau/Downloads/Andermaq _ Mangueiras Hidráulicas.html', html, 'utf8');
console.log('Updated Downloads artifact successfully!');
