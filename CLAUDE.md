# Lees & Leaf

Storefront for a natural wine and olive oil shop.

- React 19, TypeScript, Vite, react-router-dom v7, yarn 4 (`nodeLinker: node-modules`). Plain CSS Modules, no UI library.
- Data: axios and TanStack Query (devtools in development only). Zustand (client state) and React Hook Form with Zod (forms) are planned; add each with the first code that uses it.
- The backend is the Lees & Leaf API in `../leesandleef-api` (its README lists every endpoint). In development, Vite proxies `/api` to it (`API_PROXY_TARGET`, default `http://localhost:3000`); the client calls `VITE_API_URL` (default `/api/v1`). See `.env.example`.
- The file layout and folder structure are being reworked, so don't assume where anything lives. Explore `src/` before each task and treat what you find as the current state.
- Pages are moving from the static `src/data/` content and the local cart to the API. Code that hasn't moved yet still reads `src/data/` through `src/lib/` and uses the localStorage cart in `src/state/cart/` with `src/lib/pricing.ts` and `src/lib/cartStorage.ts`. New code uses the API layer, and migrated code deletes what it no longer needs.
- Cart pricing rules: −10% on 6+ wine bottles, promo `HARVEST10`, free EU shipping from €120 of goods (otherwise €9.90), Club plans ship free and are excluded from discounts. The API prices every cart and keeps it in a signed httpOnly `cart` cookie, so the UI shows the server's totals and never computes its own.
- Accounts: browsing and the cart are public; placing and reading orders and `/account` need a session. Login and signup set an httpOnly `session` cookie, so the UI never handles a token. The logged-in customer is `useAccount()` (`null` when logged out).

## Commands

```sh
yarn dev         # dev server (start the API in ../leesandleef-api first)
yarn check       # Biome, read-only (CI runs this)
yarn check:fix   # Biome: format, sort imports, remove unused imports
yarn lint        # ESLint (react-hooks, react-refresh)
yarn build       # tsc -b && vite build
```

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs `yarn check`, `yarn lint` and `yarn build` on every PR. Run all three before calling a change done.

## Conventions

