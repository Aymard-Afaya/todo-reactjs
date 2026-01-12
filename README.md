# Todo React App

## Installation Commands

### 1. Create Vite Project
```bash
npm create vite@latest todo-reactjs -- --template react
cd todo-reactjs
npm install
```

### 2. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Install DaisyUI
```bash
npm install daisyui
```

## Configuration

### Tailwind Config (tailwind.config.js)
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
```

### CSS Setup (src/index.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Running the Project

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```
