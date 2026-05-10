# Design Guidelines

## Design principles
- Content-first reading experience.
- Clear visual hierarchy with restrained accent usage.
- Consistent spacing and typography across templates.
- Accessibility by default (focus states, contrast, touch targets).

## Typography
- Use serif for major headings (`.heading-1`, `.heading-2`).
- Use sans for UI labels, controls, metadata.
- Keep body copy comfortable for long-form reading (`.body-copy`, `.prose-boring`).
- Avoid oversized utility classes (`text-5xl+`) for standard interface text.

## Spacing
- Prefer compact, consistent vertical rhythm.
- Use shared spacing patterns over one-off combinations.
- Avoid large stacked margins for list navigation and headers.

## Components
- Use `.section-title` for list/group labels.
- Use `.list-link` for linked rows/cards.
- Use `.icon-button` for icon-only controls.
- Use `.primary-button` for high-priority CTAs.
- Use `.surface-card` for elevated or grouped content blocks.
- Use `.form-input` for text fields.

## Header
- Keep sticky header lightweight.
- Breadcrumb text should truncate gracefully in constrained widths.
- All controls should have `aria-label` and visible focus states.

## Accessibility
- Ensure all interactive elements are keyboard accessible.
- Maintain visible `:focus-visible` styles globally.
- Respect reduced-motion preferences.
- Keep color contrast suitable in light and dark mode.

## Content layout
- Keep article measure around 65–75 characters.
- Keep section pages optimized for scanability.
- Keep CTA hierarchy clear: one primary action per view.
