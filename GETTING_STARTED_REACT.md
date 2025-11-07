# Getting Started - Paradive Landing Page (React + TypeScript)

## 🎯 What You Have

A modern React + TypeScript project with:
- ✅ Vite for lightning-fast development
- ✅ Tailwind CSS for styling
- ✅ Flowbite React components
- ✅ Full TypeScript support
- ✅ i18next for translations
- ✅ RTL support built-in

## 📦 Prerequisites

```bash
# Node.js 18+ and npm 9+
node --version  # Should be v18+
npm --version   # Should be v9+
```

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
cd ~/Projects/paradive-landing-react

# Install all packages
npm install
```

This installs:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Flowbite React
- i18next

### Step 2: Start Development Server

```bash
npm run dev
```

Vite will start and automatically open your browser at:
```
http://localhost:5173
```

You'll see **hot module replacement** - changes reflect instantly!

### Step 3: Start Claude Code

Open a new terminal (keep dev server running):

```bash
# In same directory
claude-code
```

## 💬 What to Tell Claude Code

```
Hi! I need to build a bilingual (Hebrew/English) registration form 
for Paradive skydiving company using the stack that's already configured.

The project uses:
- React + TypeScript
- Vite
- Tailwind CSS
- Flowbite React components
- react-i18next for translations

Please read .clinerules for complete requirements.

Start by creating:
1. src/main.tsx (entry point)
2. src/App.tsx (main component with i18n setup)
3. src/i18n/index.ts (i18next configuration)
4. src/i18n/he.json (Hebrew translations)
5. src/i18n/en.json (English translations)

Then we'll build the form components step by step.

Ready?
```

## 📁 Project Structure

```
paradive-landing-react/
│
├── 📄 Configuration Files (Already Created)
│   ├── package.json          ✅ Dependencies
│   ├── tsconfig.json         ✅ TypeScript config
│   ├── vite.config.ts        ✅ Vite config
│   ├── tailwind.config.js    ✅ Tailwind + Flowbite
│   ├── postcss.config.js     ✅ PostCSS
│   ├── index.html            ✅ HTML entry
│   ├── .gitignore            ✅ Git ignore
│   └── .clinerules           ✅ Development rules
│
└── 🔨 Source Code (Claude Code Will Create)
    ├── src/
    │   ├── main.tsx                   # Entry point
    │   ├── App.tsx                    # Main app component
    │   │
    │   ├── components/
    │   │   ├── RegistrationForm.tsx  # Main form
    │   │   ├── LanguageSwitcher.tsx  # Language toggle
    │   │   ├── FormField.tsx         # Reusable wrapper
    │   │   └── PhoneInput.tsx        # Phone with country code
    │   │
    │   ├── utils/
    │   │   ├── validation.ts         # Israeli ID validation
    │   │   ├── formatting.ts         # Phone/date formatting
    │   │   └── redirect.ts           # Jotform URL builder
    │   │
    │   ├── i18n/
    │   │   ├── index.ts              # i18next setup
    │   │   ├── he.json               # Hebrew translations
    │   │   └── en.json               # English translations
    │   │
    │   ├── types/
    │   │   └── form.ts               # TypeScript interfaces
    │   │
    │   └── styles/
    │       └── index.css             # Tailwind imports
    │
    └── public/
        └── paradive-logo.svg         # Logo (if needed)
```

## 🛠️ Development Workflow

### 1. Keep Dev Server Running

```bash
# Terminal 1: Dev server (keep running)
npm run dev
```

Hot reload means changes appear instantly in browser!

### 2. Work with Claude Code

```bash
# Terminal 2: Claude Code
claude-code
```

Claude Code will:
1. Read `.clinerules` automatically
2. Create source files in `src/`
3. Write TypeScript components
4. Implement validations
5. Setup translations
6. Test everything

### 3. Watch Browser Update Automatically

As Claude Code creates/modifies files, Vite will:
- ✅ Automatically reload
- ✅ Show changes instantly
- ✅ Display TypeScript errors
- ✅ Show console messages

## 🎨 Using Flowbite React Components

### Example: Text Input with Icon

```tsx
import { TextInput, Label } from 'flowbite-react'
import { HiUser } from 'react-icons/hi'

<div>
  <Label htmlFor="firstName" value="First Name" />
  <TextInput
    id="firstName"
    icon={HiUser}
    placeholder="Enter first name"
    required
  />
</div>
```

### Example: Select Dropdown

```tsx
import { Select, Label } from 'flowbite-react'

<div>
  <Label htmlFor="gender" value="Gender" />
  <Select id="gender" required>
    <option value="">Select gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </Select>
</div>
```

### Example: Datepicker

```tsx
import { Datepicker, Label } from 'flowbite-react'

<div>
  <Label htmlFor="birthDate" value="Birth Date" />
  <Datepicker
    id="birthDate"
    language="he"
    onSelectedDateChanged={(date) => setDate(date)}
  />
</div>
```

## 🌍 RTL Support

### Automatic HTML Direction

```tsx
// In App.tsx
import { useTranslation } from 'react-i18next'

