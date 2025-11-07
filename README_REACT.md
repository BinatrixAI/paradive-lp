# Paradive Landing Page - React + TypeScript

Modern bilingual landing page for Paradive skydiving company built with React, TypeScript, Tailwind CSS, and Flowbite React components.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **UI Components**: Flowbite React
- **i18n**: react-i18next
- **Deployment**: Cloudflare Pages

## ✨ Features

- ✅ Bilingual support (Hebrew RTL / English LTR)
- ✅ Flowbite React components
- ✅ Israeli ID validation (Luhn algorithm)
- ✅ Full TypeScript coverage
- ✅ Mobile-first responsive design
- ✅ Age calculation (minor detection)
- ✅ Phone formatting with country codes
- ✅ Session token generation
- ✅ Jotform integration

## 📋 Form Fields

- **First Name** - TextInput with user icon
- **Last Name** - TextInput with user icon
- **ID Number** - 9-digit Israeli ID with validation
- **Birth Date** - Datepicker component
- **Gender** - Select dropdown
- **Phone** - International phone input

## 🌍 Languages

- **Hebrew** (עברית) - Default, RTL layout
- **English** - LTR layout
- Instant language switching with flags

## 📦 Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run type-check       # Check TypeScript types
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment
npm run deploy           # Deploy to Cloudflare Pages
```

## 🏗️ Project Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Main app component
├── components/
│   ├── RegistrationForm.tsx   # Main form
│   ├── LanguageSwitcher.tsx   # Language toggle
│   ├── FormField.tsx          # Reusable field wrapper
│   └── PhoneInput.tsx         # Phone with country code
├── utils/
│   ├── validation.ts          # Form validation
│   ├── formatting.ts          # Data formatting
│   └── redirect.ts            # Jotform URL builder
├── i18n/
│   ├── index.ts               # i18next setup
│   ├── he.json                # Hebrew translations
│   └── en.json                # English translations
├── types/
│   └── form.ts                # TypeScript interfaces
└── styles/
    └── index.css              # Tailwind imports
```

## 🔒 Validation

### Israeli ID (Teudat Zehut)
- Exactly 9 digits
- Luhn algorithm checksum
- Real-time validation

### Age Calculation
- From birth date
- Minimum 10 years old
- Detects if minor (<18)

### Phone Format
- International format
- Default: Israel (+972)
- Format: +{country}-{area}-{number}

## 🎨 Styling

- **Tailwind CSS** - Utility-first framework
- **Flowbite** - Pre-built components
- **RTL Support** - Logical properties (ms-, me-, ps-, pe-)
- **Font**: Rubik (excellent Hebrew support)

## 🌐 Deployment

### Cloudflare Pages (Recommended)

1. Connect GitHub repository
2. Build command: `npm run build`
3. Build output: `dist`
4. Auto-deploys on push

### Manual Deploy

```bash
npm run build
wrangler pages deploy dist
```

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Build test
npm run build
npm run preview
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## 🔗 Integration

### Jotform
- Receives prefilled data via URL parameters
- Uses `isMinor` flag for conditional logic
- Session token for tracking

### Make.com (Phase 3)
- Data transformation
- CRM integration
- Error handling

## 📚 Documentation

- [GETTING_STARTED.md](./GETTING_STARTED.md) - Setup guide
- [.clinerules](./.clinerules) - Development rules
- [field-mappings.json](../field-mappings.json) - Data flow (if exists)

## 🐛 Troubleshooting

### Dev server won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### TypeScript errors
```bash
npm run type-check
```

### Tailwind not working
- Check `tailwind.config.js` content paths
- Restart dev server

## 🎯 Success Criteria

- ✅ TypeScript compiles without errors
- ✅ Both languages work (Hebrew/English)
- ✅ All Flowbite components render
- ✅ Israeli ID validation accurate
- ✅ Form submits and redirects
- ✅ Mobile responsive
- ✅ Fast load time (<2s)

## 📞 Support

- **Flowbite React**: https://flowbite-react.com
- **Vite**: https://vitejs.dev
- **React**: https://react.dev
- **Tailwind**: https://tailwindcss.com

## 📄 License

MIT

## 👨‍💻 Author

Dima

---

**Version**: 2.0.0  
**Status**: Modern React rewrite  
**Previous**: Vanilla JS version (deprecated)
