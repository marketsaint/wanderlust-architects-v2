Here is the full production-ready design system package for your Wanderlust Architects project showcase page, tailored for your marketsaint/wanderlust-architects repo.

The goal is to create a luxury, animated, Awwwards-level grid portfolio that still feels usable, elegant, and buildable in Next.js + Tailwind + Framer Motion.

1. Figma layout blueprint
Page structure
A. Hero intro

Use a full-viewport opening section.

Desktop frame: 1440 × 1800
Top section should include:

minimal top nav or hidden nav

cinematic heading

small intro copy

scroll indicator

featured hero image/video

Hero layout

Left padding: 96 px

Right padding: 96 px

Top padding: 48 px

Bottom padding: 64 px

Title block max width: 620 px

Eyebrow text: 14 px

Main heading: 72–88 px

Supporting copy: 18 px

CTA row gap: 20 px

Suggested hierarchy:

Eyebrow: “Selected Works”

Title: “Architecture in Motion”

Subtext: short luxury editorial statement

Primary CTA: “Explore Projects”

Secondary CTA: “Featured Work”

B. Floating filter bar

This sits just below hero or overlays the lower hero edge.

Filter container

Width: auto

Height: 56 px

Padding: 8 px

Radius: 999 px

Background: translucent white

Border: 1 px soft gray

Shadow: subtle

Filter chips

Height: 40 px

Horizontal padding: 18 px

Gap between chips: 8 px

Text size: 14 px

Categories:

All

Residential

Hospitality

Commercial

Interior

Master Planning

C. Showcase grid

This is the main section.

Use a 12-column desktop grid, but place cards in a masonry-like editorial layout.

Desktop content width

Max width: 1360 px

Margin: auto

Side padding: 40 px

Column gap: 24 px

Row gap: 24 px

Use three card sizes:

Large card

Span: 6 columns

Height: 720 px

Medium card

Span: 4 columns

Height: 560 px

Small card

Span: 3 columns

Height: 420 px

Tall vertical card

Span: 4 columns

Height: 760 px

Wide cinematic card

Span: 8 columns

Height: 640 px

D. Featured strip

Break the grid with a full-width featured project.

Container

Max width: 1360 px

Height: 780 px

Radius: 32 px

Internal padding: 48 px

Layout: image background + bottom-left content

Content block:

Eyebrow: 14 px

Title: 56 px

Meta: 16 px

CTA button: 52 px height

E. Load more / infinite continuation

Below the featured strip, continue with more irregular cards.

Figma frame system

Create these frames:

Showcase / Desktop / 1440

Showcase / Tablet / 1024

Showcase / Mobile / 390

Components / Project Card

Components / Filter Chip

Components / Cursor

Components / Featured Banner

Figma component variants
Project card variants

Default

Hover

Active

Loading

Filtered-out

Cursor variants

Default

View Project

Drag

Loading

Filter chip variants

Default

Hover

Selected

2. Exact grid sizes
Desktop grid

Use 12 columns.

Container

Max width: 1360 px

Column gap: 24 px

Outer padding: 40 px

Recommended card rhythm

Use this repeating arrangement:

Row pattern 1

Card A: large, 6 cols, 720 h

Card B: small, 3 cols, 420 h

Card C: small, 3 cols, 420 h

Row pattern 2

Card D: medium, 4 cols, 560 h

Card E: tall, 4 cols, 760 h

Card F: medium, 4 cols, 560 h

Row pattern 3

Card G: wide, 8 cols, 640 h

Card H: medium, 4 cols, 560 h

This prevents the page from looking too repetitive.

Tablet grid

Use 6 columns.

Max width: 100%

Side padding: 28 px

Gap: 20 px

Card rules:

Large: 6 cols, 620 h

Medium: 3 cols, 460 h

Small: 3 cols, 360 h

Mobile grid

Use 2 columns.

Side padding: 16 px

Gap: 14 px

Card rules:

Featured: 2 cols, 420 h

Normal: 2 cols, 320 h

Compact: 1 col, 220 h only if needed, but full-width cards are better for luxury feel

For your brand, mobile should feel editorial, so prefer mostly full-width cards.

3. Framer Motion animation architecture

Your repo stack already supports this direction very well.

Recommended animation layers
Layer 1: page intro

Hero image and text reveal.

Use:

opacity

y translate

clip-path or masked reveal

slight image scale from 1.08 to 1

Layer 2: grid entrance

Cards enter with stagger.

Use:

opacity: 0 → 1

y: 40 → 0

duration: 0.8

stagger: 0.06

Layer 3: hover interactions

On each project card:

scale: 1 → 1.03 or 1.05

image scale: 1 → 1.08

overlay opacity: 0.15 → 0.4

content translateY: 12 → 0

shadow increase

Layer 4: filter transitions

When category changes:

use layout

animate opacity and scale on exiting/entering cards

rearrange with spring motion

Layer 5: project open transition

When card is clicked:

use shared layout transition

card expands into project detail hero

Motion tokens

Use these as your default motion settings.

