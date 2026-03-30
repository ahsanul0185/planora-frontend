# Design System Document: The Editorial Event Experience

## 1. Overview & Creative North Star: "The Digital Curator"
Most event platforms feel like spreadsheets with buttons. This design system rejects the "utility-only" aesthetic in favor of **The Digital Curator**. Our North Star is a high-end, editorial approach that treats every event as a premier gallery opening.

We move beyond the template look by embracing **intentional asymmetry** and **tonal depth**. Instead of rigid grids, we use breathing room (whitespace) as a functional element to guide the eye. Overlapping elements and a high-contrast typography scale transform a "management tool" into a sophisticated experience that feels both professional for organizers and inviting for attendees.

---

## 2. Colors: Tonal Sophistication
This system utilizes a professional teal/green palette grounded in OKLCH for perceptual uniformity.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. Use `surface-container-low` sections sitting on a `surface` background to denote change in context. Lines create visual noise; tonal shifts create harmony.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, heavy-stock paper.
- **Base Layer:** `surface` (#f7faf7)
- **Primary Content Areas:** `surface-container-low` (#f1f4f1)
- **Interactive Elevated Cards:** `surface-container-lowest` (#ffffff)
- **Secondary/Side Navigation:** `surface-container` (#ecefec)

### The "Glass & Gradient" Rule
To elevate the experience beyond flat UI, use **Glassmorphism** for floating elements (Modals, Popovers, Sticky Headers). Use a semi-transparent `surface-container-lowest` with a `backdrop-blur` of 12px–20px. 

### Signature Textures
Main CTAs and Hero backgrounds should not be flat. Use subtle linear gradients transitioning from `primary` (#004337) to `primary_container` (#005d4d) at a 135-degree angle. This adds a "lithographic" depth that flat colors cannot achieve.

---

## 3. Typography: Editorial Authority
We utilize **Inter** as our typographic backbone. The goal is a clear contrast between large, authoritative displays and highly legible functional labels.

- **Display (lg/md/sm):** Used for event titles and hero statements. These should feel "architectural." Set with a tight letter-spacing (-0.02em).
- **Headline (lg/md/sm):** Used for section headers. These provide the narrative structure of the page.
- **Title (lg/md/sm):** Used for card titles and prominent UI labels.
- **Body (lg/md/sm):** Reserved for descriptions and event details. Always use `on-surface-variant` (#3f4945) for long-form body text to reduce eye strain and increase the "premium" feel.
- **Label (md/sm):** Used for metadata, chips, and small captions. Always set in Medium or Semi-Bold weight.

---

## 4. Elevation & Depth: Tonal Layering
We convey hierarchy through **Tonal Layering** rather than traditional structural lines or heavy shadows.

### The Layering Principle
Depth is achieved by "stacking" surface tiers.
*Example:* Place a `surface-container-lowest` card (Pure White) on a `surface-container-low` (Pale Green-Grey) section. This creates a soft, natural lift without the need for a legacy "drop shadow."

### Ambient Shadows
When a floating effect is required (e.g., a "Create Event" FAB), use **Ambient Shadows**:
- Blur: 24px–40px
- Opacity: 4%–8%
- Color: `on-surface` (#181c1b)
- *Result:* A soft glow that mimics natural, diffused light.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use a **Ghost Border**:
- Token: `outline-variant` (#bec9c4)
- Opacity: 20%
- *Strict Rule:* Never use 100% opaque, high-contrast borders.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`). White text. `0.5rem` (md) radius.
- **Secondary:** `secondary_container` fill with `on-secondary-container` text. No border.
- **Tertiary:** Text-only with `primary` color. High-weight (Semi-bold) to ensure it doesn't get lost.

### Cards & Lists
**Forbid the use of divider lines.**
- Separate list items using vertical white space (`spacing.4` or `spacing.6`).
- For cards, use the "Nesting" principle mentioned in Section 4. Ensure `padding.6` is the minimum for any card to maintain the editorial feel.

### Event Status Chips
Use `tertiary_fixed` (#d1e7e2) for backgrounds with `on_tertiary_fixed_variant` (#374b47) for text. The low-contrast, high-nuance color pairing feels more "exclusive" than high-vibrancy status colors.

### Input Fields
Soft backgrounds using `surface-container-highest` (#e0e3e0). On focus, transition the background to `surface-container-lowest` (White) and apply a 2px `primary` "Ghost Border" at 40% opacity.

### Floating Event Bar
A unique component for this system: A sticky footer bar using **Glassmorphism** that contains quick actions (Register, Share, Add to Calendar). It should feel like it's floating over the content, not stuck to the bottom of the browser.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical margins (e.g., wider left margins on desktop) to create an editorial layout.
- **Do** use the `spacing.16` (4rem) for section gaps. Extreme whitespace equals extreme luxury.
- **Do** use `primary_fixed` (#a6f1dc) as a subtle background highlight for "Featured" content.

### Don't
- **Don't** use black (#000000). Always use `on-surface` (#181c1b) for text.
- **Don't** use standard "Box Shadows." If it looks like a 2014 material design app, it's wrong. Use tonal shifts.
- **Don't** cram content. If you think there's enough whitespace, add 25% more.
- **Don't** use 100% opaque `border` tokens. If a line is needed, use a `surface-container-highest` background shift to *imply* a line.