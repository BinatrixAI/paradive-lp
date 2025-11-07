# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern bilingual (Hebrew RTL / English LTR) landing page for Paradive skydiving company built with React 18, TypeScript, Vite, Tailwind CSS, and Flowbite React components. The form collects user information with Israeli ID validation and redirects to Jotform for further processing.

## Essential Commands

```bash
# Development
npm install              # Install dependencies
npm run dev              # Start dev server at http://localhost:5173 (auto-opens browser)
npm run type-check       # TypeScript type checking without building

# Build & Preview
npm run build            # TypeScript compile + Vite production build → dist/
npm run preview          # Preview production build locally

# Deployment
npm run deploy           # Build and deploy to Cloudflare Pages via Wrangler
```

## Architecture & Key Patterns

### Technology Stack
- **Framework**: React 18 with TypeScript (strict mode)
- **Build Tool**: Vite 5 (ES modules, fast HMR)
- **UI Components**: Flowbite React (NOT vanilla Flowbite)
- **Styling**: Tailwind CSS 3 with RTL support via logical properties
- **i18n**: react-i18next with Hebrew (default) and English
- **Deployment**: Cloudflare Pages
- **Node**: Requires 18.0.0+

### Project Structure
```
src/
├── main.tsx                     # Entry point (mounts React app)
├── App.tsx                      # Main component with i18n initialization
├── components/
│   ├── RegistrationForm.tsx     # Main form with Flowbite components
│   ├── LanguageSwitcher.tsx     # Flag-based language toggle (🇮🇱/🇬🇧)
│   ├── FormField.tsx            # Reusable form field wrapper
│   └── PhoneInput.tsx           # Phone input with country code selector
├── utils/
│   ├── validation.ts            # Israeli ID (Luhn algorithm), phone, name validation
│   ├── formatting.ts            # Phone (+country-area-number), date (YYYY-MM-DD)
│   └── redirect.ts              # Jotform URL builder with query params
├── i18n/
│   ├── index.ts                 # i18next configuration (default: he)
│   ├── he.json                  # Hebrew translations
│   └── en.json                  # English translations
├── types/
│   └── form.ts                  # TypeScript interfaces (FormData, ValidationErrors, etc.)
└── styles/
    └── index.css                # Tailwind directives (@tailwind base/components/utilities)
```

### Critical Implementation Requirements

#### 1. RTL/LTR Support
- **Always** use Tailwind logical properties: `ms-*`, `me-*`, `ps-*`, `pe-*` (NOT `ml-*`, `mr-*`, `pl-*`, `pr-*`)
- Set `document.documentElement.dir` based on `i18n.language` in `useEffect`
- Set `document.documentElement.lang` to current language
- Example:
  ```tsx
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])
  ```

#### 2. Flowbite React Components
- **Must** use `flowbite-react` package (React components)
- **Never** use vanilla `flowbite` (vanilla JS library)
- Common components: `TextInput`, `Select`, `Button`, `Datepicker`, `Label`, `Dropdown`
- All components are imported from `'flowbite-react'`
- Example:
  ```tsx
  import { TextInput, Label } from 'flowbite-react'
  import { HiUser } from 'react-icons/hi'

  <Label htmlFor="firstName" value={t('firstName')} />
  <TextInput
    id="firstName"
    icon={HiUser}
    color={errors.firstName ? 'failure' : 'gray'}
    helperText={errors.firstName}
  />
  ```

#### 3. Israeli ID Validation (Critical)
- **Must** be exactly 9 digits
- **Must** validate using Luhn algorithm checksum:
  ```typescript
  function validateIsraeliID(id: string): boolean {
    if (!/^\d{9}$/.test(id)) return false

    const weights = [1, 2, 1, 2, 1, 2, 1, 2, 1]
    let sum = 0

    for (let i = 0; i < 9; i++) {
      let digit = parseInt(id[i])
      let weighted = digit * weights[i]

      if (weighted > 9) {
        weighted = Math.floor(weighted / 10) + (weighted % 10)
      }

      sum += weighted
    }

    return sum % 10 === 0
  }
  ```
- Provide real-time validation feedback with red border + error message

