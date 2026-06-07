# Buy Game Page Design

## Problem

The project needs a dedicated purchase page for a game, reachable from a new button inside `GameInfoCard.vue`. This page must follow the same atomic-model direction used in `ViewGamePage.vue`: page-level logic stays in the page, while the main visual blocks are extracted into components.

## Goal

Add a new route for buying a game, expose a navigation button in `GameInfoCard.vue`, and build a dedicated `BuyGamePage.vue` that shows the game image plus a purchase card with price, style, description, and a non-functional buy button.

## Scope

In scope:

- Add a new route at `/jogos/:id/comprar`
- Add a button in `GameInfoCard.vue` that navigates to the new route
- Create a new page `BuyGamePage.vue`
- Keep the new page as the owner of the loading logic and route-based game lookup
- Split the new page into two visual components under `src/components`
- Show the game image, price, style, description, and a “Comprar” button on the new page

Out of scope:

- Real checkout logic
- Cart, payment, auth, or stock flows
- Moving service logic into components
- Changing the existing edit flow in `ViewGamePage.vue`

## Route Design

- Keep the existing game detail route untouched
- Add a sibling route:
  - `/jogos/:id/comprar`
- This route should render `BuyGamePage.vue` inside the existing `MainLayout.vue`

## Component Design

### `src/components/GameInfoCard.vue`

New responsibility added:

- Render a navigation button that leads to `/jogos/:id/comprar`

Rules:

- It remains a presentational component
- It must not fetch data
- It must not call services
- It may use router navigation for the button because that is a UI action, not page business logic

### `src/components/BuyGameBannerCard.vue`

Responsibility:

- Render the highlighted game image for the purchase page

Props:

- `game` — the loaded game object

Rules:

- Presentational only
- No services
- No page state ownership

### `src/components/BuyGameDetailsCard.vue`

Responsibility:

- Render the purchase information card with:
  - `valor`
  - `estilo`
  - `descricao`
  - a “Comprar” button

Props:

- `game` — the loaded game object

Rules:

- Use `formatBRL` internally for the price
- The “Comprar” button is visual only and does not trigger real logic
- No services
- No route or loading ownership

## Page Responsibilities

`src/pages/BuyGamePage.vue` remains the container/smart page and owns:

- `route.params.id`
- `game`
- `isLoading`
- the `getGame(id)` call
- load success and error handling
- composition of the two purchase-page components

It does not need form state because this page is display-oriented only.

## Data Flow

1. The user clicks the new button inside `GameInfoCard.vue`
2. The app navigates to `/jogos/:id/comprar`
3. `BuyGamePage.vue` reads `route.params.id`
4. `BuyGamePage.vue` calls `getGame(id)`
5. The page stores the response in `game`
6. The page passes `game` to `BuyGameBannerCard.vue`
7. The page passes `game` to `BuyGameDetailsCard.vue`
8. The “Comprar” button is displayed but does not perform any action

## Error Handling

- Preserve the same simple page-level load error approach already used in the game detail page
- Keep loading feedback in the page, not in the child components
- Do not add fake success behavior to the “Comprar” button

## Testing Impact

- Existing service and helper tests remain valid
- This feature is mainly structural and route/UI oriented, so verification should focus on:
  - `npm test`
  - `npm run lint`
  - `npm run build`
  - manual navigation from `ViewGamePage` to `/jogos/:id/comprar`

## Success Criteria

- `GameInfoCard.vue` contains a button that leads to the purchase page
- `/jogos/:id/comprar` renders a new page
- The new page shows the game image in one visual component
- The new page shows price, style, description, and a visual “Comprar” button in another visual component
- Logic for loading the game remains in `BuyGamePage.vue`