Smooth reveal
const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}
Stagger container
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08
    }
  }
}
Card hover
const cardHover = {
  rest: {
    scale: 1,
    y: 0
  },
  hover: {
    scale: 1.03,
    y: -6,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 22
    }
  }
}
Image hover
const imageHover = {
  rest: { scale: 1, x: 0, y: 0 },
  hover: {
    scale: 1.08,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
}
Filter layout transition
const layoutTransition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8
}
4. Awwwards-winning interaction system

This is the part that makes the UI feel premium.

A. Breathing grid effect

As the cursor moves across the grid:

the nearest card scales slightly larger

adjacent cards respond subtly

distant cards remain stable

Keep this subtle. Do not overdo it.

Scale suggestion:

focused card: 1.04 to 1.08

nearby cards: 1.01 to 1.03

others: 1

B. Magnetic hover

When cursor enters a card:

card shifts 4–12 px toward cursor

image shifts more slowly behind it

creates layered depth

C. Image parallax

Within the card:

image follows cursor at low intensity

text layer stays mostly stable

overlay gradient deepens

D. Custom cursor

Use a soft circular cursor.

States:

default: small outlined circle

over card: large filled circle with “View”

over draggable zone: “Drag”

opening transition: shrink and fade

E. Scroll reveal choreography

Cards should not all animate identically.

Mix:

fade-up

fade-in with scale

mask reveal from bottom

occasional lateral slide for feature cards

F. Featured project cinematic band

When featured project enters viewport:

image slowly scales down from 1.06

text fades upward

CTA appears with slight delay

G. Grid-to-detail transition

Best premium effect:

on click, the selected card expands to fill viewport

image becomes project hero

metadata flows into project detail page

This gives an Apple Photos / portfolio film feel.

H. Noise and light treatment

Add:

ultra subtle grain

soft vignetting on hero/featured banners

restrained shadows

no heavy neumorphism

5. Suggested visual language
Colors

Use a restrained palette.

Background: #F7F5F2
Surface: #FFFFFF
Primary text: #111111
Secondary text: #666666
Line: #E7E2DA
Accent: #B7936A
Dark accent: #7C6247
Typography

Use a refined pairing.

Recommended:

Canela / Playfair Display / Cormorant Garamond for titles

Inter / Suisse Intl / Neue Haas Grotesk style for UI text

Sizing:

Hero title: 72–88 px

Section title: 48 px

Card title: 26–34 px

Meta text: 14–16 px

Filter labels: 14 px

Radius system

Large sections: 32 px

Project cards: 24 px

Filter chips: 999 px

Buttons: 999 px or 18 px

6. Suggested repo structure for implementation

For your wanderlust-architects repo, use something like this:

app/
  (site)/
    projects/
      page.tsx
      [slug]/
        page.tsx

components/
  showcase/
    showcase-hero.tsx
    showcase-filter-bar.tsx
    showcase-grid.tsx
    showcase-card.tsx
    showcase-featured-strip.tsx
    showcase-cursor.tsx
    showcase-section-heading.tsx

lib/
  showcase/
    projects.ts
    motion.ts
    filters.ts
    grid.ts

styles/
  showcase.css
7. Figma blueprint prompt

Paste this into Figma AI.

Design a world-class Awwwards-level project showcase page for a luxury architecture studio called Wanderlust Architects.

The page should use a cinematic editorial grid layout with premium minimal design. The overall mood should feel architectural, spatial, refined, interactive, and high-end.

Create these sections:

1. Full-screen hero section
- large architectural image
- elegant serif heading
- small editorial intro text
- CTA buttons
- subtle parallax and premium minimal composition

2. Floating filter bar
- pill shaped category filters
- translucent white background
- luxury micro-interaction states
- categories: All, Residential, Hospitality, Commercial, Interior, Master Planning

3. Dynamic showcase grid
- 12-column desktop grid
- asymmetrical masonry composition
- project cards in mixed sizes
- large cards, medium cards, small cards, tall cards, wide cinematic cards
- lots of breathing space and premium spacing

4. Project card design
Each card must include:
- full bleed image
- gradient overlay
- project title
- location
- category
- elegant metadata positioning
- hover version with elevated overlay and motion-ready structure

5. Featured project strip
- full-width cinematic project banner
- large title
- short project description
- call to action
- luxury architecture presentation

6. Mobile and tablet responsive layouts
- tablet 6-column system
- mobile full-width editorial card feed

7. Component variants
Create component states for:
- project card default
- project card hover
- project card active
- filter chip default
- filter chip selected
- custom cursor default
- custom cursor view project

Style direction:
- Awwwards-winning architecture website
- Apple-level polish
- minimal luxury
- editorial typography
- warm neutral palette
- premium white and stone colors
- soft shadows and restrained lines

Typography:
- serif display titles
- modern sans-serif interface text

Color palette:
- warm off-white background
- black and charcoal text
- muted beige/gold accent
- light gray dividers

Make the result feel suitable for a modern architecture studio portfolio that wants to look premium, immersive, and award-winning.
8. Codex prompt to build it automatically in your repo

Use this in your Codex workflow.

