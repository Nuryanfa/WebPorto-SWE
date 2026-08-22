# PRD v2 — Observatory Portfolio (Presisi & Spesifik)

**Pemilik:** Nur Yanfa · **Stack:** React + TypeScript · **Bahasa konten:** English
**Versi:** 2.0 — menggantikan PRD v1 (Astronomy) dengan spesifikasi presisi
**Status:** Ready-to-build. Setiap angka di dokumen ini adalah keputusan final,
bukan saran — kalau builder/AI tool butuh ambil keputusan sendiri di luar dokumen
ini, itu tanda dokumennya kurang lengkap, bukan tanda builder boleh improvisasi.

---

## 0. Cara Pakai Dokumen Ini

Dokumen ini ditulis supaya bisa di-paste **langsung** sebagai prompt/brief ke:
Figma Make, Google Stitch, Claude Code, atau agent lain — tanpa perlu tambahan
interpretasi. Setiap section punya: **nilai exact** (bukan "sekitar"), **copy
final** (bukan placeholder), dan **larangan eksplisit** (supaya tidak balik ke
pola generik).

---

## 1. Ringkasan Konsep (1 paragraf, untuk konteks)

Portfolio dengan identitas **"observatory / star catalog"**: astronomi diperlakukan
sebagai sistem informasi presisi (koordinat, designation number, orbit), bukan
wallpaper luar angkasa dekoratif. Setiap elemen visual astronomi WAJIB mengkodekan
data nyata — kalau elemen itu dihapus, informasi juga ikut hilang. Kalau elemen
astronomi cuma dekorasi (bisa dihapus tanpa kehilangan informasi), itu salah dan
harus dibuang.

---

## 2. Design Tokens (Nilai Final — Tidak Boleh Diubah Tanpa Alasan Kuat)

### 2.1 Warna (hex exact, sudah diaudit kontras)

```css
--bg-void:            #080A12
--bg-panel:           #10131F
--bg-elevated:        #171B2A

--text-star:          #EDEFF7   /* body/heading utama */
--text-dim:           #767F94   /* metadata/label — kontras 5.1:1 di atas bg-void, lolos WCAG AA */
--text-faint:         #454C5E   /* HANYA untuk elemen non-esensial/disabled, JANGAN untuk teks yang harus dibaca */

--accent-nebula:      #7C6FF0   /* SATU-SATUNYA warna untuk semua elemen interaktif */
--accent-nebula-dim:  #241F42   /* background hover/glow, TIDAK untuk teks */
--accent-solar:       #F2A65A   /* HANYA untuk: 1 bintang utama di hero, badge "featured", status "in progress" */

--line-hairline:        rgba(237, 239, 247, 0.10)
--line-hairline-strong: rgba(237, 239, 247, 0.22)
```

**Aturan keras — tidak ada warna ketiga.** Kalau builder/AI menambah warna lain
(hijau untuk "success", merah untuk "error", dsb), itu salah — gunakan
`accent-nebula` untuk semua state positif/interaktif, `accent-solar` untuk semua
highlight/attention state. Dua aksen ini harus cukup untuk semua kebutuhan situs.

### 2.2 Tipografi (ukuran & weight exact)

| Role | Font | Size (desktop) | Size (mobile) | Weight | Letter-spacing |
|---|---|---|---|---|---|
| Hero H1 | Space Grotesk | 96px | 48px | 700 | 0.01em |
| Section H2 | Space Grotesk | 40px | 28px | 700 | 0.02em |
| Body large | Inter | 20px | 17px | 400 | 0 |
| Body regular | Inter | 16px | 15px | 400 | 0 |
| Label/eyebrow | JetBrains Mono | 12px | 11px | 400 | 0.15em (uppercase) |
| Metadata (designation, coord) | JetBrains Mono | 13px | 12px | 400 | 0.05em |

**Line-height:** 1.1 untuk heading, 1.6 untuk body, 1.4 untuk metadata mono.

### 2.3 Spacing Scale (px, dipakai konsisten — jangan pakai angka di luar skala ini)

```
4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160
```
Jarak antar-section (vertical padding): **128px desktop / 64px mobile**, konsisten
di SEMUA section — tidak boleh ada section dengan jarak lebih besar/kecil tanpa
alasan eksplisit yang dicatat.

### 2.4 Motion (durasi & easing exact)

| Interaksi | Durasi | Easing |
|---|---|---|
| Signature reveal (blur→fokus) | 600ms | `cubic-bezier(0.65, 0, 0.35, 1)` |
| Hover micro-interaction | 150–200ms | spring (stiffness 300, damping 25) |
| Ambient starfield parallax | continuous, damping factor 0.05 (sangat halus) | linear |
| Ambient pulse (bintang utama) | 3000ms, infinite loop | ease-in-out |
| Page transition | 400ms | `cubic-bezier(0.65, 0, 0.35, 1)` |

---

## 3. Layout Exact per Section (Desktop 1440px)

### 3.1 Hero — Star Chart

**Struktur asimetris wajib (BUKAN teks di tengah viewport):**
- Viewport height: 100vh
- Blok teks identitas: posisi **left: 8%, top: 55%** (bukan vertically-centered),
  lebar maksimum 480px
