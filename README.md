# Paradive Landing Page

Modern bilingual (Hebrew RTL / English LTR) landing page for Paradive skydiving company with Israeli ID validation and Jotform integration.

[![Deploy to Cloudflare Workers](https://github.com/BinatrixAI/paradive-lp/actions/workflows/deploy.yml/badge.svg)](https://github.com/BinatrixAI/paradive-lp/actions/workflows/deploy.yml)

## 🌐 Live Site

- **Production**: [https://paradive.binatrix.io](https://paradive.binatrix.io)
- **Workers.dev**: [https://paradive-landing.oqva-account.workers.dev](https://paradive-landing.oqva-account.workers.dev)

## ✨ Features

### Core Functionality
- **Bilingual Interface**: Full Hebrew (RTL) and English (LTR) support with automatic direction switching
- **Israeli ID Validation**: Real-time validation using Luhn algorithm checksum
- **Smart Form**: Age calculation, minor detection, and conditional fields
- **Jotform Integration**: Seamless redirect with properly formatted URL parameters
  - Gender localization (Hebrew: זכר/נקבה, English: male/female)
  - Phone numbers as digits only (972508147677)
  - Birth date split into day/month/year parameters
- **Session Tracking**: Cross-browser UUID generation with mobile Safari fallbacks

### Mobile UX Optimizations
- **iOS Safari Zoom Prevention**: 16px font size prevents auto-zoom on input focus
- **Smart Keyboard**: Numeric keyboard for ID number field
- **Submission Guard**: Prevents duplicate form submissions
- **Responsive Layout**: Inline phone fields on all screen sizes
- **Default Values**: Pre-filled birth date (1985-07-14) for better mobile UX

### Technical Highlights
- **React 18** with TypeScript (strict mode)
- **Vite 5** for fast builds and HMR
- **Flowbite React** components with Tailwind CSS
- **Cloudflare Workers** deployment with custom domain (paradive.binatrix.io)
- **GitHub Actions** CI/CD pipeline with automatic deployments
- **RTL/LTR Support** via Tailwind logical properties
- **Cross-Browser Compatible**: Works on all modern browsers including mobile Safari

### Form Validation
- Israeli ID (9 digits, Luhn checksum)
- Name validation (Hebrew/English letters only)
- Phone validation (international format with country codes)
- Age validation (10-120 years)
- Real-time error messages in both languages

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/BinatrixAI/paradive-lp.git
cd paradive-lp

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at http://localhost:5173

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server (auto-opens browser)
npm run type-check       # TypeScript type checking

# Build
npm run build            # Production build → dist/
npm run preview          # Preview production build locally

# Deployment
npm run deploy           # Build and deploy to Cloudflare Workers
npm run deploy:production # Deploy to production environment
```

## 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18.3.1 |
| **Language** | TypeScript 5.6.3 (strict mode) |
| **Build Tool** | Vite 5.4.10 |
| **UI Components** | Flowbite React 0.12.10 |
| **Styling** | Tailwind CSS 3.4.14 |
| **Internationalization** | react-i18next 15.1.0 |
| **Deployment** | Cloudflare Workers (Wrangler 4.46.0) |
| **CI/CD** | GitHub Actions |

## 📁 Project Structure

```
paradive-landing/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD
├── public/
│   └── assets/
│       └── paradive-logo.png    # Static assets
├── src/
│   ├── components/
│   │   ├── RegistrationForm.tsx # Main form component
│   │   ├── LanguageSwitcher.tsx # Language toggle (🇮🇱/🇬🇧)
│   │   ├── FormField.tsx        # Reusable form field
│   │   └── PhoneInput.tsx       # Phone input with country codes
│   ├── i18n/
│   │   ├── index.ts             # i18next config
│   │   ├── he.json              # Hebrew translations
│   │   └── en.json              # English translations
│   ├── utils/
│   │   ├── validation.ts        # Form validation (ID, phone, etc.)
│   │   ├── formatting.ts        # Data formatting utilities
│   │   └── redirect.ts          # Jotform URL builder
│   ├── types/
│   │   └── form.ts              # TypeScript interfaces
│   ├── styles/
│   │   └── index.css            # Global styles
│   ├── App.tsx                  # Root component
│   └── main.tsx                 # Entry point
├── wrangler.toml                # Cloudflare Workers config
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind + Flowbite config
└── tsconfig.json                # TypeScript configuration
```

## ⚙️ Configuration

### Environment

No environment variables required for basic functionality. The app uses:
- **Default Language**: Hebrew (`he`)
- **Fallback Language**: English (`en`)
- **Jotform Redirect**: Configured in `src/utils/redirect.ts`

### Cloudflare Workers

Deployment configuration in `wrangler.toml`:

```toml
name = "paradive-landing"
account_id = "25a2df56c26faf86bc9de7a9f31fbc9a"
compatibility_date = "2025-11-08"

[assets]
directory = "dist"
html_handling = "auto-trailing-slash"
not_found_handling = "single-page-application"

[[routes]]
pattern = "paradive.binatrix.io"
custom_domain = true
```

## 🔧 Development Workflow

### 1. Local Development

```bash
npm run dev
```

- Hot Module Replacement (HMR) enabled
- TypeScript errors shown in terminal and browser
- Changes reflect instantly

### 2. Type Checking

```bash
npm run type-check
```

Runs TypeScript compiler without emitting files to catch type errors.

### 3. Building

```bash
npm run build
```

- Compiles TypeScript
- Bundles with Vite
- Optimizes assets
- Outputs to `dist/`

### 4. Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deploying.

## 🚢 Deployment

### Automated Deployment (Recommended)

Pushes to `main` branch automatically trigger deployment via GitHub Actions.

**Setup Required:**
1. Create Cloudflare API token (see [GITHUB_DEPLOYMENT_SETUP.md](GITHUB_DEPLOYMENT_SETUP.md))
2. Add GitHub secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

### Manual Deployment

```bash
npm run deploy
```

Builds and deploys to Cloudflare Workers on OQVA account.

## 📚 Documentation

- **[CLAUDE.md](CLAUDE.md)** - Developer guidance and project rules
- **[MIGRATION_PAGES_TO_WORKERS.md](MIGRATION_PAGES_TO_WORKERS.md)** - Pages to Workers migration guide
- **[WORKERS_QUICK_START.md](WORKERS_QUICK_START.md)** - Cloudflare Workers quick reference
- **[GITHUB_DEPLOYMENT_SETUP.md](GITHUB_DEPLOYMENT_SETUP.md)** - CI/CD setup instructions

## 🎨 Design System

### Colors
- **Primary**: Blue palette (Tailwind blue-500 base)
- **Error**: Red (Flowbite failure color)
- **Success**: Green (Flowbite success color)

### Typography
- **Font**: Rubik (excellent Hebrew support)
- **Loading**: Google Fonts CDN

### Components
All UI components from **Flowbite React** with custom styling:
- TextInput
- Select
- Button
- Datepicker
- Label

## 🌍 Internationalization

### Supported Languages

| Language | Code | Direction | Default |
|----------|------|-----------|---------|
| Hebrew | `he` | RTL | ✓ |
| English | `en` | LTR | |

### Adding Translations

Edit translation files:
- `src/i18n/he.json` - Hebrew
- `src/i18n/en.json` - English

Structure:
```json
{
  "fieldName": "Display Text",
  "fieldNamePlaceholder": "Placeholder Text",
  "errors": {
    "invalidField": "Error Message"
  }
}
```

## 🔒 Validation Rules

| Field | Requirements |
|-------|-------------|
| **First Name** | 2-50 characters, letters only (Hebrew/English) |
| **Last Name** | 2-50 characters, letters only (Hebrew/English) |
| **ID Number** | 9 digits, valid Luhn checksum |
| **Birth Date** | Age between 10-120 years |
| **Gender** | Required selection |
| **Phone** | Valid international format with country code |

### Israeli ID Validation

Implements the Luhn algorithm (mod 10) checksum validation:

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

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

## 👥 Contact

**Project Owner**: Paradive Skydiving
**Development**: Binatrix
**Cloudflare Account**: OQVA

---

**Built with ❤️ using React, TypeScript, and Cloudflare Workers**