#### 4. Form Data Flow
1. Collect fields: firstName, lastName, idNumber, birthDate, gender, phone
2. Calculate age from birthDate
3. Determine `isMinor` flag (age < 18)
4. Generate session token: `crypto.randomUUID()`
5. Build Jotform URL with all params
6. Redirect: `window.location.href = jotformUrl`

### TypeScript Configuration
- **Strict mode enabled**: All types must be explicit
- **No `any` types**: Use proper interfaces or `unknown`
- **Path aliases**: `@/*` maps to `src/*`
- **All components**: Functional components with typed props interfaces
- **Interfaces location**: Export from `src/types/form.ts`

### Vite Configuration
- **Port**: 5173 (auto-opens on `npm run dev`)
- **Build output**: `dist/`
- **Code splitting**: Configured for react-vendor, flowbite, i18n chunks
- **HMR**: Enabled by default for instant development feedback

### i18n Configuration
- **Default language**: Hebrew (`he`)
- **Fallback**: English (`en`)
- **Language switcher**: Flag icons (Israel 🇮🇱, UK 🇬🇧)
- **Translation keys**: Use consistent naming (e.g., `firstName`, `firstNamePlaceholder`, `errors.invalidId`)

## Common Development Patterns

### Component Structure
```tsx
// Functional component with TypeScript
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ComponentProps {
  value: string
  onChange: (value: string) => void
}

export default function Component({ value, onChange }: ComponentProps) {
  const { t } = useTranslation()
  return (/* JSX */)
}
```

### Form Validation Pattern
```tsx
const [errors, setErrors] = useState<ValidationErrors>({})

const validateForm = (): ValidationErrors => {
  const newErrors: ValidationErrors = {}

  if (!formData.firstName) newErrors.firstName = t('errors.required')
  if (!validateIsraeliID(formData.idNumber)) newErrors.idNumber = t('errors.invalidId')

  return newErrors
}

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  const validationErrors = validateForm()

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return
  }

  // Process form...
}
```

### Tailwind + Flowbite Integration
- Flowbite plugin is configured in `tailwind.config.js`
- Content paths include `node_modules/flowbite-react/lib/esm/**/*.js`
- Custom font: Rubik (excellent Hebrew support, loaded from Google Fonts)
- Primary color palette defined (blue-based, can be customized)

## Validation Rules

| Field | Validation |
|-------|-----------|
| firstName | Required, 2-50 chars, letters only (Hebrew/English) |
| lastName | Required, 2-50 chars, letters only (Hebrew/English) |
| idNumber | Required, 9 digits, valid Luhn checksum |
| birthDate | Required, age 10-120 years |
| gender | Required, 'male' or 'female' |
| phone | Required, valid international format with country code |

## Deployment

### Cloudflare Pages (Primary Method)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Auto-deploys on git push (when connected to GitHub)

### Manual Deploy
```bash
npm run deploy  # Runs build + wrangler pages deploy dist
```

## Important Notes

### DO
- ✅ Use Flowbite React components exclusively
- ✅ Use Tailwind logical properties for RTL support
- ✅ Validate Israeli ID with Luhn algorithm
- ✅ Use TypeScript strict mode with proper interfaces
- ✅ Keep components functional (hooks only)
- ✅ Use `useTranslation()` for all text
- ✅ Format phone as `+{country}-{area}-{number}`
- ✅ Send dates as `YYYY-MM-DD` to Jotform
- ✅ Generate session token with `crypto.randomUUID()`

### DON'T
- ❌ Use vanilla Flowbite (use Flowbite React instead)
- ❌ Use directional properties (`ml-*`, `mr-*` - use logical properties)
- ❌ Use conditional classNames for RTL (use Tailwind RTL utilities)
- ❌ Use `any` type in TypeScript
- ❌ Store sensitive data in localStorage
- ❌ Use class components (functional components only)
- ❌ Import from `'flowbite'` (import from `'flowbite-react'`)

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## Additional Resources

Refer to these files for detailed specifications:
- [clinerules-react.txt](clinerules-react.txt) - Complete development rules and requirements
- [README_REACT.md](README_REACT.md) - Project overview and features
- [GETTING_STARTED_REACT.md](GETTING_STARTED_REACT.md) - Setup guide and workflow

For latest library documentation, use the Context7 MCP tool to fetch up-to-date docs for:
- Flowbite React
- react-i18next
- Vite
- Tailwind CSS
