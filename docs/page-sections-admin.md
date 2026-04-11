# Page Sections Admin

This project now supports a layout model based on `page_sections`.

The public site renders sections in the order stored in Supabase:
- `hero`
- `profile`
- `timeline`
- `releases`
- `video`
- `closing`

Each row in `page_sections` contains:
- `section_key`: stable section id used by the frontend renderer
- `display_order`: vertical order on the page
- `is_visible`: whether the section should render publicly
- `variant`: future style/layout switch for that section
- `config`: JSON settings bucket for section-specific options

## Recommended Admin UI

Build `/admin/layout` around this data model:

1. A sortable list of sections using `dnd-kit`
2. A visibility toggle per section
3. A simple variant selector per section
4. A JSON-backed config editor only when a section needs extra controls

## Suggested Admin Components

```text
src/components/admin/
  AdminShell/
  LayoutSectionList/
  LayoutSectionRow/
  LayoutVisibilityToggle/
  LayoutVariantSelect/
```

## Save Flow

1. Fetch `page_sections` ordered by `display_order`
2. Reorder locally with drag and drop
3. Save the whole ordered list back to Supabase
4. Refresh the public page and confirm the new order

## Important Constraint

This is intentionally not a freeform page builder.

The design stays controlled by React components, while Supabase decides:
- order
- visibility
- variant
- small per-section config

That keeps the portfolio visually consistent while still making it editable.
