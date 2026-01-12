# Todo React App

## Installation Commands

### 1. Create Vite Project
```bash
npm create vite@latest todo-reactjs
cd todo-reactjs
npm install
```

### 2. Install Tailwind CSS
```bash
npm install tailwindcss @tailwindcss/vite
```

### 3. Install DaisyUI
```bash
npm i -D daisyui@latest
```

### 3. Install Lucide React
```bash
npm install lucide-react
```

## Configuration

### CSS Setup (src/index.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@plugin "daisyui" {
  themes: night
}
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
