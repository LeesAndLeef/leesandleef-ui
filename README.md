# Lees & Leaf

Storefront for a natural wine & olive oil shop, built from the Lees & Leaf design canvas.

```sh
yarn
yarn dev
```

## Routes

| Path           | Page                                            |
| -------------- | ----------------------------------------------- |
| `/`            | Home                                            |
| `/shop`        | Catalog (`?type=Red`, `?type=oil`, `?q=search`) |
| `/wine/:id`    | Product (wines and oils)                        |
| `/growers/:id` | Grower profile                                  |
| `/club`        | Club / subscription                             |
| `/quiz`        | Taste quiz → mixed-six recommendation           |
| `/cart`        | Cart (saved in localStorage)                    |
| `/checkout`    | Four-step checkout and confirmation             |

## Structure

- `src/index.css` — design tokens (colours, type, patterns) and shared classes
- `src/data/` — products, growers, quiz and shop details. All of it is fictional concept content; emails use the reserved `.example` domain
- `src/components/` — header, footers, bottle illustration, cards
- `src/pages/` — one component + stylesheet per page
- `src/cart/` — cart state (`useCart`), pricing rules: −10% on 6+ wines, promo `HARVEST10`, free EU delivery from €120, Club plans ship free

Payment is a placeholder: no orders are sent anywhere yet. Hook the payment provider and order API into `placeOrder` in `src/pages/Checkout.tsx`.

Pictures are illustrations drawn in code (`src/components/Scene.tsx`), seeded by each caption so they stay the same between visits. To use real photography, swap a `<Scene>` for an `<img>` in the same container.
