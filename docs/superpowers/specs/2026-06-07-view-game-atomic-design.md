# View Game Atomic Components Design

## Problem

`ViewGamePage.vue` currently owns both the page logic and the markup for the two lower cards. The requested refactor is to separate those cards into components under `src/components` while keeping all page logic in `ViewGamePage.vue`, especially the game loading flow and the `PUT` save behavior.

## Goal

Split the two lower cards into focused presentational components without moving API calls, page state, or save orchestration out of the page.

## Scope

In scope:

- Extract the **edit form card** into a component in `src/components`
- Extract the **game info card** into a component in `src/components`
- Keep the top image card inline in `ViewGamePage.vue`
- Keep `getGame`, `updateGame`, `loadGame`, `onSubmit`, `game`, `gameForm`, `isLoading`, and `isSaving` in `ViewGamePage.vue`
- Preserve the current route, payload shape, validation rules, and save-in-place behavior

Out of scope:

- Moving save/load logic into components
- Changing service responsibilities
- Changing routes
- Splitting the page into more than the two requested card components

## Component Design

### `src/components/GameEditFormCard.vue`

Responsibility:

- Render the existing `q-card` + `q-form` UI for editing `nome`, `descricao`, and `valor`
- Expose a narrow interface to the page through props and emits

Props:

- `form` — object containing `nome`, `descricao`, and `valor`
- `isSaving` — boolean used by the save button loading state

Emits:

- `update:form` — emitted whenever an input changes, sending the next full form object
- `submit` — emitted when the user submits the Quasar form

Rules:

- Keep the same required-field validation rules already used in the page
- Do not import services
- Do not call `PUT`
- Do not own local business state beyond what is needed to render the form

### `src/components/GameInfoCard.vue`

Responsibility:

- Render the read-only card with `estilo`, `valor`, `receita_total_mes`, and `quantidade_vendas_mes`

Props:

- `game` — the loaded game object

Rules:

- Use `formatBRL` internally for currency presentation
- Do not import services
- Do not emit save events

## Page Responsibilities

`src/pages/ViewGamePage.vue` remains the smart/container component and continues to own:

- Data fetching through `getGame(route.params.id)`
- Save orchestration through `updateGame(route.params.id, buildGameUpdateRequest(...))`
- Local refs: `game`, `gameForm`, `isLoading`, `isSaving`
- Success and error handling
- Passing props to the new components
- Handling `update:form` and `submit` events from the edit form component

## Data Flow

1. The page loads the game and builds `gameForm`
2. The page passes `gameForm` and `isSaving` to `GameEditFormCard`
3. The page passes `game` to `GameInfoCard`
4. `GameEditFormCard` emits `update:form` with the next form object when inputs change
5. `ViewGamePage.vue` updates `gameForm`
6. `GameEditFormCard` emits `submit`
7. `ViewGamePage.vue` performs the existing `PUT`
8. On success, the page updates both `game` and `gameForm`

## Error Handling

- Preserve the current page alerts for load and save failures
- Preserve the current loading state handling
- Do not add new fallback behavior inside the components

## Testing Impact

- Existing tests for `view-game-form.js` and `ApiService.js` remain valid
- This refactor is structural, so the main verification remains:
  - `npm test`
  - `npm run lint`
  - `npm run build`
- Manual confirmation should ensure the extracted form component still updates the page-owned state and triggers the page-owned save flow

## Success Criteria

- `ViewGamePage.vue` becomes smaller and focused on orchestration
- The two lower cards become reusable components in `src/components`
- The page still owns all data loading and saving behavior
- Saving a game still uses the existing `PUT` flow in the page through `GamesService`
