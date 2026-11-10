# Nuuvixx visual proof repair

## Decision

The tall browser screenshots were readable only at full size. In Home, Studio, and Work they were clipped into short frames and reduced until their interface text became noise. Those placements now use one consistent family of original editorial concept artwork. The real tools remain available through the existing service links and interactive demos. The images contain no fabricated product interface, client result, or verified outcome; accessible image descriptions state that they are illustrations. Visible captions were removed because they interrupted the sales story.

## Plan and implementation by surface

| Surface | Problem | Design decision | Implemented |
| --- | --- | --- | --- |
| Home featured Commerce tool | This section already contained real, legible sample findings. | Keep the actual validator-derived sample output as proof and keep its upload/report CTA. | Yes; no decorative image inserted into the diagnostic panel. |
| Home selected work | A full tool-page screenshot was scaled down and cut off, competing with the headline. | Use a Commerce concept image at its natural 3:2 ratio; keep direct links to the tool and Work. | Yes. |
| Studio service rows | Five tall screenshots repeated the same dark thumbnail pattern and made service differences hard to see. | Give each service its own physical visual metaphor. Keep the audience, current tool, and inquiry actions in adjacent copy; place detailed limits on service pages. | Yes. |
| Work portfolio rows | Cropped screenshots looked like unfinished thumbnails and could not be inspected in the frame. | Show the same distinct service artwork at an uncropped ratio; keep each row's specific scope and direct working-tool link. | Yes. |
| Service product pages | Their interactive demos are the actual proof. | Keep those demos as functional UI; do not replace them with generated screenshots. | Verified by source review. |
| Labs and legacy routes | Labs uses links to real public projects; `/products` and `/projects` lead to Work. | Keep evidence and current links. No artificial Lab interface imagery. | Verified by source review. |
| Unused older spotlight mockup | An unused component contains invented scorecard values. | Leave it outside active routes; do not reuse it as proof. Remove in a separate cleanup only after reviewing other references. | Not rendered by active pages. |

## Artwork system

All five assets are AI-generated concept illustrations, not screenshots. They use the Nuuvixx cream, charcoal, and orange palette, natural material textures, restrained lighting, and no fabricated UI, words, metrics, endorsements, or people. The source images are retained in the Codex generated-images folder. Web copies under `public/images/services/` are 1200 × 800 WebP images, approximately 40–85 KB each.

| Service | Visual idea | Asset |
| --- | --- | --- |
| Commerce Rescue | Product catalog cards and an amber inspection prism | `public/images/services/commerce.webp` |
| Nuuvixx Secure | Transparent layers revealing a dark system core | `public/images/services/secure.webp` |
| Nuuvixx Creative | Four storyboard cards and an acetate planning marker | `public/images/services/creative.webp` |
| Trade Intelligence | Two document stacks aligned by a comparison ruler | `public/images/services/trade.webp` |
| Bid Intelligence | Indexed tender folio with a selected page marker | `public/images/services/bids.webp` |

The original full-page tool screenshots were removed from `public/images/projects/` because they were unused and looked like cropped placeholders at card size. The generated visuals support the service story; the working demos and source-linked findings provide the actual evidence.

## Verification

- `npm run lint`, `npx tsc --noEmit`, and `npm run build` passed on Next.js 16.2.10.
- Chromium checked Home, Studio, and Work at 1440 and 390 px in the previous pass: all six page views returned 200 and had no horizontal overflow, broken images, or page errors. The final copy and caption removal require a fresh visual pass.
- The 23 browser service journeys passed. Axe reported no automated findings on Home, Studio, and Work at either width.
- Final full-page screenshots for the site were refreshed in `docs/release/screenshots/phase-c/`. Focused before/after review captures are in ignored local `scratch/screenshots/image-repair/`.
