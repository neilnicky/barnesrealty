# BARNES REALTY — Ultra-Premium Real Estate Website
## Reference Reverse Engineering, Brand Intelligence, Bespoke Art Direction & Production Implementation

You are a senior digital art director, luxury real estate brand strategist, creative developer, motion designer, UX architect, and frontend engineer.

Your assignment is to thoroughly reverse-engineer the reference website, research the actual Barnes Realty client, and build an exceptional, production-ready real estate website that combines the reference's strongest visual and interaction principles with an original, carefully curated brand experience.

This is a high-value client project. The outcome must communicate the quality, credibility, discretion, sophistication, and attention to detail expected from a premium real estate business operating in an international context.

The finished website must not feel like a template, a generic luxury real estate website, or a copy of the reference with a new logo.

**The objective is to reconstruct the reference's design intelligence and experience quality while creating a distinctive digital identity for the verified Barnes Realty business.**

Treat the reference as a source of visual and interaction inspiration. Treat Barnes Realty's actual identity, properties, markets, audience, positioning, and commercial objectives as the source of truth for the final website.

Work autonomously, investigate thoroughly, document your findings, and make high-quality creative and technical decisions. Do not start coding the hero section before understanding the project.

---

# 1. PROJECT SOURCES AND SCOPE

## Primary reference website

https://www.findrealestate.com/

Reference screen recording:

`/Users/neil/Media/Screenshots/Screen Recording 2026-10-15 at 11.50.14 AM.mov`

The live website and screen recording are the primary references for reverse engineering the visual experience, layout structure, transitions, animations, navigation, responsive behavior, and user journey.

Inspect both wherever access permits.

The screen recording is located on the user's local machine. If the coding environment cannot access that path, explicitly identify the limitation and use an accessible copy, extracted frames, or the live website as available. Never claim to have inspected inaccessible material.

## Barnes Realty brand source

https://www.instagram.com/barnesrealty?dlrf=MXZqNnl4aTJiejhqeg==

Start with this exact account. Investigate the profile, bio, posts, Reels, highlights, captions, branding, properties, locations, and linked sources where accessible.

Find the official website and other verified brand channels associated with this exact business.

Do not substitute a similarly named business just because it has more accessible information or a more established website.

## Mandatory brand identity verification

Before making design decisions, establish exactly which business the Instagram account represents.

The name Barnes Realty can refer to multiple real estate businesses. The brand must not be confused with another brokerage or with BARNES International Realty unless a direct, verifiable relationship is established.

Determine:

- The official business name and identity.
- Its official website and social accounts.
- Its operating countries, regions, and property markets.
- Its primary services and property specializations.
- Its intended clients and audience.
- Its actual visual identity, including logos and brand assets.
- Whether it is an independent brokerage, an agency, a property-focused brand, or part of a larger network.
- Whether the international positioning is reflected in verified business operations, target markets, or brand strategy.

Create `docs/brand-identity-verification.md` containing the sources examined, findings, evidence of identity, unresolved ambiguities, and the final verified scope.

If the precise identity cannot be conclusively established, document the uncertainty and use only the material that can confidently be attributed to the supplied account. Do not silently substitute another company's identity.

---

# 2. MANDATORY PHASE 1 — REVERSE-ENGINEER FIND REAL ESTATE

The first task is to understand the complete reference experience.

Do not merely inspect the homepage screenshot and reproduce its broad appearance. Explore the live website, accessible internal routes, navigation, interactive elements, and full page structure.

Use available browser automation, developer tools, screenshots, computed styles, and video inspection tools. Distinguish verified observations from implementation hypotheses.

## A. Site architecture and information hierarchy

Inspect the homepage and all relevant accessible pages.

Investigate:

- Header and navigation structure.
- Hero composition and above-the-fold experience.
- Primary and secondary calls to action.
- Property discovery and property-search interfaces.
- Featured property presentations.
- Editorial sections and image-led storytelling.
- Agent or team discovery.
- Brand positioning and credibility sections.
- Services and supporting information.
- Testimonials and other social proof.
- Contact forms and lead-generation flows.
- Footer and secondary navigation.
- Menus, overlays, sticky elements, and floating controls.
- Transitions between sections and routes.
- Desktop, tablet, and mobile behavior.

