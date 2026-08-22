# Requirements: 3D Satellite for Contact Page

## Introduction

Add a simplified 3D satellite object to the Contact page as an accent element (NOT background replacement). This is **Stage 1** of the 4-stage 3D objects implementation - chosen as the simplest object to calibrate the pipeline before proceeding to more complex objects (Galaxy, Nebula, Black Hole).

## Glossary

- **Backbone Background**: Current AstronomyImmersive background that stays constant across all pages
- **Focal Object**: Per-page 3D accent element (in this case: Satellite)
- **Primitive Geometry**: Basic 3D shapes (box, plane, cylinder) combined to form recognizable satellite
- **Orbit Path**: Fixed parametric ellipse path (NOT physics-based orbit simulation)

---

## User Stories & Acceptance Criteria

### Requirement 1: Satellite 3D Model (Simplified Geometry)

**User Story:** As a user viewing the Contact page, I want to see a recognizable satellite object that reinforces the "communication/contact" theme without being distracting.

#### Acceptance Criteria

1. Satellite composed of primitive geometry ONLY (no GLTF import):
   - Main body: Box geometry (~40x20x20 units)
   - Solar panels: 2 thin planes (60x30x1 units each, positioned on sides)
   - Antenna: Small cylinder (3 radius, 20 height) pointing upward
   - All meshes combined in single Group

2. Materials are simple and performant:
   - Body: MeshStandardMaterial with metallic: 0.8, roughness: 0.3, color: #71717A (gray)
   - Solar panels: MeshStandardMaterial with metallic: 0.5, roughness: 0.4, color: #3B82F6 (blue tint), emissive glow
   - Antenna: MeshStandardMaterial with metallic: 0.9, roughness: 0.2, color: #A1A1AA (light gray)

3. Visual scale appropriate for viewport:
   - Satellite occupies ~15% of viewport width when at closest orbit point
   - Positioned at right side of form (does NOT overlap form content)
   - Visible on desktop (>= 1024px), hidden on mobile (< 1024px) via CSS media query

4. NO external model loading (no `.glb`, `.gltf`, `.obj` files)

**Correctness Properties:**
- **P1**: Satellite geometry must be created using only React Three Fiber primitive components (`<Box>`, `<Plane>`, `<Cylinder>`)
- **P2**: Total polygon count < 500 triangles (simple geometry only)
- **P3**: Satellite position never overlaps with form text (tested at 1024px, 1440px, 1920px widths)

---

### Requirement 2: Elliptical Orbit Animation

**User Story:** As a user, I want to see the satellite move in a smooth orbital path that feels natural but NOT physically accurate (simplified for performance).

#### Acceptance Criteria

1. Orbit path is a fixed parametric ellipse:
   - Formula: `x = radiusX * cos(t)`, `y = radiusY * sin(t) * 0.3` (compressed vertical)
   - radiusX = 8 units, radiusY = 5 units (from center point)
   - Center point positioned at: `[6, 2, -5]` in world space (right side, slightly elevated)

2. Movement speed is constant:
   - Complete orbit in 25 seconds
   - Angle increment: `t += delta * 0.25` per frame

3. Satellite rotates to face direction of motion:
   - Use `quaternion.slerp()` for smooth rotation interpolation
   - Rotation lags behind position by 0.1 seconds (damping factor)

4. Orbit continues infinitely (loop)

5. Animation respects `prefers-reduced-motion`:
   - If reduced motion active: satellite freezes at starting position (t=0)
   - No orbit movement, no rotation

**Correctness Properties:**
- **P4**: Orbit path must remain visible in viewport at all screen sizes >= 1024px (test at edges)
- **P5**: Frame rate remains >= 55fps during orbit (tested on mid-range GPU)
- **P6**: Satellite position updates exactly once per frame (no position jitter)

---

### Requirement 3: Antenna Interactive Tracking

**User Story:** As a user moving my cursor, I want the satellite's antenna to subtly track my cursor position, reinforcing the "communication device" metaphor.

#### Acceptance Criteria

