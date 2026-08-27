# PRD — WebPorto SWE > Personal Portfolio Website — Anime × Pixel × Software Engineering

---

## 1. Product Overview

**Project Name:** WebPorto SWE
**Repository:** `Nuryanfa/WebPorto-SWE`
**Project Type:** Personal Software Engineer Portfolio
**Platform:** Web
**Architecture:** Frontend-first / Static-first
**Framework:** React
**Language:** TypeScript
**Build Tool:** Vite
**Styling:** Tailwind CSS
**Deployment:** Vercel
**Backend:** None for V1

### Product Vision
WebPorto SWE adalah website portfolio personal yang dirancang untuk mempresentasikan kemampuan sebagai **Software Engineer** melalui kombinasi:
- Anime aesthetic
- Pixel art
- Futuristic technical UI
- Modern editorial design
- Motion design
- Interactive UI
- Software engineering showcase

Website tidak hanya berfungsi sebagai CV online, tetapi sebagai **engineering showcase** yang memperlihatkan:
- kemampuan React dan TypeScript
- frontend engineering
- UI/UX
- animation dan interaction design
- software architecture
- project development
- cybersecurity awareness
- deployment
- engineering decision making

### Core Goal
Website harus memberikan tiga kesan utama:
> **Recruiter:** "Saya memahami siapa developer ini dan apa yang dia kerjakan."
> **Developer/Engineer:** "Developer ini memahami bagaimana membangun software, bukan hanya membuat UI."
> **Designer:** "Developer ini memahami UI/UX, visual hierarchy, interaction, dan motion."

---

# 2. Design Direction

## 2.1 Primary Visual Identity
Tema utama:
> **Anime × Pixel × Futuristic × Technical × Experimental**

Pixel art digunakan sebagai **visual language**, bukan sebagai seluruh desain website.
Website harus terasa seperti perpaduan antara:
- anime interface
- retro pixel computer
- futuristic operating system
- game character/profile interface
- modern software engineering portfolio

### Design Principle
Jangan membuat:
```text
Pixel font + pixel border + pixel button + pixel background + pixel card + pixel everything
```
Tetapi:
```text
Modern Web Design + Anime + Pixel Art + Technical UI + Motion Design + Editorial Layout
```

## 3. Visual References

### 3.1 ZUTOMAYO
Digunakan sebagai referensi untuk:
- anime aesthetic
- pixel art
- experimental composition
- colorful accents
- visual storytelling
- artistic atmosphere

