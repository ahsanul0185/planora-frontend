# The Design System: Planora Editorial Framework

## 1. Overview & Creative North Star: "The Digital Maître D’"
This design system moves beyond the utility of event management into the realm of high-end curation. Our Creative North Star is **"The Digital Maître D’"**—a system that is invisible yet authoritative, sophisticated yet effortless. 

To achieve an elite editorial feel, we reject the "bootstrap" aesthetic of boxes and borders. Instead, we use **intentional asymmetry, expansive negative space, and tonal layering**. The transition from 'CuratorEvents' to 'Planora' represents a shift from "organizing" to "orchestrating." The UI should feel like a premium print magazine: high-contrast typography, breathtaking imagery, and a layout that breathes.

---

## 2. Colors: Tonal Depth over Structural Lines
We utilize a palette rooted in deep botanical greens and soft, paper-like neutrals.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited for sectioning.** To separate content, you must use background color shifts. For example, a `surface-container-low` card sits on a `surface` background. The eye should perceive change through value, not lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked fine papers. 
*   **Base:** `surface` (#f9faf6) - The foundation.
*   **Secondary Layer:** `surface-container-low` (#f3f4f1) - For large secondary regions.
*   **Elevation:** `surface-container-lowest` (#ffffff) - For the most prominent interactive cards.
*   **Deep Interaction:** `surface-container-high` (#e7e9e5) - For recessed UI elements like search bars or inactive states.

### The Glass & Gradient Rule
For floating navigation or modals, use **Glassmorphism**. Apply `surface` at 80% opacity with a `20px` backdrop-blur. 
*   **Signature Polish:** Use a subtle linear gradient on primary CTAs: `primary` (#003627) to `primary_container` (#1a4d3c) at a 135-degree angle. This adds a "silk" finish that flat color lacks.

---

## 3. Typography: The Editorial Voice
We pair the utilitarian precision of **Inter** with the classic elegance of **Newsreader** (Display/Headline) to create an authoritative hierarchy.

*   **Display (Newsreader):** Use `display-lg` (3.5rem) for hero moments. Apply -2% letter spacing to evoke high-end fashion mastheads.
*   **Headlines (Newsreader):** `headline-md` (1.75rem) should be used for event titles. It signals that every event is a story, not just a data point.
*   **Body & UI (Inter):** All functional text uses Inter. `body-md` (0.875rem) is the workhorse. Keep line-heights generous (1.6x) to maintain the editorial "breath."
*   **Labels (Inter):** `label-md` (0.75rem) in `all-caps` with 0.1rem letter spacing for category tags (e.g., "GALA", "PRIVATE AUCTION").

---

## 4. Elevation & Depth: Atmospheric Layering
We do not use "drop shadows" in the traditional sense. We use **Ambient Occlusion**.

*   **The Layering Principle:** Depth is achieved by "stacking." A white card (`surface-container-lowest`) on a light grey background (`surface-container-low`) provides enough contrast to imply elevation without a shadow.
*   **Ambient Shadows:** If a floating element (like a dropdown) requires a shadow, use: `box-shadow: 0 20px 40px rgba(25, 28, 27, 0.04)`. Note the extremely low opacity—it should be felt, not seen.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` (#c0c9c3) at **15% opacity**. It should look like a faint watermark.

---

## 5. Components: Orchestrating the Experience

### Buttons (The "Seal of Quality")
*   **Primary:** Gradient fill (Primary to Primary Container). No border. `xl` roundedness (0.75rem). Text: `label-md` all-caps.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. Feels integrated, not loud.
*   **Tertiary:** Text only, using `primary` color. Hover state should include a 1px underline of the same color.

### Cards & Discovery
*   **Rule:** Forbid divider lines. Use `spacing-6` (2rem) of white space between card sections.
*   **Image Treatment:** All event photography must have a slight `md` (0.375rem) corner radius. Imagery is the star; the UI is the frame.

### Input Fields
*   **Style:** Minimalist. Use a `surface-container-low` background with a bottom-only "Ghost Border."
*   **Focus State:** Transition the bottom border to `primary` and add a very soft `primary_fixed` glow.

### Signature Component: The "Curator's Sheet"
A slide-over drawer (using `surface-container-lowest`) that utilizes Glassmorphism on its backdrop. This is used for creating events, allowing the user to see the "Discovery" layer beneath, maintaining context.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Place a `headline-lg` off-center to create a dynamic, editorial feel.
*   **Use Generous Spacing:** When in doubt, increase spacing. Use `spacing-16` (5.5rem) between major sections to let the content "own" the screen.
*   **Tonal Overlays:** Use `surface_tint` at 5% opacity over images to make text overlays more legible while maintaining brand harmony.

### Don’t:
*   **Don't use 100% Black:** Always use `on_surface` (#191c1b) for text to keep the look "printed" rather than "digital."
*   **Don't use Box Shadows on Cards:** Rely on the `surface-container` shifts.
*   **Don't use Sharp Corners:** Even in a "clean" system, the `DEFAULT` (0.25rem) or `md` (0.375rem) roundedness prevents the UI from feeling aggressive or "tech-heavy."
*   **Don't Crowd the Header:** The navigation should feel like an invitation, not a directory. Limit top-level items to four.

---

## 7. Spacing Scale: The Rhythm of Planora
Use the following tokens to maintain a consistent vertical rhythm:
*   **Micro (Spacing 1-2):** For internal component spacing (e.g., icon to text).
*   **Structural (Spacing 4-6):** For spacing between related elements in a card.
*   **Sectional (Spacing 12-20):** For the gap between major content blocks. This "wasteful" use of space is what defines the high-end experience.