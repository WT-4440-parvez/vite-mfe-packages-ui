# Project Architecture - Technical Documentation

## 📋 Table of Contents
- [Architecture Overview](#architecture-overview)
- [System Design](#system-design)
- [Module Federation Explained](#module-federation-explained)
- [Component Structure](#component-structure)
- [Data Flow](#data-flow)
- [Build Process](#build-process)
- [Runtime Behavior](#runtime-behavior)
- [Best Practices](#best-practices)
- [Advanced Concepts](#advanced-concepts)

---

## 🏗️ Architecture Overview

### High-Level Architecture Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                     Workspace Root (Monorepo)                   │
│                      npm workspaces                            │
└────────────────────────────────────────────────────────────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
      ┌──────────▼─────────┐    ┌─────────▼──────────┐
      │   Utility App      │    │    Main App        │
      │   Port: 5001       │    │   Port: 5000       │
      │   Role: REMOTE     │    │   Role: HOST       │
      └────────────────────┘    └────────────────────┘
               │                          │
      Exposes Components         Consumes Components
               │                          │
               │   Module Federation      │
               │   (Runtime Loading)      │
               │                          │
      ┌────────▼────────┐        ┌───────▼────────┐
      │ remoteEntry.js  │◄───────│   Federation   │
      │  (localhost:    │  HTTP  │    Plugin      │
      │   5001/assets/) │        │                │
      └─────────────────┘        └────────────────┘
```

### Application Roles

| App | Role | Port | Purpose | Key Files |
|-----|------|------|---------|-----------|
| **utility-app** | Remote/Provider | 5001 | Exposes reusable components | `vite.config.ts` (exposes), `src/components/` |
| **main-app** | Host/Consumer | 5000 | Uses remote components | `vite.config.ts` (remotes), `src/App.tsx` |

---

## 🎯 System Design

### 1. Monorepo Structure

```
MIcrofrontend Design/
│
├── package.json                 # Root workspace definition
│   ├── "workspaces": ["apps/*"]
│   └── Shared scripts (dev, build)
│
├── tsconfig.base.json          # Shared TypeScript configuration
│   ├── Compiler options for all apps
│   └── Strict type checking enabled
│
├── README.md                   # Setup & installation guide
├── PROJECT_ARCHITECTURE.md     # This file (technical details)
│
└── apps/                       # All micro-frontend applications
    │
    ├── utility-app/            # Component Library (Remote)
    │   ├── package.json
    │   │   └── "dev": "vite build && vite preview --port 5001"
    │   │       (Build first, then serve from dist/)
    │   │
    │   ├── vite.config.ts      # Module Federation config
    │   │   ├── name: 'utility_app'
    │   │   ├── exposes: { './Button', './Card', ... }
    │   │   └── shared: ['react', 'react-dom']
    │   │
    │   ├── tsconfig.json       # Extends base config
    │   ├── tsconfig.node.json  # Vite config types
    │   │
    │   ├── index.html          # Entry HTML (at root, not public/)
    │   │
    │   └── src/
    │       ├── index.tsx       # ReactDOM.render
    │       ├── App.tsx         # Component showcase
    │       ├── App.css         # Global styles
    │       │
    │       └── components/     # All shared components
    │           ├── index.ts    # Central exports
    │           │
    │           ├── Button/
    │           │   ├── Button.tsx        # Component logic
    │           │   ├── Button.types.ts   # TypeScript interfaces
    │           │   └── Button.css        # Component styles
    │           │
    │           ├── Card/
    │           │   ├── Card.tsx
    │           │   ├── Card.types.ts
    │           │   └── Card.css
    │           │
    │           ├── Input/
    │           │   ├── Input.tsx
    │           │   ├── Input.types.ts
    │           │   └── Input.css
    │           │
    │           └── Modal/
    │               ├── Modal.tsx
    │               ├── Modal.types.ts
    │               └── Modal.css
    │
    └── main-app/               # Main Application (Host)
        ├── package.json
        │   └── "dev": "vite --port 5000"
        │
        ├── vite.config.ts      # Module Federation config
        │   ├── name: 'main_app'
        │   ├── remotes: { utilityApp: 'http://localhost:5001/...' }
        │   └── shared: ['react', 'react-dom']
        │
        ├── tsconfig.json       # Extends base config
        ├── tsconfig.node.json  # Vite config types
        │
        ├── index.html          # Entry HTML (at root)
        │
        └── src/
            ├── index.tsx       # ReactDOM.render
            ├── App.tsx         # Main app logic
            ├── App.css         # App-specific styles
            │
            ├── remote-types.d.ts    # TypeScript module declarations
            │   └── declare module 'utilityApp/Button'
            │
            └── shared-types.d.ts    # Shared type interfaces
                └── interface ButtonProps { ... }
```

### 2. Dependency Management

#### Workspace Dependencies (Root)

```json
{
  "workspaces": ["apps/*"],
  "dependencies": {
    "react": "^18.2.0",           // Shared across all apps
    "react-dom": "^18.2.0",       // Shared across all apps
    "typescript": "^5.3.3"        // Shared build tool
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^6.0.11",
    "concurrently": "^8.2.2"      // Run multiple commands
  }
}
```

#### App-Specific Dependencies

```json
// apps/utility-app/package.json & apps/main-app/package.json
{
  "dependencies": {
    "@originjs/vite-plugin-federation": "^1.3.5"  // Module Federation
  }
}
```

### 3. TypeScript Configuration Hierarchy

```
tsconfig.base.json (Root)
    ├── target: ES2020
    ├── jsx: react-jsx
    ├── strict: true
    └── noEmit: true
         │
         ├──► apps/utility-app/tsconfig.json
         │     └── extends: ../../tsconfig.base.json
         │
         └──► apps/main-app/tsconfig.json
               └── extends: ../../tsconfig.base.json
```

---

## 🔌 Module Federation Explained

### What is Module Federation?

Module Federation allows **JavaScript applications to dynamically load code from other applications at runtime**. Think of it as "microservices for the frontend."

### How It Works in This Project

#### Step 1: Utility App Exposes Components

```typescript
// apps/utility-app/vite.config.ts
federation({
  name: 'utility_app',              // Unique identifier
  filename: 'remoteEntry.js',       // Federation manifest file
  exposes: {
    './Button': './src/components/Button/Button.tsx',  // Public API
    './Card': './src/components/Card/Card.tsx',
    './Input': './src/components/Input/Input.tsx',
    './Modal': './src/components/Modal/Modal.tsx',
  },
  shared: ['react', 'react-dom'],   // Shared dependencies
})
```

**What this does:**
- Creates a manifest file (`remoteEntry.js`) listing all exposed components
- Bundles each component as a separate chunk
- Sets up a "remote entry point" at `http://localhost:5001/assets/remoteEntry.js`

#### Step 2: Main App Consumes Components

```typescript
// apps/main-app/vite.config.ts
federation({
  name: 'main_app',                 // Unique identifier
  remotes: {
    utilityApp: 'http://localhost:5001/assets/remoteEntry.js',  // Remote URL
  },
  shared: ['react', 'react-dom'],   // Same shared deps
})
```

**What this does:**
- Tells Vite where to find the remote components
- Maps `utilityApp` to the remote entry point
- Ensures shared dependencies aren't duplicated

#### Step 3: Import in Main App

```typescript
// apps/main-app/src/App.tsx
import { Button } from 'utilityApp/Button';  // Resolves to remote
import { Card } from 'utilityApp/Card';
import { Input } from 'utilityApp/Input';
import { Modal } from 'utilityApp/Modal';

function App() {
  return (
    <Card title="Welcome">
      <Input label="Name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

**What happens at runtime:**
1. Main app starts loading
2. Webpack/Vite detects `utilityApp/Button` import
3. Fetches `http://localhost:5001/assets/remoteEntry.js`
4. Parses manifest to find Button component location
5. Loads `Button-[hash].js` chunk dynamically
6. Executes Button component code
7. Renders Button in main app

### Shared Dependencies

```
┌─────────────────────────────────────┐
│     Shared Dependency Layer         │
├─────────────────────────────────────┤
│  React (singleton)                  │
│  React-DOM (singleton)              │
└─────────────────────────────────────┘
              │
   ┌──────────┴──────────┐
   │                     │
Utility App          Main App
(Provides)          (Consumes)
```

**Singleton Pattern:**
- Only ONE instance of React loaded
- Both apps share the same React instance
- Prevents version conflicts
- Reduces bundle size

---

## 🧩 Component Structure

### Component Anatomy

Each component follows this pattern:

```
Button/
├── Button.tsx         # Component implementation
├── Button.types.ts    # TypeScript interfaces
└── Button.css         # Component-specific styles
```

### Example: Button Component

#### Button.types.ts
```typescript
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
}
```

#### Button.tsx
```typescript
import { ButtonProps } from './Button.types';
import './Button.css';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...rest
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full-width',
    loading && 'btn-loading',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading ? <span className="btn-spinner" /> : children}
    </button>
  );
};
```

#### Button.css
```css
.btn {
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* More styles... */
```

### Component Export Pattern

```typescript
// apps/utility-app/src/components/index.ts
export { Button } from './Button/Button';
export type { ButtonProps } from './Button/Button.types';

export { Card } from './Card/Card';
export type { CardProps } from './Card/Card.types';

export { Input } from './Input/Input';
export type { InputProps } from './Input/Input.types';

export { Modal } from './Modal/Modal';
export type { ModalProps } from './Modal/Modal.types';
```

---

## 🔄 Data Flow

### 1. Component Loading Flow

```
User Opens Main App
        │
        ├─► Browser loads http://localhost:5000
        │
        ├─► main-app/index.html loads
        │
        ├─► main-app/src/index.tsx executes
        │   └─► ReactDOM.render(<App />)
        │
        ├─► main-app/src/App.tsx parses
        │   └─► import { Button } from 'utilityApp/Button'
        │
        ├─► Module Federation kicks in
        │   ├─► Detects 'utilityApp' prefix
        │   ├─► Looks up remote in vite.config.ts
        │   └─► remotes: { utilityApp: 'http://localhost:5001/...' }
        │
        ├─► Fetches remoteEntry.js
        │   └─► GET http://localhost:5001/assets/remoteEntry.js
        │
        ├─► Parses manifest
        │   └─► Finds: './Button' → 'Button-abc123.js'
        │
        ├─► Loads Button chunk
        │   └─► GET http://localhost:5001/assets/Button-abc123.js
        │
        ├─► Loads Button styles
        │   └─► GET http://localhost:5001/assets/Button-abc123.css
        │
        ├─► Executes Button code
        │   └─► Creates Button component in memory
        │
        └─► Renders Button
            └─► <button class="btn btn-primary">...</button>
```

### 2. State Management Flow

```
Main App State
    │
    ├─► useState/useReducer in main-app/src/App.tsx
    │
    ├─► Props passed to remote components
    │   └─► <Button onClick={handleClick} />
    │
    └─► Event handlers defined in main-app
        └─► Callbacks triggered by remote components
```

**Example:**
```typescript
// main-app/src/App.tsx
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // State in host

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>     {/* Remote component */}
        Open Modal
      </Button>
      
      <Modal 
        isOpen={isModalOpen}                             {/* Remote component */}
        onClose={() => setIsModalOpen(false)}            {/* Host callback */}
      >
        Content
      </Modal>
    </>
  );
}
```

### 3. Styling Flow

```
Component-Level Styles (Button.css)
    │
    ├─► Scoped to component via CSS classes
    ├─► Loaded alongside component chunk
    └─► Applied when component renders

App-Level Styles (App.css)
    │
    ├─► Global styles for layout
    ├─► Background, typography, spacing
    └─► Loaded with app bundle

No style conflicts because:
    ├─► BEM-like class naming (.btn-primary, .card-header)
    ├─► Component-specific prefixes
    └─► No global CSS pollution
```

---

## 🏭 Build Process

### Development Build (utility-app)

```powershell
npm run dev
# Executes: vite build && vite preview --port 5001
```

**Step-by-step:**
```
1. vite build
   ├─► Reads src/components/Button/Button.tsx
   ├─► Transpiles TypeScript → JavaScript (ESNext)
   ├─► Bundles Button component
   ├─► Applies Module Federation plugin
   │   ├─► Creates remoteEntry.js manifest
   │   └─► Generates component chunks
   ├─► Processes CSS (Button.css)
   ├─► Outputs to dist/
   │   ├── assets/remoteEntry.js
   │   ├── assets/Button-[hash].js
   │   ├── assets/Button-[hash].css
   │   └── ...
   └─► ✓ built in 941ms

2. vite preview --port 5001
   ├─► Starts HTTP server
   ├─► Serves dist/ folder
   ├─► Enables CORS for module federation
   └─► ➜ Local: http://localhost:5001/
```

### Development Build (main-app)

```powershell
npm run dev
# Executes: vite --port 5000
```

**Step-by-step:**
```
1. vite --port 5000
   ├─► Reads src/App.tsx
   ├─► Detects 'utilityApp/Button' imports
   ├─► Applies Module Federation plugin
   │   ├─► Reads remotes config
   │   └─► Injects federation runtime
   ├─► Transpiles TypeScript → JavaScript
   ├─► Starts dev server with HMR
   ├─► ➜ Local: http://localhost:5000/
   │
   └─► When browser loads:
       ├─► Fetches http://localhost:5001/assets/remoteEntry.js
       └─► Dynamically loads Button chunk
```

### Production Build

```powershell
npm run build
```

**For utility-app:**
```
1. vite build
   ├─► Minification enabled
   ├─► Tree-shaking applied
   ├─► Code splitting optimized
   ├─► CSS optimized and extracted
   └─► Outputs:
       ├── dist/assets/remoteEntry.js (minified)
       ├── dist/assets/Button-abc123.js (minified)
       ├── dist/assets/Card-def456.js (minified)
       └── ...
```

**For main-app:**
```
1. vite build
   ├─► Minification enabled
   ├─► Bundle analysis
   ├─► Federation runtime included
   ├─► Outputs:
       ├── dist/assets/index-xyz789.js (minified)
       └── dist/index.html
```

---

## ⚡ Runtime Behavior

### Lazy Loading

```typescript
// Button is NOT loaded until it's needed
import { lazy, Suspense } from 'react';

const Modal = lazy(() => import('utilityApp/Modal'));

function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Open</Button>
      
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </>
  );
}
```

**What happens:**
1. App loads → Button loads immediately
2. User clicks button → `showModal` becomes true
3. React sees `<Modal>` needs to render
4. Fetches `Modal-[hash].js` from utility-app
5. Shows "Loading..." while fetching
6. Renders Modal once loaded

### Shared Dependency Resolution

```
┌─────────────────────────────────────────────┐
│         Module Federation Runtime           │
├─────────────────────────────────────────────┤
│  1. Check if React is already loaded        │
│  2. If yes → reuse existing instance        │
│  3. If no → load React once                 │
│  4. Share with all micro-frontends          │
└─────────────────────────────────────────────┘
```

**Configuration:**
```typescript
shared: ['react', 'react-dom']  // Both apps use same config
```

**Result:**
- React loaded ONCE (from utility-app or main-app, whichever loads first)
- Both apps use that single instance
- No version conflicts (because we specify same version in package.json)

### Error Handling

**Scenario 1: utility-app is offline**
```
GET http://localhost:5001/assets/remoteEntry.js
Status: ERR_CONNECTION_REFUSED

→ Main app shows blank screen or error boundary
→ Solution: Ensure utility-app is running
```

**Scenario 2: Component not found**
```
import { NonExistent } from 'utilityApp/NonExistent'

→ Runtime error: "Module not found"
→ Solution: Check vite.config.ts exposes
```

**Scenario 3: Version mismatch**
```
utility-app uses React 18.2.0
main-app uses React 18.3.0

→ Warning in console: "Shared module version mismatch"
→ Fallback: Load separate React instances (not ideal)
→ Solution: Align React versions in package.json
```

---

## 🎯 Best Practices

### 1. Component Design

✅ **DO:**
- Keep components self-contained
- Include types, styles, and logic in same folder
- Export both component and types
- Use clear, descriptive names

❌ **DON'T:**
- Rely on global styles
- Import from parent directories
- Use inline styles extensively
- Create circular dependencies

### 2. Type Safety

✅ **DO:**
```typescript
// Define clear interfaces
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
}

// Use strict typing
const Button: React.FC<ButtonProps> = (props) => { ... };
```

❌ **DON'T:**
```typescript
// Avoid 'any'
const Button = (props: any) => { ... };  // Bad!

// Don't skip prop validation
const Button = (props) => { ... };  // Bad!
```

### 3. Module Federation

✅ **DO:**
```typescript
// Expose specific components
exposes: {
  './Button': './src/components/Button/Button.tsx',
}

// Share critical dependencies
shared: ['react', 'react-dom']
```

❌ **DON'T:**
```typescript
// Don't use wildcards
exposes: {
  './components': './src/components/*',  // Bad!
}

// Don't share everything
shared: ['*']  // Bad!
```

### 4. Performance

✅ **DO:**
- Lazy load heavy components (Modal, Charts)
- Code split by route
- Optimize images and assets
- Use React.memo for expensive renders

❌ **DON'T:**
- Load everything upfront
- Bundle large libraries unnecessarily
- Forget to optimize production builds

### 5. Development Workflow

✅ **DO:**
- Start utility-app before main-app
- Use concurrent dev script from root
- Monitor both terminals for errors
- Hard refresh after federation changes

❌ **DON'T:**
- Start main-app first
- Ignore build errors in utility-app
- Forget to restart after config changes

---

## 🚀 Advanced Concepts

### 1. Multiple Remotes

You can have multiple component libraries:

```typescript
// main-app/vite.config.ts
federation({
  name: 'main_app',
  remotes: {
    utilityApp: 'http://localhost:5001/assets/remoteEntry.js',
    chartLib: 'http://localhost:5002/assets/remoteEntry.js',
    formsLib: 'http://localhost:5003/assets/remoteEntry.js',
  },
})
```

Then import:
```typescript
import { Button } from 'utilityApp/Button';
import { LineChart } from 'chartLib/LineChart';
import { FormBuilder } from 'formsLib/FormBuilder';
```

### 2. Bidirectional Sharing

Apps can both expose AND consume:

```typescript
// App A exposes Button, consumes Chart from App B
// App B exposes Chart, consumes Button from App A
```

### 3. Version Strategy

**Option 1: Singleton (Current)**
```typescript
shared: ['react', 'react-dom']  // One version shared
```

**Option 2: Version Ranges**
```typescript
shared: {
  react: {
    singleton: true,
    requiredVersion: '^18.0.0',  // Accept 18.x.x
  },
}
```

**Option 3: Strict Version**
```typescript
shared: {
  react: {
    singleton: true,
    requiredVersion: '18.2.0',  // Exact version
    strictVersion: true,        // Fail if mismatch
  },
}
```

### 4. Dynamic Remotes

Load remotes based on environment:

```typescript
const remoteUrl = import.meta.env.PROD
  ? 'https://cdn.example.com/utility-app/remoteEntry.js'
  : 'http://localhost:5001/assets/remoteEntry.js';

federation({
  remotes: {
    utilityApp: remoteUrl,
  },
})
```

### 5. Preloading

Preload components before they're needed:

```typescript
import { preloadRemote } from '@originjs/vite-plugin-federation';

// Preload Modal during app initialization
preloadRemote('utilityApp/Modal');

// Later, Modal loads instantly
import { Modal } from 'utilityApp/Modal';
```

---

## 📊 Performance Metrics

### Bundle Sizes (Development)

| File | Size | Description |
|------|------|-------------|
| `remoteEntry.js` | ~5 KB | Federation manifest |
| `Button-[hash].js` | ~3 KB | Button component chunk |
| `Card-[hash].js` | ~4 KB | Card component chunk |
| `Input-[hash].js` | ~5 KB | Input component chunk |
| `Modal-[hash].js` | ~8 KB | Modal component chunk |
| `React` (shared) | ~130 KB | Loaded once, shared |

### Load Times (Localhost)

| Metric | Time |
|--------|------|
| Initial page load (main-app) | ~200ms |
| remoteEntry.js fetch | ~10ms |
| Button component fetch | ~5ms |
| Modal lazy load | ~8ms |

### Network Requests

**First load:**
1. `index.html` (main-app)
2. `index-[hash].js` (main-app bundle)
3. `remoteEntry.js` (utility-app manifest)
4. `Button-[hash].js` (on-demand)
5. `Card-[hash].js` (on-demand)

**Subsequent visits:**
- All assets cached (browser cache)
- Only changed chunks re-downloaded

---

## 🔐 Security Considerations

### 1. CORS Configuration

**Development:**
```typescript
server: {
  cors: true,  // Allow all origins
}
```

**Production:**
```typescript
server: {
  cors: {
    origin: ['https://yourdomain.com'],  // Specific domains
    credentials: true,
  },
}
```

### 2. Content Security Policy

```html
<!-- Add CSP headers in production -->
<meta http-equiv="Content-Security-Policy" 
      content="
        default-src 'self';
        script-src 'self' https://cdn.yourdomain.com;
        style-src 'self' 'unsafe-inline';
      ">
```

### 3. Dependency Integrity

- Pin exact versions in `package.json`
- Use `npm audit` to check vulnerabilities
- Verify shared dependency versions match

---

## 📝 Summary

### Key Takeaways

1. **Module Federation** = Runtime code sharing between apps
2. **Utility App** = Component library (remote/provider)
3. **Main App** = Consumer application (host)
4. **Shared Dependencies** = Single React instance, no duplication
5. **Type Safety** = Full TypeScript coverage with interfaces
6. **Build Order** = Utility app MUST build before main app can consume
7. **Lazy Loading** = Components loaded on-demand, not upfront
8. **Monorepo** = Shared dependencies, centralized scripts

### Architecture Benefits

✅ **Independent Development** - Teams work separately  
✅ **Runtime Integration** - No build-time coupling  
✅ **Code Reusability** - One library, many consumers  
✅ **Scalability** - Easy to add more micro-frontends  
✅ **Performance** - Lazy loading, shared dependencies  
✅ **Type Safety** - TypeScript across all apps  

---

**For setup instructions** → See [README.md](./README.md)

**Need help?** → Check troubleshooting in README.md

---

*This architecture powers modern, scalable web applications used by companies like Microsoft, Spotify, and IKEA.*