Website:
[https://zutomayo.net/](https://zutomayo.net/)

ZUTOMAYO digunakan sebagai inspirasi visual, bukan untuk cloning desain.

### 3.2 Persona
Digunakan sebagai referensi untuk:
- typography
- asymmetric composition
- aggressive layout
- dynamic navigation
- section numbering
- graphic design
- visual hierarchy

### 3.3 Zenless Zone Zero
Digunakan sebagai referensi untuk:
- character presentation
- energetic UI
- layered interface
- stickers
- labels
- dynamic motion
- graphic composition

### 3.4 Arknights: Endfield
Digunakan sebagai referensi untuk:
- technical interface
- system information
- HUD
- status indicators
- engineering visualization
- futuristic interface

### 3.5 Dribbble
Dribbble digunakan sebagai:
- design research
- visual inspiration
- UI/UX reference
- composition reference
- typography reference
- interaction reference

Dribbble bukan dependency dan desain tidak boleh dicopy.

## 4. Target Audience

### Primary
**Recruiter / HR**
Membutuhkan informasi:
- siapa developer
- skill utama
- pengalaman
- project
- contact
- GitHub
- LinkedIn

### Secondary
**Software Engineer / Developer**
Membutuhkan:
- technical stack
- architecture
- engineering decisions
- project implementation
- source code
- deployment

### Secondary
**Designer**
Membutuhkan:
- UI quality
- UX
- typography
- composition
- animation
- interaction

## 5. Technology Stack

| Layer | Technology | Status |
| --- | --- | --- |
| UI Framework | React | REQUIRED |
| Programming Language | TypeScript | REQUIRED |
| Build Tool | Vite | REQUIRED |
| Styling | Tailwind CSS | REQUIRED |
| Primary Animation | Motion for React | REQUIRED |
| Advanced Animation | Anime.js | REQUIRED |
| Creative Components | React Bits | REQUIRED |
| UI Components | KokonutUI | REQUIRED |
| Icons | Lucide React | REQUIRED |
| Linter | ESLint | REQUIRED |
| Backend | None | V1 |
| Database | None | V1 |
| Deployment | Vercel | REQUIRED |

## 6. Technology Principles
Library yang telah dipilih bukan hanya dependency tambahan.
Setiap library memiliki responsibility yang berbeda.

```text
React + TypeScript
|
+-- Tailwind CSS
|   |
|   +-- Layout
|   +-- Styling
|   +-- Responsive
|
+-- Motion
|   |
|   +-- UI animation
|   +-- Interaction
|   +-- Scroll
|   +-- Layout transition
|
+-- Anime.js
|   |
|   +-- Complex timeline
|   +-- Art direction
|   +-- SVG animation
|
+-- React Bits
|   |
|   +-- Creative effects
|   +-- Pixel effects
|   +-- Text effects
|
+-- KokonutUI
|   |
|   +-- Reusable UI
|   +-- Interactive components
|
+-- Lucide
    +-- Icons
```

## 7. Tailwind CSS
Tailwind CSS menjadi styling system utama.
Digunakan untuk:
- layout
- flexbox
- grid
- spacing
- sizing
- typography
- colors
- border
- radius
- shadows
- responsive breakpoint
- positioning
- opacity
- utility styling

Contoh:
`<section className="min-h-screen px-6 py-20 lg:px-16">`

## 8. Native CSS Policy
Native CSS tidak dilarang, tetapi bukan pilihan pertama.
Native CSS hanya digunakan untuk:
- global styles
- CSS variables
- font-face
- browser-specific fixes
- special CSS effect
- styling yang sulit atau tidak praktis menggunakan Tailwind
- CSS primitives

Contoh:
`:root { --portfolio-background: #080808; --portfolio-foreground: #f4f0e8; }`

Native CSS tidak boleh menjadi animation system utama.
Jangan membuat animation manual menggunakan:
`@keyframes`
jika animation tersebut dapat ditangani oleh Motion atau Anime.js.

## 9. Animation Architecture
Animation dibagi menjadi beberapa level.

```text
LEVEL 1
Tailwind
Basic styling
|
v
LEVEL 2
Motion
UI animation
|
v
LEVEL 3
React Bits / KokonutUI
Reusable animated components
|
v
LEVEL 4
Anime.js
Complex artistic animation
|
v
LEVEL 5
Native CSS / JavaScript
Fallback only
```

## 10. Motion for React
Motion menjadi **PRIMARY ANIMATION ENGINE**.
Digunakan untuk:
- entrance animation
- hover
- tap
- focus
- scroll reveal
- scroll-linked animation
- parallax
- layout animation
- shared element animation
- modal animation
- menu animation
- page transition
- stagger animation

Contoh:
`<motion.article initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} transition={{ duration: 0.4 }} > ... </motion.article>`

Motion harus menjadi pilihan pertama untuk animation UI biasa.

## 11. Motion Rules
Gunakan Motion untuk:
- Button hover
- Card hover
- Menu
- Modal
- Scroll reveal
- Parallax
- Navigation indicator
- Layout transition
- Page transition
- Shared element
- Focus animation
- Tap animation

Jangan menggunakan Anime.js untuk animation sederhana yang sudah dapat ditangani Motion.

## 12. Anime.js
Anime.js digunakan sebagai **ADVANCED ANIMATION ENGINE**.
Anime.js digunakan untuk animation yang memiliki kebutuhan:
- complex timeline
- sequential animation
- procedural animation
- SVG animation
- advanced text sequence
- artistic transition
- glitch sequence
- intro sequence

## 13. Anime.js Use Cases
Contoh:
```text
INTRO
N
NU
NUR
NUR.
NUR.Y
NUR.YA
NUR.YANFA
```
Kemudian:
```text
SYSTEM INITIALIZED
↓
CHARACTER LOADED
↓
PROFILE LOADED
↓
PRESS START
```
Anime.js juga dapat digunakan untuk:
- SVG line animation
- complex logo animation
- glitch sequence
- pixel reconstruction
- loading sequence
- system boot animation

## 14. Anime.js Restriction
Anime.js tidak digunakan untuk semua animation.
Jangan menggunakan Anime.js untuk:
- Button hover
- Basic fade
- Simple card hover
- Simple menu
- Simple modal
- Simple scroll reveal

Gunakan Motion.

Responsibility:
`Motion = UI Behavior`
`Anime.js = Art Direction`

## 15. React Bits
React Bits menjadi sumber creative animated components dan visual effects.
React Bits digunakan untuk:
- text animation
- pixel effect
- glitch effect
- cursor effect
- background effect
- interactive card
- scroll effect
- image effect

## 16. React Bits Use Cases
Kandidat penggunaan:

**Hero**
- Glitch Text
- Scrambled Text
- Pixel Effect Text Reveal

**Background**
- Dot Grid
- Dither
- Retro Lines
- Grid
- Scan Noise

**Project**
- Tilted Card
- Spotlight Card
- Pixel Card Hover Preview

**Cursor**
- Target Cursor
- Crosshair
- Pixel Trail
- Magnetic Effect

## 17. React Bits Integration Rule
React Bits tidak boleh membuat website terlihat seperti showcase React Bits.
Workflow:
```text
React Bits Component
↓
Evaluate
↓
Adapt
↓
Customize
↓
Integrate with Design System
↓
WebPorto Component
```
Contoh:
```text
React Bits Pixel Card
↓
Customize color
↓
Customize typography
↓
Customize border
↓
Customize interaction
↓
Integrate project data
↓
ProjectCard
```

## 18. KokonutUI
KokonutUI digunakan sebagai **UI COMPONENT SOURCE**.
Digunakan untuk:
- buttons
- navigation
- cards
- menus
- dialogs
- panels
- interactive UI
- technical interface

KokonutUI harus digunakan sebagai sumber reusable component, bukan sebagai visual identity utama.

## 19. KokonutUI Use Cases
Contoh:

**Technical Interface**
- System Panel
- Status Panel
- Metadata Panel
- Command Interface

**Interactive Component**
- Animated Menu
- Card Stack
- Interactive Button
- Search

**Hero**
- Animated Button
- Sliced Text
- Shape Hero

## 20. React Bits vs KokonutUI
Keduanya memiliki responsibility berbeda.

| Library | Responsibility |
| --- | --- |
| React Bits | Creative / experimental visual effects |
| KokonutUI | Reusable UI components |
| Motion | Animation engine |
| Anime.js | Complex animation |
| Tailwind | Styling |
| Lucide | Icons |

Contoh:
```text
ProjectCard
|
+-- Tailwind          | Styling
|
+-- Motion            | Hover / Layout
|
+-- React Bits        | Visual effect
```

## 21. Lucide React
Lucide React menjadi icon library utama.
Gunakan untuk:
- GitHub
- Email
- LinkedIn
- Arrow
- External link
- Navigation
- System status
- UI controls

Jangan menggunakan emoji sebagai icon UI.
Contoh:
`import { Github, Mail, ArrowUpRight } from "lucide-react";`

## 22. Library Decision Matrix

| Feature | Library |
| --- | --- |
| Layout | Tailwind |
| Responsive | Tailwind |
| Typography | Tailwind |
| Color | Tailwind |
| Spacing | Tailwind |
| Basic styling | Tailwind |
| Hover | Motion |
| Tap | Motion |
| Focus | Motion |
| Scroll reveal | Motion |
| Parallax | Motion |
| Scroll-linked animation | Motion |
| Layout transition | Motion |
| Shared element | Motion |
| Modal transition | Motion |
| Page transition | Motion |
| Complex timeline | Anime.js |
| SVG animation | Anime.js |
| Artistic sequence | Anime.js |
| Glitch sequence | Anime.js / React Bits |
| Text effect | React Bits |
| Pixel effect | React Bits |
| Creative background | React Bits |
| Cursor effect | React Bits |
| Experimental card | React Bits |
| UI component | KokonutUI |
| Technical panel | KokonutUI |
| Icons | Lucide React |
| Inspiration | Dribbble |

## 23. Native CSS / JavaScript Restrictions
Jangan membuat implementation manual jika library yang sudah dipilih mampu menyelesaikannya.

Hindari:
- Custom hover animation
- Custom scroll animation
- Custom intersection observer
- Custom animation engine
- Custom layout transition
- Custom page transition
- Custom cursor animation
- Custom stagger system
- Custom parallax engine
- Manual DOM animation

Prioritas:
`Motion` > `React Bits` > `KokonutUI` > `Anime.js`

## 24. Native Exception
Native implementation diperbolehkan jika:
- Library tidak menyediakan fitur.
- Library terlalu kompleks untuk kebutuhan sederhana.
- Native CSS lebih performant.
- Feature merupakan browser primitive.
- Hanya styling sederhana.

Contoh:
`::selection { background: var(--accent); }`
Tidak perlu Motion.

## 25. Color System

**Background**
`#080808` `#0D0D10` `#111111`

**Primary Accent**
Crimson `#FF4F64`

**Secondary Accent**
Violet `#6D5CFF`

**Technical Accent**
Cyan `#5CE1E6`

**Experimental Accent**
Acid Green `#B8FF3D`

Tidak semua accent digunakan secara bersamaan.
Color hierarchy harus tetap terkendali.

## 26. Typography

**Display Font**
Kandidat:
- Space Grotesk
- Sora
- Archivo

**Technical Font**
- JetBrains Mono
- IBM Plex Mono

**Pixel Font**
Digunakan sebagai accent.
Pixel font tidak digunakan untuk body text panjang.

## 27. Background System
Background menggunakan kombinasi:
`Base Color + Grid + Noise + Dither + Scanline + Pixel Elements`

Dynamic background effect harus menggunakan:
- React Bits
- Motion
- CSS bila sederhana

Jangan membuat background animation engine sendiri kecuali benar-benar diperlukan.

## 28. Navigation
Navigation harus memiliki karakter seperti technical/game interface.

Contoh:
```text
NUR.YANFA.EXE
[01 HOME] [02 PROFILE] [03 ARSENAL] [04 WORKS] [05 SYSTEM] [06 CONTACT]
```

Navigation:
- sticky
- responsive
- animated
- accessible
- keyboard friendly

Motion digunakan untuk:
- active indicator
- menu transition
- mobile navigation
- hover state

## 29. Hero Section
Hero adalah bagian paling memorable.

Konsep:
`SYSTEM BOOT / CHARACTER INITIALIZATION`

Struktur:
```text
+------------------------------------------------+
| NUR.YANFA.EXE                     STATUS: ONLINE |
|                                                |
|                                                |
|                                                |
|                   MUHAMAD                      |
|                  CHARACTER                     |
|                  NUR YANFA                     |
|                                                |
|                                                |
|              SOFTWARE ENGINEER                 |
|                                                |
|          Building software systems,            |
|       web experiences & secure systems.        |
|                                                |
|               [ EXPLORE WORK ]                 |
|                                                |
|  SYSTEM / 01                                   |
+------------------------------------------------+
```

## 30. Hero Animation Sequence
Urutan:
1. Background
2. System metadata
3. Character
4. MUHAMAD
5. NUR YANFA
6. SOFTWARE ENGINEER
7. Description
8. CTA

Technology:
`Basic entrance` → `Motion`
`Text effect` → `React Bits`
`Complex sequence` → `Anime.js`

## 31. Profile Section
Konsep:
`CHARACTER PROFILE`

Informasi:
- NAME: MUHAMAD NUR YANFA
- CLASS: SOFTWARE ENGINEER
- FOCUS: Software Engineering, Fullstack Development, Backend, Cybersecurity
- LOCATION: INDONESIA
- STATUS: BUILDING

Visual:
`Character / Avatar + Metadata + Technical Information`

## 32. Arsenal Section
Konsep:
`DEVELOPER SKILL TREE`

Kategori:
- FRONTEND
- BACKEND
- DATABASE
- DEVOPS
- SECURITY
- TOOLS

Skill tidak menggunakan persentase palsu seperti:
`React 95%` `Go 80%` `Laravel 90%`

Gunakan:
`PRIMARY` `WORKING KNOWLEDGE` `EXPLORING`

Tujuannya menunjukkan maturity tanpa mengklaim kemampuan secara tidak objektif.

## 33. Works Section
Project showcase adalah salah satu bagian terpenting.

Contoh:
```text
01
UMKM DESA MARKETPLACE
FULLSTACK WEB APPLICATION
Laravel / React / MySQL
DEPLOYED
```

Project card harus memiliki:
- project number
- title
- category
- description
- technologies
- status
- image
- GitHub
- live demo

## 34. Project Card Interaction
**Hover**
Motion:
- translate
- scale
- opacity

**Visual Effect**
React Bits:
- Pixel
- Spotlight
- Tilt
- Glitch

**UI**
KokonutUI:
- Button
- Badge
- Interactive UI

**Styling**
Tailwind.

## 35. Project Case Study
Project utama harus memiliki detail:
01 Overview
02 Problem
03 Role
04 Architecture
05 Technology
06 Engineering Decisions
07 Challenges
08 Result
09 Live Demo
10 Source Code

Tujuannya memperlihatkan engineering thinking, bukan hanya screenshot.

## 36. System Section
Section ini digunakan untuk menunjukkan pemahaman system design.

Contoh:
```text
CLIENT
|
v
REACT
|
v
API
|
v
BACKEND
|
v
DATABASE
```

Untuk static portfolio:
```text
GitHub
|
v
Vercel
|
v
Vite Build
|
v
Static Assets
|
v
Browser
```

Diagram dapat dibuat menggunakan:
- SVG
- React
- Motion
- Anime.js untuk animation

## 37. Contact Section
Konsep:
```text
MISSION COMPLETE
THANK YOU FOR VISITING.
LET'S BUILD SOMETHING.
```

CTA:
- GITHUB
- LINKEDIN
- EMAIL

Interaction menggunakan Motion.

## 38. Data Architecture
Data dipisahkan dari UI.

Struktur:
```text
src/
├── data/
│   ├── profile.ts
│   ├── skills.ts
│   ├── projects.ts
│   └── experience.ts
```

Contoh:
```typescript
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  status: string;
  github?: string;
  demo?: string;
}
```

Architecture:
`Project Data` | v `ProjectCard` | v `ProjectGrid` | v `ProjectDetail`

## 39. Component Architecture
Recommended structure:
```text
src/
│
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   ├── Badge/
│   │   ├── Status/
│   │   └── SectionLabel/
│   │
│   ├── motion/
│   │   ├── Reveal/
│   │   ├── Stagger/
│   │   ├── Parallax/
│   │   └── PageTransition/
│   │
│   ├── pixel/
│   │   ├── PixelFrame/
│   │   ├── PixelDivider/
│   │   └── PixelNoise/
│   │
│   └── projects/
│       ├── ProjectCard/
│       ├── ProjectGrid/
│       └── ProjectDetail/
│
├── sections/
│   ├── Hero/
│   ├── Profile/
│   ├── Arsenal/
│   ├── Works/
│   ├── System/
│   └── Contact/
│
├── data/
├── hooks/
├── lib/
├── assets/
├── styles/
│   └── globals.css
│
├── App.tsx
└── main.tsx
```

## 40. Animation Abstraction
Buat reusable animation components.
Contoh:
- Reveal
- Stagger
- FadeIn
- SlideIn
- Parallax
- Magnetic
- TextReveal
- PageTransition

Usage:
```tsx
<Reveal direction="up">
  <ProjectCard />
</Reveal>
```
Daripada menulis konfigurasi Motion berulang-ulang.

## 41. Performance
Animation harus mempertahankan performa.
Prioritaskan:
- transform
- opacity

Hindari animation berat pada:
- width
- height
- top
- left
jika dapat digantikan dengan transform.

## 42. Reduced Motion
Website wajib mendukung:
`prefers-reduced-motion`

Jika pengguna mengaktifkan reduced motion:
Disable/reduce:
- Parallax
- Excessive glitch
- Cursor animation
- Large movement
- Complex transitions

Tetap pertahankan:
- Content
- Basic state change
- Minimal transition

## 43. Responsive Design
**Desktop**
Target:
- 1440 × 900
- 1920 × 1080

**Tablet**
- 768–1199px

**Mobile**
- 320–767px

Mobile bukan hanya desktop yang diperkecil.
Layout harus berubah secara struktural.

## 44. Accessibility
Website wajib memenuhi:
- semantic HTML
- keyboard navigation
- focus state
- accessible buttons
- alt text
- heading hierarchy
- sufficient contrast
- reduced motion
- no hover-only interaction

Semua interactive component harus dapat digunakan tanpa mouse.

## 45. SEO
Required:
- `<title>`
- `<meta description>`
- Open Graph
- Twitter/X metadata
- canonical
- robots.txt
- sitemap

Title:
`Muhamad Nur Yanfa — Software Engineer`

## 46. Security
Walaupun website static:
- NO API SECRET
- NO PRIVATE KEY
- NO PASSWORD
- NO DATABASE CREDENTIAL

Informasi public saja yang boleh berada di frontend.
Dependencies harus diperbarui secara berkala.

## 47. Backend Strategy
Backend tidak diperlukan untuk V1.

Architecture:
`GitHub` | v `Vercel` | v `Vite Build` | v `Static Assets` | v `Browser`

Jika di masa depan diperlukan backend:
`React` | v `API` | v `Backend` | v `Database`

Portfolio tidak perlu menggunakan Laravel hanya untuk menyediakan backend yang sebenarnya tidak dibutuhkan.

## 48. Deployment
Target deployment:
**Vercel**

Workflow:
`Developer` | v `git push` | v `GitHub` | v `Vercel` | v `Build` | v `Production`

## 49. Git Workflow
Recommended commit convention:
```text
chore: initialize project
chore: configure tailwind
chore: install animation libraries
feat: implement design system
feat: implement hero
feat: implement profile
feat: implement arsenal
feat: implement project showcase
feat: add project detail
feat: add motion system
feat: add pixel effects
perf: optimize assets
fix: mobile navigation
fix: animation accessibility
```

## 50. Development Phases

**Phase 01 — Foundation**
Status:
[x] GitHub repository
[x] React
[x] TypeScript
[x] Vite
[x] ESLint
[x] npm

**Phase 02 — Core Libraries**
[ ] Tailwind CSS
[ ] Motion
[ ] Anime.js
[ ] React Bits
[ ] KokonutUI
[ ] Lucide React

Semua library utama harus tersedia sebelum implementation UI final.

**Phase 03 — Design System**
[ ] Color system
[ ] Typography
[ ] Spacing
[ ] Grid
[ ] Responsive breakpoint
[ ] Button
[ ] Badge
[ ] Section label
[ ] Metadata
[ ] Pixel elements

**Phase 04 — Animation System**
[ ] Reveal
[ ] Stagger
[ ] Parallax
[ ] Hover
[ ] Magnetic
[ ] Page transition
[ ] Text animation
[ ] Reduced motion

Technology allocation:
- Motion → Core animation
- React Bits → Creative effects
- Anime.js → Advanced sequences

**Phase 05 — Main Sections**
[ ] Hero
[ ] Profile
[ ] Arsenal
[ ] Works
[ ] System
[ ] Contact

**Phase 06 — Project Case Studies**
[ ] UMKM Desa Marketplace
[ ] Other major projects
[ ] Architecture diagram
[ ] Engineering decisions
[ ] GitHub
[ ] Demo

**Phase 07 — Visual Polish**
[ ] Anime artwork
[ ] Pixel elements
[ ] React Bits effects
[ ] KokonutUI components
[ ] Motion transitions
[ ] Anime.js sequences
[ ] Cursor
[ ] Scroll experience

**Phase 08 — Production**
[ ] Responsive testing
[ ] Accessibility testing
[ ] Lighthouse
[ ] Performance optimization
[ ] SEO
[ ] Security
[ ] Browser testing
[ ] Vercel deployment

## 51. Definition of Done
Portfolio V1 tidak dianggap selesai hanya karena:
`npm run build`
berhasil.

**Design**
- Anime identity
- Pixel identity
- Professional typography
- Strong composition
- Original visual identity

**Engineering**
- React
- TypeScript
- Tailwind CSS
- Motion
- Anime.js
- React Bits
- KokonutUI
- Lucide React
- Clean component architecture
- Data-driven project system

**UX**
- Responsive
- Keyboard accessible
- Reduced motion
- Clear navigation
- Intuitive interaction
- Mobile friendly

**Performance**
- Optimized assets
- Controlled animation
- No unnecessary dependencies
- Good Core Web Vitals
- No excessive JavaScript execution

**Deployment**
- GitHub
- Vercel
- HTTPS
- Production build
- No critical console errors

## 52. Library Usage Policy
Bagian ini merupakan engineering rule project.

**REQUIRED**
**React**
Seluruh UI dan application layer.

**TypeScript**
Seluruh application logic dan component interface.

**Tailwind CSS**
Styling dan layout utama.

**Motion**
Primary animation engine.

**Anime.js**
Advanced/art-directed animation.

**React Bits**
Creative animated components dan visual effects.

**KokonutUI**
Reusable UI components.

**Lucide React**
Icons.

## 53. Anti-Pattern
Hindari architecture seperti:
```text
React
+ Huge App.tsx
+ Hundreds of lines of CSS
+ Manual animation
+ Manual scroll listener
+ Manual DOM manipulation
+ Random UI components
```

Target architecture:
```text
React
+ TypeScript
+ Design System
+ Reusable Components
+ Motion System
+ Data-driven Content
+ Animation Libraries
```

## 54. Final Architecture
```text
WEBPORTO SWE
|
v
REACT + TYPESCRIPT
|
+---------------+---------------+
|               |               v
v               TAILWIND CSS    COMPONENT SYSTEM
|               |               |
+-------+-------+               +-------+-------+
|       |       |               |               |
Layout Responsive               React Bits    KokonutUI
Color Typography                Creative UI   UI System
Spacing                         Pixel Effects
|
v
MOTION
|
+-------+-------+-------+
|       |       |       |
Hover Scroll  Layout  Page
Tap   Reveal  Motion  Transition
|
v
ANIME.JS
|
+-------+-------+-------+
|       |       |       |
Timeline SVG  Glitch Intro
|
v
LUCIDE REACT
|
v
VERCEL
```

## 55. Final Product Principle
WebPorto SWE harus mengikuti prinsip:
**"The portfolio itself is the project."**

Website bukan hanya tempat menampilkan project.
Website itu sendiri harus menjadi demonstrasi kemampuan dalam:
`Software Engineering + Frontend Engineering + UI/UX + Motion Design + Component Architecture + Performance + Accessibility + Deployment`

Target akhirnya bukan sekadar:
"Website portfolio saya dibuat menggunakan React."

Tetapi:
"Ini adalah software product yang saya bangun untuk menunjukkan bagaimana saya berpikir, mendesain, mengembangkan, dan meng-deploy sebuah software."

## 56. Technical Priority
Urutan prioritas implementation:
1. Architecture
2. Design System
3. Component System
4. Animation System
5. Hero
6. Profile
7. Skills
8. Projects
9. Case Studies
10. System Section
11. Contact
12. Responsive
13. Accessibility
14. Performance
15. SEO
16. Deployment

Visual effect tidak boleh didahulukan sebelum architecture dan design system selesai.

## 57. Success Criteria
WebPorto SWE dianggap berhasil apabila:

**Visual**
Website memiliki identitas yang jelas:
`Anime + Pixel + Technical + Modern`
dan tidak terlihat seperti template portfolio generik.

**Technical**
Codebase menunjukkan:
- React
- TypeScript
- Component Architecture
- Reusable Components
- Animation Architecture
- Data-driven UI
- Responsive Design
- Performance Awareness

**UX**
User dapat dengan mudah:
```text
Understand who I am
↓
Understand what I do
↓
Explore my skills
↓
Explore my projects
↓
Understand my engineering work
↓
Contact me
```

**Professional**
Recruiter dapat menemukan dalam waktu singkat:
- Name
- Role
- Skills
- Projects
- Experience
- GitHub
- LinkedIn
- Contact
tanpa harus "bermain-main" dengan UI untuk menemukan informasi dasar.

## 58. Project Philosophy
WebPorto SWE menggabungkan:
```text
GAME / ANIME
|
v
Visual Storytelling
|
v
INTERACTION
|
v
Motion Design
|
v
USER EXPERIENCE
|
v
SOFTWARE ENGINEERING
```

Dengan prinsip akhir:
- Experimental enough to be memorable.
- Professional enough to be employable.
- Technical enough to demonstrate engineering ability.
- Usable enough to remain a real portfolio.
