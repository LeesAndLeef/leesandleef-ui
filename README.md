# Lees & Leaf

Storefront for a natural wine & olive oil shop, built from the Lees & Leaf design canvas.

```sh
yarn
yarn dev
```

## Routes

| Path             | Page                                  |
| ---------------- | ------------------------------------- |
| `/`              | Home                                  |
| `/wine`          | Wines (`?type=Red`, `?q=search`)      |
| `/wine/:id`      | Wine                                  |
| `/olive-oil`     | Olive oils                            |
| `/olive-oil/:id` | Olive oil                             |
| `/growers/:id`   | Grower profile                        |
| `/club`          | Club / subscription                   |
| `/quiz`          | Taste quiz → mixed-six recommendation |
| `/cart`          | Cart (saved in localStorage)          |
| `/checkout`      | Four-step checkout and confirmation   |

## Structure

- `src/styles/` — `global.css` (design tokens, type, patterns, shared classes) and `colors.ts`. The `:root` of `global.css` defines every colour once (base palette, alpha variants such as `--ink-a20`, illustration colours, product glass colours); `COLORS` in `colors.ts` lists the same tokens in the same order as `var(--…)` strings for TS and TSX; `src/data/` writes the same `var(--…)` strings directly, so it imports no app code. No hard-coded colours elsewhere: CSS uses `var(--…)`, TS uses `COLORS.x`
- `src/data/` — raw content in the shape a backend would serve it, swappable for an API response: wines, olive oils, growers, articles, club plans, quiz questions and profiles, and shop details (one contact email, `site.email`). No paths, derived lists or helpers, and only type and picture imports. Nothing outside `src/lib/` imports it. All of it is fictional concept content
- `src/constants.ts` — fixed app lists shared across folders: wine types, oil sizes and the default size, club frequency labels, shipping thresholds. Lists used by one folder sit in its own `constants.ts` (catalog region groups and grapes in `pages/Wines/`, oil levels in `pages/OliveOils/`, grower regions in `pages/Growers/`)
- `src/components/` — grouped by concern: `layout/` (header, footers, logo), `ui/` (breadcrumb, quantity stepper, summary row), `product/` (wine and oil cards, cart line thumbnails, and the pieces both product pages share: hero, gallery, heading, option picker, buy row, perks, related products), `wine/` (wine page detail tabs, drink window, grower quote and gallery, plus the wine catalog's price filter, sort and view tools, quiz promo and empty state), `oil/` (oil page gallery and the olive oil page sections: hero, pairings, harvest day, cultivars, tasting set, article link, storage), `illustrations/` (bottle, tin, scenes, with the scene parts in `illustrations/scene/`), `cart/` (cart sections, the page shell Cart and Checkout share, toast, checkout progress), and one folder per page's sections: `home/`, `article/` (with `article/bodies/`), `checkout/`, `club/`, `grower/`; each with its stylesheet next to it
- `src/hooks/` — standalone hooks
- `src/lib/` — plain logic and the data access layer, the only code that reads `src/data/`: `paths.ts` (`winePath()`, `oilPath()`, importing only routes), `wine.ts` and `oil.ts` (`wines` and `oils` with their `path`, `listedOils`, `getWine()`, `getOil()`, oil size pricing, product page titles, tags, gallery shots, prices), `products.ts` (`products` and `getProductById()` across both kinds), `clubPlans.ts` (club plans with their `path`), `growers.ts` (`growers`, `getGrower()`), `articles.ts` (`articles`, `getArticle()`), `site.ts` and `quiz.ts` (site details and quiz content), `productPlace.ts` (region and place labels), `search.ts` (accent-insensitive search for wines, oils and growers), `orderNumber.ts` (order numbers for placed orders), `euro.ts` (whole-euro price labels), `submitHandler.ts` (form submit handlers that prevent the page reload)
- `src/pages/` — one folder per route page. Each page holds its own code (route lookup, redirects, page state and layout) and composes sections from `src/components/<concern>/`; its own stylesheet, if any, sits next to it. There are no `*View` wrappers
- `src/state/cart/` — cart state (`useCart`), pricing rules: −10% on 6+ wines, promo `HARVEST10`, free EU delivery from €120, Club plans ship free

Payment is a placeholder: no orders are sent anywhere yet. Hook the payment provider and order API into `placeOrder` in `src/pages/Checkout/Checkout.tsx`.

Pictures are illustrations drawn in code (`src/components/illustrations/Scene.tsx`, one file per part in `src/components/illustrations/scene/`), seeded by each caption so they stay the same between visits. To use real photography, swap a `<Scene>` for an `<img>` in the same container.
