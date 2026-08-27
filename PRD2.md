# PRD v3 — Pixel-Art / Retro Game Portfolio (J-pop Kawaii Style)

**Pemilik:** Nur Yanfa · **Stack:** React + TypeScript (reuse project existing)
**Referensi visual:** zutomayo.net (genre pixel-art/retro-game UI — bukan meniru
karakter/maskot/branding, hanya teknik & bahasa visualnya)
**Menggantikan:** tema Observatory/Astronomy (dihentikan setelah berulang kali
gagal di eksekusi 3D/WebGL — pixel-art dipilih karena secara teknis jauh lebih
rendah risiko: 2D, sprite-based, tanpa shader/GLTF)

---

## 1. Kenapa Tema Ini Lebih Executable

Semua elemen visual di sini bisa dicapai dengan CSS + gambar sprite statis +
font pixel — TIDAK ADA WebGL, shader custom, atau 3D geometry. Ini
menghilangkan seluruh kelas masalah yang jadi sumber kegagalan berulang di
tema sebelumnya (size explosion, geometry gagal render, shader tidak jalan).

---

## 2. Design Tokens

### 2.1 Palet Warna — Colorful J-pop/Kawaii

```css
--bg-base:        #1A1425   /* ungu gelap sebagai base, bukan hitam pekat — J-pop lebih "hidup" dari pure black */
--bg-panel:        #2A1F3D
--bg-elevated:      #382952

--text-primary:      #FFFFFF
--text-secondary:     #C9B8E8   /* lavender pucat, bukan abu-abu — tetap dalam nuansa warna */

--accent-pink:         #FF6FB0   /* aksen utama — CTA, highlight */
--accent-cyan:           #4FF0E8   /* aksen sekunder — link, info */
--accent-yellow:          #FFE156   /* aksen tersier — bintang/rating/featured */
--accent-purple:           #B183FF  /* aksen kuarter — dekorasi, badge */

--pixel-border-dark:        #0D0815  /* untuk border pixel-art 3D bevel effect */
--pixel-border-light:        #4A3A66
```

**Aturan:** 4 warna aksen (bukan 2 seperti tema sebelumnya) — ini SESUAI genre
J-pop/kawaii yang memang playful/colorful, beda prinsip dari astronomi yang
disiplin minimal. Tetap ada aturan: tiap warna punya peran konsisten (pink =
aksi utama, cyan = link/info, kuning = highlight/featured, ungu = dekorasi),
jangan dipakai random.

### 2.2 Tipografi

- **Pixel display (heading, label, button):** `Press Start 2P` (Google Fonts,
  gratis) — font pixel klasik, sangat legible di ukuran besar
- **Pixel body (untuk paragraf panjang, supaya tetap terbaca):** `VT323` atau
  `Silkscreen` (Google Fonts) — pixel font yang lebih ramping untuk body text,
  `Press Start 2P` terlalu lebar untuk paragraf panjang
- Ukuran: heading 24-40px (pixel font butuh ukuran lebih besar dari font
  normal untuk tetap legible), body 16-18px

### 2.3 Pixel Rendering Rules

```css
img, .pixel-sprite {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
}
* {
  /* Hindari border-radius/box-shadow blur halus — itu bukan bahasa pixel-art */
}
```
Semua border pakai teknik **pixel bevel** (border 2 warna: terang di
atas-kiri, gelap di bawah-kanan, tanpa border-radius) untuk kesan tombol/
panel ala UI game retro — bukan `box-shadow` blur modern.

```css
.pixel-panel {
  border-top: 3px solid var(--pixel-border-light);
  border-left: 3px solid var(--pixel-border-light);
  border-bottom: 3px solid var(--pixel-border-dark);
  border-right: 3px solid var(--pixel-border-dark);
  border-radius: 0; /* WAJIB 0, pixel-art tidak pakai rounded corner */
}
```

---

## 3. Sumber Aset (Gratis, CC0/CC-BY)

| Kebutuhan | Sumber | Lisensi |
|---|---|---|
| Sprite icon (nav, kategori skill, dsb) | **opengameart.org** (filter CC0) | CC0 — bebas total |
| Pixel UI kit (button, panel, progress bar) | **itch.io** cari "pixel ui kit" (filter free) | Cek tiap asset, banyak CC0 |
| Font pixel | **fonts.google.com** (Press Start 2P, VT323, Silkscreen) | Open Font License, bebas pakai |
| Pixel avatar/karakter (kalau mau maskot orisinal) | Buat sendiri via **Piskel** (piskelapp.com, editor pixel-art gratis di browser) | Milik sendiri |

**PENTING:** jangan pakai sprite/karakter dari game/anime berhak cipta
(Pokemon, Mario, dsb) — itu pelanggaran IP yang sama seperti larangan di
awal project ini soal karakter game.

---

## 4. Migrasi dari Struktur Project Astronomi (Reuse Maksimal)

Karena adaptasi struktur yang sudah ada, ini pemetaan reuse vs replace:

