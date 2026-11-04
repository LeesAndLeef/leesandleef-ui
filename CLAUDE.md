# Lees & Leaf

Storefront for a natural wine and olive oil shop.

- React 19, TypeScript, Vite, react-router-dom v7, yarn 4 (`nodeLinker: node-modules`). Plain CSS Modules, no UI library.
- The file layout and folder structure are being reworked, so don't assume where anything lives. Explore `src/` before each task and treat what you find as the current state.
- Cart pricing rules: −10% on 6+ wine bottles, promo `HARVEST10`, free EU shipping from €120 of goods (otherwise €9.90), Club plans ship free and are excluded from discounts. The cart is saved to localStorage.

## Commands

```sh
yarn dev         # dev server
yarn check       # Biome, read-only (CI runs this)
yarn check:fix   # Biome: format, sort imports, remove unused imports
yarn lint        # ESLint (react-hooks, react-refresh)
yarn build       # tsc -b && vite build
```

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs `yarn check`, `yarn lint` and `yarn build` on every PR. Run all three before calling a change done.

## Conventions

- Match the surrounding code: naming and file layout.
- No comments anywhere: TS, TSX (including JSX) or CSS. Make code clear through naming and small functions.
- Product links: link with `winePath()` (`/wine/:id`) or `oilPath()` (`/olive-oil/:id`) from `src/lib/paths.ts` when the kind is known, and with `item.path` in lists that mix kinds (the `src/lib/` access layer gives wines, oils and club plans a `path`). Never hand-build product URLs.
- Types go in a `types.ts` next to the code that uses them; types shared across folders go in `src/types.ts`. Use `import type`.
- Module-level constants go in a `constants.ts` next to the code that uses them; constants shared across folders go in `src/constants.ts`. Name them in UPPER_SNAKE_CASE.
- `src/data/` holds only content that a backend could serve, raw. Fixed app lists are constants. Everything reads data through the access layer in `src/lib/`, never from `src/data/` directly. Keep content in `src/data/`, not hard-coded in components.
- Route paths live in `src/routes.ts` as `_ROUTE` constants: a plural `<NAME>S_ROUTE` is the base (or listing) path, and a singular `<NAME>_ROUTE` is the detail pattern built from it (`GROWERS_ROUTE = '/growers'`, `GROWER_ROUTE = GROWERS_ROUTE + '/:id'`). Never write an internal path as a string: build links from these constants (`` `${GROWERS_ROUTE}/${id}` ``).
- Page folders in `src/pages/` are named after their URL (`Wines` serves `/wine`, `Wine` serves `/wine/:id`, `Journal` serves `/journal/:slug`), and each route constant is named after its page.
- Prices go through `formatCurrency()` from `src/lib/currency.ts` (`Intl.NumberFormat` with `DEFAULT_CURRENCY` and `DEFAULT_LOCALE` from `src/constants.ts`; `{ cents: true }` for cart and checkout amounts). Never build a price string by hand with `€`.
- Every page component ends in `Page`, and so does its file: route pages (`src/pages/Wine/WinePage.tsx` exports `WinePage`, with `WinePage.module.css` next to it) and page-level stand-ins such as the loading fallback (`FallbackPage`). Sections and other components never use the suffix.
- Component and page styles are CSS Modules: `X.module.css` next to `X.tsx`, imported as `styles`. Only `src/styles/global.css` is global (tokens and shared classes such as `.section`, `.btn`); use those as plain class strings. Never style another component's markup from your module; give that component a prop instead.
- No hard-coded colours: define a token in `global.css` and add it to the colours module (`src/styles/colors.ts`); use `var(--…)` in CSS and `COLORS.x` in TS.
- Pictures in `src/assets/` are grouped by kind (`portraits/`, `landscapes/`, `cellar/`) and named after what they show, never after where they're used.
- One component per file, never two, even small helpers like a table row. `src/pages/` holds only route pages. A page holds its own code: route lookup, redirects and NotFound, page state, and the layout, composed from section components in `src/components/<concern>/`. There are no `*View` wrapper components; if a page grows long, extract well-named sections rather than a view.
- Component and page folders hold only components, CSS modules, `types.ts` and `constants.ts`; a component file contains only its component. Every plain function goes in `src/lib/`, hooks in `src/hooks/`. `src/state/` holds only the provider and its hook.
- Follow SOLID, applied to React:
  - **Single responsibility**: a component, hook or module does one job. Pages own their layout and compose sections. Sections present one part of a page. Cards and rows present one thing. Logic lives in `src/lib/` (plain functions) or `src/hooks/` (hooks), not inline in JSX or in component folders. If you need "and" to describe a file, split it.
  - **Open/closed**: extend a component through props, `children` and composition instead of editing its insides for each new caller. Prefer one `variant`/`layout` prop over a growing pile of booleans.
  - **Liskov substitution**: components with the same role share the same prop contract, so either can be dropped in (for example product cards: the item plus `onAdd`). A wrapper around a native element accepts and forwards that element's props.
  - **Interface segregation**: take only the props you use. Narrow types with `Pick<…>` rather than passing whole objects or the whole cart API down.
  - **Dependency inversion**: components depend on hooks and data modules (`useCart()`, `winePath()`, `oilPath()`, `src/data/*`), never on `localStorage`, hard-coded URLs or another page's internals. Pass behaviour in as callbacks when the caller decides what happens.
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
