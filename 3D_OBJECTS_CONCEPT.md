# 3D Astronomy Objects - Concept & Planning

## 🎯 Vision

**"Different 3D astronomy objects per page untuk immersive, unique experience"**

Setiap halaman punya **signature 3D object** yang mewakili konteks halaman tersebut.

---

## 🌌 Per-Page 3D Objects Mapping

### 1. **Home/Landing Page** → Black Hole
**Object**: Rotating Black Hole dengan accretion disk
**Rationale**: 
- Powerful, mysterious, attention-grabbing
- Represents "gravity center" of portfolio (pulling users in)
- Iconic astronomy object yang immediately recognizable

**Visual Elements**:
- Central black sphere (event horizon)
- Glowing accretion disk (rotating)
- Gravitational lensing effect (light bending)
- Particle streams being pulled in
- Hawking radiation glow

**Position**: Right side, partially visible, interactive on mouse move
**Animation**: Constant rotation, particles spiraling inward

---

### 2. **About Page** → Carina Nebula
**Object**: 3D volumetric nebula cloud (Carina Nebula style)
**Rationale**:
- Beautiful, colorful, represents creation/formation
- "About" = origin story, formation of identity
- NASA's iconic pillars of creation aesthetic

**Visual Elements**:
- Volumetric cloud rendering (purple, cyan, pink, orange)
- Star formation regions (bright cores)
- Dark dust lanes (silhouettes)
- Particle dust floating through
- Subtle internal glow

**Position**: Background depth, fills viewport, camera can rotate through
**Animation**: Slow drift, breathing effect, internal shimmer

---

### 3. **Projects Page** → Spiral Galaxy
**Object**: 3D spiral galaxy (Milky Way / Andromeda style)
**Rationale**:
- Multiple stars/systems = multiple projects
- Organized structure = portfolio organization
- Grand scale = ambition and scope

**Visual Elements**:
- Spiral arms dengan star clusters
- Bright galactic core
- Millions of particle stars
- Dust lanes following spiral pattern
- Subtle blue/purple hues

**Position**: Tilted view (viewing from above at angle)
**Animation**: Slow rotation around center, arms flowing

---

### 4. **Contact Page** → Satellite
**Object**: 3D satellite/space station model
**Rationale**:
- Communication device = contacting you
- Man-made object = approachable, functional
- Modern, technical aesthetic

**Visual Elements**:
- Detailed satellite model (solar panels, antennas)
- Metallic reflective surfaces
- Blinking communication lights
- Orbiting around invisible Earth
- Signal waves emanating

**Position**: Orbiting motion, right side
**Animation**: Rotating solar panels, orbit path, blinking lights

---

## 🛠️ Technical Stack

### 3D Library Options:

#### **Option 1: React Three Fiber (Recommended) ✅**
**Pros:**
- React-native API (fits our stack)
- Excellent performance
- Large community, many examples
- Built on Three.js (industry standard)
- Easy animation with useFrame hook

**Cons:**
- Learning curve for Three.js concepts
- Bundle size increase (~500kb)

#### **Option 2: Three.js Direct**
**Pros:**
- More control
- Slightly smaller bundle
- Direct Three.js documentation

**Cons:**
- More imperative code
- Harder to integrate with React lifecycle
- More boilerplate

#### **Option 3: Spline (Spline.design)**
**Pros:**
- Visual editor (no code for modeling)
- Export React components
- Beautiful presets

**Cons:**
- Requires Spline account
- Less customization
- Potential performance issues
- Vendor lock-in

**DECISION: React Three Fiber**

---

## 📦 Required Dependencies

```bash
npm install three @react-three/fiber @react-three/drei
```

**Packages:**
- `three` - Core Three.js library
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helper components (Camera, Lights, Effects)

**Optional:**
- `@react-three/postprocessing` - Bloom, depth of field effects
- `@react-three/rapier` - Physics (jika perlu gravitational effects)

---

## 🏗️ Component Architecture

```
src/components/three3d/
├── BlackHoleScene.tsx       # Home page
├── CarinaNebulaScene.tsx    # About page
├── GalaxyScene.tsx          # Projects page
├── SatelliteScene.tsx       # Contact page
├── SceneWrapper.tsx         # Canvas wrapper dengan common config
└── shaders/
    ├── blackHoleShader.ts   # Custom GLSL for black hole
    ├── nebulaShader.ts      # Volumetric rendering
    └── galaxyShader.ts      # Particle shader
```

**Conditional Rendering Strategy:**
```tsx
// In each page component
import { BlackHoleScene } from '@/components/three3d/BlackHoleScene';

export default function Home() {
  return (
    <>
      <BlackHoleScene />
      {/* Rest of page content */}
    </>
  );
}
```

---

## 🎨 Visual Design Specifications

### Black Hole (Home)
```
Size: ~600px diameter on desktop
Position: right: 10%, top: 50% (centered vertically)
Colors:
  - Event horizon: pure black
  - Accretion disk: orange (#FF6B35) → yellow (#F7931E)
  - Gravitational lensing: blue tint (#3498DB)
  - Particles: white → orange gradient
Interaction: Mouse move causes parallax shift
Performance: ~60 fps target
```