Document the actual order, structure, and purpose of the reference sections.

Do not assume every section is mandatory for Barnes Realty. The reference is the starting point for understanding what works, not a rigid template that must be copied without judgment.

## B. Visual design system

Inspect the reference's:

- Typography, font families, weights, sizes, line heights, and letter spacing.
- Colour palette, backgrounds, contrast, and accents.
- Spacing, page margins, content widths, and vertical rhythm.
- Grid systems and section proportions.
- Image aspect ratios, crops, focal positions, and overlays.
- Relationship between property imagery and text.
- Borders, dividers, corners, and graphic treatments.
- Button design, hover states, and interactive affordances.
- Navigation placement and visual hierarchy.
- Responsive layout rules.
- Use of whitespace and editorial pacing.

Pay attention to the details that create a cohesive, high-quality experience rather than merely identifying the site's dominant colours.

## C. Interaction and animation audit

Investigate the actual behavior of:

- Navigation and menu overlays.
- Scroll-triggered transitions and reveals.
- Image scaling, clipping, and masking.
- Animated text and staggered entrances.
- Parallax and sticky or pinned content.
- Pointer and hover interactions.
- Page transitions.
- Property cards and image galleries.
- Search controls and filters.
- Forms and validation states.
- Loading behavior and introductory animations.
- Mobile navigation and touch interactions.
- Keyboard navigation and reduced-motion behavior.

For each significant interaction, document its trigger, visible changes, approximate timing, easing, interruption behavior, and responsive differences.

Do not invent elaborate interactions that the reference does not demonstrate. Adapt interactions only when they strengthen Barnes Realty's own experience.

## D. Reference analysis deliverable

Create:

`docs/reference-analysis.md`

Include:

- Page and route inventory.
- Section-by-section hierarchy.
- Design tokens and layout measurements where observable.
- Animation and interaction specifications.
- Responsive behavior.
- Reference screenshots or frame timestamps, if available.
- Functional behaviors that should be preserved.
- Implementation hypotheses and unresolved questions.
- A prioritized implementation checklist.

Phase 1 is complete only when the reference has been studied as a complete digital experience.

---

# 3. MANDATORY PHASE 2 — RESEARCH BARNES REALTY

The quality of this project depends on the accuracy and depth of the brand research.

Do not infer the company's identity from its name, assume a luxury market from the user's description, or fabricate an international footprint.

Research the verified client first. Then determine how its actual identity should be expressed digitally.

## A. Instagram research

Examine the supplied account and identify:

- Official display name, biography, and positioning.
- Existing logo, wordmark, typography, and colours.
- Actual properties and property categories.
- Architectural styles and interior design characteristics.
- Locations, neighbourhoods, and markets represented.
- Photography and videography styles.
- Recurring visual motifs and editorial patterns.
- Brand tone and language.
- Client types and audience, where supported.
- Publicly stated services and specializations.
- Agent profiles and professional information.
- Property marketing and presentation standards.
- Contact details, enquiry methods, and linked websites.
- Campaigns, announcements, and collaborations.
- Strong original visual assets suitable for the website.

Study multiple posts rather than drawing conclusions from one image.

Distinguish established brand characteristics from isolated campaign decisions.

## B. Business and market research

Use the official website and other verifiable sources to determine:

- The company's business model.
- Primary geographic markets.
- Core property categories.
- Whether it focuses on residential, commercial, luxury, investment, rental, new development, or other real estate segments.
- Whether it serves buyers, sellers, landlords, tenants, investors, developers, or other client groups.
- The actual services it offers.
- Its differentiators and positioning.
- Its professional team and credentials.
- The expected customer journey.
- The appropriate lead-generation or transaction workflow.
- The relevance of international buyers, cross-border transactions, or multilingual support.

Only implement capabilities and claims supported by the verified business context.

If information is missing, record the gap rather than inventing an answer.

## C. Competitive and visual research

Research a small, carefully selected group of genuinely relevant real estate brands.

Use this research to understand:

- Visual conventions in the client's actual market.
- How premium competitors present properties.
- Common patterns in property discovery and enquiry.
- Opportunities for differentiation.
- How to communicate credibility without relying on empty luxury language.
- Which conventions should be respected and which can be improved.