### 4.1 TETAP DIPAKAI (tidak berubah)
- `src/data/projects.ts`, `skills.ts`, `timeline.ts` — struktur data & isi
  konten (Purple Team Framework, dst) tetap sama, cuma cara DITAMPILKAN yang
  berubah
- `src/pages/*.tsx` — struktur routing (`/`, `/about`, `/projects`,
  `/projects/:slug`, `/contact`) tetap sama
- `src/hooks/useReducedMotion.ts`, `useIsTouchDevice.ts` — masih relevan,
  tetap dipakai
- `src/types/index.ts` — interface `Project`, `SkillCategory` tetap valid

### 4.2 DIHAPUS TOTAL (semua kode WebGL/Three.js)
- Seluruh `src/components/three/*` (ClassifiedStarfield, MilkyWayBand,
  ScrollCameraRig, ShootingStar, dll) — hapus semua, tidak ada yang dipakai
  ulang untuk tema pixel-art
- Dependencies: `npm uninstall three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing`

### 4.3 DIGANTI TOTAL (visual/styling)
- `src/styles/tokens.css` — ganti isi dengan token §2.1-2.2 di atas
- `src/components/ui/Button.tsx`, `Panel.tsx` — restyle total pakai pixel
  bevel border (§2.3), HAPUS `clip-path` (sumber 8+ bug sebelumnya — pixel-art
  tidak butuh clip-path angular sama sekali, jadi masalah itu otomatis hilang)
- `src/components/sections/Hero.tsx` — konsep baru: bukan "star chart", tapi
  ala **main menu game retro** (lihat §5.1)
- Background: bukan starfield 3D, tapi **tile pattern pixel sederhana** (CSS
  `background-image` berulang, pattern kecil 16x16 atau 32x32px) — SANGAT
  murah secara performa dibanding WebGL apapun

---

## 5. Konsep Layout per Halaman

### 5.1 Home — "Main Menu" Style

Alih-alih hero generik, framing sebagai layar menu game:
```
[ PRESS START ]  <- badge kecil berkedip pelan (blink animation, bukan flashy)

NUR YANFA          <- pixel font besar, dengan efek "typing" saat load
Cybersecurity & Software Engineer

[ VIEW PROJECTS ]  [ DOWNLOAD CV ]   <- tombol pixel bevel style
```
Background: tile pattern pixel + beberapa sprite dekoratif statis (bintang
pixel kecil, awan pixel) — TIDAK ada starfield 3D lagi.

### 5.2 About — "Character Stats Screen" Style

Skill ditampilkan sebagai **stat screen ala RPG** — ini pengganti Orbital
Diagram yang selalu bermasalah:
```
[ STATUS WINDOW ]
HP  (Security)      ████████░░ 85/100
MP  (Networking)     ███████░░░ 75/100
STR (Development)     ██████░░░░ 70/100
```
Progress bar pixel-style (kotak-kotak segmen, bukan gradient halus) — jauh
lebih mudah dieksekusi dengan benar dibanding orbital diagram 3D.

### 5.3 Projects — "Quest Log" Style

Card project jadi **quest/mission card** ala game:
```
[ QUEST 01 ]  ★ FEATURED
Purple Team Exercise Framework
STATUS: IN PROGRESS
DIFFICULTY: ★★★★☆ (Thesis-grade)
```
Grid sederhana, HTML/CSS biasa — tidak ada positioning spiral galaxy lagi.

### 5.4 Contact — "Save/Load Screen" Style

Form dibingkai sebagai "save file" game:
```
[ SAVE DATA ]
> ENTER MESSAGE...
[ SAVE & SEND ]
```

---

## 6. Checklist Migrasi

- [ ] Uninstall semua dependencies Three.js/WebGL
- [ ] Hapus folder `src/components/three/`
- [ ] Ganti `tokens.css` total
- [ ] Restyle `Button.tsx`/`Panel.tsx` — HAPUS clip-path, ganti pixel bevel
- [ ] Import font pixel dari Google Fonts
- [ ] Rebuild `Hero.tsx`, `SkillsSection`, `ProjectCatalog`, `Contact` sesuai
      §5, reuse data dari `data/*.ts` yang sudah ada
- [ ] Background: ganti ke CSS tile pattern sederhana
- [ ] Verifikasi: SEMUA teks pixel font tetap readable (WCAG AA) — font pixel
      di ukuran kecil sering sulit dibaca, test di ukuran body 16-18px
      minimum
- [ ] `prefers-reduced-motion`: matikan blink/typing animation di Hero

---

## 7. Kenapa Ini Akan Berhasil Dimana yang Lain Gagal

Tidak ada lagi: shader, geometry 3D, GLTF model, physics simulation, atau
WebGL apapun. Semua teknik di PRD ini (CSS border bevel, pixel font, sprite
image statis, progress bar segmen) adalah teknik web development standar
yang sudah terbukti reliable selama puluhan tahun — bukan teknik eksperimental
yang butuh banyak trial-error seperti render 3D custom.