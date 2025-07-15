# Synonyms Search

A web application for searching synonyms, built with **Next.js**, **TypeScript**, and **SCSS Modules**, following accessibility standards (WCAG) with ARIA attributes.

---

## 🚀 Features

- Next.js 13 App Router
- TypeScript
- SCSS Modules for styling
- Glassmorphism UI
- Synonym search functionality
- Responsive design
- WCAG-compliant with ARIA attributes
- Smooth animations

---

## 📁 Project Structure

### Backend (API routes)

```plaintext
/app
  /api/words
    route.ts
  /api/words/all
    route.ts
```

### Frontend

```plaintext
/app
  layout.tsx
  page.tsx

/components
  /Background
  /common
  /Dictionary
  /Hero
  /Stats

/hooks
/lib
/public
/styles
  _animations.scss
  _base.scss
  _mixins.scss
  _variables.scss

/types
/utils
```

---

## 🛠️ Development

### Clone the repository

```bash
git clone https://github.com/jopaa10/synonymsSearch.git
cd synonymsSearch
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Run the development server

```bash
npm run dev
# or
yarn dev
```

---

## 🎨Styling

All variables (colors, etc.) are stored in:

```bash
/styles/_variables.scss
```

Animations live in:

```bash
/styles/_animations.scss
```

---

## 🌐 Accessibility

This project includes ARIA attributes to improve usability for screen readers and meet WCAG guidelines.

---

## 📄 License

MIT