Do not turn this into a broad competitor directory or allow competitor websites to distract from the primary reference.

The purpose is to make informed creative decisions for Barnes Realty.

## D. Research deliverables

Create:

`docs/barnes-research.md`

Document the official sources, verified facts, brand attributes, services, property categories, geographic markets, visual assets, audience insights, competitive findings, and unresolved information.

Include an explicit distinction between:

1. Verified business facts.
2. Observations from public brand material.
3. Reasonable creative interpretations.
4. Unverified information that must not appear on the website.

---

# 4. PHASE 3 — DEFINE A DISTINCTIVE PREMIUM ART DIRECTION

Before implementation, translate the research into a coherent creative direction.

The goal is to reproduce the reference's visual quality and experience logic while creating a website that could only belong to Barnes Realty.

## A. Preserve the reference's underlying design intelligence

Where relevant, retain the reference's:

- Overall composition and section rhythm.
- Typography hierarchy and text placement.
- Image-to-text relationships.
- Layout proportions and grid behavior.
- Navigation patterns.
- Scroll choreography.
- Motion and transition principles.
- Image presentation techniques.
- Interactive states.
- Responsive composition.
- Balance between brand storytelling and conversion.

Preserve distinctive behaviors when they are important to the experience.

However, adapt or omit elements that do not support the verified Barnes Realty business model.

Do not reproduce every section simply because it exists in the reference.

## B. Develop Barnes Realty's own visual identity

Research the client's actual identity before deciding on its design language.

Define:

- Primary and secondary colours.
- Background and surface treatments.
- Typography and hierarchy.
- Heading and body-copy styles.
- Image presentation and photography direction.
- Layout grids and spacing.
- Borders, dividers, and restrained decorative elements.
- Navigation and button styles.
- Motion principles.
- Responsive behavior.

Do not automatically reuse the reference's palette.

Do not automatically impose black-and-gold styling, marble textures, serif typography, or any other stereotypical luxury treatment.

An ultra-premium result comes from restraint, precision, visual consistency, authentic imagery, considered hierarchy, and exceptional execution—not from adding more luxury signifiers.

The design must be appropriate for Barnes Realty's actual positioning and existing identity.

If the brand already has established colours or typography, respect and refine them rather than replacing them without reason.

## C. Property-led visual storytelling

Real estate imagery should be one of the strongest assets of the website.

Curate the experience around authentic, high-quality property imagery and relevant architectural storytelling.

Where the actual brand material permits, prioritize:

- Strong architectural compositions.
- Beautifully art-directed interior and exterior photography.
- Distinctive properties that communicate the client's market.
- Carefully chosen wide and vertical images.
- Intentional image crops and focal positions.
- Controlled negative space.
- Editorial typography.
- Large-scale imagery used with restraint.
- Smooth, purposeful transitions.
- A clear hierarchy between the property, its details, and supporting information.

Do not use generic luxury mansions, random stock photographs, or unrelated international properties simply to make the site look expensive.

Every featured property must be real and correctly represented if presented as a Barnes Realty listing.

If authentic property assets are limited, document the limitation and use only suitable, clearly identified fallback material during development.

## D. Establish the visual and experiential direction

Create:

`docs/design-direction.md`

Document:

- The creative concept.
- The visual identity and colour system.
- Typography and hierarchy.
- Image selection and art direction.
- Layout and information hierarchy.
- Motion principles.
- How the reference's design logic is being adapted.
- Which reference elements are being preserved, transformed, or omitted.
- Why the direction is appropriate for Barnes Realty.

The result should feel intentional, distinctive, and commercially credible.

---

# 5. PHASE 4 — DESIGN THE CORRECT REAL ESTATE EXPERIENCE

Do not assume that a property-search marketplace, a luxury brokerage, and a property advisory business require identical websites.

Use the verified Barnes Realty business model to determine the right information architecture.

Potential sections include:

- Brand-led hero.
- Featured or exceptional properties.
- Property discovery.
- Property categories.
- Geographic markets or neighbourhoods.
- About the company.
- Team or agent profiles.
- Services and expertise.
- Property marketing or selling services.
- Investment or advisory information, if genuinely offered.
- Editorial insights or market resources.
- Testimonials, where verified.
- Contact and property enquiry.
- Footer and secondary navigation.