function App() {
  const { i18n } = useTranslation()
  
  useEffect(() => {
    // Set direction based on language
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])
  
  return <div>...</div>
}
```

### Use Tailwind Logical Properties

```tsx
// ✅ RIGHT: Tailwind logical properties
<div className="ms-4">      {/* margin-start */}
<div className="me-2">      {/* margin-end */}
<div className="ps-6">      {/* padding-start */}
<div className="pe-6">      {/* padding-end */}

// ❌ WRONG: Directional properties
<div className="ml-4">      {/* Always left */}
<div className="mr-2">      {/* Always right */}
```

## 🔍 Type Checking

```bash
# Check TypeScript types (without building)
npm run type-check
```

Fix any TypeScript errors before deploying.

## 📦 Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 🚀 Deployment to Cloudflare Pages

### Method 1: GitHub Integration (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. In Cloudflare Dashboard:
   - Go to Pages
   - Connect to Git
   - Select repository
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Click "Save and Deploy"

3. Every git push automatically deploys!

### Method 2: Wrangler CLI

```bash
# Deploy directly
npm run deploy

# Or manually
npm run build
wrangler pages deploy dist
```

## 🐛 Troubleshooting

### Dev server won't start

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### TypeScript errors

```bash
# Check what's wrong
npm run type-check

# Common fix: restart VS Code's TypeScript server
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Tailwind classes not working

```bash
# Make sure Tailwind is configured
# Check tailwind.config.js includes your file paths
```

### Flowbite components not styled

```bash
# Verify node_modules/flowbite-react is in tailwind.config.js
# Restart dev server after config changes
```

## 🎯 Key Files to Understand

### 1. `.clinerules` ⭐ MOST IMPORTANT
- Claude Code reads this first
- Contains all requirements
- Explains Israeli ID validation
- Defines form structure

### 2. `package.json`
- Lists all dependencies
- Defines npm scripts
- Node version requirements

### 3. `tsconfig.json`
- TypeScript configuration
- Enables strict mode
- Path aliases (@/* → src/*)

### 4. `vite.config.ts`
- Vite build configuration
- React plugin setup
- Code splitting rules

### 5. `tailwind.config.js`
- Tailwind CSS configuration
- Flowbite plugin
- Custom colors/fonts

## 📚 Documentation Links
- **Use Context7 MCP** for the latest documentation
- **Vite**: https://vitejs.dev
- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **Tailwind CSS**: https://tailwindcss.com
- **Flowbite React**: https://github.com/themesberg/flowbite/blob/main/llms.txt
- **react-i18next**: https://react.i18next.com

## ✅ Success Checklist

### Initial Setup
- [ ] Node.js 18+ installed
- [ ] Project files downloaded
- [ ] `npm install` completed successfully
- [ ] Dev server runs (`npm run dev`)
- [ ] Browser opens at localhost:5173

### Development
- [ ] Claude Code started
- [ ] Source files created in `src/`
- [ ] TypeScript compiles without errors
- [ ] Hot reload working (changes appear instantly)
- [ ] No console errors

### Components
- [ ] Hebrew language displays (RTL)
- [ ] English language displays (LTR)
- [ ] Language switcher works
- [ ] All Flowbite components render correctly
- [ ] Form validation works
- [ ] Israeli ID validation correct

### Pre-Deployment
- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
- [ ] `npm run preview` works
- [ ] Tested on mobile (Chrome DevTools)

### Deployment
- [ ] Pushed to GitHub
- [ ] Connected to Cloudflare Pages
- [ ] Production build successful
- [ ] Live URL works
- [ ] QR code generated

## 🎓 Tips for Success

### 1. Keep Dev Server Running
- Start dev server in one terminal
- Use Claude Code in another terminal
- Watch changes in browser

### 2. Use Browser DevTools
- F12 to open DevTools
- Console tab for errors
- Network tab for loading issues
- Elements tab for CSS debugging

### 3. Leverage TypeScript
- Let TypeScript catch errors
- Use interfaces for all data
- Run `npm run type-check` often

### 4. Component-First Development
- Build one component at a time
- Test each component individually
- Then combine into full form

### 5. Use Flowbite Docs
- Browse https://flowbite-react.com
- Copy component examples
- Adapt for Hebrew RTL

## 🚧 Common Pitfalls to Avoid

### ❌ Don't

1. **Use vanilla Flowbite**
   ```tsx
   ❌ import 'flowbite'  // Wrong - vanilla JS
   ✅ import { Button } from 'flowbite-react'  // Right - React
   ```

2. **Forget RTL support**
   ```tsx
   ❌ className="ml-4"  // Wrong - always left
   ✅ className="ms-4"  // Right - logical property
   ```

3. **Use `any` type**
   ```tsx
   ❌ const data: any = ...  // Wrong - no type safety
   ✅ const data: FormData = ...  // Right - typed
   ```

4. **Store data in state when unnecessary**
   ```tsx
   ❌ const [dir, setDir] = useState('rtl')  // Wrong
   ✅ const dir = i18n.language === 'he' ? 'rtl' : 'ltr'  // Right
   ```

## 🎉 You're Ready!

### Next Steps:

1. ✅ **Install dependencies**: `npm install`
2. ✅ **Start dev server**: `npm run dev`
3. ✅ **Start Claude Code**: `claude-code`
4. ✅ **Build the form!**

---

**Questions?** Everything is in `.clinerules` - Claude Code will read it automatically!

**Good luck!** 🚀
