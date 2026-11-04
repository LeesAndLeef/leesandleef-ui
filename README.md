# Lees & Leaf

Storefront for a natural wine & olive oil shop, built from the Lees & Leaf design canvas.

It talks to the [Lees & Leaf API](../leesandleef-api), which serves the catalog, prices the cart, and handles accounts and orders. Start the API first (see its README), then:

```sh
yarn
cp .env.example .env   # optional: VITE_API_URL (default /api/v1) and API_PROXY_TARGET (default http://localhost:3000)
yarn dev               # Vite proxies /api to the API, so the cart and session cookies work
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
| `/cart`          | Cart                                  |
| `/checkout`      | Four-step checkout and confirmation   |

## Structure

- `src/styles/` — `global.css` (design tokens, type, patterns, shared classes) and `colors.ts`. The `:root` of `global.css` defines every colour once (base palette, alpha variants such as `--ink-a20`, illustration colours, product glass colours); `COLORS` in `colors.ts` lists the same tokens in the same order as `var(--…)` strings for TS and TSX; `src/data/` writes the same `var(--…)` strings directly, so it imports no app code. No hard-coded colours elsewhere: CSS uses `var(--…)`, TS uses `COLORS.x`
- `src/services/` — the API layer. `HttpClient.ts` is the only axios instance (base URL, cookies via `withCredentials`, every failure turned into an `ApiError`); `BaseService.ts` turns API responses into models; one singleton service per feature in `<feature>/` (site, wine, oil, clubPlan, grower, article, search, quiz, cart, auth, account, order, newsletter); endpoint paths in `constants.ts`
- `src/data/` — static content from before the API, kept until every page reads from the API. Raw content in the shape the API serves it: wines, olive oils, growers, articles, club plans, quiz questions and profiles, and shop details (one contact email, `site.email`). No paths, derived lists or helpers, and only type and picture imports. Nothing outside `src/lib/` imports it. All of it is fictional concept content
- `src/constants.ts` — fixed app lists shared across folders: wine types, oil sizes and the default size, club frequency labels, shipping thresholds. Lists used by one folder sit in its own `constants.ts` (catalog region groups and grapes in `pages/Wines/`, oil levels in `pages/OliveOils/`, grower regions in `pages/Growers/`)
- `src/components/` — components only, grouped by concern: `layout/` (header, footers, logo), `ui/` (breadcrumb, quantity stepper, summary row, italicized text), `product/` (wine and oil cards, cart line thumbnails, and the pieces both product pages share: hero, gallery, heading, option picker, buy row, perks, related products), `wine/` (wine page detail tabs, drink window, grower quote and gallery, plus the wine catalog's price filter, sort and view tools, quiz promo and empty state), `oil/` (oil page gallery and the olive oil page sections: hero, pairings, harvest day, cultivars, tasting set, article link, storage), `illustrations/` (bottle, tin, scenes, with the scene parts in `illustrations/scene/`), `cart/` (cart sections, the page shell Cart and Checkout share, toast, checkout progress), and one folder per page's sections: `home/`, `article/` (with `article/bodies/`), `checkout/`, `club/`, `grower/`; each with its stylesheet next to it. Component and page folders hold only components, CSS modules, `types.ts` and `constants.ts`; a component file contains only its component
- `src/hooks/` — standalone hooks at the root (`useCountdown`, `useKeyedState`, `useReadProgress`), the generic `useGetData` (queries) and `useMutateData` (mutations), and one folder per API feature with its React Query hooks (`wine/useWines`, `cart/useCart`, `cart/useAddCartLine`, `auth/useLogin`, `account/useAccount`, `order/usePlaceOrder`, …). Cart writes put the returned priced cart straight into the cache
- `src/lib/` — every plain function: `queryClient.ts` (React Query defaults; a 401 logs the account out of the cache), `links.ts` (adds `path` to API wines, oils, club plans and cart items), `apiPath.ts` (encodes ids into endpoint paths), and the old access layer, the only code that reads `src/data/`: `paths.ts` (`winePath()`, `oilPath()`, importing only routes), `wine.ts` and `oil.ts` (`wines` and `oils` with their `path`, `listedOils`, `getWine()`, `getOil()`, oil size pricing, product page titles, tags, gallery shots, prices), `products.ts` (`products` and `getProductById()` across both kinds), `clubPlans.ts` (club plans with their `path`), `growers.ts` (`growers`, `getGrower()`, `stockLabel()`), `articles.ts` (`articles`, `getArticle()`), `site.ts` (site details), `quiz.ts` (quiz content and `recommend()`), `productPlace.ts` (region and place labels), `search.ts` (accent-insensitive search for wines, oils and growers), `orderNumber.ts` (order numbers for placed orders), `currency.ts` (`formatCurrency()` with `Intl.NumberFormat` in `DEFAULT_CURRENCY`; `{ cents: true }` for cart and checkout amounts), `cart.ts` (cart line keys, oil size options, `findItem()`), `pricing.ts` (`priceLine()`, `priceLines()`, `computeTotals()`), `cartStorage.ts` (`loadCart()`, `saveCart()` in `localStorage`), `countdown.ts` (time left and two-digit cells), `nav.ts` (`isNavActive()`), `italics.ts` (splits `<em>` markup in copy), `toggle.ts` (adds or removes a list value), `tabs.ts` (`tabIndexAfterKey()` for arrow-key tab focus), `tone.ts` (`contrastingTone()`), `submitHandler.ts` (form submit handlers that prevent the page reload), and `scene/` (seeded random, ridges, pour pools, label fitting and caption-to-scene rules for the illustrations)
- `src/pages/` — one folder per route page. Each page holds its own code (route lookup, redirects, page state and layout) and composes sections from `src/components/<concern>/`; its own stylesheet, if any, sits next to it. There are no `*View` wrappers
- `src/state/` — client-only UI state (Zustand stores, once added). Until the cart moves to the API, `cart/` still holds the localStorage cart provider, with local pricing in `src/lib/pricing.ts`. The API prices carts with the same rules: −10% on 6+ wines, promo `HARVEST10`, free EU delivery from €120, Club plans ship free

Checkout isn't connected yet: `placeOrder` in `src/pages/Checkout/CheckoutPage.tsx` fakes the order. The API side is ready (`usePlaceOrder()`; checkout needs an account, and card payments return a Stripe `clientSecret`).

Pictures are illustrations drawn in code (`src/components/illustrations/Scene.tsx`, one file per part in `src/components/illustrations/scene/`), seeded by each caption so they stay the same between visits. To use real photography, swap a `<Scene>` for an `<img>` in the same container.
