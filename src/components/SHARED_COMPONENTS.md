# Shared Components Documentation

This document describes the reusable components used across the `kelas*_guru` pages and other parts of the application to ensure consistency and maintainability.

## BookCard

A responsive card component used to display book information.

**File:** `src/components/BookCard.tsx`

**Props:**
- `book`: Object containing book details:
  - `id`: Unique identifier
  - `judul`: Title
  - `cover`: URL to cover image
  - `path` (optional): Navigation path
  - `kategori` (optional): Class/Category name
  - `kelas` (optional): Specific class
  - `mapel` (optional): Subject
  - `penerbit` (optional): Publisher
  - `penulis` (optional): Author
  - `sekolah` (optional): School name
- `onClick` (optional): Handler for click events. If not provided, it navigates to `book.path`.

**Features:**
- Responsive aspect ratio (3:4) for cover images.
- Hover effects (shadow, text color).
- Displays title, category (fallback for class), and school name.
- Accessible (keyboard navigation support).

## FilterCheckbox

A dropdown component for filtering books by multiple criteria.

**File:** `src/components/FilterCheckbox.tsx`

**Props:**
- `books`: Array of book objects to extract filter options from.
- `onFilterChange`: Callback function receiving the updated `FilterState`.
- `hiddenFilters` (optional): Array of keys to hide from the filter list.

**FilterState Interface:**
```typescript
interface FilterState {
  kelas: string[];
  mapel: string[];
  penerbit: string[];
  penulis: string[];
}
```

**Features:**
- Automatically extracts unique options from the provided books array.
- Sorts options by occurrence count (descending).
- Supports multiple selections per category.
- Shows a badge with the count of active filters.
- Handles fallback logic for `kelas` using `kategori` if `kelas` is missing.

## SortFilter

A dropdown component for sorting lists.

**File:** `src/components/SortFilter.tsx`

**Props:**
- `onSortChange`: Callback function receiving the selected sort option.
- `currentSort`: Current active sort option (`'asc' | 'desc' | null`).
- `label` (optional): Label text (default: "Sort by").

**Features:**
- Supports Ascending (A-Z) and Descending (Z-A) sorting.
- Visual feedback for the active sort option.

## Pagination

A responsive pagination component.

**File:** `src/components/Pagination.tsx`

**Props:**
- `currentPage`: The current active page number.
- `totalPages`: Total number of available pages.
- `onPageChange`: Callback function when a page is selected.
- `isLoading` (optional): Disables controls during loading states.

**Features:**
- Smart truncation for large page numbers (e.g., `1 ... 4 5 6 ... 10`).
- Previous/Next buttons.
- consistent styling with the main theme (red/white).

## Implementation Pattern (Grade Pages)

All `kelas*_guru` pages follow a consistent implementation pattern:

1.  **State Management**:
    - `activeFilters`: Stores the current filter state.
    - `sortOption`: Stores the current sort preference.
    - `displayBooks`: Stores the processed (filtered & sorted) list of books for rendering.

2.  **Filtering Logic (useEffect)**:
    - Filters the raw book list based on `activeFilters`.
    - Handles fallback logic: Checks `book.kelas || book.kategori` against the `kelas` filter.
    - Maps the raw data to the `Book` interface (handling image URLs).
    - Sorts the result based on `sortOption`.
    - Updates `displayBooks`.

3.  **Responsive Layout**:
    - Uses CSS Grid with breakpoints:
      `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`