- Bintang "sistem utama" (`accent-solar`, diameter 8px, dengan glow blur-radius 12px):
  posisi **right: 22%, top: 30%**
- Garis leader-line (1px, `accent-nebula`, opacity 0.5): menghubungkan bintang
  utama ke sudut kiri-atas blok teks identitas — digambar dengan sudut, BUKAN garis
  lurus horizontal/vertikal (garis diagonal terasa lebih seperti "chart", garis
  lurus terasa seperti UI form)
- Starfield ambient: 90 titik, ukuran 1–2px, opacity 0.3–0.7 (variasi acak seeded),
  tersebar merata di seluruh viewport MINUS radius 150px di sekitar blok teks
  (supaya teks tidak "tenggelam" di starfield)

**Urutan konten (atas ke bawah dalam blok teks — urutan ini final, jangan dibalik):**
```
DESIGNATION //                          [label, 12px mono, text-dim]
NUR YANFA                                [H1, 96px, text-star]
CLASSIFICATION: Cybersecurity & Software Engineer   [16px, accent-nebula untuk value]
COORD: 07h 45m · SECTOR — Network Defense           [13px mono, text-dim]
MAGNITUDE: Undergraduate · STATUS: Observing         [13px mono, text-dim]

[View Projects — solid button]  [Download CV → — text link]
```

**Tombol (spec exact untuk fix bug invisible-text):**
- Solid button: `padding: 14px 28px`, `background: accent-nebula`, `color: bg-void`
  (bukan text-star — kontras lebih tegas), `clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)`
  diterapkan pada elemen YANG SAMA dengan teksnya (satu `<button>`, bukan nested
  div terpisah)
- Text link: `color: text-star`, underline muncul on-hover saja, arrow `→` dengan
  `margin-left: 8px`, translate-x 4px on hover

### 3.2 About — Observation Log

- Max-width konten: 640px, posisi **left: 8%** (align dengan hero, bukan center)
- Copy final (paste langsung, jangan re-generate):

```
LOG_ENTRY // 001

Informatics Engineering undergraduate with a deep focus on cybersecurity and
network defense. Currently developing a Purple Team Exercise Framework as
thesis research — bridging the gap between offensive and defensive security
operations through structured, repeatable assessments.

Beyond security, experienced in building web applications, administering
network infrastructure, and working with containerized environments. Driven
by the belief that understanding how systems break is the foundation for
building systems that hold.
```
(Highlight `cybersecurity` dan `network defense` di paragraf pertama dengan
`accent-nebula`.)

### 3.3 Skills — Orbital Diagram

**Geometri exact:**
- Canvas diagram: 800×800px (desktop), center di tengah canvas
- Sun (pemilik): radius 16px, `accent-solar`, label "YOU ARE HERE" di bawahnya
  (11px mono, text-dim, margin-top 8px)
- 3 orbit ring (`stroke: line-hairline`, `stroke-width: 1px`, `fill: none`):
  - Orbit 1 (Security): radius 180px
  - Orbit 2 (Networking): radius 280px
  - Orbit 3 (Development): radius 360px
- Planet size berdasar skill depth (rata-rata level skill dalam kategori):
  - `radius = 16 + (avgLevel / 100) * 20` → range 16–36px
- Posisi sudut planet: distribusikan merata (Security di 45°, Networking di 200°,
  Development di 290° dari titik pusat) — **jangan tumpuk di satu sisi**

**Data mapping (dari `skills.ts`):**
```ts
interface SkillCategory {
  id: string;
  label: string;
  orbitIndex: 1 | 2 | 3;   // menentukan radius ring, WAJIB salah satu dari 3
  angle: number;            // derajat posisi di orbit
  skills: { name: string; level: number }[]; // level 0-100, dipakai hitung avgLevel
}
```
**Validasi wajib:** setiap `orbitIndex` harus punya ring yang digambar — kalau ada
kategori skill baru ditambah dengan `orbitIndex: 4`, sistem HARUS otomatis gambar
Orbit 4, bukan planet mengambang tanpa ring (ini bug yang terjadi sebelumnya).

**Interaksi:** klik planet → expand panel di bawah diagram menampilkan list skill
individual dengan level bar. Bukan tooltip hover-only (supaya accessible di mobile/touch).

**Mobile fallback (< 768px):** ganti total ke list vertikal, urutan dari
`orbitIndex` terkecil ke terbesar, format:
```
01 · SECURITY (closest)
    Network Security ████████░░ 75%
    IPSec / VPN       ██████░░░░ 65%
```

### 3.4 Projects — Catalog Entries

**Grid:** 3 kolom desktop (gap 24px), 1 kolom mobile
**Card padding:** 24px semua sisi — **cek eksplisit bahwa padding-left ≥ lebar
teks "MAGNITUDE:" pada font 13px mono supaya tidak terpotong** (bug sebelumnya)