### Carina Nebula (About)
```
Size: Fullscreen, depth 1000 units
Position: Fills background, behind content
Colors:
  - Purple clouds: #8B5CF6
  - Cyan regions: #06B6D4
  - Pink emissions: #EC4899
  - Orange cores: #F59E0B
  - Dark dust: #1E293B
Interaction: Subtle camera rotation on scroll
Performance: ~45-60 fps target (volumetric rendering heavy)
```

### Spiral Galaxy (Projects)
```
Size: ~1200px diameter (fills most viewport)
Position: Centered, tilted 30° from top-down view
Colors:
  - Core: bright white/yellow (#FBBF24)
  - Arms: blue-purple gradient (#6366F1 → #8B5CF6)
  - Stars: white particles with color variation
  - Dust: semi-transparent dark (#334155)
Interaction: Slow constant rotation
Performance: ~60 fps target (optimized particles)
```

### Satellite (Contact)
```
Size: ~400px model
Position: right: 15%, orbiting in ellipse
Colors:
  - Body: metallic gray (#71717A)
  - Solar panels: blue-tinted (#3B82F6)
  - Lights: blinking cyan (#06B6D4)
  - Signal waves: pulsing rings
Interaction: Can click to rotate camera around it
Performance: ~60 fps target
```

---

## ⚡ Performance Optimization Strategy

### 1. **Lazy Loading**
```tsx
// Lazy load 3D components per page
const BlackHoleScene = lazy(() => import('@/components/three3d/BlackHoleScene'));
```

### 2. **LOD (Level of Detail)**
```tsx
// Use drei's <Detailed> component
<Detailed distances={[0, 100, 200]}>
  <HighDetailModel /> {/* Close to camera */}
  <MediumDetailModel /> {/* Mid distance */}
  <LowDetailModel /> {/* Far from camera */}
</Detailed>
```

### 3. **Particle Optimization**
- Use InstancedMesh for thousands of stars
- GPU particle systems via shaders
- Culling particles outside viewport

### 4. **Mobile Considerations**
```tsx
const isMobile = window.innerWidth < 768;

// Reduce quality on mobile
<Canvas dpr={isMobile ? [1, 1.5] : [1, 2]}>
  {isMobile ? <SimplifiedScene /> : <FullScene />}
</Canvas>
```

### 5. **Texture Optimization**
- Compressed textures (WebP)
- Mipmaps for distant objects
- Texture atlases to reduce draw calls

---

## 🎬 Animation Details

### Black Hole
```tsx
useFrame((state, delta) => {
  // Accretion disk rotation
  accretionDiskRef.current.rotation.z += delta * 0.2;
  
  // Particles spiral inward
  particles.forEach(p => {
    p.angle += delta * 0.5;
    p.radius -= delta * 0.1;
    if (p.radius < eventHorizonRadius) p.radius = maxRadius;
  });
  
  // Mouse parallax
  groupRef.current.rotation.y = mouseX * 0.1;
  groupRef.current.rotation.x = mouseY * 0.1;
});
```

### Carina Nebula
```tsx
useFrame((state, delta) => {
  // Breathing effect
  nebulaRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05);
  
  // Slow drift
  nebulaRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
  
  // Internal shimmer (shader uniform)
  material.uniforms.time.value = state.clock.elapsedTime;
});
```

### Galaxy
```tsx
useFrame((state, delta) => {
  // Constant rotation
  galaxyRef.current.rotation.y += delta * 0.05;
  
  // Spiral arms flow (shader-based)
  material.uniforms.time.value = state.clock.elapsedTime;
});
```

### Satellite
```tsx
useFrame((state, delta) => {
  // Orbit around point
  const angle = state.clock.elapsedTime * 0.3;
  satelliteRef.current.position.x = Math.cos(angle) * orbitRadius;
  satelliteRef.current.position.z = Math.sin(angle) * orbitRadius;
  
  // Rotate solar panels
  solarPanelsRef.current.rotation.y += delta * 0.5;
  
  // Blinking lights
  if (Math.floor(state.clock.elapsedTime * 2) % 2 === 0) {
    lightMaterial.emissiveIntensity = 1;
  } else {
    lightMaterial.emissiveIntensity = 0.2;
  }
});
```

---

## 📱 Responsive Design

### Desktop (≥1024px)
- Full 3D rendering
- All particles and effects
- High detail models
- 60 fps target

### Tablet (768-1023px)
- Medium quality 3D
- Reduced particle count (50% of desktop)
- Simplified shaders
- 45-60 fps target

### Mobile (<768px)
**Option A: Simplified 3D**
- Low-poly models
- Minimal particles (25% of desktop)
- Basic materials (no complex shaders)
- 30-45 fps target

**Option B: 2D Fallback**
- Render 3D to texture, use as animated sprite
- Or use CSS/SVG animation instead
- Ensure smooth 60fps

**DECISION: User feedback needed - test both approaches**

---

## 🎨 Integration with Current Background

### Strategy: **Layered Approach**

