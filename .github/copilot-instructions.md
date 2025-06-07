# Disk Tamer App – AI Agent Coding Instructions

## Purpose

This file provides instructions for AI coding assistants (like GitHub Copilot) to understand the structure, conventions, and best practices for contributing to the Disk Tamer codebase. Follow these instructions when generating, editing, or refactoring code.

---

## Project Structure & File Placement

- **src/app/File Tree/**

  - Contains all logic and components related to the file tree UI and file system abstraction.
  - Place file tree node types, tree-building utilities, and custom node renderers here.
  - Example files: `CreateTreeFromDirectory.ts`, `FileTree.tsx`, `FileTree.scss`, `TreeNode.tsx`, `FileTreeMethods.ts`.

- **src/app/Page Components/**

  - Contains high-level UI components that structure the main page, such as layout, title bar, and folder pickers.
  - Place context providers, main content containers, and folder selection logic here.
  - Example files: `Body.tsx`, `TitleBar.tsx`, `SelectFolderPickers.tsx`.

- **src/app/Translations/**

  - Contains translation logic and language resources.
  - Place translation key maps and context providers here.
  - Example files: `Translations.ts`, `TranslationsContext.tsx`.

- **src/app/UI Elements/**

  - Contains reusable UI components and custom-styled elements.
  - Place styled buttons, tooltips, and dialog components here.
  - Example files: `StyledComponents.tsx`, `CustomDialogs.tsx`.

- **public/**

  - Static assets such as SVGs and icons.

- **Styles**
  - Use SCSS modules for component-specific styles (e.g., `FileTree.scss`, `TitleBar.scss`).
  - Use CSS variables for theming (light/dark) and layout.

---

## Coding Conventions

- **Component Structure:**

  - Keep components small and focused. Place each major UI element in its own file.
  - Use functional React components and hooks.
  - Use Radix UI components for accessibility and theming.

- **File Tree System:**

  - Use the `ArboristNode` type for all file tree nodes.
  - Build the file tree recursively from the selected directory using `CreateTreeFromDirectory.ts`.
  - Do not perform real file operations yet; only simulate changes in the tree structure.

- **Context Usage:**

  - Use `AppContext` to store the current directory handle and share it across components.
  - Use `TranslationsContext` and the `useTranslation` hook for all user-facing text.

- **Translations:**

  - Add new translation keys to the central map in `Translations.ts`.
  - Support English, Portuguese (Brazil), Spanish, Chinese, and Hindi.

- **UI/UX:**

  - Use Radix UI for Select, Tooltip, and Icon components.
  - Use `TooltipButton` and `StyledButton` for consistent button styling and tooltips.
  - Implement theme switching in the TitleBar; update CSS variables at the root level.

- **Extensibility:**
  - Structure code for easy addition of new features (e.g., AI-powered actions, template-based file creation).
  - Keep logic for file operations and UI rendering separate.

---

## When Adding or Editing Code

- Place new files in the correct folder as described above.
- Use and extend existing types and contexts where possible.
- Follow the translation and theming systems already in place.
- Write responsive, accessible UI using Radix UI and SCSS modules.
- Document new components and utilities with clear comments.

---

## Planned Features (Do Not Implement Yet)

- Real file operations (rename, move, delete) using the File System Access API.
- Template-based file creation (e.g., generate documents from templates and CSVs).
- AI-powered features (e.g., extracting data from images to auto-fill templates).

---

For more details, refer to the source files in each folder. Always follow these instructions when making changes to the codebase.