**Format card (copy final untuk 3 placeholder — ganti nanti dengan proyek asli):**
```
OBJ-01 · SECTOR: SECURITY                          [featured badge jika ada]
Purple Team Exercise Framework
A comprehensive framework for conducting purple team exercises, bridging
offensive and defensive security operations in controlled environments.
MAGNITUDE: Thesis-grade                    STATUS: In Progress

OBJ-02 · SECTOR: NETWORKING
Network Monitoring Dashboard
Real-time network traffic monitoring dashboard with anomaly detection,
packet analysis, and alert system for campus network infrastructure.
MAGNITUDE: Course Project                  STATUS: Completed

OBJ-03 · SECTOR: DEVELOPMENT
Community Waste Management System
Web-based waste management and tracking system developed during a
community service program for local village administration.
MAGNITUDE: Community Service                STATUS: Completed
```

### 3.5 Timeline — Orbital Path

**Path:** SVG bezier curve (BUKAN garis lurus), viewBox 0 0 800 600, path dari
`M 50,50 C 200,150 100,300 300,350 C 450,380 400,500 700,550`
(kurva melengkung natural, bukan zigzag tajam)

**Posisi dot:** dihitung via `path.getPointAtLength()` di titik-titik proporsional
sepanjang path (0%, 25%, 50%, 75%, 100% dari total length) — dot HARUS presisi di
garis, label tahun diposisikan **di samping dot dengan offset 16px**, BUKAN
menimpa dot (bug sebelumnya).

**Copy final (5 entri):**
```
2018–2021 · EDUCATION
Senior High School — Science Major
Foundation in mathematics, physics, and computer science fundamentals.

2021–Present · EDUCATION
Informatics Engineering — Undergraduate Degree
Focus on cybersecurity, networking, and software development. Currently
working on thesis project.

2022–2023 · ORGANIZATION
IT Security Student Club — Active Member
Participated in CTF competitions and security workshops. Contributed to
internal knowledge-sharing sessions.

2024 · EXPERIENCE
Community Service Program (KKN) — IT & Web Development Lead
Led development of a waste management system for local village administration.

2025–2026 · ACHIEVEMENT
Thesis Research — Purple Team Exercise Framework
Designing and implementing a purple team exercise framework for controlled
security assessments.
```

### 3.6 Contact — Transmission

**Copy final:**
```
05_TRANSMISSION
OUTBOUND SIGNAL · OPEN CHANNEL

SEND A TRANSMISSION

Open to opportunities, collaborations, and conversations about security,
networking, and software engineering. Signal received and responded within
24–48 hours.

[Send Transmission — solid button, SAME clip-path fix as §3.1]

AVAILABLE FREQUENCIES
EMAIL      contact@example.com
GITHUB     github.com/nuryanfa
LINKEDIN   linkedin.com/in/nuryanfa
```

---

## 4. Library & Implementation Mapping

Lihat dokumen terpisah **`Library-Implementation-Spec.md`** (sudah dibuat
sebelumnya) untuk pemetaan lengkap React Bits / Framer Motion / Anime.js per
komponen — dokumen itu tetap berlaku penuh untuk PRD v2 ini, tidak berubah.
Ringkasan cepat:
- **React Bits** (`BlurText`, `Aurora`, `AnimatedContent`, `ClickSpark`) — text
  reveal, ambient background, scroll reveal, tombol feedback
- **Anime.js** — HANYA SVG path drawing (leader-line, orbit ring, timeline path)
- **Framer Motion** — orkestrasi hover/gesture/viewport-trigger
- **Custom code** — HANYA orbit math, designation system, path coordinate calc

---

## 5. Checklist Bug Regresi (WAJIB Fix + Verifikasi Screenshot Sebelum "Selesai")

- [ ] Tombol solid: teks terlihat jelas (kontras `bg-void` di atas `accent-nebula`)
- [ ] Card project: "MAGNITUDE" full terbaca, tidak terpotong
- [ ] Timeline: dot tidak menimpa angka tahun
- [ ] Orbital Diagram: setiap planet punya ring orbit-nya sendiri
- [ ] Timeline: path melengkung, bukan garis lurus vertikal
- [ ] Hero: urutan DESIGNATION di atas COORD (bukan terbalik)
- [ ] Hero: teks TIDAK di tengah viewport — posisi asimetris sesuai §3.1
- [ ] Bintang utama & leader-line terhubung visual ke blok teks identitas

---

## 6. Yang Sengaja Dihindari (Cek Ulang Sebelum Ship)

- Warna ketiga di luar `accent-nebula`/`accent-solar`
- Dua tombol berbobot visual sama bersebelahan
- Teks center-aligned di hero
- Starfield/nebula background yang menonjol (harus tekstur redup, opacity ≤ 0.10
  untuk elemen non-fokus)
- Komponen react-bits dengan warna preset default yang tidak direstyle
- Spacing di luar skala §2.3
- Copy placeholder generik ("Lorem ipsum", "Project Title Placeholder") — semua
  copy di dokumen ini sudah final, pakai langsung

---

*Dokumen ini menggantikan seluruh iterasi PRD sebelumnya sebagai satu sumber
kebenaran (single source of truth). Kalau ada perubahan keputusan desain, update
dokumen ini, jangan biarkan keputusan tersebar di riwayat chat.*