These are potential components, not mandatory sections.

Select the structure that best represents the business and guides its intended customers toward meaningful actions.

## Property search and discovery

If the business has actual listings or an appropriate property data source, investigate the available data and integration options.

Determine whether the experience requires:

- Location or neighbourhood filters.
- Property type.
- Sale or rental status.
- Price range.
- Bedroom and bathroom counts.
- Property detail pages.
- Image galleries.
- Listing status.
- Agent information.
- Enquiry forms.

Only include fields that make sense for the verified business.

Do not build a decorative search interface that looks functional but cannot produce meaningful results.

If a live listing feed or backend is unavailable, use authentic, verified property data for a limited showcase and clearly separate the prototype experience from production listing functionality.

Never invent active listings, property prices, addresses, availability, or property specifications.

---

# 6. PHASE 5 — CENTRALIZE CONTENT AND DATA

Create:

`src/content/barnes-content.ts`

Use a strongly typed, maintainable content model that supports the verified brand and the actual website architecture.

Centralize:

- Brand identity and positioning.
- Logo and brand assets.
- Hero content and CTA.
- About content.
- Navigation labels.
- Property categories.
- Featured property information.
- Verified property details.
- Image sources, alt text, and focal positions.
- Agent and team information.
- Services and market specializations.
- Contact details and social links.
- Enquiry CTA labels and destinations.
- SEO metadata and social-sharing metadata.
- Footer content.
- Any other verified editorial information.

If property data comes from an API, CMS, or existing database, separate that data source from static editorial content. Do not duplicate live listing data unnecessarily.

### Architecture rules

- Avoid hardcoded editorial content inside components.
- Keep repeated content in typed data structures.
- Keep layout independent of specific property records.
- Centralize configurable URLs and contact information.
- Separate content, presentation, business logic, and motion.
- Avoid unnecessary abstractions.
- Do not introduce a CMS or backend migration without a clear requirement.
- Never populate the finished website with fictional agents, fabricated testimonials, invented property details, or placeholder business claims.

A property image, description, or listing should be replaceable without rewriting its presentation component.

---

# 7. PHASE 6 — IMPLEMENT THE WEBSITE

Inspect the existing repository before changing anything.

Understand the current framework, routing, dependencies, styling, asset organization, build process, and deployment conventions.

Preserve the existing infrastructure unless there is a concrete reason to change it.

## Technical standards

- Use the repository's established framework and conventions.
- If the project uses Next.js, use the App Router and appropriate Server/Client Component boundaries.
- Use TypeScript with meaningful types.
- Build reusable components with clear responsibilities.
- Use semantic HTML.
- Maintain accessible interactions and keyboard support.
- Optimize images, fonts, and rendering performance.
- Avoid unnecessary client-side JavaScript.
- Avoid redundant dependencies.
- Ensure direct routes and page refreshes work.
- Keep the code maintainable.
- Run the available linting, type checks, tests, and production build.

## Component architecture

Build components according to the actual reference and verified requirements.

Potential components include:

- Header and navigation.
- Menu overlay.
- Hero and image composition.
- Animated typography.
- Featured property presentation.
- Property card and grid.
- Property detail gallery.
- Search and filtering controls.
- Agent profiles.
- Editorial sections.
- Service presentation.
- Enquiry form.
- Footer.
- Reusable image-reveal and motion components.

These are suggestions, not a requirement to create every component.

Do not build one enormous page component, but do not overengineer simple sections.

## Design implementation

Prioritize the correct composition, typography, imagery, spacing, and responsive behavior before fine decorative details.

The initial viewport must be excellent, but the entire website must be completed.

Maintain a coherent experience from the first frame to the final CTA.

---

# 8. PHASE 7 — MOTION AND INTERACTION FIDELITY

Motion is part of the design system.

Inspect the actual reference behavior before implementing animations.

Evaluate the existing project dependencies and choose the simplest reliable approach that can reproduce the observed behavior.

### Motion requirements

