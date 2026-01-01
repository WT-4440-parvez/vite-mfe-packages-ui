# Micro-Frontend Project - Setup & Installation Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Installation](#detailed-installation)
- [Running the Applications](#running-the-applications)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)
- [Available Scripts](#available-scripts)

---

## 🎯 Overview

This is a professional **micro-frontend architecture** implementing the **Module Federation** pattern with:

### Two Applications

| Application | Port | Role | Description |
|------------|------|------|-------------|
| **Utility App** | 5001 | Remote/Provider | Exposes reusable UI components (Button, Card, Input, Modal) |
| **Main App** | 5000 | Host/Consumer | Consumes and uses components from Utility App |

### Tech Stack

- **Framework**: React 18.2
- **Language**: TypeScript 5.3
- **Build Tool**: Vite 5.4
- **Architecture**: Module Federation via `@originjs/vite-plugin-federation`
- **Package Manager**: npm workspaces (monorepo)

---

## ✅ Prerequisites

Ensure you have these installed:

| Tool | Required Version | Check Command |
|------|-----------------|---------------|
| **Node.js** | 18.x or higher | `node --version` |
| **npm** | 9.x or higher | `npm --version` |
| **Git** | Any recent version | `git --version` |

### Verify Installation

```powershell
node --version
# Expected: v18.x.x or higher

npm --version
# Expected: 9.x.x or higher
```

---

## 🚀 Quick Start

Get up and running in 3 steps:

```powershell
# Step 1: Navigate to project
cd "d:\Projects\Frontend Dynamics\MIcrofrontend Design"

# Step 2: Install dependencies
npm install

# Step 3: Start both applications
npm run dev
```

Then open your browser:
- **Utility App (Components)**: http://localhost:5001
- **Main App**: http://localhost:5000

---

## 📦 Detailed Installation

### Step 1: Clone/Navigate to Project

```powershell
cd "d:\Projects\Frontend Dynamics\MIcrofrontend Design"
```

### Step 2: Understand the Structure

```
MIcrofrontend Design/
├── package.json              # Root workspace config
├── tsconfig.base.json        # Shared TypeScript settings
├── README.md                 # This file
├── PROJECT_ARCHITECTURE.md   # Technical architecture details
└── apps/
    ├── main-app/            # Host application (Port 5000)
    │   ├── src/
    │   │   └── App.tsx      # Uses remote components
    │   ├── vite.config.ts   # Consumes from utility-app
    │   └── package.json
    └── utility-app/         # Remote application (Port 5001)
        ├── src/
        │   ├── App.tsx      # Component showcase
        │   └── components/  # Button, Card, Input, Modal
        ├── vite.config.ts   # Exposes components
        └── package.json
```

### Step 3: Install Dependencies

This command installs all dependencies for both applications:

```powershell
npm install
```

**What happens:**
- Installs root workspace dependencies
- Installs `main-app` dependencies
- Installs `utility-app` dependencies
- Links shared dependencies
- Creates `node_modules` folders

**Expected output:**
```
added 456 packages in 24s
```

**If you see errors**, check:
- Internet connection
- npm registry access
- Sufficient disk space
- No `package-lock.json` conflicts

---

## 🎮 Running the Applications

### Option 1: Run Both Together (Recommended)

From the **root directory**:

```powershell
npm run dev
```

This command:
1. Starts **utility-app** on port 5001 (builds first, then serves)
2. Starts **main-app** on port 5000
3. Runs both concurrently

**Expected terminal output:**
```
[utility] > utility-app@1.0.0 dev
[utility] > vite build && vite preview --port 5001
[utility] ✓ built in 941ms
[utility] ➜  Local:   http://localhost:5001/

[main] > main-app@1.0.0 dev
[main] > vite --port 5000
[main] ➜  Local:   http://localhost:5000/
```

### Option 2: Run Separately (Manual Control)

#### Terminal 1 - Start Utility App FIRST

```powershell
cd "d:\Projects\Frontend Dynamics\MIcrofrontend Design\apps\utility-app"
npm run dev
```

**Wait for this output:**
```
✓ built in XXms
➜  Local:   http://localhost:5001/
```

#### Terminal 2 - Start Main App

```powershell
cd "d:\Projects\Frontend Dynamics\MIcrofrontend Design\apps\main-app"
npm run dev
```

**You'll see:**
```
➜  Local:   http://localhost:5000/
```

### ⚠️ Critical Order

**Utility App MUST start before Main App** because:
1. Main app fetches `remoteEntry.js` from utility app
2. Main app needs utility app's components at runtime
3. If utility app isn't running, main app will show errors

### Verify Success

1. **Open http://localhost:5001**
   - Should show: "🎨 Utility Components Library"
   - Professional dark header, component showcase below
   - All 4 components visible: Button, Card, Input, Modal

2. **Open http://localhost:5000**
   - Should show: "🚀 Main Application"
   - Uses components from utility-app
   - Registration modal, feature cards

### Stopping the Applications

Press `Ctrl + C` in each terminal, then type `N` when prompted:
```
Terminate batch job (Y/N)? N
```

---

## 🏗️ Building for Production

### Build Both Applications

From the root directory:

```powershell
npm run build
```

**What happens:**
- Builds `utility-app` → creates `apps/utility-app/dist/`
- Builds `main-app` → creates `apps/main-app/dist/`
- Optimizes code (minification, tree-shaking)
- Generates production-ready bundles

### Build Individual Apps

```powershell
# Build only utility app
cd apps/utility-app
npm run build

# Build only main app
cd apps/main-app
npm run build
```

### Preview Production Builds

Test the production builds locally:

```powershell
# Terminal 1 - Preview utility app
cd apps/utility-app
npm run preview

# Terminal 2 - Preview main app
cd apps/main-app
npm run preview
```

### Production Output Structure

```
apps/utility-app/dist/
├── assets/
│   ├── remoteEntry.js     # Module Federation entry point
│   ├── Button-[hash].js   # Component chunks
│   ├── Card-[hash].js
│   └── ...
└── index.html

apps/main-app/dist/
├── assets/
│   ├── index-[hash].js    # Main app bundle
│   └── ...
└── index.html
```

---

## 🐛 Troubleshooting

### Problem 1: Port Already in Use

**Error:**
```
Error: Port 5001 is already in use
```

**Solution:**

```powershell
# Find the process using the port
netstat -ano | findstr :5001

# You'll see output like:
# TCP    [::1]:5001    LISTENING    12345

# Kill that specific process (replace 12345 with actual PID)
taskkill /PID 12345 /F

# Or kill all node processes (nuclear option)
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
```

### Problem 2: Blank Browser Screen

**Symptoms:**
- Browser shows white/blank page
- No components visible
- Console shows errors

**Solution:**

1. **Check browser console (F12)**
   ```
   GET http://localhost:5001/assets/remoteEntry.js 404
   ```

2. **Verify utility-app is running**
   - Open http://localhost:5001 directly
   - Should see component showcase
   - If not, restart utility-app

3. **Hard refresh browser**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

4. **Restart in correct order**
   ```powershell
   # Stop both apps (Ctrl + C)
   # Start utility-app first, wait for build
   # Then start main-app
   ```

### Problem 3: Module Not Found Errors

**Error:**
```
Cannot find module 'utilityApp/Button'
```

**Solution:**

1. **Check vite.config.ts in main-app:**
   ```typescript
   remotes: {
     utilityApp: 'http://localhost:5001/assets/remoteEntry.js',
   }
   ```

2. **Verify utility-app is exposing components:**
   ```typescript
   // apps/utility-app/vite.config.ts
   exposes: {
     './Button': './src/components/Button/Button.tsx',
   }
   ```

3. **Restart both applications**

### Problem 4: TypeScript Errors in VS Code

**Error:**
```
'React' is declared but its value is never read
```

**Solution:**

1. **Restart TypeScript Server:**
   - Press `Ctrl + Shift + P`
   - Type: "TypeScript: Restart TS Server"
   - Press Enter

2. **If issues persist:**
   ```powershell
   # Delete and reinstall
   rm -rf node_modules
   rm -rf apps/*/node_modules
   npm install
   ```

### Problem 5: Changes Not Reflecting

**Solution:**

1. **Clear browser cache:**
   - Hard refresh: `Ctrl + Shift + R`
   - Or clear cache: `Ctrl + Shift + Delete`

2. **Restart dev server:**
   ```powershell
   # Stop utility-app (Ctrl + C)
   # Restart it
   npm run dev
   ```

3. **Check Vite HMR is working:**
   - Look for `[vite] hot updated` messages in terminal
   - If not appearing, restart the server

### Problem 6: npm install Fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
```

**Solution:**

```powershell
# Try with legacy peer deps
npm install --legacy-peer-deps

# Or force
npm install --force

# Clean npm cache
npm cache clean --force
npm install
```

---

## 📜 Available Scripts

### Root Directory Commands

Run these from `d:\Projects\Frontend Dynamics\MIcrofrontend Design`:

| Command | Description |
|---------|-------------|
| `npm install` | Install all workspace dependencies |
| `npm run dev` | Start both apps (utility + main) |
| `npm run dev:utility` | Start only utility app |
| `npm run dev:main` | Start only main app |
| `npm run build` | Build both apps for production |

### Individual App Commands

Run these from `apps/utility-app/` or `apps/main-app/`:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |

---

## 🎓 Understanding the Workflow

### Development Flow

```
1. Developer makes changes in utility-app/src/components/Button.tsx
                          ↓
2. Vite HMR detects change and rebuilds
                          ↓
3. Browser automatically refreshes utility-app (localhost:5001)
                          ↓
4. Main-app (localhost:5000) also updates because it imports Button
                          ↓
5. Changes visible in both apps instantly
```

### How Components Are Shared

```
Utility App (Port 5001)
    │
    ├── Exposes: Button, Card, Input, Modal
    │   via remoteEntry.js
    │
    │   HTTP Request
    ├──────────────────────────►
    │
Main App (Port 5000)
    │
    ├── Imports: import { Button } from 'utilityApp/Button'
    │
    └── Renders: <Button variant="primary">Click</Button>
```

### Why This Architecture?

1. **Independent Development**: Teams can work on utility-app and main-app separately
2. **Runtime Integration**: No build-time coupling, components loaded at runtime
3. **Reusability**: One component library, multiple consumer apps
4. **Scalability**: Easy to add more micro-frontends
5. **Performance**: Lazy loading, shared dependencies

---

## 💡 Quick Tips

### For Smooth Development

✅ **Always start utility-app first** - It must be running before main-app  
✅ **Use `npm run dev` from root** - Handles startup order automatically  
✅ **Keep terminals visible** - Monitor build status and errors  
✅ **Use browser dev tools** - Network tab shows module loading  
✅ **HMR works great** - Most changes reflect instantly  

### Performance Tips

✅ **Lazy load modals** - They're only loaded when opened  
✅ **Shared React instance** - Only one React runtime loaded  
✅ **Code splitting works** - Each component is a separate chunk  

### Common Mistakes to Avoid

❌ **Starting main-app first** - Always start utility-app first  
❌ **Not waiting for build** - Wait for "✓ built in XXms" message  
❌ **Forgetting hard refresh** - Use Ctrl+Shift+R after changes  
❌ **Wrong ports** - Utility=5001, Main=5000 (hardcoded in config)  

---

## 📞 Next Steps

After successful installation:

1. ✅ **Read [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md)** - Understand how everything connects
2. ✅ **Explore http://localhost:5001** - See all components in action
3. ✅ **Check http://localhost:5000** - See how components are used
4. ✅ **Modify a component** - Try changing Button color in `apps/utility-app/src/components/Button/Button.css`
5. ✅ **Create new component** - Follow the same pattern as existing ones

---

## 🌟 Project Highlights

- **Modern Stack**: React 18, TypeScript, Vite
- **Professional UI**: Clean, corporate design with black header
- **Type-Safe**: Full TypeScript coverage
- **Fast Development**: Vite HMR for instant feedback
- **Production-Ready**: Optimized builds, lazy loading
- **Scalable**: Easy to add more components or apps

---

**Need more technical details?** → See [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md)

**Having issues?** → Check the [Troubleshooting](#troubleshooting) section above

---

*Built with ❤️ using React, TypeScript, and Vite*
