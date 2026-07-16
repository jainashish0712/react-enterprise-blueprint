# React Project Refactoring TODOs

## Critical / Architecture
- [ ] **1. Add a `<Suspense>` Boundary for Lazy-loaded Routes**: Wrap the `Routes` in `App.tsx` with `<Suspense>` to prevent crashes when loading `Home` and `PostsPage` dynamically.
- [ ] **2. Implement Typed Redux Hooks**: Create and export `useAppDispatch` and `useAppSelector` in `store.ts` to replace manual `RootState` typing in components.
- [ ] **3. Add a Global Error Boundary**: Implement a React Error Boundary (e.g., `react-error-boundary`) in `main.tsx` to catch unhandled exceptions globally and prevent white screens.

## Project Structure & Cleanliness
- [ ] **4. Refactor Verbose Naming Conventions**: Rename variables like `thisWillBeUsedInstoreForCounter` and `thisIsThePostsApi` to standard RTK conventions (e.g., `counterReducer`, `postsApi`).
- [ ] **5. Separate `pages` from `components`**: Move `Home.tsx` and `PostsPage.tsx` into a `src/pages` (or `src/views`) directory, reserving `src/components` for reusable UI components.
- [ ] **6. Setup Path Aliases (Absolute Imports)**: Configure aliases like `@/` in `tsconfig.app.json` and `vite.config.ts` to avoid relative import "dot-dot hell" (e.g., `../../`).
- [ ] **7. Extract API Base URL to Environment Variables**: Move the hardcoded `https://dummyjson.com/` in `apiService.ts` to a `.env` file (`VITE_API_BASE_URL`).

## Styling & Tooling
- [ ] **8. Unify Your Styling Architecture**: Decide on a single styling system (MUI completely, or add Tailwind CSS) to replace the current mix of raw CSS, inline styles, and MUI.
- [ ] **9. Use Vitest instead of Jest**: Setup Vitest as the test runner since it integrates natively with Vite and is 100% compatible with the newly written Jest tests.
- [ ] **10. Implement Code Quality Automation**: Setup Prettier for formatting, and configure Husky + lint-staged to format and lint code automatically on pre-commit.