- Recreate significant scroll-triggered reveals.
- Reproduce important image scaling and transitions.
- Match typography animation patterns where appropriate.
- Implement observed sticky or pinned behavior.
- Use consistent easing and timing.
- Keep pointer-driven interactions performant.
- Avoid unnecessary layout recalculation.
- Clean up event listeners and observers.
- Prevent horizontal overflow.
- Handle interrupted animations and route changes.
- Respect reduced-motion preferences.
- Ensure the experience remains usable on touch devices.
- Preserve keyboard access and visible focus states.

Do not add parallax, cursor effects, page transitions, or loading sequences merely because they look sophisticated.

Every significant interaction should serve the experience, clarify the hierarchy, or improve the presentation of the properties.

---

# 9. PHASE 8 — ENQUIRY AND CONVERSION

Determine the appropriate conversion workflow from the verified business model.

The website should make it easy for prospective clients to take the next meaningful step without sacrificing the premium presentation.

Potential conversion actions include:

- Enquire about a property.
- Arrange a viewing.
- Contact an agent.
- Request a property valuation.
- Discuss buying or selling.
- Request investment advice, if offered.
- Submit a general enquiry.

Only implement actions relevant to the actual business.

### Requirements

- Every CTA must have a meaningful destination.
- Enquiry forms must have appropriate validation.
- Contact details must be verified.
- Forms must submit to a real configured endpoint or be clearly identified as requiring integration.
- Do not display false success messages.
- Do not imply that a property is available without verified listing data.
- Do not invent booking calendars, availability, or response-time guarantees.
- Keep the conversion flow simple and consistent with the brand.

If a real CRM, listing feed, scheduling system, or backend is unavailable, establish a clean integration boundary rather than pretending that the system exists.

---

# 10. PHASE 9 — ASSETS AND PROPERTY AUTHENTICITY

Investigate all available assets:

1. The supplied Barnes Realty Instagram account.
2. The verified official website and linked brand channels.
3. Authentic property listings and media.
4. Existing project assets.
5. Other trustworthy sources directly associated with the business.

Prioritize original, high-quality property photography.

### Asset rules

- Use authentic brand and property imagery whenever available.
- Preserve the correct identity and context of each property.
- Do not present unrelated properties as client listings.
- Do not fabricate property photography or alter images in ways that misrepresent a real property.
- Avoid unreliable image hotlinking.
- Prefer optimized local assets when their use is permitted.
- Maintain suitable aspect ratios and intentional crops.
- Use appropriate alt text.
- Track important image sources and intended placements.

If a suitable image cannot be obtained, document the gap and select a responsible fallback.

Do not allow stock imagery to overwhelm or replace the verified brand identity.

---

# 11. PHASE 10 — RESPONSIVENESS, ACCESSIBILITY AND PERFORMANCE

The website must be production-quality, not merely a visual demo.

## Performance

- Optimize image delivery.
- Load fonts efficiently.
- Avoid excessive JavaScript.
- Prevent layout shifts.
- Lazy-load below-the-fold imagery where appropriate.
- Prioritize the initial viewport.
- Keep animations smooth.
- Test on realistic mobile hardware and network conditions.

## Accessibility

- Use semantic page structure.
- Support keyboard navigation.
- Provide visible focus indicators.
- Maintain sufficient contrast.
- Use descriptive alt text.
- Ensure forms have accessible labels and error messages.
- Make menus and overlays accessible.
- Respect `prefers-reduced-motion`.
- Do not hide essential information behind animations.
- Ensure touch targets are usable.

## Responsive testing

Test at approximately:

- 1440px desktop.
- 1280px laptop.
- 768px tablet.
- 390px mobile.
- 320px narrow mobile.

Check image crops, typography, navigation, forms, grids, section spacing, overflow, and motion behavior at every relevant viewport.

---

# 12. PHASE 11 — VISUAL VALIDATION AND REFINEMENT

Do not consider the project complete simply because it builds or looks good in one screenshot.

Compare the implementation with the reference and separately validate that the final adaptation suits Barnes Realty.

## Validation workflow

For each major section:

1. Inspect the equivalent reference state.
2. Capture or inspect the implementation at the same viewport.
3. Compare composition, spacing, typography, and imagery.
4. Exercise equivalent interactions.
5. Compare scroll behavior and animation timing.
6. Identify the most significant discrepancies.
7. Correct them.
8. Repeat.

