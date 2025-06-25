# Rahul Kulkarni - Portfolio Website

A modern, responsive portfolio website built with Next.js and deployed on GitHub Pages.

## 🚀 Local Development

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/xhanthis/xhanthis.github.io.git
   cd xhanthis.github.io
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Build for Production
```bash
pnpm build
```
This generates static files in the `out/` directory.

### Manual Deployment to GitHub Pages
```bash
pnpm deploy
```

### Automatic Deployment
The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (static export)
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── github-contributions.tsx
│   ├── medium-articles.tsx
│   └── theme-provider.tsx
├── public/               # Static assets
├── .github/workflows/    # GitHub Actions
└── out/                 # Generated static files (after build)
```

## 🔧 Configuration

### Next.js Configuration
The project is configured for static export in `next.config.mjs`:
- `output: 'export'` - Enables static site generation
- `trailingSlash: true` - Adds trailing slashes for GitHub Pages
- `images: { unoptimized: true }` - Disables image optimization for static export

### GitHub Pages Setup
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will automatically deploy on pushes to `main`

## 🚫 Removed Vercel Dependencies

This project has been configured for GitHub Pages deployment and no longer includes:
- Vercel-specific configurations
- API routes (converted to static data)
- Server-side functionality

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server (for testing)
- `pnpm lint` - Run ESLint
- `pnpm deploy` - Build and prepare for manual deployment

## 🌐 Live Site

Visit the live site at: [https://xhanthis.github.io](https://xhanthis.github.io)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).