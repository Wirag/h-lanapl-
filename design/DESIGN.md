---
name: Warm Mindful Sanctuary
colors:
  surface: '#fff8f5'
  surface-dim: '#e2d8d3'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf2ec'
  surface-container: '#f6ece7'
  surface-container-high: '#f0e6e1'
  surface-container-highest: '#ebe0db'
  on-surface: '#1f1b18'
  on-surface-variant: '#56423d'
  inverse-surface: '#352f2c'
  inverse-on-surface: '#f9efea'
  outline: '#89726b'
  outline-variant: '#dcc1b9'
  surface-tint: '#9c4326'
  primary: '#994124'
  on-primary: '#ffffff'
  primary-container: '#b8593a'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59e'
  secondary: '#466550'
  on-secondary: '#ffffff'
  secondary-container: '#c5e8cd'
  on-secondary-container: '#4a6a54'
  tertiary: '#805218'
  on-tertiary: '#ffffff'
  tertiary-container: '#9c6a2e'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#3a0b00'
  on-primary-fixed-variant: '#7d2d11'
  secondary-fixed: '#c8ebd0'
  secondary-fixed-dim: '#accfb4'
  on-secondary-fixed: '#022110'
  on-secondary-fixed-variant: '#2f4d39'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#f9ba77'
  on-tertiary-fixed: '#2c1700'
  on-tertiary-fixed-variant: '#673d02'
  background: '#fff8f5'
  on-background: '#1f1b18'
  surface-variant: '#ebe0db'
typography:
  headline-xl:
    fontFamily: Literata
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Literata
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Literata
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  gutter-lg: 1.5rem
  margin: 1.25rem
  margin-sm: 1rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system embraces an organic, warm minimalist aesthetic crafted for daily reflection, mindfulness, and gratitude tracking. It channels the comforting tactile feeling of opening an artisanal linen-bound journal beside soft morning sunlight. The emotional response is deliberately slow, grounded, quiet, and reassuring—counteracting digital noise, hyper-stimulation, and aggressive gamification.

The interface prioritizes breathing room, gentle surface transitions, soft organic curvature, and refined typography. The visual language blends tactile mindfulness with editorial polish: generous whitespace, warm natural paper surfaces, subtle micro-accents, and delicate feedback states that encourage intimate self-expression and unhurried daily rituals.

## Colors

The color architecture is derived from natural, unbleached, and earth-baked elements:

- **Primary (`#C86545` terracotta / clay):** Anchors primary call-to-actions, prominent state markers, and reflective milestones. It radiates warmth without demanding aggressive urgency.
- **Secondary (`#5F7F68` muted sage green):** Represents growth, grounding, and balance. Used for peaceful completions, streak blossoms, mood indicators, and secondary supportive actions.
- **Tertiary (`#E5A967` soft amber / sunlit gold):** Evokes morning radiance and gratitude highlights. Applied to highlight rings, micro-reflections, stellar entries, and gentle celebration touches.
- **Neutral (`#2B2623` deep espresso):** Serves as the primary ink tone, providing deep contrast against cream backgrounds while remaining softer and more organic than harsh pure black.
- **Surfaces & Canvases:**
  - Base canvas: `#FAF7F2` (soft linen canvas).
  - Elevated card surface: `#FFFFFF` (crisp pressed paper).
  - Recessed / muted container surface: `#F3EFEA` (warm oatmeal tint).
  - Secondary text / subdued labels: `#4A4440` and `#786F69`.
  - Subtle borders: `#E8E2D9` (hairline parchment edge).

## Typography

The typographic hierarchy pairs a literary, bookish serif with an approachable, geometric humanist sans-serif:

- **Headings & Reflective Prompts (`Literata`):** Rooted in classic book design and contemplative editorial settings. Its organic curves, refined serifs, and warm personality dignify personal thoughts and daily Hungarian prompts (e.g., *„Miért vagy hálás a mai napon?”*).
- **Body, Inputs & Numbers (`Plus Jakarta Sans`):** Provides pristine legibility for longer user reflections, micro-copy, timestamps, calendar day matrices, and functional labels. The rounded terminals mirror the calm spirit of the interface without distracting from personal entries.
- **Scale Behavior:** Mobile viewports downscale primary headlines automatically to maintain balanced negative space and prevent awkward line breaks in longer compound Hungarian words.

## Layout & Spacing

The layout philosophy follows an expansive, breathable mobile-first approach. Content is structured within a fluid grid container that preserves generous horizontal margins and uncluttered vertical flow:

- **Mobile Viewports (< 640px):** Single-column layout with `margin-sm` (16px) or `margin` (20px), ensuring the edges feel protected and personal. Vertical spacing between prompts and entries favors `space-xl` to prevent visual fatigue.
- **Tablet / Large Handheld (640px - 1024px):** Fixed-center max-width column (600px - 680px) for journaling comfort or an asymmetrical two-column layout (calendar/mood track on the left, open journal prompt on the right) with `gutter-lg`.
- **Rhythm:** Internal card spacing leverages `space-lg` (24px) for expansive breathing room, allowing thoughts to settle without crowded borders.

## Elevation & Depth

Visual hierarchy uses warm tonal surfaces combined with ambient, cloud-diffused drop shadows:

- **Surface Tiers:**
  - *Tier 0 (Base):* `#FAF7F2` linen background.
  - *Tier 1 (Resting Cards):* Crisp white `#FFFFFF` surface resting with an extra-diffused warm tint shadow (`box-shadow: 0 8px 24px -4px rgba(43, 38, 35, 0.05), 0 2px 6px -1px rgba(43, 38, 35, 0.03)`).
  - *Tier 2 (Floating Action Modals / Prompts):* `#FFFFFF` with expanded ambient warmth (`box-shadow: 0 16px 36px -6px rgba(43, 38, 35, 0.08), 0 4px 12px -2px rgba(43, 38, 35, 0.04)`).
  - *Tier 3 (Muted Inset Wells):* Recessed container `#F3EFEA` with no shadow, defined only by soft contrast.
- **Low-Contrast Contours:** Surface boundaries feature a microscopic 1px parchment stroke (`#E8E2D9` at 60% opacity) to provide crisp boundary definition on high-DPI displays without harsh contrast lines.

## Shapes

The shape system embraces soft, humanistic, pebble-like contours:

- **Cards & Prompts (`rounded-xl` / 1.5rem):** Journal entries, prompt cards, and monthly review containers use generous 24px corner radii, giving each surface a soft, hand-crafted paper card feel.
- **Pill Elements (`rounded-full`):** Mood tags, audio reflection chips, calendar date active states, and primary button shapes use full pill borders for friendly, tactile ergonomics.
- **Inner Controls (`rounded-lg` / 1rem):** Text input fields, mood selectors, and photo attachment thumbnails share 16px corner radii to maintain cohesive curvature relationships.

## Components

- **Buttons:**
  - *Primary Button:* Solid warm terracotta (`#C86545`) with white text, pill-shaped (`rounded-full`), padded with `space-sm` vertically and `space-lg` horizontally. On press, scales softly to `0.98` with an amber highlight aura.
  - *Secondary Button:* Outlined with muted parchment border (`#E8E2D9`), linen-tinted hover state, and deep espresso text.
  - *Ghost / Mindful Action:* Text-only in sage green or terracotta with a subtle underline appearing only during engagement.

- **Cards (Journal Entries & Prompts):**
  - Crisp `#FFFFFF` surface with 24px rounded corners and ambient espresso shadow.
  - Features an optional top accent ribbon or date indicator in tertiary amber (`#E5A967`).
  - Ample internal padding (`space-lg`) to give user reflections the feel of physical stationery.

- **Chips & Mood Pills:**
  - Compact pill-shaped containers (`rounded-full`) in soft tint backgrounds (`#F3EFEA`).
  - Active states shift to tinted sage green (`#EBF0EC` background with `#5F7F68` text and icon) or warm terracotta tint.
  - Mood selector features micro-dot indicators representing emotional states (nyugodt, hálás, inspirált, fáradt).

- **Input Fields & Journaling Area:**
  - Clean, unlined or delicate dotted baseline styling.
  - Background is either borderless with a subtle cream recess (`#F3EFEA`) or framed with a 1px soft stone contour (`#E8E2D9`).
  - Active focus state transitions smoothly to an amber-gilded glow (`#E5A967` at 25% opacity) without aggressive blue outlines.
  - Generous line height (1.65) matching physical ruled notebooks.

- **Lists & Micro-Reflections:**
  - Bulletless or styled with soft amber dots (`●`) and sage leaf markers.
  - Separated by soft margin breaks (`space-md`) rather than heavy horizontal dividing lines.

- **Checkboxes & Habit Radios:**
  - Smooth rounded geometries (`rounded-md` or `rounded-full`) with `#E8E2D9` borders.
  - Checked state transitions into solid sage green (`#5F7F68`) with a gentle blooming spring micro-interaction.

- **Domain-Specific Components:**
  - *Prompt of the Day Banner:* Elegant Literata serif headline paired with an organic watercolor-like amber wash background.
  - *Mini Calendar Strip:* Horizontal week scroller with subtle dot indicators below days representing recorded moments of gratitude.