Prioritize:

1. Overall composition and section geometry.
2. Typography and visual hierarchy.
3. Property imagery and crop accuracy.
4. Brand identity and colour.
5. Navigation and interactions.
6. Animation and transition timing.
7. Fine details and micro-interactions.

Use the reference as a quality benchmark, not as a requirement to reproduce unrelated brand-specific content.

## Functional validation

Verify that:

- Navigation works.
- Property cards and links work.
- Property information is accurate.
- Search and filters behave correctly if implemented.
- Contact and enquiry workflows function.
- No dead buttons or placeholder text remain.
- No broken image assets remain.
- There are no avoidable console errors.
- Direct routes and refreshes work.
- Responsive layouts are stable.
- Reduced-motion preferences are respected.
- The production build and available checks pass.

Do not claim exact visual fidelity without actually comparing the implementation against the reference.

---

# 13. WORKING METHOD AND DELIVERABLES

Work autonomously through the entire project.

Do not stop after producing a research report, concept, or initial prototype.

Maintain the following artifacts, adapting paths to the repository where necessary:

- `docs/brand-identity-verification.md` — exact business identification and verified scope.
- `docs/reference-analysis.md` — complete reference reverse-engineering report.
- `docs/barnes-research.md` — verified brand, business, and market research.
- `docs/design-direction.md` — original creative direction and adaptation rationale.
- `src/content/barnes-content.ts` — centralized editable brand content.
- A centralized asset manifest, if useful.
- The fully implemented, responsive website and reusable components.

Keep verified facts, design interpretations, and unresolved assumptions clearly separated.

If a source is inaccessible, try reasonable alternatives and document the limitation.

Do not ask for decisions that can be responsibly resolved through research and professional judgment.

Keep the repository runnable and preserve existing working functionality.

---

# 14. DEFINITION OF DONE

The project is complete only when:

- [ ] The exact Barnes Realty business has been researched and verified.
- [ ] Similarly named companies have not been conflated.
- [ ] The reference website has been inspected beyond the initial viewport.
- [ ] The supplied recording has been inspected or its inaccessibility documented.
- [ ] The reference's important layouts, motion, interactions, and responsive behavior are documented.
- [ ] Barnes Realty's actual services, markets, positioning, and visual identity have been researched.
- [ ] The creative direction is appropriate for the verified business.
- [ ] The website uses authentic brand and property assets wherever available.
- [ ] Property details, testimonials, and business claims are accurate.
- [ ] The reference's important design and interaction principles have been adapted appropriately.
- [ ] The website feels bespoke rather than copied or template-driven.
- [ ] The content architecture is maintainable.
- [ ] All important CTAs and enquiry flows function correctly.
- [ ] Desktop, tablet, and mobile layouts have been tested.
- [ ] Motion is purposeful, accessible, and performant.
- [ ] Major visual discrepancies have been corrected through comparison.
- [ ] Available type checks, linting, tests, and production build pass.
- [ ] Required documentation exists and reflects the implementation.

---

# 15. FINAL EXECUTION INSTRUCTIONS

Start by inspecting the existing repository and confirming access to the reference website, the recording, and the supplied brand source.

Then follow this exact sequence:

**Verify Barnes Realty → Inspect FIND Real Estate → Document the reference → Research the actual client → Establish the art direction → Curate authentic assets → Design the information architecture → Implement → Validate → Refine.**

Do not begin by immediately building the hero.

Do not assume that a similarly named international brand is the correct client.

Do not automatically use black and gold or generic luxury styling.

Do not blindly reproduce every section from FIND Real Estate.

Do not invent property listings, business details, agent profiles, testimonials, or commercial capabilities.

Do not sacrifice the full website for an impressive first viewport.

Do not claim to have researched or validated material that you have not actually accessed.

Make strong decisions independently, but ground them in evidence.

The final result must communicate exceptional design quality, trustworthy real estate expertise, and a distinctive brand identity appropriate to Barnes Realty's verified market and audience.

**Begin with identity verification and reference inspection. Proceed through every phase until the complete website is implemented, tested, and refined.**