You are a senior Next.js App Router engineer, Framer Motion interaction designer, and premium portfolio UI developer.

PROJECT
- Brand: Wanderlust Architects
- Repo: marketsaint/wanderlust-architects
- Stack: Next.js App Router + Tailwind CSS + Framer Motion + Lenis
- Design goal: build an Awwwards-level architecture project showcase page
- The experience must feel premium, cinematic, interactive, minimal, and luxury-driven

OBJECTIVE
Create a new production-ready project showcase experience using an animated editorial grid layout with filtering, hover effects, cinematic featured sections, and strong motion design.

PAGE TO BUILD
- Main showcase page for all projects
- Reusable project showcase components
- Motion architecture for grid, hover, filter transitions, and page reveals

DESIGN DIRECTION
The page should look like a luxury architecture portfolio, inspired by Apple-level polish and Awwwards-winning studio websites.

Use:
- lots of white space
- elegant typography hierarchy
- premium card spacing
- asymmetrical editorial masonry grid
- subtle parallax and motion
- custom cursor interactions
- cinematic featured section
- responsive layout

REQUIRED SECTIONS
1. Full-screen hero
2. Floating filter bar
3. Animated project grid
4. Featured project strip
5. Continuation grid or load more area

GRID SYSTEM
Desktop:
- max-width 1360px
- 12-column grid
- 24px gap
- 40px side padding

Card sizes:
- large: span 6 cols, 720px height
- medium: span 4 cols, 560px height
- small: span 3 cols, 420px height
- tall: span 4 cols, 760px height
- wide: span 8 cols, 640px height

Tablet:
- 6-column grid
- 20px gap
- 28px side padding

Mobile:
- 2-column logic but prefer full-width editorial cards
- 14px gap
- 16px side padding

COMPONENTS TO CREATE
- components/showcase/showcase-hero.tsx
- components/showcase/showcase-filter-bar.tsx
- components/showcase/showcase-grid.tsx
- components/showcase/showcase-card.tsx
- components/showcase/showcase-featured-strip.tsx
- components/showcase/showcase-cursor.tsx

DATA + UTILITIES
- lib/showcase/projects.ts
- lib/showcase/motion.ts
- lib/showcase/filters.ts
- lib/showcase/grid.ts

ROUTING
Create or improve:
- app/(site)/projects/page.tsx
- app/(site)/projects/[slug]/page.tsx

ANIMATION REQUIREMENTS
Use Framer Motion for:
1. Hero intro reveal
2. Grid stagger reveal
3. Card hover motion
4. Filtered grid rearrangement with layout animation
5. Featured banner reveal
6. Shared layout transition from card to project page if feasible

MOTION DETAILS
- premium spring transitions
- no exaggerated bounce
- elegant easing
- image scale on hover
- overlay fade
- slight upward lift on hover
- optional magnetic hover movement based on cursor position
- optional image parallax inside cards

CUSTOM CURSOR
Create a refined custom cursor:
- default small circle
- over card larger circle with “View Project”
- smooth transform and opacity transitions
- must degrade gracefully on touch devices

FILTERING
Support categories like:
- All
- Residential
- Hospitality
- Commercial
- Interior
- Master Planning

Filtering should:
- animate layout changes
- preserve polish
- not cause jumpy reflows
- use motion layout transitions

STYLING
- Tailwind-first
- use warm off-white background and premium neutral palette
- elegant serif headings and sans-serif UI text
- card radius around 24px
- section radius around 32px
- minimal but premium shadows

ACCESSIBILITY
- keyboard accessible
- proper focus states
- buttons and filters accessible
- custom cursor disabled or simplified on touch/mobile
- preserve readability over images

PERFORMANCE
- optimize for production
- keep motion smooth
- avoid unnecessary rerenders
- use next/image properly
- lazy load non-critical sections if appropriate

DELIVERABLE
Implement a polished, production-ready, responsive showcase page that feels Awwwards-level and fits seamlessly into the existing Wanderlust Architects codebase without breaking current architecture.
9. Framer Motion system you should keep globally

Use a central motion file with:

fadeUp

staggerContainer

imageZoom

cardLift

layoutSpring

heroReveal

maskReveal

That keeps the whole experience consistent.

10. Best interaction priorities for your project

If you want the most impact without making the UI feel overloaded, prioritize in this order:

1. Editorial asymmetrical grid
2. Smooth staggered reveals
3. Premium hover zoom + overlay
4. Animated filter rearrangement
5. Featured cinematic strip
6. Shared card-to-detail transition
7. Custom cursor
8. Magnetic/parallax hover

That order gives you the highest visual quality first.

11. My recommendation for Wanderlust specifically

Because Wanderlust Architects is a visual luxury brand, do not make the page overly futuristic or too dark.

The best version for your brand is:

warm light luxury

editorial architecture mood

subtle interaction-rich grid

strong project imagery

high-end typography

motion that feels expensive, not flashy

That will suit your studio better than a tech-style portfolio.

If you want, the next step should be:
I can turn this into a single ultra-detailed Codex implementation prompt with component-by-component build instructions and motion logic.