1. Antenna mesh tracks cursor in 3D space:
   - Convert cursor 2D position to 3D ray using `useThree()` raycaster
   - Antenna uses `.lookAt(cursorWorldPosition)` to orient toward cursor
   - Tracking is SMOOTHED with damping (lerp factor 0.05) to avoid jittery movement

2. Tracking only active when cursor is within 40% distance of satellite:
   - Calculate distance from cursor ray intersection to satellite position
   - If distance > 40% of viewport diagonal: antenna returns to default forward direction
   - Smooth transition between tracking and default state

3. Tracking respects `prefers-reduced-motion`:
   - If active: antenna stays in default forward direction, no tracking

4. Performance constraint:
   - Cursor tracking calculations run at max 30fps (throttled) to save performance
   - Use `useFrame` with frame skip logic

**Correctness Properties:**
- **P7**: Antenna rotation must be clamped to realistic range (-45° to +45° from vertical axis)
- **P8**: Cursor tracking does NOT cause re-renders of React components outside Canvas
- **P9**: Tracking continues smoothly during orbit motion (two animations don't conflict)

---

### Requirement 4: Signal Wave on Form Submit

**User Story:** As a user submitting the contact form, I want to see a visual feedback signal emanating from the satellite, confirming my message is being "transmitted".

#### Acceptance Criteria

1. Signal wave triggered by form submission:
   - Listen to custom event `contact-form-submit` from form component
   - Spawn 3 concentric ring meshes at satellite position on event

2. Ring animation properties:
   - Geometry: TorusGeometry with thin tube radius (0.1)
   - Starting radius: same as satellite body width
   - End radius: 3x satellite body width
   - Color: #06B6D4 (cyan, communication signal color)
   - Animation duration: 1200ms

3. Ring expansion and fade:
   - Scale: animate from 1 to 3 using Framer Motion `useSpring`
   - Opacity: animate from 1 to 0 (linear)
   - Each of 3 rings delayed by 200ms (staggered effect)

4. Rings auto-cleanup after animation completes:
   - Remove mesh from scene to prevent memory leak
   - Max 3 rings visible at any time (new submit cancels previous if still animating)

5. Signal respects `prefers-reduced-motion`:
   - If active: single static ring appears and fades (no expansion), duration 600ms

**Correctness Properties:**
- **P10**: Signal wave must be visible regardless of satellite's current orbit position
- **P11**: Multiple rapid form submits must NOT spawn > 3 concurrent ring sets (memory protection)
- **P12**: Signal animation must complete before satellite completes next orbit cycle (no visual overlap)

---

### Requirement 5: Integration with Current Background

**User Story:** As a user, I want the satellite to feel like it's part of the existing astronomy background (not a separate disconnected element).

#### Acceptance Criteria

1. Satellite rendered in SAME Canvas as current background:
   - NOT a separate `<Canvas>` instance
   - Shares camera, lights, scene graph with AstronomyImmersive
   - Z-index layering: Background stars (z=-10) → Satellite (z=-5) → Content (z=10)

2. Satellite respects current lighting setup:
   - Uses existing ambient light from scene
   - Optional: Add subtle spotlight from "sun" direction for rim lighting
   - NO new light sources that affect background

3. Satellite visible only on Contact page:
   - Conditional render based on current route: `useLocation().pathname === '/contact'`
   - Component unmounts cleanly when navigating away (no memory leak)

4. Performance budget maintained:
   - Adding satellite must NOT reduce background FPS by more than 5fps
   - Total scene polygon count increases by < 500 triangles
   - No additional texture loading (all colors are material properties)

**Correctness Properties:**
- **P13**: Satellite must render AFTER background stars (depth ordering) to prevent occlusion
- **P14**: Page navigation to/from Contact page must NOT cause React Three Fiber Canvas re-initialization
- **P15**: Satellite removal on page leave must complete within 200ms (smooth transition)

---

## Constraints

### Technical Constraints
- React Three Fiber version: ^8.x (already installed)
- Three.js version: Compatible with R3F ^8.x
- Target FPS: >= 55fps on mid-range GPU (GTX 1060 equivalent)
- Bundle size increase: < 50KB (geometry only, no textures)

### Browser Compatibility
- Chrome/Edge >= 90
- Firefox >= 88
- Safari >= 14.1
- WebGL 2.0 required (fallback: hide satellite on WebGL 1.0)

### Accessibility
- Satellite is decorative only: `aria-hidden="true"` on Canvas
- Does NOT interfere with form keyboard navigation
- Respects `prefers-reduced-motion` system setting

### Mobile
- Satellite hidden on screens < 1024px (media query)
- Rationale: Limited screen space, form should be focus, GPU power conservation

---

## Dependencies

### External Libraries (Already Installed)
- `three`: 3D engine core
- `@react-three/fiber`: React renderer for Three.js
- `@react-three/drei`: Helper components (if needed for orbit controls)

### Internal Components
- `AstronomyImmersive.tsx`: Current background (will be extended)
- Contact form component: Must emit `contact-form-submit` event

### New Components to Create
- `SatelliteScene.tsx`: Main satellite component with orbit logic
- `SignalWave.tsx`: Ring animation component (reusable)

---

## Success Criteria

### Functional Success
- [ ] Satellite visible and recognizable as communication device
- [ ] Orbit animation smooth and consistent
- [ ] Antenna tracking works within specified distance threshold
- [ ] Signal wave triggers correctly on form submit
- [ ] No visual conflicts with form content or background

### Performance Success
- [ ] FPS remains >= 55 on target hardware
- [ ] No memory leaks after 10+ page navigations
- [ ] CPU usage < 30% on single core during orbit
- [ ] GPU usage < 40% of available budget

### Quality Success
- [ ] Satellite fits visual language of existing astronomy theme
- [ ] Animations feel purposeful (not arbitrary/gimmicky)
- [ ] Code is maintainable (< 300 lines for satellite component)
- [ ] No console errors or React warnings

---

## Non-Goals (Out of Scope for Stage 1)

- ❌ Physically accurate orbital mechanics (simplified parametric path only)
- ❌ Detailed satellite model with textures (primitive geometry only)
- ❌ Sound effects on signal transmission
- ❌ Interactive satellite rotation via drag
- ❌ Multiple satellites or satellite variations
- ❌ Integration with other 3D objects (Galaxy, Nebula, Black Hole) - those are later stages

---

## Risk Assessment

### Low Risk
- Primitive geometry rendering (well-established Three.js pattern)
- Parametric orbit animation (simple math)
- Event-based signal trigger (standard React pattern)

### Medium Risk
- Cursor tracking calculation (raycasting can be expensive if not throttled)
- Integration with existing Canvas (need to ensure no conflicts)

### High Risk
- None identified for this stage (intentionally chosen as simplest object)

---

## Testing Strategy

### Unit Tests
- Orbit position calculation at various time values
- Cursor distance calculation
- Signal wave spawn/cleanup logic

### Visual Tests
- Screenshot comparisons at key orbit positions
- Form submit signal visibility
- Antenna tracking at edges of threshold

### Performance Tests
- FPS monitoring during 60-second orbit
- Memory profiling after 20 page navigations
- CPU/GPU usage measurement

### Accessibility Tests
- Keyboard navigation of form with satellite visible
- Screen reader announcement not disrupted
- Reduced motion preference respected

---

## Rollback Plan

If Stage 1 satellite implementation fails to meet success criteria:

1. **Immediate**: Revert to previous git commit (pre-Stage 1)
2. **Diagnose**: Identify specific failure (performance, visual, integration)
3. **Options**:
   - **Option A**: Further simplify (remove antenna tracking, static orbit)
   - **Option B**: Replace 3D satellite with 2D SVG animation (lowest risk fallback)
   - **Option C**: Abort 3D objects concept entirely, keep current immersive background only

Decision point: After screenshot verification and performance testing

---

*Stage: 1 of 4 (Satellite)*  
*Complexity: LOW (calibration stage)*  
*Status: Requirements complete, awaiting approval to proceed to Design phase*