- Match the surrounding code: naming and file layout.
- No comments anywhere: TS, TSX (including JSX) or CSS. Make code clear through naming and small functions.
- Product links: link with `winePath()` (`/wine/:id`) or `oilPath()` (`/olive-oil/:id`) from `src/lib/paths.ts` when the kind is known, and with `item.path` in lists that mix kinds (services add `path` to wines, oils, club plans and cart items through `src/lib/links.ts`). Never hand-build product URLs.
- Types go in a `types.ts` next to the code that uses them; types shared across folders go in `src/types.ts`. Use `import type`.
- Module-level constants go in a `constants.ts` next to the code that uses them; constants shared across folders go in `src/constants.ts`. Name them in UPPER_SNAKE_CASE.
- Content comes from the API. Fixed app lists are constants. Don't hard-code content in components, and don't add new reads of `src/data/`: it holds the static content for pages that haven't moved yet, read only through `src/lib/`, and goes away once nothing reads it.
- API access is layered: component → hook in `src/hooks/<feature>/` → service in `src/services/<feature>/` → `HttpClient`. Components never import a service, axios or `fetch`.
  - `HttpClient` (`src/services/HttpClient.ts`) is the only axios instance: base URL, `withCredentials` for the cookies, and an interceptor that turns every failure into an `ApiError` (`status`, `message`, the API's field `issues`; `isUnauthorized`, `isRetryable`).
  - Each service extends `BaseService<Model, DTO>`, is a singleton made with `static create()`, receives `IHttpClient` through its private constructor, and turns API responses into models in `toModel()`. Requests take an optional `AbortSignal`. Endpoint paths come from `API_ENDPOINTS` and `API_SEGMENTS` in `src/services/constants.ts`; build ids into them with `apiPath()` from `src/lib/apiPath.ts`, never by hand.
  - `tsconfig` sets `erasableSyntaxOnly`: no constructor parameter properties (`constructor(private x)`), no enums or namespaces. Declare fields and assign them in the constructor.
  - Response DTOs are the `Raw*` types (`RawWine`, `RawCartItem`, …); aggregates only a service uses sit in its folder's `types.ts` (`RawCart`, `RawCustomerOrder`).
- Hooks: reads go through `useGetData()` (queries) and writes through `useMutateData()` (mutations), one hook per file, such as `useWines`, `useCart` or `useAddCartLine`. Pass `skipToken` while a required id or query is missing. Query keys come from `QUERY_KEYS` in `src/constants.ts`.
  - Every cart write returns the whole priced cart: use `useCartMutation()`, which puts it in the cache. Login and signup use `useSessionMutation()`. After other writes, set or invalidate the queries they change.
  - Any 401 sets the account query to `null` (`src/lib/queryClient.ts`), and only network and 5xx errors are retried. `ApiError` is React Query's default error type.
- Server data lives only in React Query. Zustand stores in `src/state/` hold client-only UI state (toasts, form drafts, where to return after login), never a copy of API data. Zustand needs no provider or context.
- Forms use React Hook Form with `zodResolver`. The Zod schemas mirror the API's request rules (lengths, password minimum, required fields), and the form's values type is `z.infer` of its schema. Map an `ApiError`'s `issues` and 409/422 messages onto fields with `setError`.
- Route paths live in `src/routes.ts` as `_ROUTE` constants: a plural `<NAME>S_ROUTE` is the base (or listing) path, and a singular `<NAME>_ROUTE` is the detail pattern built from it (`GROWERS_ROUTE = '/growers'`, `GROWER_ROUTE = GROWERS_ROUTE + '/:id'`). Never write an internal path as a string: build links from these constants (`` `${GROWERS_ROUTE}/${id}` ``).
- Page folders in `src/pages/` are named after their URL (`Wines` serves `/wine`, `Wine` serves `/wine/:id`, `Journal` serves `/journal/:slug`), and each route constant is named after its page.
- Prices go through `formatCurrency()` from `src/lib/currency.ts` (`Intl.NumberFormat` with `DEFAULT_CURRENCY` and `DEFAULT_LOCALE` from `src/constants.ts`; `{ cents: true }` for cart and checkout amounts). Never build a price string by hand with `€`.
- Every page component ends in `Page`, and so does its file: route pages (`src/pages/Wine/WinePage.tsx` exports `WinePage`, with `WinePage.module.css` next to it) and page-level stand-ins such as the loading fallback (`FallbackPage`). Sections and other components never use the suffix.
- Component and page styles are CSS Modules: `X.module.css` next to `X.tsx`, imported as `styles`. Only `src/styles/global.css` is global (tokens and shared classes such as `.section`, `.btn`); use those as plain class strings. Never style another component's markup from your module; give that component a prop instead.
- No hard-coded colours: define a token in `global.css` and add it to the colours module (`src/styles/colors.ts`); use `var(--…)` in CSS and `COLORS.x` in TS.
- Pictures in `src/assets/` are grouped by kind (`portraits/`, `landscapes/`, `cellar/`) and named after what they show, never after where they're used.
- One component per file, never two, even small helpers like a table row. `src/pages/` holds only route pages. A page holds its own code: route lookup, redirects and NotFound, page state, and the layout, composed from section components in `src/components/<concern>/`. There are no `*View` wrapper components; if a page grows long, extract well-named sections rather than a view.
- Component and page folders hold only components, CSS modules, `types.ts` and `constants.ts`; a component file contains only its component. Every plain function goes in `src/lib/`, hooks in `src/hooks/` (standalone hooks at its root, API hooks in `src/hooks/<feature>/`), API classes in `src/services/`. `src/state/` holds only Zustand stores (and, until the cart moves to the API, the old cart provider and its hook).
- Follow SOLID, applied to React:
  - **Single responsibility**: a component, hook or module does one job. Pages own their layout and compose sections. Sections present one part of a page. Cards and rows present one thing. Logic lives in `src/lib/` (plain functions) or `src/hooks/` (hooks), not inline in JSX or in component folders. If you need "and" to describe a file, split it.
  - **Open/closed**: extend a component through props, `children` and composition instead of editing its insides for each new caller. Prefer one `variant`/`layout` prop over a growing pile of booleans.
  - **Liskov substitution**: components with the same role share the same prop contract, so either can be dropped in (for example product cards: the item plus `onAdd`). A wrapper around a native element accepts and forwards that element's props.
  - **Interface segregation**: take only the props you use. Narrow types with `Pick<…>` rather than passing whole objects or the whole cart API down.
  - **Dependency inversion**: components depend on hooks and helpers (`useCart()`, `useWines()`, `winePath()`, `oilPath()`), never on services, axios, `localStorage`, hard-coded URLs or another page's internals. Services depend on the `IHttpClient` interface, not on axios. Pass behaviour in as callbacks when the caller decides what happens.
- Files that export React components export only components (fast refresh).
- The `react-hooks` ESLint rules are strict, including purity: no `Date.now()` or random values during render.
- Reuse existing components (`WineCard`, `OilCard`, `Bottle`, `OilTin`, `Breadcrumb`, `QtyStepper`) and tokens before adding new ones.
- Accessibility is part of done: real buttons and links, labels on inputs, `aria-label` on icon-only buttons, `aria-current` on the active nav item, keyboard support for anything draggable.
- Formatting is Biome's job (2 spaces, single quotes, no semicolons, trailing commas, 120-character lines, sorted imports). Don't hand-format; run `yarn check:fix`.

## Git

- Always ask before creating a branch or a commit: propose the branch name and the exact message, and run it only after approval. Approval for one commit doesn't carry over to the next.
- Commits are signed: `git commit -S -m "<message>"`.
- Messages follow Conventional Commits: `type(scope): description`, with types such as `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `ci`.
- Branch from `main`; name branches in snake_case after the change (`add_dependabot`, `update_summary_style`).
- Subagents never commit, push, branch, stash or reset; they leave changes uncommitted for review.

## General rules

- Don't add dependencies without asking.
- Don't touch `.yarn/`, `dist/`, the lockfile or editor settings unless the task is about them.
