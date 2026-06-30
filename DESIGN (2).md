---
name: The Editorial Monograph
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f1eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#444748'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0e9'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#bc0000'
  on-secondary: '#ffffff'
  secondary-container: '#e41f13'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#930000'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
typography:
  masthead:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '900'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Source Serif 4
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: Archivo Narrow
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.08em
  caption:
    fontFamily: Source Serif 4
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
spacing:
  column-gap: 24px
  edge-margin: 32px
  rule-weight: 1px
  double-rule-gap: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 40px
---

## Brand & Style
This design system captures the tactile, authoritative essence of traditional print journalism. It targets an audience that values slow-form content, intellectual depth, and the physical heritage of the broadsheet. The emotional response is one of reliability, prestige, and "ink-on-paper" permanence.

The design style is **Modern Editorial Brutalism**. It utilizes high-contrast typography, structural grid lines, and a monochromatic foundation to prioritize legibility and information hierarchy. Subtle paper textures and digital halftone effects are employed to bridge the gap between physical newsprint and modern interfaces without sacrificing digital performance.

## Colors
The palette is rooted in the "Ink and Paper" philosophy.
- **Primary (Ink Black):** #1A1A1A is used for all text, borders, and structural lines to simulate high-carbon printer ink.
- **Background (Aged Paper):** #F4F1EA provides a soft, warm off-white that reduces eye strain and mimics slightly aged newsprint.
- **Secondary (Redacted/Editorial Red):** #CC0000 is used sparingly for urgent alerts, live indicators, or high-priority categories.
- **Accent (Litho Grey):** #4A5568 is used for secondary metadata and halftone patterns.

Images should maintain high saturation to create a striking "Full Color Insert" effect against the monochromatic UI.

## Typography
The typography system relies on a sharp contrast between display serifs and functional, condensed sans-serifs.

- **Playfair Display** serves as the masthead and headline face, evoking the elegance of classic broadsheets. 
- **Source Serif 4** (a highly legible descendant of the Garamond/Baskerville tradition) is used for all long-form body text to ensure maximum readability in dense layouts.
- **Archivo Narrow** is used for labels, "kicker" text above headlines, and navigation items, mimicking the condensed fonts used in newspaper sidebars and sports scores.

Maintain tight leading for headlines and generous leading for body text to create the rhythmic "columns of gray" typical of high-end publishing.

## Layout & Spacing
This design system utilizes a **12-column Rigid Grid** that mimics the multi-column format of a newspaper. 

- **Columnar Flow:** Articles should reflow into multi-column spans on desktop (e.g., a 3-column span for the main story text).
- **Separation:** Vertical and horizontal divisions must be handled by 1px solid black lines ("Rules"). 
- **Double Rules:** Use two parallel lines (1px weight with 4px gap) to separate major sections or define the top and bottom of the global header.
- **Margins:** Use wide outer margins (32px+) to simulate the "gutter" of a physical page.
- **Mobile:** On mobile, the 12-column grid collapses to 1, but "Rules" remain essential for separating content blocks vertically.

## Elevation & Depth
In alignment with print heritage, this system is strictly flat. Physical depth is achieved through **Tonal Stacking** and **Layering**, not shadows.

- **Flatness:** No drop shadows or blurs. 
- **The Clipping Effect:** Elements that need to appear "above" others should use a slightly different paper tint (e.g., a "Clipping" card using a 5% darker version of the background) and a crisp 1px border.
- **Halftone Overlays:** Use a subtle 10% opacity halftone dot pattern on secondary background areas to provide a tactile, printed texture.
- **Borders:** Every container is defined by a 1px #1A1A1A border. To emphasize a "selected" or "hero" state, increase the border weight to 3px rather than adding elevation.

## Shapes
The shape language is strictly **Rectilinear**.
- **Sharp Corners:** All buttons, cards, and input fields must have 0px radius. This reinforces the "cut paper" aesthetic.
- **Interaction:** State changes (hover/active) should be indicated by color inversion (Black background with Paper-colored text) rather than shape morphing.

## Components
- **Buttons:** Rectangular, 1px border, label in Archivo Narrow (All Caps). On hover, the button should "Invert" (Ink Black fill).
- **Menu Cards:** Designed as "Clippings." These should have a jagged "torn" bottom edge effect (SVG mask) or simply be bound by thin black lines with a small "Kicker" label in the top left.
- **Lists:** Items separated by 1px horizontal rules. Use a small "bullet" square or a typographic fleur-de-lis for bullet points.
- **Inputs:** Simple bottom-border only or full 1px rectangle. Use Source Serif 4 for user input text to keep it looking like a "letter to the editor."
- **Data Tables:** High-density, using vertical rules between columns and a "Double Rule" for the header row.
- **Chips/Tags:** Small rectangular boxes with a 1px border, using the Archivo Narrow font. They should look like classified ad categories.
- **Halftone Patterns:** Used as background fills for decorative elements or to "redact" empty states.