```
Z-Index Layers (back to front):
1. Current astronomy background (stars, nebulae) - z-index: 0
2. 3D Canvas layer - z-index: 1
3. Content layer - z-index: 10

Blend Mode: 3D objects blend with background nebulae
```

**Options:**

**Option A: Replace Current Background**
- Remove current AstronomyImmersive
- 3D objects become the ONLY background
- Pros: Better performance (one rendering system)
- Cons: Lose current beautiful background work

**Option B: Hybrid (Recommended)**
- Keep current background at reduced opacity/complexity
- 3D objects sit on top as "hero elements"
- Pros: Rich layered look, best of both worlds
- Cons: Need to optimize carefully for performance

**DECISION: Hybrid approach - current background stays but simplified**

---

## 🔧 Development Phases

### Phase 1: Setup & Proof of Concept
- [ ] Install dependencies (three, @react-three/fiber, @react-three/drei)
- [ ] Create basic SceneWrapper component
- [ ] Test simple rotating cube on Home page
- [ ] Verify performance and integration

### Phase 2: Black Hole (Home)
- [ ] Model black hole geometry
- [ ] Create accretion disk shader
- [ ] Implement particle system (matter being pulled in)
- [ ] Add gravitational lensing effect
- [ ] Mouse interaction
- [ ] Performance optimization

### Phase 3: Carina Nebula (About)
- [ ] Volumetric cloud rendering (shader-based)
- [ ] Multi-color nebula layers
- [ ] Star formation bright spots
- [ ] Camera interaction
- [ ] Optimize for performance

### Phase 4: Galaxy (Projects)
- [ ] Particle system for millions of stars
- [ ] Spiral arm shader
- [ ] Galactic core glow
- [ ] Rotation animation
- [ ] LOD system for performance

### Phase 5: Satellite (Contact)
- [ ] Model satellite geometry (or find/adapt model)
- [ ] PBR materials (metallic, reflective)
- [ ] Blinking lights system
- [ ] Orbit animation
- [ ] Signal wave effect

### Phase 6: Polish & Optimization
- [ ] Mobile optimization
- [ ] Loading states
- [ ] Performance monitoring
- [ ] Cross-browser testing
- [ ] Accessibility considerations

---

## 🚨 Potential Challenges & Solutions

### Challenge 1: Bundle Size
**Problem**: Three.js + R3F adds ~500-800kb
**Solution**: 
- Code splitting (lazy load per page)
- Tree shaking (import only needed modules)
- Consider CDN for Three.js core

### Challenge 2: Performance on Low-End Devices
**Problem**: 3D rendering may struggle on older hardware
**Solution**:
- Detect GPU capabilities
- Automatic quality reduction
- Fallback to 2D on very low-end devices

### Challenge 3: Learning Curve
**Problem**: Three.js concepts (geometry, materials, lights, cameras)
**Solution**:
- Use drei helpers extensively
- Start with simple examples
- Iterate incrementally
- Reference existing CodeSandbox examples

### Challenge 4: Content Readability
**Problem**: 3D objects may obstruct text/UI
**Solution**:
- Position objects to right/background
- Add depth of field blur
- Darken overlays where needed
- Test with actual content

---

## 📚 Learning Resources

### React Three Fiber:
- Official docs: https://docs.pmnd.rs/react-three-fiber
- Examples: https://docs.pmnd.rs/react-three-fiber/getting-started/examples
- CodeSandbox templates

### Three.js Fundamentals:
- Three.js Journey (course)
- Bruno Simon tutorials
- Three.js examples gallery

### Astronomy Reference:
- NASA Image Gallery
- ESO (European Southern Observatory)
- Hubble/JWST imagery
- SpaceEngine (for accurate visuals)

---

## ✅ Success Criteria

### Visual Quality:
- [ ] 3D objects look polished and professional
- [ ] NOT generic "WebGL demo" look
- [ ] Clearly recognizable astronomy objects
- [ ] Seamless integration with page design

### Performance:
- [ ] Desktop: 60fps minimum
- [ ] Mobile: 30fps minimum (or fallback)
- [ ] Page load: <3 seconds to interactive
- [ ] No janky animations

### User Experience:
- [ ] 3D objects enhance, not distract from content
- [ ] Clear visual hierarchy (content > 3D)
- [ ] Subtle interactions feel responsive
- [ ] Accessible (reduced motion support)

### Technical:
- [ ] Clean, maintainable code
- [ ] Reusable components
- [ ] Well-documented shaders
- [ ] No console errors/warnings

---

## 🎯 Next Steps

**Before Implementation:**
1. ✅ Create this planning document
2. ⏳ Get user approval on concept
3. ⏳ Decide: Hybrid or Replace current background?
4. ⏳ Confirm: Start with which object first? (Recommended: Black Hole)

**After Approval:**
1. Install dependencies
2. Create basic setup
3. Build first object (Black Hole)
4. Get feedback, iterate
5. Continue with remaining objects

---

*Document Created: 3D Astronomy Objects Planning*  
*Branch: feature/3d-astronomy-objects*  
*Status: Awaiting user approval to proceed*  
*User Input Needed: Confirm concept, choose starting point*
